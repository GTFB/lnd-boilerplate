#!/usr/bin/env bun

/**
 * Script to set database path for Dev Agent
 * Usage: bun run scripts/set-db-path.ts <path>
 */

import { join } from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("❌ Please specify the database path");
  console.log("Example: bun run scripts/set-db-path.ts C:/OSPanel/data/dev-agent/dev-agent.db");
  process.exit(1);
}

const dbPath = args[0];
const configDir = "G:\\Общие диски\\Altrp\\dev-agent";
const envFile = join(configDir, ".env");

// Create config folder if it doesn't exist
if (!existsSync(configDir)) {
  mkdirSync(configDir, { recursive: true });
}

// Create configuration file
const envContent = `# Dev Agent Database Configuration
# Database path
DEV_AGENT_DB_PATH=${dbPath}

# Другие настройки
DEV_AGENT_LOG_LEVEL=info
DEV_AGENT_ENV=development
`;

try {
  writeFileSync(envFile, envContent, "utf8");
  console.log("✅ Путь к базе данных успешно настроен!");
  console.log(`📁 Файл конфигурации: ${envFile}`);
  console.log(`🗄️  Путь к БД: ${dbPath}`);
  console.log("");
  console.log("💡 Теперь запустите приложение с этой переменной окружения:");
  console.log(`   set DEV_AGENT_DB_PATH=${dbPath}`);
  console.log("   bun run src/index.ts");
} catch (error) {
  console.error("❌ Ошибка при создании конфигурации:", error);
  process.exit(1);
}
