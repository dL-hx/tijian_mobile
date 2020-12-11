import React, {Component} from 'react';
import './cmp_addr.less'
class CmpAddr extends Component {
    handleCallPhone=(tel,e)=>{
        // 阻止事件冒泡
        e.stopPropagation()
        window.location.href = "tel:"+tel
    }

    /**
     * 
     * @param {*} opt :
     *          传递来的 坐标 {epointx:epointx,epointy: epointy, eword:'eword'}
     *          epointx:  终点的经度
     *          epointy:  终点的纬度
     *          eword  :  终点的名称
     * @param {*} e 
     */
    goCmpMap=(opt,e)=>{
       // 阻止事件冒泡
       e.stopPropagation()
       const {epointx, epointy} = opt

       this.props.history.push({pathname: '/cmp_map', state: { opt }});
    }

    render() {
        return (
            <div className='my_report'>

                <div className="mui-card">
                    <div className="mui-card-header">西安碑林健康体检中心</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>电话：400-000-8000</p>
                            <p>体检地址：陕西省西安市碑林区南关正街16号中贸广场5号楼3-02</p>
                            <p>营业时间： 周一至周六（法定节假日除外）</p>
                            <p>体检时间：8:00~12:00（抽血项目：8:00~10:30）</p>
                            

                        </div>
                    </div>
                    <div className="mui-card-footer">
                        <a onClick={(e)=>this.handleCallPhone("400-000-8000",e)}><img src={require('./tel.png')}/></a>
                        <a style={{borderRight:0}} onClick={(e)=> this.goCmpMap({epointx:108.95,epointy: 34.24, eword:'陕西省西安市碑林区南关正街16号中贸广场5号楼3-02'}, e)  }><img src={require('./addr.png')}/></a>
                    </div>
                </div>
                <div className="mui-card">
                    <div className="mui-card-header">西安临潼健康体检中心</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>电话：029-83850142</p>
                            <p>地址：陕西省西安市临潼区康复路26号陕西省临潼疗养院内</p>
                            <p>营业时间： 周一至周六（法定节假日除外）</p>
                            <p>体检时间：8:00~12:00（抽血项目：8:00~10:30）</p>
                        </div>
                    </div>
                    <div className="mui-card-footer">
                        <a onClick={(e)=>this.handleCallPhone("029-83850142",e)}><img src={require('./tel.png')}/></a>
                        <a style={{borderRight:0}} onClick={(e)=> this.goCmpMap({epointx:109.20,epointy: 34.36, eword:'陕西省西安市临潼区康复路26号陕西省临潼疗养院内'}, e)  }><img src={require('./addr.png')}/></a>
                    </div>
                </div>


            </div>
        );
    }
}

export default CmpAddr;