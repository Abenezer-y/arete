import React , {useRef} from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Button, Typography } from 'antd';
import request from 'umi-request';

const Formlayout = { labelCol: { span: 6 }, wrapperCol: { span: 24 },};
const { Title } = Typography;
const backend_server = process.env.REACT_APP_BACKEND_URI

export default function BankAdd() {

  const formRef = useRef('');
  const onReset = () => {formRef.current.resetFields();};
  
  const onFinish = (values) => { 
    console.log(values)
    request(`${backend_server}bank_save`, 
            {method: 'post', data: {values},}).then(function(response) 
            {console.log(response);}).catch(function(error) 
            {console.log(error);});
    onReset()
  };
      
    return (
      <Card title= {<Title level={4}>Add Bank Account</Title>}>
        <Form  ref = {formRef} name="bank_form" onFinish={onFinish} labelAlign="right" {...Formlayout}>
        <br></br> 
        <Form.Item name="bank" label="Bank Name" rules={[ { required: true, }, ]} >
          <Input style={{ maxWidth: 300}}/>
        </Form.Item>
        <Form.Item name="bank_acc" label="Account Number" rules={[ { required: true, }, ]} >
          <Input style={{ maxWidth: 300}} />
        </Form.Item>
        <Form.Item name="opn_blc" label="Opening Balance" rules={[ { required: true, }, ]} >
          <InputNumber
              placeholder="1000.00"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: 150 }}/>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[ { required: true, }, ]} >
            <Input />
        </Form.Item>
      <br></br>
      <Row align="middle" justify="center" >
          <Col flex='auto'></Col>
          <Col flex='none'>
            <Form.Item>
              <Button type="primary" htmlType="submit"> Submit </Button>
            </Form.Item>
          </Col>
          <Col flex='auto'></Col>
      </Row>
      </Form>
      </Card>
    );
}

