<template>
  <div class="footer-main">
    <div class="mi-logo">
      <img src="/imgs/logo-footer.png" alt="" />
      <p>小米商城</p>
    </div>
    <div>
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
export default {
  name: "nav-footer",
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/base.scss";
@import "./../assets/scss/config.scss";
@import "./../assets/scss/reset.scss";
.footer-main {
  @include flex(space-around, center);
  flex-direction: column;
  height: 234px;
  color: $colorD;
  font-size: $fontI;
  background-color: $colorB;
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
</style>