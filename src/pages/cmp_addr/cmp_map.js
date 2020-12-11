import React, { Component } from 'react';
// 导入地图模块
import Map from './../../components/map/map.js'

class CmpMap extends Component {
    render() {
        return (
            <div>
                <Map opt={{...this.props.location.state.opt }}></Map>
            </div>
        );
    }
}

export default CmpMap;
