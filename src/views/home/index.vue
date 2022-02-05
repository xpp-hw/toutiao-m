<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button 
      class="search-btn" 
      slot="title" 
      type="info" 
      round 
      size="small" 
      icon="search"
      >搜索
      </van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :cha="channel" />
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>-->
      <div slot="nav-right" class="placher"></div>
      <div slot="nav-right" class="hamburger-bnt">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getuserchannel } from "@/api/user";
import ArticleList from "./components/article-list.vue";
export default {
  name: "homeindex",
  data() {
    return {
      active: 0,
      channels: []
    };
  },
  components: {
    ArticleList
  },
  created() {
    this.userchannel();
  },
  methods: {
    async userchannel() {
      try {
        const { data } = await getuserchannel();
        this.channels = data.data.channels;
        // console.log(this.channels);

        // console.log(data);
      } catch (e) {
        this.$toast("获取数据失败");
        console.log(e);
      }
    }
  }
};
</script>

<style socped lang="less">
.home-container {
  padding-bottom: 100px;
  padding-top: 154px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 5.55rem;
    height: 0.64rem;
    background: #5babfb;
    border: none;
    font-size: 0.28rem;
    .van-icon {
      font-size: 0.32rem;
    }
  }
  .channel-tabs {
    .van-tabs__wrap {
      height: 0.82rem;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 2rem;
      font-size: 0.3rem;
      color: #777777;
      border-right: 0.01rem solid #edeff3;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav--line {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 0.08rem;
      width: 0.31rem;
      height: 0.06rem;
      background-color: #3296fa;
    }
    .hamburger-bnt {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.66rem;
      height: 0.82rem;
      background-color: #ffffff;
      opacity: 0.902;
      i.iconfont {
        font-size: 0.33rem;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 0.01rem;
        height: 100%;
        background-image: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
    .placher {
      width: 0.66rem;
      height: 0.82rem;
      flex-shrink: 0;
    }
  }
}
</style>