import React, {Component} from 'react';
import './report_explain.less'
import {yuan} from "../../defaultSetting";
import PropTypes from "prop-types";


const StarIcons=(props)=>{
    const {stars} = props
    const star_arr = Array.from({length:stars}, (v,k) => k)
    return (
        <span>
            {
                star_arr.map((item,key)=> (<a id="icon-star" key={key}><span className="mui-icon mui-icon-star"></span></a>)  )
            }
        </span>
    )
}



StarIcons.propTypes = {
    stars: PropTypes.number.isRequired,
};


class ReportExplain extends Component {
    state = {
        reports : [
            {img:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2257397407,473190861&fm=26&gp=0.jpg', name:'张三',  stars:3,job:'主任医生',sex:"男",age:'29', yuan:20,time:'2020-05-29'},
            {img:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1655987895,3195250907&fm=26&gp=0.jpg', name:'李思思', stars:4,job:'副主任医生',sex:"女",age:'26',yuan:50, time:'2019-05-28'}
        ]
    }


    render() {

        return (
            <div className='report_explain'>
                {
                    this.state.reports.map((item, key) => (
                        <div key={key} className="mui-card" style={{margin: '0 0 10px 0', height: '100%'}}>
                            <div className="mui-card-content">
                                <div className="mui-card-content-inner">
                                    <div className="wrapper">
                                        <div className="left">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="center">
                                            <p><span>{item.name}</span> {item.job}</p>
                                            <p><StarIcons stars={item.stars}/></p>
                                            <p className='yuan'>{yuan} {item.yuan}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }


            </div>
        );
    }
}

export default ReportExplain;