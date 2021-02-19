import { Layout,  Tabs,  Table, Statistic, Row, Col, Card} from 'antd';
import Expense from './expense/expense_registration';
import React , {useState,  useEffect} from 'react';
import request from 'umi-request';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const columns = [
  {title: 'Ref', dataIndex: 'id', align: 'center', render: text => <div>{text}</div>, },
  {title: 'Date', dataIndex: 'date', align: 'center' },
  {title: 'Amount', className: 'column-money', dataIndex: 'amount', align: 'right',},
  {title: 'Description', dataIndex: 'description',},

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

  // const successCallback = (data) =>{
  //   console.log(data);
  //   console.log(data.data);
  //   setExpenses(data.data)
  //   console.log(expenses);
  // }
  const failureCallback = (error) => {
      console.error("Error: " + error);}


  useEffect( ()=>{     
  try {
    request.get('https://arete-server.herokuapp.com/api/incomes', { getResponse: true }).then((data)=>{setExpenses(data.data)}).catch(failureCallback);
  } catch (error) {
    failureCallback({ error });
  }
  }, [])
    return (

    <Layout style={{ minHeight: '100vh' }}>
      
      <Content style={{ margin: '0 16px' }}>
    
    
        <Tabs defaultActiveKey="2">
          <TabPane tab="Summary"  key="1"> 
          <Table columns={columns} dataSource={expenses} bordered title={() => 'Header'} footer={() => 'Footer'} />
          </TabPane>
          <TabPane tab="Expense Registration" key="2"> <Expense /> </TabPane>
          <TabPane tab="Expense planning" key="3"> {stat_render} </TabPane>
        </Tabs>
       
      </Content>
    </Layout>

    );
}

