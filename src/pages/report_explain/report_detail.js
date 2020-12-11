import React, {Component} from 'react';
import {List, InputItem, Button, DatePicker, Picker, TextareaItem, Toast} from 'antd-mobile';

import {createForm} from 'rc-form';
import utils from '../../utils/utils';
import request from "../../utils/request";
import * as defaultSetting from "../../defaultSetting";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const time = utils.getTime();

const formatTime = utils.formatTime;

class ReportDetail extends Component {

    state = {

    }


    componentDidMount() {
        const details= this.props.location.state || {}

        if (details.report_detail){
            // 获取 我的报告详情
            // console.log('re', details)
            const {report_detail:{name,yuan}} = details

            this.props.form.setFieldsValue({
                name:name,
                price:defaultSetting.yuan + yuan
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


    onClick = (e) => {
        e.preventDefault();
        this.props.form.validateFields({force: true}, (err, values) => {
            if (!err) {

                values.appointmentDate = formatTime(values.appointmentDate)
                const customerId = utils.getUserInfo().customerId

                values.customerId = customerId

               /* request(`/reception/appointment/wechatAdd`, {...values}, "POST").then((res) => {
                    if (res.code == 200) {
                        Toast.success('新增成功', 1);

                        this.props.history.push('/my/my_appoint');
                    } else {
                        Toast.fail(res.message)
                    }
                })*/

                console.log('value', values)

                Toast.success('预约成功', 1);

                // 回退上一级页面, 并刷新
                this.props.history.goBack()

            } else {
                Toast.fail('输入有误，请检查输入无误后再提交');
            }
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        return (
            <div className='myform order'>
                <form>
                    <List>

                        <InputItem
                            editable={false}
                            type="text"
                            {...getFieldProps('name', {
                                rules: [

                                ]
                            })}
                        >预约医生</InputItem>


                        <InputItem
                            {...getFieldProps('phone', {
                                rules: [
                                    {
                                        validator: this.validCheckPhone,
                                    }
                                ]
                            })}
                            type="number"
                            maxLength={11}
                            placeholder="请输入联系电话"
                            error={getFieldError('phone')}
                            onErrorClick={() => {
                                // 接收到验证失败的提示，点击错误时展示
                                Toast.fail(getFieldError('phone'))
                            }}
                        >联系电话</InputItem>


                        <DatePicker
                            mode="datetime"
                            extra="Optional"
                            minDate={new Date(time.year, time.month, time.day, 0, 0, 0)}
                            {
                                ...getFieldProps('appointmentDate', {
                                    initialValue: now
                                })
                            }
                        >
                            <List.Item arrow="horizontal">解读日期</List.Item>
                        </DatePicker>


                        <InputItem
                            editable={false}
                            type="text"
                            {...getFieldProps('price', {
                                rules: [

                                ]
                            })}
                        >解读费用</InputItem>


{/*                        <InputItem
                            disabled
                            {...getFieldProps('idNumber', {
                                                              rules: [
                                                                    {
                                                                        validator: this.validCheckIdNumber,
                                                                    }
                                                                ]
                            })}
                            maxLength={18}
                            placeholder="请输入身份证号"
                             error={getFieldError('id_number')}
                             onErrorClick={() => {
                               // 接收到验证失败的提示，点击错误时展示
                                 Toast.fail(getFieldError('id_number'))
                            }}
                        >身份证号</InputItem>*/}

                        <TextareaItem
                            title="备注"
                            placeholder='请输入备注内容...'
                            {...getFieldProps('remark', {
                                initialValue: '',
                            })}

                            rows={5}
                            count={100}
                        />
                    </List>

                    <div className="fixed-bottom" style={{zIndex:3}}>
                        <Button style={{width: '100%', borderRadius: 0, backgroundColor:'#009999', color:'#ffffff'}}
                                onClick={this.onClick}>确定预约</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default createForm()(ReportDetail);
