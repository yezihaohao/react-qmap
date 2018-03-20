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
    componentWillReceiveProps(nextProps) {
        if (nextProps.center && JSON.stringify(nextProps.center) !== JSON.stringify(this.props.center)) {
            if (!checkCenter(this.props.center)) {
                this._initMap(nextProps);   // center默认不存在时执行初始化
            } else {
                this.map.setCenter(new QMap.LatLng(nextProps.center.latitude, nextProps.center.longitude));
            }
        }
        // 更新我的定位标记位置
        if (nextProps.mySpot && JSON.stringify(nextProps.mySpot) !== JSON.stringify(this.props.mySpot)) {
            this.myPositionMarker.setPosition(new QMap.LatLng(nextProps.mySpot.latitude, nextProps.mySpot.longitude));
        }
    }
    componentWillUnmount() {
        // 清除所有的监听器
        this.map && QMap.event.clearListeners(this.map);
    }
    _addScript = () => {   
        const { windowMap, apiKey } = this.props;         
        const getScript = (src) => {
            const protocol = (window.location.protocol == "https:") ? "https://" : "http://";
            src = protocol + src;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;
            document.body.appendChild(script);
            script.onload = () => {     // js加载以后
                // console.log(window.qq.maps);
                QMap = window.qq.maps;
                checkCenter(this.props.center) && this._initMap(this.props);
            }
        }
        const loadScriptTime = (new Date).getTime();
        qq.maps.__load = function (apiLoad) {
            delete qq.maps.__load;
            apiLoad([["2.4.85", apiKey, 0],["open.map.qq.com/","apifiles/2/4/85/mods/","open.map.qq.com/apifiles/2/4/85/theme/",true],[1,18,34.519469,104.461761,4],[1519918617710,"pr.map.qq.com/pingd","pr.map.qq.com/pingd"],["apis.map.qq.com/jsapi","apikey.map.qq.com/mkey/index.php/mkey/check","sv.map.qq.com/xf","sv.map.qq.com/boundinfo","sv.map.qq.com/rarp","apis.map.qq.com/api/proxy/search","apis.map.qq.com/api/proxy/routes/","confinfo.map.qq.com/confinfo"],[[null,["rt0.map.gtimg.com/tile","rt1.map.gtimg.com/tile","rt2.map.gtimg.com/tile","rt3.map.gtimg.com/tile"],"png",[256,256],3,19,"114",true,false],[null,["m0.map.gtimg.com/hwap","m1.map.gtimg.com/hwap","m2.map.gtimg.com/hwap","m3.map.gtimg.com/hwap"],"png",[128,128],3,18,"110",false,false],[null,["p0.map.gtimg.com/sateTiles","p1.map.gtimg.com/sateTiles","p2.map.gtimg.com/sateTiles","p3.map.gtimg.com/sateTiles"],"jpg",[256,256],1,19,"101",false,false],[null,["rt0.map.gtimg.com/tile","rt1.map.gtimg.com/tile","rt2.map.gtimg.com/tile","rt3.map.gtimg.com/tile"],"png",[256,256],1,19,"",false,false],[null,["sv0.map.qq.com/hlrender/","sv1.map.qq.com/hlrender/","sv2.map.qq.com/hlrender/","sv3.map.qq.com/hlrender/"],"png",[256,256],1,19,"",false,false],[null,["rtt2.map.qq.com/rtt/","rtt2a.map.qq.com/rtt/","rtt2b.map.qq.com/rtt/","rtt2c.map.qq.com/rtt/"],"png",[256,256],1,19,"",false,false],null,[["rt0.map.gtimg.com/vector/","rt1.map.gtimg.com/vector/","rt2.map.gtimg.com/vector/","rt3.map.gtimg.com/vector/"],[256,256],3,18,"114",["rt0.map.gtimg.com/icons/","rt1.map.gtimg.com/icons/","rt2.map.gtimg.com/icons/","rt3.map.gtimg.com/icons/"]],null],["s.map.qq.com/TPano/v1.1.2/TPano.js","map.qq.com/",""]],loadScriptTime);
        };
        getScript("open.map.qq.com/apifiles/2/4/85/main.js");
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
}

export default ReactQMap;
