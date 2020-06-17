import React from "react";
import { BrowserRouter as Router, Route, Redirect , Switch} from "react-router-dom"; //导入路由,为HashRouter起别名:  Router

import App from "./App";
import Common from "./common";

import Nav from "./pages/nav/nav";
/* 嵌套路由中添加 render方法加载
    在子组件中进行嵌套路由
*/
import Home from "./pages/home/home"; //4.0允许在路由中嵌套标签组件    这里是嵌套<Home>组件
import About from "./pages/about/about";
import Special from "./pages/taocan/special";
import TaoCanInfo from "./pages/taocan/taocanInfo";
import ShopCart from "./pages/taocan/shopcart/shopcart";
import ConfirmOrder from "./pages/taocan/confirmOrder/confirmOrder";
import Order from "./pages/order/order";

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>

                        <Route
                            path="/"
                            render={() => (
                                <Common>
                                    <Switch>
                                        <Route path="/home" component={Home}/>
                                        <Route path="/taocan" render={() => {
                                            return <div>
                                                <Route path="/taocan/special" component={Special}/>
                                                <Route path="/taocan/taocanInfo" component={TaoCanInfo}/>
                                                <Route path="/taocan/shopcart" component={ShopCart}/>
                                                <Route path="/taocan/confirm_order" component={ConfirmOrder}/>

                                            </div>;
                                        }}
                                        />


                                        <Route path="/order" component={Order} />

                                        <Route path="/about" component={About} />

                                        <Route path="/" component={Nav}/>
                                    </Switch>
                                </Common>
                            )}
                        />




                        {/*<Route path="/topics" component={Topic} />*/}
                        {/*<Redirect to="/home"/>*/}


                    </Switch>

                </App>
            </Router>
        );
    }
}
