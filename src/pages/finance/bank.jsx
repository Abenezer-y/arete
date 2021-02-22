import React , {useState, useEffect} from 'react';
import { Table, Tabs, Layout } from 'antd';
import request from 'umi-request';
import BankAdd from './bank/bank_creation';
import Withdraw from './bank/bank_withdrawal';

const { TabPane } = Tabs;

const {Content } = Layout;

// const { Title } = Typography;

const columns = [
  {title: 'Acc #', dataIndex: 'acc_num', align: 'center', },
  {title: 'Bank', dataIndex: 'bank', align: 'center' },
  {title: 'Description', dataIndex: 'description' },
  {title: 'Opening Balance', dataIndex: 'opn_blc', align: 'right', },
  {title: 'Debit', dataIndex: 'debit', align: 'right',  },
  {title: 'Credit', dataIndex: 'credit', align: 'right' },
  {title: 'Balance', dataIndex: 'balance', align: 'right',},
];


export default function BankLayout() {

    const [table_values, setTable] = useState([])

    const failureCallback = (error) => {
        console.error("Error: " + error);}
    
    useEffect( ()=>{     
    try {
      request.get('https://arete-server.herokuapp.com/api/banks', { getResponse: true }).then((data)=>{setTable(data.data)}).catch(failureCallback);
      
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
          <TabPane tab="Withdrawls" key="2">
              <Withdraw />
          </TabPane>
          <TabPane tab="Bank Accounts Summary" key="3">
            <Table columns={columns} dataSource={table_values} bordered title={() => 'Header'} footer={() => 'Footer'} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    );
}
