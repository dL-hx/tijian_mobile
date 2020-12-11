import index from "./getWxCode.js";
import moment from "moment";
import {payStatus} from "./constants";

Date.prototype.Format = function (timestamp, fmt) {
    var date = new Date(timestamp - 28800000);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};

function isQuotaExceeded(e) {
    var quotaExceeded = false;
    if (e) {
        if (e.code) {
            switch (e.code) {
                case 22:
                    quotaExceeded = true;
                    break;
                case 1014: // Firefox
                    if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if (e.number === -2147024882) {
            // IE8
            quotaExceeded = true;
        }
    }
    return quotaExceeded;
}

export default {
    /**
     * 获取商品的现价
     *
     * 现价 = 原价格 * 折扣/100
     *
     * return info.comboPrice * info.comboDiscount/100
     * */
    getGoodsPrice(info = {}) {
        // 保留两位小数
        return ((info.comboPrice * info.comboDiscount) / 100).toFixed(2);
    },

    /**
     * Object Serialize: 对象序列化方法
     */

    objSerialize: function (params) {
        params = {...params}; // wd=111&cb=222

        let arrs = []; // 数组序列化
        for (let key in params) {
            if (params[key]) {
                arrs.push(`${key}=${params[key]}`);
            }
        }
        return `?${arrs.join("&")}`;
    },

    getTime: function () {
        let time = moment(new Date())
            .add("year", 0)
            .format("YYYY-MM-DD")
            .split("-")
            .map((item) => parseInt(item, 10));
        return {
            year: time[0],
            month: time[1] - 1,
            day: time[2],
        };
    },

    /**
     * 获取当前日期的时间戳
     */
    getTimestamp: function (params) {
        var timestamp = Date.parse(new Date());
        return timestamp;
    },
    /**
     * moment 转 日期字符串
     * @param text
     * @param format
     * @returns {string} 日期字符串
     */
    formatTime: function (text, format = "YYYY-MM-DD HH:mm:ss") {
        return moment(text).format(format);
    },

    /**
     * 时间戳转换成指定格式日期
     * eg.dateFormat(11111111111111, 'Y年m月d日 H时i分')
     * → "2322年02月06日 03时45分"
     */
    dateFormat(timestamp, fmt = "yyyy-MM-dd HH:mm:ss") {
        if (!timestamp) {
            return;
        }

        return new Date().Format(timestamp, fmt);
    },

    /**
     获取数组对象中某一属性值的集合


     console.log(getAttrs(user,'id')); //  [1, 2, 3]
     console.log(getAttrs(user,'name')); //  ["李四", "张三", "李五"]
     */
    getAttrs: function (array, attr) {
        /**
         *
         * var user = [
         {
             id: 1,
             name: "李四"
             },
         {
                 id: 2,
                 name: "张三"
             },
         {
                 id: 3,
                 name: "李五"
             }
         ]

         一、from方法
         var userName = Array.from(user,({name})=>name);
         console.log(userName); // ["李四", "张三", "李五"]

         二、map方法
         var userName = user.map((item)=>{
            return item.name;
        })
         console.log(userName); // ["李四", "张三", "李五"]

         三、forEach方法
         var userName = [];
         user.forEach((item)=>{
            userName.push(item.name);
         })
         console.log(userName); // ["李四", "张三", "李五"]
         */
        const arr = array.map((item) => {
            return item[attr];
        });
        return arr;
    },

    /**
     *  检查支付的状态
     *  payStatus: string
     *
     *  payStatus : 1 已支付, 0 未支付
     *
     *  return : bool, 已支付=> true, 未支付=> false
     */
    checkIsPayed: (status) => {
        return status == payStatus.payed;
    },

    /**
     * 获取wx Code
     async getWxCode() {
        const res = await api.login()
        console.log(res.code)
    }
     */

    getWxCode: function () {
        return new Promise((resolve, reject) => {
            index.login((res) => {
                if (res.code) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
    },
    setStorage: function (key, value) {
        // var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
        // var valueDate = JSON.stringify({
        //   val: value,
        //   timer: curtime,
        // });
        // try {
        //   window.localStorage.setItem(key, valueDate);
        // } catch (e) {
        //
        //   // 兼容性写法
        //   if (isQuotaExceeded(e)) {
        //     console.log("Error: 本地存储超过限制");
        //     localStorage.clear();
        //   } else {
        //     console.log("Error: 保存到本地存储失败");
        //   }
        // }


        window.localStorage.setItem(key, value);

    },

    getStorage: function (key) {
        // var exp = 60 * 60 * 24; // 一天的秒数
        // if (localStorage.getItem(key)) {
        //   var vals = localStorage.getItem(key); // 获取本地存储的值
        //   console.log('v', vals)
        //   var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
        //   // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
        //   var isTimed = new Date().getTime() - dataObj.timer > exp;
        //   if (isTimed) {
        //     console.log("存储已过期");
        //     localStorage.removeItem(key);
        //     return null;
        //   } else {
        //     var newValue = dataObj.val;
        //   }
        //   return newValue;
        // } else {
        //   return null;
        // }

        return localStorage.getItem(key)
    },

    /**
     * 校验手机号码格式
     * 正确
     * 错误
     * @returns {boolean}
     * */
    checkPhone: function (phone) {
        return /^1[34578]\d{9}$/.test(phone);
    },

    /**
     * 校验身份证号码格式
     * 正确
     * 错误
     * @returns {boolean}
     * */
    checkIdNumber: function (idNum) {
        // console.log('idNum', id)
        // return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum);
        return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idNum);
    },

    /**
     * 获取用户信息
     **/
    getUserInfo: function () {
        return JSON.parse(this.getStorage("users") || "{}") || {};
    },



    /**
     * 获取用户是否登录
     */
    getIsLogin: function () {
        var exp = 21600000;
        if (localStorage.getItem('isLogin')) {
            var vals = localStorage.getItem('isLogin'); // 获取本地存储的值

            var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
            // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
            var isTimed = new Date().getTime() - dataObj.timer > exp;
            if (isTimed) {
                console.log("存储已过期");
                localStorage.clear()
                return false;
            } else {
                var newValue = dataObj.val;
                // console.log('v', newValue)
                return newValue;
            }

        } else {
            return false;
        }

    },

    /* 设置用户登录状态 */
    setIsLogin: function (value) {
        var curtime = new Date().getTime();//获取当前时间
        localStorage.setItem('isLogin', JSON.stringify({val: value, timer: curtime}));//转换成json字符串序列
    },


    /**
     * 查询url的拼接参数
     * @param name 指定参数
     */
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },

    /**
     *
     适应以下两种模式，来获取url参数值：
     /User/vip_card_manager/useless/219/id/18
     /User/vip_card_manager?useless=219&id=18

     console.log(getQueryString("useless"));//=> 219
     * @param name
     * @returns {string|null}
     */
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var q = window.location.pathname.substr(1).match(reg_rewrite);
        if (r != null) {
            return unescape(r[2]);
        } else if (q != null) {
            return unescape(q[2]);
        } else {
            return null;
        }
    },



};
