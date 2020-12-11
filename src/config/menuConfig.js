import defaultSetting from "../defaultSetting";
import utils from "../utils/utils";

const _light = defaultSetting.backgroundColor;
const _top = defaultSetting.top;

// src/config/menuConfig.js
const menuList = [
  {
    title: "导航页",
    key: "/",
  },
  {
    title: "注册页",
    key: "/regist",
    hidePadding: true,
    themeColor: _light,
  },
  {
    title: "登录页",
    key: "/login",
    hidePadding: true,
    themeColor: _light,
  },

  {
    title: "选择套餐",
    key: "/home",
    top: _top,
    hideIcon: true,
    hidePadding: true,
  },
  {
    title: "套餐列表",
    key: "/taocan",
    children: [
      {
        title: "套餐列表",
        key: "/taocan/taocanList",
      },
      {
        title: "套餐详情",
        key: "/taocan/taocanInfo",
        hideIcon: true,
        hidePadding: true,
        top: _top,
      },
      {
        title: "购物车",
        key: "/taocan/shopcart",
      },
      {
        title: "提交订单",
        key: "/taocan/confirm_order",
        hideIcon: true,
        hidePadding: true,
        themeColor: _light,
        top: _top,
      },
    ],
  },
  {
    title: "在线预约",
    key: "/order",
  },

  {
    title: "营业时间",
    key: "/biz_hour",
  },

  {
    title: "体检须知",
    key: "/note",
  },

  {
    title: "分院地址",
    key: "/cmp_addr",
  },

  {
    title: "分院地址",
    key: "/cmp_map",
    hidePadding: true,
    hideIcon: true,
  },

  {
    title: "报告解读",
    key: "/report_explain",
  },

  {
    title: "报告解读",
    key: "/report_detail",
  },


  {
    title: "一键呼救",
    key: "/call_phone",
  },

  {
    title: "我的",
    key: "/my",
    children: [
      {
        title: "我的报告",
        key: "/my/my_report",
      },

      {
        title: "报告详情",
        key: "/my/my_report_detail",
      },

      {
        title: "报告预览",
        key:`/my/my_report_preview/${utils.getQueryString('my_report_preview')}`,
        hideIcon: true,
        hidePadding: true,
      },

      {
        title: "我的预约",
        key: "/my/my_appoint",
      },

      {
        title: "我的订单",
        key: "/my/my_order",
      },

      {
        title: "订单详情",
        key: "/my/my_order_detail",
      },
      {
        title: "我的信息",
        key: "/my/my_info",
      },

      {
        title: "新增信息",
        key: "/my/my_info_form",
      },

      {
        title: "编辑信息",
        key: "/my/my_info_form_look",
      },
    ],
  },

  {
    title: "公司简介",
    key: "/about",
    top: _top,

    hideIcon: true,
    hidePadding: true,
  },
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
