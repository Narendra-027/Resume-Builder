import React from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
//import './Sections/Navbar.css';
//import { HomeOutlined, LoginOutlined,UserOutlined} from '@ant-design/icons'
import { Layout } from 'antd';


function NavBar(props) {
  return (
    <Layout.Header style={{ backgroundColor: '#ffffff', display: 'flex', 
                          flexDirection: 'row', justifyContent: 'space-between',
                          boxShadow: '1px 1px 3px 2px rgba(0, 0, 0, 0.1)'}}>
      <LeftMenu mode = "horizontal"/>
      <RightMenu mode = "horizontal"/>
    </Layout.Header>
  )
}
export default NavBar