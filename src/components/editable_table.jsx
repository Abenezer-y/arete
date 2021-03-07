import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Card, Typography, Col, Row } from 'antd';
const {Title } = Typography;
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({title, editable, children, dataIndex, record, handleSave, ...restProps}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef('');
  const form = useContext(EditableContext);
  useEffect(() => { if (editing) { inputRef.current.focus(); } }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex], }); };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0, }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.`, },]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item> ) : (
      <div
        className="editable-cell-value-wrap"
        style={{paddingRight: 2, }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'Item', dataIndex: 'item', width: '30%', editable: true,},
      { title: 'Price', dataIndex: 'price', editable: true, },
      { title: 'Quantity', dataIndex: 'qty', editable: true, },
      { title: 'Tax Rate', dataIndex: 'tax_rate', },
      { title: '', dataIndex: 'operation', width: 80, render: (_, record) => this.state.dataSource.length >= 1 ? 
                                                                          (
                                                                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                                                              Delete
                                                                            </Popconfirm>
                                                                          ) : null,},];

    this.state = {dataSource: [{key: '0', item: 'item 0', price: 32, qty: 2, tax_rate: 0.15},
                               {key: '1', item: 'item 1', price: 31, qty: 4, tax_rate: 0.15},],
                  count: 2,};}

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({dataSource: dataSource.filter((item) => item.key !== key),});};

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = { key: count, item: `item ${count}`, price: '32', qty: `${count}`, tax_rate: 0.15 };
    this.setState({dataSource: [...dataSource, newData], count: count + 1, });};

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = { body: {row: EditableRow, cell: EditableCell,}, };
    const columns = this.columns.map((col) => {
      if (!col.editable) { return col;}
      return {...col, onCell: (record) => ({record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, 
                                            handleSave: this.handleSave,}), }; });
    return (
<>
      <Card title= {<Title level={4}>
        <Row align="middle" gutter={8}>
          <Col flex="auto">
            <Title level={4}>Items</Title>
          </Col>
            
          <Col flex='none'>
          <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, }}
      >
        Add a row
      </Button>
          </Col>
          </Row>
          </Title>}>

        <Table components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />

      </Card>
      </>
    );
  }
}


export default EditableTable;