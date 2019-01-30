<template>
  <transition name="fade">
    <div class="main">
      <div class="main-content">
        <div class="container-fluid">
          <h3 class="page-title">添加</h3>
          <div class="add" style="margin:35px;">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="规格名称">
                <el-input v-model="form.name" style="width:420px;" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="备注说明">
                <el-input type="textarea" v-model="form.remark" style="width:420px;" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="排序数字">
                <el-input-number v-model="form.sortNum" @change="handleChange" :min="1" :max="99" label="描述文字" size="small"></el-input-number>
              </el-form-item>
              <el-form-item label="规格选项">

                <el-button plain icon="el-icon-circle-plus-outline" @click="addSel()" size="small">添加选项</el-button>

              </el-form-item>
            </el-form>
          </div>



          <!--table-->
          <div class="table" style="width:700px;margin-left:116px;">
            <el-table
              :data="dialogData"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                fixed
                prop="title"
                label="文字"
                width="150">
              </el-table-column>
              <el-table-column
                prop="imgURl"
                label="	图片"
                width="150">
                <template scope="scope">
                  <img :src="scope.row.img_url" width="40" height="40" class="head_pic"/>
                </template>
              </el-table-column>
              <el-table-column
                prop="sort"
                label="排序"
                width="200">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="170">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.$index, dialogData)"
                    size="mini">
                    编辑
                  </el-button>
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, dialogData)"
                    type="danger"
                    size="mini">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-row style="margin:90px 118px;">
            <el-button @click="goSpecifications()">取 消</el-button>
            <el-button type="primary" @click="saveAll()">保存</el-button>
          </el-row>


          <!--dialog1  规格-->
          <el-dialog title="商品规格" :visible.sync="dialogFormVisible">
            <el-form :model="dialogForm">
              <el-form-item label="标题文字" :label-width="formLabelWidth">
                <el-input v-model="dialogForm.title" autocomplete="off" style="width:600px;" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="规格图片" :label-width="formLabelWidth">
                <div class="file">
                  <input type="file" value="" id="file" name="file"  @change='onUpload()' ref="upload" class="fileInput" accept="image/*">
                </div>

                <img src="" alt="" class="previewImg" ref="previewImg">
              </el-form-item>
              <el-form-item label="排序数字" :label-width="formLabelWidth">
                <el-input-number v-model="dialogForm.sort" @change="handleChangeDia" :min="1" :max="99" label="描述文字" size="small"></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="diaSubmit" >确 定</el-button>
            </div>
          </el-dialog>

          <!--dialog2  编辑-->
          <el-dialog title="商品规格" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="dialogFormEdit">
              <el-form-item label="标题文字" :label-width="formLabelWidth">
                <el-input v-model="dialogFormEdit.title" autocomplete="off" style="width:600px;" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="规格图片" :label-width="formLabelWidth">
                <div class="file">
                  <input type="file" value=""  @change='onUpload1' ref="upload1" class="fileInput" name="file" accept="image/*">
                </div>

                <img :src="imgSrc" alt="" class="previewImg" ref="previewImg1" id="previewImg1">

              </el-form-item>
              <el-form-item label="排序数字" :label-width="formLabelWidth">
                <el-input-number v-model="dialogFormEdit.sort" @change="handleChangeDia" :min="1" :max="99" label="描述文字" size="small"></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
              <el-button type="primary" @click="diaSubmitEdit">确 定</el-button>
            </div>
          </el-dialog>

        </div>
      </div>

    </div>
  </transition>
