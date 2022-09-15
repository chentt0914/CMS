<template>
  <div id="login">
    <div class="box">
      <div class="header">后台管理系统</div>

      <!-- 标签页 -->
      <Tabs type="card" class="tabs">
        <TabPane label="账号登录" class="tabPane">
          <Form
            :model="formItem"
            :label-width="80"
            class="form"
            :rules="formRule1"
            ref="formRef1"
          >
            <FormItem label="账号" prop="name">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="formItem.password" type="password"></Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="手机登录" class="tabPane">
          <Form
            :model="formItem"
            :label-width="80"
            :rules="formRule"
            class="form"
            ref="formRef"
          >
            <FormItem label="手机号" prop="mobile">
              <Input v-model="formItem.mobile"></Input>
            </FormItem>
            <FormItem label="验证码" prop="code">
              <div class="code">
                <Input v-model="formItem.code"></Input>
                <Button type="primary" class="code_btn">获取验证码</Button>
              </div>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>

      <!-- 多选框 -->
      <div class="checkBox">
        <Checkbox v-model="single" :class="{ active: single }"
          >记住密码
        </Checkbox>
        <a href="#">忘记密码</a>
      </div>

      <!-- 登录按钮 -->
      <Button type="primary" long size="large" @click="login">登录</Button>
    </div>
  </div>
</template>

<script>
import { login } from '@/network/login';
export default {
  data() {
    return {
      // 表单数据
      formItem: {
        name: 'coderwhy',
        password: '123456',
        mobile: '',
        code: '',
      },
      // 表单验证规则
      formRule1: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' },
        ],
        // mobile: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   { min: 20, max: 2, message: '长度在3到8个字符', trigger: 'blur' },
        // ],
        // code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      formRule: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 20, max: 2, message: '长度在3到8个字符', trigger: 'blur' },
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },

      // 多选框
      single: false,
    };
  },
  methods: {
    handleTabRemove(name) {
      this['tab' + name] = false;
    },

    login() {
      // console.log(111);
      // 验证表单
      this.$refs.formRef1.validate((valid) => {
        if (!valid) return;
        // console.log(111);
        // 发送网络请求
        login(this.formItem).then((res) => {
          console.log(res);
          if (res.status != 200) return;
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('id', res.data.data.id);
          this.$router.push('/home');
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  height: 100%;
  background: url(../assets/bg.svg) no-repeat;
  position: relative;

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 550px;
    font-size: 16px;
    .header {
      margin-bottom: 10px;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: black;
    }
    .tabs {
      box-shadow: 0 6px 6px #ccc;
      .form {
        padding: 10px 10px;
        .code {
          display: flex;
          justify-content: space-between;
          .code_btn {
            margin-left: 8px;
          }
        }
      }
    }

    .checkBox {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
    }
    .active {
      color: #2d8cf0;
    }
  }
}
</style>
