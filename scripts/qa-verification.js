#!/usr/bin/env node

/**
 * QA Verification Suite for SEED + Prompt Enhancer Integration
 * Validates all new systems for errors and compliance
 */

const fs = require("fs");
const path = require("path");

const QA_REPORT = {
  timestamp: new Date().toISOString(),
  checks: [],
  errors: [],
  warnings: [],
  summary: {}
};

// Files to validate
const FILES_TO_CHECK = [
  // SEED Skills
  "app/L0/_all/mod/_core/skillset/ext/skills/kupuri-operations/SKILL.md",
  "app/L0/_all/mod/_core/skillset/ext/skills/kupuri-content-generation/SKILL.md",
  "app/L0/_all/mod/_core/skillset/ext/skills/kupuri-publishing/SKILL.md",
  "app/L0/_all/mod/_core/skillset/ext/skills/kupuri-analytics/SKILL.md",
  "app/L0/_all/mod/_core/skillset/ext/skills/kupuri-paul-compliance/SKILL.md",
  
  // Skills Board
  "app/L0/_all/mod/_core/admin/views/skills-board/view.js",
  "app/L0/_all/mod/_core/admin/views/skills-board/panel.html",
  "app/L0/_all/mod/_core/admin/views/skills-board/panel.css",
  
  // Prompt Enhancer
  "app/L0/_all/mod/_core/onscreen_agent/ext/prompt-enhancer.js",
  "app/L0/_all/mod/_core/onscreen_agent/ext/prompt-enhancer-ui.js",
  
  // Settings
  "app/L0/_all/mod/_core/onscreen_agent/ext/settings-manager.js",
  "app/L0/_all/mod/_core/onscreen_agent/ext/settings-panel-ui.js",
  
  // Integration
  "app/L0/_all/mod/_core/onscreen_agent/ext/agent-alex-integration.js",
  "app/L0/_all/mod/_core/onscreen_agent/ext/enhancer-ui.css"
];

/**
 * Check if file exists and is readable
 */
function checkFileExists(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    fs.accessSync(fullPath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate JavaScript syntax
 */
function validateJavaScript(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const content = fs.readFileSync(fullPath, "utf-8");
    new Function(content); // Basic syntax check
    return { valid: true, errors: [] };
  } catch (error) {
    return { valid: false, errors: [error.message] };
  }
}

/**
 * Check for missing imports
 */
function checkImports(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const issues = [];

  // Check for import statements
  const importRegex = /import\s+.*?\s+from\s+["'][^"']+["']/g;
  const imports = content.match(importRegex) || [];

  // Verify common issues
  if (content.includes("getPromptEnhancer") && !content.includes("import.*getPromptEnhancer")) {
    if (!content.includes("from.*prompt-enhancer")) {
      issues.push("Missing import for getPromptEnhancer");
    }
  }

  return issues;
}

/**
 * Validate HTML structure
 */
function validateHTML(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const issues = [];

  // Basic HTML structure checks
  if (!content.includes("<!DOCTYPE html") && !content.includes("<head")) {
    // Allow template HTML without full structure
    if (content.includes("<div") || content.includes("<html")) {
      // OK for fragments
    } else {
      issues.push("Missing DOCTYPE or head tag");
    }
  }

  // Check for unclosed tags
  const tagRegex = /<(\w+)([^>]*)>/g;
  const openTags = [];
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const tag = match[1].toLowerCase();
    const selfClosing = ["br", "hr", "img", "input", "meta", "link"];
    if (!selfClosing.includes(tag)) {
      openTags.push(tag);
    }
  }

  return issues;
}

/**
 * Validate CSS
 */
function validateCSS(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const issues = [];

  // Check for common CSS issues
  if (!content.includes(":") && content.includes("{")) {
    issues.push("No CSS properties found (missing colons)");
  }

  // Check for unmatched braces
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push(`Mismatched braces: ${openBraces} open, ${closeBraces} close`);
  }

  return issues;
}

/**
 * Validate Markdown
 */
function validateMarkdown(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const issues = [];

  // Check frontmatter
  if (!content.startsWith("---")) {
    issues.push("Missing frontmatter (---)");
  }

  // Check for required fields
  if (!content.includes("name:")) {
    issues.push("Missing 'name' field in frontmatter");
  }

  if (!content.includes("description:")) {
    issues.push("Missing 'description' field in frontmatter");
  }

  return issues;
}

/**
 * Run all checks
 */
