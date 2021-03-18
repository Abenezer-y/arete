import React , {useState, useRef, useEffect} from 'react';
import { Table, Card, Row, Col, Layout, Form, Input, InputNumber, DatePicker, Button, Typography, Select } from 'antd';
import request from 'umi-request';
// import {columns, data} from './income/income_summary';
import { Link } from 'react-router-dom';

const backend_server = process.env.REACT_APP_BACKEND_URI

const {Content } = Layout;

const columns = [
    {title: 'Acc #', dataIndex: 'key', align: 'center', },
    {title: 'Ref', dataIndex: 'ck_num',
            render: ( text, record, index) => <Link to={`cash_detail/${record.key}`} >{text}</Link>},
    {title: 'Date', dataIndex: 'date', align: 'center' },
    {title: 'Description', dataIndex: 'reason' },
    {title: 'Cash Balance', dataIndex: 'cash_on_hand', align: 'right',  },
  ];




export default function Cash_App() {
  const [table_values, setTable] = useState([])

//   const [bank_values, setBank] = useState([])
  const failureCallback = (error) => {
      console.error("Error: " + error);}

  const onSuccefulCallback = (data) => {
    const withdrawal_data = data[0].withdrawals
    setTable(withdrawal_data)
  }

  const formRef = useRef('');

  const onReset = () => {formRef.current.resetFields();};

  useEffect( ()=>{     
  try {
    request.get(`${backend_server}withdrawals`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback); } 
  catch (error) {failureCallback({ error });}}, [])
    
  const onFinish = (values) => { 
    const dateValue = values['date'];
    const value = { ...values, 'date': dateValue.format('YYYY-MM-DD')};                           
    console.log(value)
    request(`${backend_server}income_save`, 
            {method: 'post', data: {value},}).then(function(response) 
            {console.log(response);}).catch(function(error) 
            {console.log(error);});   
    onReset()};
      
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <Table columns={columns} dataSource={table_values} bordered title={() => <>
            <Row>
                <Col flex='auto'>Cash Summary</Col>
                <Col flex='none'>
                    <Button onClick ={() => request.get(`${backend_server}withdrawals`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback)}>Load Data</Button>
                </Col>
            </Row> </>}/>
      </Content>
    </Layout>
    );
}
