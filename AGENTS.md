# AGENTS.md

## Purpose
This file defines the operating rules for agents working in this repository. Follow these instructions by default unless the user explicitly overrides them.

---

## 1) Plan First (Default)
- Enter plan mode for **any non-trivial task**:
  - 3+ steps, architectural decisions, refactors, migrations, CI failures, or anything risky/unclear.
- Write a short plan with **checkable items** before implementation.
- If anything goes sideways (unexpected errors, unclear requirements, failing tests), **STOP** and re-plan immediately.

---

## 2) Scope & Execution Discipline
- Make the **minimal necessary change** to satisfy the requirement.
- Avoid drive-by refactors, cleanup, or unrelated improvements.
- Prefer simple, maintainable solutions over clever ones.
- If a fix feels hacky, pause and ask: **“Is there a more elegant way?”**  
  - Implement the elegant solution when complexity warrants it.  
  - Skip elegance optimization for obvious, trivial fixes.

---

## 3) Subagent Strategy
- Use subagents liberally to keep the main context clean.
- Offload research, exploration, and parallel analysis to subagents.
- **One task per subagent** for focused execution.

---

## 4) Verification Before Done (Definition of Done)
Never mark work complete without evidence.

**Required before “done”:**
- Relevant tests run and passing.
- Lint/type checks run and passing (when applicable).
- Logs/errors reviewed if debugging.
- Behavior validated (repro steps + observed result).

Ask yourself: **“Would a staff engineer approve this?”**

---

## 5) Autonomous Bug Fixing
- When given a bug report: **fix it** without requiring hand-holding.
- Use logs, failing tests, and error traces to find root cause, then resolve it.
- Do not require user context switching for basic debugging steps.
- Fix failing CI tests without being told how.

---

## 6) Task Management (Repository Workflow)
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items.
2. **Verify Plan**: Check in before starting implementation.
3. **Track Progress**: Mark items complete as you go.
4. **Explain Changes**: Provide a high-level summary at each step.
5. **Document Results**: Add a short review section to `tasks/todo.md`.
6. **Capture Lessons**: After ANY correction from the user, update `tasks/lessons.md` with:
   - what went wrong
   - why it happened
   - the rule that prevents it next time

---

# Project Conventions

## Dev Environment Tips (pnpm / turbo)
- Use `pnpm dlx turbo run where <project_name>` to jump to a package instead of scanning with `ls`.
- Run `pnpm install --filter <project_name>` to add the package to your workspace so Vite, ESLint, and TypeScript can see it.
- Use `pnpm create vite@latest <project_name> -- --template react-ts` to spin up a new React + Vite package with TypeScript checks ready.
- Check the `name` field inside each package’s `package.json` to confirm the right name — skip the top-level one.

---

## Testing Instructions
- Find the CI plan in `.github/workflows`.
- Run `pnpm turbo run test --filter <project_name>` to run every check defined for that package.
- From the package root you can run `pnpm test`.
- To focus on one step, use Vitest targeting:
  - `pnpm vitest run -t "<test name>"`
- Fix any test, lint, or type errors until the whole suite is green.
- After moving files or changing imports, run:
  - `pnpm lint --filter <project_name>`
- Add or update tests for code you change, even if nobody asked.

---

## PR / Commit Instructions
- PR title format: `[<project_name>] <Title>`
- Always run `pnpm lint` and `pnpm test` before committing.
- The commit/PR must pass CI before merge.

---
## Core Principles
- **Simplicity First**: Make every change as simple as possible; minimize impact.
- **No Laziness**: Find root causes; no temporary fixes; senior developer standards.
- **Minimal Impact**: Touch only what’s necessary; avoid introducing bugs.
