import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Checkbox, List} from "antd-mobile";
import './shopcart.less'
import {yuan} from './../../../defaultSetting'
import utils from "../../../utils/utils";

const CheckboxItem = Checkbox.CheckboxItem;

const curKey = 'id'

class ShopCart extends Component {

    state = {
        totalPrice:'0.00',
        checkAll:false,
        ids:[],
        goods: [
            { id: 1, label: '和美佑家大健康（Health 100）体检卡 白领关爱父母精细套餐', price: 1.00 ,checked:false},
            { id: 2, label: '和美佑家大健康（Health 100）体检卡 白领关爱父母精细套餐', price: 2.00 ,checked:false},
            { id: 3, label: '和美佑家大健康（Health 100）体检卡 白领关爱父母精细套餐', price: 3.00 ,checked:false},
        ]
    }

    componentDidMount() {
        // @todo , 需要手动为 goods[]  中添加checked 属性
    }

    getTotalPrice() {
      const ids= this.state.ids
        const goods= this.state.goods

        let totalPrice = 0
        for (let key of ids) {
            for (let item of goods){
                if (item[curKey]===key){
                    totalPrice += item.price
                }
            }
        }

        return totalPrice
    }

    onCheckAllBox = (e) => {
        let ids = utils.getAttrs(this.state.goods, curKey)
        const checked = e.target.checked

        const goods = this.state.goods.map(item=>{
            item.checked = checked
            return item
        })

        this.setState({
            ids:e.target.checked?ids:[],
            goods:goods,
            checkAll:checked
        });
    }

    onChangeBox = (id , e) => {
        const ids= this.state.ids
        const checked = e.target.checked

        const goods = this.state.goods.map((item)=>{
            if(item[curKey]==id){
                if (checked){
                    ids.push(id)
                }else {
                    const index =  ids.findIndex((item)=>{
                        if(item==id){
                            return true
                        }
                    })

                    ids.splice(index, 1)
                }

                item.checked = checked
            }
            return item
        })

        this.setState({
            goods:goods,
            ids:ids,
            checkAll:ids.length == goods.length
        });
    }


    handleClick = () => {
        // console.log('套餐的id[]', this.state.ids)
    }


    render() {
        const { goods, checkAll} = this.state
        const  totalPrice= this.getTotalPrice()


        return (
            <div style={{position: 'relative', height: '100%'}} className='shopcart'>
                <List>
                    {goods.map((i, key) => (
                        <CheckboxItem className="mui-table-view" key={key} checked={i.checked} onChange={(e)=>this.onChangeBox(i[curKey] ,e)}>
                                <img style={{paddingLeft: 10, marginLeft: 10}} className="mui-media-object mui-pull-left"
                                     src={require('../../../images/8.jpg')}/>

                                <div className="mui-media-body">
                                    <p className='mui-ellipsis-2'>{i.label}</p>
                                    <p className='yuan top-15'>{yuan} {i.price}</p>
                                </div>
                        </CheckboxItem>
                    ))}

                </List>


                <div className="fixed-bottom" style={{height: 100}}>
                    <div className={'row' + ' ' + 'btm-title'}>
                        <div className='row'>
                            <CheckboxItem onChange={this.onCheckAllBox} checked={checkAll}></CheckboxItem>
                            全选
                        </div>


                        <div className='sub'>
                            <span>总计:</span>
                            <span className='yuan'>{yuan} { totalPrice }</span>
                        </div>
                    </div>
                    <Link to='/taocan/confirm_order'>
                        <Button type="primary" type='warning' style={{width: '100%', borderRadius: 0}} onClick={this.handleClick}>提交订单</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ShopCart;