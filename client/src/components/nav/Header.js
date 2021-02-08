import React, { useState } from "react";
import { Menu } from "antd";
import {
    UserOutlined,
    UserAddOutlined,
    EyeOutlined,
    SettingOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'

const { SubMenu, Item } = Menu; //Menu.SubMenu

const Header = () => {
    const [current, setCurrent] = useState("home");
    const dispatch = useDispatch();
    const history = useHistory()
    const handleClick = (e) => {
        // console.log(e.key)
        setCurrent(e.key);
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
                <Link to="/">Home</Link>
            </Item>

            <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>

            <SubMenu icon={<SettingOutlined />} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined />} onClick={logout}>
                    logout
        </Item>
            </SubMenu>
        </Menu>
    );
};

export default Header;
