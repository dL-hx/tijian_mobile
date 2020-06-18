import React, {Component} from 'react';
import styles from './style/common.css'
import LogoTitle from "./components/LogoTitle";
import {withRouter} from "react-router";

import MenuConfig from './config/menuConfig'
import {Link} from "react-router-dom";

class Common extends Component {

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
                config.hideIcon = item.hideIcon
                config.top=item.top
            }
        }

        return {
            title:config.title,
            hideIcon:config.hideIcon,
            top:config.top,
        }
    };


    render() {
        const config = this.handleMenUpdate(MenuConfig)
        const hideIcon = false||config.hideIcon // default don't hideIcon
        const top = config.top || '24px'// default top 24px

        return (
            <div className={styles.common} >
                {
                    hideIcon?"":<Link to='/home' style={{color:'#000'}}>
                        <LogoTitle title={config.title}></LogoTitle>
                    </Link>
                }
                <div  style={{marginTop: `${top}`}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(Common);