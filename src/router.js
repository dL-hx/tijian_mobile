import React from "react";
import { BrowserRouter as Router, Route, Redirect , Switch} from "react-router-dom"; //导入路由,为HashRouter起别名:  Router

import App from "./App";

import Common from "./common";

import Nav from "./pages/nav/nav";

// 导入路由守卫
import PrivateRoute from './PrivateRoute'

/* 嵌套路由中添加 render方法加载
    在子组件中进行嵌套路由
*/

import Login from "./pages/login/login";
import Regist from "./pages/regist/regist";

import CallPhone from "./pages/call_phone/call_phone";


import Home from "./pages/home/home"; //4.0允许在路由中嵌套标签组件    这里是嵌套<Home>组件

import About from "./pages/about/about";

import TaocanList from "./pages/taocan/taocanList";
import TaocanInfo from "./pages/taocan/taocanInfo";

import ShopCart from "./pages/taocan/shopcart/shopcart";
import ConfirmOrder from "./pages/taocan/confirmOrder/confirmOrder";
import Order from "./pages/order/order";
import BizHour from "./pages/biz_hour/biz_hour";
import Note from "./pages/note/note";
import CmpAddr from "./pages/cmp_addr/cmp_addr";
import CmpMap from "./pages/cmp_addr/cmp_map";


import ReportExplain from "./pages/report_explain/report_explain";
import ReportDetail from "./pages/report_explain/report_detail";

import MyReport from "./pages/my/my_report/my_report";
import MyReportDetail from "./pages/my/my_report_detail/my_report_detail";

// import MyReportPreview from "./pages/my/my_report/my_report_preview";// pdf my report
import MyReportPreview from "./pages/my/my_report/my_report_preview";// pdf my report



import MyAppoint from "./pages/my/my_appoint/my_appoint";
import MyOrder from "./pages/my/my_order/my_order";
import MyOrderDetail from "./pages/my/my_order/my_order_detail";


import MyInfo from "./pages/my/my_info/my_info";
import MyInfoForm from "./pages/my/my_info/my_info_form";
import MyInfoFormLook from "./pages/my/my_info/my_info_form_look";



export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/regist" component={Regist}/>

                        <Route path="/call_phone" component={CallPhone}/>

                        <Route
                            path="/"
                            render={() => (
                                <Common>
                                    <Switch>
                                        <Route path="/home" component={Home}/>
                                        <Route path="/taocan" render={() => {
                                            return <div>
                                                <Route path="/taocan/taocanList" component={TaocanList}/>
                                                <Route path="/taocan/taocanInfo" component={TaocanInfo}/>
                                                <Route path="/taocan/shopcart" component={ShopCart}/>
                                                <Route path="/taocan/confirm_order" component={ConfirmOrder}/>
                                            </div>;
                                        }}
                                        />

                                        {/*PrivateRoute*/}
                                        <PrivateRoute path="/order" component={Order} />

                                        <Route path="/biz_hour" component={BizHour} />

                                        <Route path="/note" component={Note} />

                                        <Route path="/cmp_addr" component={CmpAddr} />
                                        <Route path="/cmp_map" component={CmpMap} />

                                        {/*PrivateRoute*/}
                                        <PrivateRoute path="/report_explain" component={ReportExplain} />
                                        <PrivateRoute path="/report_detail" component={ReportDetail} />


                                        <Route path="/my" render={() => {
                                            return <div>
                                                {/*PrivateRoute*/}
                                                <PrivateRoute path="/my/my_report" component={MyReport}/>
                                                <PrivateRoute path="/my/my_report_preview/:checkinCode" component={MyReportPreview}/>
                                                {/*<PrivateRoute path="/my/my_report_detail" component={MyReportDetail}/>*/}
                                                <PrivateRoute path="/my/my_appoint" component={MyAppoint}/>

                                                <PrivateRoute path="/my/my_order" component={MyOrder}/>
                                                <PrivateRoute path="/my/my_order_detail" component={MyOrderDetail}/>


                                                <PrivateRoute path="/my/my_info" component={MyInfo}/>
                                                <PrivateRoute path="/my/my_info_form" component={MyInfoForm}/>
                                                <PrivateRoute path="/my/my_info_form_look" component={MyInfoFormLook}/>

                                            </div>;
                                        }}
                                        />


                                        <Route path="/about" component={About} />

                                        <Route path="/" component={Nav}/>
                                    </Switch>
                                </Common>
                            )}
                        />



                        {/*<Redirect to="/home"/>*/}

                        {/*<Route path="/topics" component={Topic} />*/}

                    </Switch>

                </App>
            </Router>
        );
    }
}
