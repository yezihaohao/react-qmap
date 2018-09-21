# react-qmap -- React腾讯地图组件

#### 一个对腾讯web地图简单封装的React组件
 **GitHub源码地址：[戳我](https://github.com/yezihaohao/react-qmap)** 

 **栗子：[戳我](https://cheng_haohao.gitee.io/reactqmap/#/dashboard)**

 **栗子源码：[戳我](https://github.com/yezihaohao/react-qmap/tree/master/examples/src/components/maps)**  

![demo截图](https://raw.githubusercontent.com/yezihaohao/react-qmap/master/examples/src/styles/t.gif)

 **安装**
```
yarn add react-qmap  
or npm install react-qmap
```

 **基础用法** 

```
import ReactQMap from 'react-qmap';

<ReactQMap 
    center={{latitude: 30.53786, longitude: 104.07265}} 
    initialOptions={{zoomControl: true, mapTypeControl: true}} 
    apiKey="xxxxxx-xxxxx-xxxxx-xxxxxx"
    style={{height: 300}}    // 高度和宽度默认占父元素的100%
/>
```

#### API
Method            | Type     | Optional | Default | Description
----------------- | -------- | -------- | --------| -----------
getMap   | function | false |  |  获取地图的对象和当前容器的map对象,第一个参数是new的当前map对象，第二个参数是全局map对象
style   | object| false |  |  设置组件的内联样式，默认样式width: '100%', height: '100%'
className   | string| false |  |  设置组件的class
mySpot   | object| false |  |  设置地图的定位坐标
initialOptions   | object| false | zoom: 14,disableDefaultUI: true, zoomControl: false,mapTypeControl: false, |  初始化地图的参数，简单默认设置了几个，更多的初始化参数请参照[文档](http://lbs.qq.com/javascript_v2/doc/mapoptions.html)
apiKey   | string| true |  |  设置地图引用的key,为防止限制调用API,建议[官网](http://lbs.qq.com/index.html)申请自己的key
center   | object| true |  |  设置地图初始化的中心位置坐标
getContainer   | function| false |  |  获取地图的html dom元素的函数，参数是当前地图挂载的元素DOM

#### 其他框架和库的支持

##### [taro](https://github.com/NervJS/taro)
编译之后有问题，所以暂时采取复制文件到项目中的方式：

文件：[https://github.com/yezihaohao/react-qmap/blob/master/examples/src/components/maps/TaroQMap.js](https://github.com/yezihaohao/react-qmap/blob/master/examples/src/components/maps/TaroQMap.js)
```js
// 复制文件到相应的目录，例如当前文件目录
// taro对应的文件代码中使用
import TaroQMap from './TaroQMap';

{process.env.TARO_ENV === 'h5' && (
    <View style={{ height: 500, width: 500 }}>
        <TaroQMap 
            center={{latitude: 30.53786, longitude: 104.07265}} 
            mySpot={{latitude: 30.53786, longitude: 104.07265}}
            apiKey="xxxxx"
        />
    </View>
)}
```


#### 关于
有了初始化的地图，获取到地图对象之后，就可以按照官网提供的资料随心所欲了。

更多关于API的操作请查看腾讯地图官网（[戳我](http://lbs.qq.com/javascript_v2/doc/index.html#g0)）

封装还在继续，如果老铁有更好的方式或想法不妨PR走起一波~会给你双击666

如果有问题可加入前端交流群一起讨论：前端攻城狮②群：592688854

#### license
MIT

