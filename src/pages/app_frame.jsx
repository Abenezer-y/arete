import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, PieChartOutlined, } from '@ant-design/icons';

import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

// import DashBoard from './dashboard/dashboard';
import Summary from './dashBoard/summary';
import TaskSummary from './activity/task_summary';
import ExpenseLayout from './finance/expense';
import IncomeLayout from './finance/income';
import BankLayout from './finance/bank';
import TaskDetail from './activity/task_update/task_detail';

const {Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


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
      <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['summary']} mode="inline">
            <SubMenu key="dashboard" icon={<DashboardOutlined />} title="DashBoard">
                <Menu.Item key="summary"> Summary 
                <Link to="/summary"></Link> </Menu.Item>  
                <Menu.Item key="analysis">  Analysis
                <Link to="/analysis"></Link> </Menu.Item>
            </SubMenu>
            <Menu.Item key="tasks" icon={<DashboardOutlined />}> Activity Manager
               <Link to="/tasks"></Link> </Menu.Item>
            <SubMenu key="finance" icon={<PieChartOutlined />} title="Financial Manager">
              <Menu.Item key="bank"> Bank
               <Link to="/bank"></Link> </Menu.Item>
              <Menu.Item key="income"> Income
               <Link to="/income"></Link> </Menu.Item>
              <Menu.Item key="expense">  Expense
                <Link to="/expense"></Link> </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout className="site-layout">

          <Content style={{ margin: '0 16px' }}>
            
            <Switch>
                <Route exact path="/" component={Summary}></Route>
                <Route exact path="/summary" component={Summary}></Route>
                <Route exact path="/analysis"></Route>
                <Route exact path="/tasks" component={TaskSummary}></Route>
                <Route exact path="/bank" component={BankLayout}></Route>
                <Route exact path="/income" component={IncomeLayout}></Route>
                <Route exact path="/expense" component={ExpenseLayout}></Route>
                <Route exact path="/detail/:taskkey" component={TaskDetail}></Route>
            </Switch>
           
          </Content>

          <Footer style={{ textAlign: 'center' }}>Arete Management Tool 2021</Footer>
        </Layout>

      </Layout>
      </Router>
    );
}
}

export default AppFrame;