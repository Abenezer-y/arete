import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Button, Typography, DatePicker, Upload} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { Select } from 'antd';
import request from 'umi-request';

const backend_server = process.env.REACT_APP_BACKEND_URI

const { Option } = Select;
const { Text, Title } = Typography;
const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 24 },};


const Expense = () => {
  const formRef = React.createRef();
  const [cash, setCash] = useState([]);
  const [exp_acc, setAccount] = useState([]);
  const [main_form] = Form.useForm();

  const failureCallback = (error) => {console.error("Error: " + error);}
  
  const onSuccefulCallback = (data) => {
    const cash_available = data[1].withdrawal_selection
    setCash(cash_available)}

  const onSuccefulCallback_accounts = (data) => {
      const accounts_available = data[1].account_selection
      setAccount(accounts_available)}  

  const onReset = () => {formRef.current.resetFields();};

  useEffect( ()=>{     
    try {
      request.get(`${backend_server}withdrawals`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback);
      request.get(`${backend_server}accounts`, { getResponse: true }).then((data)=>{onSuccefulCallback_accounts(data.data)}).catch(failureCallback);} 
    catch (error) {failureCallback({ error });}}, [])

  const onFinish = (values) => { 
    const value = { ...values, 'date': values['date'].format('YYYY-MM-DD'),};            
    request(`${backend_server}expense_save`, {method: 'post', data: {value},})
            .then(function(response) {console.log(response);})
            .catch(function(error) {console.log(error);});             
    onReset()};

  return (
    <>
    <Card hoverable  title={<Title level={4}>Expense Registration Form</Title>}>
    <Form form={main_form} ref={formRef} layout="horizontal" name="userForm" labelAlign="right"  {...formItemLayout}
          onFinish={onFinish}>
        <Form.Item name="date" label={<Text strong= "true">Date</Text>} rules={[ { required: true, }, ]} >
          <DatePicker />
        </Form.Item>
        <Form.Item name="receipt_number" label={<Text strong= "true">Receipt Number</Text>} rules={[ { required: true, }, ]} >
              <Input style={{ maxWidth: 200 }}/>
      </Form.Item>  
        <Form.Item name="type"  label={<span>Transaction type</span>} rules={[ { required: true, }, ]} >
        <Select style={{ width: 200 }} >
          <Option value="service">Service</Option>
          <Option value="purchase">Purchase</Option>
        </Select>
        </Form.Item> 
 
        <Form.Item name="amount" label="Amount" rules={[ { required: true, }, ]} >
        <InputNumber
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: 200 }}
          />
        </Form.Item>
                     
        <Form.Item name="acc"  label='Expense Account' rules={[ { required: true, }, ]} >
          <Select style={{ width: 200 }}  options={exp_acc} />
        </Form.Item>
           
        <Form.Item name="payment" label="Payment Method" rules={[ { required: true, }, ]} >
          <Select style={{ width: 200 }} options={cash} />
        </Form.Item>
      
        <Form.Item name="description" label= {<Text>Reason for transaction</Text>}  rules={[ { required: true, }, ]} >
          <Input />
        </Form.Item>

      <br />
      <Card title= {<Title level={4}>Upload Receipt</Title>}>
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Card>
      <br/>
      <Row align="middle" justify="center"  gutter={[8, 14]}>
      <Col flex="auto">
        </Col>
        <Col flex="none">
          <Form.Item>
            <Button type="primary" htmlType="submit"> Submit </Button>
          </Form.Item>
        </Col>
        <Col flex="auto">
        </Col>
      </Row>

      </Form>
      </Card>

    </>
  );
};

export default Expense;