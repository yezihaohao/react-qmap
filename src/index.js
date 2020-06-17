import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { INITIALOPTIONS } from './config';

let qq = window.qq = window.qq || {};
let QMap = window.qq.maps || null;
qq.maps = qq.maps || {};

const checkCenter = center => center && center.latitude && center.longitude;

class ReactQMap extends Component {
    componentDidMount() {
        if (!QMap) this._addScript();
        else checkCenter(this.props.center) && this._initMap(this.props);  // center存在时执行初始化
    }
    componentDidUpdate(prevProps) {
        if (prevProps.center && JSON.stringify(prevProps.center) !== JSON.stringify(this.props.center)) {
            if (!checkCenter(this.props.center)) {
                this._initMap(prevProps);   // center默认不存在时执行初始化
            } else {
                this.map.setCenter(new QMap.LatLng(prevProps.center.latitude, prevProps.center.longitude));
            }
        }
        // 更新我的定位标记位置
        if (prevProps.mySpot && JSON.stringify(prevProps.mySpot) !== JSON.stringify(this.props.mySpot)) {
            this.myPositionMarker.setPosition(new QMap.LatLng(prevProps.mySpot.latitude, prevProps.mySpot.longitude));
        }
    }
    componentWillUnmount() {
        // 清除所有的监听器
        this.map && QMap.event.clearListeners(this.map);
    }
    _addScript = () => {
        const { windowMap, apiKey, libraries = [] } = this.props;
        const getScript = (src) => {
            const protocol = (window.location.protocol == "https:") ? "https://" : "http://";
            src = protocol + src;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;
            script.crossOrigin = true;
            document.body.appendChild(script);
            script.onload = () => {     // js加载以后
                QMap = window.qq.maps;
                checkCenter(this.props.center) && this._initMap(this.props);
            }
        }
        const loadScriptTime = (new Date).getTime();
        qq.maps.__load = function (apiLoad) {
            delete qq.maps.__load;
            apiLoad([["2.4.132", apiKey, 0],["https://mapapi.qq.com/","jsapi_v2/2/4/132/mods/","https://mapapi.qq.com/jsapi_v2/2/4/132/theme/",true],[1,18,34.519469,104.461761,4],[1592153320230,"https://pr.map.qq.com/pingd","https://pr.map.qq.com/pingd"],["https://apis.map.qq.com/jsapi","https://apikey.map.qq.com/mkey/index.php/mkey/check","https://sv.map.qq.com/xf","https://sv.map.qq.com/boundinfo","https://sv.map.qq.com/rarp","https://apis.map.qq.com/api/proxy/search","https://apis.map.qq.com/api/proxy/routes/","https://confinfo.map.qq.com/confinfo","https://overseactrl.map.qq.com"],[[null,["https://rt0.map.gtimg.com/tile","https://rt1.map.gtimg.com/tile","https://rt2.map.gtimg.com/tile","https://rt3.map.gtimg.com/tile"],"png",[256,256],3,19,"114",true,false],[null,["https://m0.map.gtimg.com/hwap","https://m1.map.gtimg.com/hwap","https://m2.map.gtimg.com/hwap","https://m3.map.gtimg.com/hwap"],"png",[128,128],3,18,"110",false,false],[null,["https://p0.map.gtimg.com/sateTiles","https://p1.map.gtimg.com/sateTiles","https://p2.map.gtimg.com/sateTiles","https://p3.map.gtimg.com/sateTiles"],"jpg",[256,256],1,19,"101",false,false],[null,["https://rt0.map.gtimg.com/tile","https://rt1.map.gtimg.com/tile","https://rt2.map.gtimg.com/tile","https://rt3.map.gtimg.com/tile"],"png",[256,256],1,19,"",false,false],[null,["https://sv0.map.qq.com/hlrender/","https://sv1.map.qq.com/hlrender/","https://sv2.map.qq.com/hlrender/","https://sv3.map.qq.com/hlrender/"],"png",[256,256],1,19,"",false,false],[null,["https://rtt2.map.qq.com/rtt/","https://rtt2a.map.qq.com/rtt/","https://rtt2b.map.qq.com/rtt/","https://rtt2c.map.qq.com/rtt/"],"png",[256,256],1,19,"",false,false],null,[["https://rt0.map.gtimg.com/vector/","https://rt1.map.gtimg.com/vector/","https://rt2.map.gtimg.com/vector/","https://rt3.map.gtimg.com/vector/"],[256,256],3,18,"114",["https://rt0.map.gtimg.com/icons/","https://rt1.map.gtimg.com/icons/","https://rt2.map.gtimg.com/icons/","https://rt3.map.gtimg.com/icons/"],[]],null],["https://s.map.qq.com/TPano/v1.1.2/TPano.js","map.qq.com/",""]],loadScriptTime);
        };
        const scripts = ['main', ...libraries.map(l => `mods/${l}`)];
        const prefix = 'jsapi_v2/2/4/132/';
        getScript("mapapi.qq.com/c/=/" + scripts.map(s => `${prefix}${s}.js`).join(','));
    }
    _initMap = (props) => {
        const { center, getMap, initialOptions, mySpot, getContainer } = props;
        const options = Object.assign({}, INITIALOPTIONS, initialOptions);
        this.map = new QMap.Map(this.container, {
            center: new QMap.LatLng(center.latitude, center.longitude),
            ...options,
        });
        getMap && getMap(this.map, QMap);
        mySpot && this._mySpot(new QMap.LatLng(mySpot.latitude, mySpot.longitude));
        getContainer && getContainer(this.container);
    }
    _mySpot = (position, icon = require('./imgs/my-position_small.png')) => {
        this.myPositionMarker = new QMap.Marker({
            icon: this._setMarkerImg(icon),
            position,
            map: this.map,
        });
    }
    _setMarkerImg = (icon) => {
        const anchor = new QMap.Point(6, 6),
            size = new QMap.Size(32, 32),
            sizeSm = new QMap.Size(22, 22),
            origin = new QMap.Point(0, 0);
        return new QMap.MarkerImage(icon, sizeSm, origin, anchor, sizeSm);
    }
    render() {
        const { className, style } = this.props;
        return (
            <div
                ref={div => this.container = div}
                style={{width: '100%', height: '100%', ...style}}
                {...{className}}
            />
        )
    }
}

ReactQMap.propTypes = {
    initialOptions: PropTypes.object,
    getMap: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    mySpot: PropTypes.object,
    apiKey: PropTypes.string.isRequired,
    center: PropTypes.object.isRequired,
    getContainer: PropTypes.func,
    libraries: PropTypes.array,
}

export default ReactQMap;
