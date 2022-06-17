import {Button, Card, Descriptions, Grid, Space} from "@arco-design/web-react";
import {IconDelete, IconEdit} from "@arco-design/web-react/icon";
import React from "react";

const Row = Grid.Row;
const Col = Grid.Col;

function PluginConfig() {
  return (
    <div style={{textAlign:"center"}}>
      <Button type="primary" style={{margin:"4px"}}>创建插件</Button>
      <Row gutter={[24, 16]} style={{padding: "16px"}}>
        {Array.from(new Array(10).keys())
          .map((k) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={k}>
                <Card hoverable>
                  <Descriptions
                    column={1}
                    title='Plugin Info'
                    data={[
                      {
                        label: 'Name',
                        value: 'Default',
                      },
                      {
                        label: 'Description',
                        value: '默认插件',
                      },
                      {
                        label: 'Url',
                        value: 'ws://localhost:8081/ws/cq/',
                      },
                      {
                        label: 'Enabled',
                        value: 'true',
                      },
                    ]}
                    style={{marginBottom: 20}}
                    labelStyle={{paddingRight: 36}}
                  />
                  <Space>
                    <Button type="primary" icon={<IconEdit/>}>编辑</Button>
                    <Button type="primary" status="danger" icon={<IconDelete/>}>删除</Button>
                  </Space>
                </Card>
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default PluginConfig
