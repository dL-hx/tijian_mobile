class Method {
    constructor() {
        this.code = null
        this.winUrl = null
    }

    login(success) {
        const getUrlCode = ()=>{ // 截取url中的code方法
            var url = window.location.search
            this.winUrl = url

            var theRequest = {}
            if (url.indexOf("?") !== -1) {
                var str = url.substr(1)
                var strs = str.split("&")
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
                }
            }
            return theRequest
        }

        var local = "http://tj.wiimedia.top" // 获取页面url
        var appid = 'wxef8c03cfd45112b5'
        let code = this.code = getUrlCode().code // 截取code
        if (this.code === null || this.code === '') { // 如果没有code，则去请求
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
            code = this.code = getUrlCode().code
        }

        // 你自己的业务逻辑
        success&&success({
            code:code
        })

    }
}
export default new Method();