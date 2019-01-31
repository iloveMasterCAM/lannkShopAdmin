<template>
  <transition name="fade">
    <div class="main">
      <div class="main-content">
        <div class="container-fluid">
          <div class="g_left">
            <h3 class="page-title">添加商品</h3>
            <el-form ref="form" :model="sizeForm" label-width="80px" style="width:100%;">
              <el-form-item label="商品名称">
                <el-input v-model="sizeForm.cName" style="width:400px;"></el-input>
              </el-form-item>
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
              <!--<el-form-item label="封面图片">-->
              <!--<div class="file">-->
              <!--<input type="file" value="" id="file" name="file"  @change='onUpload()' ref="upload" class="fileInput" accept="image/*">-->
              <!--</div>-->
              <!--<img :src="sizeForm.imgURl" alt="" class="previewImg" ref="previewImg">-->
              <!--</el-form-item>-->
              <el-form-item label="时间限制">
                <div class="block">
                  <el-date-picker
                    v-model="sizeForm.time"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="地区设置">
                <el-select
                  v-model="sheng"
                  @change="choseProvince"
                  placeholder="省级地区">
                  <el-option
                    v-for="item in province"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select
                  v-model="shi"
                  @change="choseCity"
                  placeholder="市级地区">
                  <el-option
                    v-for="item in shi1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="属性设置">
                <el-radio v-model="sizeForm.radio" label="1">进行中</el-radio>
                <el-radio v-model="sizeForm.radio" label="0">已结束</el-radio>
              </el-form-item>
              <el-form-item label="价格设置">
                <label for="" style="margin-left:29px;">原价：</label>
                <el-input-number v-model="sizeForm.OPrice" :precision="2" :step="0.1" :min="0" controls-position="right" size="mini" style="margin-right:60px;"></el-input-number>
                <label for="" >折扣：</label>
                <el-input-number v-model="sizeForm.zPrice" :precision="2" :step="0.1" :min="0" :max="10" controls-position="right" size="mini"></el-input-number>
                <br>
                <label for=""  style="margin-left:55px;">团购价：</label>
                <el-input-number v-model="sizeForm.tPrice" :precision="2" :step="0.1" :min="0" controls-position="right" size="mini" style="margin-right:60px;"></el-input-number>
                <label for="" >重量：</label>
                <el-input-number v-model="sizeForm.weight" :precision="2" :step="0.1" :min="0" controls-position="right" size="mini"></el-input-number>
                <!--<label for="">KG</label>-->
              </el-form-item>
              <el-form-item label="购买设置">
                <label for="">最低人数：</label>
                <el-input-number v-model="sizeForm.minPeo" :min="1" label="描述文字" controls-position="right" size="mini"></el-input-number>
                <label for=""  style="margin-left:6px;">每人限制购买：</label>
                <el-input-number v-model="sizeForm.limit" :min="1"  label="描述文字" controls-position="right" size="mini"></el-input-number>
                <br>
                <label for="" style="margin-left:68px;">库存：</label>
                <el-input-number v-model="sizeForm.stock" :min="0"  label="描述文字" controls-position="right" size="mini"></el-input-number>
                <label for="" style="margin-left:34px;">已售数量：</label>
                <el-input-number v-model="sizeForm.soldNum" :min="0"  label="描述文字" controls-position="right" size="mini"></el-input-number>
                <label for="">件</label>
              </el-form-item>
              <el-form-item label="收款账号">
                <el-select v-model="sizeForm.account" placeholder="请选择收款账号">
                  <el-option
                    v-for="item in options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="本单详情">
                <quill-editor
                  style="margin-left:40px;"
                  v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @ready="onEditorReady($event)"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
                </quill-editor>
              </el-form-item>
              <el-form-item label="精彩卖点">
                <quill-editor
                  style="margin-left:40px;"
                  v-model="content1"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @ready="onEditorReady($event)"
                  @blur="onEditorBlur1($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
                </quill-editor>
              </el-form-item>
              <el-form-item label="购买链接">
                <el-input v-model="sizeForm.link" placeholder="请输入购买链接" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="录入员">
                <el-input v-model="sizeForm.personnel" placeholder="请输入录入员名称" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item size="large" style="margin-left:230px;margin-top:100px;">
                <el-button type="primary" @click="onSubmit" style="margin-right:20px;">确定添加</el-button>
                <el-button @click="cancal">取消返回</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="g_right">
            <p>封面大图片</p>
            <img :src="sizeForm.imgURl" alt=""  ref="previewImg" class="g_img">
            <div class="g_button">
              <div class="up" style="position:relative;width:80px;height:28px;">
                <el-button type="primary" round size="mini">图片上传</el-button>
                <input type="file" value=""  name="file"  @change='onUpload()' ref="upload"  accept="image/*" style="position:absolute;top:0;left:0;opacity: 0;width:100%;height:100%;">
              </div>
              <div class="del" @click="delCoverImg">
                <el-button round size="mini">删除图片</el-button>
              </div>
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
        //编辑器
        content:'',
        content1:'',
        editorOption: {},
        diaData:[],
        diaDataOld:[],
        isChange:false,
        dialogFormVisible: false,
        //默认选择第一个选项卡
        activeName: 'first',

        tableData: [],
        specIdss:[],
        options:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],//收款账号
        sizeForm: {
          name: '',
          release: false,
          title: '',
          type: [],
          cName: '',
          tagLab: '',
          imgURl: '',
          fileImg: new File(["",""],""),
          pCode: '',
          pNum: 0,
          mPrice: 0,
          selPrice: 0,
          integral: 0,
          sortNum: 99,
          lookNum: 0,
          time:'',
          radio:"0",
          //checkList:["进行中"],
          OPrice:0,
          zPrice:0,
          tPrice:0,
          weight:0,
          minPeo:1,
          limit:1,
          stock:1000,
          soldNum:0,
          account:'',
          link:'',
          personnel:''

          // IsComment:0,
          // IsTop:0,
          // IsRecommend:0,
          // IsHot:0,
        },
        //地区
        mapJson: "http://localhost:7007/ctiy",
        province:'',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city:'',
        block:'',

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
        aIds:[],

        id:''


      }

    },
    created(){
      this.getCityData();
      this.instance = axios.create({
        headers:{
          "Content-Type": "multipart/form-data",
          "token":"18xTgOQ1DeMjhFHTgapQqmFoM3vbj3J3C53CthEtA6YnBnp+TPy3/RwdsvCidsZLmjQK5gb48EQquYapxDSLyQ=="
        }
      });
    },
    mounted() {
      let id=this.$route.params.id;
      this.id=id;
      let data=new FormData();
      data.append('id',id);
      this.instance.post('http://192.168.1.2:8080/shops/group/getProductEditInfoById.do',data).then(
        (res)=>{
          console.log(res);
          this.optionsClass=res.data.categoryList;
          let rd=res.data.productGroup;
          this.sizeForm.cName=rd.proTitle;
          this.classId=rd.classId;
          this.sizeForm.time=[rd.startDate,rd.endDate];
          this.sheng=rd.province;
          this.shi=rd.city;
          this.sizeForm.radio=rd.property+'';
          this.sizeForm.OPric=rd.priceOriginal;
          this.sizeForm.zPrice=rd.discount;
          this.sizeForm.tPrice=rd.priceGroup;
          this.sizeForm.weight=rd.weight;
          this.sizeForm.minPeo=rd.minNum;
          this.sizeForm.limit=rd.limitBuy;
          this.sizeForm.stock=rd.proNum;
          this.sizeForm.soldNum=rd.soldNum;
          this.sizeForm.account=rd.payId;
          this.content=rd.proDetail;
          this.content1=rd.sellPoint;
          this.sizeForm.link=rd.changeUrl;
          this.sizeForm.personnel=rd.inputUser;
          this.sizeForm.imgURl=rd.proPic;

        }
      ).catch((err)=>{
        console.log(err);
      });

    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    methods: {
      delCoverImg(){
        this.sizeForm.imgURl=require('../assets/fm.png');
        this.sizeForm.fileImg=new File(["",""],"")
      },
      //省市选择
      getCityData:function(){
        var that = this;
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
            this.sheng=this.province[index2].value;
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
            this.shi=this.city[index3].value
          }
        }
      },
      //编辑器事件
      onEditorReady(editor) { // 准备编辑器

      },
      // 失去焦点事件
      onEditorBlur(){
        console.log(this.content);
      },
      onEditorBlur1(){
        console.log(this.content1);
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
        this.$router.push({name: 'groupBuy'})
      },
      //提交页面所有数据
      onSubmit() {
        var data=new FormData();
        data.append("id",this.id);
        data.append("proTitle",this.sizeForm.cName);//商品标题
        data.append("classId",this.classId);
        data.append("coverImage",this.sizeForm.fileImg);
        data.append("province",this.sheng);
        data.append("city",this.shi);
        data.append("startDate",this.sizeForm.time[0]);
        data.append("endDate",this.sizeForm.time[1]);
        data.append("property",this.sizeForm.radio);//属性 数组
        data.append("priceOriginal",this.sizeForm.OPrice);//原价
        data.append("discount",this.sizeForm.zPrice);//折扣
        data.append("priceGroup",this.sizeForm.tPrice);//团购价
        data.append("minNum",this.sizeForm.minPeo);//限购人数
        data.append("limitBuy",this.sizeForm.limit);//限购数量
        data.append("proNum",this.sizeForm.stock);//库存account
        data.append("payId",this.sizeForm.account);//收款人账号
        data.append("weight",this.sizeForm.weight);
        data.append("soldNum",this.sizeForm.soldNum);
        data.append("proDetail",this.sizeForm.content);//本单详情
        data.append("sellPoint",this.sizeForm.content1);//买点
        data.append("changeUrl",this.sizeForm.link);
        data.append("inputUser",this.sizeForm.personnel);
        this.instance.post('http://192.168.1.2:8080/shops/group/updateProductGroupById.do',data)
          .then((res) => {
              console.log(res);
              this.$router.push({name: 'groupBuy'})
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
    font-size:14px;
    color:#1e1c1c;
    margin-left:10px;
    margin-bottom:10px;
  }
  .container-fluid{
    background-color:#fff;
    padding:20px;
    margin-left: 12px;
    display:flex;
  }

  .file{
    display:inline-block;
    position: relative;
    bottom:12px;
    width:90px;
    height:90px;
    border:2px dashed #a2a7b2;
    background: url(../assets/upload.png) center center  no-repeat;
  }
  .file .fileInput{
    width:100%;
    height:100%;
    opacity: 0;
  }
  .previewImg{
    position: relative;
    width:90px;
    height:90px;
    top:15px;
    margin-left:8px;
  }

  .item{
    display:flex;
    align-items: center;
    padding:20px;
  }
  .item .left{
    width:110px;
    text-align: right;
    margin-right:15px;
  }
  .item .right span{
    border:1px solid #eee;
    text-align:center;
    padding:4px 6px;
    margin-right:6px;
    cursor:pointer;
  }
  .item .right img{
    display:inline-block;
    width:34px;
    height:34px;
    border:1px solid #ddd;
    margin-right:6px;
    cursor:pointer;
  }
  .item .right .active{
    border: 2px solid #409EFF;
  }
  .imgBox{
    position:relative;
    display: inline-block;
    width:120px;
    height:120px;
    margin-right:10px;
    margin-top:10px;
  }

  .imgBox .button{
    width:100%;
    text-align: center;
  }
  .imgBox .button span{
    color:#409EFF;
    cursor:pointer;
    padding:0 4px;
  }
  .g_left{
    width:960px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);
    padding:20px;
    margin:30px;
  }
  .g_right{
    width:380px;
    height:340px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);
    padding:20px;
    margin:30px;
  }
  .g_right >p{
    color:#1e1c1c;
    font-size:14px;
    font-weight: bold;
  }
  .g_right .g_img{
    width:218px;
    height:170px;
    border-radius:8px;
    margin-left:60px;
    margin-top:40px;
  }
  .g_right .g_button{
    display:flex;
    padding-top:20px;
    justify-content: center;
  }
  .g_right .g_button>div{
    margin:10px;
  }
</style>

