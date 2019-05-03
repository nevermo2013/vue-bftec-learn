<template>
  <div class="pagination-main">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.start"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
    name: 'pagination',
    props:{
        page:Object
    },
    data(){
        return {
            
        }
    },
    methods:{
        handleSizeChange(){
            this.$emit('page-change')
        },
        handleCurrentChange(){
            this.$emit('page-change')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