</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        //上面form数据
        form: {
          name: "",
          remark: "",
          sortNum:99
        },
        dialogFormVisible: false,
        //dialog数据
        dialogData:[],

        dialogForm: {
          title: "",
          sort:99,
          img_url:"",
          formData:null,
          ID:'',
          imgURl:'',

        },
        formLabelWidth: '120px',
        index:0,
        imgSrc0:'',
        imgSrc:'',
        dialogFormVisibleEdit:false,
        dialogFormEdit: {
          title: "",
          sort:99,
          img_url:"",
          imgURl:'',
          formData:null,
          ID:''
        },
        token:"18xTgOQ1DeMjhFHTgapQqlyt7ntBU+RrTDmDuM/7LUpg7Fu0R028DE4qWcbTRggU7EXU+VASrgEBofcDd/KmvA==",
        ID:'',
        delSubId:[]
      }
    },
    mounted(){
        console.log(this.$route.params.data);
        this.form.name=this.$route.params.data.title;
        this.form.sortNum=this.$route.params.data.sort;
        this.form.remark=this.$route.params.data.remark;
        this.ID=this.$route.params.data.ID;
        //获取子类
      console.log(this.ID);
        var data=new FormData();
        data.append("ID",this.Id);
        axios.get('http://192.168.1.2:8080/shops/getGoodsSubSpec?ID='+this.ID).then(
          (res)=>{
            console.log(res);
            this.dialogData=this.dialogData.concat(res.data.list);
            console.log(this.dialogData)
          }
        ).catch((err)=>{
          console.log(err);
        });
    },
    methods:{
      //编辑
      editRow(index, rows){
        var str=JSON.stringify(rows[index]);
        this.dialogFormEdit=JSON.parse(str);
        this.index=index;
        console.log(this.index);
        this.imgSrc=this.dialogFormEdit.img_url;
        this.dialogFormVisibleEdit = true;
      },
      //提交编辑保存
      diaSubmitEdit(){
        this.dialogFormVisibleEdit = false;
        // this.dialogData[this.index]=this.dialogFormEdit;
        //delete this.dialogData[this.index];
        this.dialogData.splice(this.index,1,this.dialogFormEdit);
        console.log(this.dialogData)

      },
      //移除table选项
      deleteRow(index, rows) {
        console.log(rows[0].ID);
        this.delSubId.push(rows[0].ID);
        rows.splice(index, 1);
        console.log(this.delSubId);
      },
      handleChange(value) {
        console.log(value);
      },
      handleChangeDia(value) {
        console.log(value);
      },
      onUpload(){
        var fileObj=this.$refs.upload;
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        //fileObj.files[0]   FormData
        dataURL = windowURL.createObjectURL(fileObj.files[0]);//图片临时路径
        this.$refs.previewImg.src=dataURL;
        this.dialogForm.img_url=dataURL;
        this.dialogForm.formData=new FormData();
        this.dialogForm.formData.append("file", fileObj.files[0],fileObj.files[0].name);
        console.log(1111);
        console.log(fileObj.files[0]);
      },
      onUpload1(){
        var fileObj=this.$refs.upload1;
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        //fileObj.files[0]   FormData
        dataURL = windowURL.createObjectURL(fileObj.files[0]);//图片临时路径
        this.$refs.previewImg1.src=dataURL;
        this.dialogFormEdit.img_url=dataURL;
        this.dialogFormEdit.formData=new FormData();
        this.dialogFormEdit.formData.append("file", fileObj.files[0],fileObj.files[0].name);
      },
      addSel(){
        this.dialogForm.name='';
        this.dialogForm.sortNum=99;
        this.dialogForm.imgURl='';
        this.dialogForm.formData=null;
        this.dialogFormVisible = true;
        try{this.$refs.previewImg.src='';}catch (e) {}
      },
      //本地保存
      diaSubmit(){
        if(this.dialogForm.title||this.dialogForm.formData){
          this.dialogFormVisible = false;
          // var str=JSON.stringify(this.dialogForm);
          // var data=JSON.parse(str);
          var data=[];
          var json={};
          for (let key in this.dialogForm) {
            json[key]=this.dialogForm[key];
          }
          data.push(json);
          this.dialogData=this.dialogData.concat(data);
          //console.log(this.dialogData[0].formData.get('file'))
          console.log('dialogData');
          console.log(this.dialogData[0])
        }else {
          this.$message({
            message: '请添加图片或者标题',
            type: 'warning'
          });
          return false;
        }


      },
      //取消保存回到上一层
      goSpecifications(){
        this.$router.push({name: 'specifications'})
      },
      //提交页面所有数据
      saveAll(){
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        var data = new FormData();
        var file=new File(["",""],"");
        data.append("title",this.form.name);
        data.append("remark",this.form.remark);
        data.append("sort",this.form.sortNum);
        data.append("ID",this.ID);
        data.append("delSubId",this.delSubId);
        console.log(this.token);
        //console.log(this.dialogData[0].formData.get('file'));
        //循环数组 单个append
        console.log(this.dialogData);
        if(this.dialogData.length>0){
          for (var key in this.dialogData) {
            data.append("titleName",this.dialogData[key].title);
            data.append("sortNum",this.dialogData[key].sort);
            data.append("subId",this.dialogData[key].ID);
            if(this.dialogData[key].formData){
              data.append("imgFile",this.dialogData[key].formData.get('file'));
            }else {
              data.append("imgFile",file);
            }
          }
          console.log('eee');
          console.log(data);

        }else {
          data.append("titleName","");
          data.append("sortNum","");
          data.append("imgFile",file);
        }
        console.log(444);
        console.log(data.getAll('titleName'));
        let config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.post('http://192.168.1.2:8080/shops/updateGoodsSpec.do',
          data,config)
          .then((res)=>{
              console.log(res)
            }

          ).catch((err)=>{
          console.log(err);
        });
        this.$router.push({name: 'specifications'})}
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
    top:10px;
    margin-left:8px;
  }

  .container-fluid{
    background-color:#fff;
    padding:20px;
    margin-left: 12px;
  }
</style>