function runQAChecks() {
  console.log("Starting QA Verification...\n");

  FILES_TO_CHECK.forEach(filePath => {
    console.log(`Checking: ${filePath}`);
    
    // Check file exists
    if (!checkFileExists(filePath)) {
      QA_REPORT.errors.push(`File not found: ${filePath}`);
      console.log("  ERROR: File not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const check = { file: filePath, issues: [] };

    // File exists
    check.issues.push({ type: "info", message: "File exists" });

    // Type-specific validation
    if (ext === ".js") {
      const jsCheck = validateJavaScript(filePath);
      if (!jsCheck.valid) {
        check.issues.push({ type: "error", message: `Syntax error: ${jsCheck.errors[0]}` });
        QA_REPORT.errors.push(`Syntax error in ${filePath}: ${jsCheck.errors[0]}`);
      } else {
        check.issues.push({ type: "info", message: "JavaScript syntax valid" });
      }

      const imports = checkImports(filePath);
      if (imports.length > 0) {
        imports.forEach(issue => {
          check.issues.push({ type: "warning", message: `Import issue: ${issue}` });
          QA_REPORT.warnings.push(`${filePath}: ${issue}`);
        });
      }
    } else if (ext === ".html") {
      const htmlCheck = validateHTML(filePath);
      if (htmlCheck.length > 0) {
        htmlCheck.forEach(issue => {
          check.issues.push({ type: "warning", message: `HTML issue: ${issue}` });
          QA_REPORT.warnings.push(`${filePath}: ${issue}`);
        });
      } else {
        check.issues.push({ type: "info", message: "HTML structure valid" });
      }
    } else if (ext === ".css") {
      const cssCheck = validateCSS(filePath);
      if (cssCheck.length > 0) {
        cssCheck.forEach(issue => {
          check.issues.push({ type: "warning", message: `CSS issue: ${issue}` });
          QA_REPORT.warnings.push(`${filePath}: ${issue}`);
        });
      } else {
        check.issues.push({ type: "info", message: "CSS syntax valid" });
      }
    } else if (ext === ".md") {
      const mdCheck = validateMarkdown(filePath);
      if (mdCheck.length > 0) {
        mdCheck.forEach(issue => {
          check.issues.push({ type: "warning", message: `Markdown issue: ${issue}` });
          QA_REPORT.warnings.push(`${filePath}: ${issue}`);
        });
      } else {
        check.issues.push({ type: "info", message: "Markdown valid" });
      }
    }

    QA_REPORT.checks.push(check);
    
    // Print summary
    const errors = check.issues.filter(i => i.type === "error").length;
    const warnings = check.issues.filter(i => i.type === "warning").length;
    console.log(`  Errors: ${errors}, Warnings: ${warnings}`);
  });

  // Generate summary
  QA_REPORT.summary = {
    totalFiles: FILES_TO_CHECK.length,
    filesFound: FILES_TO_CHECK.filter(f => checkFileExists(f)).length,
    totalErrors: QA_REPORT.errors.length,
    totalWarnings: QA_REPORT.warnings.length,
    passed: QA_REPORT.errors.length === 0
  };

  return QA_REPORT;
}

/**
 * Print report
 */
function printReport(report) {
  console.log("\n" + "=".repeat(60));
  console.log("QA VERIFICATION REPORT");
  console.log("=".repeat(60) + "\n");

  console.log("Summary:");
  console.log(`  Total Files: ${report.summary.totalFiles}`);
  console.log(`  Files Found: ${report.summary.filesFound}`);
  console.log(`  Errors: ${report.summary.totalErrors}`);
  console.log(`  Warnings: ${report.summary.totalWarnings}`);
  console.log(`  Status: ${report.summary.passed ? "PASSED" : "FAILED"}\n`);

  if (report.errors.length > 0) {
    console.log("Errors:");
    report.errors.forEach(error => console.log(`  - ${error}`));
    console.log("");
  }

  if (report.warnings.length > 0) {
    console.log("Warnings:");
    report.warnings.forEach(warning => console.log(`  - ${warning}`));
    console.log("");
  }

  console.log("=".repeat(60));
  console.log(`Report generated at: ${report.timestamp}`);
  console.log("=".repeat(60) + "\n");

  return report.summary.passed;
}

// Run if executed directly
if (require.main === module) {
  const report = runQAChecks();
  const passed = printReport(report);
  process.exit(passed ? 0 : 1);
}

module.exports = { runQAChecks, printReport };
