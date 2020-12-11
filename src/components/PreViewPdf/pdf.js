import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PDFJS from 'pdfjs-dist';
import styles from './index.less';
import AlloyFinger from 'alloyfinger';
import Transform from 'css3transform';
import {ActivityIndicator} from "antd-mobile";
import pdfWorkerEntryJs from 'pdfjs-dist/build/pdf.worker.entry'; // pdf.worker.js入口文件

// PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorkerEntryJs;


function isPdfFile(pdf) {
    if (!pdf) {
        return false;
    }
    if (!/\.(pdf)$/.test(pdf.toLowerCase())) {
        return false;
    } else {
        return true;
    }
}


export class PdfLoading extends Component {

    render() {
        const {loading, loadingText} = this.props;
        return (
            <div>
                <ActivityIndicator
                    toast
                    text={loadingText ? loadingText : '文件加载中...'}
                    animating={loading}
                />
            </div>

        );
    }
}

export class PDF extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pdf: null, // pdf 对象
            scale: 1.2, // 渲染规模
            isPdfFileTrue: true, // pdf 文件是否正确获取
            fileErrorText: '', // 错误提示语
            loadingText: '文件加载中...', // 加载文案
            loading: false, // 是否加载
        }
    }

    getChildContext() {
        const {pdf, scale} = this.state;
        return {
            pdf,
            scale
        }
    }

    componentWillMount() {
        this.setState({
            loadingText: '文件加载中...', // 加载文案
            loading: true, // 是否加载
        })
    }

    componentDidMount() {
        const {src} = this.props;
        // 不是pdf文件不能继续渲染
        if (!isPdfFile(src)) {
            this.setState({
                isPdfFileTrue: false,
                fileErrorText: '无效或损坏的 PDF 文件',
                loadingText: '文件加载中...', // 加载文案
                loading: false, // 是否加载
            })
            return;
        }

        //获取pdf文件流
        let loadingTask = PDFJS.getDocument(src);
        let _this = this;
        loadingTask.promise.then(function (pdf) {
            if (pdf) {
                _this.setState({
                    pdf,
                    loadingText: '文件加载中...', // 加载文案
                    loading: false, // 是否加载
                })
            } else {
                _this.setState({
                    isPdfFileTrue: false,
                    loadingText: '文件加载中...', // 加载文案
                    loading: false, // 是否加载
                })
            }
        }, function (exception) {
            let message = exception && exception.message;
            console.log('message--' + message);
            let loadingErrorMessage = '';

            if (exception instanceof PDFJS.InvalidPDFException) {
                loadingErrorMessage = '无效或损坏的 PDF 文件';
            } else if (exception instanceof PDFJS.MissingPDFException) {
                loadingErrorMessage = '缺少 PDF 文件';
            } else if (exception instanceof PDFJS.UnexpectedResponseException) {
                loadingErrorMessage = '意外的服务器响应错误';
            } else {
                loadingErrorMessage = '载入 PDF 时发生错误, 原因可能是文件跨域';
            }
            _this.setState({
                isPdfFileTrue: false,
                fileErrorText: loadingErrorMessage,
                loadingText: '文件加载中...', // 加载文案
                loading: false, // 是否加载
            })
        })
    }

    render() {
        const {isPdfFileTrue, fileErrorText, loadingText, loading} = this.state;
        const {children} = this.props;
        return (
            <div className={styles.pdfContext}>
                {isPdfFileTrue ? children : fileErrorText}
                <PdfLoading loadingText={loadingText} loading={loading}/>
            </div>
        )
    }
}

PDF.childContextTypes = {
    pdf: PropTypes.object,
    scale: PropTypes.number
}

export class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'N/A',// 加载pdf的状态 'N/A':初始状态  'loading':加载中 'rendering':渲染中  'rendered':渲染完成
            page: null, // pdf页面
            width: 0, // pdf页面宽度
            height: 0, // pdf页面高度
            loadingText: '文件加载中...', // 加载文案
            loading: false, // 是否加载
        }
    }

    componentDidMount() {
        this._update(this.context.pdf);
    }

    _update(pdf) {
        if (pdf) {
            this._loadPage(pdf);
            this.setState({
                loadingText: '文件加载中...',
                loading: true,
            })
        } else {
            this.setState({
                status: 'loading',
                loadingText: '文件加载中...',
                loading: false,
            })
        }
    }

    _loadPage(pdf) {
        const {status, page} = this.state;
        if (status === 'rendering' || page !== null) {
            return;
        }
        const {index} = this.props;
        pdf.getPage(index).then(this._renderPage.bind(this))
        this.setState({
            status: 'rendering',
            loadingText: '文件渲染中...',
            loading: true,
        })
    }

    // canvas 大小在浏览器有限制，需要变小
    getViewportFunc = (page, scale) => {
        let viewport = page.getViewport(scale);
        let {width, height} = viewport;
        if (width > 2048 || height > 2048) {
            let scaleTemp = Math.ceil((width > height ? width : height) / 2048);
            let currentScale = scale / scaleTemp / 2; // 应渲染的规模比例
            return page.getViewport(currentScale);
        } else {
            return viewport;
        }
    }

    _renderPage(page) {
        let {scale} = this.context;
        let viewport = this.getViewportFunc(page, scale);
        let {width, height} = viewport;
        let canvas = this.refs.canvas;
        let context = canvas.getContext('2d');

        // 高清显示pdf
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.overflow = 'scroll';

        context.scale(2, 2);
        page.render({
            canvasContext: context,
            viewport
        })

        this.setState({
            status: 'rendered',
            loadingText: '文件渲染完成...',
            loading: false,
            page,
            width,
            height,
        })
    }

    render() {
        let {width, height, status, loadingText, loading} = this.state;
        console.log('status--' + status);
        return (
            <div className={styles.pdfPage} style={{width, height, marginBottom: 10}}>
                <canvas ref='canvas'/>
                <PdfLoading loadingText={loadingText} loading={loading}/>
            </div>
        )
    }
}

Page.contextTypes = PDF.childContextTypes

export class Viewer extends Component {

    handlePinch = () => {
        let pdfViewer = this.refs.pdfViewer;
        Transform(pdfViewer);
        let initScale = 1;
        let pdfViewerAf = new AlloyFinger(pdfViewer, {
            pinch: (evt) => {
                console.log('pinch');
            }
        });

        pdfViewerAf.on('pinch', (evt) => {
            const {zoom} = evt;
            let zoomTemp = 0;
            // 限制缩放比例为 0.2~1.6
            if (zoom < 0.2) {
                zoomTemp = 0.2;
            } else if (zoom > 1.6) {
                zoomTemp = 1.6;
            } else {
                zoomTemp = zoom;
            }
            pdfViewer.scaleX = pdfViewer.scaleY = initScale * zoomTemp;
        });
    }

    componentDidMount() {
        this.handlePinch(); // 手势放大缩小 pdf
    }

    render() {
        let {pdf = {}} = this.context;
        let numPages = pdf ? pdf.numPages : 0;
        let fingerprint = pdf ? pdf.fingerprint : 'none';
        let pages = Array.apply(null, {length: numPages})
            .map((v, i) => (<Page index={i + 1} key={`${fingerprint}-${i}`}/>))

        return (
            <div className={styles.pdfViewer} ref='pdfViewer'>
                {pages}
            </div>
        )
    }
}

Viewer.contextTypes = PDF.childContextTypes;

