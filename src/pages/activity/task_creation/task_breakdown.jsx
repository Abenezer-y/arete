// task_breakdown
// TaskBreakdown
import React from 'react';
import { Form, Input, Button, Col, Row,  InputNumber, Card} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function TaskRequirements() {
            
  return (
    <>
      <Card title="Procedures (Task breakdown)">
      <Form.List name="breakdowns">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Row  key={field.key} gutter={[16, 16]}>
              <Col flex="auto">
                <Form.Item {...field} label={["Steps ", field.key]} name={[field.name, 'step']} 
                            fieldKey={[field.fieldKey, 'step']}  
                            rules={[{ required: true, message: 'Missing Item Break Down' }]}>
                    <Input />
                 
                </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item {...field} label="Est. Cost" name={[field.name, 'cost']} fieldKey={[field.fieldKey, 'cost']}
                            rules={[{ required: true, message: 'Missing Cost' }]}>
                        <InputNumber defaultValue={0}  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={value => value.replace(/\$\s?|(,*)/g, '')}  style={{ width: 100 }}/>
                </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item {...field} label="Hrs." name={[field.name, 'hrs']} fieldKey={[field.fieldKey, 'hrs']}>
                        <InputNumber defaultValue={0} style={{ width: 40 }} min={0}/>
                </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item {...field} label="Mins." name={[field.name, 'mins']} fieldKey={[field.fieldKey, 'mins']}
                            rules={[{ required: true, message: 'Missing Time' }]}>
                        <InputNumber defaultValue={0} style={{ width: 50 }} min={0} max={59}/>
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
                    <Button onClick={() => add()}  icon={<PlusOutlined />}>
                        Add Steps
                    </Button>
                </Form.Item>
    

          </>
        )}
      </Form.List>
      </Card>
    </>
  );
};

// export default TaskBreakdown;
