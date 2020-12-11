/*
 *  引入createStore 保存数据源
 */

import { createStore } from "redux";
// 引入所有的reducer
import reducer from "./../reducer";
//调试工具插件方法 -- redux降级到3.7可使用


export default ()=>createStore(reducer)