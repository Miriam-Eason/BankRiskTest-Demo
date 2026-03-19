# PROJECT.md — 银行证券风险智能评估系统

> **⚠️ 重要：每次开始新任务前，请先完整阅读本文件，确保理解项目上下文。**

---

## 1. 项目定义

**项目名称：** 银行证券风险智能评估系统（Bank Risk Assessment System）

**项目目的：** 这是一个模拟仿真演示用的风险评估网站，用于短期临时使用，不是生产系统。数据来自一个约 1000 行的模拟 Excel 表格。

**目标用户：** 内部演示人员，通过手机浏览器访问。

**目标平台：** 手机端优先（iPhone / Android 浏览器），桌面端兼容即可，不需要专门优化。

---

## 2. 技术栈（严格遵守，不得擅自变更）

| 类别 | 选择 | 说明 |
|------|------|------|
| 构建工具 | Vite | 快速、轻量 |
| 框架 | React + TypeScript | 单页应用 |
| 样式方案 | Tailwind CSS | 唯一样式方案，不引入其他 CSS 框架 |
| 路由/视图切换 | useState 状态切换 | **不使用 React Router**，用一个 `currentView` state 控制页面 |
| 数据方案 | JSON 文件静态导入 | `import data from './data/data.json'`，无后端、无 API、无数据库 |
| 部署 | Vercel 静态部署 | `npm run build` 输出静态文件 |

### 禁止事项

- ❌ 不要安装 React Router、Next.js、Remix 或任何路由库
- ❌ 不要安装 Axios、SWR、React Query 或任何数据请求库
- ❌ 不要安装 Ant Design、Material UI、Chakra UI 或任何组件库
- ❌ 不要安装 Zustand、Redux、MobX 或任何状态管理库
- ❌ 不要使用 CSS Modules、Styled Components、Emotion 或任何 CSS-in-JS
- ❌ 不要使用 `fetch()` 或 `XMLHttpRequest` 加载数据
- ❌ 不要创建后端 API、Serverless Function 或数据库连接

### 允许的唯一额外依赖

如确实需要图标，可以使用 `lucide-react`，除此之外不允许增加任何 npm 依赖。

---

## 3. 设计规范

### 3.1 整体风格

银行类 APP 风格，正式、专业、可信赖。参考中国银行/工商银行手机端风格。

### 3.2 配色方案（所有页面必须统一使用）

```
主色（深蓝）：    #1a365d    — 顶部栏、标题、主要按钮背景
辅助蓝：         #2b6cb0    — 次要元素、链接、边框
浅蓝背景：       #ebf4ff    — 页面背景、卡片悬停
强调色（金色）：  #c9a84c    — 图标点缀、重要标记、装饰线
警告色（红/橙）： #e53e3e    — 风险标识、警告提示
成功色（绿）：    #38a169    — 安全状态、"未找到风险"提示
文字主色：       #1a202c    — 正文文字
文字次色：       #718096    — 次要信息、占位符
卡片背景：       #ffffff    — 白色卡片
页面背景：       #f7fafc    — 浅灰底色
```

### 3.3 字体

