# TailChat

TailChat 是一款现代化开源的即时通讯聊天应用，基于 React + Typescript 开发

前端微内核架构+后端微服务架构，TailChat 已经为集群化部署做好了准备。

前端通过插件机制为应用赋能，对于TailChat的二次开发来说，居然能如此简单。

后端仓库地址: [tailchat-server](https://github.com/msgbyte/tailchat-server)

Nightly版 体验地址: [https://nightly.paw.msgbyte.com/](https://nightly.paw.msgbyte.com/)

> Nightly版 为自动编译版本, 即每次提交代码都会自动编译。
> 不保证数据的可靠性与稳定性 

## Feature

- 注重隐私，只有被邀请的成员才能加入群组
- 防止陌生人，只有通过昵称+一串随机的数字才能添加好友
- 二维的群组空间，通过频道来分割不同的话题
- 高度自定义的群组空间, 通过分组和拖拽来创建独创的群组空间。同时可以通过更多的插件来增加更多的能力
- 可以严谨，也可以乐趣。通过插件的组合可以创造用于不同场景的 TailChat。可以是面向娱乐，也可以是面向企业
- 后端微服务架构，已经为大规模部署做好了准备。不用担心用户量大了以后怎么办


## Build

#### 编译 web 前端代码

```bash
yarn install
cd web
yarn build
```

使用任意方式代理 `web/dist` 目录即可。


#### expo 打开移动端app
```bash
cd app
yarn install
yarn start
```
