<template>
  <div>
    <div class="login-head container">
      <a href="">
        <img src="/imgs/login-logo.png" alt="" />
      </a>
    </div>
    <!-- <div class="content"> -->
    <div class="content">
      <div class="container">
        <div class="login-input">
          <div class="new-login">
            <span @click="flag = 1">账号登陆</span>|<span @click="flag = 2"
              >扫码登陆</span
            >
          </div>
          <div class="show-img">
            <img
              v-show="flag == 2"
              src="/imgs/loading-svg/loading-bars.svg"
              alt=""
            />
          </div>
          <div v-show="flag == 1">
            <input v-model="username" type="text" placeholder="请输入账号" />
            <input v-model="password" type="text" placeholder="请输入密码" />
          </div>
          <span v-show="flag == 1" class="btn" @click="login">登录</span>
          <div class="phone-login">
            <div>
              快捷注册
              <div />
            </div>
            <div>
              <span @click="regt">立即注册</span>|
              <span>忘记密码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <div class="footer-main">
      <div class="footer-link">
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        ><span>|</span>
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        ><span>|</span>
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        ><span>|</span>
        <a
          href="https://blog.csdn.net/s2422617864?spm=1001.2014.3001.5113"
          target="_blank"
          >小米商城</a
        >
      </div>
      <div class="footer-copy">
        Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights
        Reserved.
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      flag: 1,
      username: "",
      password: "",
    };
  },
  methods: {
    //解构user函数
    ...mapActions(["saveUserName"]),
    login() {
      //因为axios中的this是undefined所以要在外面给他搞成变量传出去
      let { username, password } = this;
      if (
        username.split(" ").join("").length === 0 ||
        password.split(" ").join("").length === 0
      ) {
        this.$message.error("请输入数据");
        return;
      }

      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          //设置为会话期有效
          this.$cookie.set("userId", res.id, { expires: "Session" });
          this.saveUserName(res.username);
          this.$message.error("登陆成功!");
          this.$router.push({
            name: "index",
            params: {
              from: "login",
            },
          });
        });
    },
    regt() {
      this.$router.push({
        name: "register",
        params: {
          from: "login",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/config.scss";
@import "./../assets/scss/button.scss";
@import "./../assets/scss/mixin.scss";

.login-head {
  height: 113px;
  img {
    height: 100%;
    width: auto;
  }
}
.content {
  height: 576px;
  background: url("/imgs/login-bg.jpg") no-repeat center;
  .login-input {
    padding: 31px;
    position: absolute;
    box-sizing: border-box;
    // 这里为什么不行呐
    // bottom: 29px;
    right: 0px;
    width: 410px;
    height: 510px;
    background-color: $colorG;
    top: 29px;
    @include flex(space-around, center);
    flex-direction: column;
    input {
      width: 348px;
      height: 50px;
      border: none;
      padding: 18px;
      margin-top: 30px;
      font-size: 14px;
      background-color: rgb(232, 240, 254);
    }
    .new-login {
      position: absolute;
      cursor: pointer;
      line-height: 23px;
      font-size: 24px;
      text-align: center;
      top: 30px;
      span {
        &:hover {
          color: $colorA;
        }
        margin: 20px;
      }
    }
    .btn {
      width: 100%;
      line-height: 50px;
      margin-top: 10px;
      font-size: 16px;
      margin-bottom: 35px;
    }
    .phone-login {
      position: absolute;
      bottom: 10px;
      width: 360px;
      font-size: $fontJ;
      //   width: 100%;
      @include flex();
      cursor: pointer;
      div:nth-of-type(1) {
        color: $colorA;
      }
    }
  }
}
.footer-main {
  @include flex(center, center);
  flex-direction: column;
  height: 100px;
  color: $colorD;
  font-size: $fontI;
  background-color: $colorG;
  img {
    width: 53px;
    height: 36px;
    margin-left: 5px;
    margin-top: 16px;
  }
  a {
    color: $colorD;
    margin: 10px;
  }
  .domain {
    color: $colorA;
  }
  .footer-link {
    margin-bottom: 16px;
  }
}
.show-img {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>