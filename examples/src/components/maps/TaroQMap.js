/*
 * File: TaroQMap.js
 * desc: 描述
 * File Created: Friday, 21st September 2018 1:20:35 pm
 * Author: chenghao
 * ======
 */
import Taro, { Component } from '@tarojs/taro'

const INITIALOPTIONS = {
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
}

let qq = window.qq = window.qq || {};
let QMap = window.qq.maps || null;
qq.maps = qq.maps || {};

const checkCenter = center => center && center.latitude && center.longitude;

class TaroQMap extends Component {
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
        const { center, getMap, initialOptions, mySpot } = props;
        const options = Object.assign({}, INITIALOPTIONS, initialOptions);
        this.map = new QMap.Map(this.container, {
            center: new QMap.LatLng(center.latitude, center.longitude),
            ...options,
        });
        getMap && getMap(this.map, QMap);
        mySpot && this._mySpot(new QMap.LatLng(mySpot.latitude, mySpot.longitude));
    }
    _mySpot = (position, icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhGRDZCQUJFRjFDQTExRTdBRjUzODExRTYzQzA3OTRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhGRDZCQUJGRjFDQTExRTdBRjUzODExRTYzQzA3OTRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEZENkJBQkNGMUNBMTFFN0FGNTM4MTFFNjNDMDc5NEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEZENkJBQkRGMUNBMTFFN0FGNTM4MTFFNjNDMDc5NEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5wYUeiAAAC00lEQVR42sxYTUwTQRR+M/GgJpWL1pMt4BGMgCcNRU8WQeJBYwJ6NfEEiRcjKiYGLhyIxouGm4ge9CLy60k0ekMxKXrTIiZa4wWaiIm143vtNNndvinb7U7il3xJO7P73pfdt2++GaGUgioQRXYhjyKbkfXIXXpuA5lGppCLyHnkd9+RSYgPJpDPkH+Uf+T0PQk/Oba6oBE5rWrHtI4VSEgvcl2FB4rVV62QIWUPQ1xOwRTrIHLEVFNfVhQsPwd480TBj1UFmxvF8R1YstG4gMOnBbQmAWJNolJpXkcOOwe8QnqRD1kBKQUPrip4O+/vK2vrFHB+RECs2SioD/mIE9KAfI+MeO9YuKdgvD8PQXDhtoTkRVZMFnkQ+Zn+SMfEHU7ExJV8YBGE8YE83L/M3h/ROcEppB3ZzT2Jp2MKasXULVWIxYByJpyvZgrZ462JS4fyECbGliRXM5T7lNRt+4R3dvKagrBBxc6Aloyo1D+2OWfWPihYmgtfCH1xXz+WDVPuLqkXMBfeLYA1GD7/Y1Kvoi5Qs7IFQ+wmqZdyF6hj2kImzcZukFzv2MzaezW/+dgRElLe9uw9ECOkbrUubI/YS2iInZWlXu/E3nphTcieGBs7TUJWvKNHztgT0n6WjZ0iIS+8oy3H7b0aQ+xFEjKHzDlHydSQnwgbFJMxTJR7loRktPV3gUxN2Dg3zMak3JmSDRj1ztIqSaYmLFCs+AFWyKjTj7xCznivIGfVM1D7kznZL0wubVbndlnFRuQyaxXvqoLTsmAVW5CfOPNMhnbSZJ4nBhWuzP7abmuyaJ4Nr6NQMk6jzm0nyOrfrLSdIJvw+rGCn2sKfq0Xx3fWAezeJwo9qK1zy+3EjbIc/8sGq9KWk7aH2RAFZINsOUvcH9ImfEbHCnwaUGKHPmLIVZH8r76nw08OEeCgpttxUBNH1uk5KttVfVDzUi8d3/wG/ifAAOPIi+NXJP16AAAAAElFTkSuQmCC') => {
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

export default TaroQMap;
