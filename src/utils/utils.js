import index from './getWxCode.js';
import moment from 'moment';

export default {

    /**
     * moment 转 日期字符串
     * @param text
     * @param format
     * @returns {string} 日期字符串
     */
    formatTime:function(text, format='YYYY-MM-DD') {
        return moment(text).format(format);
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
     * 获取wx Code
     async getWxCode() {
        const res = await api.login()
        console.log(res.code)
    }
     */

    getWxCode: function () {
        return new Promise((resolve, reject) => {
            index.login(res => {
                if (res.code) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        });
    }
}



