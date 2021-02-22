// task_requirements
// TaskRequirements

import React from 'react';
import { Form, Input, Button, Col, Row, Upload, Card} from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './new-task.css';

export default function TaskRequirements(){
  return (
    <>
      <Card title="Requirements to complet task">
      <Row align="middle" justify="center" >
          <Col flex='none'></Col>
          <Col flex='auto'>

      <Form.List name="requirements">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Row  align="middle" key={field.key} gutter={[6, 6]} >
                <Col flex="auto">
                <Form.Item  {...field}  name={[field.name, 'requirement']} 
                            fieldKey={[field.fieldKey, 'requirement']} 
                            rules={[{ required: true, message: 'Missing Item Break Down' }]}>
                  <Input placeholder={["Add requirement"]}/>
                </Form.Item>
                </Col>
                <Row gutter={[16, 16]}>
                  <Col flex="none">
                    <Form.Item>
                      <Upload name="logo" listType="picture">
                          <Button icon={<UploadOutlined />}></Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col flex="none">
                    <Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Form.Item>
                  </Col>
                </Row>
              </Row>
            ))}    
                <Form.Item>
                <Button style={{ width: 200 }} onClick={() => add()}  icon={<PlusOutlined />}>
                        Add Requirements
                    </Button>
                </Form.Item>
          </> )}
      </Form.List>

      </Col>
          <Col flex='none'></Col>
      </Row>
      </Card>
      </>
  );
};
 
