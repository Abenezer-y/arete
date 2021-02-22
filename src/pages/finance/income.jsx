import React , {useState, useRef, useEffect} from 'react';
import { Table, Tabs, Card, Row, Col, Layout, Form, Input, InputNumber, DatePicker, Button, Typography, Select } from 'antd';
import request from 'umi-request';
// import {columns, data} from './income/income_summary';
const { TabPane } = Tabs;

const {Content } = Layout;

const modalFormlayout = { labelCol: { span: 4 }, wrapperCol: { span: 24 },};
const { Title } = Typography;
const columns = [
  {title: 'Ref', dataIndex: 'id', align: 'center', render: text => <div>{text}</div>, },
  {title: 'Date', dataIndex: 'date', align: 'center' },
  {title: 'Description', dataIndex: 'description',},
  {title: 'Amount', className: 'column-money', dataIndex: 'amount', align: 'right',},
];


let banks = [{ label: 'Bank 1', value: 1 }, 
           { label: 'Bank 2', value: 2 },
           { label: 'Bank 3', value: 3 },]

export default function IncomeLayout() {
  const [table_values, setTable] = useState([])

  const failureCallback = (error) => {
      console.error("Error: " + error);}

  const formRef = useRef('');

  const onReset = () => {formRef.current.resetFields();};

  useEffect( ()=>{     
  try {
    request.get('http://127.0.0.1:5000/api/incomes', { getResponse: true }).then((data)=>{setTable(data.data)}).catch(failureCallback);
  } catch (error) {
    failureCallback({ error });
  }
  }, [])
    
  const onFinish = (values) => { 


    const dateValue = values['date'];
    const value = { ...values, 'date': dateValue.format('YYYY-MM-DD')};                           
    console.log(value)
    request('https://arete-server.herokuapp.com/api/income_save', 
            {method: 'post', data: {value},}).then(function(response) 
            {console.log(response);}).catch(function(error) 
            {console.log(error);});
    
    
    onReset()
  };
      
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Personal Income"  key="1">
              <Card title= {<Title level={4}>Income Registration</Title>}>
              <Form ref = {formRef} name="income_form" onFinish={onFinish} labelAlign="right" {...modalFormlayout}>
              <br></br> 
              <Form.Item name="date" label="Date" rules={[ { required: true, }, ]} >
                  <DatePicker />
              </Form.Item>
              <Form.Item name="amount" label="Amount" rules={[ { required: true, }, ]} >
                <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: 200 }}/>
              </Form.Item>
              <Form.Item name="bank" label="Bank" rules={[ { required: true, }, ]} >
              <Select  placeholder="Please select bank" options={banks} style={{ maxWidth: 250}}>
                  </Select>
              </Form.Item>
              <Form.Item name="description" label="Description" rules={[ { required: true, }, ]} >
                  <Input />
              </Form.Item>
            <br></br>
            <Row align="middle" justify="center" >
                <Col span={12}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit"> Submit </Button>
                  </Form.Item>
                </Col>
            </Row>
            </Form>
            </Card>
          </TabPane>
          <TabPane tab="Company Income" key="2">
            Income registration layout
          </TabPane>
          <TabPane tab="Income Summary" key="3">
            <Table columns={columns} dataSource={table_values} bordered title={() => 'Header'} footer={() => 'Footer'} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    );
}
