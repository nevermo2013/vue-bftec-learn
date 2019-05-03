<template>
  <div class="student-detail-main">
    <el-dialog :show-close="false" :title="titleCom" :visible.sync="show" width="70%" @close="handleClose">
      <el-form v-loading="loading" ref="form" class="form" :rules="rules" :model="form" label-width="100px">
        <!-- 基本信息 -->
        <el-card class="form-card" shadow="never">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="选择性别">
                  <el-option
                    v-for="item in sexOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级" prop="classId">
                <el-select v-model="form.classId" placeholder>
                  <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.className"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话" prop="tel">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证">
                <el-input v-model="form.manID"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="城市">
                <el-cascader
                  size="small"
                  :options="cityOptions"
                  v-model="selectedCitys"
                  @change="handleCityChange"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍">
                <el-select clearable v-model="form.dormId" placeholder>
                  <el-option
                    v-for="item in dormList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入住日期">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="form.dormStartTime"
                  type="date"
                  placeholder="选择入住时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离开日期">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="form.dormEndTime"
                  type="date"
                  placeholder="选择入住时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <!-- 补充信息 -->
        <el-card shadow="never" class="form-card">
          <div slot="header">
            <span>补充信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="紧急联系人">
                <el-input v-model="form.tel2" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="微信">
                <el-input v-model="form.wx" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="qq">
                <el-input v-model="form.qq" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业院校">
                <el-input v-model="form.school" placeholder></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="工作">
                <el-input v-model="form.job" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="never" class="form-card">
          <div slot="header">
            <span>交费信息</span>
            <el-button-group v-show="!costCard" class="cost-button-group">
              <el-button @click="costCard=true" type="text">添加费用记录+</el-button>
              <!-- <el-button type="text">学费+</el-button> -->
            </el-button-group>
          </div>
          <el-card class="cost-card" v-show="costCard" shadow="hover" style="margin-bottom:20px">
            <el-form :model="costForm" ref="costForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="类型">
                    <el-radio v-model="costForm.costType" label="0">学费</el-radio>
                    <el-radio v-model="costForm.costType" label="1">住宿费</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="金额">
                    <el-input type="number" :min="0" v-model="costForm.costValue" placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="交费时间">
                    <el-date-picker
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="costForm.costTime"
                      placeholder="选择日期时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input
                      type="textarea"
                      :rows="2"
                      v-model="costForm.costBak"
                      maxlength="300"
                      show-word-limit
                      placeholder="请输入备注信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" :offset="12" style="text-align:right;">
                  <el-button @click="handleCostCancel" style="margin-right:20px">取消</el-button>
                  <el-button @click="handleCostSave" type="primary">确定</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>

          <el-table :data="costList" border stripe>
            <el-table-column show-overflow-tooltip type="index" width="50"></el-table-column>
            <el-table-column show-overflow-tooltip prop="costType" label="类型" width="150">
              <template slot-scope="scope">{{scope.row.costType=='0'?'学费':'住宿费'}}</template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="costValue" label="金额" width="150"></el-table-column>
            <el-table-column show-overflow-tooltip prop="costTime" label="时间" width="200"></el-table-column>
            <el-table-column show-overflow-tooltip prop="costBak" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template v-if="!scope.row.id" slot-scope="scope">
                <el-button @click="delCostInfo(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-form>
      <span slot="footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import studentApi from "@/api/xy/studentApi";
import costApi from "@/api/xy/costApi";
import { resetData, resetForm, handlePostObjArr } from "@/util/index";
// https://github.com/Plortinus/element-china-area-data
// 地市三级联动
import { regionDataPlus } from "element-china-area-data";

export default {
  name: "StudentDetail",
  props: {
    show: Boolean,
    classList: Array,
    dormList: Array
  },
  data() {
    return {
      loading: false,
      title: "",
      form: {
        name: '',
        sex: '0',
        tel: ''
      },
      sexOption: [
        {
          label: "男",
          value: "0"
        },
        {
          label: "女",
          value: "1"
        }
      ],
      cityOptions: regionDataPlus, //地市三级联动
      selectedCitys: ["410000", "410100", ""],
      costList: [],
      costForm: {
        costType: "0", //默认0 学费 , 1 住宿费
        costTime: "",
        costValue: 0,
        costBak: ""
      },
      costCard: false, // 交费块是否显示,
      costListNew: [], // 新增cost
      trigger: 'change',
      // 验证信息 照着文档做
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: this.trigger },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: this.trigger }
        ],
        classId: [{ required: true, message: "请选择班级", trigger: this.trigger }],
        tel: [{ required: true, message: "请输入联系电话", trigger: this.trigger }]
      }
    };
  },
  created() {
    this.getCostList();
  },
  methods: {
    /**
     * 根据用户id获取明细
     */
    getStudentInfo(id) {
      if (id) {
        this.loading = true
        this.title = "编辑";
        this.form.id = id;
        studentApi
          .getStudentById({
            id
          })
          .then(res => {
            this.form = res.data;
            this.loading = false
          });
        //同时获取该用户交费信息
        this.getCostList(id);
      } else {
        this.title = "新增";
      }
    },
    handleClose() {
      this.$emit("update:show", false);
      //重置表单
      resetForm(this);
    },
    submit() {
      
      var api = "";
      //如果有id  则为修改 没有id为删除
      if (this.form.id) {
        api = studentApi.updateStudent;
      } else {
        api = studentApi.saveStudent;
      }
      /* 为了方便后台解析 这里采用特定的格式拼接(没有普遍性,当前后台需求)
      合并结果为: {
        xyUser:{
          name:xx,
          sex:xx
        },
        _size:{
          key0:'xx',
          key1:'xx'
        }
      
      } */
      this.$refs.form.validate(valid => {
        if (valid) {
          api({
            xyUser: this.form,
            ...handlePostObjArr("xyCostItems", this.costListNew) //xyCostItems 必须字段
          }).then(res => {
            if (res.code == "success") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.handleClose();
              //刷新父类
              this.$parent.getStudentList();
            } else {
              this.$message.error("保存失败!");
            }
          });
        }else{
          this.$message.error('请注意验证信息!')
        }
      })
    },
    cancelSubmit() {
      this.$confirm("尚未保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.handleClose();
      });
    },
    handleCityChange(value) {
      console.log(value);
      this.form.city = value.join(",");
    },
    /**
     * 根据id获取交费信息
     */
    getCostList(id) {
      costApi
        .getCostList({
          userId: id
        })
        .then(res => {
          this.costList = res.data;
        });
    },
    handleCostCancel() {
      this.costCard = false;
      //重置表单
      resetData(this, "costForm");
    },
    handleCostSave() {
      this.costCard = false;
      //clone一个对象 否则会被清空
      var costInfo = _.cloneDeep(this.costForm);
      //新增一个tempid 方便删除
      costInfo.tempId = new Date().getTime();
      this.costListNew.push(costInfo);
      this.costList.push(costInfo);
      // 情况clone的对象
      resetData(this, "costForm");
    },
    /**
     * 删除临时添加的交费记录
     */
    delCostInfo(row) {
      //注意lodash的remove方法不是响应式的

      this.costList = this.costList.filter(item => item.tempId != row.tempId);
      this.costListNew = this.costListNew.filter(
        item => item.tempId != row.tempId
      );
    }
  },
  computed: {
    titleCom() {
      return this.title;
    }
  }
};
</script>
<style lang="scss" scoped>
.student-detail-main {
  .cost-button-group {
    float: right;
    margin-right: 20px;
    .el-button {
      margin: 0 30px;
      color: orange;
    }
  }
  .form .form-card {
    border: none;
  }
}
</style>


