import React, {Component} from 'react';
import styles from './taocanInfo.css'

import {Button, Toast} from 'antd-mobile';
import {Link} from "react-router-dom";
import utils from "../../utils/utils";
import defaultSetting from "../../defaultSetting";

// 导入connect
import { connect } from 'react-redux'
import request from "../../utils/request";
import {payType} from "../../utils/constants";

/**
 * 套餐详情
 */
class TaocanInfo extends Component {
    state = {
        active: false,
        info:{}, // 套餐详情.
        comboId:'' // 保存传递来的 套餐Id, 方便 以后调用
    }

    componentDidMount() {
        /**
         * 获取套餐Id, 查询套餐详情
         * */

        const comboId = this.props.location.state&& this.props.location.state.comboId || utils.getStorage("comboId") || ''


        console.log(comboId)


        request(`/om/combo/selectById/` + comboId, { }, "POST").then((res) => {
            if (res.code == 200) {
                // Toast.success(res.message)
                // 套餐详情
                const info = res.data
                // 设置默认图片
                info.comboImg = info.comboImg||require('../../images/default.jpg')

                console.log('info', info)
                this.setState({
                    info:info,
                    comboId:comboId
                })

            } else {
                Toast.fail(res.message)
            }
        })

    }

    // 立即支付
    onPay = () => {

        // 验证登录
        //  const isLogin = utils.getIsLogin() || ''
         const isLogin =  utils.getStorage('isLogin') || ''

        if (!isLogin){
             utils.setStorage('path', window.location.pathname)


             utils.setStorage('comboId', this.state.comboId)


             this.props.history.push('/login')
        
             return
        }


       // utils.setStorage('users' ,'{"customerIdStr":"98805586395137","customerId":98805586395137,"customerName":"张三","sex":"男","mobile":"18229019743","married":true,"openId":"odzcH017kKec4hCsLtF4RgSM3XuE","idNumber":"142702199610111213","address":"","age":null,"birthday":null,"job":"","createBy":98805586395137,"createTime":1593414975000,"updateBy":98805586395137,"updateTime":1593414975000,"remark":null}')

        const info = this.state.info


        const obj = {}
         
        obj.customerId = utils.getUserInfo().customerId+""

        obj.buyerMobile = utils.getUserInfo().mobile

        obj.orderDetailSaveRequestList = [
            {
                comboId:info.comboId,
                num:1
            }
        ]

        /**
         *  添加订单接口
         * */
        request(`/order/add`, {...obj}, "POST").then((res) => {
            if (res.code == 200) {
                // Toast.success(res.message)
                const orderId = res.data // 订单Id

                console.log('orderId', orderId)
                this.props.history.push({
                        pathname: '/taocan/confirm_order',
                        state: {
                            ...info,
                            orderId,
                            payType: payType.pay // 支付类型 'pay': 立即购买
                        }
                    }
                );
            }

            else {
                Toast.fail(res.message)
                if (res.code==101001){ // 客户信息不存在, 跳转登录页面

                    utils.setStorage('path', window.location.pathname)

                     utils.setStorage('comboId', this.state.comboId)

                    this.props.history.push({pathname: '/login' });

                }
            }
        })

    }


    // 加入购物车
    onAddShopCart = () => {
        // 验证登录
        // const isLogin = utils.getIsLogin() || ''
        const isLogin =  utils.getStorage('isLogin') || ''

        if (!isLogin){
            utils.setStorage('path', window.location.pathname)

             utils.setStorage('comboId', this.state.comboId)

            this.props.history.push('/login')
            return
        }

        console.log(new Date())

        const info = this.state.info



        // 发送action
        this.props.addGoodsAction(
            {
                goodsId: info.comboId,
                goodsSrc: info.comboImg,
                goodsTitle: info.comboName,
                // goodsSubtitle: '关爱父母精细套餐',
                goodsPrice: utils.getGoodsPrice(info),
                goodsNum: 1,
            })


        // 1.跳转购物车页面 /taocan/shopcart
        this.props.history.push({
                pathname: '/taocan/shopcart',
            }
        )



        // 2. 获取到  货物 信息 列表

        // 3. 点击提交订单 按钮,

        // 4. 调用  request(`/order/add` ) 接口

        // 5. 将获取到的 订单id  传递下去

    }






