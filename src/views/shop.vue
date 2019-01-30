<template>
  <div class="main" id="shopinfo">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="heading">修改店铺信息</div>
      <div class="nav">
        <ul class="clearfix" @click="tabNav">
          <li class="pull-left" num="0" :class="{'active':navIndex == 0}">修改认证信息</li>
          <li class="pull-left" num="1" :class="{'active':navIndex == 1}">联系方式</li>
          <li class="pull-left" num="2" :class="{'active':navIndex == 2}">详细信息</li>
        </ul>
      </div>
      <div class="clearfix" id="wrap">
        <div class v-show="navIndex == 0">
          <div class="info pull-left">
            <div>
              <el-row>
                <el-col :span="4">店铺名称:</el-col>
                <el-col :span="19" class="pull-right">
                  <el-input placeholder="请输入绑定新手机"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">店铺分类:</el-col>
                <el-col :span="19" class="pull-right classfiy">
                  <div class="classfiy_box">
                    <span class="child color1">电商</span>
                    <span class="child color2">电ff商</span>
                    <span class="child color3">电商</span>
                    <span class="child color1">电商</span>
                    <span class="child color2">电ff商</span>
                    <span class="child color3">电商</span>
                    <span class="child color1">电商</span>
                    <span class="child color2">电ff商</span>
                    <span class="child color3">电商</span>
                  </div>
                  <div class="bottom">
                    <span>电商</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="confrim">
              <span>确认保存</span>
            </div>
          </div>
          <div class="imgInfo pull-left">
            <div class="text-center">
              <p>店铺LOGO</p>
              <div class="logo"></div>
              <div>
                <h2>海澜之家</h2>
              </div>
              <div class="set">
                <span>修改</span>
              </div>
            </div>
            <div class="text-center">
              <div class="license"></div>
              <div class="set">
                <span>修改</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="navIndex == 1" class="addressBox" id="addressBox">
          <div class="heading">联系方式</div>
          <!-- el-col el-col-5  el-row -->
          <div class="el-row">
            <div class="el-col el-col-12">
              <p class="title">省份</p>
              <div>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="el-col el-col-12">
              <p class="title">城市</p>
              <div>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="el-col el-col-12">
              <p class="title">区/县</p>
              <div>
                <el-select v-model="value" placeholder="请选择">
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
          <div class="el-row">
            <div class="el-col el-col-23">
              <p class="title">详细地址</p>
              <div>
                <el-input placeholder="输入详细地址"></el-input>
              </div>
            </div>
          </div>
          <div class="el-row" id="input">
            <div class="el-col el-col-12">
              <p class="title">联系人</p>
              <div>
                <el-input placeholder="输入联系人"></el-input>
              </div>
            </div>

            <div class="el-col el-col-12">
              <p class="title">联系电话</p>
              <div>
                <el-input placeholder="输入联系电话"></el-input>
              </div>
            </div>
            <div class="el-col el-col-12">
              <p class="title">QQ</p>
              <div>
                <el-input placeholder="输入QQ"></el-input>
              </div>
            </div>
            <div class="el-col el-col-12">
              <p class="title">邮箱</p>
              <div>
                <el-input placeholder="输入邮箱"></el-input>
              </div>
            </div>
            <div class="el-col el-col-12">
              <p class="title">微信</p>
              <div>
                <el-input placeholder="输入微信"></el-input>
              </div>
            </div>
          </div>
          <div class="el-row">
            <div class="el-col el-col-23">
              <div class="pull-left">
                <label for="jz">
                  <el-checkbox id="jz" v-model="checkedjz">请仔细核对信息，同意请勾选</el-checkbox>
                </label>
              </div>
              <div class="pull-right">
                <span class="save">确认保存</span>
              </div>
            </div>
          </div>
        </div>
        <div id="detail" v-show="navIndex == 2">
          <div>
            <div class="heading">填写信息</div>
            <div class="el-row box">
              <p class="title">营业时间</p>
              <div class="el-row">
                <div class="el-col-5">
                  <el-time-select
                    placeholder="起始时间"
                    v-model="startTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30'
                    }"
                  ></el-time-select>
                </div>
                <div class="el-col-5">
                  <el-time-select
                    placeholder="结束时间"
                    v-model="endTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      minTime: startTime
                    }"
                  ></el-time-select>
                </div>
              </div>
            </div>
            <div class="el-row box">
              <p class="title">介绍</p>
              <div class="el-col-23">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
              </div>
            </div>
          </div>
          <div>
            <div class="heading bor">
              店铺环境
              <span>注：不要在图片上放置设计师商业推广信息（除案例信息外），不超过100张，支持批量上传。</span>
            </div>
            <div class="el-row box" ref="environment">
              <div class="img_box imgFile text-center">
                <p>
                  <i class="iconfont icon-xianshi_tianjiatianchong"></i>
                </p>
                <p>点此添加图片</p>
                <p>支持JPG/PNG/GIF格式</p>
                <p>RGB模式，不超过10M</p>
                <input @change="addImg($event)" type="file" name="environment">
              </div>
              <!--  :style="'background-image:url(require('./../assets/banner_top2.png'))'" -->
              <div class="img_box" v-for="(item,index) in environment" :key="index" v-bind:style="{backgroundImage:'url(' + item.img + ')'}">
                <i  @click="delImg(index,'environment')" class="el-icon-error"></i>
              </div>
            </div>
          </div>
          <div>
            <div class="heading bor">
              轮播图
              <span>注：不要在图片上放置设计师商业推广信息（除案例信息外），不超过100张，支持批量上传。</span>
            </div>
            <div class="el-row box" ref="bg">
              <div class="img_box imgFile text-center">
                <p>
                  <i class="iconfont icon-xianshi_tianjiatianchong"></i>
                </p>
                <p>点此添加图片</p>
                <p>支持JPG/PNG/GIF格式</p>
                <p>RGB模式，不超过10M</p>
                <input @change="addImg($event)" type="file" name="bg">
              </div>
             <div class="img_box" v-for="(item,index) in bg" :key="index" v-bind:style="{backgroundImage:'url(' + item.img + ')'}">
                <i @click="delImg(index,'bg')" class="el-icon-error"></i>
              </div>
            </div>
          </div>
          <p class="confrim">
            <span>确认保存</span>
          </p>
        </div>
      </div>
    </div>
    <!-- END MAIN CONTENT -->
  </div>
