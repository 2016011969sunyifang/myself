<template>
  <div class="header">
    <div class="header-t">
      <div class="header-top container">
        <div class="header-tleft">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">IoT</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">天星数科</a>
          <a href="javascript:;">有品</a>
          <a href="javascript:;">小爱开放平台</a>
          <a href="javascript:;">企业团购</a>
          <a href="javascript:;">资格证照</a>
          <a href="javascript:;">协议规则</a>
          <a href="javascript:;">下载app</a>
          <a href="javascript:;">智能生活</a>
          <a href="javascript:;">Select Location</a>
        </div>
        <div class="header-tright">
          <div>
            <div v-if="username">
              <a href="javascript:;">{{ username }}</a>
              <a href="javascript:;" @click="logout">退出</a>
              <a href="/#/order/list">我的订单</a>
            </div>
            <div v-else><a href="javascript:;" @click="login">登录</a></div>
          </div>
          <div @click="myCart" style="width: 110px">
            <span class="icon-cart">购物车({{ cartCount }})</span>
          </div>
        </div>
      </div>
    </div>
    <div class="header-b">
      <div class="header-bottom container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-bright">
          <ul class="phone-ul">
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>小米手机</span>
                <div class="children">
                  <ul class="product-list">
                    <li v-for="(item, index) in phoneList" :key="index">
                      <a :href="'/#/product/' + item.id">
                        <div>
                          <img :src="item.mainImage" alt="" />
                        </div>
                        <p>{{ item.name }}</p>
                        <span>{{ item.price | round }}}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>RedMi红米</span>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>电视</span>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>笔记本</span>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>家电</span>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>路由器</span>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>智能硬件</span>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>服务</span>
              </div>
            </li>
            <li class="phone-ul-c">
              <div class="item-menu">
                <span>社区</span>
              </div>
            </li>
          </ul>
          <div class="bt-input">
            <input type="text" />
            <a></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "nav-header",
  data() {
    return {
      // cartCount: "22",
      phoneList: [],
    };
  },
  methods: {
    getList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            pageSize: 6,
          },
        })
        .then((res) => {
          this.phoneList = res.list;
        });
    },
    getCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        this.$store.dispatch("saveCartCount", res);
      });
    },
    logout() {
      // 推出的一系列操作
      this.axios.post("/user/logout").then(() => {
        this.$message.success("退出成功");
        // 设置登出时设置cookie时间为-1
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUserName", "");
        this.$store.dispatch("saveCartCount", "0");
      });
    },
    myCart() {
      this.$router.push("/cart");
    },
    login() {
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState(["username", "cartCount"]),
  },
  mounted() {
    this.getList();
    let params = this.$route.params;
    if (params && params.from == "login") {
      this.getCount();
    }
  },
  filters: {
    round(val) {
      if (!val) {
        return "0.00";
      } else {
        return val.toFixed(2);
      }
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/base.scss";
@import "./../assets/scss/config.scss";
@import "./../assets/scss/reset.scss";
.header-t {
  background-color: $colorB;
  font-size: $fontK;
  .header-top {
    color: $colorD;
    height: 39;
    line-height: 39px;
    @include flex();
    a {
      color: $colorD;
      margin-right: 17px;
    }
    .header-tright {
      @include flex();
      span {
        background-color: #ff6600;
        color: #ffffff;
        width: 100%;
        @include flex(center);
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
.header-b {
  .header-logo a {
    width: 110px;
    height: 55px;
    // display: inline-block;
    // background-color: #FF6600;
    overflow: hidden;
  }
  .header-bottom {
    margin-bottom: 20px;
    margin-top: 20px;
    @include flex();
    .header-bright {
      @include flex();
      .phone-ul {
        margin-right: 60px;
        // @include flex();

        .item-menu {
          span {
            &:hover {
              cursor: pointer;
              color: $colorA;
            }
          }
          &:hover {
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 80px;
            left: -263px;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: all 0.5s;
            background-color: #ffffff;
            .product-list {
              height: 100%;
              @include flex();
              li a {
                height: 100%;
                @include flex(space-around, center);
                flex-direction: column;
                color: black;
                font-size: $fontK;
                span {
                  color: $colorA;
                }
              }
            }
          }
        }
        .phone-ul-c {
          margin: 10px;
          font-size: $fontI;
          font-weight: 700;
          float: left;
          position: relative;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .bt-input {
        @include border(1px, #e0e0e0);
        input {
          border: none;
          @include wH(246px, 50px);
          border-right: 1px solid #e0e0e0;
        }
        a {
          @include wH(18px, 18px);
          @include bgImg(18px, 18px, "/imgs/icon-search.png");
          margin: 0px 17px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}

.icon-cart {
  // @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
  background-image: url("/imgs/icon-cart-checked.png");
  background-position: left center;
  background-position-y: 10px;
  background-repeat: no-repeat;
  background-size: 21px 15px;
  height: 100%;
  // width: 110px;
  width: 100%;
}
</style>