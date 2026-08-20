# CLAUDE.md

Rules to obey when working in this repository. This file is behavior;

# CLAUDE.md

- NEVER create a git commit withought my permission. and do NOT by any circumstances create yourself as a co-author, with or withought my approval.

This file is **behavior**: rules to obey when working in this repository.
If an `OVERVIEW.md` exists, it is the **map** of what exists and where — read it
for orientation, obey this file for conduct.

**Precedence:** if a rule here conflicts with a pattern you see in the code,
this file wins — surface the conflict out loud, don't silently follow the code.

Keep this file lean. It loads into context every session. Architecture detail
belongs in `OVERVIEW.md`, not here.

---

## Source of truth

Content, config, and data each have exactly one authoritative location. Never
hardcode a value into a component or module when a source-of-truth file exists
for it.

**Duplication trap:** if any data ends up hand-duplicated across two places (a
full list and a preview list, a type and its runtime schema, a constant and a
doc), changing one does **not** update the other. Any edit to one must be checked
against the other, and you must tell me explicitly whether the counterpart also
needs updating. If you are about to create such a pair, say so before you do.

## Vendored and third-party code

Third-party files are black boxes: no refactoring, renaming, reformatting,
lint-fixing, or "cleaning up." They are exempt from every code standard below.
Touch them only at their boundary interface, and only if I ask directly.

If a task appears to require editing generated output, deployment config, or
anything vendored, **stop and tell me** what you'd need to change and why. Do not
work around it by creating a parallel file or folder.

---

## Code standards

### Naming — non-negotiable

**No single-letter variable names. Ever.** Not in loops, not in callbacks, not
in `catch` blocks, not in `map`/`filter`/`reduce`, not in one-line arrow
functions.

| Instead of | Write                                                       |
| ---------- | ----------------------------------------------------------- |
| `i`        | `index`                                                     |
| `j`        | `innerIndex` / `columnIndex`                                |
| `f`        | `frontend` / `file` / `formatter` (whatever it actually is) |
| `e`        | `event` or `error` — pick the one it is                     |
| `t`        | `time`                                                      |
| `d`        | `data` or `date` — pick the one it is                       |
| `el`       | `element`                                                   |
| `res`      | `response` or `result`                                      |
| `req`      | `request`                                                   |
| `c`        | `course`, `char`, `client` — name the domain thing          |
| `arr`      | `courseList` — name the contents, not the type              |
| `tmp`      | what it's temporarily holding                               |

Only exception: generic type parameters (`<T>`, `<K>`) in typed languages.

Further naming rules:

- Names describe the thing, not its type. `courseList`, not `arr`.
- Booleans read as assertions: `isOpen`, `hasLink`, `showCursor`, `canSubmit`.
- Event handlers are `handleX`. Callback props are `onX`.
- Abbreviations are only acceptable if they're domain-standard and unambiguous
  (`id`, `url`, `api`). Everything else spells out.

### Structure — prefer object-oriented modeling where it earns its place

Reach for a class/module-with-state when **any** of these are true:

- State and the behavior that operates on it belong together and travel together.
- The same logic is repeated across three or more call sites.
- The concept has real invariants that should be impossible to violate from
  outside (validation, ordering, lifecycle).
- There are multiple implementations behind one shape (strategy, adapter, driver).

Do **not** force it:

- Never use classes for UI components in hook-based frameworks (React and
  equivalents) — function components only.
- Never wrap a single pure function in a class to look object-oriented.
- Never build an inheritance chain where composition or a plain function does
  the job.

If it's a genuine judgment call, name both options in one line, pick one, move on.

### Comments

Document non-obvious functions and logic with a short comment saying **why**,
not what. Date math, unit conversion, financial/grade math, color math,
concurrency, framework workarounds, and anything that looks wrong but isn't all
qualify. Self-evident code gets no comment.

### Formatting

Match the file you're editing. If a formatter config exists, it wins. If it
doesn't, match surrounding style and **do not reformat files you aren't
otherwise editing** — a reformat buried in a feature diff is unreviewable.

### Types (typed languages)

- Assume strict mode, including unused-local and unused-parameter errors — an
  unused variable is a build failure, not a warning.
- No `any` (or equivalent escape hatch). If you can't type it, use `unknown`,
  narrow it, and tell me.
- No non-null assertions to silence the compiler. Handle the null case.
- Type function/component inputs explicitly at every boundary.

---

## Workflow

- **Plan before editing.** Anything touching more than one file: state the plan —
  which files, what changes in each — and **wait** for approval. Single-file
  obvious fixes: just do it.
- **No new dependencies without asking.** Name the package, why it's needed, and
  the bundle/install cost. Prefer 30 lines of code over a package.
- **No new files without asking**, unless an approved plan already included them.
- **Do not invent scripts or commands.** Run what exists. If the command you need
  doesn't exist, say so instead of guessing at one.
- **Run the build after any change.** A task is not done until the build passes.
  Run the linter too if you touched more than one file.
- **Do not modify build/tooling config** (package manifests, compiler config,
  bundler config, lint config, server config) without flagging it as its own
  decision and waiting.
- **Do not claim anything is "tested" or "verified"** unless a test suite exists
  and you ran it. If a change needs manual checking, say exactly what to click
  or run.
- **After any structural change** (files added/moved/deleted, new route, new
  feature), tell me which docs are now stale — including this one.
- **Report known gaps, don't silently fix them.** Dead code, placeholders, stubs,
  and unused deps get reported to me. Fix them only if I ask.

## Version control

- **Do not commit.** No `git commit`, `git push`, `git checkout`, no staging.
  I handle version control.
- **Commit messages are mine.** When I write one, do not auto-correct or rewrite
  it. You may offer suggestions; that is all.
- **Never list yourself as Author or Co-Author** on any commit.

## Destructive operations

Audit before deleting. Before removing files, dropping data, or rewriting
history: list what would be removed, say why each item is safe to remove, and
wait for confirmation. Sequence work by risk — safe consolidation first,
destructive changes last.

---

## Communication

- Terse. Show the diff, one line on what it does. No restating my request, no
  preamble about what you're about to do, no closing pleasantries.
- Flag uncertainty explicitly rather than picking silently. Two defensible
  options: name both in one line, pick one, move on.
- Mark unverified assumptions inline with `⚠️ VERIFY` rather than guessing quietly.
- If you didn't do part of what I asked, say so plainly **at the top**. Never let
  an incomplete task read as complete.
