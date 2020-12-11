import React, {Component} from 'react';
import defaultSetting from '../../defaultSetting'
class CallPhone extends Component {
    componentWillMount() {
        window.location.href = "tel:"+defaultSetting.tel
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default CallPhone;