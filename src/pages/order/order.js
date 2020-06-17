import React, {Component} from 'react';
import {List, InputItem, Button, DatePicker,Picker, TextareaItem ,Toast} from 'antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';

import {createForm} from 'rc-form';
import utils from '../../utils/utils';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const formatTime = utils.formatTime;

class Order extends Component {


    // 校验联系电话
    validCheckPhone = (rule, value, callback) => {
        if ((/^1[34578]\d{9}$/.test(value))) {
            callback();
        } else {
            callback(new Error('请输入正确的手机号'));

        }
    };


    onClick = (e) => {
        e.preventDefault();
        this.props.form.validateFields({ force: true },(err, values) => {
            if (!err) {

                if (typeof values['district3']==='undefined'){
                    Toast.fail('请选择分院',1);
                    return
                }

                if (typeof values['district4']==='undefined'){
                    Toast.fail('请输入选择套餐',1);
                    return
                }

                values.date = formatTime(values.date)

                console.log(values)

            }else {
                Toast.fail('输入有误，请检查输入无误后再提交',1);
            }
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        return (
            <div className='relative order'>
                <form>
                    <List>
                        <DatePicker
                            mode="date"
                            extra="Optional"
                            {
                                ...getFieldProps('date', {
                                    initialValue: now
                                })
                            }
                        >
                            <List.Item arrow="horizontal">选择日期</List.Item>
                        </DatePicker>

                        <Picker data={district}
                                cols={1}
                                {...getFieldProps('district3')}
                        >
                            <List.Item arrow="horizontal">选择分院</List.Item>
                        </Picker>


                        <InputItem
                            placeholder="请输入预约人"
                            {...getFieldProps('name', {
                                rules: [
                                    {required: true, message: '请输入预约人'},
                                ]
                            })}
                            error={getFieldError('name')}
                            onErrorClick={() => {
                                // 接收到验证失败的提示，点击错误时展示
                                Toast.fail(getFieldError('name'))
                            }}
                        >
                            预约人
                        </InputItem>

                        <Picker data={district}
                                cols={1}
                                {...getFieldProps('district4')}
                        >
                            <List.Item arrow="horizontal">选择套餐</List.Item>
                        </Picker>


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
                            placeholder="请输入预约人电话"
                            error={getFieldError('phone')}
                            onErrorClick={() => {
                                // 接收到验证失败的提示，点击错误时展示
                                Toast.fail(getFieldError('phone'))
                            }}
                        >预约人电话</InputItem>



                        <TextareaItem
                            title="预约提醒"
                            placeholder='请输入预约内容...'
                            {...getFieldProps('count', {
                                initialValue: '',
                            })}

                            rows={5}
                            count={100}
                            error={getFieldError('count')}
                            onErrorClick={() => {
                                // 接收到验证失败的提示，点击错误时展示
                                Toast.fail(getFieldError('count'))
                            }}
                       />
                    </List>

                    <div className="fixed-bottom">
                        <Button type="primary" type='warning' style={{width: '100%', borderRadius: 0}}
                                onClick={this.onClick}>确定预约</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default createForm()(Order);