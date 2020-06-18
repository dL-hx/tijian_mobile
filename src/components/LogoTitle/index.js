import React, {Component} from 'react';
import defaultSetting from "../../defaultSetting";
import PropTypes from 'prop-types';

import './index.less'

class LogoTitle extends Component {
    render() {
        const {showIcon, subtitle, title} = this.props
        return (
            <div className='logo-title'>
                <h4> {title}</h4>
                <p className='logo-body'>
                    {showIcon&&<img src={defaultSetting.logo}/>}
                    {subtitle}
                </p>
            </div>
        );
    }
}


//给LogoTitle属性中的showIcon值指定默认值。当组件引用的时候，没有传入showIcon属性时，会使用默认值。
LogoTitle.defaultProps = {
    showIcon: true,
    title:'',
    subtitle:defaultSetting.title
};


LogoTitle.propTypes = {
    showIcon: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};



export default LogoTitle;