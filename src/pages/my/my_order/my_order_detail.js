import React, {Component} from 'react';
import './my_order_detail.less'
import {Button, Toast} from 'antd-mobile';
import {Link} from "react-router-dom";
import utils from "../../../utils/utils";
import {yuan} from "../../../defaultSetting";
import request from "../../../utils/request";

class MyOrderDetail extends Component {
    state = {
        lists:[]
    }

    componentDidMount() {
        // 获取订单Id, 通过订单id 获取订单详情
        const {orderId} = this.props.location.state||''
        request(`/orderDetail/getDetailList/${orderId}`, {}, "POST").then((res) => {
            if (res.code == 200) {
                this.setState({
                    lists: res.data
                });
            } else {
                Toast.fail(res.message)
            }
        })
    }


    render() {
        const {lists} = this.state || []
        console.log('==', lists)
        /*        const useStatus = (
                    function (val){
                        const config = {
                            0:'未使用',
                            1:'已使用',
                            2:'使用完毕(次数耗尽)',
                            3:'不可使用',
                        }

                        return config[val]
                    }
                )(details.useStatus)*/
        return (
            <div className='my_report'>

                {
                    lists.map((item, key) => <div key={key} className="mui-card" style={{ margin:0 }} onClick={
                        ()=>{
                            if(item.useCount===0){
                                Toast.fail('该订单已经预约, 不可重复预约');
                            }else {
                                this.props.history.push({
                                    pathname:'/order',
                                    state:{my_order_detail:item||{}},
                                });
                            }
                        }
                    }>
                        <div className="mui-card-header">订单号:{item.orderId}</div>
                        <div className="mui-card-content">
                            <div className="mui-card-content-inner">
                                <div className="wrapper">
                                    <div className="center">
                                        <p>预约码: {item.code}</p>
                                        <p>套餐名称:{item.comboName}</p>
                                        <p>购买数量:{item.num} </p>
                                        <p>可用次数: {item.useCount}</p>
                                        <p>原始单价: <span style={{color:'#009999'}}>{yuan}{item.price}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mui-card-footer last" style={{display:`${item.useCount==0?'none':''}`}}>
                            <Link to={{
                                pathname:'/order',
                                state:{my_order_detail:item||{}},
                                }}>

                                <div className="ceshitc">
                                    去预约
                                </div>
                            </Link>
                        </div>

                    </div>)
                }

                 {/*<div className="fixed-bottom">
                                     <Link to={code?'/taocan/shopcart':'/login'} >
                        <Button type="primary" style={{
                            width: '50%',
                            backgroundColor: '#000',
                            float: 'left',
                            borderRadius: 0
                        }}>取消预约</Button>
                    </Link>

                    <Link to={{
                        pathname:code?'/taocan/confirm_order':'/login',
                        state:{
                            ...details
                        }
                    }} >
                        <Button type='primary' style={{width: '50%', borderRadius: 0}}>立即预约</Button>
                    </Link>
                </div>*/}
            </div>
        );
    }
}

export default MyOrderDetail;