</template>

<style scoped>
#detail > div {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
  min-height: 300px;
  padding-bottom: 30px;
}
#detail .box {
  margin-top: 30px;
  padding-left: 50px;
}
#detail .heading span {
  color: #a8afbb;
  font-size: 12px;
  padding-left: 10px;
}
#detail .heading {
  position: relative;
  padding-bottom: 10px;
}
#detail .bor::before {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #eee;
}
#detail .img_box {
  width: 225px;
  height: 166px;
  position: relative;
  float: left;
  margin-bottom: 10px;
  border-radius: 7px;
  background: #eee;
  margin-right: 15px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
#detail .imgFile {
  padding-top: 20px;
  position: relative;
  background-image: none;
}
#detail .imgFile i {
  font-size: 30px;
  color: #328ffe;
}
#detail .imgFile::before {
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  position: absolute;
  top: 10px;
  left: -10px;
  background: red;
  border-radius: 50%;
}
#detail .imgFile input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  background: transparent;
}
#detail .img_box .el-icon-error {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #c6cbd3;
}
#detail {
}
#detail {
}

/* 认证地址 */
#addressBox {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
#addressBox .heading {
  font-size: 13px;
  margin-bottom: 20px;
}
#addressBox .el-select,
#input .el-input {
  width: 92%;
}
#addressBox .el-row {
  padding-left: 50px;
}
#addressBox .el-row > div {
  margin-bottom: 30px;
}
#addressBox .title,
#detail .title {
  color: #647787;
  font-size: 14px;
  padding-left: 10px;
}
#addressBox .save {
  color: #fff;
  background: #328ffe;
  padding: 7px 15px;
  border-radius: 5px;
}

