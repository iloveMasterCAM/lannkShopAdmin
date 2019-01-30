<template>
  <transition name="fade">
    <div class="main">
      <div class="main-content">
        <div class="container-fluid">
          <h3 class="page-title">添加商品</h3>
              <div class="box">
                  <div class="left">
                      <p class="title">商品内容</p>
                      <div class="item" v-for="(item,index) in nav" :key="index" :class="{active:index===currenNum}" @click="changerIndex(index)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span v-html="item.text"></span>
                      </div>
                  </div>
                  <div class="right" id="addProduct">
                      <div class="info" v-show="currenNum===0">
                          <div class="top">
                            <p class="title">商品内容</p>
                            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                              <el-form-item label="所属类别">
                                <el-select v-model="classId" placeholder="请选择所属类别" @change="getClassId">
                                  <el-option
                                    v-for="item in optionsClass"
                                    :key="item.categoryId"
                                    :label="item.categoryName"
                                    :value="item.categoryId">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="是否发布" prop="delivery">
                                <el-switch v-model="sizeForm.release"></el-switch>
                              </el-form-item>
                              <el-form-item label="推荐类型">
                                <el-checkbox-group v-model="sizeForm.type" @change="getType">
                                  <el-checkbox-button label="允许评论" name="type"></el-checkbox-button>
                                  <el-checkbox-button label="置顶" name="type"></el-checkbox-button>
                                  <el-checkbox-button label="推荐" name="type"></el-checkbox-button>
                                  <el-checkbox-button label="热门" name="type"></el-checkbox-button>
                                </el-checkbox-group>
                              </el-form-item>
                              <el-form-item label="内容标题">
                                <el-input v-model="sizeForm.cName" style="width:400px;" placeholder="请输入内容标题"></el-input>
                              </el-form-item>
                              <el-form-item label="商品货号">
                                <el-input v-model="sizeForm.pCode" style="width:400px;" placeholder="请输入商品货号"></el-input>
                              </el-form-item>
                              <el-form-item label="库存数量">
                                <el-input-number v-model="sizeForm.pNum"  :min="0" :max="9999" label="描述文字" size="small"></el-input-number>
                                <label  style="margin-left:40px;">市场价</label>
                                <el-input-number v-model="sizeForm.mPrice" :precision="2" :step="1" :min="0" ></el-input-number>
                                <label>元</label>
                                <label  style="margin-left:40px;">销售价</label>
                                <el-input-number v-model="sizeForm.selPrice" :precision="2" :step="1" :min="0" ></el-input-number>
                                <label>元</label>
                              </el-form-item>
                              <el-form-item label="排序数字">
                                <el-input-number v-model="sizeForm.sortNum"  :min="0" :max="99" label="描述文字" size="small"></el-input-number>
                              </el-form-item>
                              <el-form-item label="发布时间">
                                <div class="block">
                                  <el-date-picker
                                    v-model="sizeForm.time"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                            </el-form>
                          </div>
                          <div class="bottom">
                              <el-form>
                                <el-form-item label="商品规格">
                                  <el-button plain @click="addSel()" size="small"><i class="iconfont icon-tianjiashangpin" style="font-size:14px;margin-right:4px;"></i>设置规格</el-button>
                                </el-form-item>
                              </el-form>

                            <div class="table">
                              <el-table
                                :data="tableData"
                                border
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column
                                  fixed
                                  prop="proNo"
                                  label="货号"
                                  width="180">
                                  <template slot-scope="scope">
                                    <el-input v-model="scope.row.proNo" size="small"></el-input>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="proMPrice"
                                  label="市场价(元)"
                                  width="150">
                                  <template slot-scope="scope">
                                    <el-input-number v-model="scope.row.proMPrice" :precision="2" :step="1" :min="0" size="mini"></el-input-number>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="proSPrice"
                                  label="销售价(元)"
                                  width="150">
                                  <template slot-scope="scope">
                                    <el-input-number v-model="scope.row.proSPrice" :precision="2" :step="1" :min="0" size="mini"></el-input-number>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="proNum"
                                  label="库存(件)"
                                  width="150">
                                  <template slot-scope="scope">
                                    <el-input-number v-model="scope.row.proNum"  :min="0" :max="9999" label="描述文字" size="mini"></el-input-number>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="specText"
                                  label="规格"
                                  width="350">
                                </el-table-column>
                              </el-table>
                            </div>
                            <!--dialog-->
                            <el-dialog title="商品规格" :visible.sync="dialogFormVisible">
                              <div class="item" v-for="item in diaData">
                                <span class="item-left" v-html="item.title"></span>
                                <div class="item-right">
                                  <span v-show="!text.src" :title="text.title" v-html="text.title" v-for="text in item.subList" @click="text.state=!text.state" :class="{active:text.state}"></span>
                                  <img  v-show="img.src"   :src="img.src" :title="img.title" v-for="img in item.subList" @click="img.state=!img.state">
                                </div>
                              </div>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="diaSubmit" >确 定</el-button>
                              </div>
                            </el-dialog>
                          </div>
                      </div>
                      <div class="desc" v-show="currenNum===1">
                            <p class="title">详细描述</p>
                            <el-form  :model="secondForm" label-width="80px" size="mini" style="width:760px;">
                              <el-form-item label="内容摘要">
                                <el-input type="textarea" v-model="secondForm.abstract" ></el-input>
                              </el-form-item>
                              <el-form-item label="内容描述">
                                <quill-editor
                                  v-model="content"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @ready="onEditorReady($event)"
                                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                  @change="onEditorChange($event)">
                                </quill-editor>
                              </el-form-item>
                            </el-form>
                      </div>
                      <div class="seo"  v-show="currenNum===2">
                          <p class="title">SEO选项</p>
                        <el-form  :model="thirdForm" label-width="80px" size="mini" style="width:720px;">
                          <el-form-item label="SEO标题">
                            <el-input v-model="thirdForm.title"></el-input>
                          </el-form-item>
                          <el-form-item label="SEO关健字">
                            <el-input type="textarea" v-model="thirdForm.key"></el-input>
                          </el-form-item>
                          <el-form-item label="SEO描述">
                            <el-input type="textarea" v-model="thirdForm.des"></el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div class="image"v-show="currenNum===3">
                          <div class="i-left">
                              <p class="title">封面图片</p>
                            <img :src="sizeForm.imgURl" alt="" class="previewImg" ref="previewImg">
                              <div class="but">
                                <div class="button">
                                  <el-button type="primary" round size="mini">图片上传</el-button>
                                  <input type="file" value="" id="file" name="file"  @change='onUpload()' ref="upload" class="fileInput" accept="image/*">
                                </div>
                                <div class="button del" @click="delCoverImg">
                                  <el-button round size="mini">删除图片</el-button>
                                </div>
                              </div>
                          </div>
                          <div class="i-right">
                              <p class="title">图片相册</p>
                              <div class="i-right-box" style="margin-bottom:40px;">
                                <div class="imgBox" v-for="(value, index) in imgs" :key="index" style="position:relative">
                                  <img :src="getObjectURL(value)" alt="" class="plImg">
                                  <img src="../assets/del.png" alt="" style="width:16px;height:16px;position:absolute;top:1px;right:4px;cursor:pointer;" @click="delImg(index)">
                                </div>
                              </div>
                            <div class="button" style="position:absolute;left:0;right:0;bottom:40px;margin: 0 auto;width:76px;height:26px;">
                              <el-button type="primary" round size="mini">批量上传</el-button>
                              <input type="file" name="file" id="uploadMFile" accept="image/*" multiple @change="addImg()" ref="inputer" class="fileInput">
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="end">
                <div id="submit" class="submit">
                  <p>版权所有 深圳市动力启航软件有限公司 Copyright © 2009 - 2017 dtcms.net Inc. All Rights Reserved.</p>
                  <el-button type="primary" @click="onSubmit" round size="mini">立即添加</el-button>
                   <img  src="/static/img/shen.3b33bf3.png" alt="" class="shen" style="display: none;">
                </div>

              </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import axios from 'axios'
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        nav:[
          {iconClass:'icon-gerenxinxi',text:'基本信息'},
          {iconClass:'icon-miaoshu',text:'详细描述'},
          {iconClass:'icon-chakan',text:'SEO选项'},
          {iconClass:'icon-tupian',text:'上传图片'}
        ],
        currenNum:0,
        //编辑器
        content:'',
        editorOption: {},
        diaData:[],
        diaDataOld:[],
        isChange:false,
        dialogFormVisible: false,
        //默认选择第一个选项卡
        activeName: 'first',

        tableData: [],
        specIdss:[],
        sizeForm: {
          name: '',
          release: false,
          title: '',
          type: [],
          cName: '',
          tagLab: '',
          imgURl: require('../assets/coverImg.png'),
          fileImg: new File(["",""],""),
          pCode: '',
          pNum: 0,
          mPrice: 0,
          selPrice: 0,
          integral: 0,
          sortNum: 99,
          lookNum: 0,
          time:'',

          IsComment:0,
          IsTop:0,
          IsRecommend:0,
          IsHot:0,
        },
        optionsClass: [],
        classId: '',
        subName: '',

        dialogForm: [],
        subTable: [],
        //多图片上传
        imgs: {},
        //描述索引
        mIndex:0,
        //描述弹框
        dialogFormVisibleMs:false,
        msForm:{
          text:''
        },

        //second form
        secondForm:{
          name:'',
          link:'',
          abstract:''
        },
        //third
        thirdForm:{
          title:'',
          key:'',
          des:''
        },
        //构造数据
        arr:[],
        results:[],
        result:[],
        //ids
        aId:[],
        aIds:[]
      }
    },
    created(){
      this.instance = axios.create({
        headers:{
          "Content-Type": "multipart/form-data",
          "token":"18xTgOQ1DeMjhFHTgapQqmFoM3vbj3J3C53CthEtA6YnBnp+TPy3/RwdsvCidsZLmjQK5gb48EQquYapxDSLyQ=="
        }
      });
    },
    mounted() {
      //http://192.168.1.2:8080/shops/addProduct.do
      this.optionsClass=this.$route.params.catList;
      //console.log(this.$route.params.classList);
      let data=new FormData();
      data.append("storeId","15");
      this.instance.post('http://192.168.1.2:8080/shops/getGoodsSpec.do',data)
        .then((res) => {
          console.log(res);
            var data=res.data;
            data.forEach((item)=>{
               item.subList.forEach((item)=>{
                  item.state=false;
               })
            });
            this.diaData=data;
            this.diaDataOld=data;
            console.log(this.diaData)
          }
        ).catch((err) => {
        console.log(err);
      });
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    methods: {
      changerIndex(index){
          this.currenNum=index;
      },
      delCoverImg(){
          this.sizeForm.imgURl=require('../assets/coverImg.png');
          this.sizeForm.fileImg=new File(["",""],"");
      },
      //编辑器事件
      onEditorReady(editor) { // 准备编辑器

      },
      // 失去焦点事件
      onEditorBlur(){
        console.log(this.content);
      },
      // 获得焦点事件
      onEditorFocus(){

      },
      // 内容改变事件
      onEditorChange(){

      },
      // 转码
      // escapeStringHTML(str) {
      //   str = str.replace(/&lt;/g,'<');
      //   str = str.replace(/&gt;/g,'>');
      //   return str;
      // },
      addImg(){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        for (let i=0; i < this.fil.length; i++) {
          this.$set(this.imgs,this.fil[i].name,this.fil[i]);
        }
      },
      getObjectURL(file) {
          var windowURL = window.URL || window.webkitURL;
          var dataUrl = windowURL.createObjectURL(file);//图片临时路径
        return dataUrl ;
      },
      delImg(key){
        this.$delete(this.imgs,key);
      },
      getClassId(){

      },
      getRandomCode(length) {
        if (length > 0) {
          var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
          var nums = "";
          for (var i = 0; i < length; i++) {
            var r = parseInt(Math.random() * 61);
            nums += data[r];
          }
          return nums;
        } else {
          return false;
        }
      },
      getType(){
          console.log(this.sizeForm.type);
        this.sizeForm.type.forEach((item)=>{
            if(item==='允许评论'){
                this.sizeForm.IsComment=1;
            }
            if(item==='置顶'){
              this.sizeForm.IsTop=1;
            }
            if(item==='推荐'){
              this.sizeForm.IsRecommend=1;
            }
            if(item==='热门'){
              this.sizeForm.IsHot=1;
            }
        })
      },
      //设置规格
      addSel() {
        this.dialogFormVisible = true;
      },
      onUpload() {
        var fileObj = this.$refs.upload;
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        //fileObj.files[0]   FormData
        dataURL = windowURL.createObjectURL(fileObj.files[0]);//图片临时路径
        this.$refs.previewImg.src = dataURL;
        this.sizeForm.imgURl = dataURL;
        // this.sizeForm.fileImg = new FormData();
        this.sizeForm.fileImg=fileObj.files[0];
        console.log(fileObj.files[0]);
      },
      //设置table
      // editRow(row){
      //   console.log(row);
      // },
      //本地保存
      diaSubmit() {
        this.isChange=true;
        this.dialogFormVisible = false;
        console.log(222);
        console.log(this.diaData);
        this.arr=[];
        this.specIdss=[];
        this.diaData.forEach((item)=>{
            var title=item.title+":";
            var t=[];
            var s=[];
            var ids=[];
            var flag=true;
            item.subList.forEach((val)=>{
                if(val.state){
                  s.push(val.title);
                  ids.push(val.ID);
                  if(flag){
                    t.push(title);
                    flag=false;
                  }
                }
            });
            if(s){
              this.arr.push(t);
              this.arr.push(s);
              this.specIdss.push(ids);

            }
        });
        //清除空数组
        for(let i=this.arr.length-1;i>=0;i--){
            if(this.arr[i].length===0){
                this.arr.splice(i,1)
            }
        }
        for(let i=this.specIdss.length-1;i>=0;i--){
            if(this.specIdss[i].length===0){
                this.specIdss.splice(i,1);
            }
        }
        console.log(this.arr);
        this.result=[];
        this.results=[];

        this.aId=[];
        this.aIds=[];
        this.doExchangeID(this.specIdss,0);
        this.doExchange(this.arr, 0);
        console.log("aids");
        console.log(this.aIds);
        this.tableData=[];
        var code=this.getRandomCode(16);
        this.results.forEach((item,index)=>{
            var obj={};
            if(this.sizeForm.pCode){
              obj.proNo=this.sizeForm.pCode+"-"+(index+1);
            }else{
              obj.proNo=code+"-"+(index+1);
            }

            obj.proMPrice=0; //市场价
            obj.proSPrice=0;//销售价
            obj.proNum=0;//库存
            obj.specText=item;
            obj.specIds=this.aIds[index];
            this.tableData.push(obj);
        })

      },
      //取消保存回到上一层
      cancal() {
        this.$router.push({name: 'mailManage'})
      },
      //提交页面所有数据
      onSubmit() {

        //选中数据
        if(this.isChange){
            var leng=this.diaData.length;
            for(let i=leng-1;i>=0;i--){
                for(let j=this.diaData[i].subList.length-1;j>=0;j--){
                    if(!this.diaData[i].subList[j].state){
                      this.diaData[i].subList.splice(j,1);
                    }
                }
                if(this.diaData[i].subList.length===0){
                    this.diaData.splice(i,1);
                }
            }
        }
        console.log(this.diaData);
        //发送数据1 URLSearchParams
        let data=new FormData();
        var a =this.sizeForm.release?1:0;
        data.append("classId",this.classId);//类别id
        data.append("verify",a);//上下架
        data.append("isComment",this.sizeForm.IsComment);
        data.append("isTop",this.sizeForm.IsTop);
        data.append("isRecommend",this.sizeForm.IsRecommend);
        data.append("isHot",this.sizeForm.IsHot);
        data.append("title",this.sizeForm.cName);//内容标题

        // data.append("subName",this.sizeForm.subName);//副标题
        // data.append("tagLab",this.sizeForm.tagLab);//Tags标签
        data.append("coverImage",this.sizeForm.fileImg);

        data.append("artNo",this.sizeForm.pCode);//货号
        data.append("proNums",this.sizeForm.pNum);//库存数量
        data.append("oPrice",this.sizeForm.mPrice);//市场价格
        data.append("proPrice",this.sizeForm.selPrice);//销售价格
        // data.append("IsComment",this.sizeForm.integral);//交易积分
        data.append("goodsDetail",JSON.stringify(this.tableData));//-规格内容
        data.append("sort",this.sizeForm.sortNum);//排序
        // data.append("isComment",this.sizeForm.lookNum);//浏览次数
        //data.append("addDate",this.sizeForm.time);//时间
        for(let key in this.imgs){
          let name=key;
          data.append('images',this.imgs[key],name);//图片相册
        }
        data.append("goodsSelect",JSON.stringify(this.diaData));//-选中规格数据
        //数据2
        data.append("proDetail",this.secondForm.abstract);
        data.append("proInfo",this.content);
        //数据3
        data.append("seoTitle",this.thirdForm.title);
        data.append("seoKeywords",this.thirdForm.key);
        data.append("seoDescribe",this.thirdForm.des);
        this.instance.post('http://192.168.1.2:8080/shops/addProduct.do',data)
          .then((res) => {
              console.log(res);
            this.$router.push({name: 'mailManage'})
            }
          ).catch((err) => {
          console.log(err);
        });
      },
      doExchange(arr, index){
        for (var i = 0; i<arr[index].length; i++) {
          this.result[index] = arr[index][i];
          if (index !== arr.length - 1) {
            this.doExchange(arr, index + 1)
          } else {
            this.results.push(this.result.join(' '))
          }
        }
      },
      doExchangeID(arr, index){
        for (var i = 0; i<arr[index].length; i++) {
          this.aId[index] = arr[index][i];
          if (index !== arr.length - 1) {
            this.doExchangeID(arr, index + 1)
          } else {
            this.aIds.push(this.aId.join(','))
          }
        }
      },

    }
  }
