# GitHub Copilot Instructions

## Language Rule
- **Always respond in Korean.**
- Regardless of the input language, always reply in Korean.

## Code Review Rule
- When reviewing code or proposing code changes, include a `suggestion` block when the change is safe, self-contained, and directly applicable to the commented lines.
- If a fix requires broader context or spans multiple files, provide the explanation without a `suggestion` block.
- A `suggestion` block must contain **code only**.
- Any explanation must be written **outside** the `suggestion` block.