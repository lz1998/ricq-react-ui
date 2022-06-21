import {Avatar, Button, Card, Grid, Message, Space} from "@arco-design/web-react";
import {IconDelete} from "@arco-design/web-react/icon";
import React from "react";
import {Bot, deleteBot} from "../api/bot";
import {getAvatarUrl, getNetworkStatus, getProtocolName} from "../api/utils";

const Row = Grid.Row;
const Col = Grid.Col;

interface RunningBotProp {
  bots: Array<Bot>
}

function RunningBot(props: RunningBotProp) {
  const {bots} = props

  const onDeleteBotClick = async (uin: number, protocol: number) => {
    await deleteBot({
      uin,
      protocol
    })
    Message.info("删除成功")
  }
  return (
    <div>
      <Row gutter={[24, 16]} style={{padding: "16px"}}>
        {bots
          .map((bot) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={bot.uin + "|" + bot.protocol}>
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
                              >
                                <img alt="avatar" src={getAvatarUrl(bot.uin)}/>
                              </Avatar>
                              <Space direction="vertical" size="mini">
                                <div>账号：{bot.uin}</div>
                                <div>状态：{getNetworkStatus(bot.status)}</div>
                                <div>协议：{getProtocolName(bot.protocol)}</div>
                              </Space>
                            </span>
                    <Button type="outline" status="danger" icon={<IconDelete/>} shape="round"
                            onClick={async () => onDeleteBotClick(bot.uin, bot.protocol)}/>
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
