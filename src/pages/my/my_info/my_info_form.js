import React, {Component} from 'react';
import {List, InputItem, Button, Picker, Toast} from 'antd-mobile';

import {createForm} from 'rc-form';
import utils from '../../../utils/utils';
import request from "../../../utils/request";
import {relationType} from "../../../utils/constants";


class MyInfoForm extends Component {



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
        this.props.form.validateFields({ force: true },(err, values) => {
            if (!err) {
                if (typeof values['sex']==='undefined'){
                    Toast.fail('请选择性别',1);
                    return
                }

                if (typeof values['relationType']==='undefined'){
                    Toast.fail('请选择人际关系类型',1);
                    return
                }


                if (typeof values['married']==='undefined'){
                    Toast.fail('请选择婚否类型',1);
                    return
                }

                values.married = Boolean(values.married[0])

                values.relationType= values.relationType[0]
                values.sex= values.sex[0]



                const customerId = utils.getUserInfo().customerId+''

                values.customerId= customerId

                request(`/reception/patient/add`, {...values}, "POST").then((res) => {
                    if (res.code == 200) {
                        Toast.success('新增成功',1);
                        this.props.history.goBack()
                    } else {
                        Toast.fail(res.message)
                    }
                })

            }else {
                Toast.fail('输入有误，请检查输入无误后再提交');
            }
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div className='myform'>
                <form>
                    <List>
                        <InputItem
                            placeholder="请输入体检人"
                            {...getFieldProps('patientName', {
                                rules: [
                                    {required: true, message: '请输入体检人'},
                                ]
                            })}
                            error={getFieldError('patientName')}
                            onErrorClick={() => {
                                // 接收到验证失败的提示，点击错误时展示
                                Toast.fail(getFieldError('patientName'))
                            }}
                        >
                            体检人
                        </InputItem>

                        <Picker data={[
                            {label:'男', value:"男"},
                            {label:'女', value:"女"},
                        ]}
                                cols={1}
                                {...getFieldProps('sex')}
                        >
                            <List.Item arrow="horizontal">性别</List.Item>
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
                            placeholder="请输入体检人电话"
                            error={getFieldError('mobile')}
                            onErrorClick={() => {
                                // 接收到验证失败的提示，点击错误时展示
                                Toast.fail(getFieldError('mobile'))
                            }}
                        >体检人电话</InputItem>

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
                        >身份证号</InputItem>


                        <Picker data={[
                            {label:'是', value:1},
                            {label:'否', value:0},
                        ]}
                                cols={1}
                                {...getFieldProps('married')}
                        >
                            <List.Item arrow="horizontal">婚否类型</List.Item>
                        </Picker>


                        <Picker data={relationType}
                                cols={1}
                                {...getFieldProps('relationType')}
                        >
                            <List.Item arrow="horizontal">人际关系类型</List.Item>
                        </Picker>

                    </List>

                    <div className='newinfo'>
                        <Button type='primary' onClick={this.onClick}>确定</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default createForm()(MyInfoForm);