# JD Analysis Skill

This skill turns a job description into a fixed table-based analysis and saves the result into the skill's `outputs/` folder.

## Usage

1. Ask the AI to run `/jd-analysis`.
2. Paste the JD.
3. The skill should generate the analysis and save it automatically.

## Compatibility

- Uses relative paths only.
- Works across AI platforms as long as the host can read the skill files and run scripts or write files.
- If the host cannot write files directly, it should still return the final Markdown and target filename so an outer wrapper can persist it.

## Output Directory

- Saved reports go to `outputs/`.
- Filenames use `--name` when provided, otherwise the report title or role name.

## Notes

- `--strict` blocks saving when validation fails.
- The script handles common encoding issues.
- No extra manual save step should be needed after the analysis is generated.
