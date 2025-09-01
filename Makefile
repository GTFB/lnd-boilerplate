# LND Boilerplate Makefile

.PHONY: help dev-help dev-test dev-build dev-clean dev-validate dev-lint dev-update lint utils-test sync-main reset-develop push-develop workspace-status workspace-commit branch-delete branches

help:
	@echo "LND Boilerplate - Available Commands:"
	@echo ""
	@echo "Dev Agent Commands (proxied to dev/ folder):"
	@echo "  dev-help      Show dev-agent help"
	@echo "  dev-test      Run dev-agent tests"
	@echo "  dev-build     Build dev-agent project"
	@echo "  dev-clean     Clean dev-agent build artifacts"
	@echo "  dev-validate  Validate dev-agent project structure"
	@echo "  dev-lint      Run dev-agent linting"
	@echo "  dev-update    Update dev-agent subtree from remote"
	@echo ""
	@echo "Project Commands:"
	@echo "  lint          Run linting for apps/landing"
	@echo "  utils-test    Run tests for packages/utils"
	@echo ""
	@echo "Workspace Sync Commands:"
	@echo "  sync-main         Sync local main with remote"
	@echo "  reset-develop     Reset develop to remote and merge main"
	@echo "  push-develop      Push develop branch"
	@echo "  workspace-status  Show git status"
	@echo "  branch-delete     Delete branch locally and on origin (use BRANCH=name)"
	@echo "  branches          List local and remote branches"
	@echo ""
	@echo "For detailed dev-agent commands, run: make dev-help"

# Start app dev server (apps/landing)
.PHONY: dev
dev:
	@echo "🚀 Starting Next.js dev server (apps/landing)"
	@bun run --cwd apps/landing dev

# Dev Agent Proxy Commands
dev-help:
	@cd dev && make help

dev-test:
	@cd dev && make test

dev-build:
	@cd dev && make build

dev-clean:
	@cd dev && make clean

dev-validate:
	@cd dev && make validate

dev-lint:
	@cd dev && bun run lint

# Project Commands
lint:
	@echo "🔍 Running linting for apps/landing..."
	@bun run --cwd apps/landing lint

utils-test:
	@echo "🧪 Running tests for packages/utils..."
	@bun run --cwd packages/utils test

# Workspace synchronization
sync-main:
	@echo "🔄 Syncing main..."
	@git fetch --all --prune
	@git checkout main
	@git pull --ff-only
	@echo "✅ main is up to date"

reset-develop:
	@echo "🧹 Resetting develop and merging main..."
	@git fetch --all --prune
	@git checkout develop
	@git reset --hard origin/develop
	@git clean -fd
	@git merge --ff-only main || echo "⚠️ Fast-forward merge not possible; manual merge may be required"
	@echo "✅ develop reset complete"

push-develop:
	@echo "⬆️  Pushing develop..."
	@git push origin develop
	@echo "✅ develop pushed"

workspace-status:
	@echo "📋 Git status:"
	@git status -sb

workspace-discard:
	@echo "🧽 Discarding local changes..."
	@git reset --hard HEAD
	@git clean -fd
	@echo "✅ Workspace cleaned"

workspace-commit:
	@echo "📝 Committing Makefile changes for sync..."
	@git add Makefile
	@git commit -m "chore: add workspace sync targets to Makefile" || echo "ℹ️ Nothing to commit"
	@echo "✅ Commit step done"

# Git branch utilities
branch-delete:
	@if [ -z "$(BRANCH)" ]; then echo "❌ Please provide BRANCH=name"; exit 1; fi
	@echo "🗑️ Deleting local branch '$(BRANCH)'..."
	@git branch -D $(BRANCH) 2>/dev/null || echo "ℹ️ Local branch '$(BRANCH)' not found"
	@echo "🗑️ Deleting remote branch 'origin/$(BRANCH)'..."
	@git push origin --delete $(BRANCH) 2>/dev/null || echo "ℹ️ Remote branch 'origin/$(BRANCH)' not found"
	@echo "✅ Done"

branches:
	@echo "🌿 Branches (local and remote):"
	@git branch -a

dev-update:
	@echo "🔄 Updating dev-agent subtree..."
	@git subtree pull --prefix=dev https://github.com/GTFB/dev-agent.git main --squash
	@echo "✅ Dev-agent subtree updated successfully!"
	@echo "📝 Now you can commit the updates:"
	@echo "   git add ."
	@echo "   git commit -m 'Update dev-agent subtree'"
	@echo ""
	@echo "⚠️  IMPORTANT: Do not use git subtree push to send changes to dev-agent!"
	@echo "   All changes must go through issues and pull requests in dev-agent repository."

# Deployment
.PHONY: deploy-vercel deploy-netlify deploy-docker

deploy-vercel:
	@echo "🚀 Deploying to Vercel..."
	vercel --prod

deploy-netlify:
	@echo "🚀 Deploying to Netlify..."
	netlify deploy --prod

