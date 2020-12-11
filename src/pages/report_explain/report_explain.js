import React, {Component} from 'react';
import './report_explain.less'
import {yuan} from "../../defaultSetting";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


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
            <div className='my_order my_info report_explain'>
                <ul>
                    {
                        this.state.reports.map((item, key) => (
                            <li key={key}>
                                <Link to={{
                                    pathname:'/report_detail',
                                    state:{report_detail: item}
                                }}>
                                    <img style={{ width:'76px',height:'76px', marginRight:'12px'}} src={item.img} alt=""/>
                                    <div>
                                        <h4>{item.name} &nbsp;&nbsp;<span>{item.job}</span> </h4>
                                        <p>
                                            <span className='start'><StarIcons stars={item.stars}/></span>
                                            <span className='price'>{yuan} {item.yuan}</span>
                                        </p>
                                        <img className='jt' src={require('./jt.png')}/>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>

            </div>
        );
    }
}

export default ReportExplain;