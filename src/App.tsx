import React from 'react';
import './App.css';
import {Layout, Tabs} from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import PluginConfig from "./components/PluginConfig";
import RunningBot from "./components/RunningBot";
import CreateBot from "./components/CreateBot";


function App() {
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
              <RunningBot/>
            </Tabs.TabPane>
            <Tabs.TabPane key='create-bot' title='创建账号'>
              <CreateBot/>
            </Tabs.TabPane>
          </Tabs>
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
