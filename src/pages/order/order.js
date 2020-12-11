import React, {Component} from 'react';
import {List, InputItem, Button, DatePicker, Calendar, Picker, TextareaItem, Toast, Modal} from 'antd-mobile';
import {createForm} from 'rc-form';

import utils from '../../utils/utils';
import request from "../../utils/request";
import './order.less'
import {Link} from "react-router-dom";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const nextDay = new Date(nowTimeStamp + 86400000); // 下一日

const time = utils.getTime();


const formatTime = utils.formatTime;


const extra = {
    '2017/07/15': {info: '休', disable: true},
};


extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = {info: '休', disable: true};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = {info: '休', disable: true};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = {info: '休', disable: true};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = {info: '休', disable: true};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10)] = {info: '休', disable: true};

Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
        extra[+date] = info;
    }
});


class Order extends Component {

    state = {
        patients: [],
        districts: [],
        orders: [],
        disabled: false,// 禁用选择订单框
        disabledCode: false, // 禁用预约码文本框

        show: false, // 展示日历组件框

        loading:false
    }

    componentDidMount() {
        // 院区列表
        request(`/system/dept/districtList`, {}, "POST").then((res) => {
            if (res.code == 200) {
                const districts = res.data.map((item) => {
                    const {deptId, deptName,} = item
                    return {
                        label: deptName,
                        value: deptId,
                    }
                })
                this.setState({
                    districts
                });
            } else {
                Toast.fail(res.message)
            }
        })

        const customerId = utils.getUserInfo().customerId
        // 体检人列表
        request(`/reception/patient/search?customerId=${customerId}`, {}, "POST").then((res) => {
            if (res.code == 200) {
                const patients = res.data.map((item) => {
                    const {patientId, patientName, ...rest} = item
                    return {
                        label: patientName,
                        value: patientId,
                        ...rest
                    }
                })


                patients.push({
                    label:<Link to={{
                        pathname:'/my/my_info_form',
                    }} style={{display:'flex', justifyContent:'center', zIndex:999}}>添加体检人</Link>,
                    value:'addPatient'
                })

                this.setState({
                    patients
                });
            } else {
                Toast.fail(res.message)
            }
        })

        // 订单列表(通过客户ID获取可用订单详情列表)
        request(`/orderDetail/availableList/${customerId}`, {}, "POST").then((res) => {
            if (res.code == 200) {
                const orders = []

                res.data && res.data.forEach((item) => {
                    const {orderId, comboName, comboId, orderDetailId, ...rest} = item

                    orders.push({
                        label: comboName,
                        value: orderId + '-' + comboId + '-' + orderDetailId,
                        ...rest
                    })
                })


                orders.push({
                    label:<a href='/home' style={{display:'flex', justifyContent:'center', zIndex:999}}>添加套餐</a>,
                    value:'addTaocan'
                })

                this.setState({
                    orders
                });
            } else {
                Toast.fail(res.message)
            }
        })

        const details = this.props.location.state || {}

        if (details.my_order_detail) {
            console.log('de', details)
            // 获取 我的订单详情
            const {my_order_detail: {orderId, comboId, orderDetailId, code}} = details


            if (orderId) {
                this.disablePicker();
            }

            if (code) {// 有预约码,获取套餐详情
                this.getTaoCanInfoByCode(code, () => {
                    this.disabledCode();
                })

            }
        }

    }

    // 禁用体检人选择框
    disablePicker() {
        this.setState({
            disabled: true
        });
    }

    // 不禁用体检人选择框
    unDisablePicker() {
        this.setState({
            disabled: false
        });
    }


    // 禁用预约码输入框
    disabledCode() {
        this.setState({
            disabledCode: true
        })
    }


    /**
     * 通过预约码获取套餐详情
     *
     * code: 预约码
     * successCall?: 成功回调方法
     * failCall? : 失败回调方法
     * */
    getTaoCanInfoByCode = (code, successCall, failCall) => {

        // test
        /*    code = 1226032170976
        *            1221042470711
        *
        * */

        request(`/reception/appointment/getDetailByCode?code=${code}`, {}, "POST").then((res) => {
            if (res.code == 200) {

                const {orderId, comboId, orderDetailId} = res.data

                this.props.form.setFieldsValue({
                    orderId: [orderId + '-' + comboId + '-' + orderDetailId],
                    code: code
                });

                successCall && successCall()

            } else {
                Toast.fail(res.message)
                failCall && failCall()
            }
        })
    }

    /**
     * 预约码文本框输入
     * value: 预约码输入框的值 "string"
     *
     * return: void
     * */
    onCodeInputBlur = (value) => {
        if (value) {
            this.getTaoCanInfoByCode(value, () => {
                this.disablePicker();
            }, () => {
                this.unDisablePicker()
                // 无效的预约码, 清空预约码(防抖节流, 不用清除预约码)
                this.props.form.setFieldsValue({
                    code: ''
                });
            })


        } else {
            this.unDisablePicker()
        }
    }


    renderBtn(text, config = {}) {
        const startTime = this.state.startTime // 开始时间

        console.log('config', config)
        return (
            <List.Item arrow="horizontal"
                       extra={startTime ? <span>{startTime && startTime.toLocaleDateString()}</span> : '请选择'}
                       onClick={() => {
                           document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                           this.setState({
                               show: true,
                               config,
                           });
                       }}

            >
                {text}
            </List.Item>
        );
    }

    onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime,
        });
    }


    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: undefined,
            // endTime: undefined,
        });
    }

    getDateExtra = date => extra[+date];


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

    // 体检人选择
    onPickerChange = (val) => {
        if (val[0]=='addPatient'){ // 如果 选中项为添加体检人, 弹框提示
            Toast.fail('请点击添加体检人链接');
            return;
        }

        let info = this.state.patients.find((item) => item.value == val[0])
        console.log('info', info)
        this.props.form.setFieldsValue({
            patientId: [info.value],
            phone: info.mobile,
            idNumber: info.idNumber
        });


    }


    onClick = (e) => {
        e.preventDefault();
        this.props.form.validateFields({force: true}, (err, values) => {
            if (!err) {

                if (typeof values['deptId'] === 'undefined') {
                    Toast.fail('请选择分院', 1);
                    return
                }


                if (typeof values['patientId'] === 'undefined') {
                    Toast.fail('请选择体检人', 1);
                    return
                }


                if (typeof values['orderId'] === 'undefined') {
                    Toast.fail('请选择套餐', 1);
                    return
                }


                if (typeof this.state.startTime === 'undefined') {
                    Toast.fail('请选择日期', 1);
                    return
                }



                values.appointmentDate = formatTime(this.state.startTime)

                const customerId = utils.getUserInfo().customerId
                values.deptId = values.deptId[0]
                values.patientId = values.patientId[0]
                const orders = values.orderId[0].split('-')
                values.orderId = orders[0]
                values.comboId = orders[1]
                values.orderDetailId = orders[2]

                values.customerId = customerId

                // console.log('values',values)
                this.setState({
                    loading:true
                })

                request(`/reception/appointment/wechatAdd`, {...values}, "POST").then((res) => {
                    if (res.code == 200) {
                        Toast.success('预约成功', 1);

                        this.setState({
                            loading:false
                        })
                        this.props.history.push('/my/my_appoint');

                    } else {
                        Toast.fail(res.message)
                        this.setState({
                            loading:false
                        })
                    }
                })

            } else {
                Toast.fail('输入有误，请检查输入无误后再提交');
            }
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        const {districts, patients, orders} = this.state


        return (
            <div className='myform order'>
                <form>
                    <List>
                        <InputItem
                            disabled={this.state.disabledCode}
                            placeholder="请输入预约码"
                            {...getFieldProps('code', {})}
                            onBlur={this.onCodeInputBlur}

                        >预约码</InputItem>


                        <Picker data={districts}
                                cols={1}
                                {...getFieldProps('deptId')}
                        >
                            <List.Item arrow="horizontal">选择分院</List.Item>
                        </Picker>


                        {/*                        <DatePicker
                            mode="datetime"
                            extra="Optional"
                            minDate={new Date(time.year, time.month, time.day, 0, 0, 0)}
                            {
                                ...getFieldProps('appointmentDate', {
                                    initialValue: now
                                })
                            }
                        >
                            <List.Item arrow="horizontal">选择日期</List.Item>
                        </DatePicker>*/}

                        {this.renderBtn('选择日期', {type: 'one'})}


                        <Calendar
                            {...this.state.config}

                            visible={this.state.show}
                            onCancel={this.onCancel}
                            onConfirm={this.onConfirm}
                            getDateExtra={this.getDateExtra}
                            minDate={new Date(nextDay )}
                            /*                            maxDate={ new Date(+now + 345600000)}*/
                        />


                        <Picker data={patients}
                                cols={1}
                                prefixCls='patient' /*	自定义类名 */
                                {...getFieldProps('patientId')}
                                onChange={this.onPickerChange}
                                indicatorStyle={{zIndex:0}}  /*	indicator 样式 */
                        >
                            <List.Item arrow="horizontal">体检人</List.Item>
                        </Picker>


                        <Picker data={orders}
                                cols={1}
                                {...getFieldProps('orderId')}
                                disabled={this.state.disabled}
                                prefixCls='order' /*	自定义类名 */

                                onChange={(val) => {
                                    if (val[0]=='addTaocan'){ // 如果 选中项为添加套餐, 弹框提示
                                        Toast.fail('请点击添加套餐链接');
                                        return;
                                    }


                                    // 选择套餐, 不能输入预约码
                                    this.props.form.setFieldsValue({
                                        orderId: val,
                                    });
                                    this.disabledCode()
                                }}
                                indicatorStyle={{zIndex:0}}  /*	indicator 样式 */

                        >
                            <List.Item arrow="horizontal">选择套餐</List.Item>
                        </Picker>

                        <InputItem
                            disabled
                            {...getFieldProps('phone', {
                                rules: [
                                    {
                                        validator: this.validCheckPhone,
                                    }
                                ]
                            })}
                            type="number"
                            maxLength={11}
                            placeholder="请输入体检人电话"
                            /*                            error={getFieldError('phone')}
                                                        onErrorClick={() => {
                                                            // 接收到验证失败的提示，点击错误时展示
                                                            Toast.fail(getFieldError('phone'))
                                                        }}*/
                        >体检人电话</InputItem>


                        <InputItem
                            disabled
                            {...getFieldProps('idNumber', {
                                /*                                rules: [
                                                                    {
                                                                        validator: this.validCheckIdNumber,
                                                                    }
                                                                ]*/
                            })}
                            maxLength={18}
                            placeholder="请输入身份证号"
                            // error={getFieldError('id_number')}
                            // onErrorClick={() => {
                            //     // 接收到验证失败的提示，点击错误时展示
                            //     Toast.fail(getFieldError('id_number'))
                            // }}
                        >身份证号</InputItem>

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
                        <Button loading={this.state.loading} onClick={this.onClick} style={{width: '100%', fontSize:18, backgroundColor: '#009999', color: '#ffffff'}}>
                            确定预约
                        </Button>
{/*                        <Button type='primary'
                                style={{width: '100%', borderRadius: 0, backgroundColor: '#009999', color: '#ffffff'}}
                                onClick={this.onClick}>确定预约</Button>*/}
                    </div>
                </form>
            </div>
        );
    }
}

export default createForm()(Order);