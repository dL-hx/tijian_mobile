import React, {Component} from 'react';
import './my_appoint.less'

class MyAppoint extends Component {
    state = {
        appoints : [
            {number:'10000323424324',time:'2020-03-19',taocan:'入职体检套餐',name:'张三',tel:"15888888888",age:'29', status:'待体检', cmp_addr:'临潼分院'},
            {number:'10000323424324',time:'2018-02-19',taocan:'关爱父母精细套餐(双人)',name:'张三',tel:"15888888888",age:'28', status:'待体检', cmp_addr:'临潼分院'}
        ]
    }

    render() {
        return (
            <div className='my_appoint'>
                {
                    this.state.appoints.map((item, key) => (
                        <div className="mui-card" key={key}>
                            <div className="mui-card-header">
                                <span>{`${item.name} ${item.tel}`}</span>
                                <span className='yuan'> {item.status} </span>
                            </div>
                            <div className="mui-card-content">
                                <div className="mui-card-content-inner">
                                    <p>预约日期：{item.time}</p>
                                    <p>体检分院：{item.cmp_addr}</p>
                                </div>
                            </div>
                            <div className="mui-card-footer">
                                <a id="icon"><span className="mui-icon mui-icon-phone"></span></a>
                                <a id="icon"><span className="mui-icon mui-icon-map"></span></a>
                                <div id='btn' className="mui-btn-primary mui-btn-outlined">
                                    {item.taocan}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default MyAppoint;