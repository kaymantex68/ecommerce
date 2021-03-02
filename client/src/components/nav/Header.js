import React, { useState } from "react";
import { Menu } from "antd";
import {
    UserOutlined,
    UserAddOutlined,
    EyeOutlined,
    SettingOutlined,
    LogoutOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import Search from '../forms/Search'


const { SubMenu, Item } = Menu; //Menu.SubMenu

const Header = () => {
    const [current, setCurrent] = useState("home");
    const dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }))
    const history = useHistory()
    const handleClick = (e) => {
        // console.log(e.key)
        setCurrent(e.key)
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push('/login')
    };
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<EyeOutlined />}>
                <Link to="/">Home </Link>
            </Item>

            <Item key="shoop" icon={<ShoppingCartOutlined />} >
                    <Link to="/shop">Shop</Link>
                </Item>

            {!user &&
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>}

            {!user &&
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>}

            {user &&
                <SubMenu icon={<SettingOutlined />} className="float-right" title={user.email && user.email.split('@')[0]}>
                    {user && user.role==="subscriber" && (
                        <Item>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}
                    
                    {user && user.role==="admin" && (
                        <Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}
                  
                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        logout
                    </Item>
                </SubMenu>}
                <span className="float-right p-1">
                <Search className="float-right"/>
                </span>
                
        </Menu>
    );
};

export default Header;
