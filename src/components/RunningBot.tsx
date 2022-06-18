import {Avatar, Button, Card, Grid, Message, Space} from "@arco-design/web-react";
import {IconDelete} from "@arco-design/web-react/icon";
import React from "react";
import {Bot, deleteBot, listBot} from "../api/bot";
import {getAvatarUrl, getNetworkStatus, getProtocolName} from "../api/utils";
import {useInterval} from "@arco-design/web-react/es/_util/hooks/useInterval";

const Row = Grid.Row;
const Col = Grid.Col;

function RunningBot() {
  const [bots, setBots] = React.useState<Array<Bot>>([]);
  useInterval(async () => {
    let resp = await listBot();
    if (bots.length < resp.bots.length) {
      Message.info("账号登录成功，切换到【正在运行】页面查看")
    }
    resp.bots.sort((a, b) => a.uin - b.uin || a.protocol - b.protocol);
    setBots(resp.bots)
  }, 3000);


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
                                <img alt="avatar" src={getAvatarUrl(bot.uin)}/>
                              </Avatar>
                              <Space direction="vertical" size="mini">
                                <div>账号：875543533</div>
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
