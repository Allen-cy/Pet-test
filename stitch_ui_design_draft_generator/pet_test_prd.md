# 产品需求文档（PRD）
# 「你的宠物缘分」— 宠物性格匹配测试平台

**版本**：v1.0  
**作者**：Allen  
**日期**：2025  
**状态**：待开发

---

## 一、产品概述

### 1.1 产品定位

一款基于性格测试的宠物匹配工具，通过 18 道趣味题目，结合 AI 生成个性化报告，帮助用户发现自己最适合养的宠物类型。同时服务于已有宠物的用户，提供情感解读和相处建议。

### 1.2 目标用户

- 正在考虑养宠物、还没决定养什么的人（**决策型用户**，付费意愿最强）
- 已经养宠物但觉得"和宠物不够有缘"的人（**共鸣型用户**）
- 喜欢测试类内容、有社交分享习惯的人（**裂变型用户**）

### 1.3 核心价值

> 别人的测试告诉你 MBTI，我们告诉你「你和什么宠物有缘，以及为什么」。

### 1.4 技术栈

| 层级 | 工具 |
|------|------|
| UI 设计 | Stitch |
| 前端（网页版） | Google AI Studio 生成，Vercel 部署 |
| 移动端 | 微信小程序 |
| 后端 | Claude Code（Node.js / Edge Functions） |
| 数据库 | Supabase（PostgreSQL + Auth + Storage） |
| AI 报告生成 | Anthropic Claude API（claude-sonnet） |
| 支付 | 微信支付（小程序端）/ 微信支付 H5（网页端） |

---

## 二、功能范围（v1.0）

### 2.1 功能清单

| 功能模块 | 功能点 | 优先级 | 说明 |
|----------|--------|--------|------|
| 测试流程 | 18 题单选测试 | P0 | 核心流程 |
| 测试流程 | 进度条显示 | P0 | 体验必要 |
| 结果页 | 免费结果展示 | P0 | 宠物类型 + 简短解读 |
| 结果页 | 付费解锁完整报告 | P0 | 核心变现 |
| AI 报告 | 个性化报告生成 | P0 | 调用 Claude API |
| 分享卡片 | 生成可保存的分享图 | P0 | 核心裂变 |
| 支付 | 微信支付 9.9 元 | P0 | 变现必须 |
| 用户系统 | 微信授权登录（小程序） | P1 | 记录付费状态 |
| 用户系统 | 匿名访问（网页版） | P1 | 降低门槛 |
| 数据记录 | 答题结果入库 | P1 | 为后续分析积累数据 |
| 健康档案 | 宠物档案创建 | P2 | v1.1 迭代 |
| 症状自查 | AI 宠物健康问答 | P2 | v1.1 迭代，接入医院数据 |

### 2.2 v1.0 明确不做

- 用户历史记录页面
- 社区/评论功能
- 宠物百科内容
- 多语言
- Apple Pay / 支付宝

---

## 三、用户流程

### 3.1 主流程（小程序端）

```
启动小程序
    ↓
首页（产品介绍 + 开始测试按钮）
    ↓
测试页（18 题，单题单页，滑动切换）
    ↓
计算结果（本地评分，无需网络）
    ↓
免费结果页
├── 展示：宠物类型 + 缘分类型名 + 1 段简短解读（约 80 字）
└── 按钮：「解锁完整报告 ¥9.9」
    ↓
[未付费] 支付弹窗 → 微信支付 → 支付成功
    ↓
完整报告页（AI 生成，约 400 字）
├── 缘分类型名（AI 生成）
├── 为什么适合你（AI 生成，结合答题维度）
├── 你们在一起的日常场景（AI 生成，有画面感）
├── 一个小提醒（AI 生成）
└── 铲屎官人格关键词（3 个，AI 生成）
    ↓
生成分享卡片（canvas 绘制 → 保存相册）
```

### 3.2 网页版流程（Vercel 部署）

与小程序端功能一致，支付方式改为微信支付 H5，登录改为手机号/邮箱（可选，也支持匿名）。

