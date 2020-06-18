import React, {Component} from 'react';
import './cmp_addr.less'
class CmpAddr extends Component {
    render() {
        return (
            <div className='cmp_addr'>
                <div className="mui-card">
                    <div className="mui-card-header">西安 临潼体检中心</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>联系电话：029-88888888</p>
                            <p>体检地址：西安市临潼区</p>
                        </div>
                    </div>
                    <div className="mui-card-footer">
                        <a id="icon"><span className="mui-icon mui-icon-phone"></span></a>

                        <a id="icon"><span className="mui-icon mui-icon-map"></span></a>
                    </div>
                </div>

                <div className="mui-card">
                    <div className="mui-card-header">西安 未央体检中心</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>联系电话：029-88888888</p>
                            <p>体检地址：西安市未央区</p>
                        </div>
                    </div>
                    <div className="mui-card-footer">
                        <a id="icon"><span className="mui-icon mui-icon-phone"></span></a>

                        <a id="icon"><span className="mui-icon mui-icon-map"></span></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CmpAddr;