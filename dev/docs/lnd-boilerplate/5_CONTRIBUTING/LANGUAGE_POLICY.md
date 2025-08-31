# Language Validation Policy

To ensure code quality, maintainability, and accessibility for a global team, this project enforces a strict **English-only** language policy across all GitHub interactions and within the codebase.

## What is Validated?

This policy is automatically enforced in the following areas:

*   **Local Git Hooks:**
    *   `pre-commit`: Validates staged files for Russian/Cyrillic characters in code and comments.
    *   `commit-msg`: Validates commit messages.
*   **GitHub Actions (CI):**
    *   Pull Request titles and descriptions.
    *   Issue titles and descriptions.
    *   Comments on issues and PRs.
    *   All commit messages within a push.

## Rules

### ✅ Allowed
- English language only.
- Standard ASCII characters.
- Technical terms and code snippets.

### ❌ Disallowed
- Any Russian/Cyrillic characters (а-я, ё).
- Any non-English text in commit messages, PRs, issues, code comments, or documentation.

## Examples

### ✅ Good Commit Messages
```
feat: add user authentication system
fix: resolve memory leak in data processing
docs: update API documentation
```

### ❌ Bad Commit Messages
```
feat: добавить систему аутентификации пользователей
fix: исправить утечку памяти
```

## Bypassing Validation (Not Recommended)

For emergency hotfixes where immediate deployment is critical, you may bypass the local pre-commit hook using the `--no-verify` flag.

```bash
git commit --no-verify -m "hotfix: resolve critical production issue"
```
**Important:** This should be used sparingly. You must create a follow-up PR to fix any non-compliant text introduced. This does not bypass the GitHub Action checks.

## Troubleshooting

If a commit or PR is rejected by the validation system:
1.  Read the error message carefully to identify the source.
2.  Review your commit message, PR title/description, and any changed files for non-English text or Cyrillic characters.
3.  Correct the text and commit/push again.