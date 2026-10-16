> **当前1:1状态：未完成。** 最新差异与修正记录见 [FIDELITY_AUDIT.md](reference/FIDELITY_AUDIT.md)。21页可运行不代表视觉与行为完全一致。

# 项目映射

## 目标与范围

相关方管理系统主菜单和企业履历九个页签的前端结构、样式和可交互本地原型。21 个独立 HTML 入口。原生 ES Modules，未改动同目录 hazard-prototype 工程。

## 页面清单

| 页面 | 独立入口 |
| --- | --- |
| 基础设置 | `pages/basic.html` |
| 企业履历管理 | `pages/companies.html` |
| 企业安全积分设置 | `pages/company-score.html` |
| 管控规则设置 | `pages/control.html` |
| 必学课程管理 | `pages/courses.html` |
| 应急预案 | `pages/emergency.html` |
| 流程指引 | `pages/guide.html` |
| 企业信息 | `pages/info.html` |
| 新人必学课程库 | `pages/newcomer.html` |
| 履历总览 | `pages/overview.html` |
| 人员管理 | `pages/people.html` |
| 人员安全积分设置 | `pages/person-score.html` |
| 人员履历管理 | `pages/personnel.html` |
| 项目管理 | `pages/projects.html` |
| 作业记录 | `pages/records.html` |
| 制度规程 | `pages/regulations.html` |
| 必遵制度管理 | `pages/rules.html` |
| 相关方类型设置 | `pages/settings.html` |
| 责任制签署 | `pages/signatures.html` |
| 施工作业监管 | `pages/supervision.html` |
| 安全培训 | `pages/training.html` |

详情使用稳定参数 `?id=company-1`。页内子页通过 `?tab=...` 保留选择，未把子页重复复制为独立工程。

## 共享组件与文件

- `config/pages.config.js`：入口、菜单与详情页注册。
- `components/layout.js`：顶栏、侧栏、组织树、页签、企业详情壳。
- `components/ui.js`：表格、分页、表单、模态窗、提示、HTML转义。
- `styles/app.css`：颜色令牌、全局布局、表格/表单/卡片/详情样式。
- `modules/app.js`：页面控制、过滤、表单校验、操作与跨页导航。
- `services/repository.js`：IndexedDB 统一读写、原子重置、跨标签变更通知。
- `data/seed.js`：统一演示数据、组织、类型初始字典。

## 数据模型与交互链路

companies（企业id、名称、单位、类型、状态、基本属性）是主对象；jobs、certificates、people、projects、regulations、emergency、companyFiles 通过 companyId 引用企业。courses 按 library 区分两个课程库。rules 为全局必遵制度，types 维护企业/制度类型，settings 保存本地配置。

企业列表 → overview.html?id → 九个详情页。企业信息修改通过同一企业表返回列表；证书新增/删除 → 同一证书表 → 企业列表上传/到期状态与总览统计联动。作业监管和企业作业记录共享 jobs；删除有引用的企业将被阻止。类型更名同步企业与制度引用。

## 影响范围

本次仅新增 partner-prototype/，未改动已有 hazard-prototype/。共享样式及控件变更会影响本项目21页，已经执行全入口渲染检查。未做业务后端接入。

## 验证与待确认

详见 `tests/ACCEPTANCE.md`、`reference/TRAVERSAL.md`。预览图：`reference/preview-companies.jpg`。所有未确认规则与模拟流程均不宣称为原系统事实。

## 抬头与账户参考调整

2026-10-15：根据用户提供的《隐患计划管理.html》和《隐患整改.html》统一公共页头。抬头采用“安全生产统一智管平台”、渐变盾牌、68px深色顶栏；当前账户采用“平台”圆形头像与平台名称（固定演示账户）。企业履历详情页也复用该公共页头。没有新增真实登录或认证功能。修改文件仅 components/layout.js 与 styles/app.css，保留原业务导航与本地数据。

## 2026-10-16：反馈第1—4项修正

- companies.affiliations 保存稳定子记录ID、监管单位、账号、种类、类型、负责人、手机号和监管人。多单位企业在子记录编辑，单单位企业仍可在主行编辑。
- modules/enterprise.js：企业子记录、黑名单周期与100字原因、648px右侧新增/编辑抽屉。
- modules/people.js：人员范围切换、姓名/手机号搜索、五张统计卡、项目展开、3条虚构人员记录。原始背景和统计卡图片来自发布组件。
- data/enterprise-fixtures.js 与数据库v2迁移：保留旧企业和人员，补充缺失子记录及示例人员。
- styles/enterprise.css：本次修改的局部样式。
- serve.py：增加HTTP请求队列，修复并发加载模块时偶发连接重置。启动命令为 python3 serve.py。

安全履历的深层流程、人员证书和其他子页的全部内容不在本次四项完成声明中。

## 基线优化评审约定

用户要求后续变更标黄。当前第1项“新增人员信息的准入培训合格证/上岗证改为非必填”记录于 reference/REVIEW_CHANGES.md；黄色仅作用于新增入口及该字段，不改变其他区域的基线样式。实现及验证见 modules/staff-form.js 和 tests/admission-review.cjs。