---

## 四、题目与评分系统

### 4.1 四个测量维度

| 维度代码 | 名称 | 题目数 | 测量内容 |
|----------|------|--------|----------|
| A | 生活方式 | 5 题 | 作息、空间、时间投入、出行频率、整洁偏好 |
| B | 情感需求 | 4 题 | 陪伴感需求、互动偏好、噪音接受度、情感角色定位 |
| C | 性格特质 | 4 题 | 耐心、抗压、持续性、决策风格 |
| D | 隐性偏好 | 5 题 | 情感投射、理想瞬间、养宠意义、语言期待、社交场景 |

### 4.2 宠物结果分类（6 类）

| ID | 宠物 | 对应人群特征 |
|----|------|-------------|
| dog | 狗 | 高互动、强依恋、时间充裕、渴望被需要 |
| cat | 猫 | 独立但有情感、节奏自由、需要被理解 |
| rabbit | 兔子 | 温柔安静、仪式感强、不需要高互动 |
| small | 小型啮齿（仓鼠/豚鼠） | 低维护、入门、生活节奏不固定 |
| fish | 鱼/爬行类 | 视觉疗愈、解压、极低互动需求 |
| bird | 鸟/鹦鹉 | 爱交流、需要趣味感、不方便遛宠物 |

### 4.3 评分逻辑

每道题 4 个选项，每个选项对 6 类宠物分别有 0-3 分的隐藏分值。用户完成 18 题后，将 6 类宠物的得分分别累加，最高分对应匹配结果。如并列，取 A 维度得分更高者。

**前端评分数据结构示例：**

```javascript
const questions = [
  {
    id: 1,
    dim: "A",
    text: "你的日常作息节奏是？",
    options: [
      {
        text: "非常规律，几点起几点睡基本固定",
        score: { dog: 3, cat: 1, rabbit: 2, small: 2, fish: 2, bird: 2 }
      },
      {
        text: "大致规律，但偶尔会有波动",
        score: { dog: 2, cat: 2, rabbit: 2, small: 2, fish: 2, bird: 2 }
      },
      {
        text: "不太规律，经常熬夜或作息混乱",
        score: { dog: 0, cat: 3, rabbit: 1, small: 1, fish: 3, bird: 0 }
      },
      {
        text: "完全随心，随遇而安",
        score: { dog: 0, cat: 3, rabbit: 1, small: 1, fish: 3, bird: 1 }
      }
    ]
  }
  // ... 其余 17 题结构相同
];
```

**评分计算（前端本地执行，无需 API）：**

```javascript
function calcResult(answers) {
  const totals = { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 };
  answers.forEach(({ questionId, optionIndex }) => {
    const q = questions.find(q => q.id === questionId);
    const scores = q.options[optionIndex].score;
    Object.keys(scores).forEach(pet => { totals[pet] += scores[pet]; });
  });
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}
```

---

## 五、AI 报告生成

### 5.1 触发时机

用户支付成功后，前端调用后端接口，后端请求 Claude API，生成报告后存入 Supabase，返回给前端展示。

### 5.2 后端接口

**POST** `/api/generate-report`

请求体：
```json
{
  "userId": "uuid",
  "petResult": "cat",
  "dimScores": {
    "A": { "cat": 11, "dog": 4, "rabbit": 8, "small": 7, "fish": 9, "bird": 6 },
    "B": { "cat": 9, "dog": 3, "rabbit": 6, "small": 5, "fish": 7, "bird": 6 },
    "C": { "cat": 8, "dog": 5, "rabbit": 7, "small": 6, "fish": 7, "bird": 5 },
    "D": { "cat": 10, "dog": 2, "rabbit": 5, "small": 5, "fish": 8, "bird": 6 }
  }
}
```

响应体：
```json
{
  "reportId": "uuid",
  "typeName": "独立灵魂的安静陪伴者",
  "whyFit": "...",
  "dailyScene": "...",
  "reminder": "...",
  "keywords": ["不强求", "有边界", "自我愉悦"]
}
```

