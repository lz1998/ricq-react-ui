import {Avatar, Button, Card, Form, Grid, Input, Modal, Select, Space, Tabs} from "@arco-design/web-react";
import {IconDelete, IconLock} from "@arco-design/web-react/icon";
import React from "react";
import {passwordCreate, PasswordCreateRequest} from "../api/password";

const Row = Grid.Row;
const Col = Grid.Col;


function CreateBot() {
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [showProcessDialog, setShowProcessDialog] = React.useState(false);
  const [passwordForm, setPasswordForm] = React.useState<PasswordCreateRequest>({
    device_seed: 0,
    password: "",
    protocol: 0,
    uin: 0
  });

  const onPasswordLoginClick = async () => {
    let resp = await passwordCreate(passwordForm)
    // TODO message box
    console.log(resp)
    setShowCreateDialog(false)
  }

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
          根据类型确定展示什么
        </div>
        <div style={{margin: "8px"}}>
          滑块验证码：URL生成二维码，提示用 助手 处理。
          输入 ticket 继续。
        </div>
        <div style={{margin: "8px"}}>
          设备锁URL：URL生成二维码，提示用 助手 处理。
          展示获取短信按钮，点击后转为短信验证码。
          点击"已完成处理"后，提示删除重新创建。
        </div>
        <div style={{margin: "8px"}}>
          设备锁短信：URL生成二维码，提示用 助手 处理。展示获取短信按钮，点击后转为短信验证码。
          输入 短信验证码 继续。
        </div>
      </Modal>

      {/*登录中的列表*/}
      <Row gutter={[24, 16]} style={{padding: "16px"}}>
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
                              >
                                <img alt="avatar" src="https://p.qlogo.cn/gh/982166018/982166018/0"/>
                              </Avatar>
                              <Space direction="vertical" size="mini">
                                <div>账号：875543533</div>
                                <div>状态：滑块验证码</div>
                                <div>协议：手机</div>
                              </Space>
                            </span>
                    <Space>
                      <Button type="outline" status="warning" icon={<IconLock/>} shape="round"
                              onClick={() => setShowProcessDialog(true)}/>
                      <Button type="outline" status="danger" icon={<IconDelete/>} shape="round"/>
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
