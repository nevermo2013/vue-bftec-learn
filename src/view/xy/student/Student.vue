<template>
  <div class="student-main">
      <!-- dormList和classList是当前页面几个组件公用的 所以在父类获取 减少网络请求 -->
    <search-bar @search="handleSearch" :classList="classList" :dormList="dormList"></search-bar>
    <el-card shadow="never" class="content">
      <el-button type="primary" @click="goEdit()">添加</el-button>
      <div class="section-table">
        <el-table v-loading="loading" :data="students" border stripe style="width: 100%">
          <el-table-column show-overflow-tooltip fixed type="index" width="50"></el-table-column>
          <el-table-column show-overflow-tooltip fixed prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column show-overflow-tooltip prop="sexv" label="性别" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip prop="classname" label="班级" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip prop="city" label="城市" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip prop="tel" label="电话" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip prop="dormname" label="宿舍" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip prop="school" label="毕业院校" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip label="wx/qq" width="120">
            <template slot-scope="scope">{{scope.row.wx||'-'}} / {{scope.row.qq||'-'}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="工作" width="120">
            <template slot-scope="scope">{{scope.row.status}}==>{{scope.row.job}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button @click="goEdit(scope.row.id)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="pagination">
          <el-col :span="10" :offset="14">
            <my-pagination :page="page" @page-change="handlePageChange"></my-pagination>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <student-detail ref="studentDetail" :show.sync="dialog" :classList="classList" :dormList="dormList"></student-detail>
  </div>
</template>
<script>
import SearchBar from "./coms/SearchBar";
import studentApi from "@/api/xy/studentApi";
import MyPagination from "@/components/common/Pagination";
import pageMixin from "@/mixin/pageMixin";
import StudentDetail from "./coms/Detail";
import dormApi from '@/api/xy/dormApi'
import classApi from '@/api/xy/classApi'
import {CodeToText} from "element-china-area-data"
export default {
  name: "Student",
  components: {
    SearchBar,
    MyPagination,
    StudentDetail
  },
  mixins: [pageMixin],
  data() {
    return {
      loading: false,
      dialog: false,
      studentList: [],
      classList:[],//班级信息,
      dormList:[], //宿舍信息
    };
  },
  created() {
      //初始化基本信息
      this.initBaseInfo()
    this.getStudentList();
  },
  methods: {
    //处理自组建search
    handleSearch(form) {
      this.getStudentList(form);
    },
    /**
     * searchForm={} es6 预定义参数
     */
    getStudentList(searchForm = {}) {
      this.loading = true
      studentApi
        .getStudentList({
          start: this.page.start,
          limit: this.page.limit,
          /**
           * 说明: 用于将有效搜索条件与分页搜索条件合并
           * lodash 方法 用于过滤符合条件的属性
           *  _.pickBy({a:12,b:false},v=>v==true)  ==> {a:12}
           * ... 展开运算符 es6 新属性
           *  var obj = {a:xx,b:xx,c:xx} ==>  { d: xx, ...obj} ==> {d:xx,a:xx,b:xx,c:xx}
           */
          ..._.pickBy(searchForm, v => v)
        })
        .then(res => {
          this.studentList = res.data.list;
          this.page.total = res.data.totalRow;
          this.page.pageCount = res.data.totalPage;
          this.loading = false
        });
    },
    goEdit(id){
        this.dialog = true;
        this.$refs.studentDetail.getStudentInfo(id)
    },
    handlePageChange() {},
    /**
     * 初始化基本信息
     */
    initBaseInfo(){
        dormApi.getDormList()
            .then(res=>{
                this.dormList = res.data.list
            })
        classApi.getClassList()
            .then(res=>{
                this.classList = res.data.list
            })
    }
  },
  computed:{
    students(){
      // 对数据进行修复
      // if(!this.studentsList) return [];
      var rs = this.studentList.map(item=>{
        var cityCode = item.city; // '1110010,11010,1001'
        var cityTextArr = []
        if(cityCode){
          var cityCodeArr = cityCode.split(',') // ['1110010',11010','1001']
          cityCodeArr.forEach(element => {
            // 借助codeToText 把code解析为文本地址
            cityTextArr.push(CodeToText[element])
          });
        }
        item.city = cityTextArr
        return item
      })
      return rs
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin: 20px auto;
}
.pagination {
  margin: 30px;
}
</style>


