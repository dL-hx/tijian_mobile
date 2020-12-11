import React, {Component} from 'react';
import {List, InputItem, Button, Picker, Modal, Toast} from 'antd-mobile';
import './my_info_form_look.less'
import {createForm} from 'rc-form';
import utils from "../../../utils/utils";
import request from "../../../utils/request";
import {relationType} from "../../../utils/constants";


const alert = Modal.alert;

class MyInfoFormLook extends Component {


    state = {
        isUpdate: true,
        disabled: true
    }

    componentDidMount() {
        if (this.props.history.location.state) {
            const item = this.props.history.location.state.item || {}
            if (Boolean(item)) {
                const {married, relationType, sex, ...rest} = item
                console.log('married', married)
                this.props.form.setFieldsValue({
                    married: [married ^ 0],
                    relationType: [relationType + ''],
                    sex: [sex + ''],
                    ...rest
                });
            }
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


    onDeleteMyInfoItem = (patientId, e) => {
        e.preventDefault();

        const customerId = utils.getUserInfo().customerId


        alert('删除', '确定删除这条信息?', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '删除',
                onPress: () => {
                    request(`/reception/patient/delete?customerId=${customerId}&patientId=${patientId}`, {}, "POST").then((res) => {
                        if (res.code == 200) {
                            Toast.success('删除信息成功')

                            // this.getMyInfoList()
                            this.props.history.goBack()
                        } else {
                            Toast.fail(res.message)
                        }
                    })
                }

            },
        ])
    }


    onUpdateMyInfoItem = (patientId, e) => {
        e.preventDefault();
        const { isUpdate }= this.state
        if (isUpdate){
            alert('编辑', '确定对这条信息进行编辑?', [
                {text: '取消', onPress: () => console.log('cancel')},
                {
                    text: '确定', onPress: () => {
                        this.setState((preState, props) => {
                            return {
                                isUpdate: !preState.isUpdate,
                                disabled: !preState.disabled,
                            }
                        });
                    }
                },
            ])
        }
        else{
            alert('保存', '确定对这条信息进行保存?', [
                {text: '取消', onPress: () => console.log('cancel')},
                {
                    text: '确定', onPress: () => {
                        this.props.form.validateFields({force: true}, (err, values) => {
                            if (!err) {
                                if (typeof values['sex'] === 'undefined') {
                                    Toast.fail('请选择性别', 1);
                                    return
                                }

                                if (typeof values['relationType'] === 'undefined') {
                                    Toast.fail('请选择人际关系类型', 1);
                                    return
                                }


                                if (typeof values['married'] === 'undefined') {
                                    Toast.fail('请选择婚否类型', 1);
                                    return
                                }

                                values.married = Boolean(values.married[0])

                                values.relationType = values.relationType[0]
                                values.sex = values.sex[0]
                                values.patientId = patientId


                                const customerId = utils.getUserInfo().customerId+""

                                values.customerId = customerId

                                request(`/reception/patient/updateByWeChat`, {...values}, "POST").then((res) => {
                                    if (res.code == 200) {
                                        Toast.success('编辑成功', 1);
                                        this.props.history.goBack()
                                    } else {
                                        Toast.fail(res.message)
                                    }
                                })

                            } else {
                                Toast.fail('输入有误，请检查输入无误后再提交');
                            }
                        });
                    }
                },
            ])
        }
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        const item = this.props.history.location.state.item || {}

        const hideflag = utils.getUserInfo().customerName == item.patientName // 隐藏按钮的标志

        return (
            <div className='myform my_info_form_look'>
                <form>
                    <List>
                        <InputItem
                            disabled={this.state.disabled}
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

                        <Picker
                            disabled={this.state.disabled}
                            data={[
                                {label: '男', value: "男"},
                                {label: '女', value: "女"},
                            ]}
                            cols={1}
                            {...getFieldProps('sex')}
                        >
                            <List.Item arrow="horizontal">性别</List.Item>
                        </Picker>

                        <InputItem
                            disabled={this.state.disabled}

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
                            disabled={this.state.disabled}

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


                        <Picker
                            disabled={this.state.disabled}
                            data={[
                                {label: '是', value: 1},
                                {label: '否', value: 0},
                            ]}
                            cols={1}
                            {...getFieldProps('married')}
                        >
                            <List.Item arrow="horizontal">婚否类型</List.Item>
                        </Picker>


                        <Picker
                            disabled={this.state.disabled}

                            data={relationType}
                            {...getFieldProps('relationType')}
                            cols={1}
                        >
                            <List.Item arrow="horizontal"
                                       style={{display: hideflag ? 'none' : 'block'}}>人际关系类型</List.Item>
                        </Picker>

                    </List>

                </form>
                <div className='fixed-bottom'>
                    <Button type="primary" style={{display: hideflag ? 'none' : 'block',flex: 2}}
                            onClick={this.onUpdateMyInfoItem.bind(this, item.patientId)}>{this.state.isUpdate ? '编辑' : '保存'}</Button>
                    <Button style={{display: hideflag ? 'none' : 'block', flex: 1}} type='warning'
                            onClick={this.onDeleteMyInfoItem.bind(this, item.patientId)}>删除</Button>
                </div>
            </div>
        );
    }
}

export default createForm()(MyInfoFormLook);