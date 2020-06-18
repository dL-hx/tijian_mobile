import React, {Component} from 'react';
import {Button} from "antd-mobile";

class MyInfo extends Component {

    state = {
        infos : [
            {name:'张三',sex:"男",age:'29', time:'2020-05-29'},
            {name:'李思思',sex:"女",age:'26', time:'2019-05-28'}
        ]
    }

    onClick=()=>{

    }


    render() {
        return (
            <div className='my_info relative'>
                <ul className="mui-table-view mui-table-view-chevron">
                    {
                        this.state.infos.map((item, key) => (
                            <li className="mui-table-view-cell mui-media" key={key}>
                                <a className="mui-navigate-right">
                                    <div className="mui-media-body fz-16">
                                        <span>{`${item.name} ${item.age} ${item.sex}`}</span>
                                        <p className='yuan mui-ellipsis fz-16'>删除</p>
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>


                <div className="fixed-bottom">
                    <Button type="primary" type='warning' style={{width: '100%', borderRadius: 0}}
                            onClick={this.onClick}>新建</Button>
                </div>
            </div>
        );
    }
}

export default MyInfo;