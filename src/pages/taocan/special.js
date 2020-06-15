import React, {Component} from 'react';
import {List} from 'antd-mobile';

const Item = List.Item;

class Special extends Component {
    state = {
        list: [
            {title: '关爱父母精细套餐(双人)' ,pathname:"/taocan/taocanInfo"},
            {title: '感恩父母肿瘤筛查升级套餐(男)',pathname:"/taocan/taocanInfo" },
            {title: '感恩父母肿瘤筛查升级套餐(女)' ,pathname:"/taocan/taocanInfo"},
            {title: '感恩父母肿瘤筛查升级套餐(双人)',pathname:"/taocan/taocanInfo" },
            {title: '关爱父母精细套餐(男)',pathname:"/taocan/taocanInfo" },
            {title: '关爱父母精细套餐(女)' ,pathname:"/taocan/taocanInfo"},
            {title: '关爱父母深度套餐(男)',pathname:"/taocan/taocanInfo" },
            {title: '关爱父母深度套餐(女)' ,pathname:"/taocan/taocanInfo"},
            {title: '关爱父母深度套餐(双人)' ,pathname:"/taocan/taocanInfo"},
            {title: '关爱父母套餐(男)' ,pathname:"/taocan/taocanInfo"},
            {title: '关爱父母套餐(女)' ,pathname:"/taocan/taocanInfo"},
            {title: '关爱父母套餐(双人)' ,pathname:"/taocan/taocanInfo"},
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


