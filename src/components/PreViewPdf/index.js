import React, {Component} from 'react';

import {MobilePDFReader} from 'react-read-pdf';

class PreViewPdf extends Component {
    state = {
        page: 1,
        pages: 1
    }

    onDocumentComplete(page, title, otherObj) {
        this.setState({page: page});
    }



    render() {
         let {pdfUrl}= this.props
       // console.log("===========pdfUrl=====", pdfUrl)

        return (
            <div style={{overflow: 'scroll', height: document.body.clientHeight}}>
                <MobilePDFReader
                    isShowFooter={false}
                    isShowHeader={false}
                    // url={'http://phy.wiimedia.top/pdf/export/'+'00120073170013'}
                    url={pdfUrl}
                    onDocumentComplete={this.onDocumentComplete.bind(this)}
                    page={this.state.page}/>
            </div>
        );
    }
}

export default PreViewPdf;

/*
import React, {Component} from 'react';
import {PDF, Viewer} from './pdf';
import styles from './index.less'

class PreViewPdf extends Component {


    render() {

        // let pdfFileLink = 'http://phy.wiimedia.top/pdf/export'
        // let pdfFileLink = 'http://phy.wiimedia.top/pdf/export/'+'TJ200730WO00094'
        let pdfFileLink = 'http://phy.wiimedia.top/pdf/export/'+'00120073170013'
        console.log('http://phy.wiimedia.top/pdf/export', pdfFileLink)

        return (
            <div className={styles.pdfWrap}>
                <PDF src={pdfFileLink}>
                    <Viewer/>
                </PDF>
            </div>
        );
    }
}

export default PreViewPdf;*/
