<template>
  <div class="hello">
    <h1 @click="handleClick">{{ msg }}</h1>
    <div v-if="isShowLogo" @click="refash">刷新</div>
    <ul>
      <li v-for="(item, idx) in list" :key="item" @click="liItemClick(idx)">
        <span :style="'color: ' + (idx == clickItemIdx ? 'red' : '')">{{
          item
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
let opts = {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      clickItemIdx: -1,
      isShowLogo: true,
      list: [],
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.$http.get("/api/list").then((res) => {
        this.list = res.data;
      });
    },
    refash() {
      console.log("refash");
      this.loadData();
    },
    handleClick() {
      console.log("clicked");
      this.isShowLogo = !this.isShowLogo;
    },
    liItemClick(_idx) {
      console.log("liItemClick", _idx);
      this.clickItemIdx = _idx;
    },
  },
};
export default opts;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
