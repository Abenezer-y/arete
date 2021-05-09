import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, PieChartOutlined, } from '@ant-design/icons';

import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import DashBoard from './dashboard/dashboard';
import Summary from './dashBoard/summary';
import TaskSummary from './activity/task_summary';

import Bank_App from './finance/bank/bank';
import Income_App from './finance/income/income';
import Expense_App from './finance/expense/expense';
import Withdrawal_App from './finance/withdrawal/withdrawal';
import Cash_App from './finance/cash/cash';
import Cash_Detail from './finance/cash/cash_detail';
import Vendor_App from './finance/vendor/vendor';
import Receipt_App from './finance/receipt/receipt';
import Withholding_App from './finance/withholding/withholding';


import TaskDetail from './activity/task_update/task_detail';

const {Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;
// 
class AppFrame extends React.Component {
  state = {
    collapsed: false,};


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };



  render() {
    const { collapsed } = this.state;
    return (
      <Router> 
      <Layout>
        <Header></Header>

      <Layout style={{ minHeight: '100vh' }}>
        
  
   
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['summary']} mode="inline">

            <SubMenu key="dashboard" icon={<DashboardOutlined />} title="DashBoard">
              <Menu.Item key="summary"> 
                Summary <Link to="/summary"></Link> 
              </Menu.Item>  
              <Menu.Item key="analysis">
                Analysis <Link to="/analysis"></Link> 
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="tasks" icon={<DashboardOutlined />}> 
              Activity Manager <Link to="/tasks"></Link> 
            </Menu.Item>

            <SubMenu key="finance" icon={<PieChartOutlined />} title="Financial Manager">
              <Menu.Item key="bank"> 
                Banks <Link to="/bank"></Link> 
              </Menu.Item>
              <Menu.Item key="income"> 
                Incomes <Link to="/income"></Link> 
              </Menu.Item>
              <Menu.Item key="withdrawal">  
                Withdrawals <Link to="/withdrawal"></Link> 
              </Menu.Item>
              <Menu.Item key="cash">  
                Cash<Link to="/cash"></Link> 
              </Menu.Item>
              <Menu.Item key="expense">  
                Expenses<Link to="/expense"></Link> 
              </Menu.Item>
              <Menu.Item key="vendor"> 
                Vendors <Link to="/vendor"></Link> 
              </Menu.Item>
              <Menu.Item key="receipt">  
                Receipts <Link to="/receipt"></Link> 
              </Menu.Item>
              <Menu.Item key="withholding">
                Withholdings <Link to="/withholding"></Link> 
              </Menu.Item>
              <Menu.Item key="report">  
                Reports <Link to="/report"></Link> 
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout className="site-layout"  >
        
          <Content >
            
            <Switch>
                <Route exact path="/" component={Summary}></Route>
                <Route exact path="/summary" component={Summary}></Route>
                <Route exact path="/analysis"></Route>
                <Route exact path="/tasks" component={TaskSummary}></Route>
                <Route exact path="/bank" component={Bank_App}></Route>
                <Route exact path="/income" component={Income_App}></Route>
                <Route exact path="/withdrawal" component={Withdrawal_App}></Route>
                <Route exact path="/cash" component={Cash_App}></Route>
                <Route exact path="/expense" component={Expense_App}></Route>
                <Route exact path="/vendor" component={Vendor_App}></Route>
                <Route exact path="/receipt" component={Receipt_App}></Route>
                <Route exact path="/withholding" component={Withholding_App}></Route>
                <Route exact path="/report" component={Expense_App}></Route>
                <Route exact path="/detail/:taskkey" component={TaskDetail}></Route>
                <Route exact path="/cash_detail/:cashkey" component={Cash_Detail}></Route>
                
            </Switch>
           
          </Content>

          <Footer style={{ textAlign: 'center', background: '#2A4058', height: 45 }}>Arete Management Tool 2021</Footer>
        </Layout>

             
        </Layout>
        
        </Layout>
      </Router>

    );
}
}

export default AppFrame;