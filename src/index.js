import React from 'react';
import ReactDOM from 'react-dom';

// 导入 MUI 的样式
import './lib/mui/css/mui.min.less'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.less'
import Router from './router';

import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux"; // 添加<Provider />项目根组件
import configureStore from "./redux/store/configureStore";

const store = configureStore();


ReactDOM.render(  <Provider store={store}>
    <Router />
</Provider>, document.getElementById('root'));


registerServiceWorker();
