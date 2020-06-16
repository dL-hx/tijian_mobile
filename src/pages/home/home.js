import React, {Component} from 'react';
import './home.less'
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div>
                <ul className="mui-table-view mui-grid-view mui-grid-9">
                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6"><Link  to="/taocan/special">
                        <img src={require('../../images/1.jpg')} alt=""/>
                    </Link ></li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                        <Link to="/taocan/special">
                            <img src={require('../../images/2.jpg')} alt=""/>
                        </Link>
                        <Link to="/taocan/special">
                            <img src={require('../../images/5.jpg')} alt=""/>
                        </Link>
                    </li>
                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                        <Link to="/taocan/special">
                            <img src={require('../../images/4.jpg')} alt=""/>
                        </Link>
                        <Link to="/taocan/special">
                            <img src={require('../../images/3.jpg')} alt=""/>
                        </Link>
                    </li>


                    <li className="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6"><Link to="/taocan/special">
                        <img src={require('../../images/6.jpg')} alt=""/>
                    </Link></li>
                </ul>
            </div>
        );
    }
}

export default Home;