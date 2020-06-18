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
import BizHour from "./pages/biz_hour/biz_hour";
import Note from "./pages/note/note";
import CmpAddr from "./pages/cmp_addr/cmp_addr";

import ReportExplain from "./pages/report_explain/report_explain";

import MyReport from "./pages/my/my_report/my_report";
import MyReportDetail from "./pages/my/my_report_detail/my_report_detail";
import MyAppoint from "./pages/my/my_appoint/my_appoint";
import MyOrder from "./pages/my/my_order/my_order";
import MyInfo from "./pages/my/my_info/my_info";



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

                                        <Route path="/biz_hour" component={BizHour} />

                                        <Route path="/note" component={Note} />

                                        <Route path="/cmp_addr" component={CmpAddr} />

                                        <Route path="/report_explain" component={ReportExplain} />


                                        <Route path="/my" render={() => {
                                            return <div>
                                                <Route path="/my/my_report" component={MyReport}/>
                                                <Route path="/my/my_report_detail" component={MyReportDetail}/>
                                                <Route path="/my/my_appoint" component={MyAppoint}/>
                                                <Route path="/my/my_order" component={MyOrder}/>
                                                <Route path="/my/my_info" component={MyInfo}/>

                                            </div>;
                                        }}
                                        />


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
