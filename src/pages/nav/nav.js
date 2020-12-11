import React, {Component} from 'react';
import {List} from 'antd-mobile';

const Item = List.Item;

class Nav extends Component {
    state = {
        list: [
            {title: '公司简介', key: "/about"},
            {title: '登录页', key: '/login'},
            {title: '注册页', key: '/regist'},
            {title: '一键呼救',key: '/call_phone'},
            {title: '选择套餐', key: "/home"},
            {title: '套餐列表', key: "/taocan/taocanList"},
            {title: '在线预约', key: "/order"},
            {title: '营业时间', key: "/biz_hour"},
            {title: '体检须知', key: "/note"},
            {title: '分院地址', key: "/cmp_addr"},
            {title: '报告解读', key: '/report_explain'},
            {title: '我的报告', key: '/my/my_report'},
            {title: '我的预约', key: '/my/my_appoint'},
            {title: '我的订单', key: '/my/my_order'},
            {title: '我的信息', key: '/my/my_info'},
        ]
    }


    render() {
        return (
            <div>
                <List>
                    {
                        this.state.list.map((item, key) => (
                            <Item key={item.key} arrow="horizontal" onClick={() => {
                                this.props.history.push({pathname: item.key, state: {item: {}}});
                            }}>{item.title}</Item>
                        ))
                    }
                </List>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </div>
        );
    }
}

export default Nav;


