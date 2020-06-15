import React, {Component} from 'react';
import './home.less'
import {NavBar} from "antd-mobile";
import LogoTitle from "../../common/LogoTitle";

class Home extends Component {
    render() {
        return (
            <div>
                <h4 style={{paddingBottom: 10}}> 选择套餐</h4>

                <LogoTitle></LogoTitle>

                <ul className="mui-table-view mui-grid-view mui-grid-9">
                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6"><a href="#">
                        <img src={require('../../images/1.jpg')} alt=""/>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                        <a href="#">
                            <img src={require('../../images/2.jpg')} alt=""/>
                        </a>
                        <a href="#">
                            <img src={require('../../images/5.jpg')} alt=""/>
                        </a>
                    </li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                        <a href="#">
                            <img src={require('../../images/4.jpg')} alt=""/>
                        </a>
                        <a href="#">
                            <img src={require('../../images/3.jpg')} alt=""/>
                        </a>
                    </li>


                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6"><a href="#">
                        <img src={require('../../images/6.jpg')} alt=""/>
                    </a></li>
                </ul>
            </div>
        );
    }
}

export default Home;