使用系统默认字体栈，不引入外部字体：
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
```

### 3.4 布局规则

- 移动端优先，最大宽度 `max-w-md`（448px），居中显示
- 页面内边距统一 `px-4`
- 卡片圆角 `rounded-lg`，阴影 `shadow-sm`
- 按钮圆角 `rounded-lg`，高度至少 48px（手机易点击）
- 各功能页面顶部统一有「← 返回」按钮

---

## 4. 数据结构

### 4.1 JSON 字段定义

```typescript
interface User {
  用户: string;        // 用户编号，如 "U001"
  身份证号: string;    // 18位身份证号
  性别: string;        // "男" 或 "女"
  姓名: string;        // 中文姓名
  出生年份: number;    // 四位数年份，如 1965
  学历: string;        // 如 "本科"、"大专"、"高中"
  年收入: number;      // 单位：万元，如 15.5
  工作领域: string;    // 如 "金融"、"教育"
  工作机构: string;    // 如 "XX银行"
  账户状态: string;    // 如 "正常"、"冻结"、"注销"
  账户金额: number;    // 单位：元，如 50000
}
```

### 4.2 JSON 示例

```json
{
  "用户": "U001",
  "身份证号": "110101196501011234",
  "性别": "男",
  "姓名": "张三",
  "出生年份": 1965,
  "学历": "本科",
  "年收入": 15.5,
  "工作领域": "金融",
  "工作机构": "XX银行",
  "账户状态": "正常",
  "账户金额": 50000
}
```

### 4.3 数据导入方式（唯一方式）

```typescript
import userData from './data/data.json';
```

文件位置：`src/data/data.json`

---

## 5. 功能需求详述

### 5.1 主页（Home）

- 顶部：正式标题「银行证券风险智能评估系统」
- 中部：Hero 区域，用 CSS 渐变 / SVG 实现金融风格装饰图案（不依赖外部图片）
- 下方：3 个功能入口按钮，纵向排列，等宽：
  1. 📋 查看用户
  2. 🔍 开启风险评估
  3. 🔎 查询数据

### 5.2 查看用户（UserList）

- 以卡片形式展示所有用户数据（不要用表格，手机端表格太窄）
- 每张卡片显示用户的全部字段
- 分页：每页 10 条，底部有「上一页 / 下一页」按钮和页码显示（如"第 3/100 页"）
- 顶部显示总数据条数（如"共 1000 条记录"）

### 5.3 开启风险评估（RiskAssessment）

**筛选逻辑：**
```
当前年份（2026）- 出生年份 = 年龄
女性：年龄 > 55 → 即出生年份 < 1971
男性：年龄 > 60 → 即出生年份 < 1966
```

**界面要求：**
- 顶部显示统计信息：「共筛选出 XX 名风险用户」
- 风险用户以卡片列表展示（支持分页，每页 10 条）
- 卡片使用红色/橙色左边框标识风险状态
- 顶部有搜索框：
  - placeholder：「输入身份证号查询是否在风险名单中」
  - 输入身份证号，点击搜索或按回车触发查询
  - **找到：** 高亮展示该用户完整信息，标注「⚠️ 该用户在风险名单中」
  - **未找到：** 显示「✅ 未在风险名单中找到该用户」
  - 搜索框旁有清除按钮，点击后恢复完整风险列表

### 5.4 查询数据（DataQuery）

- 一个搜索框，支持通过「身份证号」或「姓名」查询
- 自动判断输入类型：
  - 输入全为数字 → 按身份证号精确匹配
  - 输入含中文/非数字 → 按姓名模糊匹配（包含即可）
- 查询结果以卡片展示，姓名查询可能返回多条
- 无结果时显示「未找到匹配的用户」

---

## 6. 文件结构

```
project-root/
├── public/
├── src/
│   ├── data/
│   │   └── data.json              # Excel 转换后的 JSON 数据
│   ├── components/
│   │   ├── Home.tsx               # 主页
│   │   ├── UserList.tsx           # 查看用户
│   │   ├── RiskAssessment.tsx     # 风险评估
│   │   ├── DataQuery.tsx          # 查询数据
│   │   └── UserCard.tsx           # 用户信息卡片（公共组件）
│   ├── App.tsx                    # 根组件，管理视图切换
│   ├── main.tsx                   # 入口文件
│   └── index.css                  # Tailwind 入口
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── PROJECT.md                     # 本文件
```

---

## 7. 视图切换机制

在 `App.tsx` 中通过 `useState` 管理当前页面：

```typescript
type ViewType = 'home' | 'userList' | 'riskAssessment' | 'dataQuery';

const [currentView, setCurrentView] = useState<ViewType>('home');
```

各子组件通过 `onNavigate` 回调切换视图，**不使用 React Router**。

---

## 8. 当前项目进度

### 已完成

#### Step 1：项目初始化

- 已完成 Vite + React + TypeScript 项目骨架搭建
- 已完成 Tailwind CSS 配置
- 已配置移动端 `viewport` meta 标签
- 当前首页可正常显示 `Hello World`
- 已在页面中静态导入 `src/data/data.json`

#### Step 2：Excel 数据转 JSON

- 已新增转换脚本：`scripts/excel_to_json.py`
- 已将 `./personal_data.xlsx` 转换为 `src/data/data.json`
- 当前生成数据总数：`1000` 条
- JSON 字段已按项目规范统一为：

```typescript
{
  用户: string;
  身份证号: string;
  性别: string;
  姓名: string;
  出生年份: number;
  学历: string;
  年收入: number;
  工作领域: string;
  工作机构: string;
  账户状态: string;
  账户金额: number;
}
```

#### Step 3：主页界面

- 已完成手机端优先的银行风格主页 UI
- 已新增 `src/components/Home.tsx` 作为主页组件
- Hero 区域已改为外部图片展示，未使用渐变
- 主页已提供 3 个功能入口按钮，当前为可点击占位态
- 已展示数据总量、部署形态、终端优先等概览信息
- 已在页面中补充 Hero 图片来源链接

#### Step 4：页面路由 / 视图切换

- 已在 `App.tsx` 中通过 `useState` 实现页面视图切换
- 已创建 `UserList`、`RiskAssessment`、`DataQuery` 3 个功能页面占位组件
- 主页 3 个入口按钮已可进入对应页面
- 各功能页面顶部已统一提供「← 返回主页」按钮
- 当前 3 个功能页面均展示标题和后续步骤提示内容

### 已完成验证

- `npm install` 已完成
- `npm run dev` 已验证可启动，本地地址为 `http://127.0.0.1:5173/`
- `npm run build` 已通过
- 已验证 `src/data/data.json` 可被前端静态导入
- 当前 `App.tsx` 中已执行 `console.log('Excel JSON data:', userData)` 用于验证导入结果
- 已验证主页正常渲染，Hero 外链图片与 3 个入口按钮可正常显示
- 已验证主页与 3 个功能页之间的进入/返回切换全部正常

