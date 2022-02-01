<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="heard user-info">
      <div class="base-info">
        <div class="left">
          <van-image :src="userinfo.photo" round fit="cover" class="avatar" />
          <span class="name">{{userinfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userinfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div v-else class="heard not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <!-- clickable是否开启格子点击反馈 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell v-if="user" class="logout-cell" title="退出登录" clickable @click="onlogin" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getuserinfo } from "@/api/user";
export default {
  name: "myindex",
  data() {
    return {
      headers: {
        Authorization: null
      },
      userinfo: {}
    };
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (this.user) {
      this.headers.Authorization = `Bearer ${this.user.token}`;
      this.loginuserinfo();
    }
  },
  methods: {
    onlogin() {
      this.$dialog
        .confirm({
          title: "确认退出"
        })
        .then(() => {
          this.$store.commit("stateUser", null);
        })
        .catch(() => {
          console.log("取消退出");
        });
    },
    async loginuserinfo() {
      try {
        // const { data } = await getuserinfo(this.headers);
        const { data } = await getuserinfo();
        this.userinfo = data.data;
        console.log(data);
      } catch (e) {
        this.$toast("获取数据失败,请稍后尝试");
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="less">
.my-container {
  .heard {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        // justify-content: center;
        .avatar {
          width: 100px;
          height: 100px;
          margin-right: 23px;
          border: 3px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // background: red;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }

      .icon-shoucang {
        color: #ec5d5e;
      }
      .icon-lishi {
        color: #ffaf46;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    color: #d86262;
    text-align: center;
    margin: 10px 0;
  }
}
</style>