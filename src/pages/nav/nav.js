import React, {Component} from 'react';
import {List} from 'antd-mobile';

const Item = List.Item;

class Special extends Component {
    state = {
        list: [
            {title: '公司简介',pathname:"/about" },
            {title: '选择套餐' ,pathname:"/home"},
            {title: '套餐列表',pathname:"/taocan/special" },
            {title: '在线预约',pathname:"/order" },
        ]
    }


    render() {
        return (
            <div>
                <List>
                    {
                        this.state.list.map((item, key) => (
                            <Item key={key} arrow="horizontal" onClick={() => {
                                this.props.history.push({ pathname: item.pathname, state: { item:{} } });
                            }}>{item.title}</Item>
                        ))
                    }
                </List>
            </div>
        );
    }
}

export default Special;


