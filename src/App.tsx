import React from 'react';
import './App.css';
import {Layout, Message, Tabs} from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import PluginConfig from "./components/PluginConfig";
import RunningBot from "./components/RunningBot";
import CreateBot from "./components/CreateBot";
import {Bot, listBot} from "./api/bot";
import {useInterval} from "@arco-design/web-react/es/_util/hooks/useInterval";
import {getProtocolName} from "./api/utils";


function App() {
  const [bots, setBots] = React.useState<Array<Bot>>([]);
  useInterval(async () => {
    let resp = await listBot();
    let originBots = new Set(bots.map(b => `${b.uin}(${getProtocolName(b.protocol)})`));
    let newBots = resp.bots.map(b => `${b.uin}(${getProtocolName(b.protocol)})`);
    let diff = newBots.filter(b => !originBots.has(b));
    for (let bot of diff) {
      Message.info(`${bot} 登录成功，切换到【正在运行】页面查看`)
    }
    // if (bots.length < resp.bots.length) {
    // }
    resp.bots.sort((a, b) => a.uin - b.uin || a.protocol - b.protocol);
    setBots(resp.bots)
  }, 1000);

  return (
    <div className="App">
      <Layout className="layout">
        <Layout.Header className="header">
          <div className="logo">
            PB-RQ
          </div>
        </Layout.Header>
        <Layout.Content className="content">
          <Tabs defaultActiveTab='create-bot' className="tab-header">
            <Tabs.TabPane key='plugin-config' title='插件配置'>
              <PluginConfig/>
            </Tabs.TabPane>
            <Tabs.TabPane key='running-bot' title='正在运行'>
              <RunningBot bots={bots}/>
            </Tabs.TabPane>
            <Tabs.TabPane key='create-bot' title='创建账号'>
              <CreateBot/>
            </Tabs.TabPane>
          </Tabs>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
