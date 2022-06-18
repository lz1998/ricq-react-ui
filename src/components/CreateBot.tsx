import {Avatar, Button, Card, Form, Grid, Input, Modal, Select, Space, Tabs, Message} from "@arco-design/web-react";
import {IconDelete, IconLock} from "@arco-design/web-react/icon";
import {QRCodeCanvas} from 'qrcode.react';
import React, {useEffect} from "react";
import {
  PasswordClient,
  passwordCreate,
  PasswordCreateRequest,
  passwordDeleteClient,
  passwordListClient, passwordSubmitTicket
} from "../api/password";
import {getAvatarUrl, getPasswordLoginState, getProtocolName} from "../api/utils";

const Row = Grid.Row;
const Col = Grid.Col;


function CreateBot() {
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [showProcessDialog, setShowProcessDialog] = React.useState(false);
  const [processingTicket, setProcessingTicket] = React.useState("");
  const [passwordForm, setPasswordForm] = React.useState<PasswordCreateRequest>({
    device_seed: 0,
    password: "",
    protocol: 0,
    uin: 0
  });
  const [passwordClients, setPasswordClients] = React.useState<Array<PasswordClient>>([]);
  const [processingClient, setProcessingClient] = React.useState<PasswordClient>({
    protocol: 0,
    resp: {
      state: ""
    },
    uin: 0
  });

  // 密码登录 - 创建客户端
  const onPasswordLoginClick = async () => {
    await passwordCreate(passwordForm)
    Message.success("创建成功")
    setShowCreateDialog(false)
  }
  // 密码登录 - 处理验证码、设备锁
  const onPasswordProcessClick = async (client: PasswordClient) => {
    setProcessingClient(client) // 设置正在处理的client
    setShowProcessDialog(true)
  }
  // 密码登录 - 删除客户端
  const onPasswordDeleteClick = async (uin: number, protocol: number) => {
    await passwordDeleteClient({uin, protocol})
    Message.success("删除成功")
  }
  // 密码登录 - 提交ticket
  const onSubmitTicketClick = async () => {
    await passwordSubmitTicket({
      uin: processingClient.uin,
      protocol: processingClient.protocol,
      ticket: processingTicket
    })
    Message.success("提交成功")
  }
  useEffect(() => {
    const interval = setInterval(async () => {
      let resp = await passwordListClient()
      let clients = resp.clients
      clients.sort((a, b) => a.uin - b.uin || a.protocol - b.protocol);
      // console.log(clients)
      setPasswordClients(clients)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{textAlign: "center"}}>
      <Button onClick={() => console.log(passwordForm)}>test</Button>
      <Button type="primary" style={{margin: "4px"}} onClick={() => setShowCreateDialog(true)}>创建账号</Button>
      {/*创建弹框*/}
      <Modal
        style={{maxWidth: "96vw"}}
        title='创建账号'
        visible={showCreateDialog}
        onCancel={() => setShowCreateDialog(false)}
        autoFocus={false}
        focusLock={true}
        footer={null}
      >
        <Tabs defaultActiveTab="password" type="rounded">
          <Tabs.TabPane key='password' title='Password'>
            <Form style={{width: "100%"}}>
              <Form.Item label='Username'>
                <Input
                  placeholder='please enter your username...'
                  onChange={(v) => setPasswordForm({
                    ...passwordForm,
                    uin: parseInt(v),
                  })}
                />
              </Form.Item>
              <Form.Item label='Password'>
                <Input
                  placeholder='please enter your password...'
                  type="password"
                  onChange={(v) => setPasswordForm({
                    ...passwordForm,
                    password: v,
                  })}
                />
              </Form.Item>
              <Form.Item label='Seed'>
                <Input
                  placeholder='please enter your seed...'
                  type="number"
                  onChange={(v) => setPasswordForm({
                    ...passwordForm,
                    device_seed: parseInt(v)
                  })}
                />
              </Form.Item>
              <Form.Item label='Protocol'>
                <Select onChange={(v) => {
                  setPasswordForm({
                    ...passwordForm,
                    protocol: v,
                  })
                }}>
                  <Select.Option key="phone" value={1}>Phone</Select.Option>
                  <Select.Option key="watch" value={2}>Watch</Select.Option>
                  <Select.Option key="mac" value={3}>MacOS</Select.Option>
                  <Select.Option key="ipad" value={5}>IPad</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{offset: 5}}>
                <Button type='primary' onClick={onPasswordLoginClick}>Login</Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key='qrcode' title='QRCode'>
            <Form style={{width: "100%"}}>
              <Form.Item label='Seed'>
                <Input placeholder='please enter your seed...' type="number"/>
              </Form.Item>
              <Form.Item label='Protocol'>
                <Select>
                  <Select.Option key="ipad" value="ipad">ipad</Select.Option>
                  <Select.Option key="phone" value="phone">phone</Select.Option>
                  <Select.Option key="watch" value="watch">watch</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{offset: 5}}>
                <Button type='primary'>Login</Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Modal>

      {/*处理验证弹框*/}
      <Modal
        style={{maxWidth: "96vw"}}
        title='处理验证'
        visible={showProcessDialog}
        onCancel={() => setShowProcessDialog(false)}
        autoFocus={false}
        focusLock={true}
        footer={null}
      >
        <div style={{margin: "8px"}}>
          状态：{getPasswordLoginState(processingClient.resp)}
        </div>
        {processingClient.resp.captcha_url && <>
          <div>使用 <a href="https://github.com/mzdluo123/TxCaptchaHelper/releases" target="_blank">滑块助手</a> 扫码处理</div>
          <QRCodeCanvas value={processingClient.resp.captcha_url}/>,
          <Input
            placeholder='please enter your ticket...'
            onChange={(v) => setProcessingTicket(v)}
          />
          <Button type="primary" onClick={onSubmitTicketClick}>提交 Ticket</Button>
        </>}
        {processingClient.resp.verify_url && <>
          <div>使用 <a href="https://github.com/mzdluo123/TxCaptchaHelper/releases"
                     target="_blank">滑块助手</a> 扫码处理，完成后删除重新登录。
          </div>
          <QRCodeCanvas value={processingClient.resp.verify_url}/>,
        </>}
        {/*TODO 短信*/}
      </Modal>

      {/*登录中的列表*/}
      <Row gutter={[24, 16]} style={{padding: "16px"}}>
        {passwordClients
          .map((client) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={client.uin}>
                <Card
                  hoverable
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#1D2129',
                              }}
                            >
                              <Avatar
                                style={{
                                  marginRight: 16,
                                  backgroundColor: '#165DFF',
                                  flexShrink: 0
                                }}
                                size={72}
                              >
                                <img alt="avatar" src={getAvatarUrl(client.uin)}/>
                              </Avatar>
                              <Space direction="vertical" size="mini"
                                     style={{maxHeight: "72px", overflow: "hidden", alignItems: "flex-start"}}>
                                <div>账号：{client.uin}</div>
                                <div>协议：{getProtocolName(client.protocol)}</div>
                                <div>状态：{getPasswordLoginState(client.resp)}</div>
                              </Space>
                            </span>
                    <Space>
                      <Button type="outline" status="warning" icon={<IconLock/>} shape="round"
                              onClick={() => onPasswordProcessClick(client)}/>
                      <Button type="outline" status="danger" icon={<IconDelete/>} shape="round"
                              onClick={async () => onPasswordDeleteClick(client.uin, client.protocol)}/>
                    </Space>
                  </div>
                </Card>
              </Col>
            )
          })}
        {Array.from(new Array(5).keys())
          .map((k) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={k}>
                <Card
                  hoverable
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#1D2129',
                              }}
                            >
                              <Avatar
                                style={{
                                  marginRight: 16,
                                  backgroundColor: '#165DFF',
                                }}
                                size={72}
                                shape="square"
                              >
                                <img alt="avatar"
                                     src="https://content.volccdn.com/obj/volc-content/lab/mt-portal/mt-portal-fe/static/media/wechat_code.2bf36af6.png"/>
                              </Avatar>
                              <div>
                              <div>状态：待扫码</div>
                              </div>
                            </span>
                    <Button type="outline" status="danger" icon={<IconDelete/>} shape="round"/>
                  </div>
                </Card>
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default CreateBot
