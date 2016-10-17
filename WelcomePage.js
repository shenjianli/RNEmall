'use strict';
/*
标记
严格模式后其一：如果在语法检测时发现语法问题，则整个代码块失效，并导致一个语法异常。
其二：如果在运行期出现了违反严格模式的代码，则抛出执行异常。
注：经过测试IE6,7,8,9均不支持严格模式。
*/

/*
•相对路径之当前目录：./xxx/xxx.js 或 ./xxx/xxx。
•相对路径之上级目录：../xxx/xxx.js 或 ../xxx/xxx。
•绝对路径：F:/xxx/xxx.js 或 /xxx/xxx.js 或 /xxx/xxx。

require(路径.扩展名)：
如果 路径.扩展名 存在
执行加载 并 返回
否则
抛出异常

require(路径)：
如果 路径.js 存在
执行加载 并 返回
如果 路径.node 存在
执行加载 并 返回
如果 路径/package.json 存在
执行加载(package.json 中 main属性对应的路径) 并 返回
如果 路径/index.js 存在
执行加载 并 返回
如果 路径/index.node 存在
执行加载 并 返回
抛出异常

require(模块名字)：
如果 模块名字是系统模块
执行加载 并 返回
如果 require(./node_modules/模块名字) 能加载到模块  //参考require(路径)的介绍
执行加载 并 返回
如果 require(../node_modules/模块名字) 能加载到模块  //参考require(路径)的介绍
执行加载 并 返回
沿着目录向上逐级执行require(上级目录/node_modules/模块名字)，如果能加载到模块  //参考require(路径)的介绍
执行加载 并 返回
抛出异常
*/
var React = require('react-native');

/**
AsyncStorage
异步存储是一个简单的、异步的、持久的、全局的、键-值存储系统。
它应该会代替本地存储被使用。
由于异步存储是全局性的，建议您在异步存储之上使用抽象体，
而不是对任何轻微用法直接使用异步存储。
在本地 iOS 实现上 JS 代码是一个简单的外观模式，
用来提供一个清晰的 JS API，真正的错误对象，和简单的非多元化功能。
每个方法返回一个 Promise 对象。

它有很多方法，每一个方法都有回调函数，
第一个参数是错误对象，错了就是展示错误信息，否则为null。
都会返回一个Promise对象。
•static getItem(key:string , callback:(error,result)):
根据键来获取值，获取的结果会在回调函数中。
•static setItem(key:string , value:string , callback:(error)): 设置键值对。
•static removeItem(key:string , callback:(error)): 将根据键移出一项
•static mergeItem:(key:string , value:string , callback:(error)):
合并现有的值和输入值。
•static clear(callback:(error)): 清除所有的项目。
•static getAllKeys(callback:(error)): 获取所有的键。
•static multiGet(keys,callback:(errors,result)):获取多项，其中keys是字符串数组。
•static multiSet(keyValuePairs,callback:(errors)):
设置多项，其中keyValuePairs是字符串的二维数组。
•static multiRemove(keys,callback(errors)):删除多项，其中keys是字符串数组。
•static multiMerge(keyValuePairs,callback:(errors)):
多个键值合并，其中keyValuePairs是字符串中的二维数组。

*/

/*
本模块用于获取设备屏幕的宽高。
static get(dim: string)
初始的尺寸信息应该在runApplication之后被执行，
所以它可以在任何其他的require被执行之前就可用。
不过在稍后可能还会更新。
注意：尽管尺寸信息立即就可用，但它可能会在将来被修改（譬如设备的方向改变），
所以基于这些常量的渲染逻辑和样式应当每次render之后都调用此函数，
而不是将对应的值保存下来。
（举例来说，你可能需要使用内联的样式而不是在StyleSheet中保存相应的尺寸）。
例子：var {height, width} = Dimensions.get('window');

AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的。
它用来代替LocalStorage。
我们推荐您在AsyncStorage的基础上做一层抽象封装，而不是直接使用AsyncStorage。
译注：推荐由React Native中文网封装维护的react-native-storage模块，提供了较多便利功能。
本模块的JS代码提供了对原生实现的一个封装，以提供一个更清晰的JS API、返回真正的错误对象，
以及简单的单项对象操作函数。每个方法都会返回一个Promise对象。
*/

var {
	AsyncStorage,
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
} = React;



/*
动画是现代用户体验中非常重要的一个部分，
Animated库就是用来创造流畅、强大、并且易于构建和维护的动画。
最简单的工作流程就是创建一个Animated.Value，
把它绑定到组件的一个或多个样式属性上。
然后可以通过动画驱动它，譬如Animated.timing，或者通过Animated.event把它关联到
一个手势上，譬如拖动或者滑动操作。除了样式，Animated.value还可以绑定到props上，
并且一样可以被插值。
*/
var Animated = require('Animated');
var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

var WelcomePage = React.createClass({
	/*
	用于驱动动画的标准值。一个Animated.Value可以用一种同步的方式驱动多个属性，
	但同时只能被一个行为所驱动。启用一个新的行为（譬如开始一个新的动画，或者运行setValue）
	会停止任何之前的动作。
	*/

	//1.初始化组件状态
	getInitialState:function(){
		console.log("调用初始化组件 getInitialState 方法");
		return {
			fadeAnim:new Animated.Value(0.5),
		};
	},

	//2.通知组件已经加载完成
	componentDidMount: function(){
		console.log("通知组件已经加载完成 componentDidMount 方法");

		//推动一个值按照一个过渡曲线而随时间变化。Easing模块定义了一大堆曲线，
		//你也可以使用你自己的函数
		Animated.timing(
			this.state.fadeAnim,
			{
				toValue:1,
				duration:2000,
			}
		).start();
	},

	//3.渲染函数 
	render:function(){
		var img,text;
		img = require('image!splash');
		text = '撑起头顶的天';

		return (
			<View style={styles.container}>
			<Animated.Image
			source={img}
			style={{
			flex: 1,
			width: WINDOW_WIDTH,
			height: 1,
			transform: [
			],
			opacity:this.state.fadeAnim
		}}/>

		<Text style={styles.text}>
			{text}
		</Text>
		<Image style={styles.logo} source={require('image!splash_logo')}/>
	</View>
		);
	}

	//uri是一个表示图片的资源标识的字符串，
	//它可以是一个http地址或是一个本地文件路径（使用require(相对路径)来引用）。

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
	},
	cover: {
    flex: 1,
    width: 200,
    height: 1,
  },
	/*
	resizeMode enum('cover', 'contain', 'stretch')
	决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。
	cover: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸
	（如果容器有padding内衬的话，则相应减去）。译注：这样图片完全覆盖甚至超出容器，
	容器中不留任何空白。
	contain: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸
	（如果容器有padding内衬的话，则相应减去）。译注：这样图片完全被包裹在容器中，
	容器中可能留有空白
	stretch: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。
	*/
	logo:{
		resizeMode: 'contain',
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 30,
		height: 54,
		backgroundColor: 'blue',
	},
	text:{
		flex:1,
		fontSize: 16,
		textAlign: 'center',
		color: 'white',
		position:'absolute',
		left: 0,
		right: 0,
		bottom: 10,
		backgroundColor: 'red',
	}
});

module.exports = WelcomePage;
