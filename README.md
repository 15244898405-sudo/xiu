# Peter Xu 生存记录站

这是一个适合部署到 GitHub Pages 的静态网站，用来记录 Peter Xu 在南非学飞期间拍下的风景，以及天气、训练进度和吃饭问题带来的生存日常。

## 文件结构

- `index.html`：页面结构
- `style.css`：页面样式
- `script.js`：摄影条目和生存记录数据
- `photos/`：以后存放真实照片

## 怎么替换成真实内容

1. 把照片放进 `photos/`，例如 `photos/runway-sunset.jpg`
2. 打开 `script.js`
3. 在 `photoEntries` 里把 `image: ""` 改成 `image: "./photos/runway-sunset.jpg"`
4. 顺手把标题、地点、日期、心情和说明改成真实内容
5. 在 `journalEntries` 里继续追加天气、训练或吃饭相关记录

## 怎么发布到 GitHub Pages

1. 新建一个 GitHub 仓库
2. 把这个文件夹里的文件全部上传
3. 打开 GitHub 仓库的 `Settings`
4. 找到 `Pages`
5. 在 `Build and deployment` 里选择 `Deploy from a branch`
6. Branch 选择 `main`，文件夹选择 `/ (root)`
7. 保存后等几分钟，GitHub 会给你一个永久网址

## 小建议

- 如果照片很多，可以继续在 `photoEntries` 里往下加
- 如果想把“天气折磨”“吃饭问题”“训练进度”拆成单独栏目，我也可以继续帮你改
- 如果你把 Peter Xu 的照片发给我，我也可以继续帮你把真实内容直接塞进去
