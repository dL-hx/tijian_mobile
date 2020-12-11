import React, {Component} from 'react';
import {key} from "../../utils/constants";
import IframeComm from "react-iframe-comm";
import './map.less'

// console.log('new window', window)

class Map extends Component {
    state = {
        /**
         * {
         *     lng: x 经度   当前位置的x
         *     lat: y 纬度   当前位置的y
         * }
         */
        location: {}
    }

    componentDidMount() {
        /*        const ifm = this.refs.addrMap
                ifm.height = document.documentElement.clientHeight;
                console.log('document.documentElement.clientHeight', document.documentElement.clientHeight)*/


        const {opt: {epointx, epointy, eword}} = this.props

        window.$.ajax({
            type: 'get',
            url: 'https://apis.map.qq.com/ws/location/v1/ip',
            data: {
                key: key, //腾讯key（我的测试key）
                output: 'jsonp',
            },
            dataType: 'jsonp',
            success: (res) => {
                if (res.status === 0) {
                    const location = res.result.location
                    const spointx = location.lng // 起点的经度，默认是当前定位的经度
                    const spointy = location.lat // 起点的纬度，默认是当前定位的纬度

                    window.location.href=`https://apis.map.qq.com/tools/routeplan/sword=我的位置&spointx=${spointx}&spointy=${spointy}&eword=${eword}&epointx=${epointx}&epointy=${epointy}?referer=微信开发&key=${key}`
                }
            }
        })

    }


    render() {
        const location = this.state.location
        const spointx = location.lng // 起点的经度，默认是当前定位的经度
        const spointy = location.lat // 起点的纬度，默认是当前定位的纬度
        const {opt: {epointx, epointy, eword}} = this.props

        // console.log('opt', opt)
        return (
            <div style={{height: "100%"}}>
                {/*                <iframe ref="addrMap" frameBorder="0" width="100%" height="100%"
                        src={`https://apis.map.qq.com/tools/routeplan/sword=我的位置&spointx=${spointx}&spointy=${spointy}&eword=${eword}&epointx=${epointx}&epointy=${epointy}?referer=微信开发&key=${key}`}
                    // src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CNWBZ-NIUKU-VWXVH-4GPAU-XKAKO-SABKH&referer=微信开发"
                >
                </iframe>*/}
            </div>
        );
    }
}

export default Map;


