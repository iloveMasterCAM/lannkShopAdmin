<template>
  <transition name="fade">
    <div class="main">
      <div class="main-content">
        <div class="container-fluid">
          <h3 class="page-title">修改商品</h3>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="基本信息" name="first">
              <div class="tabFirst">
                <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                  <el-form-item label="所属类别">
                    <el-select v-model="classId" placeholder="请选择所属类别" @change="getClassId">
                      <el-option
                        v-for="item in optionsClass"
                        :key="item.categoryId"
                        :label="item.categoryName"
                        :value="item.categoryId">
                      </el-option>
                      <!--categoryId-->
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
                      <!--<el-checkbox-button label="幻灯片" name="type"></el-checkbox-button>-->
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="内容标题">
                    <el-input v-model="sizeForm.cName" style="width:400px;"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="副标题">-->
                  <!--<el-input v-model="sizeForm.subName" style="width:400px;"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="Tags标签">-->
                  <!--<el-input v-model="sizeForm.tagLab" style="width:400px;"></el-input>-->
                  <!--</el-form-item>-->
                  <el-form-item label="封面图片">
                    <div class="file">
                      <input type="file" value="" id="file" name="file"  @change='onUpload()' ref="upload" class="fileInput" accept="image/*">
                    </div>
                    <img :src="sizeForm.imgURl" alt="" class="previewImg" ref="previewImg">
                  </el-form-item>
                  <el-form-item label="商品货号">
                    <el-input v-model="sizeForm.pCode" style="width:400px;"></el-input>
                  </el-form-item>
                  <el-form-item label="库存数量">
                    <el-input-number v-model="sizeForm.pNum"  :min="0" :max="9999" label="描述文字" size="small"></el-input-number>
                    <label>库存数量为0时显示缺货状态</label>
                  </el-form-item>
                  <el-form-item label="市场价格">
                    <!--<el-input v-model="sizeForm.mPrice" style="width:130px;"></el-input>-->
                    <el-input-number v-model="sizeForm.mPrice" :precision="2" :step="1" :min="0" ></el-input-number>
                    <label>元</label>
                  </el-form-item>
                  <el-form-item label="销售价格">
                    <el-input-number v-model="sizeForm.selPrice" :precision="2" :step="1" :min="0" ></el-input-number>
                    <label>元</label>
                  </el-form-item>
                  <!--<el-form-item label="交易积分">-->
                  <!--<el-input v-model="sizeForm.integral" style="width:130px;"></el-input>-->
                  <!--</el-form-item>-->
                  <el-form-item label="商品规格">
                    <el-button plain icon="el-icon-circle-plus-outline" @click="addSel()" size="small">设置规格</el-button>
                  </el-form-item>

                  <!--table-->
                  <div class="table" style="margin-left:80px;">
                    <el-table
                      :data="tableData"
                      border
                      tooltip-effect="dark"
                      style="width: 100%">
                      <el-table-column
                        fixed
                        prop="Pro_No"
                        label="货号"
                        width="220">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.Pro_No" size="small"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="Pro_MPrice"
                        label="市场价(元)"
                        width="150">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.Pro_MPrice" :precision="2" :step="1" :min="0" size="small"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="Pro_SPrice"
                        label="销售价(元)"
                        width="150">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.Pro_SPrice" :precision="2" :step="1" :min="0" size="small"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="Pro_Num"
                        label="库存(件)"
                        width="160">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.Pro_Num"  :min="0" :max="9999" label="描述文字" size="small"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="Spec_Text"
                        label="规格"
                        width="800">
                      </el-table-column>
                      <!--<el-table-column-->
                      <!--fixed="right"-->
                      <!--label="操作"-->
                      <!--width="190">-->
                      <!--<template slot-scope="scope">-->
                      <!--<el-button-->
                      <!--type="primary"-->
                      <!--@click.native.prevent="editRow(scope.row)"-->
                      <!--size="mini">-->
                      <!--编辑-->
                      <!--</el-button>-->
                      <!--</template>-->
                      <!--</el-table-column>-->
                    </el-table>
                  </div>
                  <el-form-item label="排序数字">
                    <el-input-number v-model="sizeForm.sortNum"  :min="0" :max="99" label="描述文字" size="small"></el-input-number>
                  </el-form-item>
                  <!--<el-form-item label="浏览次数">-->
                  <!--<el-input-number v-model="sizeForm.lookNum"  :min="0" :max="999" label="描述文字" size="small"></el-input-number>-->
                  <!--</el-form-item>-->
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
                  <el-form-item label="图片相册">
                    <label for="uploadMFile" style="padding:0 14px;font-size:12px;border-radius: 3px;color: #606266;border: 1px solid #dcdfe6;font-weight:normal;cursor:pointer;"><i class="el-icon-document" style="padding-right:6px;"></i>批量上传</label>
                    <input type="file" name="file" id="uploadMFile" style="opacity: 0;position:absolute;left:-999px;"  accept="image/*" multiple @change="addImg()" ref="inputer"><br>
                    <div class="imgBox" v-for="(value, index) in imgs" :key="index" v-show="imgs">
                      <img :src="getObjectURL(value)" alt="" style="width:120px;height:120px;">
                      <div class="button">
                        <span @click="delImg(index)">删除</span>
                      </div>
                    </div>
                    <div class="imgBox" v-for="(value, index) in imgsUrl" :key="index" v-show="!imgs">
                      <img :src="value.imagesPath" alt="" style="width:120px;height:120px;">
                      <div class="button">
                        <span @click="delImgUrl(value.id)">删除</span>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button type="primary" @click="onSubmit">立即添加</el-button>
                    <el-button @click="cancal">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详细描述" name="second">
              <div class="tabSecond">
                <el-form  :model="secondForm" label-width="80px" size="mini">
                  <!--<el-form-item label="调用别名">-->
                    <!--<el-input v-model="secondForm.name" style="width:400px;"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="URL链接">-->
                    <!--<el-input v-model="secondForm.link" style="width:400px;"></el-input>-->
                  <!--</el-form-item>-->
                  <el-form-item label="内容摘要">
                    <el-input type="textarea" v-model="secondForm.abstract" style="width:400px;"></el-input>
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
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即添加</el-button>
                    <el-button @click="cancal">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="SEO选项" name="third">
              <div class="tabThird">
                <el-form  :model="thirdForm" label-width="80px" size="mini">
                  <el-form-item label="SEO标题">
                    <el-input v-model="thirdForm.title" style="width:400px;"></el-input>
                  </el-form-item>
                  <el-form-item label="SEO关健字">
                    <el-input type="textarea" v-model="thirdForm.key" style="width:400px;"></el-input>
                  </el-form-item>
                  <el-form-item label="SEO描述">
                    <el-input type="textarea" v-model="thirdForm.des" style="width:400px;"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即添加</el-button>
                    <el-button @click="cancal">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
          <!--dialog-->
          <el-dialog title="商品规格" :visible.sync="dialogFormVisible">
            <div class="item" v-for="item in diaData">
              <span class="left" v-html="item.title"></span>
              <div class="right">
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
        editorOption: {},
        diaData:[],
        diaDataOld:[],
        isChange:false,
        dialogFormVisible: false,
        //默认选择第一个选项卡
        activeName: 'first',

        tableData: [],
        sizeForm: {
          id:'',
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

          IsComment:0,
          IsTop:0,
          IsRecommend:0,
          IsHot:0,
        },
        optionsClass: [],
        classId: null,
        subName: '',

        dialogForm: [],
        subTable: [],
        //多图片上传
        imgs: {},
        //url
        imgsUrl:[],
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
      var id=this.$route.params.id;
      this.optionsClass=this.$route.params.classList;
      this.classId=this.$route.params.categoryId;
      // alert(id);
      let data=new FormData();
      data.append("id",id);
      this.instance.post('http://192.168.1.2:8080/shops/getProductById.do',data)
        .then((res) => {
          console.log("修改商品");
          console.log(res.data);
          var selectData=res.data.selectedspec;//选中数据
          var data=res.data.allspec;//全部规格数据
          this.tableData=res.data.sepclist;//规格详情
          this.imgsUrl=res.data.imggroup;
          var form=res.data.allspec[0];//页面数据
          data.splice(0,1);
          data.forEach((item)=>{
            item.subList.forEach((item)=>{
              item.state=false;
            })
          });
          data.forEach((item)=>{
            selectData.forEach((val)=>{
                if(item.ID===val.Spec_ID){
                  item.subList.forEach((it)=>{
                    val.subList.forEach((va)=>{
                       if(it.ID===va.Spec_ID){
                         it.state=true;
                       }
                    })
                  })
                }
            })
          });
          this.diaData=data;



          var type=[];
          if(form.isRecommend){
              type.push("推荐")
          }
          if(form.isHot){
            type.push("热门")
          }
          if(form.isTop){
            type.push("置顶")
          }
          if(form.isComment){
            type.push("允许评论")
          }
          this.sizeForm.id=form.id;
          this.sizeForm.release=!!form.verify;
          this.sizeForm.type=type;
          this.sizeForm.cName=form.title;
          //this.sizeForm.imgURl=form.title;
          this.sizeForm.pCode=form.artNo;
          this.sizeForm.pNum=form.proNums;
          this.sizeForm.mPrice=form.oPrice;
          this.sizeForm.selPrice=form.proPrice;
          this.sizeForm.sortNum=form.sort;
          this.sizeForm.time=this.changeTime(form.addDate);
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
      delImgUrl(id){
        console.log(id);
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
      //时间戳转yy-mm-dd hh::mm:ss
      changeTime(unixtimestamp){
        var unixtimestamp = new Date(unixtimestamp);
        var year = 1900 + unixtimestamp.getYear();
        var month = "0" + (unixtimestamp.getMonth() + 1);
        var date = "0" + unixtimestamp.getDate();
        var hour = "0" + unixtimestamp.getHours();
        var minute = "0" + unixtimestamp.getMinutes();
        var second = "0" + unixtimestamp.getSeconds();
        return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
          + " " + hour.substring(hour.length-2, hour.length) + ":"
          + minute.substring(minute.length-2, minute.length) + ":"
          + second.substring(second.length-2, second.length);
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
        this.diaData.forEach((item)=>{
          var title=item.title+":";
          var t=[];
          var s=[];
          var flag=true;
          item.subList.forEach((val)=>{
            if(val.state){
              s.push(val.title);
              if(flag){
                t.push(title);
                flag=false;
              }
            }
          });
          if(s){
            this.arr.push(t);
            this.arr.push(s);
          }
        });
        for(let i=this.arr.length-1;i>=0;i--){
          if(this.arr[i].length===0){
            this.arr.splice(i,1)
          }
        }
        console.log(this.arr);
        this.result=[];
        this.results=[];
        this.doExchange(this.arr, 0);
        console.log(this.results);
        this.tableData=[];
        var code=this.getRandomCode(16);
        this.results.forEach((item,index)=>{
          var obj={};
          if(this.sizeForm.pCode){
            obj.Pro_No=this.sizeForm.pCode+"-"+(index+1);
          }else{
            obj.Pro_No=code+"-"+(index+1);
          }

          obj.Pro_MPrice=0; //市场价
          obj.Pro_SPrice=0;//销售价
          obj.Pro_Num=0;//库存
          obj.Spec_Text=item;
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
        data.append("classId",this.classId+'');//类别
        data.append("verify",a);//上下架
        data.append("isComment",this.sizeForm.IsComment);
        data.append("isTop",this.sizeForm.IsTop);
        data.append("isRecommend",this.sizeForm.IsRecommend);
        data.append("isHot",this.sizeForm.IsHot);
        data.append("title",this.sizeForm.cName);//内容标题

        // data.append("subName",this.sizeForm.subName);//副标题
        // data.append("tagLab",this.sizeForm.tagLab);//Tags标签
        //data.append("coverImage",this.sizeForm.fileImg);

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
        data.append("goodsSelect",JSON.stringify(this.diaData));//-选中规格数据
        //数据2
        data.append("proDetail",this.secondForm.abstract);
        data.append("proInfo",this.content);
        //数据3
        data.append("seoTitle",this.thirdForm.title);
        data.append("seoKeyWords",this.thirdForm.key);
        data.append("seoDescribe",this.thirdForm.des);
        this.instance.post('http://192.168.1.2:8080/shops/addProduct.do',data)
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
    font-size:18px;
  }
  .container-fluid{
    background-color:#fff;
    padding:20px;
    margin-left: 12px;
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
</style>
