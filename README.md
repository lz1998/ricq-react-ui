# ricq-react-ui

本项目用于帮助 ricq 实现可视化登录。

## 接入

实现相关 HTTP API 即可，推荐使用 [axum](https://github.com/tokio-rs/axum)。

### 创建账号阶段

- 密码登录：[password.ts](https://github.com/lz1998/ricq-react-ui/blob/main/src/api/password.ts)
- 扫码登录：[qrcode.ts](https://github.com/lz1998/ricq-react-ui/blob/main/src/api/qrcode.ts)

### 正在运行阶段

- 正在运行：[bot.ts](https://github.com/lz1998/ricq-react-ui/blob/main/src/api/bot.ts)

参考项目：[pbrq](https://github.com/ProtobufBot/pbrq/blob/main/src/bin/main.rs)

<hr/>

![image](https://user-images.githubusercontent.com/9082086/176249381-32bef0f4-c6cd-499c-8761-bdd6b552c2a0.png)

<hr/>

![image](https://user-images.githubusercontent.com/9082086/176249452-beb1babb-f8a5-4ca3-9a2f-efbec99e5225.png)
