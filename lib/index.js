'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var qq = window.qq = window.qq || {};
var QMap = window.qq.maps || null;
qq.maps = qq.maps || {};

var checkCenter = function checkCenter(center) {
    return center && center.latitude && center.longitude;
};

var ReactQMap = function (_Component) {
    _inherits(ReactQMap, _Component);

    function ReactQMap() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ReactQMap);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactQMap.__proto__ || Object.getPrototypeOf(ReactQMap)).call.apply(_ref, [this].concat(args))), _this), _this._addScript = function () {
            var _this$props = _this.props,
                windowMap = _this$props.windowMap,
                apiKey = _this$props.apiKey,
                _this$props$libraries = _this$props.libraries,
                libraries = _this$props$libraries === undefined ? [] : _this$props$libraries;

            var getScript = function getScript(src) {
                var protocol = window.location.protocol == "https:" ? "https://" : "http://";
                src = protocol + src;
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = src;
                script.crossOrigin = true;
                document.body.appendChild(script);
                script.onload = function () {
                    // js加载以后
                    QMap = window.qq.maps;
                    checkCenter(_this.props.center) && _this._initMap(_this.props);
                };
            };
            var loadScriptTime = new Date().getTime();
            qq.maps.__load = function (apiLoad) {
                delete qq.maps.__load;
                apiLoad([["2.4.132", apiKey, 0], ["https://mapapi.qq.com/", "jsapi_v2/2/4/132/mods/", "https://mapapi.qq.com/jsapi_v2/2/4/132/theme/", true], [1, 18, 34.519469, 104.461761, 4], [1592153320230, "https://pr.map.qq.com/pingd", "https://pr.map.qq.com/pingd"], ["https://apis.map.qq.com/jsapi", "https://apikey.map.qq.com/mkey/index.php/mkey/check", "https://sv.map.qq.com/xf", "https://sv.map.qq.com/boundinfo", "https://sv.map.qq.com/rarp", "https://apis.map.qq.com/api/proxy/search", "https://apis.map.qq.com/api/proxy/routes/", "https://confinfo.map.qq.com/confinfo", "https://overseactrl.map.qq.com"], [[null, ["https://rt0.map.gtimg.com/tile", "https://rt1.map.gtimg.com/tile", "https://rt2.map.gtimg.com/tile", "https://rt3.map.gtimg.com/tile"], "png", [256, 256], 3, 19, "114", true, false], [null, ["https://m0.map.gtimg.com/hwap", "https://m1.map.gtimg.com/hwap", "https://m2.map.gtimg.com/hwap", "https://m3.map.gtimg.com/hwap"], "png", [128, 128], 3, 18, "110", false, false], [null, ["https://p0.map.gtimg.com/sateTiles", "https://p1.map.gtimg.com/sateTiles", "https://p2.map.gtimg.com/sateTiles", "https://p3.map.gtimg.com/sateTiles"], "jpg", [256, 256], 1, 19, "101", false, false], [null, ["https://rt0.map.gtimg.com/tile", "https://rt1.map.gtimg.com/tile", "https://rt2.map.gtimg.com/tile", "https://rt3.map.gtimg.com/tile"], "png", [256, 256], 1, 19, "", false, false], [null, ["https://sv0.map.qq.com/hlrender/", "https://sv1.map.qq.com/hlrender/", "https://sv2.map.qq.com/hlrender/", "https://sv3.map.qq.com/hlrender/"], "png", [256, 256], 1, 19, "", false, false], [null, ["https://rtt2.map.qq.com/rtt/", "https://rtt2a.map.qq.com/rtt/", "https://rtt2b.map.qq.com/rtt/", "https://rtt2c.map.qq.com/rtt/"], "png", [256, 256], 1, 19, "", false, false], null, [["https://rt0.map.gtimg.com/vector/", "https://rt1.map.gtimg.com/vector/", "https://rt2.map.gtimg.com/vector/", "https://rt3.map.gtimg.com/vector/"], [256, 256], 3, 18, "114", ["https://rt0.map.gtimg.com/icons/", "https://rt1.map.gtimg.com/icons/", "https://rt2.map.gtimg.com/icons/", "https://rt3.map.gtimg.com/icons/"], []], null], ["https://s.map.qq.com/TPano/v1.1.2/TPano.js", "map.qq.com/", ""]], loadScriptTime);
            };
            var scripts = ['main'].concat(_toConsumableArray(libraries.map(function (l) {
                return 'mods/' + l;
            })));
            var prefix = 'jsapi_v2/2/4/132/';
            getScript("mapapi.qq.com/c/=/" + scripts.map(function (s) {
                return '' + prefix + s + '.js';
            }).join(','));
        }, _this._initMap = function (props) {
            var center = props.center,
                getMap = props.getMap,
                initialOptions = props.initialOptions,
                mySpot = props.mySpot,
                getContainer = props.getContainer;

            var options = Object.assign({}, _config.INITIALOPTIONS, initialOptions);
            _this.map = new QMap.Map(_this.container, _extends({
                center: new QMap.LatLng(center.latitude, center.longitude)
            }, options));
            getMap && getMap(_this.map, QMap);
            mySpot && _this._mySpot(new QMap.LatLng(mySpot.latitude, mySpot.longitude));
            getContainer && getContainer(_this.container);
        }, _this._mySpot = function (position) {
            var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : require('./imgs/my-position_small.png');

            _this.myPositionMarker = new QMap.Marker({
                icon: _this._setMarkerImg(icon),
                position: position,
                map: _this.map
            });
        }, _this._setMarkerImg = function (icon) {
            var anchor = new QMap.Point(6, 6),
                size = new QMap.Size(32, 32),
                sizeSm = new QMap.Size(22, 22),
                origin = new QMap.Point(0, 0);
            return new QMap.MarkerImage(icon, sizeSm, origin, anchor, sizeSm);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ReactQMap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!QMap) this._addScript();else checkCenter(this.props.center) && this._initMap(this.props); // center存在时执行初始化
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.center && JSON.stringify(prevProps.center) !== JSON.stringify(this.props.center)) {
                if (!checkCenter(this.props.center)) {
                    this._initMap(prevProps); // center默认不存在时执行初始化
                } else {
                    this.map.setCenter(new QMap.LatLng(prevProps.center.latitude, prevProps.center.longitude));
                }
            }
            // 更新我的定位标记位置
            if (prevProps.mySpot && JSON.stringify(prevProps.mySpot) !== JSON.stringify(this.props.mySpot)) {
                this.myPositionMarker.setPosition(new QMap.LatLng(prevProps.mySpot.latitude, prevProps.mySpot.longitude));
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // 清除所有的监听器
            this.map && QMap.event.clearListeners(this.map);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                style = _props.style;

            return _react2.default.createElement('div', _extends({
                ref: function ref(div) {
                    return _this2.container = div;
                },
                style: _extends({ width: '100%', height: '100%' }, style)
            }, { className: className }));
        }
    }]);

    return ReactQMap;
}(_react.Component);

ReactQMap.propTypes = {
    initialOptions: _propTypes2.default.object,
    getMap: _propTypes2.default.func,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    mySpot: _propTypes2.default.object,
    apiKey: _propTypes2.default.string.isRequired,
    center: _propTypes2.default.object.isRequired,
    getContainer: _propTypes2.default.func,
    libraries: _propTypes2.default.array
};

exports.default = ReactQMap;