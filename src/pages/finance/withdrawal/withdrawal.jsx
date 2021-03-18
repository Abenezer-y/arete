import React , {useState, useEffect} from 'react';
import { Table, Tabs, Layout, Button, Row, Col } from 'antd';
import request from 'umi-request';
import Withdraw from './bank_withdrawal';

const { TabPane } = Tabs;
const {Content } = Layout;
const backend_server = process.env.REACT_APP_BACKEND_URI

const columns = [
  {title: 'Acc #', dataIndex: 'key', align: 'center', },
  {title: 'Ref', dataIndex: 'ck_num' },
  {title: 'Date', dataIndex: 'date', align: 'center' },
  {title: 'Description', dataIndex: 'reason' },
  {title: 'Amount', dataIndex: 'amount', align: 'right',  },
  {title: 'Expenditure', dataIndex: 'expenditure', align: 'right',  },
  {title: 'Cash Balance', dataIndex: 'cash_on_hand', align: 'right',  },
];

export default function Withdrawal_App() {
    const [withdrawal_table, setWithdraw] = useState([])
    const onSuccefulCallback = (data) => {
      const withdrawal_data = data[0].withdrawals
      setWithdraw(withdrawal_data)}
    const failureCallback = (error) => {console.error("Error: " + error);}
    
    useEffect( ()=>{     
    try {
      request.get(`${backend_server}withdrawals`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback)
    } catch (error) {
      failureCallback({ error });
    }
    }, [])

      
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <Tabs defaultActiveKey="2">
          <TabPane tab="Withdrawls" key="1">
              <Withdraw />
          </TabPane>
          <TabPane tab="Withdrwal Summary" key="2">
   
              <Table columns={columns} dataSource={withdrawal_table} bordered title={() => <><Row><Col flex='auto'>Withdrwal Summary</Col><Col flex='none'>
              <Button onClick ={() => request.get(`${backend_server}withdrawals`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback)}>Load Data</Button></Col></Row> </>}/>

          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    );
}
