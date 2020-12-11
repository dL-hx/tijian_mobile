import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Toast} from "antd-mobile";
// 导入connect
import {connect} from "react-redux";

// 导入 weixin-js-sdk
import wx from 'weixin-js-sdk'

import {yuan} from "../../../defaultSetting";
import "./confirmOrder.less";
import request from "../../../utils/request";
import utils from "../../../utils/utils";
import {payType, wxCng} from "../../../utils/constants";


// console.log("wx", wx);

class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.initWxConfig();
    }

    /**
     * 获取微信配置
     * 以下的参数后台提供
     * 这里切记，经常会报错，
     * 因为页面的url的问题，
     * 我这里是后台写死的，根据不同的环境配置不同url
     * */
    initWxConfig = () => {
        // 获取wx config配置参数
        request(`/wechat/pay/getSignature?clientUrl=` + window.location.href.split("#")[0] + "/", {}, "POST").then((res) => {
            if (res.code == 200) {

                const data = res.data;

                wx.config({
                    'debug': false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    'appId': data.appId, // 必填，公众号的唯一标识
                    'timestamp': data.timestamp, // 必填，生成签名的时间戳
                    'nonceStr': data.noncestr, // 必填，生成签名的随机串
                    'signature': data.signature, // 必填，签名，见附录1
                    'jsApiList': ['chooseWXPay'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });


                wx.ready(function () {
                    // alert("wx config ready");
                    //基础接口判断当前客户端版本是否支持指定JS接口
                });


                wx.error(function (res) {
                    // config 信息验证失败会执行error 函数
                    // 如签名过期导致验证失败
                    // 具体错误信息可用打开config 的debug 模式查看
                    // 也可以在返回的res 参数中查看, 对于SPA 可用在这里更新签名

                    console.log('wx error :', res)

                });
            } else {
                Toast.fail(res.message)
            }
        })
    };

    onPay = (e) => {
        e.preventDefault();
        // const inputText = this.refs.input.value

        const _this = this

        const customerId = utils.getUserInfo().customerId;
        const {orderId} = this.props.location.state || {}; // 获取 购物车 / 套餐详情[立即购买]时 传递来的订单 id

        console.log('orderid', orderId)
        request(
            `/wechat/pay/addOrder`,
            {customerId: customerId, orderId},
            "POST"
        ).then((res) => {
            if (res.code === 200) {
                const data = res.data;

                wx.chooseWXPay({
                    appId: data.appId,
                    // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    timestamp: data.timeStamp,
                    // 支付签名随机串，不长于 32 位
                    nonceStr: data.nonceStr,
                    // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    package: `prepay_id=${data.prepay_id}`,
                    // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    signType: data.signType,
                    // 支付签名
                    paySign: data.paySign,
                    // 支付成功后的回调函数
                    success: function (res) {
                        // res.errMsg === 'chooseWXPay:ok'方式判断前端返回,微信团队郑重提示：
                        // res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠， 切记。
                        //   alert('res===', res)

                        if (res.errMsg === "chooseWXPay:ok") {

                            const details = _this.props.location.state || {};

                            if (details.payType === payType.shopcart){// 如果购买的类型是 "从购物车购买成功", 清空购物车
                                // 发送action, 清空购物车
                                _this.props.delAllGoodsAction()
                            }


                            // 跳转订单详情页面
                            _this.props.history.push({
                                pathname: "/my/my_order_detail",
                                state: {orderId},
                            });
                        }
                    },
                    // 支付取消回调函数
                    cancel: function (res) {
                        console.log("用户取消支付~");
                    },
                    // 支付失败回调函数
                    fail: function (res) {
                        console.log("支付fail~");
                    },
                });


            } else {
                Toast.fail(res.message);
            }
        });


        /*  const customerId = utils.getUserInfo().customerId + ""

            const {orderId} = this.props.location.state || {}// 获取 购物车 / 套餐详情[立即购买]时 传递来的订单 id
            console.log('details', orderId)
            request(`/order/confirm?customerId=${customerId}&orderId=${orderId}`, {}, "POST").then((res) => {
                if (res.code === 200) {
                    // Toast.success(res.message)

                    // 跳转订单详情页面
                    this.props.history.push({pathname: '/my/my_order_detail', state: {orderId}});

                } else {
                    Toast.fail(res.message)
                }
            })
     */
    };

    render() {
        const {customerName, mobile} = utils.getUserInfo();

        const details = this.props.location.state || {};

        console.log(new Date());

        console.log("details", details);
        /*  // 选中项的列表
            console.log('checkGoodsList', this.props.checkGoodsList)
            // 提交时的id 列表
            console.log('submitList', this.props.submitList)*/

        const {checkGoodsList, submitList, price, allNum} = this.props;

        let detailsAllPrice = utils.getGoodsPrice(details); // payType.pay 时 的商品总价

        return (
            <div className="relative confirm-order">
                <div className="top">
                  <span style={{paddingRight: 10, fontWeight: "bold"}}>
                    {customerName}
                  </span>
                    <span>{mobile}</span>
                </div>

                <div style={{paddingBottom: "52px"}}>
                    <div className="container">
                        <div className="mui-card" style={{margin: 0, height: "100%"}}>
                            <div className="mui-card-header">确认订单</div>
                            <div className="mui-card-content">
                                {details.payType === payType.shopcart ? (
                                    checkGoodsList.map((item, key) => (
                                        <div className="mui-card-content-inner" key={key}>
                                            <div className="wrapper">
                                                <div className="left">
                                                    <img src={item.goodsSrc} alt=""/>
                                                </div>
                                                <div className="center">
                                                    <p>{item.goodsTitle}</p>
                                                </div>
                                                <div className="right">
                                                    <p className="yuan">
                                                        {yuan} {item.goodsPrice}
                                                    </p>
                                                    <p className="yuan">x{item.goodsNum}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="mui-card-content-inner">
                                        <div className="wrapper">
                                            <div className="left">
                                                <img src={details.comboImg} alt=""/>
                                            </div>
                                            <div className="center">
                                                <p>{details.comboName}</p>
                                            </div>
                                            <div className="right">
                                                <p className="yuan">
                                                    {yuan} {detailsAllPrice}
                                                </p>
                                                <p className="yuan">x{1}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/*订单备注区域*/}
                            {/*                        <div className="mui-card-footer">
                            <div className="mui-input-row">
                                <label style={{padding: '14px 0px'}} onClick={() => {
                                    this.refs.input.focus()
                                }}>订单备注:</label>
                                <input type="text" placeholder="选填, 请先和客服协商一致" ref='input'/>
                            </div>
                        </div>
*/}

                            <div
                                className="mui-card-footer"
                                style={{justifyContent: "flex-end", color: "#000"}}
                            >
                            <span style={{paddingRight: 20}}>
                              共{details.payType === payType.shopcart ? allNum : 1}件商品
                              小计:
                            </span>
                                <span className="yuan">
                                     {yuan}
                                     {details.payType === payType.shopcart
                                        ? price
                                        : detailsAllPrice}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="mui-card-footer"
                        style={{background: "#fff", margin: "10px 0"}}
                    >
                        <span>运费</span>
                        <span className="yuan fz-16">免运费</span>
                    </div>

                    <div style={{background: "#fff", margin: "10px 0"}}>
                        <div className="mui-input-row mui-radio radio-view">
                            <label>
                                <img src={require("../../../images/wx.png")} alt=""/>
                                微信支付
                            </label>

                            <input name="radio" type="radio" defaultChecked/>
                        </div>
                    </div>
                </div>

                <div className="fixed-bottom">
                    <div
                        style={{
                            width: "60%",
                            float: "left",
                            padding: "0 10px",
                        }}
                    >
                        <div className="sub">
                            <span style={{paddingRight: 20}}>总计:</span>
                            <span className="yuan">
                            {yuan}{details.payType === payType.shopcart
                                ? price
                                : detailsAllPrice}
                        </span>
                        </div>
                    </div>

                    <Button
                        style={{width: "40%", borderRadius: 0, backgroundColor: '#099', color:'#fff'}}
                        onClick={this.onPay}
                    >
                        确认
                    </Button>
                </div>
            </div>
        );
    }
}

// 组件C 为接收方所以要实现 connect 的 第一个参数

// mapStateToProps返回的结果必须是一个纯对象，这个对象会与组件的 props 合并
// 接收数据
function mapStateToProps(state) {
    // 1. 获取购物车选中的套餐项列表
    let checkGoodsList = state.goods.list.filter((item) => item.check);

    // 2. 提取 套餐id 和 套餐数量 列表
    let submitList = checkGoodsList.map((item, index) => {
        let obj = {
            goodsId: item.goodsId,
            goodsNum: item.goodsNum,
        };
        return obj;
    });

    // 3. 计算 选中套餐项列表的总价
    let price = state.goods.list.reduce((total, item) =>total + (item.check ? parseFloat(item.goodsPrice * item.goodsNum) : 0),0);

    // 4. 计算 选中套餐项列表 套餐数量
    let allNum = state.goods.list.reduce((total, item) => total + (item.check ? parseFloat(item.goodsNum) : 0),0);

    return {
        checkGoodsList: checkGoodsList,
        submitList: submitList,
        price: price,
        allNum: allNum,
    };
}



/**
 * 发送Action
 *
 * 这个函数有一个返回值, 返回值是一个对象
 * @param dispatch
 * @returns {{}}
 */
const mapDispatchToProps = (dispatch) => {

    return {
        delAllGoodsAction:()=>{
            // 利用 dispatch 发送一个action
            // 传递action 对象 我们要定义一个type 属性
            // data 中的值就是所带的参数
            dispatch({
                type:'delAllGoods',
                data:{ }
            })
        }


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