### 5.3 Claude API Prompt（后端使用）

```
你是一位温柔且有洞察力的宠物缘分分析师。
根据用户的测试结果，生成一份让他/她感到「说中了我」的宠物匹配报告。

用户最匹配的宠物：{petResult}
四维测试得分分布：
- 生活方式（A维）各宠物得分：{A_scores}
- 情感需求（B维）各宠物得分：{B_scores}  
- 性格特质（C维）各宠物得分：{C_scores}
- 隐性偏好（D维）各宠物得分：{D_scores}

请严格按以下 JSON 格式输出，不要输出任何其他内容：
{
  "typeName": "4-10个字的缘分类型名，有诗意，不要太普通",
  "whyFit": "为什么{petResult}最适合你，结合得分特征说具体，2-3句，不要泛泛而谈",
  "dailyScene": "描述你和{petResult}在一起的一个有画面感的日常瞬间，2-3句",
  "reminder": "养{petResult}需要注意的一件最重要的事，1-2句，温柔但直接",
  "keywords": ["关键词1", "关键词2", "关键词3"]
}

要求：
- 口吻温暖、有共鸣感，像一个懂你的朋友在说话
- keywords 要像性格标签，用户愿意展示在分享卡片上
- 不要说废话，每句话都有信息量
- 全程用中文
```

---

## 六、数据库设计（Supabase）

### 6.1 表结构

**users 表**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  openid TEXT UNIQUE,          -- 微信 openid（小程序端）
  phone TEXT,                  -- 手机号（网页端可选）
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**test_sessions 表**
```sql
CREATE TABLE test_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  answers JSONB NOT NULL,       -- 完整答题记录
  dim_scores JSONB NOT NULL,    -- 四维得分分布
  pet_result TEXT NOT NULL,     -- 匹配结果宠物 ID
  is_paid BOOLEAN DEFAULT false,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**reports 表**
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES test_sessions(id),
  type_name TEXT,
  why_fit TEXT,
  daily_scene TEXT,
  reminder TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 6.2 Row Level Security（RLS）策略

```sql
-- 用户只能读取自己的 session
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can read own sessions"
  ON test_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- 报告同理
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can read own reports"
  ON reports FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM test_sessions WHERE user_id = auth.uid()
    )
  );
```

---

## 七、分享卡片规格

### 7.1 技术实现（微信小程序）

使用微信小程序 `Canvas 2D API` 绘制卡片，通过 `wx.canvasToTempFilePath` 导出图片，调用 `wx.saveImageToPhotosAlbum` 保存到相册。

### 7.2 卡片尺寸与元素

| 属性 | 规格 |
|------|------|
| 尺寸 | 640 × 1040px（2x 物理像素，逻辑 320 × 520） |
| 圆角 | 48px |
| 背景 | 每类宠物专属深色渐变（见下表） |
| 字体 | 标题用衬线体，标签用无衬线体 |

**6 类宠物卡片配色：**

| 宠物 | 背景渐变 | 强调色 |
|------|----------|--------|
| 猫 | #2C2420 → #6B4E37 | #E8C9A0 |
| 狗 | #1A2E1A → #4A7040 | #A8D88A |
| 兔子 | #2A1F2E → #5E4480 | #C9B4E8 |
| 啮齿 | #2E2010 → #7A5830 | #F0C878 |
| 鱼类 | #0D1E2E → #1A4A6A | #78C8F0 |
| 鸟类 | #1A2A10 → #4A7020 | #C8E878 |

### 7.3 卡片元素层级

```
[背景渐变层]
[光晕效果层]  ← radial-gradient 30% 亮斑
[内容层]
  ├── 顶部：「🐾 宠物缘分测试」小标
  ├── 缘分类型名（AI 生成，衬线体，强调色）
  ├── 宠物 emoji（大图，68px）
  ├── 宠物名称（最大字，强调色）
  ├── 副标题（固定文案）
  ├── 分割线
  ├── 「铲屎官人格」标签行（AI 生成 3 个）
  └── 底部：产品名 + QR 码占位
