<template>
  <div class="login-contianer">
    <van-nav-bar class="page-nav-bar" title="登录">
      <!-- 使用自己的图标，两种插槽写法 -->
      <!-- 第一个、 -->
      <!-- <i slot="left" class="iconfont icon-guanbi"></i> -->
      <!-- 第二个、 -->
      <!-- <template #left>
        <i class="iconfont icon-guanbi"></i>
      </template>-->

      <!-- 使用vant内置的图标，两种插槽写法 -->
      <!-- 第一个、 -->
      <!-- <van-icon slot="left" name="cross" /> -->
      <!-- 第二个、 -->
      <template #left>
        <van-icon name="cross" @click="$router.back() " />
      </template>
    </van-nav-bar>
    <van-form ref="loginform" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userformrules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userformrules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down v-if="ifconunt" :time="1000*10" format="ss s" @finish="ifconunt=false" />
          <!-- 点击表单中的普通按钮为什么会触发表单提交？
在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。
在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。
          <van-button native-type="button">发送验证码</van-button>-->
          <van-button
            v-else
            class="send"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onsendsms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="btn">
        <van-button class="btn-b" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendsms } from "@/api/user";
export default {
  name: "loginpage",
  data() {
    return {
      user: {
        mobile: "13912345678", // 手机号
        code: "246810" // 验证码
      },
      userformrules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号格式不对" }
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式不对" }
        ]
      },
      ifconunt: false
    };
  },
  methods: {
    async onSubmit() {
      // 1、获取表单数据
      const user = this.user;
      // 2、表单验证

      // 3、提交表单请求登录
      // 在组件中必须通过this.$toast来调用toast组件
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击。
        duration: 0 // 持续展示 toast,默认是2000毫秒
      });
      try {
        // try，catch捕获异常
        // const { data } = await login(this.user);可以从返回对象里解构一个data对象出来，里面包含token
        const res = await login(user);
        console.log("登录成功", res);
        this.$store.commit("stateUser", res.data.data);

        //任何一个toast执行都会替换掉前面的toast
        this.$toast.success("登录成功");

        //登录成功，跳回原来页面，该方式不严谨，后续性能优化
        this.$router.back();
      } catch (err) {
        if (err.response.status === 400) {
          console.log("手机号或者验证码不正确");
          this.$toast.fail("手机号或者验证码不正确");
        } else {
          console.log("失败", err);
          this.$toast.fail("登录失败");
        }
      }
      // 根据请求响应结果进行后续操作
    },
    async onsendsms() {
      // console.log("onsendsms");
      // 1、校验手机号
      try {
        await this.$refs.loginform.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err); // 这里用return，验证失败就直接返回，不往后执行了
      }
      // 2、验证通过进行倒计时
      this.ifconunt = true;
      // 3、请求发送验证
      try {
        await sendsms(this.user.mobile);
      } catch (e) {
        console.log("发送失败", e);
      }
    }
  }
};
</script>

<style scoped lang="less">
.login-contianer {
  .iconfont {
    font-size: 0.37rem;
  }
  .send {
    background: #ededed;
    width: 1.52rem;
    height: 0.46rem;
    line-height: 0.46rem;
    font-size: 0.12rem;
    color: #666;
  }
  .btn {
    padding: 0.53rem 0.33rem;
    .btn-b {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>