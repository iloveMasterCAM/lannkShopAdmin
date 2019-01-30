<template>
  <div id="main">
    <div id="main_box"></div>
    <div class="aui-row">
      <div class="login_box wrap">
        <div class="aui-row">
          <ul class="aui-row title rightTitle aui-pull-right">
            <li class="aui-pull-left login" :class="{'active':active}" @click="tabNav">登录</li>
            <li class="aui-pull-left register" :class="{'active':!active}" @click="tabNav">注册</li>
          </ul>
          <p class="tips" v-show="tipsShow" v-text="tipsVal"></p>
        </div>

        <div v-show="active" class id="login">
          <div class="aui-pull-left left">
            <img src="../assets/login/login.jpg" alt>
          </div>
          <div class="aui-pull-right right">
            <div class="account">
              <p class="userName">用户名</p>
              <div class="bor">
                <input type="text" v-model="phoneLogin" placeholder="请输入手机号码">
              </div>
            </div>
            <div class="password">
              <p class="userpassword">密码</p>
              <div class="bor">
                <input ref="password"
                  type="password"
                
                  v-model="passwordLongin"
                  class="aui-padded-r-15"
                  placeholder="请输入6~12位密码"
                >
                <i class="iconfont icon" :class="{'icon-kanjian':!kanjian,'icon-bukejian':kanjian}" @click="kj"></i>
              </div>
            </div>
              <div class="password">
              <p class="userpassword">校验码</p>
              <div class="bor aui-row">
                <div class="aui-col-xs-6"><input ref="code"
                  type="text"
                  v-model="logincode"
                  class="aui-padded-r-15"
                  placeholder="请输入校验码"
                ></div>
                <div class="aui-col-xs-4 aui-pull-right"> <img class="code" @click="upCode" src="http://192.168.1.8:8080/code/lkCode" alt=""></div> 
               
              </div>
            </div>
            <div class="aui-row jz">
              <div class="aui-pull-left">
                <label for="jz">
                  <el-checkbox id="jz" v-model="checkedjz">记住账号</el-checkbox>
                </label>
              </div>
              <div class="aui-pull-right">忘记密码?</div>
            </div>
            <div class="login_btn_box aui-text-center">
              <p class="login_btn">
                <input type="submit" @click="login" value="立即登录">
              </p>
            </div>
            <div class="aui-text-center threeLogin">
              <span>使用其他方式登录</span>
              <i class="iconfont icon-share-"></i>
              <i class="iconfont icon-QQ"></i>
              <i class="iconfont icon-zhifubao"></i>
            </div>
          </div>
        </div>
        <div v-show="!active" class="register_box wrap" id="register">
          <div class="aui-pull-left left">
            <img src="../assets/login/register.jpg" alt>
          </div>
          <div class="aui-pull-right right">
            <div class="account">
              <p class="userName">用户名</p>
              <div class="bor">
                <input type="text" @blur="isRegisterFun" v-model="phone" placeholder="请输入手机号码或邮箱">
              </div>
            </div>
            <div class="password">
              <p class="userpassword">密码</p>
              <div class="bor ">
                <input
                  type="password"
                  @blur="passwordFun"
                  v-model="passwordVal"
                  class="aui-padded-r-15"
                  placeholder="请输入6~12位密码"
                >
                <i class="iconfont icon-kanjian icon"></i>
              </div>
            </div>
            <div class="password code">
              <p class="userpassword">校验码</p>
              <div class="bor">
                <input type="text" v-model="code" class="aui-padded-r-15" placeholder="请输入校验码">
                <span class="send" @click="sendCode" v-text="codeMsg"></span>
              </div>
            </div>
            <div class="aui-row jz">
              <div class="aui-pull-left">
                <label for="zc">
                  <el-checkbox id="zc" v-model="checked">注册表示同意《注册协议》</el-checkbox>
                </label>
              </div>
            </div>
            <div class="login_btn_box aui-text-center">
              <p class="login_btn">
                <input type="submit" @click="register" value="立即注册">
              </p>
            </div>
            <!-- <div class="aui-text-center threeLogin">
                        <span>使用其他方式登录</span> <i class="iconfont icon-share-"></i> <i class="iconfont icon-QQ"></i> <i
                            class="iconfont icon-zhifubao"></i>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      codeMsg: "发送校验码",
      code: "",
      active: true,
      isRegister: false,
      passwordVal: "",
      tipsVal: "登录错误！",
      tipsShow: false,
      phone: "",
      checkedjz: false,
      checked: false,
      phoneLogin: "",
      passwordLongin: "",
      isclick: true,
      kanjian:true,
     logincode:''
    };
  },
  methods: {
    // 更新校验码
    upCode(e){
      e.target.src ='http://192.168.1.8:8080/code/lkCode?t=' + this.genTimestamp()
    },
    genTimestamp() {
			var time = new Date();
			return time.getTime();
		},
    // 判断手机
    isRegisterFun() {
      if (!this.isPhone(this.phone)) return;

      let that = this;
      this.ajax.post("regist/checkPhone.do", { phone: this.phone }, function(
        r
      ) {
        console.log(r);
        if (r.s) {
          that.isRegister = true;
        } else {
          that.isRegister = false;
          that.tips("手机号已存在");
        }
      });
    },
    //密码验证
    passwordFun() {
      var reg = /^[0-9|a-z|A-Z]{6,12}$/;
      if (!reg.test(this.passwordVal)) {
        this.tips("密码错误！");
        return false;
      } else {
        return true;
      }
    },
    //发送验证码
    sendCode() {
      let that = this;
      if (!this.isPhone(this.phone)) return;
      if (!that.isRegister) {
        this.tips("手机已被注册");
        return;
      }
      //regist/sendMsg.do
      localStorage["now"] = parseInt(new Date().valueOf() / 1000);
      if ((!this.time && !localStorage["time"]) ||  Math.abs(localStorage["now"]) - Math.abs(localStorage["time"]) > 10 ) {
        console.log(that.phone);
        this.ajax.post(
          "shops/regist/sendMsg.do",
          { phone: that.phone },
          function(r) {
            // this.ajax.post('shops/regist/sendMsg.do',{'phone':'16607092387'},function(r){
            console.log(r);
            if (r && r.s) {
              that.codeMsg = "09/S";
              localStorage["time"] = parseInt(new Date().valueOf() / 1000);
              clearInterval(that.time);
              that.time = setInterval(() => {
                var num = parseInt(that.codeMsg) - 1;
                that.codeMsg = num + "/S";
                if (num == 0) {
                  that.codeMsg = "重新发送";
                  clearInterval(that.time);
                  that.time = null;
                }
              }, 1000);
            }
          }
        );
      } else {
        console.log("时间还没到");
      }
    },
    //点击注册
    register() {
      if (!this.isclick) return;
      that.isclick = false;
      console.log("点击注册");
      this.tipsShow = false;
      if (!this.isPhone(this.phone)) return;
      if (!this.passwordFun()) return;
      if (this.code.length < 4) {
        this.tips("校验码错误");
        return;
      }
      if (!this.checked) {
        this.tips("未同意协议");
        return;
      }


      this.ajax.post(
        "merchant/regist.do",
        { username: this.phone, password: this.passwordVal, code: this.code },
        function(r) {
          //  this.ajax.post('shops/merchant/regist.do',{'username':'16607092387','password':this.passwordVal,'code':this.code},function(r){
          console.log(r);
          // if (r.s) {
          //   alert("注册成功");
          //   // that.isRegister = true;
          // }
          that.isclick = true;
        }
      );
    },
    login() {
      let that = this;

      if (!this.isclick) return;
    
      console.log("点击登录");
      if (!this.phoneLogin) {
        this.tips("手机号错误");
        return;
      }
      if (!this.passwordLongin) {
        this.tips("密码错误！");
        return;
      }
        if (!this.logincode) {
        this.tips("验证码错误");
        return;
      }
      //logincode
      console.log(this.phoneLogin);
      console.log(this.passwordLongin);
      that.isclick = false;
      this.axios.post("merchant/login.do",  { username: this.phoneLogin, password: this.passwordLongin ,code:this.logincode},
        function(r) {
          console.log(r);
          if (r.s) {
            ///alert("登录成功");
            // that.isRegister = true;
            if (that.checkedjz) {
              that.token.setCookie("token", r.d.token, 9);
            } else {
              that.token.setCookie("token", r.d.token, 1);
            }
            that.$router.push({
                 path:'/'
            });
          }else{
             that.tips("账号或密码错误！");
          }
          that.isclick = true;
        }
      );
    },
    kj(){
      this.kanjian = ! this.kanjian
      if(this.kanjian){
         this.$refs.password.type = 'password'
      }else{
        this.$refs.password.type = 'text'
        
      }
    },
    isPhone(v) {
      var reg = /^1[2,3,4,5,6,7,8,9][0-9]{9}$/;
      if (!reg.test(v)) {
        this.tips("手机号错误！");
        return false;
      } else {
        return true;
      }
    },
    tips(v) {
      this.tipsShow = true;
      this.tipsVal = v;
    },

    tabNav() {
      this.active = !this.active;

      //alert('11212')
      //shops/regist/checkPhone.do
      // axios.post('http://192.168.1.8:8080/FH-WEB/shops/regist/checkPhone.do',{
      // 	data:{PHONE:'17750877003'}
      // }).then( (e,r)=> {
      // 	console.log(e)
      // 	console.log(r)
      // })

      //   this.$axios.post("regist/checkPhone.do",  JSON.stringify({
      //     PHONE:'17750877003'
      //     }))
      //     .then(function(response) {
      //       console.log(response);
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
    }
  },
  mounted() {
    let that = this;
    document.onkeydown = function(e) {
      if (!e) e = window.event;
      if ((e.keyCode || e.which) == 8) {
        that.tipsShow = false;
      }
    };
    this.token.delCookie('token')
    /*    var data = new FormData();
    data.append('phone','17750877003')
    this.axios({
      method:'post',
      url:'http://192.168.1.8:8080/FH-WEB/shops/regist/checkPhone.do',
      data:data
    }).then(function(r){
      console.log(r)
    }) */
    //  this.ajax.post('shops/merchant/regist.do',{'PHONE':'17750877003','PASSWORD':'1511515','code':'51545'},function(r){
    //       console.log(r)

    //     })
    if(that.token.getCookie("token")){
      this.$router.push('/')
    }
   
  }
  //   beforeCreate: function() {
  //     console.log("2121245");
  //   }
};
</script>

