---
name: jd-analysis
description: 'Use when the user provides a job description (JD), 招聘岗位描述, 职位描述, or asks for 准备面试, 学习路径, 知识体系, 术语解释, or 岗位深度分析. Produce a structured JD breakdown, knowledge map, learning plan, resources, and interview questions.'
argument-hint: 'Paste the JD and optionally the target level, industry, and timeline.'
user-invocable: true
disable-model-invocation: false
---

# JD Analysis Skill

Use this skill when the user provides a JD and wants a complete, practical analysis for understanding the role, planning study, and preparing for interviews.

## Core Outcome

Turn a JD into a structured career-prep package with these outputs:

1. Deep JD analysis
2. Knowledge system by priority
3. Plain-language explanation of professional terms
4. Study roadmap with sequence and pacing
5. Free or easy-to-access learning resources
6. Interview questions with answer ideas

## When to Use

- The user shares a招聘岗位描述、职位描述、JD、岗位职责或任职要求
- The user asks what the role really needs beyond the listed bullets
- The user wants a study plan for entering or leveling up into the role
- The user wants interview preparation based on the JD
- The user wants jargon explained in simple terms

## Procedure

1. Read the JD carefully and separate it into role summary, responsibilities, requirements, preferences, and implied expectations.
2. Infer the job's essence: the business goal, the real work content, and the hidden constraints behind the wording.
3. Build a three-layer knowledge map:
   - 必备基础: minimum knowledge needed to do the job
   - 核心竞争力: what distinguishes a strong candidate
   - 加分拓展: useful adjacent knowledge that raises ceiling
4. Extract every professional term, acronym, framework, technology, method, and domain concept mentioned in the JD.
5. For each term, explain:
   - 通俗定义
   - 业务意义
   - 常见异常或误区
   - 排查思路或应对方法
6. Convert the knowledge map into a learning roadmap.
   - Specify what to learn first, second, and third
   - Give time blocks or weekly stages when the user asks for scheduling
   - Keep the sequence realistic and dependency-aware
7. Recommend learning resources for each module.
   - Prefer free or easy-to-access resources
   - Prefer official docs, high-quality articles, open courses, public videos, or canonical books with accessible summaries
8. Generate interview questions.
   - Cover basics, scenario questions, behavioral questions, and role-specific deep dives
   - Add answer directions instead of overly polished sample scripts unless the user asks for full answers

## Output Structure

Use the fixed table output template in [./assets/output-template.md](./assets/output-template.md) for every final response.

Do not mix in bullet-list sections in the final answer unless the user explicitly asks for a different format.

## Helper Script

After generating the final Markdown report, save it immediately into this skill folder's `outputs/` folder using [./scripts/save-md-output.js](./scripts/save-md-output.js).

Execution contract:

1. The skill must always resolve the script path relative to the skill root, not a machine-specific absolute path.
2. The skill must write the final report into `outputs/` under the skill folder.
3. The user should not need to perform any manual save step after the analysis is generated.
4. If the host AI cannot write files directly, it should still produce the final Markdown and the target filename so the wrapper can persist it.
5. Use `--strict` when you want validation failure to block saving.

### Internal Save Pattern
```
node ./scripts/save-md-output.js --input ./report.md --name <输出文件名> --strict
```

## Quality Criteria

- Do not repeat the JD verbatim; synthesize it into actionable conclusions.
- Distinguish explicit requirements from inferred requirements.
- Prioritize what matters for passing interviews and doing the job well.
- Keep explanations accessible to users who are still learning the field.
- Be specific about dependencies: do not recommend advanced topics before fundamentals.
- If the JD is missing critical context, ask for only the minimum needed clarification, such as target level, industry, or timeline.
- If the user wants a fast answer, provide a compressed version first and offer a deeper version next.

## Completion Check

Before finishing, ensure the response answers all of the following:

- What does this role really do?
- What knowledge is needed and in what order?
- What do the terms mean in plain language?
- How should the user study it over time?
- What resources can they use?
- What interview questions should they prepare for?

## Example Invocation

- 输入一份 JD，让我分析这个岗位并给出学习路径
- 帮我把这份招聘描述拆成知识体系和面试题
- 这是一个后端岗位的 JD，请解释术语并规划 8 周学习计划
