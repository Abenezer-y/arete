import React , {useState, useEffect} from 'react';
import { Table, Tabs, Layout, Card, Button, Row, Col } from 'antd';
import request from 'umi-request';
import BankAdd from './bank/bank_creation';
import Withdraw from './bank/bank_withdrawal';

const { TabPane } = Tabs;

const {Content } = Layout;

const backend_server = process.env.REACT_APP_BACKEND_URI

const columns = [
  {title: 'Acc #', dataIndex: 'key', align: 'center', },
  {title: 'Bank', dataIndex: 'bank', align: 'center' },
  {title: 'Description', dataIndex: 'description' },
  {title: 'Opening Balance', dataIndex: 'opn_blc', align: 'right', },
  {title: 'Debit', dataIndex: 'debit', align: 'right',  },
  {title: 'Credit', dataIndex: 'credit', align: 'right' },
  {title: 'Balance', dataIndex: 'balance', align: 'right',},
];
const columns_2 = [
  {title: 'Acc #', dataIndex: 'key', align: 'center', },
  {title: 'Bank', dataIndex: 'date', align: 'center' },
  {title: 'Description', dataIndex: 'reason' },
  {title: 'Ref', dataIndex: 'ck_num' },
  {title: 'Amount', dataIndex: 'amount', align: 'right',  },
];

export default function BankLayout() {

    const [table_values, setTable] = useState([])
    const [withdrawal_table, setWithdraw] = useState([])
    const onSuccefulCallback = (data) => {
      const bank_data = data[0].bank_table
      setTable(bank_data)
    }

    const failureCallback = (error) => {
        console.error("Error: " + error);}
    
    useEffect( ()=>{     
    try {
      request.get(`${backend_server}banks`, { getResponse: true }).then((data)=>{onSuccefulCallback(data.data)}).catch(failureCallback);
      request.get(`${backend_server}withdrawals`, { getResponse: true }).then((data)=>{setWithdraw(data.data)}).catch(failureCallback)
    } catch (error) {
      failureCallback({ error });
    }
    }, [])

      
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bank Account"  key="1">
              <BankAdd/>
          </TabPane>

          <TabPane tab="Bank Accounts Summary" key="2">
            <Card>
              <Table columns={columns} dataSource={table_values} bordered title={() => <><Row><Col flex='auto'>Bank Account Summary</Col><Col flex='none'>
              <Button onClick ={() => request.get(`${backend_server}banks`, { getResponse: true }).then((data)=>{setTable(data.data)}).catch(failureCallback)}>Load Data</Button></Col></Row> </>}/>
            </Card>
          </TabPane>

          <TabPane tab="Withdrawls" key="3">
              <Withdraw />
          </TabPane>

          <TabPane tab="Withdrwal Summary" key="4">
            <Card>
              <Table columns={columns_2} dataSource={withdrawal_table} bordered title={() => <><Row><Col flex='auto'>Withdrwal Summary</Col><Col flex='none'>
              <Button onClick ={() => request.get(`${backend_server}withdrawals`, { getResponse: true }).then((data)=>{setWithdraw(data.data)}).catch(failureCallback)}>Load Data</Button></Col></Row> </>}/>
            </Card>
          </TabPane>

        </Tabs>
      </Content>
    </Layout>
    );
}
