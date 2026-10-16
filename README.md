# lbxgf · 相关方管理系统原型

外网预览：https://wang6122546.github.io/lbxgf/

本项目为静态交互原型，使用本地演示数据；新增、修改和上传记录只保存在访问者浏览器中，不连接原业务系统。

> 2026-10-15：按用户反馈启动1:1修正，当前仍未完成全量一致性验收。详见 `reference/FIDELITY_AUDIT.md`。

# 相关方管理系统 HTML 原型

本地预览：http://localhost:8767/pages/companies.html

启动：
```sh
cd /Users/wang/Desktop/来宾项目/ai编程/partner-prototype
python3 serve.py
```

使用原生 HTML、CSS、JavaScript ES Modules，无第三方依赖。通过 HTTP 访问，不能双击 HTML 作为运行验收方式。21 个独立业务入口，公共样式、布局、控件和 IndexedDB Repository 复用。所有新增、修改、删除和配置仅作用于本地演示数据库；无需连接原系统。

已完成原系统主菜单和企业履历九个页签的一轮只读采集。此版本为可交互的结构与视觉复刻，不是所有二级业务流程和素材的像素级完整复刻。查看 `reference/TRAVERSAL.md` 的采集边界及 `tests/ACCEPTANCE.md` 的实际验证记录。

演示企业均以“示例”开头，手机号掩码，账号为 DEMO。文件选择仅记录文件名，不上传、不持久化文件二进制；原型使用演示预览说明。可通过右上角“重置演示数据”恢复基线。浏览器清除网站数据也会重建演示数据库。

详细入口、模型与关联见 PROJECT_MAP.md。
