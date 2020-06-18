import React, {Component} from 'react';
import './my_order.less'
import {yuan} from "../../../defaultSetting";

class MyOrder extends Component {
    state = {
        orders : [
            {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2832929002,3627227229&fm=26&gp=0.jpg',taocan:'入职体检套餐',  status:'待付款', yuan:20,time:'2020-05-29 08:00:00'},
            {img:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=170748258,1277076404&fm=26&gp=0.jpg', taocan:'关爱父母精细套餐(双人)', status:'已付款',yuan:50, time:'2019-05-28 08:00:00'}
        ]
    }


    render() {
        return (
            <div className='my_order'>
                {
                    this.state.orders.map((item, key) => (
                        <div key={key} className="mui-card" style={{margin: '0 0 10px 0', height: '100%'}}>
                            <div className="mui-card-content">
                                <div className="mui-card-content-inner">
                                    <div className="wrapper">
                                        <div className="left">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="center">
                                            <p>{item.taocan}</p>
                                            <p>{item.time}</p>
                                            <p className='yuan fz-16'>{yuan} {item.yuan} {item.status}</p>
                                        </div>
                                        <div className="right">
                                            <a className="mui-navigate-right"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default MyOrder;