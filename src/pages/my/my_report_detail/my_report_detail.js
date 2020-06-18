import React, {Component} from 'react';
import './my_report_detail.less'

class MyReportDetail extends Component {
    constructor(props) {
        super(props);
        const item = props.history.location.state.item

        this.state = {
            item: item,
            list2:[
                {title:"胸廓", sub:'双侧对称无畸形'},
                {title:"心率", sub:'次/分'},
                {title:"心律", sub:'规整'},
                {title:"心音", sub:'无异常，各瓣膜区未闻及病理性杂音'},
                {title:"心界", sub:'不大'},
                {title:"肺", sub:'双肺未闻及病理性呼吸音'},
                {title:"腹部", sub:'未见异常'},
                {title:"肝脏", sub:'肋下未触及'},
                {title:"脾脏", sub:'肋下未触及'},
                {title:"胆囊", sub:'未见异常'},
                {title:"肾脏", sub:'双肾区无叩击痛'},
                {title:"神经系统", sub:'生理反射存在，病理反射未引出'},
            ],
            list3:[
                {title:"肝脏彩超", sub:'肝脏饱满，被膜光整，肝内可见多个大小不等类圆形低密度无回声区，边缘光整，较大者大小约：  cm。'},
                {title:"胆囊", sub:'大小正常，形态规则，壁毛糙'},
                {title:"脾脏", sub:'形态大小正常，实质回声均匀'},
                {title:"胰腺", sub:'大小、形态正常，回声均匀'},
                {title:"肾脏", sub:'双肾大小、形态正常，皮质部可见数个类圆形低密度无回声区，较大者大小约：膀胱壁光滑。'},
                {title:"甲状腺", sub:'形态正常,包膜光整,内部回声均匀。'},
            ]
        }
    }

    render() {
        const {item} = this.state
        return (
            <div className='my_report_detail'>
                <div className='nav'>
                    <h4>体检报告单</h4>
                    <h5>10000323424324 临潼分院</h5>

                </div>
                <div className='nav-title'>
                    姓名: {item.name} 性别: {item.age} 年龄: {item.sex}
                </div>

                <div className='main'>
                    <div className='main-title'>
                        <h4>健康总评</h4>
                    </div>

                    <div className='main-title'>
                        <h4>健康建议</h4>
                        <p>1、中医辨证;</p>
                        <p>中医健康指导;</p>
                    </div>

                    <div className='main-title'>
                        <h4>温馨提示</h4>
                        <p>综合以上健康建议，我们特别为您汇总了您的饮食、运动及心理指导。</p>
                        <p></p>
                        <p>【1】合理饮食：</p>
                        <p>（1）饮食清淡,低盐、低脂饮食，三餐规律：食盐摄入量4克/日左右，植物油摄入量20ML，精瘦肉75克/日，蛋类3-4个/周，主食以五谷杂粮为宜，300克/日。您烹调食物最好使用食植物油，多吃瘦肉、鱼类及低脂奶、豆制品（如绿豆、大豆制品等）,白瓜子、杂粮、花生、芝麻、黑木耳（5克/日）等，宜饮绿茶，每日1000-1500ML。</p>
                        <p>（2）多食新鲜蔬菜、水果：蔬菜400-500克/日，水果400-500克/日，豆制品30-150克/日，奶类250ML/日。您应多进食胡萝卜、洋葱芹菜，胡萝卜，冬瓜、大蒜、洋葱、芹菜，苹果、山楂、香蕉、柑桔等。</p>
                        <p>（3）您应避免暴饮暴食，忌高油腻，高胆固醇食物如：鸡蛋黄、肥肉、海鲜、无鳞鱼类、贝壳类动物、动物内脏、松花蛋，忌刺激性食物如：辛辣、白酒、生蒜、油炸食品等，限酒，少饮咖啡。</p>
                        <p></p>
                        <p>【2】适量运动</p>
                        <p>（1）您应坚持适度体育锻炼，血压不稳时可以散步、走路，血压平稳时可以骑自行车，游泳、太极拳、体操、大步走等，运动时心率在110次/分，即（170-年龄），1次/天,每次30分钟。</p>
                        <p>（2）您要谨慎剧烈运动，防止腹部外伤。平时您可以经常做缩肛运动，以改善前列腺肌肉的肌力。</p>
                        <p></p>
                        <p>【3】心理平衡</p>
                        <p>（1）保持健康心态，多与家人和朋友交流沟通。</p>
                        <p>（2）怡情悦志，调畅情绪，避免情绪剧烈波动。</p>
                    </div>

                    {/*一般项目*/}
                    <div className='main-title'>
                        <h4>一般项目</h4>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>项目名称</span>
                            <span>检查结果</span>
                        </div>

                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>身高（cm）</span>
                            <span>155</span>
                        </div>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>体重（Kg）</span>
                            <span>50</span>
                        </div>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>体重指数(BMI)</span>
                            <span>
                                21.2
                                &nbsp;
                                <span className='yuan fz-16'>参考值:18.5~22.9</span>
                            </span>
                        </div>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>收缩压（mm/Hg）</span>
                            <span>100
                                &nbsp; <span className='yuan fz-16'>参考值:90~140</span>
                            </span>
                        </div>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>舒张压（mm/Hg）</span>
                            <span>60
                                &nbsp; <span className='yuan fz-16'>参考值:60~90</span>
                            </span>
                        </div>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>视力</span>
                            <span>视力</span>
                        </div>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>听力</span>
                            <span>听力</span>
                        </div>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>嗅觉</span>
                            <span>嗅觉</span>
                        </div>

                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <h4>小结:
                                <span>无异常项</span>
                            </h4>
                        </div>
                    </div>

                    {/*内科*/}
                    <div className='main-title'>
                        <h4>内科</h4>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>项目名称</span>
                            <span>检查结果</span>
                        </div>
                        {
                            this.state.list2.map((item, key) => (
                                <div className="mui-card-footer" key={key} style={{background: '#fff', margin: '10px 0'}}>
                                    <span>{item.title}</span>
                                    <span>{item.sub}</span>
                                </div>
                            ))
                        }

                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <h4>小结:
                                <span>无异常项</span>
                            </h4>
                        </div>
                    </div>
                    {/*彩超*/}
                    <div className='main-title'>
                        <h4>彩超室</h4>
                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <span>项目名称</span>
                            <span>检查结果</span>
                        </div>
                        {
                            this.state.list3.map((item, key) => (
                                    <div className="parent" key={key} style={{background: '#fff', margin: '10px 0'}}>
                                        <div className="stable">{item.title}</div>
                                        <div className="change">{item.sub}</div>
                                    </div>
                            ))
                        }

                        <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                            <h4>小结:
                                <span>无异常项</span>
                            </h4>
                        </div>
                    </div>

                    <div className="mui-card-footer" style={{background: '#fff', margin: '10px 0'}}>
                        <p style={{fontWeight: 600}}>总检医生:DL</p>
                        <p style={{fontWeight: 600}}>报告日期: 2020.06.09</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyReportDetail;