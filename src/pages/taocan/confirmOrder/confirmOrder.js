import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "antd-mobile";
import {yuan} from "../../../defaultSetting";
import './confirmOrder.less'

class ConfirmOrder extends Component {

    handleClick=()=>{
        const inputText = this.refs.input.value

        console.log(inputText)
    }

    render() {
        return (
            <div className='relative confirm-order'>
                <div className="top">
                    <span style={{paddingRight: 10, fontWeight: 'bold'}}>杨女士</span>
                    <span>15888888888</span>
                </div>

                <div className='container'>
                    <div className="mui-card" style={{margin: 0, height: '100%'}}>
                        <div className="mui-card-header">老年套餐</div>
                        <div className="mui-card-content">
                            <div className="mui-card-content-inner">
                                    <div className="wrapper">
                                        <div className="left">
                                            <img src={require('../../../images/8.jpg')} alt=""/>
                                        </div>
                                        <div className="center">
                                            <p>和美佑家大健康（Health 100）体检卡 白领关爱父母精细套餐</p>
                                        </div>
                                        <div className="right">
                                            <p className='yuan'>{yuan} 79</p>
                                            <p className='yuan' >x{1}</p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="mui-card-footer">
                            <div className="mui-input-row">
                                <label style={{padding: '14px 0px'}} onClick={()=>{this.refs.input.focus()}}>订单备注:</label>
                                <input type="text" placeholder="选填, 请先和客服协商一致" ref='input'/>
                            </div>
                        </div>
                        <div className="mui-card-footer" style={{justifyContent: 'flex-end', color: '#000'}}>
                            <span style={{paddingRight: 20}}>共{1}件商品 小计:</span>
                            <span className='yuan'>{yuan} {0}</span>
                        </div>
                    </div>
                </div>

                <div className="mui-card-footer" style={{ background: '#fff', margin:'10px 0'}}>
                    <span>运费</span>
                    <span className='yuan fz-16'>免运费</span>
                </div>


                <div className="fixed-bottom">
                    <div style={{
                        width: '60%',
                        float: 'left',
                        padding: '0 10px'
                    }}>
                        <div className='sub'>
                            <span style={{paddingRight: 20}}>总计:</span>
                            <span className='yuan'>{yuan} {0}</span>
                        </div>
                    </div>

                    <Link to='/taocan/confirm_order'>
                        <Button type="primary" type='warning' style={{width: '40%', borderRadius: 0}} onClick={this.handleClick}>确认</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ConfirmOrder;