/* 营业执照 logo */
#shopinfo .imgInfo > div {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 270px;
  margin-bottom: 20px;

  padding: 23px 0;
}
#shopinfo .imgInfo {
  margin-left: 50px;
}
#shopinfo .imgInfo .logo {
  width: 115px;
  height: 115px;
  margin: 0 auto;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(
    https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3797826289,4154926392&fm=27&gp=0.jpg
  );
}
#shopinfo .imgInfo .set {
  padding-top: 10px;
}
#shopinfo .imgInfo .set span {
  color: #fff;
  background: #328ffe;
  border-radius: 5px;
  padding: 6px 25px;
}
#shopinfo .imgInfo h2 {
  color: #252631;
  font-weight: 600;
}
#shopinfo .license {
  width: 140px;
  height: 210px;
  margin: 10px auto;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(
    https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3797826289,4154926392&fm=27&gp=0.jpg
  );
}

/* shopinfo */
#shopinfo .main-content {
  padding: 0;
  margin: 28px 20px;
  background: #fff;
}
#shopinfo .heading {
  color: #252631;
  font-size: 16px;
  padding-left: 50px;
  padding-top: 30px;
}
#shopinfo .nav ul {
  padding: 0;
  margin: 0 40px;
  margin-top: 20px;
  border-bottom: 1px solid #d4d4d4;
}
#shopinfo .nav li {
  line-height: 35px;
  list-style: none;
  padding: 0 10px;
  margin-right: 50px;
  color: #a8afbb;
  border-bottom: 2px solid transparent;
  transition: all 0.5s;
  cursor: pointer;
}
#shopinfo .nav li.active {
  color: #328ffe;
  border-color: #328ffe;
}
#shopinfo .info {
  width: 560px;
  padding-top: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
#shopinfo .info > div {
  padding: 0 30px 57px 30px;
}
#shopinfo .info > div > div {
  line-height: 40px;
  margin-bottom: 30px;
}
#wrap {
  margin: 34px 50px;
  padding-bottom: 40px;
}
#shopinfo .classfiy {
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  /* */
}
#shopinfo .child {
  display: inline-block;
  padding: 0 15px;
  height: 40px;
  border-radius: 7px;
  background: #ccc;
  line-height: 40px;
  text-align: center;
  margin: 7px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #fff;
}
#shopinfo .bottom {
  border-top: 1px solid #dcdfe6;
  padding: 0 30px;
}
#shopinfo .bottom span {
  color: #a8afbb;
}
#shopinfo .child.color1 {
  background: #83eccb;
}
#shopinfo .child.color2 {
  background: #7d9ef1;
}
#shopinfo .child.color3 {
  background: #e9c6fb;
}
#shopinfo .classfiy_box {
  height: 320px;
  padding: 6px;
}
#shopinfo .info .confrim {
  border-top: 1px solid #dcdfe6;
  padding-bottom: 0;
  line-height: 60px;
  text-align: center;
}
#detail .confrim {
  padding-left: 50px;
}
#shopinfo .info .confrim span,
#detail .confrim span {
  color: #fff;
  background: #328ffe;
  padding: 7px 13px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 0 20px #c4c2c2;
}
</style>
<script>
/* 
  
 */
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      startTime: "",
      endTime: "",
      checkedjz: false,
      textarea: "",
      navIndex: 0,
      environment: [],
      bg: [],
    };
  },
  methods: {
    tabNav(e) {
      let that = this;
      if (e.target.nodeName.toLowerCase() === "li") {
        // console.log()
        that.navIndex = e.target.getAttribute("num");
        // const index = parseInt(e.target.dataset.index)
        // 获得引索后，只需要修改data数据就能改变UI了
        // console.log( e.target.getAttribute('num'))
        //this.doSomething(index)
      }
    },
    addImg(o) {
      var fileObj = o.target.files[0]; // js 获取文件对象
      var url = this.getObjectURL(fileObj); //加入文件对象
      this[o.target.name].push({ file: fileObj, img: url });
      if (typeof fileObj == "undefined" || fileObj.size <= 0) {
        alert("请选择图片");
        return;
      }
    },
    delImg(i,key){ this[key].splice(i,1) },
    //图片路径转换
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
  }
};
</script>

