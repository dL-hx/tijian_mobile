import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Checkbox, List} from "antd-mobile";
import './shopcart.less'
import {yuan} from './../../../defaultSetting'

const CheckboxItem = Checkbox.CheckboxItem;

class Shopcart extends Component {

    state = {
        total: '0.00',
        data: [1, 2, 3]
    }

    onCheckAllBox = (e) => {
        e.preventDefault()
        console.log('全部')
    }

    onChangeBox = (val) => {
        console.log('item')
        console.log(val);
    }


    render() {
        const {total, data} = this.state
        return (
            <div style={{position: 'relative', height: '100%'}} className='shopcart'>
                <List>
                    {data.map((i, key) => (
                        <CheckboxItem className="mui-table-view" key={key} onChange={this.onChangeBox}>
                                <img style={{paddingLeft: 10, marginLeft: 10}} className="mui-media-object mui-pull-left"
                                     src={require('../../../images/8.jpg')}/>

                                <div className="mui-media-body">
                                    <p className='mui-ellipsis-2'>和美佑家大健康（Health 100）体检卡 白领关爱父母精细套餐</p>
                                    <p className='yuan top-15'>{yuan} 79.00</p>
                                </div>
                        </CheckboxItem>
                    ))}

                </List>


                <div className="fixed-bottom" style={{height: 90}}>
                    <div className={'row' + ' ' + 'btm-title'}>
                        <div className='row'>
                            <CheckboxItem onChange={this.onCheckAllBox}>
                            </CheckboxItem>
                            全选
                        </div>


                        <div className='sub'>
                            <span>总计:</span>
                            <span className='yuan'>{yuan} {total}</span>
                        </div>
                    </div>
                    <Link to='/taocan/shopcart'>
                        <Button type="primary" type='warning' style={{width: '100%', borderRadius: 0}}>立即购买</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Shopcart;