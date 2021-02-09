// task_requirements
// TaskRequirements

import React from 'react';
import { Form, Input, Button, Space, Col, Row, Upload, Card} from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';


class UploadComponent extends React.Component {
  state = {
    fileList: [],
    uploading: false, };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {formData.append('files[]', file);});

    this.setState({ uploading: true, });

    // request('http://localhost:4000/picture', { method: 'post', data: formData });
    // You can use any AJAX library you like
    // reqwest({

    //   url: 'http://localhost:4000/picture',
    //   method: 'post',
    //   processData: false,
    //   data: formData,

    //   success: () => {this.setState({fileList: [], uploading: false,});
    //                   message.success('upload successfully.');},
    //   error: () => {this.setState({uploading: false,});
    //                 message.error('upload failed.');}, }); 
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => { this.setState(state => {
                          const index = state.fileList.indexOf(file);
                          const newFileList = state.fileList.slice();
                          newFileList.splice(index, 1);
          return { fileList: newFileList, };}); },

      beforeUpload: file => { this.setState(state => ({fileList: [...state.fileList, file], })); return false;},

      fileList,};

    return (
      <>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>

        <Button type="primary" onClick={this.handleUpload} disabled={fileList.length === 0} loading={uploading} style={{ marginTop: 16 }}>
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </>
    );
  }
}








export default function TaskRequirements(props){

  // const onUpload = async () => {
  //   console.log(values);
  //   console.log(values['requirements']['upload'][0]);
  //    const formData = new FormData()
  //    formData.append("files", values['requirements']['upload'][0])
     
  //    const res = await fetch("http://localhost:4000/picture", {
  //      method: "POST",
  //      body: formData
  //    }).then(res => res.json())
  //    alert(JSON.stringify(res))
  //  }

  return (
    <>
      <Card title="Requirements to complet task">
      <Form.List name="requirements">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} >
                  
                <Form.Item {...field} label={[field.key," Reqirements Description"]} name={[field.name, 'requirement']} 
                            fieldKey={[field.fieldKey, 'requirement']}  
                            rules={[{ required: true, message: 'Missing Item Break Down' }]}>
                    <Input style={{ width: 600 }} />
                 
                </Form.Item>
                <Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Form.Item>
                
                <Form.Item>
                <UploadComponent />
                </Form.Item>
                

              </Space>
            ))}
            <Row gutter={[16, 16]}>
                <Col span={12}> 
                    <Button onClick={() => add()}  icon={<PlusOutlined />}>
                        Add Requirements
                    </Button>
                </Col>
            </Row>
          </>
        )}
      </Form.List>
      </Card>
      </>
  );
};

// export default TaskRequirements;
