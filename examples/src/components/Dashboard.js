import React, { Component } from 'react';
import '../styles/bootstrap.min.css';
import '../styles/offcanvas.css';

class Dashboard extends Component {
    static defaultProps = {
        datas: [
            {name: '基础地图', path: '/basic'},
            {name: '附带定位地图', path: '/spot'},
            {name: '附带标记地图', path: '/marker'},
            {name: '浏览器定位地图', path: '/geolocation'},
            {name: '绘图Library', path: '/drawing'},
        ]
    }
    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
                        <img className="mr-3 App-logo" src={require('../logo.svg')} alt="" width="48" height="48" />
                        <div className="lh-100">
                        <h6 className="mb-0 text-white lh-100">React Component For Tencent Map</h6>
                        </div>
                    </div>

                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <h6 className="border-bottom border-gray pb-2 mb-0">Examples</h6>
                        {
                            this.props.datas.map((v, i) => (
                                <div key={v.path} className="media text-muted pt-3 pointer" onClick={() => this.props.history.push(v.path)}>
                                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                        <strong className="d-block text-gray-dark">{v.name}</strong>
                                    </p>
                                </div>
                            ))
                        }
                        {/* <div className="media text-muted pt-3 pointer" onClick={() => this.props.history.push('/basic')}>
                            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                <strong className="d-block text-gray-dark">基础地图</strong>
                            </p>
                        </div>
                        <div className="media text-muted pt-3 pointer" onClick={() => this.props.history.push('/spot')}>
                            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                <strong className="d-block text-gray-dark">附带定位地图</strong>
                            </p>
                        </div> */}
                        <small className="d-block text-right mt-3">
                        <a href="https://github.com/yezihaohao/react-qmap">GitHub</a>
                        </small>
                    </div>
                </main>
            </div>
        )
    }
}

export default Dashboard;