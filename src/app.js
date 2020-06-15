import React, {Component} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import './App.less';
import { withRouter } from 'react-router-dom';


class App extends Component {

    render() {
        const flag = this.props.location.pathname === "/home" ? false : true;

        return (
            <div className="container">
                <NavBar mode="light"
                        icon={flag && <Icon type="left"/>}
                        onLeftClick={() => this.props.history.goBack()}
                    // rightContent={<b onClick={() => this.setState({ open: true })}>...</b>}
                >
                    和美佑家
                </NavBar>

                <div className='main'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
