import React, {Component} from 'react';
import './biz_hour.less'

class BizHour extends Component {
    render() {
        return (
            <div className='my_report'>
                <div className="mui-card">
                    <div className="mui-card-header">西安 临潼体检中心</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>营业时间： 周一至周六（法定节假日除外）</p>
                            <p>体检时间：8:00~12:00（抽血项目：8:00~10:30）</p>
                            <p>领取报告：13:00~17:00</p>
                            <p>补打报告：周一至周五  14:00~16:00</p>
                            <p>体检地址：西安市临潼区</p>
                        </div>
                    </div>
                </div>

                <div className="mui-card">
                    <div className="mui-card-header">西安 未央体检中心</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>营业时间： 周一至周六（法定节假日除外）</p>
                            <p>体检时间：8:00~12:00（抽血项目：8:00~10:30）</p>
                            <p>领取报告：13:00~17:00</p>
                            <p>补打报告：周一至周五  14:00~16:00</p>
                            <p>体检地址：西安市未央区保利中心</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BizHour;