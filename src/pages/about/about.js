import React, {Component} from 'react';
import defaultSetting from "../../defaultSetting";

import './about.less'

class About extends Component {
    render() {
        return (
            <div className='about'>
                <nav>
                    <p>{defaultSetting.title}</p>
                </nav>
                <div className="mui-content" style={{background:'#fff'}}>
                    <div className="mui-content-padded">
                        <p>
                            <img src={require('../../images/about-1.jpg')} data-preview-src="" data-preview-group="1"/>
                        </p>

                        <p>陕西和美佑家健康管理有限公司是中陕核健康根据战略需要于2019年12月成立的全资子公司。</p>

                        <p>公司使用“HEEYO/和佑家”品牌，以连锁体检机构运营为主要经营模式，以大数据信息采集和健康管理平台搭建为核心目标，积极参与到健康管理和体检行业。和美佑家定位为全国性连锁体检及健康管理平台运营公司。主要面对大中型国企、事业单位团检、健康产业生态链客户群以及社会中的亚健康人群开展健康体检、疗养、个性化康复治疗、定制化康复食品供应等各类健康管理服务。</p>
                        <p>
                            <img src={require('../../images/about-2.jpg')} data-preview-src="" data-preview-group="1"/>
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default About;