```

---

## 八、页面清单

### 8.1 微信小程序页面

| 页面路径 | 功能 |
|----------|------|
| `/pages/index/index` | 首页，产品介绍，开始按钮 |
| `/pages/test/test` | 测试主页面，18 题流程 |
| `/pages/result/result` | 免费结果页 + 付费入口 |
| `/pages/report/report` | 完整报告页（付费后） |
| `/pages/card/card` | 分享卡片生成页 |

### 8.2 网页版页面（Vercel）

| 路由 | 功能 |
|------|------|
| `/` | 首页 |
| `/test` | 测试页 |
| `/result` | 结果页 |
| `/report/[sessionId]` | 报告页 |

---

## 九、变现设计

### 9.1 定价

| 内容 | 价格 |
|------|------|
| 完整 AI 报告 | ¥9.9 |
| 分享卡片（高清版） | 付费后免费赠送 |

### 9.2 付费节点设计原则

免费结果页必须让用户产生「说中了我」的感受，再引导付费。

免费展示内容：
- 宠物类型（如：猫）
- 缘分类型名（AI 生成，如：独立灵魂的安静陪伴者）
- 简短解读，约 80 字，结尾截断，引导解锁

付费解锁内容：
- 完整报告（约 400 字，4 个部分）
- 铲屎官人格关键词（3 个，用于分享卡片）
- 高清分享卡片生成

---

## 十、后端接口清单

| 方法 | 路径 | 功能 | 鉴权 |
|------|------|------|------|
| POST | `/api/session` | 创建测试会话，保存答题结果 | 无（匿名） |
| POST | `/api/pay/create` | 创建支付订单 | 需要 session_id |
| POST | `/api/pay/notify` | 微信支付回调（更新付费状态） | 微信签名验证 |
| POST | `/api/generate-report` | 调用 Claude API 生成报告 | 需验证已付费 |
| GET | `/api/report/:sessionId` | 获取报告内容 | 需验证已付费 |

---

## 十一、非功能需求

| 类别 | 要求 |
|------|------|
| 报告生成时长 | Claude API 调用 ≤ 10 秒，超时显示加载动画 |
| 支付回调 | 微信回调后 3 秒内更新付费状态 |
| 卡片生成 | canvas 绘制 ≤ 3 秒 |
| 数据安全 | 答题数据匿名处理，不强制要求用户手机号 |
| 兼容性 | 微信小程序基础库 ≥ 2.20，网页端支持 Chrome / Safari 最新两个版本 |

---

## 十二、上线检查清单

**上线前必须完成：**
- [ ] 18 道题目完整录入并验证评分逻辑
- [ ] Claude API 报告生成在 6 种宠物类型下均测试通过
- [ ] 微信支付沙箱测试通过
- [ ] 支付成功后报告正确解锁
- [ ] 分享卡片在 iOS / Android 均可正常保存相册
- [ ] Supabase RLS 策略验证，非本人无法读取他人报告
- [ ] Vercel 网页版与小程序端功能同步

**上线后第一周观察：**
- 题目完成率（低于 60% 需优化题目流程）
- 付费转化率（目标 ≥ 15%）
- 分享卡片保存率（目标 ≥ 40%）
- 新用户通过分享卡片进入的比例（裂变系数）

---

## 十三、后续迭代方向（v1.1+）

1. **宠物健康档案**：用户为宠物建档，接入家里宠物医院的品种常见病知识库
2. **AI 症状自查**：描述症状 → AI 给出初步判断和就诊建议
3. **「我和现有宠物的缘分」测试**：针对已养宠物用户的专属测试版本
4. **电子处方预研**：待用户规模达到一定量级后，评估接入处方资质

---

*文档版本 v1.0 | 本文档适用于 Stitch UI 设计、Google AI Studio 前端开发、Claude Code 后端开发参考*
