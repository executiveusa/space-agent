#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { createUser } from "../server/lib/auth/user_manage.js";
import { loadAuthKeys } from "../server/lib/auth/keys_manage.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;

async function setupUser() {
  try {
    const authKeys = loadAuthKeys(projectRoot);
    
    const user = createUser(
      projectRoot,
      "executiveusa@gmail.com",
      "Sheraljean1",
      {
        fullName: "Executive USA",
        force: false
      },
      authKeys
    );

    console.log("✓ User created successfully!");
    console.log("  Username: executiveusa@gmail.com");
    console.log("  Password: Sheraljean1");
    console.log("\nYou can now login with these credentials.");
  } catch (error) {
    console.error("Error creating user:", error.message);
    process.exit(1);
  }
}

setupUser();
