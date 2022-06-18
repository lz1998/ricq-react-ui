import {Avatar, Button, Card, Form, Grid, Input, Modal, Select, Space, Tabs, Message} from "@arco-design/web-react";
import {IconDelete, IconLock} from "@arco-design/web-react/icon";
import {QRCodeCanvas} from 'qrcode.react';
import React from "react";
import {
  PasswordClient,
  passwordCreate,
  PasswordCreateRequest,
  passwordDeleteClient,
  passwordListClient, passwordRequestSms, passwordSubmitSms, passwordSubmitTicket
} from "../api/password";
import {getAvatarUrl, getPasswordLoginState, getProtocolName, getQRCodeState} from "../api/utils";
import {
  QRCodeClient,
  qrcodeCreate,
  QRCodeCreateRequest,
  qrcodeDelete,
  qrcodeListClient,
  qrcodeQuery
} from "../api/qrcode";
import {useInterval} from "@arco-design/web-react/lib/_util/hooks/useInterval";

const Row = Grid.Row;
const Col = Grid.Col;


function CreateBot() {
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [showProcessDialog, setShowProcessDialog] = React.useState(false);
  const [processingTicket, setProcessingTicket] = React.useState("");
  const [processingSms, setProcessingSms] = React.useState("");
  const [passwordForm, setPasswordForm] = React.useState<PasswordCreateRequest>({
    device_seed: 0,
    password: "",
    protocol: 0,
    uin: 0
  });
  const [qrcodeForm, setQRCodeForm] = React.useState<QRCodeCreateRequest>({
    device_seed: 0,
    protocol: 0,
  });
  const [passwordClients, setPasswordClients] = React.useState<Array<PasswordClient>>([]);
  const [qrcodeClients, setQRCodeClients] = React.useState<Array<QRCodeClient>>([]); // TODO
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
  // 密码登录 - 请求短信验证码
  const onRequestSmsClick = async () => {
    let resp = await passwordRequestSms({
      uin: processingClient.uin,
      protocol: processingClient.protocol,
    })
    if (resp.state === "too_many_sms_request") {
      Message.error("请求过于频繁，请删除后重新登录")
    } else {
      Message.info("已请求短信验证码")
    }
  }
  // 密码登录 - 提交短信验证码
  const onSubmitSmsClick = async () => {
    let resp = await passwordSubmitSms({
      uin: processingClient.uin,
      protocol: processingClient.protocol,
      sms: processingSms
    })
    Message.success("提交成功")
    if (resp.state === "success") {
      Message.info("登录成功")
    }
  }

  // 扫码登录 - 创建客户端
  const onQRCodeLoginClick = async () => {
    await qrcodeCreate(qrcodeForm)
    Message.success("创建成功")
    setShowCreateDialog(false)
  }
  // 扫码登录 - 删除客户端
  const onQRCodeDeleteClick = async (sig: string) => {
    await qrcodeDelete({sig})
    Message.success("删除成功")
  }
  useInterval(async () => {
    let resp1 = await passwordListClient()
    resp1.clients.sort((a, b) => a.uin - b.uin || a.protocol - b.protocol);
    setPasswordClients(resp1.clients)

    // 刷新所有扫码状态
    for (let cli of qrcodeClients) {
      try {
        await qrcodeQuery({sig: cli.sig})
      } catch (e) {
        // console.log(e)
      }
    }

    // 刷新扫码登录列表
    let resp2 = await qrcodeListClient()
    resp2.clients.sort((a, b) => a.sig.localeCompare(b.sig));
    setQRCodeClients(resp2.clients)
  }, 3000);

  return (
    <div>
      <div style={{width: "100%", textAlign: "center"}}>
        <Button type="primary" style={{margin: "4px"}} onClick={() => setShowCreateDialog(true)}>创建账号</Button>
      </div>
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
                <Select
                  defaultValue={5}
                  onChange={(v) => {
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
                <Input
                  placeholder='please enter your seed...'
                  type="number"
                  onChange={(v) => setQRCodeForm({
                    ...passwordForm,
                    device_seed: parseInt(v)
                  })}/>
              </Form.Item>
              <Form.Item label='Protocol'>
                <Select onChange={(v) => {
                  setQRCodeForm({
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
                <Button type='primary' onClick={onQRCodeLoginClick}>Login</Button>
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
          <div>使用 <a href="https://github.com/mzdluo123/TxCaptchaHelper/releases" target="_blank"
                     rel="noreferrer">滑块助手</a> 扫码处理
          </div>
          <QRCodeCanvas value={processingClient.resp.captcha_url}/>,
          <Input
            placeholder='please enter your ticket...'
            onChange={(v) => setProcessingTicket(v)}
          />
          <Button type="primary" onClick={onSubmitTicketClick}>提交 Ticket</Button>
        </>}
        {processingClient.resp.verify_url && <>
          <h2>设备锁-扫码验证</h2>
          <div>使用 <a href="https://github.com/mzdluo123/TxCaptchaHelper/releases"
                     target="_blank" rel="noreferrer">滑块助手</a> 扫码处理，完成后删除客户端，重新登录。
          </div>
          <QRCodeCanvas value={processingClient.resp.verify_url}/>,

        </>}
        {
          (processingClient.resp.state === "device_locked" || processingClient.resp.state === "too_many_sms_request") && <>
            <h2>设备锁-短信验证</h2>
            <Button type="primary" onClick={onRequestSmsClick}>发送验证码</Button>
            <Input
              placeholder='please enter your sms...'
              onChange={(v) => setProcessingSms(v)}
            />
            <Button type="primary" onClick={onSubmitSmsClick}>提交验证码</Button>
          </>
        }
      </Modal>

      {/*登录中的列表*/}
      <Row gutter={[24, 16]} style={{padding: "16px"}}>
        {passwordClients
          .map((client) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={client.uin + "|" + client.protocol}>
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
        {qrcodeClients
          .map((client) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={client.sig}>
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
                                     src={`data:image/png;base64, ${client.image}`}/>
                              </Avatar>
                              <div>
                              <div>状态：{getQRCodeState(client.state)}</div>
                              </div>
                            </span>
                    <Button type="outline" status="danger" icon={<IconDelete/>} shape="round"
                            onClick={async () => onQRCodeDeleteClick(client.sig)}/>
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