<style scoped>
@import "../assets/aui/aui.css";
#login .code{
  width: 100px;
  position: absolute;
  right: 0;
  top: 0;
}
#main_box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-position: top center;
  background-repeat: no-repeat;
  background-image: url(../assets/login/500264184.jpg);

  background-size: cover;
}
#main .login_box input::placeholder {
  font-size: 12px;
}
#main .login_box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1100px;
  margin: -270px 0 0 -550px;
  z-index: 1002;
  background: #f5f6f8;
}
#main .input_box {
  position: relative;
  border-bottom: 1px dotted #ccc;
  margin-top: 20px;
}
#main .input_box i {
  position: absolute;
  top: 16px;
  left: 4px;
}
#main .login_box .input_box input {
  padding-left: 30px;
}

#main .tips {
  position: absolute;
  right: 80px;
  top: 40px;
  color: #f53434;
  font-size: 13px;
}
#main .left {
  width: 0;
  height: 100%;
  padding-top: 120px;
}
#main .left img {
  position: absolute;
  left: 60px;
  bottom: -1px;
  width: 550px;
}
#main .register_box .left img {
  left: 0px;
}
#main .right {
  width: 550px;
  padding: 38px 80px 35px 80px;
}
.wrap .title {
  margin-top: 30px;
}
.wrap.register_box .title {
  margin-bottom: 20px;
}
.wrap .title li {
  font-size: 22px;
  font-weight: 600;
  margin-right: 35px;
  padding-bottom: 5px;
  border-bottom: 3px solid transparent;
  color: #1c1a1a;
}

