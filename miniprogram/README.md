# 宠物缘分测试 - 微信小程序

## 项目结构

```
miniprogram/
├── app.json          # 应用配置
├── app.ts            # 应用入口
├── app.wxss          # 全局样式
├── project.config.json  # 项目配置
├── pages/
│   ├── index/        # 首页
│   ├── test/         # 测试页
│   ├── result/       # 结果页
│   ├── report/       # 报告页
│   └── card/         # 卡片页
└── utils/            # 工具函数
```

## 部署步骤

### 1. 安装开发者工具

下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### 2. 导入项目

1. 打开微信开发者工具
2. 点击「导入项目」
3. 选择 `miniprogram` 文件夹
4. 填写 AppID（在微信公众平台获取）

### 3. 配置 AppID

在 `project.config.json` 中修改：
```json
{
  "appid": "your-appid"
}
```

### 4. 开发调试

1. 在开发者工具中点击「编译」
2. 使用手机微信扫码预览
3. 开启「开发环境」调试

### 5. 上传代码

1. 点击「上传」按钮
2. 填写版本号和备注
3. 在微信公众平台提交审核

### 6. 发布

审核通过后，在微信公众平台点击「发布」

---

## 与 Web 版的区别

| 功能 | Web 版 | 小程序版 |
|------|--------|----------|
| 部署平台 | Vercel | 微信小程序 |
| 数据存储 | Supabase | 微信云开发 / 你们的服务器 |
| 分享功能 | Web Share API | 微信分享 |
| 保存图片 | Canvas.toDataURL | canvasToTempFilePath |
| 登录方式 | 可选 | 微信授权 |

---

## 注意事项

1. **题目数据**：小程序中的 `test.ts` 需要手动复制 18 道题目
2. **宠物数据**：各页面中的 `pets` 对象需要完整数据
3. **后端接口**：如需保存数据到 Supabase，需要在小程序中调用 HTTPS 接口
4. **app.json**：需要配置正确的页面路径
