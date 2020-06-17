import defaultSetting from '../defaultSetting'

const _light = defaultSetting.backgroundColor

// src/config/menuConfig.js
const menuList = [
    {
        title: '导航页',
        key: '/',
    },
    {
        title: '选择套餐',
        key: '/home',
    },
    {
        title: '套餐列表',
        key: '/taocan',
        children: [
            {
                title: '套餐列表',
                key: '/taocan/special',
            },
            {
                title: '套餐详情',
                key: '/taocan/taocanInfo',
                hideIcon: true,
                hidePadding: true
            },
            {
                title: '购物车',
                key: '/taocan/shopcart',
            },
            {
                title: '提交订单',
                key: '/taocan/confirm_order',
                hideIcon: true,
                hidePadding: true,
                themeColor: _light
            },
        ]
    },
    {
        title:'在线预约',
        key: "/order"
    },

    {
        title:'公司简介',
        key: "/about"
    }
    /*
    {
        title: '表单',
        key: '/form',
        children: [
            {
                title: '登录',
                key: '/form/login',
            },
            {
                title: '注册',
                key: '/form/reg',
            }
        ]
    },
    {
        title: '表格',
        key: '/table',
        children: [
            {
                title: '基础表格',
                key: '/table/basic',
            },
            {
                title: '高级表格',
                key: '/table/high',
            }
        ]
    },
    {
        title: '富文本',
        key: '/rich'
    },
    {
        title: '城市管理',
        key: '/city'
    },
    {
        title: '订单管理',
        key: '/order',
    },
    {
        title: '员工管理',
        key: '/user'
    },
    {
        title: '车辆地图',
        key: '/bikeMap'
    },
    {
        title: '图标',
        key: '/charts',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
            {
                title: '饼图',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                key: '/charts/line'
            },
        ]
    },
    {
        title: '权限设置',
        key: '/permission'
    },*/
];
export default menuList;