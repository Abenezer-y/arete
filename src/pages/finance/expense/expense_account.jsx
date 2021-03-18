import React, {useEffect, useState} from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Button, Typography, Table} from 'antd';
import request from 'umi-request';

const backend_server = process.env.REACT_APP_BACKEND_URI
const { Title } = Typography;
const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 24 },};

const columns = [
    {title: 'Acc. Code', dataIndex: 'code', align: 'center', render: text => <div>{text}</div>, width: 50,},
    {title: 'Acc. Name', dataIndex: 'name', width: 150, align: 'center' },
    {title: 'Balance', className: 'column-money', dataIndex: 'balance', align: 'right', width: 90,},
  ];


const Expense_Account = () => {
  const formRef = React.createRef();
  const [main_form] = Form.useForm();
  const [accounts, setAccount] = useState([])

  const failureCallback = (error) => {
      console.error("Error: " + error);}

  const onSuccefulCallback = (data) => {
    const account_data = data[0].accounts
    setAccount(account_data)}

  const onReset = () => {formRef.current.resetFields();};
  useEffect( ()=>{     
    try {
      request.get(`${backend_server}accounts`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback);} 
    catch (error) {failureCallback({ error });}}, [])

  const onFinish = (values) => {            
    request(`${backend_server}account_save`, {method: 'post', data: {values},})
            .then(function(response) {console.log(response);})
            .catch(function(error) {console.log(error);});             
    onReset()
    try {
        request.get(`${backend_server}accounts`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback);} 
    catch (error) {failureCallback({ error });}
    };

  return (
    <>
    <Row gutter={[16, 16]}>
        <Col flex="auto">
            <Card hoverable  title={<Title level={4}>Expense Accounts</Title>}>
            <Form form={main_form} ref={formRef} layout="horizontal" name="userForm" labelAlign="right"  {...formItemLayout}
                onFinish={onFinish}>
                <Form.Item name="code" label='Account Code'rules={[ { required: true, }, ]} >
                    <InputNumber style={{ maxWidth: 200 }}/>
                </Form.Item> 
                <Form.Item name="name" label='Account Name' rules={[ { required: true, }, ]} >
                    <Input style={{ maxWidth: 200 }}/>
                </Form.Item>  
                <Form.Item name="balance" label="Opening Balance" rules={[ { required: true, }, ]} >
                <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: 200 }}/>
                </Form.Item>
            <br/>
            <Row align="middle" justify="center"  gutter={[8, 14]}>
            <Col flex="auto">
                </Col>
                <Col flex="none">
                <Form.Item>
                    <Button type="primary" htmlType="submit"> Add Account </Button>
                </Form.Item>
                </Col>
                <Col flex="auto">
                </Col>
            </Row>
            </Form>
            </Card>
        </Col>
        <Col flex="auto">
        <Table columns={columns} dataSource={accounts} />
      
        </Col>
    </Row>


    </>
  );
};

export default Expense_Account;