import React from 'react';
import { Form, Layout, Button, Tabs, Card } from 'antd';
import Expense from './expense/expense_registration';


const { TabPane } = Tabs;
const formRef = React.createRef();
const formItemLayout = { labelCol: { span: 5 }, labelAlign: "right", wrapperCol: { span: 30, }, };

const RgistrationForm = () => (
    
    <Form {...formItemLayout} ref={formRef} name="avtivity_form" >
    <br></br>
    <Card title=" Task Detail">

      </Card>
       <br />
        
    <br></br>
    <Form.Item>
      <Button type="primary" htmlType="submit"> Submit </Button>
    </Form.Item>
  </Form>
  );

const {Content, Header } = Layout;



export default function ExpenseLayout() {

    return (

    <Layout style={{ minHeight: '100vh' }}>
      <Header>expense entry</Header>
      <Content style={{ margin: '0 16px' }}>
        
        <Tabs defaultActiveKey="2">
          <TabPane tab="Summary"  key="1"> <RgistrationForm /> </TabPane>
          <TabPane tab="Expense Registration" key="2"> <Expense /> </TabPane>
          <TabPane tab="Expense planning" key="3"> Tab 3 </TabPane>
        </Tabs>
       
      </Content>
    </Layout>

    );
}

