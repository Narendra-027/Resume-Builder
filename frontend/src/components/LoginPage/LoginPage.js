import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { Layout } from 'antd';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const onFinish = (values) => {
    const { username, password } = values;
  
    // Dispatch your login action here, passing the username and password
    dispatch(loginUser({ email: username, password }))
      .then((response) => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem('userId', response.payload.userId);
          if (rememberMe === true) {
            window.localStorage.setItem('rememberMe', username);
          } else {
            localStorage.removeItem('rememberMe');
          }
          props.history.push("/");
        } else {
          setFormErrorMessage('Check your Account or Password again');
        }
      })
      .catch((err) => {
        setFormErrorMessage('Check your Account or Password again');
        setTimeout(() => {
          setFormErrorMessage('');
        }, 3000);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
  <div style={{ width: '50%', margin: '3rem auto', alignItems:'baseline' }}>
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox onChange={handleRememberMe}>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
    <div>
      <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }}>
        Log in
    </Button>
    </div>
    Or <a href="/register">register now!</a>
    </Form.Item>
  </Form>
  </div>
  );
};

export default withRouter(LoginPage);


