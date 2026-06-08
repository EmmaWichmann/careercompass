# Coding Question Log

Use this as a spaced-repetition review system for coding concepts, missed questions, and small debugging exercises.

## How To Use

- Practice concepts in `study-mode.html`.
- If a card feels confusing, choose `Again`.
- If a multiple-choice answer is wrong, it is automatically added to the missed-concepts log.
- Review missed concepts on the next scheduled day.
- If you get one wrong again, move it back to `1d`.
- If you get it right, move it forward to the next review step.

## Review Steps

- `1d`
- `3d`
- `7d`
- `14d`
- `30d`

## Current Practice Types

| Type | What It Does | Example |
| --- | --- | --- |
| Cloze | Hides one key concept | `<p>` creates a _____ |
| Multiple choice | Gives a small set of answers | What does `<input>` give the user? |
| Find the mistake | Shows broken code to debug | `getElementByID` should be `getElementById` |
| Predict | Ask what code will do | What does `event.preventDefault()` stop? |

## Concepts Currently Covered

- `h1`
- `h2`
- `p`
- `button`
- `input`
- `div`
- `ul`
- `li`
- `id`
- `margin`
- `padding`
- `CSS Grid`
- responsive layout
- hero sections
- visual hierarchy
- `document`
- `document.getElementById()`
- `const`
- `.value`
- `textContent`
- `addEventListener()`
- `event.preventDefault()`
- `localStorage`

## Missed-Concept Log

The interactive page stores missed concepts in the browser with `localStorage`, so it can track:

- concept prompt
- topic
- number of times missed
- next review date
- whether the concept has been reviewed again
