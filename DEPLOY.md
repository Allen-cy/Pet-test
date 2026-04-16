# 部署指南

## 1. Supabase 数据库设置

### 1.1 创建 Supabase 项目
1. 访问 https://supabase.com 创建账号并新建项目
2. 等待项目创建完成，获取以下信息：
   - **Project URL**: 设置中的 `Project URL`
   - **anon/public key**: 设置中的 `API > Project API keys > anon public`

### 1.2 执行数据库建表
在 Supabase Dashboard 中：
1. 进入 **SQL Editor**
2. 新建查询，复制以下文件内容执行：
   ```
   supabase/migrations/001_initial.sql
   ```

这将创建：
- `test_results` 表 - 存储测试结果
- `pets` 表 - 宠物数据（自动填充6种宠物）
- `questions` 表 - 问卷题目（自动填充18道题）
- `test_stats` 视图 - 统计数据

### 1.3 启用 RLS
上述 SQL 已包含 RLS 策略，启用方式：
```sql
-- 确认 RLS 已启用
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
```

---

## 2. Vercel 部署

### 2.1 连接 GitHub
1. 将项目推送到 GitHub 仓库
2. 访问 https://vercel.com 登录
3. 点击 **New Project** → 导入 GitHub 仓库

### 2.2 配置环境变量
在 Vercel Project Settings → Environment Variables 中添加：

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | 你的 Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | 你的 Supabase anon key |

### 2.3 部署
1. 点击 **Deploy**
2. 等待构建完成
3. 获取访问 URL：`https://your-project.vercel.app`

---

## 3. 本地开发

### 3.1 安装依赖
```bash
npm install
```

### 3.2 配置本地环境变量
复制 `.env.example` 为 `.env`，填入你的 Supabase 信息：
```bash
cp .env.example .env
```

### 3.3 启动开发服务器
```bash
npm run dev
```

---

## 4. API 接口

部署后提供以下 API：

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/save-result` | POST | 保存测试结果 |
| `/api/unlock-report` | POST | 解锁报告 |
| `/api/pets` | GET | 获取宠物数据 |
| `/api/questions` | GET | 获取题目数据 |

### API 示例

**保存测试结果：**
```bash
curl -X POST https://your-app.vercel.app/api/save-result \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "session_123",
    "answers": [{"questionId": 1, "optionIndex": 0}],
    "result_pet": "cat",
    "report_unlocked": false
  }'
```

**获取宠物数据：**
```bash
curl https://your-app.vercel.app/api/pets
```

---

## 5. 目录结构

```
pet-test/
├── api/                      # Vercel Serverless Functions
│   ├── save-result.ts       # 保存测试结果
│   ├── unlock-report.ts     # 解锁报告
│   ├── pets.ts              # 获取宠物数据
│   └── questions.ts         # 获取题目数据
├── supabase/
│   └── migrations/
│       └── 001_initial.sql   # 数据库建表语句
├── src/
│   ├── App.tsx              # 主应用（已集成后端调用）
│   ├── lib/
│   │   └── api.ts           # 前端 API 调用
│   ├── components/          # React 组件
│   ├── data/                # 本地数据（备用）
│   └── utils/               # 工具函数
├── .env                      # 本地环境变量（不提交）
├── .env.example              # 环境变量模板
├── vercel.json              # Vercel 配置
└── package.json
```
