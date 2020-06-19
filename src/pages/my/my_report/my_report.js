import React, {Component} from 'react';
import './my_report.less'

class MyReport extends Component {
    state = {
        reports : [
            {number:'10000323424324',tel:'029-88888888', name:'张三',sex:"男",age:'29', time:'2020-05-29', cmp_addr:'临潼分院'},
            {number:'10000323424324',tel:'029-00000000', name:'张三',sex:"男",age:'28', time:'2019-05-28', cmp_addr:'临潼分院'}
        ]
    }

    handleOutputReport=(item)=>{
        // console.log('item', item)
        this.props.history.push({pathname: '/my/my_report_detail', state: {item: item}});
    }

    render() {
        return (
            <div className='my_report'>
                {
                    this.state.reports.map((item, key) => (
                        <div className="mui-card" key={key}>
                            <div className="mui-card-header">
                                <span>{`${item.name} ${item.age} ${item.sex}`}</span>
                                <span>体检日期: {item.time} </span>
                            </div>
                            <div className="mui-card-content">
                                <div className="mui-card-content-inner">
                                    <p>体检号：{item.number}</p>
                                    <p>体检分院：{item.cmp_addr}</p>
                                </div>
                            </div>
                            <div className="mui-card-footer">
                                <a id="icon" href={`tel:${item.tel}`}><span className="mui-icon mui-icon-phone"></span></a>
                                <a id="icon"><span className="mui-icon mui-icon-map"></span></a>
                                <div id='btn' className="mui-btn-primary mui-btn-outlined" onClick={this.handleOutputReport.bind(this, item)}>
                                    导出报告
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default MyReport;