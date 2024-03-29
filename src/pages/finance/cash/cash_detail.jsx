import React, {useEffect, useState} from 'react';
import {Card, Table, Typography, Form, Row, Button, Col} from 'antd';
import request from 'umi-request';
const {Text} = Typography;

const modalFormlayout = { labelCol: { span: 5 }, wrapperCol: { span: 24 },};
const backend_server = process.env.REACT_APP_BACKEND_URI

const expense_columuns = [
  {title: 'No', dataIndex: 'id', align: 'center', },
  {title: 'Date', dataIndex: 'date', align: 'center' },
  {title: 'Type', dataIndex: 'type', align: 'center', },
  {title: 'Description', dataIndex: 'description'},
  {title: 'Cost', dataIndex: 'amount', align: 'right' },
  ];

const Cash_Detail = () => {
  const [cash, setCash] = useState([])
  const [expenses, setExpense] = useState([])
 
  const failureCallback = (error) => {console.error("Error: " + error);}
  const successCallback = (data) => {setCash(data[0])}

  // const cash_address = window.location.href
  // const cash_id = cash_address.charAt(cash_address.length-1)

  // useEffect(
  //   ()=>{ 
  //        try {request.get(`${backend_server}withdrawal/${cash_id}`, { getResponse: true }).then(
  //                               (data)=>{successCallback(data.data)}).catch(failureCallback); 
  //             request.get(`${backend_server}expense_by_cash/${cash_id}`, { getResponse: true }).then(
  //                               (data)=>{setExpense(data.data)}).catch(failureCallback);} 
  //        catch (error) {failureCallback({ error });} 
  //       }, 
  //   [cash_id])

  return (
<Card>
  <Form layout="horizontal" name="userForm" labelAlign="right"  {...modalFormlayout}>
  <Card title={`Cash Detail`}>
      <Form.Item name="description" label="Description">
          <Text>{cash.description}</Text>
      </Form.Item>
      <Form.Item name="amount" label="Initial Amount">
          <Text>{cash.amount}</Text>
      </Form.Item>
      <Form.Item name="balance" label="Current Balance">
          <Text>{cash.cash_on_hand}</Text>
      </Form.Item>
  </Card>
  <br></br>
  <Card title='Cash on hand Balance Adjustment'> 
  Negative Balance
  Positive Balance
  </Card>
  <br></br>
  <Table columns={expense_columuns} dataSource={expenses} bordered title={() => 
    <> <Row>
        <Col flex='auto'>
          <Text strong={true}>Total Expense Covered By Cash: {cash.expenditure}</Text> 
        </Col>
        <Col flex='none'>
          <Button onClick ={() => request.get(`${backend_server}expense_by_cash/${cash_id}`, { getResponse: true }).then((data)=>{setExpense(data.data)}).catch(failureCallback)} >Load Detail</Button>
        </Col>
    </Row> </>}/>
  </Form>
</Card>
  );
};

export default Cash_Detail;