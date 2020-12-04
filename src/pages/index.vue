<template>
  <div class="index">
    <div class="container">
      <div class="ad-left">
        <ul class="fl-ad">
          <li class="menu-item">
            <a class="fan" href="javascript:;">手机 电话卡</a>
            <div>
              <ul class="menu-ull">
                <li v-for="(item, index) in phoneList[0]" :key="index">
                  <a :href="'/#/product/' + item.id">
                    <img :src="item.mainImage" alt="" />
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="menu-item">
            <a class="fan" href="javascript:;">电视 盒子</a>
          </li>
          <li class="menu-item">
            <a class="fan" href="javascript:;">笔记本 平板</a>
          </li>
          <li class="menu-item">
            <a class="fan" href="javascript:;">家电 插线板</a>
          </li>
          <li class="menu-item">
            <a class="fan" href="javascript:;">出行 穿戴</a>
          </li>
          <li class="menu-item">
            <a class="fan" href="javascript:;">智能 路由器</a>
          </li>
          <li class="menu-item">
            <a class="fan" href="javascript:;">电源 配件</a>
          </li>
          <li class="menu-item">
            <a class="fan" href="javascript:;">生活 箱包</a>
          </li>
        </ul>
      </div>
      <!-- //循环展示(轮播图) -->
      <swiper class="swiper-vox" :options="swiperOption">
        <!-- 再次注意 指令内要用带引号括起来 -->
        <swiper-slide v-for="(item, index) in slideList" :key="index">
          <a :href="'/#/product/' + item.id"> <img :src="item.img" /></a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 前进后退 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="add-ad container">
      <div class="ad-top">
        <a href="" v-for="(item, index) in adsList" :key="index">
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
      <div class="ad-bottom">
        <img v-lazy="'/imgs/banner-1.png'" alt="" />
      </div>
    </div>
    <div class="ad-product">
      <div class="container">
        <div class="title-ad">手机</div>
        <div class="product-ad-list">
          <div class="ad-product-left">
            <img v-lazy="'/imgs/mix-alpha.jpg'" alt="" />
          </div>
          <div class="ad-product-right">
            <div
              class="prodeuc-list"
              v-for="(item, index) in phoneList"
              :key="index"
            >
              <div
                class="prodeuc-list-first"
                v-for="(item, index) in phoneList[index]"
                :key="index"
              >
                <a href="">
                  <span>新品</span>
                  <img v-lazy="item.mainImage" alt="" />
                  <span>{{ item.name }}</span>
                  <span>{{ item.subtitle }}</span>
                  <div class="price">
                    <span>{{ item.price }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "index",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        speed: 500,
        //各种样式可以尝试一下
        effect: "coverflow",
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        //分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        //上一张下一张
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      slideList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg",
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg",
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg",
        },
        {
          id: "47",
          img: "/imgs/slider/slide-4.jpg",
        },
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg",
        },
      ],
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png",
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg",
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png",
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg",
        },
      ],
      phoneList: [],
    };
  },
  mounted() {
    this.pro();
  },
  methods: {
    pro() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 8,
          },
        })
        .then((res) => {
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
        });
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";

.ad-left {
  position: absolute;
  z-index: 9;
  width: 264px;
  height: 459px;
  padding: 26px 0;
  background-color: #55585a7a;
  box-sizing: border-box;
  li {
    .fan {
      position: relative;
      display: block;
      font-size: 16px;
      color: #ffffff;
      padding-left: 30px;
      line-height: 50px;
      &:hover {
        background-color: $colorA;
      }
      &::after {
        // 占位符很重要
        content: " ";
        position: absolute;
        right: 30px;
        top: 17.5px;
        display: inline-block;
        width: 10px;
        height: 15px;
        background: url(/imgs/icon-arrow.png) no-repeat center;
        background-size: contain;
      }
    }
  }
}
.swiper-button-prev {
  position: absolute;
  top: 50%;
  left: 274px;
}
.fl-ad {
  position: absolute;
  width: 100%;
  .menu-item {
    div {
      display: none;
      background-color: white;
      // display: flex;
      position: absolute;
      left: 264px;
      top: -26px;
      width: 962px;
      height: 459px;
      .menu-ull {
        li:hover {
          cursor: pointer;
        }
      }
      ul {
        display: flex;
        li {
          height: 75px;
          line-height: 75px;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          padding-left: 23px;
          a {
            color: #333333;
            font-size: 14px;
          }
          img {
            width: 42px;
            height: 35px;
            vertical-align: middle;
            margin-right: 15px;
          }
        }
      }
    }
  }
}
.menu-item:nth-of-type(1) {
  &:hover {
    div {
      display: block;
    }
  }
}
.swiper-vox {
  margin-top: 41px;
}
.add-ad {
  margin-top: 14px;
  margin-bottom: 31px;
  // @include flex();
  flex-direction: column;
  .ad-top {
    margin-bottom: 31px;
    @include flex();
    a {
      display: inline-block;
      width: 296px;
      height: 167px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ad-bottom {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.ad-product {
  background-color: #f5f5f5;
  overflow: hidden;
  .title-ad {
    font-size: 22px;
    height: 21px;
    line-height: 21px;
    color: #333333;
    margin-bottom: 20px;
    margin-top: 20px;
  }
}
.product-ad-list {
  @include flex();
  .ad-product-right {
    .prodeuc-list {
      @include flex();
    }
  }
}
.ad-product-left {
  width: 224px;
  height: 619px;
  img {
    width: 224px;
    height: 619px;
  }
}
.prodeuc-list-first {
  width: 236px;
  height: 302px;
  background-color: #ffffff;
  text-align: center;
  img {
    width: 100%;
    height: 195px;
  }
}
.price {
  color: #f20a0a;
  font-size: $fontJ;
  font-weight: bold;
  cursor: pointer;
  &:after {
    @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
    content: " ";
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>