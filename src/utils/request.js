import axios from 'axios';
//对于post请求可以统一设置一个请求头，后面所有post请求就可以不用单独设置请求头了
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;


// path:string 接口的路径
// data:obj 接口的传递的参数
// method: 'GET'| 'POST'
// API_ROOT?:string, 暴露接口, 用以不同接口的调用配置,当有其他人开发接口时候, 可以指定第四个参数, 替换默认的`baseURL` 的配置
export default function request(path, data = {}, method = 'GET', baseURL) {

    baseURL = baseURL||'http://phy.wiimedia.top'

    const axiosObj = {
        url: path,
        method,
        // crossDomain: true,
        baseURL: baseURL,
        timeout: 5000,
    };

    if (method === 'GET') {
        axiosObj.params = data;
    }

    if (method === 'POST') {
        axiosObj.data = data;
    }

    return new Promise((resolve, reject) => {
        axios(axiosObj).then(response => {
            const res = response.data;
            resolve(res)

        }).catch(error => {
           console.log('error', error)
            reject(error);
        });
    });
}

// axios 文档 :https://www.kancloud.cn/yunye/axios/234845
