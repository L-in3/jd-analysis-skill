# JD Analysis Skill  

一个用于将招聘 JD 自动解析为结构化分析结果的 Skill。  
它可以把岗位描述转换成固定表格化输出，帮助用户快速理解岗位本质、补齐知识体系、规划学习路径，并生成面试题与参考答案。

## 主要功能

- 深度解析 JD，提炼岗位本质和隐性要求
- 按优先级整理知识体系
- 解释专业术语，输出通俗定义和排查思路
- 生成学习路径、学习资源和面试题
- 自动将结果保存到 skill 的 outputs 目录

## 适用场景

- 招聘 JD 分析
- 岗位学习路径规划
- 面试准备
- 术语解释与知识补全

## 使用方式

1. 在对话中调用 `/jd-analysis`
2. 提供一份招聘 JD
3. Skill 会自动生成结构化分析结果，并保存到 `outputs/` 目录

## 输出说明

生成内容通常包含以下部分：

- 岗位本质
- 知识体系
- 术语详解
- 学习路径
- 学习资源
- 面试题
- 最后总结

## 目录结构

```text
.github/skills/jd-analysis/
├── SKILL.md
├── README.md
├── scripts/
│   └── save-md-output.js
└── outputs/
    └── .gitkeep
```

## 作者

L-in3 · [GitHub](https://github.com/L-in3)


## 许可

MIT License
```
