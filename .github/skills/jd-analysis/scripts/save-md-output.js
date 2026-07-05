#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    process.stdin.on('end', () => resolve(Buffer.concat(chunks)));
    process.stdin.on('error', reject);
  });
}

function decodeBuffer(buffer) {
  if (!buffer || buffer.length === 0) {
    return '';
  }

  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    return buffer.slice(3).toString('utf8');
  }

  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.slice(2).toString('utf16le');
  }

  const utf8 = buffer.toString('utf8');
  const nullMatches = utf8.match(/\u0000/g);
  const nullRatio = nullMatches ? nullMatches.length / Math.max(utf8.length, 1) : 0;

  if (nullRatio > 0.1) {
    return buffer.toString('utf16le');
  }

  return utf8;
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function extractTitle(markdown) {
  const firstHeading = String(markdown).match(/^#\s+(.+)$/m);
  if (firstHeading && firstHeading[1]) {
    return firstHeading[1].trim();
  }

  const titleLine = String(markdown).match(/^标题[：:]\s*(.+)$/m);
  if (titleLine && titleLine[1]) {
    return titleLine[1].trim();
  }

  const roleLine = String(markdown).match(/^\|\s*岗位名称\s*\|\s*(.*?)\s*\|\s*$/m);
  if (roleLine && roleLine[1]) {
    return roleLine[1].trim();
  }

  return '';
}

function validateMarkdown(markdown) {
  const requiredMarkers = [
    '## 0. 概览',
    '## 1. 岗位本质',
    '## 2. 知识体系',
    '## 3. 术语详解',
    '## 4. 学习路径',
    '## 5. 学习资源',
    '## 6. 面试题',
    '## 7. 最后总结',
    '| 题目 | 题目意图 | 回答思路 | 参考答案 |',
  ];

  return requiredMarkers.filter((marker) => !String(markdown).includes(marker));
}

function buildOutputPath(name, markdown) {
  const outputsDir = path.resolve(__dirname, '..', 'outputs');
  fs.mkdirSync(outputsDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const extractedTitle = extractTitle(markdown);
  const baseName = slugify(name || extractedTitle) || `jd-analysis-${timestamp}`;
  const fileName = baseName.endsWith('.md') ? baseName : `${baseName}.md`;
  return path.join(outputsDir, fileName);
}

function saveMarkdown(markdown, filePath) {
  fs.writeFileSync(filePath, String(markdown).trim() + '\n', 'utf8');
  return filePath;
}

function normalizeInput(inputFile) {
  const absolutePath = path.resolve(process.cwd(), inputFile);
  const buffer = fs.readFileSync(absolutePath);
  return decodeBuffer(buffer).trim();
}

async function main() {
  const args = process.argv.slice(2);
  let explicitName = '';
  let inputFile = '';
  const strictMode = args.includes('--strict');

  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === '--input') {
      inputFile = args[index + 1] || '';
      index += 1;
      continue;
    }

    if (value === '--name') {
      explicitName = args[index + 1] || '';
      index += 1;
      continue;
    }

    if (!value.startsWith('-') && !explicitName) {
      explicitName = value;
    }
  }

  let content = '';
  if (inputFile) {
    content = normalizeInput(inputFile);
  } else {
    const raw = await readStdin();
    content = decodeBuffer(raw).trim();
  }

  if (!content) {
    console.error('No Markdown content received from stdin.');
    process.exit(1);
  }

  const missing = validateMarkdown(content);
  if (missing.length > 0) {
    const message = `Markdown does not fully match the fixed JD analysis template. Missing markers: ${missing.join(', ')}`;
    if (strictMode) {
      console.error(message);
      process.exit(1);
    }

    console.warn(message);
  }

  const filePath = buildOutputPath(explicitName, content);
  saveMarkdown(content, filePath);
  console.log(filePath);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
