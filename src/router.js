import React from "react";
import { BrowserRouter as Router, Route, Redirect , Switch} from "react-router-dom"; //导入路由,为HashRouter起别名:  Router

import App from "./App";
import Home from "./pages/home/home"; //4.0允许在路由中嵌套标签组件    这里是嵌套<Home>组件
/* 嵌套路由中添加 render方法加载
    在子组件中进行嵌套路由
*/
import About from "./pages/about/about";

import Special from "./pages/taocan/special";
import Common from "./common";

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Common>
                            <Route path="/home" component={Home}/>
                            <Route path="/taocan" render={() => {
                                return <div>
                                    <Route path="/taocan/special" component={Special}/>
                                </div>;
                            }}
                            />
                        </Common>
                        <Route path="/about" component={About} />



                        {/*<Route path="/topics" component={Topic} />*/}

                        <Redirect to="/home"/>
                    </Switch>

                </App>
            </Router>
        );
    }
}
