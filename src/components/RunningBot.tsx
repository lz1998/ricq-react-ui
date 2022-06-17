import {Avatar, Button, Card, Grid, Space} from "@arco-design/web-react";
import {IconDelete} from "@arco-design/web-react/icon";
import React from "react";

const Row = Grid.Row;
const Col = Grid.Col;

function RunningBot() {
  return (
    <div>
      <Row gutter={[24, 16]} style={{padding: "16px"}}>
        {Array.from(new Array(10).keys())
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
                                <div>状态：在线</div>
                                <div>协议：手机</div>
                              </Space>
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

export default RunningBot
