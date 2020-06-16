import React, {Component} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import './App.less';
import { withRouter } from 'react-router';
import defaultSetting from './defaultSetting'
import MenuConfig from "./config/menuConfig";

class App extends Component {

    // 处理页面刷新的修改面包屑的代码
    handleMenUpdate = (data) => {
        let currentKey = this.props.location.pathname
        let obj = []; //创建数组,将需要的数据放入其中,代码无形中使用了工厂模式👍,将需要值进行了处理
        data.forEach(item => {
            if (item.children) {// 如果有children属性,将其展开放入数组中
                obj.push(...item.children);
            } else {
                obj.push(item);
            }
        });
        const menuName = obj;

        let config ={}
        for (let i = 0; i < menuName.length; i++) {
            const item = menuName[i]
            if (currentKey === item.key) {
                config.title = item.title
                config.hidePadding = item.hidePadding
            }
        }

        return {
            title:config.title,
            hidePadding:config.hidePadding,
        }
    };

    render() {
        const flag = this.props.location.pathname === "/home" ? false : true;

        const config = this.handleMenUpdate(MenuConfig)
        const hidePadding = false||config.hidePadding // default don't hidePadding

        return (
            <div className="container">
                <NavBar mode="light"
                        icon={flag && <Icon type="left"/>}
                        onLeftClick={() => this.props.history.goBack()}
                    // rightContent={<b onClick={() => this.setState({ open: true })}>...</b>}
                >
                    {defaultSetting.title}
                </NavBar>

                <div className='main' style={{padding:`${hidePadding?0:20}`}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
