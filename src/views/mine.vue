<template>
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content" id="main-content">
      <div class="title">个人信息设置</div>
      <div class="content">
        <div class="side  left">
          <ul @click="tabMine">
            <li class="first">
              <i class="iconfont icon-yonghuziliaogerenxinxigerenziliao-xianxing"></i>个人信息
            </li>
            <li class num="0" :class="{active:isShow == 0}">
              <i class="iconfont icon-class"></i>基本设置
            </li>
            <li num="1" :class="{active:isShow == 1}">
              <i class="iconfont icon-anquan"></i>安全设置
            </li>
            <li num="2" :class="{active:isShow == 2}">
              <i class="iconfont icon-shouji"></i>更换手机
            </li>
            <li num="3" :class="{active:isShow == 3}">
              <i class="iconfont icon-bangzhu"></i>帮助
            </li>
          </ul>
        </div>
        <div class="cneter userInfo" v-show="isShow == 0">
          <div class="clearfix">
            <div class="c_left pull-left">姓名:</div>
            <div class="c_right pull-right clearfix">
              <div class="col-xs-7">
                <el-input
                  v-model="USERNAME"
                  @blur="isName"
                  :readonly="readonly"
                  placeholder="请输入姓名"
                ></el-input>
              </div>
              <div class="col-xs-3 pull-right text-right">
                <!-- <el-button @click="edit" type="primary">{{editTxt}}</el-button> -->
              </div>
            </div>
          </div>

          <div class="clearfix">
            <div class="c_left pull-left">账号名称:</div>
            <div class="c_right pull-right">
              <div class="col-xs-9">
                <el-input v-model="NAME" :readonly="readonly" placeholder="请输入账号名称"></el-input>
              </div>
            </div>
          </div>
          <div class="clearfix">
            <div class="c_left pull-left">选择性别:</div>
            <div class="c_right pull-right sex">
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="2">女</el-radio>
            </div>
          </div>
          <div class="clearfix">
            <div class="c_left pull-left">手机号码:</div>
            <div class="c_right pull-right">
              <el-input v-model="PHONE" :readonly="!readonly" placeholder="请输入手机号码"></el-input>
            </div>
          </div>
          <div class="clearfix">
            <div class="c_left pull-left">邮箱:</div>
            <div class="c_right pull-right">
              <el-input :readonly="readonly" v-model="email" placeholder="请输入邮箱"></el-input>
            </div>
          </div>

          <div class="clearfix">
            <div class="c_left pull-left">QQ:</div>
            <div class="c_right pull-right">
              <el-input :readonly="readonly" v-model="qq_NUMBER" placeholder="请输入QQ"></el-input>
            </div>
          </div>
          <div class="clearfix">
            <div class="c_left pull-left">所属区域:</div>
            <div class="c_right pull-right address">
              <div class="col-xs-6">
                <el-select v-model="province" :disabled="readonly" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-xs-6">
                <el-select v-model="city" :disabled="readonly" class="pull-right" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="clearfix">
            <div class="c_left pull-left">出生日期:</div>
            <div class="c_right pull-right age">
              <div>
                <el-date-picker
                  v-model="age"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="clearfix">
            <div class="c_left pull-left">修改头像:</div>
            <div class="c_right pull-right headImg">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2082925491,3690093855&fm=27&gp=0.jpg"
                alt
              >
              <span class="edit">
                <i class="iconfont icon-bianji"></i>
              </span>
            </div>
          </div>
          <div class="clearfix">
            <div class="c_left pull-left">&nbsp;</div>
            <div class="c_right pull-right confim">
              <span>返回修改</span>
              <span class="save" @click="save" v-show="!readonly">保存提交</span>
            </div>
          </div>
        </div>
        <div class="cneter  passwrold" v-show="isShow == 1">
          <div>
            <p class="tips_box">
              旧密码
              <span class="tips" v-show="tipsShow" v-text="tipsVal"></span>
            </p>
            <p>
              <el-input v-model="oldPasw" @blur="oldPaswFn" type="password" placeholder="请输入旧密码"></el-input>
            </p>
          </div>
          <div>
            <p>新密码</p>
            <p>
              <el-input v-model="newPasw" type="password" placeholder="请输入新密码"></el-input>
            </p>
          </div>
          <div>
            <p>确认密码</p>
            <p>
              <el-input v-model="confrimPasw" type="password" placeholder="请输入确认密码"></el-input>
            </p>
          </div>
          <div class="confim">
            <span class="save" @click="savePasw">确认保存</span>
          </div>
        </div>
        <div class="cneter  phone tips_box" v-show="isShow == 2">
          <span class="tips" v-show="tipsShowPhone" v-text="tipsValPhone"></span>

          <div class="status">
            <div>
              <!-- step -->
              <span class :class="{'active':step >= 0}">1</span>修改手机
            </div>
            <div class="new">
              <span class :class="{'active':step>=1 }">2</span>绑定新手机
            </div>
            <div>
              <span :class="{'active':step >= 2}">3</span>完成
            </div>
          </div>
          <div class="old" v-show="step == 0">
            <p>原始手机号</p>
            <div class="clearfix box">
              <div class="col-xs-9">
                <el-input v-model="setPhone.oldPhone" placeholder="请输入姓名"></el-input>
              </div>
              <div class="col-xs-3">
                <span class="send" @click="send" v-text="setPhone.codeMsg"></span>
              </div>
            </div>
            <p>验证码</p>
            <div class="clearfix box">
              <div class="col-xs-9">
                <el-input v-model="setPhone.code" placeholder="输入验证码"></el-input>
              </div>
            </div>
            <div class="confim">
              <span class="save" @click="next">下一步</span>
            </div>
          </div>
          <div class="new" v-show="step == 1">
            <p>绑定新手机</p>
            <div class="clearfix box">
              <div class="col-xs-9">
                <el-input v-model="setPhone.newPhone" placeholder="请输入绑定新手机"></el-input>
              </div>
              <div class="col-xs-3">
                <span class="send" v-text="setPhone.codeMsg"  @click="send"></span>
              </div>
            </div>
            <p>验证码</p>
            <div class="clearfix box">
              <div class="col-xs-9">
                <el-input v-model="setPhone.code" placeholder="输入验证码"></el-input>
              </div>
            </div>
            <div class="confim">
              <span class="save"  @click="next">确定修改</span>
            </div>
          </div>
          <div class="success text-center" v-show="step == 2">
            <div>
              <i class="iconfont icon-chenggong"></i>
            </div>
            <div>
              <h2>修改成功</h2>
            </div>
            <div>
              <p class="newPhone">
                当前手机号:
                <span>17750877003</span>
              </p>
            </div>
          </div>
        </div>
        <div class="side right ">
          <div class="headImgbg">
            <div>
              <p>
                <img
                  class="headimg"
                  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2082925491,3690093855&fm=27&gp=0.jpg"
                  alt
                >
              </p>
              <p>
                <span>你好</span>
                <i class="iconfont icon-nan"></i>
              </p>
            </div>
          </div>
          <ul>
            <li>
              <i class="iconfont icon-shijian"></i>胡建厦门
            </li>
            <li>
              <i class="iconfont icon-shijian"></i>1998-10-01
            </li>
            <li>
              <i class="iconfont icon-tubiao209"></i>{{email}}
            </li>
            <li>
              <i class="iconfont icon-shouji"></i>
              {{PHONE|| '*******'}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <img id="img" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3243445518,1285394533&fm=27&gp=0.jpg" alt=""> -->
    <!-- END MAIN CONTENT -->
  </div>
</template>
<style scoped>

#main-content .right .headImgbg {
  height: 160px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(../assets/head_bg.jpg);
  text-align: center;
  padding-top: 40px;
}
#main-content .right .headImgbg span,
#main-content .right .headImgbg i {
  color: #fff;
}
#main-content .right .headimg {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
#main-content .right ul{
  padding: 0 20px;
}
#main-content .right ul li {
  line-height: 45px;
  border-bottom: 1px solid #eee;
}
#main-content .right ul li:last-child{
  border-bottom: none;
}
#main-content .phone .status {
  display: flex;
  justify-content: space-between;
}
#main-content .phone .tips {
  top: 70px;
  right: 50px;
}
#main-content .phone .status span {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #b4bac4;
  text-align: center;
  line-height: 25px;
  margin-right: 5px;
  color: #b4bac4;
}
#main-content .phone .status span.active {
  background: #328ffe;
  color: #fff;
  border-color: #328ffe;
}
#main-content .phone .status .new {
  position: relative;
}
#main-content .phone .status .new::before {
  content: "";
  display: block;
  position: absolute;
  top: 49%;
  left: 160px;
  width: 140px;
  height: 1px;
  background: #f3f5f7;
}
#main-content .phone .status .new::after {
  content: "";
  display: block;
  position: absolute;
  top: 49%;
  right: 160px;
  width: 140px;
  height: 1px;
  background: #f3f5f7;
}
#main-content .phone .confim {
  margin-top: 50px;
}
#main-content .phone .box {
  margin-bottom: 20px;
}
#main-content .phone .send {
  padding: 6px 15px;
  border-radius: 2px;
  color: #328ffe;
  border: 1px solid #328ffe;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
