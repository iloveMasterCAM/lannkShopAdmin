<template>
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class id="list" v-show="isShow == 0">
      <p>
        <el-button @click="addClassify" type="primary">添加模板</el-button>
        <el-button @click="delAll" type="danger">批量删除</el-button>
      </p>
      <table width="100%">
        <tr>
          <th>
            <el-checkbox @change="allCheckbox" :checked="checked">全选</el-checkbox>
          </th>
          <th>标题</th>
          <th>免运费</th>
          <th>计费类型</th>
          <th>管理操作</th>
        </tr>
        <tr v-for="(item,index) in list" :key="index">
          <td>
            <el-checkbox v-model="item.checked">{{index+1}}</el-checkbox>
          </td>
          <td>
            <em v-show="!item.show">{{item.title}}</em>
            <input type="text" v-model="item.title" v-show="item.show">
          </td>
          <td>
            <em v-show="!item.show">{{item.free == '0'?"是":"否"}}</em>
            <el-radio v-show="item.show" v-model="item.free" label="0">是</el-radio>
            <el-radio v-show="item.show" v-model="item.free" label="1">否</el-radio>
          </td>
          <td>
            <em v-show="!item.show">{{item.type == '0'?"按件计算":"按重量"}}</em>
            <el-radio v-show="item.show" v-model="item.type" label="0">按件计算</el-radio>
            <el-radio v-show="item.show" v-model="item.type" label="1">按重量</el-radio>
          </td>
          <td>
            <span @click="detail(item.id)">[详情]</span>
            <span @click="delClassify(item.id)">[删除]</span>
            <span @click="allEdit(index)" v-text="item.editTXT"></span>
          </td>
        </tr>
      </table>
    </div>
    <div id="add" v-show="isShow == 1">
      <p>
        <el-button @click="back" type="primary">返回</el-button>
      </p>
      <div class="el-row">
        <div class="el-col-2">模板标题:</div>
        <div class="el-col-10">
          <el-input v-model="add.title" placeholder="请输入模板标题"></el-input>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">免运费:</div>
        <div class="el-col-10">
          <el-radio v-model="add.isFree" label="0">是</el-radio>
          <el-radio v-model="add.isFree" label="1">否</el-radio>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">计费类型:</div>
        <div class="el-col-10">
          <el-radio v-model="add.isType" label="0">按件数</el-radio>
          <el-radio v-model="add.isType" label="1">按重量</el-radio>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">&nbsp;</div>
        <div class="el-col-10">
          <el-button class="pull-right" @click="confirm" type="primary">添加模板</el-button>
        </div>
      </div>
    </div>
    <!-- 
id	主键 int	运费id
regionId	Int	区域id (市id)
startValue	Int	起步值
startFee	Int	起步价
addValue	Int	加值
addFee	itn	加价


    -->
    <div id="addDetail" v-show="isShow == 3">
      <p>
        <el-button @click="back" type="primary">返回</el-button>
      </p>
      <div class="el-row">
        <div class="el-col-2">地区:</div>
        <div class="el-col-15">
          <el-select v-model="addProvince" @change="choseProvince($event)" placeholder="请选择">
            <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="Ctiy" @change="choseCity($event)" placeholder="请选择">
            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">起步值:</div>
        <div class="el-col-15">
          <el-input v-model="addDetail.startValue" placeholder="输入起步值"></el-input>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">起步价:</div>
        <div class="el-col-15">
          <el-input v-model="addDetail.startFee" placeholder="输入起步价"></el-input>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">加值:</div>
        <div class="el-col-15">
          <el-input v-model="addDetail.addValue" placeholder="输入加值"></el-input>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">加价:</div>
        <div class="el-col-15">
          <el-input v-model="addDetail.addFee" placeholder="输入加价"></el-input>
        </div>
      </div>
      <div class="el-row">
        <div class="el-col-2">&nbsp;</div>
        <div class="el-col-15">
          <el-button class="pull-right" @click="confirm('detail')" type="primary">添加模板</el-button>
        </div>
      </div>
    </div>
    <!-- 
	起步值	起步价	加值	加价
    -->
    <div id="detail" v-show="isShow == 2">
      <p>
        <el-button @click="back" type="primary">返回</el-button>
        <el-button @click="adddetail" type="primary">添加</el-button>
      </p>
      <table width="100%">
        <tr>
          <th>区域</th>
          <th>起步值</th>
          <th>起步价</th>
          <th>加值</th>
          <th>加价</th>
          <th>操作</th>
        </tr>
        <tr v-for="(Item,index) in detailData" :key="index">
          <td>
            <el-select
              v-model="Item.shen"
              value-key="index"
              placeholder="请选择"
              :disabled="Item.readonly"
              @change="choseProvince($event,index)"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="Item.Ctiy"
              :disabled="Item.readonly"
              placeholder="请选择"
              @change="choseCity($event,index)"
            >
              <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </td>
          <td>
            <el-input
              class="value"
              :disabled="Item.readonly"
              :value="Item.startValue"
              v-model="Item.startValue"
            ></el-input>
          </td>
          <td>
            <el-input
              class="value"
              :disabled="Item.readonly"
              :value="Item.startFee"
              v-model="Item.startFee"
            ></el-input>
          </td>
          <td>
            <el-input
              class="value"
              :disabled="Item.readonly"
              :value="Item.addValue"
              v-model="Item.addValue"
            ></el-input>
          </td>
          <td>
            <el-input
              class="value"
              :disabled="Item.readonly"
              :value="Item.addFee"
              v-model="Item.addFee"
            ></el-input>
          </td>
          <td>
            <span @click="edit(index,Item.id)" v-text="Item.txt"></span>
            <span @click="del(index,Item.id)">[删除]</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style>
