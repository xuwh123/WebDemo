<template>
  <div>
    <div id="app">
      <div class="from">
        编号：<input type="text" v-model="formData.id" />
          名称：  <input type="text" v-model="formData.name" />
            <buttton v-on;click="addData">新增</buttton>
  </div>
  <table class="table">
    <th>编号</th>
    <th>名称</th>
    <th>创建时间</th>
    <th>操作</th>
    <tr v-if="list&& list.length==0">    // 判断是否为空
        <td colspan="4">暂无数据</td>
    </tr>
    <tr v-if="!list">
        <td colspan="4">loading</td>
    </tr>
    <tr v-for="item in list" :key="item.id">    // 循环
        <td>{{item.id}}</td>
        <td>{{item.id}}</td>
        <td>{{formatTime(item.ctime)}}</td>
        <td><a href="#" @click="deleteData(item.id)">删除</a></td>
    </tr>
  </table>
  <a-table :columns="columns" :data-source="list">         // 表格
    <a slot="name" slot-scope="text">{{text}}</a>
    <span slot="custTitle"><a-icon type="smile-o" />Name</span>
    <span slot="tags" slot-scope="tags">
        <a-tag
        v-for="tag in tags"
        :key="tag .id"
        :color="
        tag==='loser '?'volcano':tag.length > 5 ?'geekblue': 'green'
        "
     >
      {{tag.name.toUpperCase()}}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text, record"> // 自定义操作
        <a>Invite-{{record.name}}</a>
        <a-divider type="vertical"/>
        <a  @click="deleteData(record.id)" >Delete</a>
        <a-divider type="vertical"/>
        <a class="ant-dropdown-link">More actions <a-icon type="down"/></a>
      </span>
      <a-table>
        </div>
</template>


<script>
export default {
    data() {
        return{
            list:undefined,
            columns:[
                {
                    title:'ID',
                    dataIndex:'id',
                },
                {
                    title:'名称',
                    dataIndex:'name',
                },
                {
                    title:"tags"
                    key:'tags',
                    dataIndex:'tags',
                    scopedSlots:{customRender:'tags'},
                },
                {
                    title:'Action',
                    key:'action',
                    scopedSlots:{customRender:'action'},
                },
            ],//用户添加的数据
            formData:{
                id:0,
                name:"",
            },
         };
        },
        mounted(){
            this.$http.get("/pet/findByStatus?status=1").then((res)=>{ //请求服务端
                this.list=res.data;
            });
        },
        methods:{
            formTime:function(_date){
                return.dayjs(_date).format("YYYY-MM-DD HH:mm:ss"); //时间格式
            },
            addData:function(){
                let_this=this;
                //将数据追加到list中
               var p ={
                id :new Date().getTime(),
               name:this.formData.name,
               ctime:new Date(),
            };
            this.$http.post("/pet",p).then((res)=>{   //将数据提交到服务端
                  console.log(res);
                console.log(_this.list);
                if(res.data.code==0){
                    this.$message.success("新增成功");
                    _this.list.push(p);
                    //清空页面上的文本框中的数据
                    _this.formData.id=0;
                    _this.formData.name="";
                }else{
                    this.$message.error(res.msg||"新增失败");
                }
            });
        },
    deleteData:function(_id){
        //删除数据
        let newList=this.list.filter((item) => {
            return item.id !=_id;
        });
        this.list=newList;
    },
},
};
</script>
<style>
 .table{
    width: 800px;
    margin: 20px auto;
border-collapse: collapse;       /*合并边框*/
}
.table th{
    background: #0094ff;
    color:white;
    font-size: 16px;
    border: 1px solid black;
    padding: 5px;
}
.table tr td{
    text-align: center;
    font-size:16px;
    padding:5px;
    border: 1px solid black;
}
.from{
    width:800px;
    margin: 20px auto;
}
.from button{
    margin-left: 20px;
}

</style>