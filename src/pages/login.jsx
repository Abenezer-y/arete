import { Form, Input, Button, Checkbox, Card, Layout, Col, Row } from 'antd';
// import 'D:\\Users\\EK05\\Documents\\HR Payroll Calculator Web App\\trail_02\\payroll_app\\src\\App.less';

const { Header, Content } = Layout;

const layout = {
  labelCol: { span: 8, },
  wrapperCol: { span: 16, },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16, },
};

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);};

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);};

  return (
    <Layout>

  <Header></Header>
    <Content> 
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
    <Card className="Login" title="Login" bordered={false} style={{ width: 500 }}>
    <Form {...layout} name="basic" initialValues={{ remember: true, }} onFinish={onFinish} 
                      onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Username"
        name="username"
        rules={[ { required: true,
                   message: 'Please input your username!', }, ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[ { required: true,
                   message: 'Please input your password!', }, ]} >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit"> Login </Button>
      </Form.Item>
      
    </Form>
    </Card>
    </Col>
      <Col span={8}></Col>
    </Row>
    </Content>



    </Layout>

  );
};

export default Login;
