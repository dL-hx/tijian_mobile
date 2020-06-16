import React, {Component} from 'react';
import style from './taocanInfo.css'

import {Button, List} from 'antd-mobile';
import {Link} from "react-router-dom";

const Item = List.Item;
const Brief = Item.Brief;

class TaocanInfo extends Component {
    state = {
        active: false,
    }


    render() {
        return (
            <div style={{position: 'relative', height: '100%'}}>
                <div className={style.lunbo}>
                    <img src={require('../../images/8.jpg')} alt=""/>
                </div>
                <div className={style.info}>
                    <div>
                        <div className={style.navtitle}>
                            <s1>折后价</s1>
                            <span>05月30日00:00结束</span>
                        </div>

                        {/*折扣区样式*/}
                        <div className={style.subtitle}>
                            <h3>¥79</h3>
                            <h5>¥728</h5>
                            <h6>1.1折</h6>
                        </div>
                    </div>
                    <div className={style.thdtitle}>
                        <div className={style['thd-l']}>
                            和美佑家大健康（Health 100）体检卡 白领关爱父母精细套餐（双人） 全国门店通用
                        </div>
                        <div className={style['thd-r']}>
                            <Link to="#" >
                                <span className="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
                                <div className="mui-media-body">客服</div>
                            </Link>
                        </div>
                    </div>

                    <div className={style.fthtitle}>
                        <span>配送至</span>
                        <span>陕西省咸阳市</span>
                        <span>包邮</span>
                    </div>


                    <div className={style.fthtitle}>
                        <span>已选</span>
                        <span>中级白领</span>
                        <span>1个</span>
                    </div>

                </div>
{/*                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>*/}
                <div className="fixed-bottom">
                    <Button type="primary" style={{
                        width: '50%',
                        backgroundColor: '#000',
                        float: 'left',
                        borderRadius: 0
                    }}>加入购物车</Button>
                    <Button type="primary" type='warning' style={{width: '50%', borderRadius: 0}}>立即购买</Button>
                </div>
            </div>
        );
    }
}

export default TaocanInfo;