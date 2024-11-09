<template>
  <div id="app">
    <div class="form">
      编号：<input type="text" v-model="formData.id" /> 名称：<input
        type="text"
        v-model="formData.name"
      />

      <button v-on:click="addData">添加</button>
    </div>

    <table class="table">
      <th>编号</th>
      <th>名称</th>
      <th>创建时间</th>
      <th>操作</th>
      <tr v-if="list && list.length == 0">
        <td colspan="4">列表无数据</td>
      </tr>
      <tr v-if="!list">
        <td colspan="4">loading</td>
      </tr>
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ formatTime(item.ctime) }}</td>
        <td><a href="#" @click="deleteData(item.id)">删除</a></td>
      </tr>
    </table>

    <a-table :columns="columns" :data-source="list">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag.id"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.name.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a  @click="deleteData(record.id)" >Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      list: undefined,
      columns: [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      //用户添加的数据
      formData: {
        id: 0,
        name: "",
      },
    };
  },
  mounted() {
    //请求服务端
    this.$http.get("/pet/findByStatus?status=1").then((res) => {
      console.log(res.data);
      this.list = res.data;
    });
  },
  methods: {
    formatTime: function (_date) {
      return dayjs(_date).format("YYYY-MM-DD HH:mm:ss");
    },
    addData: function () {
      let _this = this;
      //将数据追加到list中
      var p = {
        id: new Date().getTime(),
        name: this.formData.name,
        ctime: new Date(),
      };

      this.$http.post("/pet", p).then((res) => {
        console.log(res);
        console.log(_this.list);
        if (res.data.code == 0) {
          this.$message.success("新增成功");
          _this.list.push(p);
          //清空页面上的文本框中的数据
          _this.formData.id = 0;
          _this.formData.name = "";
        } else {
          this.$message.error(res.msg || "新增失败");
        }
      });
    },
    deleteData: function (_id) {
      //删除数据
      let newList = this.list.filter((item) => {
        return item.id != _id;
      });
      this.list = newList;
    },
  },
};
</script>
 <style>
.table {
  width: 800px;
  margin: 20px auto;
  border-collapse: collapse; /*这一行，不能少：表格的两边框合并为一条*/
}

.table th {
  background: #0094ff;
  color: white;
  font-size: 16px;
  border: 1px solid black;
  padding: 5px;
}

.table tr td {
  text-align: center;
  font-size: 16px;
  padding: 5px;
  border: 1px solid black;
}

.form {
  width: 800px;
  margin: 20px auto;
}

.form button {
  margin-left: 10px;
}
</style>

