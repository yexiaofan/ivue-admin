<style lang="less" scoped>
@import "../../base.less";
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &-form {
    width: 24%;
    min-width: 348px;
    header {
      display: flex;
      justify-content: center;
      align-items: center;
      i,
      span {
        font-size: 1.25rem;
        font-weight: bold;
      }
      margin-bottom: 24px;
      padding-bottom: 8px;
      border-bottom: 1px solid @disabled-color;
    }
    section {
      padding: 0 8%;
      .others {
        a:first-of-type {
          float: left;
          font-size: 0.875rem;
        }
        a:last-of-type {
          float: right;
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>

<template>
  <div class="login">
    <img :src="bgImg" alt />
    <Card class="login-form">
      <header>
        <Icon type="ios-log-in" />
        <span>&nbsp;欢迎登录</span>
      </header>
      <section>
        <Form ref="loginForm" :model="loginForm" :rules="ruleLoginForm">
          <FormItem prop="account">
            <Input type="text" size="large" v-model="loginForm.account" placeholder="Username">
              <Icon type="md-person" slot="prepend" size="20"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" size="large" v-model="loginForm.password" placeholder="Password">
              <Icon type="md-lock" slot="prepend" size="20"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" long @click="handleSubmit('loginForm')">登录</Button>
          </FormItem>
          <FormItem class="others">
            <a href="javascript:void(0)">注册</a>
            <a href="javascript:void(0)">忘记密码？</a>
          </FormItem>
        </Form>
      </section>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImg: null,
      loginForm: {
        account: '',
        password: ''
      },
      ruleLoginForm: {
        account: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    init() {
      this.startBgAnimation()
    },
    startBgAnimation() {
      let count = 1
      this.bgImg = require('../../assets/login-bg1/' + (count - 1) + '.jpg')
      setInterval(() => {
        if (count > 9) {
          count = 0
        }
        this.bgImg = require('../../assets/login-bg1/' + count + '.jpg')
        count++
      }, 8000)
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$router.push('/home')
        }
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
