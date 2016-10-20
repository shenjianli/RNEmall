'use strict';
var React = require('react-native');
var{
	AsyncStorage,
} = React;
//请求的json的url地址
var API_SLIDE_URL = "http://m.mall.icbc.com.cn/mobile/indexSlide.jhtml";
//数据缓存标志
var KEY_SLIDE = '@Slide';

function parseDateFromYYYYMMdd(str){
	if(!str) return new Date();
	return new Date(str.slice(0,4),str.slice(4,6)-1,str.slice(6,8));
}

Date.prototype.yyyymmdd = function(){
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString();
	var dd = this.getDate().toString();
	return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
};

//单例对象保存
function HomeDataRepository() {//Singleton pattern
	if (typeof HomeDataRepository.instance === 'object'){
		return HomeDataRepository.instance;
	}
	HomeDataRepository.instance = this;
}


/*
使用 prototype 属性来向对象添加方法
*/
HomeDataRepository.prototype._safeStorage = function(key: string){
	/*
	所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。
	Promise 对象有以下两个特点。
	（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。
	（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
	有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。
	Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
	*/
	return new Promise((resolve,reject) => {
		/*
		读取key字段并将结果作为第二个参数传递给callback。
		如果有任何错误发生，则会传递一个Error对象作为第一个参数。
		返回一个Promise对象。
		*/
		AsyncStorage.getItem(key,(error,result) =>{
			if(error){
				console.error(error);
				resolve(null);
			}
			else{
				console.log("调用获取本地数据函数 safeStorage" + result);
				var retData = JSON.parse(result);
				console.log(retData);
				resolve(retData);
			}
		});
	});
};
/*
使用 prototype 属性来向对象添加方法
*/
HomeDataRepository.prototype.getCover = function() {
	return this._safeStorage(KEY_SLIDE);
}
//更新闪屏广告url地址json数据
/*
javascript中的每个对象都有prototype属性，
Javascript中对象的prototype属性的解释是：返回对象类型原型的引用。
A.prototype = new B();
理解prototype不应把它和继承混淆。A的prototype为B的一个实例，
可以理解A将B中的方法和属性全部克隆了一遍。A能使用B的方法和属性。
这里强调的是克隆而不是继承。可以出现这种情况：A的prototype是B的实例，
同时B的prototype也是A的实例。
*/
/*
使用 prototype 属性来向对象添加方法
*/
HomeDataRepository.prototype.updateCover = function(){
	/*
	现在产生的 fetch 框架简直就是为了提供更加强大、高效的网络请求而生，
	虽然在目前会有一点浏览器兼容的问题，但是当我们进行 Hybrid App 开发的时候，
	如我之前介绍的Ionic 和React Native，都可以使用 fetch 进行完美的网络请求。
	*/
	/*
	在请求后的 Response 中，具体的定义在 这里 。
	常用的有：
	Response.status 也就是 StatusCode，如成功就是 200 ；
	Response.statusText 是 StatusCode 的描述文本，如成功就是 OK ；
	Response.ok 一个 Boolean 类型的值，判断是否正常返回，
	也就是 StatusCode 为 200-299 。
	*/
	/*
	Body 参数
	因为在 Request 和 Response 中都包含 Body 的实现，所以包含以下类型：
	ArrayBuffer
	ArrayBufferView (Uint8Array and friends)
	Blob/File
	string
	URLSearchParams
	FormData
	在 fetch 中实现了对应的方法，并返回的都是 Promise 类型。

	arrayBuffer()
	blob()
	json()
	text()
	formData()
	这样处理返回的数据类型就会变的特别地方便，如处理 json 格式的数据
	*/

	/*
	这里是一个格式更好的文档，比标准描述的页面更加清晰，供参考。
	https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
	*/
	fetch(API_SLIDE_URL)
	.then((response) => response.json())
	.then((responseData) => {
		//将key字段的值设置成value，并在完成后调用callback函数。
		//如果有任何错误发生，则会传递一个Error对象作为第一个参数。
		//返回一个Promise对象。
		console.log("调用更新闪屏数据方法 updateCover" + JSON.stringify(responseData));
		AsyncStorage.setItem(KEY_SLIDE,JSON.stringify(responseData),(error)=>{
			if(error){
				console.log(error);
			}
		});
	})
	.catch((error) => {
		console.error(error);
	})
	.done();
}
module.exports = HomeDataRepository;
