import { Layout,  Tabs,  Table, Statistic, Row, Col, Card, Button} from 'antd';
import Expense from './expense/expense_registration';
import React , {useState,  useEffect} from 'react';
import request from 'umi-request';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const backend_server = process.env.REACT_APP_BACKEND_URI
const { TabPane } = Tabs;
const columns = [
  {title: 'Ref', dataIndex: 'id', align: 'center', render: text => <div>{text}</div>, },
  {title: 'Date', dataIndex: 'date', align: 'center' },
  {title: 'Transaction Type', dataIndex: 'type',},
  {title: 'Description', dataIndex: 'description',},
  {title: 'Amount', className: 'column-money', dataIndex: 'amount', align: 'right',},
  {title: 'Receipt Number', dataIndex: 'receipt_number',},

];

const {Content } = Layout;



function stat_render () {
  
  return (
  <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
);
}

export default function ExpenseLayout() {
  const [expenses, setExpenses] = useState([])

  const failureCallback = (error) => {
      console.error("Error: " + error);}


  useEffect( ()=>{     
  try {
    request.get(`${backend_server}expenses`, { getResponse: true }).then((data)=>{setExpenses(data.data)}).catch(failureCallback);
  } catch (error) {
    failureCallback({ error });
  }
  }, [])
    return (

    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
          <Tabs defaultActiveKey="2">
          <TabPane tab="Expense Summary"  key="1"> 
     
            <Table columns={columns} dataSource={expenses} bordered title={() => <><Row><Col flex='auto'>Expense Summary</Col><Col flex='none'>
              <Button onClick ={() => request.get(`${backend_server}expenses`, { getResponse: true }).then((data)=>{setExpenses(data.data)}).catch(failureCallback)}>Load Data</Button></Col></Row> </>}/>
      
          </TabPane>
          <TabPane tab="Expense Registration" key="2"> <Expense /> </TabPane>
          <TabPane tab="Expense planning" key="3"> {stat_render} </TabPane>
        </Tabs>
      </Content>
    </Layout>

    );
}

