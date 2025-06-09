# 企业官网服务端项目 README

## 一、项目介绍
本项目是企业官网的服务端后台系统，基于 **Node.js + Express** 框架开发，采用轻量级文件型数据库 **SQLite**（无需独立数据库服务），为企业官网提供核心管理功能。主要功能包括：
- **网站信息管理**：支持网站标题、Logo、导航菜单、主题色等基础信息的增删改查。
- **公司信息管理**：管理公司地址、联系方式、注册地等企业基础信息。
- **用户认证**：提供管理员注册（仅首次可用）、登录功能，使用 JWT 进行接口鉴权。
- **通知发送**：支持邮件通知（预留微信等其他通知方式扩展），并记录通知日志（成功/失败状态）。
- **日志记录**：通过 `winston` 记录操作日志与错误日志（文件+控制台双输出）。

### 技术栈特点
- **轻量高效**：SQLite 无需服务端部署，适合开发/测试环境；Express 框架简洁，减少冗余代码。
- **安全可靠**：JWT 鉴权保证接口安全，`bcrypt` 加密存储用户密码，防御常见安全风险。
- **可扩展性**：模块化设计（控制器、模型、工具分离），方便新增功能（如微信通知、用户权限分级）。

---

## 二、项目结构解读
项目整体采用前后端分离架构，根目录包含前端（`app`）和服务端（`server`）两大核心模块。以下是关键目录及文件说明（以服务端为主）：

```
CompanyWebPage/
├── .gitignore          # Git 忽略规则（已排除 node_modules、日志、.env 等）
├── README.md           # 项目文档（当前文件）
├── app/                # 前端项目目录（Vue 工程）
│   ├── index.html      # 前端入口 HTML
│   ├── src/            # 前端源码（组件、路由、状态管理等）
│   └── vite.config.js  # Vite 构建配置
└── server/             # 服务端核心目录
    ├── .env            # 环境变量配置（需手动创建，示例见下文）
    ├── app.js          # 服务入口文件（启动 Express 服务）
    ├── package.json    # Node.js 依赖清单（记录项目依赖及脚本）
    ├── server/         # SQLite 数据库存储目录（自动生成）
    │   └── database.sqlite  # 数据库文件（存储业务数据）
    └── src/            # 服务端核心源码
        ├── config/     # 配置文件目录
        │   ├── db.js   # 数据库连接配置（SQLite）
        │   ├── jwt.js  # JWT 密钥与过期时间配置
        │   └── logger.js # 日志记录配置（文件+控制台输出）
        ├── controllers/ # 业务逻辑控制器
        │   ├── siteInfo.js    # 网站信息管理（增删改查）
        │   ├── companyInfo.js # 公司信息管理
        │   ├── user.js        # 用户认证（注册/登录）
        │   └── notification.js # 通知发送逻辑
        ├── models/     # 数据库模型（Sequelize ORM）
        │   ├── SiteInfo.js    # 网站信息模型（字段：标题、Logo、导航菜单等）
        │   ├── CompanyInfo.js # 公司信息模型（字段：地址、电话、联系人等）
        │   ├── User.js        # 用户模型（含管理员标识）
        │   └── NotificationLog.js # 通知日志模型（记录通知状态）
        ├── notifications/ # 通知策略目录
        │   └── email.js   # 邮件通知实现（使用 nodemailer）
        ├── routes/       # API 路由配置
        │   └── index.js   # 路由入口（区分公共接口与认证接口）
        └── utils/        # 工具函数
            ├── auth.js    # JWT 鉴权中间件（校验接口权限）
            └── validator.js # 请求参数校验工具（确保必填参数存在）
```

---

## 三、关键目录说明
### 1. `server/src/config`
- **功能**：集中管理项目核心配置，包括数据库连接、JWT 密钥、日志规则等。
- **关键文件**：
  - `db.js`：配置 SQLite 数据库连接（自动创建 `database.sqlite` 文件）。
  - `jwt.js`：从 `.env` 读取 JWT 密钥和过期时间，用于生成/校验 Token。
  - `logger.js`：定义日志输出规则（错误日志 `error.log`、综合日志 `combined.log`）。

### 2. `server/src/controllers`
- **功能**：处理 HTTP 请求的具体业务逻辑，调用模型层操作数据库，返回响应数据。
- **示例**：
  - `siteInfo.js`：实现网站信息的查询（公共接口）和更新（管理员接口）。
  - `user.js`：处理管理员注册（仅首次可用）和登录逻辑，返回 JWT Token。

### 3. `server/src/models`
- **功能**：通过 Sequelize ORM 定义数据库表结构，包含字段类型、默认值等约束。
- **特点**：模型文件与数据库表一一对应（如 `User.js` 对应 `users` 表），启动时自动同步表结构。

### 4. `server/src/routes`
- **功能**：定义 API 路径与控制器方法的映射，通过 `authMiddleware` 区分接口权限。
- **权限设计**：
  - 公共接口（如 `GET /api/site-info`）：无需登录即可访问。
  - 认证接口（如 `POST /api/site-info`）：需携带有效 JWT Token 访问。

### 5. `server/src/utils`
- **功能**：封装通用工具函数，减少重复代码。
  - `auth.js`：实现 JWT 鉴权逻辑，拦截无权限请求。
  - `validator.js`：校验请求参数完整性（如注册时检查 `username` 和 `password`）。

### 6. `server/src/notifications`
- **功能**：通知策略扩展点，当前仅实现邮件通知（`email.js`），可扩展微信、短信等通知方式。

---

## 四、环境变量示例（`.env`）
```env
# 服务配置
PORT=3000

# JWT 配置
JWT_SECRET=your_secure_secret_key  # 建议使用 32+ 位随机字符串
JWT_EXPIRES_IN=24h

# 邮件配置（以 QQ 邮箱为例）
EMAIL_SERVICE=QQ
EMAIL_USER=your_qq_email@qq.com
EMAIL_PASS=your_email_auth_code    # 非邮箱密码，需在邮箱设置中生成授权码
```

        