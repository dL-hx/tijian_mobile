import React, {Component} from 'react';
import defaultSetting from "../../defaultSetting";

import IframeComm from 'react-iframe-comm';

import './about.less'

class About extends Component {
    render() {
        return (
            <div className='about'>
                <IframeComm
                    attributes={{
                        src: '../../about_html/index.html',
                        width: '100%',
                        height: document.body.clientHeight,
                        frameBorder: 0,
                    }}
                />
            </div>
        );
    }
}

export default About;