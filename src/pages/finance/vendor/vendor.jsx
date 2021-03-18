import { Layout,  Tabs,  Table, Row, Col, Button} from 'antd';
import Vendor from './vendor_registration';
import React , {useState,  useEffect} from 'react';
import request from 'umi-request';


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

export default function Vendor_App() {
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
          <TabPane tab="Expense Registration" key="2"> <Vendor /> </TabPane>
        </Tabs>
      </Content>
    </Layout>

    );
}

