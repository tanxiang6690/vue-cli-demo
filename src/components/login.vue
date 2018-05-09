<template>
	<div class="loginValidation">
		<!-- 手机号 -->
		<div class="login" v-show="show">
			<i class="iconfont icon-guanbi" @click="close()"></i>
			<p>登录</p>
			<div class="region">
				国家/地区
				<i class="iconfont icon-right"></i>
			</div>
			<div class="phone">
				<input type="number" class="phonenumber" name="phonenumber" placeholder="请输入手机号" v-on:input="choose()" ref="input1" v-model="phone">
			</div>
			<i class="tipe" v-show="verificationCode"> {{tipe}} </i>
			<div class="nextStep" @click="nextStep()" :class="{ selected: hasvalidation }">下一步</div>
		</div>
		<!-- 验证码 -->
		<div class="validation" v-show="shows">
			<i class="iconfont icon-guanbi" @click="closes()"></i>
			<p>请输入验证码</p>
			<div class="region">
				{{phone}}
				<i class="time">{{count}}s</i>
			</div>
			<div class="phone">
				<input type="number" class="validationnumber" name="validationnumber" placeholder="请输入验证码" v-on:input="chooses()" ref="input2" v-model="message">
			</div>
			<i class="tipe" v-show="verificationCodes"> {{tipes}} </i>
			<div class="nextStep" @click="login()" :class="{ selected: hasvalidations }">登录</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				shows: false,
				count: '',
				hasvalidation: false,
				hasvalidations: false,
				verificationCode: false,
				verificationCodes: false,
				phone: '',
				tipe: '',
				tipes: '',
				message: '',
				key: '',
			}
		},
		methods: {
			close() {
				let _this = this;
				_this.show = false;
			},
			closes() {
				let _this = this;
				_this.shows = false;
			},
			nextStep() {
				let _this = this;
				let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(_this.phone == '') {
					_this.verificationCode = true;
					_this.tipe = '*请输入手机号！'
				} else if(!reg.test(this.phone)) {
					_this.verificationCode = true;
					_this.tipe = '*手机号输入有误，请重新输入！'
				} else {
					_this.show = false;
					_this.shows = true;
					const TIME_COUNT = 60;
					if(!this.timer) {       
						this.count = TIME_COUNT;       
						this.timer = setInterval(() => {       
							if(this.count > 0 && this.count <= TIME_COUNT) {         
								this.count--;        
							} else {         
								this.show = true;         
								clearInterval(this.timer);         
								this.timer = null;        
							}       
						}, 1000)      
					}
				}
			},
			login() {
				let _this = this;
				if(_this.message == '') {
					_this.verificationCodes = true;
					_this.tipes = '*请输入验证码！'
				} else if(!(_this.message.length == 4)) {
					_this.verificationCodes = true;
					_this.tipes = '*验证码输入有误，请重新输入！'
				} else {
					_this.verificationCodes = false;
					_this.$axios.get('/api/verifyCode', {
							params: {
								phone: this.phone,
								type: 0,
							}
						})
						.then(function(response) {
							if(response.data.code == 200) {
								_this.key = response.data.data.key
								_this.logins();
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}
			},
			logins() {
				let _this = this;
				_this.$axios.post('/api/login', {
						verification_key: this.key,
						verification_code: '1234',
						type: 0
					})
					.then(function(response) {
						if(response.data.code == 200) {
							_this.shows = false;
							sessionStorage.setItem('token', response.data.data.access_token)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			choose() {
				let _this = this;
				if(_this.$refs.input1.value == '') {
					_this.hasvalidation = false;
				} else {
					_this.hasvalidation = true;
				}
			},
			chooses() {
				let _this = this;
				if(_this.$refs.input2.value == '') {
					_this.hasvalidations = false;
				} else {
					_this.hasvalidations = true;
				}
			},
		}
	}
</script>

<style scoped>
	.loginValidation {
		background-color: #999;
		max-width: 750px;
		position: relative;
		box-sizing: border-box;
		min-height: 100vh;
	}
	
	.login,
	.validation {
		width: 494px;
		height: 320px;
		padding: 52px 73px 68px 73px;
		background-color: #fff;
		border-radius: 8px;
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	
	.validation {
		height: 430px;
	}
	
	.login p,
	.validation p {
		text-align: center;
		font-size: 38px;
		margin: 0 auto 0px auto;
	}
	
	.phone,
	.region {
		height: 116px;
		line-height: 116px;
		font-size: 31px;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.login .region {
		display: none;
	}
	
	.phone {
		margin-bottom: 20px;
	}
	
	.nextStep {
		width: 494px;
		height: 86px;
		background-color: #d2d2d2;
		border-radius: 5px;
		text-align: center;
		line-height: 86px;
		color: #fff;
		font-size: 30px;
		margin-top: 40px;
	}
	
	.validation .nextStep {
		background-color: #d2d2d2;
	}
	
	.icon-right {
		font-size: 28px;
		color: #999;
		float: right;
	}
	
	.time {
		float: right;
		font-size: 28px;
		color: #9e2026;
	}
	
	.icon-guanbi {
		position: absolute;
		right: 30px;
		top: 30px;
		color: #d2d2d2;
		font-size: 60px;
	}
	
	input {
		background: none;
		outline: none;
		border: 0px;
		color: #000;
	}
	
	input::-webkit-input-placeholder {
		color: #999;
	}
	
	.selected {
		background-color: #9e2026;
	}
	
	.validation .selected {
		background-color: #9e2026;
	}
	
	.tipe {
		font-size: 8px;
		display: inline-block;
		text-align: left;
		color: #9e2026;
	}
</style>