deploy-docker:
	@echo "🐳 Building and running Docker container..."
	docker build -t lnd-boilerplate .
	docker run -p 3000:3000 lnd-boilerplate

# Docker utilities
docker-build:
	@echo "🔨 Building Docker image..."
	docker build -t lnd-boilerplate .

docker-run:
	@echo "🏃 Running Docker container..."
	docker run -p 3000:3000 lnd-boilerplate

docker-stop:
	@echo "🛑 Stopping Docker containers..."
	docker stop $$(docker ps -q --filter ancestor=lnd-boilerplate)

# Production build
build-prod:
	@echo "🏗️ Building production version..."
	bun run build
	@echo "✅ Production build complete!"

# Performance check
lighthouse:
	@echo "📊 Running Lighthouse audit..."
	npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
	@echo "📊 Lighthouse report saved to ./lighthouse-report.html"

# Bundle analysis
analyze:
	@echo "📦 Analyzing bundle..."
	bun run --cwd apps/landing build
	npx @next/bundle-analyzer apps/landing/.next/static/chunks

# Security audit
security-audit:
	@echo "🔒 Running security audit..."
	bun audit
	npm audit --audit-level moderate

# Clean all
clean-all: clean
	@echo "🧹 Cleaning all generated files..."
	rm -rf apps/landing/.next
	rm -rf node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/node_modules
	@echo "✅ All clean!"

# Extended Help
extended-help:
	@echo "Available commands:"
	@echo "  Development:"
	@echo "    dev          - Start development server"
	@echo "    build        - Build the project"
	@echo "    type-check   - Run TypeScript type checking"
	@echo "    lint         - Run linting"
	@echo "  Deployment:"
	@echo "    deploy-vercel    - Deploy to Vercel"
	@echo "    deploy-netlify   - Deploy to Netlify"
	@echo "    deploy-docker    - Deploy using Docker"
	@echo "    docker-build     - Build Docker image"
	@echo "    docker-run       - Run Docker container"
	@echo "  Utilities:"
	@echo "    lighthouse       - Run Lighthouse audit"
	@echo "    analyze          - Analyze bundle size"
	@echo "    security-audit   - Run security audit"
	@echo "    clean-all        - Clean all files"
	@echo "    extended-help    - Show this extended help"

# Windows drive mapping utilities
.PHONY: map-x unmap-x dev-goals-list-x

map-x:
	@echo "🔗 Mapping X: to 'G:\\Общие диски\\Altrp' ..."
	@powershell -NoProfile -Command "if (-not (Get-PSDrive -Name X -ErrorAction SilentlyContinue)) { subst X: 'G:\\Общие диски\\Altrp'; Write-Host '✅ X: mapped' } else { Write-Host 'ℹ️  X: already mapped' }"

unmap-x:
	@echo "🧹 Unmapping drive X: ..."
	@powershell -NoProfile -Command "if (Get-PSDrive -Name X -ErrorAction SilentlyContinue) { subst X: /D; Write-Host '✅ X: unmapped' } else { Write-Host 'ℹ️  X: not mapped' }"

dev-goals-list-x:
	@echo "📋 Listing goals using X:\\lnd-boilerplate\\database.db ..."
	@powershell -NoProfile -Command "$$env:DATABASE_PATH='X:\\lnd-boilerplate\\database.db'; make -C dev dev-goals-list | Out-String | Write-Host"

# External storage verification utilities
.PHONY: verify-storage storage-list

verify-storage:
	@echo "🔎 Verifying external storage (DB and .env) ..."
	@powershell -NoProfile -Command "$$ErrorActionPreference='Stop'; $$cfg = Get-Content 'dev/config.json' -Raw | ConvertFrom-Json; $$db = if ($$env:DATABASE_PATH) { $$env:DATABASE_PATH } else { $$cfg.storage.database.path }; $$dir = Split-Path -Parent $$db; if (-not (Test-Path $$dir)) { Write-Host '❌ Storage directory not found:' $$dir; exit 1 }; $$dbExists = Test-Path $$db; if (-not $$dbExists) { $$alt = Join-Path $$dir '.dev-agent.db'; if (Test-Path $$alt) { Write-Host 'ℹ️ Using alternate DB:' $$alt; $$db = $$alt; $$dbExists = $$true } }; $$envFile = Join-Path $$dir '.env'; $$missing = @(); if (-not $$dbExists) { $$missing += 'database file' }; if (-not (Test-Path $$envFile)) { $$missing += '.env' }; if ($$missing.Count -gt 0) { Write-Host '❌ Missing:' ($$missing -join ', '); exit 2 } else { Write-Host 'Connection to the database and environment established.' }"

storage-list:
	@echo "📂 Listing X:\\lnd-boilerplate ..."
	@powershell -NoProfile -Command "Get-ChildItem -Force 'X:\\lnd-boilerplate' | Select-Object Name,Length,LastWriteTime | Format-Table -AutoSize | Out-String | Write-Host"