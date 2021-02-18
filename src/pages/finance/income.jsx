import React , {useState} from 'react';
import { Table, Tabs, Card, Row, Col, Layout, Form, Input, InputNumber, DatePicker, Button } from 'antd';
import request from 'umi-request';
// import {columns, data} from './income/income_summary';
const { TabPane } = Tabs;

const {Content, Header } = Layout;

const modalFormlayout = { labelCol: { span: 4 }, wrapperCol: { span: 24 },};

const columns = [
  {title: 'Ref', dataIndex: 'id', align: 'center', render: text => <a>{text}</a>, },
  {title: 'Date', dataIndex: 'date', align: 'center' },
  {title: 'Description', dataIndex: 'description',},
  {title: 'Amount', className: 'column-money', dataIndex: 'amount', align: 'right',},
];


export default function IncomeLayout() {
  const [table_values, setTable] = useState([{key: 1, id:"", description:"", amount:"", date:""}])
  const successCallback = (data) => {
    console.log(data);
    console.log(table_values);
    console.log("Reached This Stage")     
   }

  const failureCallback = (error) => {
    console.error("Error generating audio file: " + error);}

  const formRef = React.createRef();

  const onReset = () => {formRef.current.resetFields();};
  
  const onFinish = (values) => { 
    const dateValue = values['date'];
    const value = { ...values, 'date': dateValue.format('YYYY-MM-DD')};                           

    request('https://arete-server.herokuapp.com/api/income_save', 
            {method: 'post', data: {value},}).then(function(response) 
            {console.log(response);}).catch(function(error) 
            {console.log(error);});
    
    request.get('https://arete-server.herokuapp.com/api/incomes', { getResponse: true }).then((data) => setTable(data.data)).catch(failureCallback);
    onReset()
  };
      
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header></Header>
      <Content style={{ margin: '0 16px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Personal Income"  key="1">
              <Card>
              <Form  ref={formRef} name="income_form" onFinish={onFinish} labelAlign="right" {...modalFormlayout}>
              <br></br> 
              <Form.Item name="date" label="Date" rules={[ { required: true, }, ]} >
                  <DatePicker />
              </Form.Item>
              <Form.Item name="amount" label="Amount" rules={[ { required: true, }, ]} >
                <InputNumber
                    defaultValue={0}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: 200 }}/>
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
            <Table columns={columns}  dataSource={table_values} bordered title={() => 'Header'} footer={() => 'Footer'} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    );
}
