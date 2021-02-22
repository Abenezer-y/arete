// task_breakdown
// TaskBreakdown
import React from 'react';
import { Form, Input, Button, Col, Row,  InputNumber, Card} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function TaskRequirements() {
            
  return (
    <>
      <Card title="Procedures (Task breakdown)">
      <Row align="middle" justify="center" >
          <Col flex='none'></Col>
          <Col flex='auto'>

      <Form.List name="breakdowns">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Row  key={field.key} gutter={[16, 16]}>
              <Col flex="auto">
                <Form.Item {...field} name={[field.name, 'step']} 
                            fieldKey={[field.fieldKey, 'step']}  
                            rules={[{ required: true, message: 'Missing Item Break Down' }]}>
                    <Input placeholder={"Add Procedure"}/>
                 
                </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item {...field} label="Est. Cost" name={[field.name, 'cost']} fieldKey={[field.fieldKey, 'cost']}
                            rules={[{ required: true, message: 'Missing Cost' }]}>
                        <InputNumber formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={value => value.replace(/\$\s?|(,*)/g, '')}  style={{ width: 100 }}/>
                </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item {...field} label="Hrs." name={[field.name, 'hrs']} fieldKey={[field.fieldKey, 'hrs']}>
                        <InputNumber  style={{ width: 40 }} min={0}/>
                </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item {...field} label="Mins." name={[field.name, 'mins']} fieldKey={[field.fieldKey, 'mins']}
                            rules={[{ required: true, message: 'Missing Time' }]}>
                        <InputNumber  style={{ width: 50 }} min={0} max={59}/>
                </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Form.Item>
                </Col>
                </Row>
            ))}

              
                <Form.Item>
                    <Button style={{ width: 200 }} onClick={() => add()}  icon={<PlusOutlined />}>
                        Add Steps
                    </Button>
                </Form.Item>
    

          </>
        )}
      </Form.List>
  
      </Col>
          <Col flex='none'></Col>
      </Row>
      </Card>
    </>
  );
};

// export default TaskBreakdown;
