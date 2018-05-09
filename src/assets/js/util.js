export default {
	install: function(Vue, op) {
		// 将时间戳转换成具体时间的函数：月+日+时+分+秒
		Vue.prototype.timestampToTime = function(timestamp) {
			var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
			var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			// var h = date.getHours() + ':';
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			// var m = date.getMinutes() + ':';
			var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			// var s = date.getSeconds();
			var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return M + D + h + m + s;
		};
	}
}