### 下一步建议

- 继续实现 Step 5：查看用户分页卡片列表
- 建议优先补充 `UserCard.tsx` 公共卡片组件，便于后续 Step 5、6、8 复用

---

## 8. Step 完成日志

> 每完成一个 Step，在此处追加记录，包括：新增/修改了哪些文件、创建了哪些组件、安装了哪些依赖。这样后续 Step 的执行者可以了解当前项目状态。

### Step 1：项目初始化
- **状态：** 已完成（2026-03-19）
- **新增文件：** `package.json`、`tsconfig.json`、`tsconfig.app.json`、`tsconfig.node.json`、`vite.config.ts`、`postcss.config.js`、`tailwind.config.js`、`index.html`、`src/main.tsx`、`src/App.tsx`、`src/index.css`
- **安装依赖：** `react`、`react-dom`、`vite`、`typescript`、`tailwindcss`、`postcss`、`autoprefixer`、`@vitejs/plugin-react`、`@types/react`、`@types/react-dom`
- **备注：** 已完成最小可运行项目骨架，`npm run dev` 与 `npm run build` 均已验证

### Step 2：Excel 数据转 JSON
- **状态：** 已完成（2026-03-19）
- **新增文件：** `scripts/excel_to_json.py`、`src/data/data.json`
- **备注：** 已从 `personal_data.xlsx` 转换出 1000 条 JSON 数据，并完成前端静态导入验证

### Step 3：主页界面
- **状态：** 已完成（2026-03-19）
- **新增文件：** `src/components/Home.tsx`
- **备注：** 已实现银行风格主页、外部图片 Hero、3 个功能入口按钮，并保留图片来源链接

### Step 4：视图切换
- **状态：** 已完成（2026-03-19）
- **新增文件：** `src/components/UserList.tsx`、`src/components/RiskAssessment.tsx`、`src/components/DataQuery.tsx`
- **备注：** 已通过 `useState` 完成主页与 3 个功能页的切换，并补充统一返回按钮

### Step 5：查看用户功能
- **状态：** 未开始
- **新增文件：**
- **备注：**

### Step 6：风险评估 — 数据筛选
- **状态：** 未开始
- **新增文件：**
- **备注：**

### Step 7：风险评估 — 搜索功能
- **状态：** 未开始
- **新增文件：**
- **备注：**

### Step 8：查询数据功能
- **状态：** 未开始
- **新增文件：**
- **备注：**

### Step 9：UI 打磨
- **状态：** 未开始
- **修改文件：**
- **备注：**

### Step 10：构建与部署
- **状态：** 未开始
- **备注：**

---

## 9. 给 AI 编码助手的通用指令

1. **开始任何任务前，先阅读完整的 PROJECT.md**
2. **严格遵守技术栈约束**，不要引入任何未列出的依赖
3. **严格使用指定的配色方案**，不要自行发挥配色
4. **所有组件使用上面定义的文件结构和命名**，不要重命名或重新组织
5. **不要修改已完成的组件的 props 接口**，如需扩展请使用可选参数
6. **数据始终通过 `import` 静态导入**，不要使用 fetch 或动态加载
7. **移动端优先**，所有 UI 先在 375px 宽度下验证
8. **使用中文**编写界面文字和注释
9. **每完成一个 Step，更新第 8 节的完成日志**
