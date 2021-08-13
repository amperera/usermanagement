import { Form, Input, Button, Checkbox } from 'antd';
import {useDispatch} from 'react-redux';
import { submitRegisterDetails } from './redux/registerAction';

const Index = () => {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(submitRegisterDetails(values));
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your First name!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your Last name!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
};

export default Index; 