#addDetail > div {
  line-height: 40px;
}
#add > div,
#addDetail > div {
  margin-bottom: 15px;
}
#list .el-radio + .el-radio {
  margin-left: 10px;
}
#detail .value input {
  text-align: center;
  padding: 0;
  height: 30px;
}
#detail .value {
  display: inline-block;
  width: 50px;
}
#detail td {
  padding: 10px 0;
}
#list td {
  position: relative;
}
#list td input {
  position: absolute;
  top: 10px;
  left: 0;
  height: 30px;
  width: 90%;
}
#add {
}
#add {
}
#list,
#add,
#detail,
#addDetail {
  margin: 20px;
  padding: 20px;
  padding-bottom: 0;
  background: #fff;
}
#add,
#detail,
#addDetail {
  padding-bottom: 30px;
}
#list td {
  line-height: 45px;
}
#list td span{
  color: #007bc1;
  cursor: pointer;
}
</style>
<script>
export default {
  data() {
    return {
      checked: false,
      addProvince: "",
      Ctiy: "",
      add: {
        isFree: "0",
        isType: "0",
        title: ""
      },
      readonly: true,
      txt: "[修改]",
      list: [],
      detailData: [],
      isShow: 0,
      mapJson: "http://localhost:7007/ctiy",
      province: "",
      shi1: [],
      city: "",
      block: "",
      address: [],
      addDetail: {
        // 添加 运费
        regionId: "",
        startValue: "",
        startFee: "",
        addValue: "",
        addFee: "",
        detailId: ""
      }
    };
  },
  methods: {
    /* 
 /deliveryTemp/saveFee
*/
    allEdit(i) {
      this.list[i].show = !this.list[i].show;
      if (!this.list[i].show) {
        this.axios.post(
          "deliveryTemp/saveTemp",
          {
            Id: this.list[i].id,
            free: this.list[i].free,
            type: this.list[i].free,
            title: this.list[i].title
          },
          function(r) {
            console.log(r);
          }
        );
        this.list[i].editTXT = "[修改]";
      } else {
        this.list[i].editTXT = "[保存]";
      }
    },
    adddetail() {
      this.isShow = 3;
      //addDetail
    },

    delAll() {
      let d = [];
      this.list.map(v => {
        if (v.checked) {
          d.push(v);
        }
      });
      console.log(d);
    },
    addClassify() {
      this.isShow = 1;
    },
    //删除 模块
    delClassify(id) {
      //deliveryTemp/deleteTemp
      this.ajax.post("deliveryTemp/deleteTemp", { ids: [id] }, function(r) {
        console.log(r);
      });
    },
    del(i,id){
      //deliveryTemp/deleteFee
        let that = this;
      this.ajax.post("deliveryTemp/deleteFee", { ids: [id] }, function(r) {
        console.log(r);
        that.detailData.splice(i,1)
      });
    },
    //全选
    allCheckbox() {
      let that = this;
      that.checked = !that.checked;
      this.list.map(v => {
        if (!that.checked) {
          v.checked = false;
        } else {
          v.checked = true;
        }
      });
    },
    //确定添加
    confirm(key) {
      if (key) {
        let d = this.addDetail;
        console.log(d);
        if (
          !d.regionId ||
          !d.startValue ||
          !d.startFee ||
          !d.addValue ||
          !d.addFee
        ) {
          alert("参数不全");
          return;
        }
        this.axios.post(
          "deliveryTemp/saveFee",
          {
            tempId: d.detailId,
            regionId: d.regionId,
            startValue: d.startValue,
            startFee: d.startFee,
            addValue: d.addValue,
            addFee: d.addFee
          },
          function(r) {
            console.log(r);
          }
        );
      } else {
        let d = this.add;
        this.axios.post(
          "deliveryTemp/saveTemp",
          { free: d.isFree, type: d.isType, title: d.title },
          function(r) {
            console.log(r);
          }
        );
      }
    },
    edit(i, id) {
      this.detailData[i].readonly = !this.detailData[i].readonly;
      if (this.detailData[i].readonly) {
        this.detailData[i].txt = "[修改]";
        if (this.detailData[i].address.length >= 1) {
          this.axios.post(
            "deliveryTemp/saveFee",
            {
              id: id,
              regionId: this.detailData[i].address[0], //区域
              startValue: this.detailData[i].startValue,
              startFee: this.detailData[i].startFee,
              addValue: this.detailData[i].addValue,
              addFee: this.detailData[i].addFee
            },
            function(r) {
              console.log(r);
            }
          );
        }
      } else {
        this.detailData[i].txt = "[保存]";
      }
    },
    back() {
      this.isShow = 0;
    },
    
    detail(id) {
      this.isShow = 2;

      let that = this;
      // deliveryTemp/getListByPage
      this.axios.post("deliveryTemp/getFeesByTid", { id: id }, function(r) {
        that.addDetail.detailId = id;
    
        r.d.deliveryFees.map(v => {
        
          that.$set(v, "shen", that.s_province( parseInt(v.regionId / 1000) * 1000));
          that.$set(v, "Ctiy", that.s_City(v.regionId));
          that.$set(v, "qu", "请选择");
          that.$set(v, "txt", "[修改]");
          that.$set(v, "readonly", true);
        });
        console.log(r.d.deliveryFees[0])
        that.detailData = r.d.deliveryFees;
   
        
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
        callback && callback();
      });
    }, // 选省
    choseProvince: function(e, index) {
     
      this.s_province(e, index);
    },
    s_province(e, index) {
      for (var index2 in this.province) {
        if (e == this.province[index2].id) {
          let con = this.detailData[index];
           if (!index && index !=0) {
            con = this;
          } else {
            con.address = [ this.province[index2].children[0].id ];
          }
          this.shi1 = this.province[index2].children;
          con.Ctiy = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          con.qu = this.province[index2].children[0].children[0].value;
          this.addDetail.regionId = this.province[index2].children[0].id;
          this.E = this.qu1[0].id;
          return this.province[index2].value;
        }
      }
      //  console.log(this.province[index2].value)
    },
    // 选市
    choseCity: function(e, index) {

      this.s_City(e, index);
      if (!index) {
        this.addDetail.regionId = e;
      }
    },
    s_City(e, index) {
      for (var index3 in this.city) {
        if (e == this.city[index3].id) {
          let con = this.detailData[index];
          if (!index && index !=0) {
            con = this;
          } else {
            con.address = [e];
          }
          con.Ctiy = this.city[index3].value;
          this.qu1 = this.city[index3].children;
          this.qu = this.city[index3].children[0].value;
          this.E = this.qu1[0].id;
          return this.city[index3].value;
        }
      }
    }
  },

  mounted() {
    let that = this;

    this.getCtiyData();
    this.axios.post(
      "deliveryTemp/getListByPage",
      { showCount: 10, currentPage: 1 },
      function(r) {
        r.map(v => {
          if (!v.type) v.type = "0";
          if (!v.free) v.free = "0";
          v.free = v.free.toString();
          v.type = v.type.toString();
          that.$set(v, "show", false);
          that.$set(v, "checked", false);
          that.$set(v, "editTXT", "[修改]");
        });
        that.list = r;
        console.log(that.list);
      }
    );
  }
};
</script>
