import React , {useState, useRef, useEffect} from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Button, Typography, DatePicker, Select } from 'antd';
import request from 'umi-request';

const Formlayout = { labelCol: { span: 6 }, wrapperCol: { span: 24 },};
const { Title } = Typography;

const backend_server = process.env.REACT_APP_BACKEND_URI

export default function Withdraw() {
  const [bank_values, setBank] = useState([])
  const formRef = useRef('');
  const onReset = () => {formRef.current.resetFields();};
  const failureCallback = (error) => {
    console.error("Error: " + error);}
  const onSuccefulCallback = (data) => {
    console.log(data)
    const bank_data = data[1].bank_selection
    console.log(data[1].bank_selection)
    setBank(bank_data)
  }
  useEffect( ()=>{     
    try {
       request.get(`${backend_server}banks`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback);
    } catch (error) {
      failureCallback({ error });
    }
    }, [])
      
  const onFinish = (values) => { 
    const value = { ...values, 'date': values['date'].format('YYYY-MM-DD'),};
    console.log(value)
    request(`${backend_server}add_withdrawal`, 
            {method: 'post', data: {value},}).then(function(response) 
            {console.log(response);}).catch(function(error) 
            {console.log(error);});
    onReset()
  };
      
    return (
      <Card title= {<Title level={4}>Check Withdrawals</Title>}>
        <Form  ref = {formRef} name="withdrawal_form" onFinish={onFinish} labelAlign="right" {...Formlayout}>
        <br></br> 
        <Form.Item name="date" label="Date" rules={[ { required: true, }, ]} >
          <DatePicker />
        </Form.Item>
        <Form.Item name="ck_amount" label="Amount" rules={[ { required: true, }, ]} >
          <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: 150 }}/>
        </Form.Item>
        <Form.Item name="bank" label="Bank" rules={[ { required: true, }, ]} >
        <Select  placeholder="Please select bank" options={bank_values} style={{ maxWidth: 250}}>
            </Select>
        </Form.Item>
        <Form.Item name="ck_num" label="Check Number" rules={[ { required: true, }, ]} >
          <Input style={{ maxWidth: 250}} />
        </Form.Item>
        <Form.Item name="payee" label="Payable to" rules={[ { required: true, }, ]} >
          <Input style={{ maxWidth: 250}}/>
        </Form.Item>
        <Form.Item name="description" label="Reason to withdraw" rules={[ { required: true, }, ]} >
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