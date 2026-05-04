import { loadSkillIndex } from "/mod/_core/skillset/skills.js";

export async function initSkillsBoardView() {
  const skillsContainer = document.getElementById("skills-board-container");
  
  if (!skillsContainer) {
    console.error("[v0] Skills board container not found");
    return;
  }

  try {
    skillsContainer.innerHTML = '<div class="skills-loading">Loading skills...</div>';
    
    // Load skill index with kupuri tags
    const skillIndex = await loadSkillIndex({
      contextTags: ["kupuri"]
    });

    renderSkillsBoard(skillsContainer, skillIndex);
  } catch (error) {
    console.error("[v0] Failed to load skills board:", error);
    skillsContainer.innerHTML = `<div class="skills-error">Error loading skills: ${error.message}</div>`;
  }
}

export function renderSkillsBoard(container, skillIndex) {
  const skills = skillIndex.skills || [];
  
  if (!skills.length) {
    container.innerHTML = '<div class="skills-empty">No skills available</div>';
    return;
  }

  const boardHtml = `
    <div class="skills-board">
      <div class="skills-header">
        <h1>Skills Board</h1>
        <p class="skills-subtitle">Agent Alex Capabilities for Kupuri Media</p>
        <div class="skills-stats">
          <span class="stat">Total Skills: ${skills.length}</span>
          <span class="stat">Auto-Loaded: ${skillIndex.autoLoadedSkills?.length || 0}</span>
        </div>
      </div>
      
      <div class="skills-search-bar">
        <input 
          type="text" 
          id="skills-search" 
          class="skills-search-input" 
          placeholder="Search skills by name or description..."
        />
      </div>

      <div class="skills-grid" id="skills-grid">
        ${skills.map(skill => renderSkillCard(skill)).join('')}
      </div>
    </div>
  `;

  container.innerHTML = boardHtml;
  
  // Attach search functionality
  const searchInput = container.querySelector("#skills-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleSkillsSearch(container, skills, e.target.value);
    });
  }
}

function renderSkillCard(skill) {
  const autoLoaded = skill.loaded === true ? "auto-loaded" : "";
  const tagsList = skill.when?.tags ? skill.when.tags.join(", ") : "kupuri";
  
  return `
    <div class="skill-card ${autoLoaded}" data-skill-name="${skill.name.toLowerCase()}" data-skill-desc="${(skill.description || '').toLowerCase()}">
      <div class="skill-card-header">
        <h2 class="skill-name">${skill.name}</h2>
        ${autoLoaded ? '<span class="skill-badge-auto">Auto-Loaded</span>' : '<span class="skill-badge-manual">Manual</span>'}
      </div>
      
      <p class="skill-description">${skill.description || 'No description available'}</p>
      
      <div class="skill-metadata">
        <div class="skill-path"><strong>Path:</strong> <code>${skill.path}</code></div>
        <div class="skill-tags"><strong>Tags:</strong> ${tagsList}</div>
        <div class="skill-placement"><strong>Placement:</strong> <span class="placement-badge">${skill.placement}</span></div>
      </div>

      <details class="skill-details">
        <summary>View Full Content</summary>
        <pre class="skill-content"><code>${escapeHtml(skill.body)}</code></pre>
      </details>
    </div>
  `;
}

function handleSkillsSearch(container, skills, query) {
  const searchTerm = query.toLowerCase();
  const cards = container.querySelectorAll(".skill-card");

  cards.forEach(card => {
    const name = card.dataset.skillName;
    const desc = card.dataset.skillDesc;
    
    const matches = name.includes(searchTerm) || desc.includes(searchTerm);
    card.style.display = matches ? "" : "none";
  });

  // Show empty state if no matches
  const visibleCards = Array.from(cards).filter(c => c.style.display !== "none");
  if (visibleCards.length === 0 && searchTerm) {
    const grid = container.querySelector(".skills-grid");
    if (!grid.querySelector(".search-empty")) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "search-empty";
      emptyMsg.textContent = "No skills match your search";
      grid.appendChild(emptyMsg);
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export async function getSkillsMetadata() {
  try {
    const skillIndex = await loadSkillIndex({
      contextTags: ["kupuri"]
    });
    
    return {
      totalSkills: skillIndex.skills?.length || 0,
      autoLoaded: skillIndex.autoLoadedSkills?.length || 0,
      skills: skillIndex.skills || [],
      conflicts: skillIndex.conflicts || []
    };
  } catch (error) {
    console.error("[v0] Failed to get skills metadata:", error);
    return null;
  }
}
