import React from 'react';
import ReactDOM from 'react-dom';

// 导入 MUI 的样式
import './lib/mui/css/mui.min.less'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.less'

import Router from './router';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));

registerServiceWorker();
