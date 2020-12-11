import React, {Component} from 'react';
import './my_appoint.less'
import utils from "../../../utils/utils";
import request from "../../../utils/request";
import {Toast} from "antd-mobile";
import {tel} from "../../../defaultSetting";

const fail = Toast.fail
const success = Toast.success

class MyAppoint extends Component {
    state = {
        appoints: [
       /*     {
                age: 24,
                appointmentDate: "2020-07-29 00:00:00",
                appointmentId: 104050783748097,
                checked: 1,
                comboName: "内外兼修套餐",
                delFlag: "0",
                deptName: "体检A院",
                origin: "WECHAT",
                patientId: 104027668938754,
                patientIdNumber: "142702199610111213",
                patientMarried: true,
                patientMobile: "18229019743",
                patientName: "李",
                patientSex: "男",
                payStatus: 0,
                remark: "",
                type: 0,
            }*/
        ]
    }

    componentDidMount() {
          this.getMyAppointList();
    }


    getMyAppointList() {
        const customerId = utils.getUserInfo().customerId

        // @TODOS 跨域
        request(`/reception/appointment/search?customerId=${customerId}`, {}, "POST").then((res) => {

            if (res.code == 200) {
                const appoints = res.data

                this.setState({
                    appoints: appoints
                });
            } else {
                fail(res.message)
            }
        })
    }

    onCancelAppoint = (appointmentId) => {
        const customerId = utils.getUserInfo().customerId

        request(`/reception/appointment/cancel?customerId=${customerId}&appointmentId=${appointmentId}`, {}, "POST").then((res) => {
            if (res.code == 200) {
                Toast.success('取消预约信息成功')
                this.getMyAppointList();

            } else {
                Toast.fail(res.message)
            }
        })
    }


    /**
     *
     * @param {*} opt :
     *          传递来的 坐标 {epointx:epointx,epointy: epointy, eword:'eword'}
     *          epointx:  终点的经度
     *          epointy:  终点的纬度
     *          eword  :  终点的名称
     * @param {*} e
     */
    goCmpMap = (opt, e) => {
        // 阻止事件冒泡
        e.stopPropagation()
        const {epointx, epointy} = opt

        this.props.history.push({pathname: '/cmp_map', state: {opt}});
    }


    render() {
        console.log(this.state.appoints)
        return (
            <div className='my_report'>
                {
                    this.state.appoints.length > 0 ? this.state.appoints.map((item, key) => (
                        <div className="mui-card" key={key}>
                            <div className="mui-card-header">
                                <span>{`${item.patientName} ${item.patientMobile}`}</span>
                                {/* delFlag : 0 未取消预约（正常） 1 已取消预约 */}
                                {/* checked : 0 未登记 1 已登记  */}
                                <span className='yuan'>
                                    {item.checked ? '已登记' : parseInt(item.delFlag) ?
                                        <span style={{color: '#ccc'}}>已取消</span> : '未登记'}
                                </span>

                            </div>
                            <div className="mui-card-content">
                                <div className="mui-card-content-inner">
                                    <p>订单号：{item.orderId}</p>
                                    <p onClick={() => {
                                        this.props.history.push({ pathname: '/taocan/taocanInfo', state: { comboId:item.comboId } });
                                    }}>
                                        套餐名称：<span id='btn'>{item.comboName}</span>
                                    </p>

                                    <p>预约日期：{utils.formatTime(item.appointmentDate, 'YYYY-MM-DD')}</p>
                                    <p>体检分院：{item.deptName}</p>
                                </div>
                            </div>
                            <div className="mui-card-footer">
                                <a href={"tel:" + tel}><img src={require('./tel.png')}/></a>

                                <a style={{borderRight: 0}} onClick={(e) => this.goCmpMap({
                                    epointx: 108.96,
                                    epointy: 34.30,
                                    eword: '西安未央体检中心'
                                }, e)}><img src={require('./addr.png')}/></a>




                                <div id='btn' className="ceshitc"
                                     onClick={this.onCancelAppoint.bind(this, item.appointmentId)} style={{
                                    display: item.checked || parseInt(item.delFlag) ? 'none' : 'inline-block',
                                    marginLeft: '10px'
                                }}>
                                    取消预约
                                </div>
                            </div>
                        </div>
                    )) : <div className='no_list'>暂无预约记录</div>
                }
            </div>
        );
    }
}

export default MyAppoint;