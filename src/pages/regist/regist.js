import React, {Component} from 'react';
import {InputItem, List, Picker, Toast} from 'antd-mobile';
import {createForm} from "rc-form";
import {connect} from "react-redux"; // 连接器

import './regist.less'
import utils from "../../utils/utils";
import request from "../../utils/request";


const fail = Toast.fail
const success = Toast.success

class Regist extends Component {

    state = {

    }

     componentDidMount() {

        const mobile = this.props.location.state&&this.props.location.state.mobile||''
         if (mobile&&mobile.length>0){
             // 使用 setFieldsValue 方法进行设置值
             this.props.form.setFieldsValue({
                 mobile:mobile,
             });

         }
     }


    // 校验联系电话
    validCheckPhone = (rule, value, callback) => {
        if (utils.checkPhone(value)) {
            callback();
        } else {
            callback(new Error('请输入正确的手机号'));
        }
    };

    // 校验身份证号
    validCheckIdNumber = (rule, value, callback) => {
        if (utils.checkIdNumber(value)) {
            callback();
        } else {
            callback(new Error('请输入正确的身份证号'));
        }
    }


    onSubmit = (e) => {
        e.preventDefault()
        const code = this.props.code
        const lastPath =  utils.getStorage('path')

        this.props.form.validateFields({ force: true },(err, values) => {
            if (!err) {
               if (typeof values['sex']==='undefined'){
                    Toast.fail('请选择性别',1);
                    return
                }


                if (typeof values['married']==='undefined'){
                    Toast.fail('请选择婚否类型',1);
                    return
                }

                values.married = Boolean(values.married[0])

                values.sex= values.sex[0]

                request(`/reception/customer/register`, {...values, code: code}, "POST").then((res) => {

                    if (res.code===200){
                        success('注册成功')

                        const data = res.data
                        // 保存用户信息
                        utils.setStorage('users', JSON.stringify(data))
                        // utils.setIsLogin(Boolean(data.mobile))
                        
                        utils.setStorage('isLogin', Boolean(data.mobile))

                        this.props.history.push(lastPath);
                    }else {
                        fail(res.message)
                        // fail('注册失败')
                    }
                })

            }else {
                Toast.info('输入有误，请检查输入无误后再提交');
            }
        });

    }


    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
                <div id='login-form'>
                    <div className='form'>
                        <div>
                            <img src="/hysy.png" style={{height:'45px'}}/>
                            <h4 style={{color:'#ffffff', fontWeight:'normal',marginTop:'15px', letterSpacing:'2px', marginBottom:'40px'}}>新用户初次使用请先注册</h4>
                        </div>
                        <List>
                            <InputItem
                                placeholder="请输入姓名"
                                {...getFieldProps('customerName', {
                                    rules: [
                                        {required: true, message: '请输入姓名'},
                                    ]
                                })}
                                maxLength={4}
                                error={getFieldError('customerName')}
                                onErrorClick={() => {
                                    // 接收到验证失败的提示，点击错误时展示
                                    Toast.fail(getFieldError('customerName'))
                                }}
                            >

                            </InputItem>

                            <Picker data={[
                                {label:'男', value:"男"},
                                {label:'女', value:"女"},
                            ]}
                                    cols={1}
                                    {...getFieldProps('sex')}
                                    extra='请选择性别'
                            >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>

                            <InputItem
                                {...getFieldProps('mobile', {
                                    rules: [
                                        {
                                            validator: this.validCheckPhone,
                                        }
                                    ]
                                })}
                                type="number"
                                maxLength={11}
                                placeholder="请输入手机号"
                                error={getFieldError('mobile')}
                                onErrorClick={() => {
                                    // 接收到验证失败的提示，点击错误时展示
                                    Toast.fail(getFieldError('mobile'))
                                }}
                            ></InputItem>

                            <InputItem
                                {...getFieldProps('idNumber', {
                                    rules: [
                                        {
                                            validator: this.validCheckIdNumber,
                                        }
                                    ]
                                })}
                                maxLength={18}
                                placeholder="请输入身份证号"
                                error={getFieldError('idNumber')}
                                onErrorClick={() => {
                                    // 接收到验证失败的提示，点击错误时展示
                                    Toast.fail(getFieldError('idNumber'))
                                }}
                            ></InputItem>


                            <Picker data={[
                                {label:'是', value:1},
                                {label:'否', value:0},
                            ]}
                                    cols={1}
                                    {...getFieldProps('married')}
                                    extra='请选择婚否'
                            >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </List>
                        <div className="mui-content-padded">
                            <button id='login' onClick={this.onSubmit} className="mui-btn mui-btn-block mui-btn-primary">注册</button>
                        </div>
                    </div>
                </div>
                <div className='login'>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        code:state.login.code,
    }
}

export default connect(mapStateToProps)(createForm()(Regist));