</script>


<style scoped >
  .fade-enter-active, .fade-leave-active{
    transition: all 0.3s
  }


  .fade-enter, .fade-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .page-title{
    font-size:16px;
    color:#1e1c1c;
    margin-left:56px;
  }
  .container-fluid{
    background-color:#fff;
    padding:20px;
    margin-left: 12px;
  }
  .box{
    width:100%;
    display:flex;
  }
  .box .left{
    width:300px;
    height:300px;
    margin-left:60px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);

  }
  .box .left .title{
    font-size:14px;
    color:#1e1c1c;
    padding-left:16px;
    padding-top:16px;
  }
  .box .left .item{
      padding:20px 10px 20px 24px;
      border-bottom:1px solid rgba(221,221,221,.5);
      cursor:pointer;
      transition:all 1s;
  }
  .box .left .item:hover{
    background: #e4effd;
    color: #328ffe;
  }
  .box .left .item:hover span{
    color: #328ffe;
  }
  .box .left .active{
    background: #e4effd;
    color: #328ffe;
  }
  .box .left .active{
    color: #328ffe;
  }
  .box .left .item i {
    padding-right:10px;
    font-size:14px;
  }
  .box .left .item:nth-last-child(1){
    border:none;
  }
  .box .left .item span{
    font-size:12px;
    color:#647787;
  }
  .box .right{
    width:1080px;
    height:100%;
  }
  .box .right .info .top{
      width:100%;
      height:500px;
    margin-left:80px;
    padding-left:40px;
    padding-top:10px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);
  }

  .box .right .info .bottom{
    width:100%;
    margin-left:80px;
    margin-top:30px;
    padding-left:40px;
    padding-top:10px;
    padding-bottom:10px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);
  }
  .box .right .info .bottom .title{
    font-size:14px;
    color:#1e1c1c;
    padding-top:14px;
    padding-bottom:14px;
  }

  .box .right .desc{
    width:100%;
    height:500px;
    margin-left:80px;
    padding-left:40px;
    padding-top:10px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);
  }
  .box .right .desc .title{
    font-size:14px;
    color:#1e1c1c;
    padding-top:14px;
    padding-bottom:14px;
  }
  .box .right .seo{
    width:100%;
    height:500px;
    margin-left:80px;
    padding-left:40px;
    padding-top:10px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);
  }
  .box .right .seo .title{
    font-size:14px;
    color:#1e1c1c;
    padding-top:14px;
    padding-bottom:14px;
  }
  .box .right .image{
    display:flex;
  }
  .box .right .image .i-left{
      width:280px;
      height:300px;
      margin-left:40px;
      padding-left:40px;
      padding-top:10px;
      box-shadow: 0 0 20px rgba(0,0,0,.1);
  }
  .box .right .image .i-right{
      position:relative;
      width:620px;
      margin-left:40px;
      padding-left:40px;
      padding-top:10px;
      box-shadow: 0 0 20px rgba(0,0,0,.1);
  }
  .box .right .image .title{
    font-size:14px;
    color:#1e1c1c;
    padding-top:14px;
    padding-bottom:14px;
  }
  .box .right .image .previewImg{
    width:100px;
    height:100px;
    margin-left:42px;
  }
  .box .right .image .button{
    position:relative;
    margin-top:60px;
  }
  .fileInput{
      position:absolute;
      left:0;
      top:0;
      opacity: 0;
  }
  .box .right .image .but{
    display:flex;
  }
  .box .right .image .del{
    margin-left:16px;
  }
  .box .right .image .i-right .i-right-box{
      display:flex;
      flex-flow: wrap;
  }
  .box .right .image .plImg{
    width:120px;
    height:100px;
    border-radius: 4px;
    margin-right:6px;
    margin-bottom:6px;
  }



  .item{
    display:flex;
    align-items: center;
    padding:20px;
  }
  .item .item-left{
    width:110px;
    text-align: right;
    margin-right:15px;
  }
  .item .item-right span{
    border:1px solid #eee;
    text-align:center;
    padding:4px 6px;
    margin-right:6px;
    cursor:pointer;
  }
  .item .item-right img{
    display:inline-block;
    width:34px;
    height:34px;
    border:1px solid #ddd;
    margin-right:6px;
    cursor:pointer;
  }
  .item .item-right .active{
    border: 2px solid #409EFF;
  }

  #submit {
    background: #fff;
    margin: 40px 47px;
    padding: 15px 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  #submit p{
    margin: 0;
    margin-top: 6px;
    color: #d1d6da;
  }
</style>
