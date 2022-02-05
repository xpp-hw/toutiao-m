<template>
  <div class="article">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successlist"
      success-duration="1500"
    >
      <!-- List 组件通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时，
    会触发 load 事件并将 loading 自动设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后，
      将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。-->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
        <!-- <van-cell v-for="article in list" :key="article.art_id" :title="article.title" /> -->
        <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticlelist } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中的数据状态
      error: false, // 控制失败的提示状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      isLoading: false,
      successlist: "刷新成功"
    };
  },
  props: {
    cha: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad() {
      try {
        // 1、请求更新数据
        const { data } = await getarticlelist({
          channel_id: this.cha.id,
          timestamp: this.timestamp || Date.now()
        });
        // 创造一个随机失败，如果parse方法转换的内容不是标准的json格式字符串就会报错
        // if (Math.random() > 0.5) {
        //   JSON.parse("asdas");
        // }
        // 2、把请求的结果放到list数组中
        const { results } = data.data;
        // 数组的展开操作符，相对于把元素一个一个的拿出来
        this.list.push(...results);
        // 3、本次数据加载结束之后要把加载状态设置为结束，然后才能继续加载数据
        this.loading = false;
        console.log(results.length);
        // 4、判断数据是否全部加载完成
        if (results.length) {
          // 更新时间戳便于更新下页数据
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 数据全部加载完成
          this.finished = true;
        }
        console.log(data, "文章列表");
      } catch (e) {
        this.error = true;
        // 请求失败了loading也需要关闭
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        // 1、下拉刷新获取新数据，时间戳当时获取即可
        const { data } = await getarticlelist({
          channel_id: this.cha.id,
          timestamp: Date.now()
        });
        // if (Math.random() > 0.5) {
        //   JSON.parse("asdas");
        // }
        // 2、将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results);
        // 3、关闭下拉刷新的loading状态
        this.isLoading = false;
        this.successlist = `刷新成功，更新了${results.length}条数据`;
      } catch (e) {
        this.isLoading = false;
        this.successlist = `刷新失败`;
      }
    }
  }
};
</script>

<style scoped lang="less">
.article {
  height: 81vh;
  overflow-y: auto;
}
</style>