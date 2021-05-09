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
  </Form>
</Card>
  );
};

export default Cash_Detail;