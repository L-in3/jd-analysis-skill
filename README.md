# JD Analysis Skill Share

This repository packages a reusable JD analysis skill for GitHub distribution.

## Structure

```text
.github/skills/jd-analysis/
├── SKILL.md
├── README.md
├── scripts/
│   └── save-md-output.js
└── outputs/
    └── .gitkeep
```

## Behavior

- Accept a JD from chat.
- Produce a fixed table-based Markdown analysis.
- Save the final report into the skill's `outputs/` directory.
- Use only relative paths so the skill stays portable across AI platforms.

## Usage

- Ask the AI to run `/jd-analysis`.
- Provide a job description.
- The skill should generate the analysis and save it automatically.

## Notes

- `outputs/` is kept in the repository so consumers can immediately see where generated reports land.
- The script is designed to work with input files or stdin. 
