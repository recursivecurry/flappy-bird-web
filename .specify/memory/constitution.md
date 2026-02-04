<!--
=== SYNC IMPACT REPORT ===
Version change: 0.0.0 → 1.0.0
- This is the initial ratification of the constitution

Added Principles:
- I. Simplicity First (KISS & YAGNI)
- II. Don't Repeat Yourself (DRY)
- III. The Zen of Python
- IV. Human-Readable Code
- V. Test-Driven Development

Added Sections:
- Code Quality Standards
- Development Workflow

Templates Status:
- ✅ .specify/templates/plan-template.md - compatible (Constitution Check section present)
- ✅ .specify/templates/spec-template.md - compatible (testing scenarios supported)
- ✅ .specify/templates/tasks-template.md - compatible (test-first workflow documented)

Follow-up TODOs: None
========================
-->

# Flappy Bird Constitution

## Core Principles

### I. Simplicity First (KISS & YAGNI)

Write simple code that solves current requirements. Do NOT anticipate hypothetical future needs.

- **MUST** choose direct and clear implementations over complex patterns
- **MUST NOT** create features, abstractions, or extension points not currently needed
- **MUST NOT** add code "just in case it might be needed later"
- **MUST** refactor only when a real need arises
- **MUST** justify any complexity beyond the minimum required for the current task

**Rationale**: Three similar lines of code is better than a premature abstraction.
Complexity is a cost that must be paid continuously; simplicity pays dividends.

### II. Don't Repeat Yourself (DRY)

Eliminate duplication by maintaining a single source of truth.

- **MUST** extract repeated logic into functions or modules when the same concept appears three times (Rule of Three)
- **MUST** use constants or configuration for repeated values
- **MUST** apply inheritance or composition to share behavior across classes when appropriate
- **MUST** distinguish between true duplication (same concept) and coincidental similarity (different concepts that happen to look alike)
- **MUST** balance DRY with readability; premature abstraction creates unnecessary complexity

**Rationale**: Duplication leads to inconsistency and maintenance burden. A single source
of truth ensures changes propagate correctly throughout the codebase.

### III. The Zen of Python

Apply the Zen of Python principles to all code, regardless of programming language.

- Beautiful is better than ugly
- Explicit is better than implicit
- Simple is better than complex
- Complex is better than complicated
- Flat is better than nested
- Sparse is better than dense
- Readability counts
- Special cases aren't special enough to break the rules (although practicality beats purity)
- Errors should never pass silently (unless explicitly silenced)
- In the face of ambiguity, refuse the temptation to guess
- There should be one—and preferably only one—obvious way to do it
- If the implementation is hard to explain, it's a bad idea
- If the implementation is easy to explain, it may be a good idea

**Rationale**: These principles transcend Python and provide universal guidance for
writing maintainable, understandable code in any language.

### IV. Human-Readable Code

Code MUST be easy for humans to read and understand. Code is read far more often than written.

- **MUST** use variable, function, and class names that clearly reveal intent
- **MUST** break down complex logic into small functions with descriptive names
- **MUST** write comments that explain "why" while the code expresses "what"
- **MUST** maintain consistent code style (use language-appropriate linters/formatters)
- **MUST NOT** use magic numbers or hardcoded strings; define them as named constants
- **MUST** keep functions short and focused on a single responsibility

**Rationale**: Code that is easy to read is easy to maintain, debug, and extend.
Self-documenting code reduces cognitive load and onboarding time.

### V. Test-Driven Development

Every implementation MUST be accompanied by tests that verify its correctness.

- **MUST** write tests for all new functionality
- **SHOULD** follow Red-Green-Refactor cycle: write failing test → implement → refactor
- **MUST** ensure tests are independent and can run in any order
- **MUST** test edge cases and error conditions, not just the happy path
- **MUST** keep tests readable and maintainable—tests are documentation
- **MUST NOT** commit code that breaks existing tests

**Rationale**: Tests provide confidence in code correctness, enable safe refactoring,
serve as living documentation, and catch regressions early.

## Code Quality Standards

- **Linting**: All code MUST pass configured linters without warnings
- **Formatting**: All code MUST follow consistent formatting (automated formatters preferred)
- **Type Safety**: Use type hints/annotations where the language supports them
- **Error Handling**: Handle errors gracefully; never swallow exceptions silently
- **Logging**: Add meaningful log messages for debugging and observability

## Development Workflow

1. **Understand First**: Read and understand existing code before modifying
2. **Plan**: Break work into small, testable increments
3. **Test**: Write tests before or alongside implementation
4. **Implement**: Write the simplest code that passes the tests
5. **Refactor**: Improve code structure while keeping tests green
6. **Review**: Verify code meets all constitution principles before committing

## Governance

This constitution establishes the foundational principles for the Flappy Bird project.

- **Compliance**: All code contributions MUST adhere to these principles
- **Review**: Code reviews MUST verify compliance with constitution principles
- **Amendments**: Changes to this constitution require documentation of rationale and
  impact on existing code
- **Versioning**: Constitution follows semantic versioning (MAJOR.MINOR.PATCH)
  - MAJOR: Backward-incompatible principle changes or removals
  - MINOR: New principles or materially expanded guidance
  - PATCH: Clarifications, wording improvements

**Version**: 1.0.0 | **Ratified**: 2026-02-04 | **Last Amended**: 2026-02-04
