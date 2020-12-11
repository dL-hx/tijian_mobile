import React, {Component} from 'react';
import {Button, Toast, Modal} from "antd-mobile";
import utils from "../../../utils/utils";
import request from "../../../utils/request";
import {Link} from "react-router-dom";
import './my_info.less'


class MyInfo extends Component {

    state = {
        infos: [
/*            {name: '张三', sex: "男", age: '29'},
            {name: '李思思', sex: "女", age: '26', time: '2019-05-28'}*/
        ]
    }

    componentDidMount() {
        this.getMyInfoList()
    }

    getMyInfoList=()=>{
        const customerId = utils.getUserInfo().customerId

        request(`/reception/patient/search?customerId=${customerId}`, {}, "POST").then((res) => {
            if (res.code == 200) {

                this.setState({
                    infos: res.data
                });

            } else {
                Toast.fail(res.message)
            }
        })
    }

    handleLookMyInfoItem=(item)=>{
        // console.log('查看信息', item)

        this.props.history.push({pathname: '/my/my_info_form_look', state: {item: item }});

    }



    render() {
        return (
            <div className='my_info'>
                <ul>
                    {
                        this.state.infos&&this.state.infos.map((item, key) => (
                            <li key={key} onClick={this.handleLookMyInfoItem.bind(this, item)}>
                                    <h4>{`${item.patientName} ${item.sex}`}</h4>
                                    <img className='jt' src={require('./jt.png')} style={{width:'11px'}}/>

                                    {/* <li className="mui-table-view-cell mui-media" key={key}>
                                <a className="mui-navigate-right">
                                    <div className="mui-media-body fz-16">
                                        <span>{`${item.patientName} ${item.sex}`}</span>
                                        <span className='yuan mui-ellipsis fz-16' onClick={this.onDeleteMyInfoItem.bind(this, item.patientId)}>删除</span>
                                    </div>
                                </a> */}
                            </li>
                        ))
                    }
          
                </ul>


                <div className='newinfo'>
                    <Link to='/my/my_info_form'>
                        <Button type='primary'>新建</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default MyInfo;