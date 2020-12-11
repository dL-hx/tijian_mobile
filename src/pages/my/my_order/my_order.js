import React, {Component} from 'react';
import './my_order.less'
import {yuan} from "../../../defaultSetting";
import utils from "../../../utils/utils";
import request from "../../../utils/request";
import {Toast} from "antd-mobile";
import {Link} from "react-router-dom";


const fail = Toast.fail
const success = Toast.success


class MyOrder extends Component {
    state = {
        orders: [
            /* {
                 img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2832929002,3627227229&fm=26&gp=0.jpg',
                 comboName: '入职体检套餐',
                 payStatus: '待付款',
                 price: 20,
                 payTime: '2020-05-29 08:00:00'
             },
             {
                 img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=170748258,1277076404&fm=26&gp=0.jpg',
                 comboName: '关爱父母精细套餐(双人)',
                 payStatus: '已付款',
                 price: 50,
                 payTime: '2019-05-28 08:00:00'
             }*/
        ]
    }

    componentDidMount() {
        const customerId = utils.getUserInfo().customerId

        request(`/order/search?pageSize=100&pageNum=1&customerId=${customerId}`, {}, "POST").then((res) => {
            console.log('res', res)

            if (res.code == 200) {
                // 计算 套餐列表中已支付的订单
                const orders = res.data && res.data.list.filter(item => utils.checkIsPayed(item.payStatus)) || []

                this.setState({
                    orders: orders
                });
            } else {
                fail(res.message)
            }
        })
    }

    render() {
        return (
            <div className='my_report'>
                {
                    this.state.orders.length > 0 ? this.state.orders.map((item, key) => (
                        <Link key={key}
                              to={{
                                  pathname: '/my/my_order_detail',
                                  state: {orderId: item.orderId}
                              }}>
                            {/*<img style={{ width:'76px', marginRight:'12px'}} src={require('./1.jpg')}/>*/}
                            <div className="mui-card">
                                <div className="mui-card-header" style={{color: '#000000'}}>订单号: {item.orderId}</div>
                                <div className="mui-card-content">
                                    <div className="mui-card-content-inner">
                                        <div className="wrapper">
                                            <div className="center">
                                                <p>
                                                    {
                                                        item.detailList.map((value, idx) => (
                                                            <span key={idx}>{value.comboName}</span>))
                                                    }<br/>
                                                    支付时间: {utils.dateFormat(item.payTime)}<br/>
                                                    <span className='price'
                                                          style={{color: '#009999'}}>现价:{yuan}{item.actualAmount}</span>
                                                    <span style={{paddingLeft: '10px'}}>原价:<span className='em'
                                                                                                 style={{textDecoration: 'line-through'}}>{yuan}{item.originalAmount}</span></span>

                                                </p>
                                                {/*<img className='jt' src={require('./jt.png')}/>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mui-card-footer last">
                                    <span style={{color: '#009999'}}>{item.payStatus == 0 ? '待支付' : '已支付'}</span>
                                </div>

                                {/* <div className='my_order'>
                {
                    this.state.orders&&this.state.orders.map((item, key) => (
                        <div key={key} className="mui-card" style={{margin: '0 0 10px 0', height: '100%'}}>
                            <Link to={{
                                pathname:'/my/my_order_detail',
                                state:{lists: item.detailList}
                            }}>

                            <div className="mui-card-content">
                                <div className="mui-card-content-inner">
                                    <div className="wrapper">
                                       <div className="left">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="center">
                                            <p>订单号: {item.orderId}</p>
                                            <p>支付时间: {item.payTime}</p>
                                            <p className='fz-16'>实收: <span className='yuan'>{yuan}{item.actualAmount} {item.payStatus==0?'未支付':'已支付'}</span>  </p>
                                            <p className='fz-16'>应收: <span className='yuan'>{yuan}{item.originalAmount} </span>  </p>
                                        </div>
                                        <div className="right">
                                            <a className="mui-navigate-right"></a>
                                        </div>
                                    </div>
 */}
                            </div>
                        </Link>

                    )) : <div className='no_list'>暂无订单记录</div>
                }
            </div>
        );
    }
}

export default MyOrder;