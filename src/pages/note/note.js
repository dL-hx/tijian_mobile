import React, {Component} from 'react';
import './note.less'

class Note extends Component {
    render() {
        return (
            <div className='note'>
                <div className="mui-card">
                    <div className="mui-card-header">常规体检须知</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>1.如有抽血项目请您务必于早晨9:30前进行。</p>
                            <p>2.体检前3天请勿食油腻食物、勿饮酒。</p>
                            <p>3.有抽血、彩超检查项目者，受检前8小时请勿进食、饮水，即空腹。</p>
                            <p>4.为配合X光检查，请勿穿胶印图形的衣服，勿佩戴项链、耳环等。</p>
                        </div>
                    </div>
                </div>

                <div className="mui-card">
                    <div className="mui-card-header">妇科体检须知</div>
                    <div className="mui-card-content">
                        <div className="mui-card-content-inner">
                            <p>1.妇科检查（妇科内诊、白带常规、宫颈液基薄层细胞学检查），仅限有性生活史的女性。</p>
                            <p>2.女性月经期间不宜做妇科检查和便、尿检查，经期结束3天后可补检。</p>
                            <p>3.妇科检查前24小时内，可以清洗外阴，但勿冲洗阴道。</p>
                            <p>4.妇科检查做液基薄层细胞学检查前一天禁止房事，妇科治疗（冲洗上药）期间暂缓检查。</p>
                            <p>5.产后42天内、人流术后21天内不做妇科检查。</p>
                            <p>6.孕妇或者可能已受孕的女性，勿做X光及宫颈液基薄层细胞学检查。准备受孕的女性勿做X光检测。</p>
                            <p>7.女性哺乳期、月经前2日和月经期间请勿做乳腺彩超</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Note;