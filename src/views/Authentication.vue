<template>
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class id="panel">
        <div>
          <div class="userHead">
            <div class="headimg">
              <img
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3797826289,4154926392&fm=27&gp=0.jpg"
                alt
              >
            </div>
            <div class>
              <p class="name">LLLLL</p>
              <p class="msg">1、欢迎光临本店，本店新开张，诚信经营</p>
            </div>
            <span class="meor">
              <i class="iconfont icon-gengduo-copy"></i>
            </span>
          </div>
          <div class="box">
            <div>
              <p class="title">店铺名称</p>
              <div>
                <el-input v-model="storeName" placeholder="请输入店铺名称"></el-input>
              </div>
            </div>
            <div>
              <p class="title">店铺介绍</p>
              <div>
                <el-input v-model="storeInfo" placeholder="请输入店铺介绍"></el-input>
              </div>
            </div>
            <div>
              <p class="title">店铺分类</p>
              <div class="bor classfiy">
                <div class="classfiy_box">
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                  <span class="child">电商</span>
                </div>
                <div class="bottom">
                  <span>电商</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="heading">店铺地址</p>
          <div class="box">
            <div>
              <p class="title">法人姓名</p>
              <div>
                <el-input v-model="storeBehalf" placeholder="请输入法人姓名"></el-input>
              </div>
            </div>
            <div>
              <p class="title">省份</p>
              <div>
                <el-select v-model="sheng" name="sheng" @change="choseProvince" placeholder="省级地区">
                  <el-option
                    v-for="item in province"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div>
              <p class="title">城市</p>
              <div>
                <el-select v-model="shi" name="shi" @change="choseCity" placeholder="请选择">
                  <el-option
                    v-for="item in shi1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div>
              <p class="title">区/县</p>
              <div>
                <el-select v-model="qu" name="qu" @change="choseBlock" placeholder="请选择">
                  <el-option
                    v-for="item in qu1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div>
              <p class="title">详细地址</p>
              <div>
                <el-input v-model="storeAddress" placeholder="请输入详细地址"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="last" id="last">
          <div class>
            <p class="heading">店铺LOGO
              <span class="pull-right active">
                <input type="file" name="LogoFile"  @change="fileImg($event)">
                <i class="iconfont icon-genggai"></i>
              </span>
            </p>
            <div class="logo" id="LogoFile" ref="LogoFile" style=" background-image: url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3797826289,4154926392&fm=27&gp=0.jpg);"></div>
          </div>
          <div class>
            <p class="heading">店铺营业执照
              <span class="pull-right">
                <input
                  type="file"
                  name="blicenseBackFile"
                 
                  @change="fileImg($event)"
                >
                <i class="iconfont icon-genggai"></i>
              </span>
            </p>
            <div class="logo" ref="blicenseBackFile" id="blicenseBackFile" style="background-image: url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3797826289,4154926392&fm=27&gp=0.jpg);"></div>
          </div>
        </div>
      </div>
      <div class="submit" id="submit">
        <p class>版权所有 深圳市动力启航软件有限公司 Copyright © 2009 - 2017 dtcms.net Inc. All Rights Reserved.</p>
        <span class="submit" @click="submitF">提交审核</span>
        <img class="shen" v-show="status == 0" src="../assets/shen.png" alt="">
      </div>
    </div>
    <!-- END MAIN CONTENT -->
  </div>
</template>
<style scoped>
#submit {
  background: #fff;
  margin: 40px 47px;
  padding: 15px 15px;
  display: flex;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
