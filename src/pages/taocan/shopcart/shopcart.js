import React, {Component} from 'react'
import { connect } from 'react-redux'
import defaultSetting from '../../../defaultSetting'
import './shopcart.less'
import utils from "../../../utils/utils";
import request from "../../../utils/request";
import {Toast} from "antd-mobile";
import {payType} from "../../../utils/constants";

class ShopCart extends Component {
    constructor(props) {
        super(props)
    }
    // 选择商品
    checkGoods = (goodsId,index) =>{
        console.log(new Date())
        this.props.dispatch({
            type:'checkGoods',
            data:goodsId
        })
    }
    // 切换商品数量
    changeGoodNum = (status,goodsId,index,e) =>{
        // 阻止事件冒泡、浏览器默认行为
        e.preventDefault();
        e.stopPropagation();
        let data = {
            status:status,
            goodsId:goodsId
        }
        this.props.dispatch({
            type:'changeGoodsNum',
            data:data
        })
    }

    // 全选
    checkAllGoods = () => {
        this.props.dispatch({
            type:'checkAllGoods',
            data:this.props.checkAll
        })
    }

    // 结算
    submit = () => {
        if (this.props.checkGoodsList.length==0){
            Toast.fail('请选择套餐在进行提交')
            return ;
        }

        // 1. 获取到  货物 信息 列表
        let submitList = []
        let checkGoodsList = this.props.goodsList.filter(item => item.check)
        checkGoodsList.map((item,index) => {
            let obj = {
                goodsId:item.goodsId,
                goodsNum:item.goodsNum
            }
            submitList.push(obj)
        })

        console.log(submitList)

        // 2. 将获取到的套餐列表信息 ,传入接口, 获取, 生成订单id 进行传递

        const obj = {}
        obj.customerId = utils.getUserInfo().customerId+""

        obj.buyerMobile = utils.getUserInfo().mobile

        // 自定义数据处理函数,  将处理完的数据进行传递
        obj.orderDetailSaveRequestList = submitList.map(item=> ({ comboId:item.goodsId,num:item.goodsNum  }))



        // 3. 点击提交订单 按钮, 跳转订单确认页面, 或传递 选中的购物车列表信息

        /**
         *  添加订单接口
         * */
        request(`/order/add`, {...obj}, "POST").then((res) => {
            if (res.code == 200) {
                // Toast.success(res.message)
                const orderId = res.data // 订单Id
                this.props.history.push({       // 跳转订单确认页面
                        pathname: '/taocan/confirm_order',
                        state: {
                            orderId,  // 传递订单Id
                            payType: payType.shopcart // 支付类型 'shopcart': 购物车购买

                        }
                    }
                );
            } else {
                Toast.fail(res.message)
            }
        })


    }

    render() {
        return (
            <div className='shoppingCartWarp'>
                <div className='shoppingCartWarp_content'>
                    {
                        this.props.goodsList.map((item,index) => (
                            <div className='shoppingCartWarp_content_list' key={index} onClick={() => this.checkGoods(item.goodsId,index)}>
                                <div className='shoppingCartWarp_content_check'>
                                    {
                                        item.check ? <img src={require('./shopping_check.png')} alt=""/> : <img src={require('./shopping_checkNormal.png')} alt=""/>
                                    }
                                </div>
                                <div className='shoppingCartWarp_content_list_imgWarp'>
                                    <img src={item.goodsSrc} alt=""/>
                                </div>
                                <div className='shoppingCartWarp_content_list_info'>
                                    <div className='shoppingCartWarp_content_list_title'>{item.goodsTitle}</div>
                                    {/*<div className='shoppingCartWarp_content_list_subtitle'>{item.goodsSubtitle}</div>*/}
                                    <div className='shoppingCartWarp_content_list_action'>
                                        <div className='shoppingCartWarp_content_list_price'>{defaultSetting.yuan} {item.goodsPrice}</div>
                                        
                                    </div>
                                </div>
                                <div className='shoppingCartWarp_content_list_actionNum'>
                                    {
                                        // 商品数量为0 隐藏取消和数量
                                        item.goodsNum > 0 ?
                                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <div className='shoppingCartWarp_content_list_actionNumChangeButton' onClick={(e) => this.changeGoodNum('reduce',item.goodsId,index,e)}>-</div>
                                                <div className='shoppingCartWarp_content_list_actionNumInfo'>{item.goodsNum}</div>
                                            </div>
                                            : ''
                                    }
                                    <div className='shoppingCartWarp_content_list_actionNumChangeButton' onClick={(e) => this.changeGoodNum('add',item.goodsId,index,e)}>+</div>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <br/>
                <br/>
                <br/>

                <div className='shoppingCartWarp_footer'>
                    <div className='shoppingCartWarp_footer_action'>
                        <div className='shoppingCartWarp_footer_checkAll' onClick={() => this.checkAllGoods()}>
                            {
                                this.props.checkAll ? <img src={require('./shopping_check.png')} alt=""/> : <img src={require('./shopping_checkNormal.png')} alt=""/>
                            }
                            全选
                        </div>
                        <div className='shoppingCartWarp_footer_mount'>
                            总计&nbsp;:&nbsp;<span>{this.props.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className='shoppingCartWarp_footer_submit' style={{
                        backgroundColor: this.props.checkGoodsList.length==0?'#ccc':"",
                    }}
                         onClick={() => this.submit()}>提交订单</div>
                </div>
            </div>
        )
    }
}

// 组件B 为接收方所以要实现 connect 的 第一个参数


// mapStateToProps返回的结果必须是一个纯对象，这个对象会与组件的 props 合并
// 接收数据
function mapStateToProps(state) {
    // console.log('state', state)
    // 计算总价
    let price = state.goods.list.reduce((total,item) => total + (item.check ? parseFloat(item.goodsPrice*item.goodsNum) : 0),0)

    // 获取购物车选中的套餐项列表
    let checkGoodsList = state.goods.list.filter((item) => item.check);

    return {
        goodsList:state.goods.list,
        checkGoodsList:checkGoodsList,
        checkAll:state.goods.list.filter(item => item.check).length == state.goods.list.length, // 根据已选的商品和商品总数量进行对对，决定全选状态
        price:price
    }
}

export default connect(mapStateToProps)(ShopCart);
