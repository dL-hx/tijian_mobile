import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import {Link} from "react-router-dom";
import {connect} from "react-redux"; // 连接器

import './login.less'
import utils from "../../utils/utils";
import request from "../../utils/request";


const fail = Toast.fail
const success = Toast.success


class Login extends Component {

    state = {
        count: 60,
        isNotActed: true,

        account: '',

        code: '',
    }


    async componentDidMount() {
        const api = await utils.getWxCode()
        const wxcode = api.code
        // console.log('==wxcode==', wxcode)
        this.props.setWxCodeAction(wxcode)



        // this.lastPath = this.props.location.state.from&&this.props.location.state.from.pathname||"/login"// 上一级路由
        this.lastPath = utils.getStorage('path')
    }

    onSubmit = (e) => {
        // 阻止提交事件默认行为
        e.preventDefault()

        const {account, code,} = this.state

        // console.log('lastPath', this.lastPath)

        if (account === '' || code === '')
            // return fail('输入有误，请检查输入无误后再提交');
            return Toast.info('请先输入手机号码')

        request(`/reception/customer/login`, {mobile: account, validCode: code}, "POST").then((res) => {
            if (res.code === 200) {
                success('登录成功')
                const data = res.data
                // 保存用户信息
                utils.setStorage('users', JSON.stringify(data))
                utils.setStorage('isLogin', Boolean(data.mobile))
                // utils.setIsLogin(Boolean(data.mobile))
                this.props.history.push(this.lastPath);
            } else {
                fail(res.message)
                if (res.code === 201005) {
                    this.props.history.push({pathname: '/regist', state: {mobile: account}});
                }
            }
        })


    }

    onInputChange = (name, e) => {
        const val = e.target.value
        this.setState({
            [name]: val.trim()
        });
    }

    // 获取验证码
    count = () => {
        const {count} = this.state;
        if (count === 1) {
            this.setState({
                count: 60,
                isNotActed: true,
            });
        } else {
            this.setState({
                count: count - 1,
                isNotActed: false,
            });
            setTimeout(this.count.bind(this), 1000);
        }
    }

    onCaptcha = () => {
        const account = this.state.account

        if (!utils.checkPhone(account)) {
            Toast.info('请输入手机号后获取验证码')
            return;
        }

        const {isNotActed} = this.state;
        const isActed = !isNotActed;

        if (isActed) {
            return;
        }

        // 获取短信验证码
        request(`/sms/getverifycode`, {phone: account}).then((res) => {
            success("获取验证码成功")
        })

        this.count();
    }

    onChange = (e) => {
        e.persist()
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        return (
            <div>
                <div id='login-form'>
                    <div className='form'>
                        <div>
                            <img src="/hysy.png" style={{height: '45px'}}/>
                            <h4 style={{
                                color: '#ffffff',
                                fontWeight: 'normal',
                                marginTop: '15px',
                                letterSpacing: '2px',
                                marginBottom: '40px'
                            }}></h4>
                        </div>
                        <div className="mui-input-row">
                            <img src={require('./TEL.png')} data-preview-src="" data-preview-group="1"/>
                            <input onChange={(e) => this.onInputChange('account', e)} type="tel" maxLength="11"
                                   className="mui-input-clear mui-input" placeholder="请输入手机号"
                                   style={{fontSize: '15px', color: '#ffffff'}}/>
                        </div>

                        <div className="mui-input-row">
                            <img src={require('./MM.png')} data-preview-src="" data-preview-group="1"/>
                            <input onChange={(e) => this.onInputChange('code', e)} type="tel" maxLength="4"
                                   className="mui-input-clear mui-input" placeholder="请输入验证码"
                                   style={{fontSize: '15px', color: '#ffffff'}}/>
                            <button type="button" className="mui-btn mui-btn-primary mui-btn-outlined"
                                    onClick={this.onCaptcha}>
                                {
                                    this.state.isNotActed
                                        ? '获取验证码'
                                        : `${this.state.count} 秒后重发`
                                }
                            </button>
                        </div>
                        <div className="mui-content-padded">
                            <button id='login' onClick={this.onSubmit}
                                    className="mui-btn mui-btn-block mui-btn-primary">登录
                            </button>
                            <Link to={
                                {
                                    pathname: '/regist',
                                }
                            }>没有账号? 马上注册</Link>
                        </div>
                    </div>
                </div>
                <div className='login'></div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setWxCodeAction: (code) => {
            // 利用 dispatch 发送一个action
            // 传递action 对象 我们要定义一个type 属性
            // data 中的值就是所带的参数
            dispatch({
                type: 'setWxCode',
                data: code
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);
