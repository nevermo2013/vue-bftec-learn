<template>
  <div class="news-main">
    <h1>这是news页面</h1>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload
          class="upload-demo"
          action="/admin/xy/upload/uploadImg"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <img :src="img" alt>
        <!-- <input type="form.cover"> -->
      </el-form-item>
      <div class="markdown-wrapper">
          <mavon-editor @change="handleMdChange" v-model="form.content1"/>
      </div>
      
    </el-form>

        <el-button type="primary" @click="sub">提交</el-button>
        
  </div>
</template>
<script>
import url from "@/api/url";
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import newsApi from '@/api/xy/newsApi'
export default {
  name: "xyNews",
  data() {
    return {
      fileList: [],
      img:'',//绝对路径 用于显示
      form:{
          title:'',
          desc:'',
          cover:'',  //图片封面
          content1:'',  // 
          content2: ''
      },
     
    };
  },
  components:{
      mavonEditor 
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(res, file, fileList) {
        // 绝对路径 为了显示 比如: http://59.110.138.169/media/20190508092540.jpg
      this.img = url.upload + res.url;  
      this.form.cover = res.url;   // 建议用相对路径  media/20190508092540.jpg
    },
    sub(){
        newsApi.save({
            xyNews:this.form
        }).then(res=>{
            console.log(res);
        })
    },
    handleMdChange(value,render){
        // 保存解析后的html代码吧
        this.form.content2 = render;
        // console.log('value',value);
        // console.log('render',render);
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-demo ::v-deep.el-upload--text {
  width: auto;
  height: auto;
  border: none;
}
</style>


