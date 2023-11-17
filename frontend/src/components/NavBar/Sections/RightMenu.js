/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import {LoginOutlined, UserOutlined,FilePdfOutlined} from '@ant-design/icons'

function RightMenu(props) {

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const user = useSelector(state => state.user);
  console.log("UserData:",user);
  console.log("Props:",props);
  const menuItems1 = [
    {
      key: 'login',
      title: 'display',
      label: (
        <a href="/login" >
          Login
        </a>
      ),
      icon: <LoginOutlined />,
      style: {
        float: 'right'
      }
    },
    {
      key: 'register',
      title: 'display',
      label: (
        <a href="/register">
          Sign Up
        </a>
      ),
      icon: <UserOutlined />,
      style: {
        float: 'right'
      }
    }
  ];

  const menuItems2 = [
    {
      key: 'myResume',
      title: 'myResume',
      label: (
        <a href = "/myresume">My Resumes</a>
      ),
      icon: <FilePdfOutlined />,
      style: {
        float: 'right'
      }
    },
    {
      key: 'logout',
      title: 'display',
      label: (
        <a onClick={logoutHandler}>Logout</a>
      ),
      icon: <LoginOutlined />,
      style: {
        float: 'right'
      }
    }
  ]

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode = {props.mode} items={menuItems1} style={{backgroundColor: '#ffffff'}}/>
    )
  } else {
      return (
        <Menu mode = {props.mode} items={menuItems2} style={{backgroundColor: '#ffffff', width:"250px"}}/>
      )
  }
}
export default withRouter(RightMenu);