    render() {
        // const code = utils.getStorage('code') || ''
        const info = this.state.info

       console.log(info)
        return (
            <div className='relative'>
                <div className={styles.lunbo}>
                    <img src={info.comboImg} alt=""/>
                </div>
                <div className={styles.info}>
                    <div className={styles.price2}>
                        {/* <div className={styles.navtitle}>
                            <s1>折后价</s1>
                            {/*<span>05月30日00:00结束</span>
                        </div> */}

                        {/*折扣区样式*/}
                        <div className={styles.subtitle}>
                            {/*现价*/}
                            <h3>¥{utils.getGoodsPrice(info)}</h3>
                            {/*原价*/}
                            <h5>¥{info.comboPrice}</h5>
                            {/*打折: 折扣率:70 显示 7 */}
                            <h6>{info.comboDiscount/10}折</h6>
                        </div>
                        <a href={`tel:${defaultSetting.tel}`}>
                            <div>
                                <span className="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
                                <div style={{fontSize:'13px', marginTop:'-5px'}}>客服</div>
                            </div>
                        </a>
                    </div>
                    <div style={{padding:'12px 20px 20px 20px',fontSize:'15px'}}>
                        {info.comboName}
                    </div>

                </div>
                <div className='info'>
                    <div className='tt'>
                        <h4>套餐详情</h4>
                    </div>

                    <div style={{padding:'15px 20px'}}>
                        <img style={{width:'100%'}} src={require('../../images/1.jpg')} data-preview-src="" data-preview-group="1"/>
                        <div className="title1 tt" style={{ color:'#303030', borderTop:'0'}}>购买及预约流程</div>
                        <div className='liucheng'>
                            <div className='item1'>
                                <h3><span>01</span>选购套餐</h3>
                                <p>咨询客服，选择套餐下单付款</p>
                            </div>
                            <div className='item1'>
                                <h3><span>02</span>预约时间</h3>
                                <p>关注“和美佑家”公众号或拨打<span style={{color:'red'}}>400-000-8000</span>预约体检时间，<span>获取预约码</span></p>
                            </div>
                            <div className='item1'>
                                <h3><span>03</span>登记信息</h3>
                                <p>携带本人身份证到店登记体检信息，<span>获取体检导检单与体检条码</span></p>
                            </div>
                            <div className='item1'>
                                <h3><span>04</span>到店体检</h3>
                                <p>登记成功后，<span>根据导检单和店内指引开始体检</span></p>
                            </div>
                            <div className='item1'>
                                <h3><span>05</span>体检报告</h3>
                                <p>关注“和美佑家”公众号查看并下载电子报告，纸质报告3个工作日后到体检门店自取</p>
                            </div>
                        </div>
                    </div>
                    <div className="title1 tt">体检须知</div>
                    <div className="tjxz">
                        <div className="item">
                            <h2>一、常规体检须知：</h2>
                            <p>
                                1.如有抽血项目请您务必于早晨9:30前进行。<br/>
                                2.体检前3天请勿食油腻食物，勿饮酒。<br/>
                                3.有抽血、彩超检查项目者，受检前8小时请勿进食、饮水，即空腹。<br/>
                                4.为配合x光检查，请勿穿胶印图形的衣服，勿佩戴项链、耳环等。<br/>
                                5.高血压、糖尿病、心脏病等慢性病患者，请将平时服用的药物携带备用。<br/>
                                6.凡70岁以上的老人、高龄孕妇、行动不便者前来体检，需有家属陪同。
                            </p>
                        </div>
                        <div className="item">
                            <h2 style={{ marginTop:15}}>二、妇科体检须知：</h2>
                            <p>
                                1.妇科体检（妇科内科、白带常规、宫颈液基薄层细胞学检查），仅限有性生活史的女性。<br/>
                                2.女性月经期间不宜做妇科检查和便、尿检查，经期结束3天后可补检。<br/>
                                3.妇科检查前24小时内，可以清洗外阴，但勿冲洗阴道。<br/>
                                4.妇科检查做液基薄层细胞学检查前一天禁止房事，妇科治疗（冲洗上药）期间暂缓检查。<br/>
                                5.产后42天内、人流术后21天内不做妇科检查。<br/>
                                6.孕妇或者可能已受孕的女性，勿做x光及宫颈液基薄层细胞学检查。准备受孕的女性勿做x光检测。
                            </p>
                        </div>
                    </div>
                </div>
                <div className="fixed-bottom">
                    {/*<Link to={code ? '/taocan/shopcart' : '/login'}>*/}
                    <div onClick={this.onAddShopCart}>
                        {/* <Button type="primary"></Button> */}加入购物车
                    </div>
                    {/*</Link>*/}

                    <div onClick={this.onPay} style={{backgroundColor:'#009999'}}>
                        {/* <Button></Button> */}
                        立即购买
                    </div>
                </div>
            </div>
        );
    }
}




// 组件A 为发送方所以要实现 connect 的 第二个参数
// mapStateToProps返回的结果必须是一个纯对象，这个对象会与组件的 props 合并
// 接收数据


/**
 * 发送Action
 *
 * 这个函数有一个返回值, 返回值是一个对象
 * @param dispatch
 * @returns {{}}
 */
const mapDispatchToProps = (dispatch) => {

    return {
        addGoodsAction:(item)=>{
            // 利用 dispatch 发送一个action
            // 传递action 对象 我们要定义一个type 属性
            // data 中的值就是所带的参数
            dispatch({
                type:'addGoods',
                data:{...item}
            })
        }

        
    }
}



// 不接收数据, 传递null
export default connect(null, mapDispatchToProps)(TaocanInfo);


