import React, {Component} from 'react';
import './home.less'
import request from "../../utils/request";
import {Toast} from "antd-mobile";

class Home extends Component {
    componentDidMount() {
        // request(`/om/type/search`, {}, "POST").then((res) => {
        //     if (res.code == 200) {
        //         // Toast.success('套餐类型')
        //         console.log('res', res)
        //     } else {
        //         Toast.fail(res.message)
        //     }
        // })
    }

    goTaoCanList=(comboType)=>{
        this.props.history.push({pathname: '/taocan/taocanList',state:{comboType:comboType}});
    }

    render() {
        return (
            <div className='home'>
                <div className='taocan'>
                    <div className='item' onClick={this.goTaoCanList.bind(this,2)}>
                        <span>
                            <h4>特色套餐</h4>
                            <p>婚前/孕前/防癌套餐</p>
                        </span>
                    </div>
                    <div className='item' onClick={this.goTaoCanList.bind(this,1)}>
                        <span>
                            <h4>家庭套餐</h4>
                            <p>感恩父母/幸福家庭... </p>
                        </span>
                    </div>
                    <div className='item' onClick={this.goTaoCanList.bind(this,3)}>
                        <span>
                            <h4>职场套餐</h4>
                            <p>入职体检/职场精细...</p>
                        </span>
                    </div>
                    <div className='item' onClick={this.goTaoCanList.bind(this,4)}>
                        <span>
                            <h4>青年套餐</h4>
                            <p>安心孕前/活力精细...</p>
                        </span>
                    </div>
                    <div className='item' onClick={this.goTaoCanList.bind(this,5)}>
                        <span>
                            <h4>中年套餐</h4>
                            <p>健康精细/健康深度...</p>
                        </span>
                    </div>
                    <div className='item' onClick={this.goTaoCanList.bind(this,6)}>
                        <span>
                            <h4>老年套餐</h4>
                            <p>关爱精细/感恩父母肿瘤筛查...</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;