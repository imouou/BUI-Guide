# 打包部署


## 1. 案例下载

恭喜您，通过前面章节的学习，一个包含BUI的大部分知识点，完整有登录权限的案例，已经完成了！可以点击[bui-demo.zip](/examples/chapter0/bui-demo.zip ':ignore')下载。如果您还想进一步学习，可以通过高级篇，组件篇，API篇，及专栏的文章来学习。

## 2. 编译

```bash
# 进入工程
cd bui-demo
# 编译工程为es5且压缩版本
npm run build
```

## 3. 存成压缩包

进入`dist`目录，全选文件，右键另存为压缩包 zip格式，上传或部署到相应平台。

## 4. 打包合并成单页文件

单页文件可以在webapp一次性加载，结合缓存，第一次加载以后，速度媲美本地应用。（可选）

```bash
# 进入工程
cd bui-demo
# 编译工程成同步模块，最终 pages/ 下面的模块，都会合并进 index.js 
npm run package
```

## 5. 打包应用

请查看第三方平台教程，或[BUI专栏](article.md)文章。