#submit p {
  margin: 0;
  margin-top: 6px;
  color: #d1d6da;
}
#submit .shen{
  position: absolute;
  z-index: 5;
  right: 0;
  top: -40px
}
#submit .submit {
  padding: 7px 15px;
  background: #328ffe;
  color: #fff;
  font-size: 13px;
  border-radius: 5px;
  cursor: pointer;
}
#panel .heading {
  padding: 30px 0 0 30px;
  margin-bottom: -10px;
  color: #1e1c1c;
  font-size: 14px;
}
#panel .el-select {
  width: 100%;
}
#panel .last {
  background: none;
  box-shadow: 0 0 0 transparent;
  margin-bottom: -49px;
}
#panel .last .heading {
  padding-right: 30px;
}
#panel .last .heading i {
  color: #adb4bf;
}
#panel .last .heading span {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f5f7;
  text-align: center;
  line-height: 40px;
  margin-top: -10px;
}
#panel .last .heading span.active {
  background: #328ffe;
}
#panel .last .heading span.active i {
  color: #fff;
}
#panel .last > div {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding-bottom: 1px;
  /* padding: 5px 27px 30px 27px;; */
  margin-bottom: 50px;
}
#panel .logo {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 30px;
  height: 216px;
  margin-top: 40px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
 
}

/* 1111111 */
#panel {
  padding: 0 47px;
  min-width: 1300px;
  display: flex;
  -webkit-display: flex;
  justify-content: space-between;
}
#panel > div {
  width: 30.5%;

  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
#panel .headimg img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
#panel p {
  margin: 0;
  padding: 0;
}
#panel .userHead {
  padding: 25px;
  position: relative;
  border-bottom: 1px solid #eee;
}
#panel .userHead p {
  width: 230px;
  padding-left: 15px;
}
#panel .userHead > div {
  display: table-cell;
  vertical-align: middle;
}
#panel .meor {
  position: absolute;
  right: 23px;
  top: 48px;
}
#panel .userHead .name {
  font-size: 16px;
}
#panel .userHead .msg {
  font-size: 14px;
  color: #a8afbb;
}
#panel .box {
  padding: 0 30px 30px 30px;
}
#panel .title {
  font-size: 14px;
  color: #647787;
  padding: 30px 15px 10px 15px;
}
#panel .bor {
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
#panel .classfiy {
}
#panel .classfiy .child {
  display: inline-block;
  padding: 0 15px;
  height: 40px;
  border-radius: 7px;
  background: #ccc;
  line-height: 40px;
  text-align: center;
  margin-right: 15px;
  margin-bottom: 15px;
  font-size: 13px;
}
#panel .classfiy .classfiy_box {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* justify-content: space-around; */
  min-height: 230px;
  padding: 15px;
}
#panel .classfiy .bottom {
  padding: 7px 15px;
  border-top: 1px solid #eee;
}
#panel .classfiy .bottom span {
  color: #a8afbb;
  font-size: 14px;
}
</style>
<style>
  #last input[type="file"]{
  position: absolute;
  width: 40px;
  height: 40px;
  background: transparent;
  opacity: 0;
}
</style>