.wrap .title li.active {
  color: #229eff;
  border-color: #229eff;
}

.wrap .userName,
.wrap .userpassword {
  font-size: 16px;
  color: #1c1a1a;
  font-weight: 700;
  margin-bottom: 5px;
}
.wrap.register_box .userName,
.wrap.register_box .userpassword {
  margin-bottom: 0;
}
.wrap .bor {
  border-bottom: 1px solid #bfbfbf;
}
.wrap .password {
  margin: 30px 0;
  position: relative;
}

.wrap .login_btn_box {
  margin: 40px 0 50px;
}
.wrap.register_box .login_btn_box {
  margin: 32px 0 43px;
}
.wrap .login_btn {
  color: #fff;
  font-size: 17px;
  width: 80%;
  margin: 0 auto;
  line-height: 35px;
  border-radius: 30px;
  background: #229eff;
  box-shadow: 0px 3px 20px 0px #229eff;
}
.wrap .login_btn input {
  width: 100%;
  background: transparent;
}
.wrap .threeLogin span,
.wrap .threeLogin i {
  color: #bbbbbb;
  font-size: 14px;
}
.wrap .threeLogin i {
  padding: 0 10px;
  font-size: 16px;
}
.wrap .aui-checkbox {
  background: #ddd;
  border-color: #ddd;
  border-radius: 0.2rem;
}
.wrap .aui-checkbox:checked {
  background: #229eff;
}
.wrap .jz div {
  color: #bfbfbf;
}
.wrap .password .icon {
  position: absolute;
  bottom: 10px;
  right: 0;
}
.wrap .code span {
  position: absolute;
  bottom: 5px;
  right: 0;
  border-radius: 30px;
  line-height: 15px;
  padding: 3px 6px;
  border: 1px solid #229eff;
  color: #229eff;
}

#main .rightTitle {
  width: 550px;
  padding: 0 0 0 80px;
}
</style>


