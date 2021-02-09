// task_trip
// TaskTrip

import { Form, Input, Button, Space, Col, Row, InputNumber, Card} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';



const TaskTrip = () => {

  return (
    <>
      <Card title="Trip information">
      <Form.List name="trips">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} >
                  
                <Form.Item {...field} label={[" Loaction ", field.key]} name={[field.name, 'location']} 
                            fieldKey={[field.fieldKey, 'location']}  
                            rules={[{ required: true, message: 'Missing Loaction' }]}>
                    <Input style={{ width: 400 }} />
                 
                </Form.Item>

                <Form.Item {...field} label="Est. Cost" name={[field.name, 'cost']} fieldKey={[field.fieldKey, 'cost']}
                            rules={[{ required: true, message: 'Missing Cost' }]}>
                        <InputNumber defaultValue={0}  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={value => value.replace(/\$\s?|(,*)/g, '')}  style={{ width: 120 }}/>
                </Form.Item>

                <Form.Item {...field} label="Hrs." name={[field.name, 'hrs']} fieldKey={[field.fieldKey, 'hrs']}>
                        <InputNumber defaultValue={0} style={{ width: 60 }} min={0}/>
                </Form.Item>
                <Form.Item {...field} label="Mins." name={[field.name, 'mins']} fieldKey={[field.fieldKey, 'mins']}
                            rules={[{ required: true, message: 'Missing Time' }]}>
                        <InputNumber defaultValue={0} style={{ width: 60 }} min={0} max={59}/>
                </Form.Item>

                <Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Form.Item>

              </Space>
            ))}

            <Row gutter={[14, 14]}>
                <Col span={12}> 
                <Form.Item>
                    <Button onClick={() => add()}  icon={<PlusOutlined />}>
                        Add Travel Information
                    </Button>
                </Form.Item>
                </Col>
                <Col span={12}> 
                </Col>
            </Row>


          </>
        )}
      </Form.List>
      </Card>
      </>
  );
};

export default TaskTrip;
