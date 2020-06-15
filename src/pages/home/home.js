import React, {Component} from 'react';
import './home.less'
import {NavBar} from "antd-mobile";
import LogoTitle from "../../common/LogoTitle";

class Home extends Component {
    render() {
        return (
            <div>
                <LogoTitle></LogoTitle>

                <ul className="mui-table-view mui-grid-view mui-grid-9">
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-home"></span>
                        <div className="mui-media-body">Home</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-email"><span className="mui-badge">5</span></span>
                        <div className="mui-media-body">Email</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-chatbubble"></span>
                        <div className="mui-media-body">Chat</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-location"></span>
                        <div className="mui-media-body">location</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-search"></span>
                        <div className="mui-media-body">Search</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-phone"></span>
                        <div className="mui-media-body">Phone</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-gear"></span>
                        <div className="mui-media-body">Setting</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-info"></span>
                        <div className="mui-media-body">about</div>
                    </a></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span className="mui-icon mui-icon-more"></span>
                        <div className="mui-media-body">more</div>
                    </a></li>
                </ul>
            </div>
        );
    }
}

export default Home;