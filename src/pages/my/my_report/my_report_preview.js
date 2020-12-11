import React, {Component} from 'react';
import PreViewPdf from './../../../components/PreViewPdf'
class MyReportPreview extends Component {

    render() {
        const pdfUrl= 'http://phy.wiimedia.top/pdf/export/'+ this.props.match.params.checkinCode
        // console.log('pdfUrl', pdfUrl)
        return (
            <PreViewPdf pdfUrl={pdfUrl}></PreViewPdf>
        );
    }
}

export default MyReportPreview;