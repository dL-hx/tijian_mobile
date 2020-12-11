import React, {Component} from 'react';
import {List, Toast} from 'antd-mobile';
import request from "../../utils/request";


const Item = List.Item;

/**
 * 套餐列表
 */
class TaocanList extends Component {
    state = {
        list: [
/*            {title: '关爱父母精细套餐(双人)' ,pathname:"/taocan/taocanInfo"},
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
            {title: '关爱父母套餐(双人)' ,pathname:"/taocan/taocanInfo"},*/
        ]
    }

    componentDidMount() {
        const data = {}
        if (this.props.location.state){
            data.comboType =  this.props.location.state.comboType
        }

        request(`/om/combo/search?pageSize=100&pageNum=1`, data, "POST").then((res) => {
            if (res.code == 200) {
                const list = res.data&&res.data.list.map(item=>{
                    const {comboName, ...rest} = item
                    return {
                        title:comboName,
                        pathname:'/taocan/taocanInfo',
                        ...rest
                    }
                })
                this.setState({
                    list: list
                });

            } else {
                Toast.fail(res.message)
            }
        })
    }

    render() {
        return (
            <div className='special'>
                <List>
                    {
                        this.state.list.map((item, key) => (
                            <Item key={key} arrow="horizontal" onClick={() => {
                                this.props.history.push({ pathname: item.pathname, state: { comboId:item.comboId } });
                            }}>{item.title}</Item>
                        ))
                    }
                </List>
            </div>
        );
    }
}

export default TaocanList;


