<template>
  <div class="content">
    <div class="form-login" v-if="!isRegister">
      <span>登录</span>
      <Form ref="formInline" :model="loginForm">
        <FormItem prop="email">
          <Input type="text" v-model="loginForm.email" placeholder="email">
            <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="password">
            <!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleLoginSubmit">Signin</Button>
          <Button type="primary" @click="toRegister">register</Button>
        </FormItem>
      </Form>
    </div>
    <div class="form-register" v-if="isRegister">
      <span>注册</span>
      <span>{{1544179366 | timeFilter}}</span>
      <Form ref="formInline" :model="registerForm">
        <FormItem prop="email">
          <Input type="text" v-model="registerForm.name" placeholder="Username">
            <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="text" v-model="registerForm.email" placeholder="email">
            <!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
          </Input>
        </FormItem>
        <FormItem prop="email">
          <Input type="password" v-model="registerForm.password" placeholder="password">
            <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="text" v-model="registerForm.indentity" placeholder="indentity">
            <!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleRegister">register</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user.js";

import Cookies from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {},
      isRegister: false
    };
  },
  mounted() {},
  methods: {
    handleLoginSubmit(data) {
      login(this.loginForm).then(res => {
        let mes = res.mes;
        if (res.status == 200) {
          this.$Message.success(mes);
          this.$store.commit("user/setToken", res.token);
          Cookies.set("user_token", res.token, { expires: 10000 });
          let that = this;
          setTimeout(() => {
            that.$router.push({ path: "/main" });
          }, 200);
        } else {
          this.$Message.error(mes);
        }
      });
    },
    toRegister() {
      this.isRegister = !this.isRegister;
    },
    handleRegister() {
      register(this.registerForm).then(res => {
        this.toRegister();
      });
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form-login {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 30%;
  left: 34%;
  /* background-color: #fff; */
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form-register {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  /* background-color: #fff; */
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
</style>