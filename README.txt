传奇发布网 · 静态站点说明
================================

一、部署到 996fbz.github.io
1. 新建仓库 996fbz.github.io（或直接上传到已有仓库根目录）。
2. 把本站所有文件（index.html 及其他 .html、style.css、app.js、
   favicon.svg、robots.txt、sitemap.xml、.nojekyll）放在仓库根目录，
   与 index.html 平级，不要放进子文件夹。
3. 设置 -> Pages -> Source 选择 main 分支 / root 目录，保存后等待 1-2 分钟。
4. 访问 https://996fbz.github.io/ 即可。

二、目录结构（全部平铺）
index.html          首页
kaifu.html          今日/明日/本周开服表
banben.html         版本大全（12 类版本）
zixun.html          资讯列表（24 篇）
gonglue.html        攻略列表（24 篇）
a 系列.html         48 篇文章详情页（slug.html）
about.html          关于与免责声明
search.html         站内搜索（noindex）
404.html            404 页面
style.css           全站样式（单文件）
app.js              搜索逻辑
favicon.svg         站点图标
robots.txt          允许全站抓取，声明 sitemap
sitemap.xml         全部页面地图
.nojekyll           关闭 Jekyll 处理

三、SEO 说明
- 每页独立 title / keywords / description / canonical，首页与栏目页均有关键词布局。
- 文章页含 H1、目录、面包屑、上下篇、相关阅读与标签，内链闭环。
- sitemap.xml 与 robots.txt 已指向 https://996fbz.github.io。
- 无需数据库、无需服务器端语言，纯静态即可访问。

四、内容维护
- 文章为静态 HTML，直接编辑对应 .html 文件即可。
- 新增文章后需同步更新 sitemap.xml、列表页与相关阅读，建议使用生成器重建。
