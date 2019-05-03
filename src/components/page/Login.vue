<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item required  prop="yan" style="width:70%;display:inline-block;" >
                        <span class="svg-container svg-container_login">
                        </span>
                        <el-input v-model="ruleForm.yan" name="yan" type="text" auto-complete="on" placeholder="验证码" />
                      </el-form-item>
                      <img style="cursor:pointer;" :src="codeImgUse" alt="刷新获取" @click="refreshCodeImg" class="yan-img">
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import testApi from '@/api/testApi'
    import LoginUserApi from '@/api/loginUserApi'
    import url from '@/api/url'
    export default {
        data: function(){
            return {
                ruleForm: {
                    yan:'',
                    username: 'admin',
                    password: '123456'
                },
                codeImg:url.codeImg,
                ts:new Date().getTime(),
                rules: {
                    yan: [{ required: true, message: '验证码不能为空'}],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){

        },
        computed: {
            codeImgUse(){
              return this.codeImg+'?ts='+this.ts;
            }
          },
        methods: {
            refreshCodeImg(){
              this.ts = new Date().getTime();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                        // this.$router.push('/');
                        LoginUserApi.doLogin({
                            username:this.ruleForm.username,
                            password:this.ruleForm.password,
                            yan: this.ruleForm.yan

                        }).then(res=>{
                            if(res.code == 'S'){
                                // alert('s')
                                this.$store.dispatch('user/getUserInfo')
                                    .then(()=>{
                                        this.$router.push({name:'dashboard'});
                                    })
                                // console.log('end...')
                                
                            }else{
                                alert(res.msg)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(48,65,86,.8);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>