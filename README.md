# vue-e(管理system)
用vue写H5移动端管理。

不推荐PC端访问。

页面按照为`400px`设计，没有设置dpr>2>3的字体，需要自己调整

## 工具&技能
`vue` + `vuex`+ `vue-router` + `vue-resource` 轮子

`MINT UI` + `elementFE` UI组件

`reset.css` 重置样式

`flexible.js` 手淘移动端响应方案 

## 使用
```
git clone https://github.com/whelamc/vue-e.git

cd vue-e

npm install 

# 开发环境
npm run dev
访问 http://localhost:8080/

# 打包
npm run build

## 实现功能
### 登录退出
- [x] 正常登陆(登录使用localstorage储存token，扫描登录需要cordova插件)
- [x] 退出登录(清除token)

### 首页
- [x] 浏览单据
- [x] 填写单据
- [x] 读取localstorage暂存单据
- [x] 

### 填写单据与浏览单据
- [x] 仓库选择
- [x] 时间选择
- [x] 供应商选择
- [x] 单据列表
- [x] 类型选择
- [x] 分页功能

### 个人中心
- [x] 修改密码
- [x] 账号退出

### 库存查询
- [x] 查询库存单据

## 组件分布
1.  浏览组件
2.  填写组件
3.  个人中心首页组件
4.  个人中心修改密码组件
5.  顶部栏组件

## 目录结构

```
|
|—— build 
|—— config
|——src 资源文件
| |—— api 全局接口
| |—— assets 组件静态资源库
| |—— components 组件库
| |—— pages 页面
| |—— router 路由配置
| |—— store vuex状态管理
| |—— App.vue 应用程序
| |__ main.js SPA入口
|
|__ static 静态资源目录

```


全局API接口 /api/index.js

