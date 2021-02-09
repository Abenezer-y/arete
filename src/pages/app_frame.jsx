import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, PieChartOutlined, } from '@ant-design/icons';

import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

// import DashBoard from './dashboard/dashboard';

import NewTask from './activity/new_task';




const {Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;





const AppFrame = () => {

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = collapsed => { console.log(collapsed); setCollapsed({ collapsed });};

    return (
      <Router> 
      <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['summary']} mode="inline">
            <SubMenu key="dashboard" icon={<DashboardOutlined />} title="DashBoard">
                <Menu.Item key="summary">
                    Summary
                    <Link to="/summary"></Link>
                </Menu.Item>  
                <Menu.Item key="analysis">
                    Analysis
                    <Link to="/analysis"></Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="activity" icon={<PieChartOutlined />} title="Activity Manager">
              <Menu.Item key="new_task">
                Create Task
                <Link to="/new_task"></Link>
              </Menu.Item>
              <Menu.Item key="update_task">
                Update Progress
                <Link to="/update_task"></Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout className="site-layout">

          <Content style={{ margin: '0 16px' }}>
            <Switch>
                <Route exact path="/" component={NewTask}></Route>
                <Route exact path="/summary" component={NewTask}></Route>
                <Route exact path="/analysis" component={NewTask}></Route>
                <Route exact path="/new_task" component={NewTask}></Route>
                <Route exact path="/update_task" component={NewTask}></Route>
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Arete Management Tool 2021</Footer>
        </Layout>

      </Layout>
      </Router>
    );
}


export default AppFrame;