#main-content .phone .success {
  padding-top: 70px;
}
#main-content .phone .success h2 {
  color: #a8afbb;
  margin: 0;
  margin-bottom: 20px;
}
#main-content .phone .icon-chenggong {
  font-size: 100px;
  color: #328ffe;
}
#main-content .newPhone {
  display: inline-block;
  background: #f3f5f7;
  padding: 10px 25px;
  color: #647787;
}
#main-content .col-xs-7 {
  width: 58.33333333%;
}
#main-content .tips_box {
  position: relative;
}
#main-content .tips {
  position: absolute;
  top: 0;
  right: 0;
  color: #f53434;
  font-size: 13px;
}


li {
  list-style: none;
}
#main-content {
  font-family: "微软雅黑";
   font-size: 14px;
}
.main-content {
  margin-top: 30px;
  margin-left: 30px;
  background: #fff;
  padding: 30px 50px;
}
#main-content .title {
  font-size: 17px;
  color: #1e1c1c;
}

#main-content .side {
  width: 19%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-width: 250px;
}
#main-content .side li i {
  margin-right: 10px;
}
#main-content .cneter {
  width: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-height: 500px;

  min-width: 400px;
  min-height: 700px;
  padding: 30px 2%;
  box-sizing: border-box;
}
#main-content .cneter > div {
  margin-bottom: 25px;
}
#main-content .content {
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
#main-content .left {
  padding: 30px 15px;
}
#main-content .left li {
  line-height: 50px;
  border-bottom: 1px solid #f3f5f7;
  padding-left: 20px;
  cursor: pointer;
}
#main-content .left ul {
  border: 1px solid #f3f5f7;
  border-bottom: none;
  margin: 0;
  padding: 0;
}
#main-content .left li.active {
  background: #e4effd;
  color: #328ffe;
}
#main-content ul .first {
  color: #fff;
  background: #328ffe;
}

