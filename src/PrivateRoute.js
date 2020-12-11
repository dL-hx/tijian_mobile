import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import utils from "./utils/utils";

// 路由守卫
class PrivateRoute extends React.Component {
    render() {
        let {component: Component, ...rest} = this.props;

        // 如果(bool) code == false
        // 路由守卫发起判断，如果条件满足则进入，否则跳转至pathname组件

        // Route组件里render和Component二选一

        //props 包含值：history，location，match
        //login 页面可以通过 this.props.location.state.from知道是哪个页面跳转过来的,方便登录后直接跳转
        utils.setStorage('path', window.location.pathname)

        return (
            <Route
                {...rest}
                render={props =>
                   /* utils.getIsLogin()*/  utils.getStorage('isLogin')?
                        (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{ pathname: "/login"}}
                            />
                        )
                }
            />
        );
    }
}


export default PrivateRoute