# Tasks: Flappy Bird Web Game

**Input**: Design documents from `/specs/001-flappy-bird-game/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: Included per constitution requirement (V. Test-Driven Development)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project directory structure per implementation plan
- [ ] T002 Initialize TypeScript project with package.json in package.json
- [ ] T003 [P] Configure TypeScript compiler in tsconfig.json
- [ ] T004 [P] Configure Vite build tool in vite.config.ts
- [ ] T005 [P] Configure Vitest testing in vite.config.ts
- [ ] T006 [P] Create HTML entry point in public/index.html
- [ ] T007 [P] Create base CSS styles in public/styles.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests for Foundational

- [ ] T008 [P] Write tests for type definitions in tests/types.test.ts
- [ ] T009 [P] Write tests for config constants and difficulty presets in tests/config.test.ts

### Implementation for Foundational

- [ ] T010 [P] Define TypeScript types (Bird, Pipe, GameState, Difficulty, BoundingBox) in src/types.ts
- [ ] T011 [P] Define game constants and difficulty presets (Low/Middle/High) in src/config.ts
- [ ] T012 Create game entry point and canvas initialization in src/index.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Play Basic Game (Priority: P1) 🎯 MVP

**Goal**: Core gameplay loop with bird, gravity, pipes, and collision detection

**Independent Test**: Open game in browser, click to flap, navigate through pipes, verify collision ends game

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Write tests for Bird physics (gravity, flap, position update) in tests/bird.test.ts
- [ ] T014 [P] [US1] Write tests for Pipe (movement, off-screen check, bounding boxes) in tests/pipe.test.ts
- [ ] T015 [P] [US1] Write tests for AABB collision detection in tests/collision.test.ts
- [ ] T016 [P] [US1] Write tests for game state transitions (menu→playing→gameOver) in tests/game.test.ts

### Implementation for User Story 1

- [ ] T017 [P] [US1] Implement Bird entity with flap(), update(), getBoundingBox() in src/bird.ts
- [ ] T018 [P] [US1] Implement Pipe entity with update(), isOffScreen(), getTopRect(), getBottomRect() in src/pipe.ts
- [ ] T019 [US1] Implement AABB collision detection (checkCollision, checkBoundaryCollision) in src/collision.ts
- [ ] T020 [US1] Implement input handler for click/tap/keyboard events in src/input.ts
- [ ] T021 [US1] Implement canvas renderer (drawBird, drawPipe, drawBackground) in src/renderer.ts
- [ ] T022 [US1] Implement game loop with requestAnimationFrame and delta time in src/game.ts
- [ ] T023 [US1] Implement pipe spawning and despawning logic in src/game.ts
- [ ] T024 [US1] Implement game state management (menu, playing, gameOver transitions) in src/game.ts
- [ ] T025 [US1] Integrate all components and verify basic gameplay works in src/index.ts

**Checkpoint**: User Story 1 complete - basic Flappy Bird gameplay functional

---

## Phase 4: User Story 2 - Select Difficulty Before Game (Priority: P1)

**Goal**: Difficulty selection screen with Low/Middle/High options affecting gameplay

**Independent Test**: Start game, see three difficulty buttons, select each and verify different gap sizes and speeds

### Tests for User Story 2

- [ ] T026 [P] [US2] Write tests for difficulty selection and parameter application in tests/game.test.ts
- [ ] T027 [P] [US2] Write tests for menu screen rendering in tests/renderer.test.ts

### Implementation for User Story 2

- [ ] T028 [US2] Implement menu screen UI with difficulty buttons in src/renderer.ts
- [ ] T029 [US2] Implement difficulty selection click handling in src/input.ts
- [ ] T030 [US2] Implement difficulty application to pipe gap and scroll speed in src/game.ts
- [ ] T031 [US2] Integrate menu→gameplay transition with selected difficulty in src/game.ts

**Checkpoint**: User Story 2 complete - difficulty selection functional, game parameters adjust per selection

---

## Phase 5: User Story 3 - View Score and Game Over (Priority: P2)

**Goal**: Score display during gameplay and final score on game over screen

**Independent Test**: Play game, verify score increments when passing pipes, verify game over shows final score

### Tests for User Story 3

- [ ] T032 [P] [US3] Write tests for score increment logic (pipe passed detection) in tests/game.test.ts
- [ ] T033 [P] [US3] Write tests for score and game over UI rendering in tests/renderer.test.ts

### Implementation for User Story 3

- [ ] T034 [US3] Implement pipe-passed detection for scoring in src/game.ts
- [ ] T035 [US3] Implement current score display during gameplay in src/renderer.ts
- [ ] T036 [US3] Implement game over screen with final score and restart button in src/renderer.ts
- [ ] T037 [US3] Implement restart flow (game over → menu) in src/game.ts

**Checkpoint**: User Story 3 complete - scoring and game over fully functional

---

## Phase 6: Edge Cases & Window Handling

**Goal**: Handle edge cases including pause on window resize (per clarification)

**Independent Test**: Resize browser during gameplay, verify game pauses, tap to resume

### Tests for Edge Cases

- [ ] T038 [P] Write tests for pause/resume on window resize in tests/game.test.ts
- [ ] T039 [P] Write tests for ceiling boundary collision in tests/collision.test.ts

### Implementation for Edge Cases

- [ ] T040 Implement window resize listener and pause state transition in src/game.ts
- [ ] T041 Implement paused screen UI with "Tap to Resume" message in src/renderer.ts
- [ ] T042 Implement resume on tap/click from paused state in src/input.ts
- [ ] T043 Implement ceiling collision detection in src/collision.ts

**Checkpoint**: All edge cases handled - game is robust

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation

- [ ] T044 [P] Verify all tests pass with npm run test
- [ ] T045 [P] Run linting and fix any issues with npm run lint
- [ ] T046 Validate quickstart.md instructions work end-to-end
- [ ] T047 Test on mobile browser (touch input)
- [ ] T048 Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] T049 Performance check: verify 60fps on standard devices

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 and US2 are both P1, but US1 provides core mechanics US2 builds on
  - US3 (P2) can start after Foundational but benefits from US1 completion
- **Edge Cases (Phase 6)**: Depends on US1 completion (needs gameplay to test pause)
- **Polish (Phase 7)**: Depends on all previous phases

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Adds to US1 but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 for scoring

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Types and config before entities
- Entities (Bird, Pipe) before game logic
- Game logic before rendering
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks T003-T007 can run in parallel
- All Foundational tests T008-T009 can run in parallel
- Foundational types T010-T011 can run in parallel
- US1 tests T013-T016 can run in parallel
- US1 entities T017-T018 can run in parallel
- US2 tests T026-T027 can run in parallel
- US3 tests T032-T033 can run in parallel
- Edge case tests T038-T039 can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Write tests for Bird physics in tests/bird.test.ts"
Task: "Write tests for Pipe in tests/pipe.test.ts"
Task: "Write tests for collision detection in tests/collision.test.ts"
Task: "Write tests for game state transitions in tests/game.test.ts"

# Launch Bird and Pipe entities together:
Task: "Implement Bird entity in src/bird.ts"
Task: "Implement Pipe entity in src/pipe.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test basic gameplay independently
5. Demo/deploy basic playable game

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Basic gameplay works!
3. Add User Story 2 → Test independently → Difficulty selection works!
4. Add User Story 3 → Test independently → Scoring and game over work!
5. Add Edge Cases → Full robustness
6. Polish → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core gameplay)
   - Developer B: User Story 2 (menu/difficulty - can mock gameplay)
3. After US1 complete:
   - Developer A: User Story 3 (scoring)
   - Developer B: Edge Cases (pause/resize)
4. Final integration and polish

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD per constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Total: 49 tasks across 7 phases