#main-content .c_left {
  width: 14%;
  text-align: right;
  line-height: 40px;
}
#main-content .c_right {
  width: 80%;
}

#main-content .sex {
  padding-top: 10px;
}
#main-content .cneter div[class*="col-xs-"] {
  padding: 0;
}
#main-content .cneter .age {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
#main-content .cneter .age > div {
  width: 31%;
}
#main-content .edit {
  margin-left: 10px;
}
#main-content .edit i {
  font-size: 30px;
}
#main-content .headImg img {
  width: 100px;
}
#main-content .confim span {
  padding: 6px 15px;
  border: 1px solid #a8afbb;
  cursor: pointer;
  display: inline-block;
  margin-right: 50px;
  border-radius: 3px;
}
#main-content .confim .save {
  background: #328ffe;
  border: 1px solid #328ffe;
  color: #fff;
}

</style>
<style >
#main-content input::placeholder{
  font-size: 12px;
}
#main-content input{
  height: 37px;
}
 #main-content .address .el-select{
  width:95%;
}
</style>

<script>
export default {
  data() {
    return {
      radio: false,
      radio: '1',
      age:'',
      isShow: 0,
      step: 0,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      province: "",
      city: "",
      month: "",
      day: "",
      year: "",
      USERNAME: "",
      PHONE: "",
      NAME: "",
      email:'',
      readonly: false,
      isNameT: true,
      oldPasw: "",
      newPasw: "",
      confrimPasw: "",
      tipsVal: "密码错误！",
      tipsValPhone: "",
      tipsShow: false,
      tipsShowPhone:false,
      setPhone: {
        oldPhone: "",
        newPhone: "",
        coed: "",
        codeMsg: "发送验证码"
      },
      time:null,
      qq_NUMBER:''
    };
  },
  methods: {
    //切换
    tabMine(evnet) {
      //getAttribute
      let num = evnet.target.getAttribute("num");
      if (num != 3) {
        this.isShow = num;
      }
    },
    //获取用户信息
    userInfo() {
      let that = this;
      this.axios.post("userCenter/getUserInfo", {}, function(r) {
        console.log(r);
        /* 
        birthday: null
        city_ID: 0
        code: null
        county_ID: 0
        email: "109106034@qq.com"
        gender: null
        head_PROTRAIT: null
        ip: null
        last_LOGIN: null
        name: "LLLLLLLL"
        page: {showCount: 10, totalPage: 0, totalResult: 0, currentPage: 0, currentResult: 0, …}
        password: null
        phone: "17513619124"
        province_ID: 0
        qq_NUMBER: null
        rights: null
        role: null
        role_ID: null
        salt: null
        skin: "no-skin"
        status: null
        store_ID: null
        user_ID: "a982aacf6e384c888c2fb0db881d3075"
        username: "你好"
        */
        that.USERNAME = r.d.user.username;
        that.PHONE = r.d.user.phone;
        that.email = r.d.user.email;
        that.USER_ID = r.d.user.user_ID;
        that.NAME = r.d.user.NAME;
        that.qq_NUMBER = r.d.user.qq_NUMBER;
        that.name = r.d.user.name;
      });
    },
    // 编辑 / 预览 切换
    edit() {
      this.readonly = !this.readonly;
      this.editTxt = this.readonly ? "预览" : "编辑";
    },
    // 判断旧密码
    oldPaswFn() {
      ///userCenter/checkPassword、
      let that = this;

      this.axios.post("userCenter/checkPassword", {"USERNAME":this.USERNAME,"PASSWORD":this.oldPasw}, function(r) {
        console.log(r);
        if (r.s) {
        } else {
          that.tips("旧密码错误");
        }
      });
    },
    //userCenter/updataUser.do修改用户资料 保存用户资料
    save() {
      let that = this;
      if (!that.USER_ID) {
        alert("userid没找到");
        return;
      }
      if (!that.isNameT) {
        alert("名称不可用");
        return;
      }
      if (!that.USERNAME || !that.NAME || !that.EMAIL) {
        alert("信息不完整");
        return;
      }

 
      this.axios.post("userCenter/updataUser.do", {USERNAME:that.USERNAME,NAME:that.NAME,EMAIL:that.EMAIL,USER_ID:that.USER_ID}, function(r) {
        console.log(r);
        if (r.s) {
          that.token.delCookie("token");
          that.$router.push("/login");
        }
      });
    },
    // 修改密码
    savePasw() {
      if (this.newPasw == this.confrimPasw) {
        this.axios.post("userCenter/updatePassword", {USERNAME:this.USERNAME,PASSWORD:this.newPasw}, function(r) {
          console.log(r);
          if (r.s) {
          }
        });
      } else {
        that.tips("两次密码不一致");
      }
    },
    //给旧手机号 发胆信
    send() {
      let that = this;
      let timeKey = 'time';
      let phone = this.setPhone.oldPhone
      if(this.step == 1){
          timeKey = 'stepTime'
          phone = this.setPhone.newPhone
      }
      if (this.isPhone(phone)) {
         localStorage["now"] = parseInt(new Date().valueOf() / 1000);
      if ((!this.time && !localStorage[timeKey]) ||  Math.abs(localStorage["now"]) - Math.abs(localStorage[timeKey]) > 10 ) {
          this.axios.post("regist/sendMsg", {phone:phone}, function(r) {
            console.log(r)
              localStorage[timeKey] = parseInt(new Date().valueOf() / 1000);
            that.setPhone.codeMsg = "09/S";
            clearInterval(that.time);
            that.time = setInterval(() => {
              var num = parseInt(that.setPhone.codeMsg) - 1;
              that.setPhone.codeMsg = num + "/S";
              if (num == 0) {
                that.setPhone.codeMsg = "重新发送";
                clearInterval(that.time);
                that.time = null;
              }
            }, 1000);
            console.log(r);
          });
        } else {
          console.log("时间还没到");
        }
      }
    },
    //给旧手机号 发胆信 后 下一步 
    next(){
      //regist/
      let phone = this.setPhone.oldPhone
      if(this.step == 1){
        phone = this.setPhone.newPhone
      }
      let that = this;
      this.axios.post('regist/checkCode',{code:this.setPhone.code,phone:phone},function(r){
          console.log(r)
          if(r.s){
            if( that.step == 0){
              that.step = 1
              that.setPhone.code = ''
              that.setPhone.codeMsg = '发送验证码'
            }else{
              //userCenter/updatePhoneByUsername
              that.axios.post('userCenter/updatePhoneByUsername',{USERNAME:that.USERNAME,PHONE:phone},function(r){
                if(r.s){
                    that.step = 2
                }
              })  
             
            }
             
          }
      })
      
    },
    //userCenter/updatePhoneByUsername
    isName() {
      let that = this;
      this.axios.post("userCenter/selectByUsername", {username:this.USERNAME}, function(r) {
        //  console.log(r)
        if (that.USERNAME == that.username || r.s) {
          that.isNameT = true;
        } else {
          alert("名称不可用");
          that.isNameT = false;
        }
      });
      //
    },
    isPhone(v) {
      var reg = /^1[2,3,4,5,6,7,8,9][0-9]{9}$/;
      if (!reg.test(v)) {
        this.tipsPhone("手机号错误！");
        return false;
      } else {
        return true;
      }
    },
    //提示
    tips(v) {
      this.tipsShow = true;
      this.tipsVal = v;
    },
     tipsPhone(v) {
      this.tipsShowPhone = true;
      this.tipsValPhone = v;
    }
  },
  created() {
    // 实例刚被创建
  },
  mounted() {
    //模板编译/挂载之后
    this.userInfo();
    let that = this;
    document.onkeydown = function(e) {
      if (!e) e = window.event;
      // if ((e.keyCode || e.which) == 8) {
      that.tipsShow = false;
      // }
    };
    // this.axios.post('userCenter/selectByUsername',{"username":'12121'},function(r){
    //   console.log(r)
    // })
    //console.log(document.getElementById('img').offsetWidth)
  }
};
</script>