<script>
export default {
  data() {
    return {
      status:1,
      mapJson: "http://localhost:7007/ctiy",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: "",
      address: [],
      storeAddress: "",
      storeBehalf: "",
      storeInfo: "",
      storeName: "",
      pv:null,
      logo:null
    };
  },
  methods: {
    fileImg(o) {
      var fileObj = o.target.files[0]; // js 获取文件对象
      var url = this.getObjectURL(fileObj); //加入文件对象
       this.$refs[o.target.name].style.backgroundImage  = "url(" + url + ")";
      if (o.target.name == "blicenseBackFile") {
        this.pv = fileObj;
      } else  {
        this.logo = fileObj;
      }
      if (typeof fileObj == "undefined" || fileObj.size <= 0) {
        alert("请选择图片");
        return;
      }
    },
    submitF() {
      let address = this.address.join('-')
      if (
        !this.storeName ||
        !this.storeInfo ||
        !this.storeAddress ||
        !this.storeBehalf ||
        !this.pv ||
        !this.logo || !address
      ) {
        alert("请补全信息");
        return;
      }
      var formFile = new FormData();
      formFile.append("blicenseForntFile", this.pv);
      formFile.append("logoFile", this.logo);
      formFile.append("blicenseBackFile", this.back);
      formFile.append("storeName", this.storeName);
      formFile.append("storeInfo", this.storeInfo);
      formFile.append("storeAddress", address+'/'+this.storeAddress);
      formFile.append("storeBehalf", this.storeBehalf);
       console.log(formFile.get("logoFile"));
      var that = this;
      this.axios.post("store/storeApplication.do", formFile, function(r) {
        console.log(r);
      });
    },
    getCtiyData(callback) {
      var that = this;
      this.axios.get(this.mapJson, {}, function(response) {
        var data = response;
        that.province = [];
        that.city = [];
        that.block = [];
        // 省市区数据分类
        for (var item in data) {
          if (item.match(/0000$/)) {
            //省
            that.province.push({
              id: item,
              value: data[item],
              children: []
            });
          } else if (item.match(/00$/)) {
            //市
            that.city.push({ id: item, value: data[item], children: [] });
          } else {
            //区
            that.block.push({ id: item, value: data[item] });
          }
        }
        // 分类市级
        for (var index in that.province) {
          for (var index1 in that.city) {
            if (
              that.province[index].id.slice(0, 2) ===
              that.city[index1].id.slice(0, 2)
            ) {
              that.province[index].children.push(that.city[index1]);
            }
          }
        }
        // 分类区级
        for (var item1 in that.city) {
          for (var item2 in that.block) {
            if (
              that.block[item2].id.slice(0, 4) ===
              that.city[item1].id.slice(0, 4)
            ) {
              that.city[item1].children.push(that.block[item2]);
            }
          }
        }
        callback && callback()
      });
    }, // 选省
    choseProvince: function(e) {
      console.log(e)
      this.s_province(e)
    },
    s_province(e){
      for (var index2 in this.province) {
        if (e == this.province[index2].id) {
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.qu = this.province[index2].children[0].children[0].value;
          this.E = this.qu1[0].id;
          this.address = [this.province[index2].id,this.province[index2].children[0].id, this.province[index2].children[0].children[0].id];
          return this.province[index2].value
      }
      }
    //  console.log(this.province[index2].value)
     
    },
    // 选市
    choseCity: function(e) {
        this.s_City(e)
    },
    s_City(e){
      for (var index3 in this.city) {
        if (e == this.city[index3].id) {
          this.qu1 = this.city[index3].children;
          this.qu = this.city[index3].children[0].value;
          this.E = this.qu1[0].id;
          this.address[1] = this.city[index3].id;
          this.address[2] = this.city[index3].children[0].id;
          return this.city[index3].value
        }
      }
      
    },
    s_Block(e){
    for (var index in this.block) {
        if (e == this.block[index].id) {
          this.address[2] = this.block[index].id;
           return this.block[index].value
        }
      }
      this.E = e;
     
    },
    // 选区
    choseBlock: function(e) {
      this.s_Block(e)
    },
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
  },
  mounted() {
    /* 0 未审核
    1 审核通过
    2 未通过
 */
      let that = this;
      
    this.getCtiyData(function(){
    
      // 查询 审核状态
      that.axios.post("store/checkVerify", {}, function(r) {
      console.log(r);
      that.status  = r.d.store.storeVerify
      that.storeBehalf  = r.d.store.storeBehalf
      that.storeInfo  = r.d.store.storeInfo
      that.storeName  = r.d.store.storeName
      that.storeAddress  = r.d.store.storeAddress.split('/')[1]
    //  that.sheng  = '2121'
     that.sheng = that.s_province(r.d.store.storeAddress.split('-')[0])
      that.s_City(r.d.store.storeAddress.split('-')[1])
      that.s_Block(r.d.store.storeAddress.split('-')[2].split('/')[0])
    });
    });
  }
};
</script>
