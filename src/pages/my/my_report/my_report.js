import React, {Component} from 'react';
import './my_report.less'
import {Toast} from "antd-mobile";
import defaultSetting from "../../../defaultSetting";
import utils from "../../../utils/utils";
import request from "../../../utils/request";

const fail = Toast.fail
const success = Toast.success

class MyReport extends Component {
    state = {
        reports : [
             // {checkinCode:'00120073170013', patientName:'张三',sex:"男",age:'29', checkinDay:'2020-05-29', deptName:'临潼分院'},
             //  {checkinCode:'00120073170014', patientName:'张三',sex:"男",age:'28', checkinDay:'2019-05-28', deptName:'临潼分院'}
        ]
    }


    componentDidMount() {
       // this.getMyReportList();
    }

    /**
     * 获取我的报告列表
     * */
    getMyReportList() {
        const customerId = utils.getUserInfo().customerId

        request(`/report/personal/myReport?customerId=${customerId}`, {}, "POST").then((res) => {

            if (res.code == 200) {
                const reports = res.data

                this.setState({
                    reports: reports
                });
            } else {
                fail(res.message)
            }
        })
    }


    handleOutputReport=(item , e)=>{
        // 阻止事件冒泡
        e.stopPropagation()

        // Toast.success('导出报告成功')
        setTimeout(function (){
            window.location.href = 'http://phy.wiimedia.top/pdf/export/'+item.checkinCode
            Toast.success('导出报告成功')
        },1500)
    }

    handleLookReport=(item)=>{
        // console.log('item', item)
        // this.props.history.push({pathname: '/my/my_report_detail', state: {item: item}});

        this.props.history.push(`/my/my_report_preview/${item.checkinCode}`);

    }

    handleCallPhone=(tel,e)=>{
        // 阻止事件冒泡
        e.stopPropagation()

        window.location.href = "tel:"+tel
    }

    render() {
        return (
            <div className='my_report'>
                {
                    this.state.reports.length>0?
                    this.state.reports.map((item, key) => (
                        <div className="mui-card" key={key} onClick={this.handleLookReport.bind(this, item)}>
                            <div className="mui-card-header">
                                <span>{`${item.patientName} ${item.age} ${item.sex}`}</span>
                                <span>体检日期: {item.checkinDay} </span>
                            </div>
                            <div className="mui-card-content">
                                <div className="mui-card-content-inner">
                                    <p>体检号：{item.checkinCode}</p>
                                    <p>体检分院：{item.deptName}</p>
                                </div>
                            </div>
                            <div className="mui-card-footer">
                               <div id='btn' className="ceshitc" onClick={this.handleOutputReport.bind(this, item)}>
                                    导出报告
                                </div>
                            </div>
                        </div>
                    )):<div className='no_list'>暂无报告记录</div>
                }
            </div>
        );
    }
}

export default MyReport;