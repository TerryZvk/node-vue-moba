<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称" >
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="称号" >
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label="头像" >
         <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型" >
        <el-select v-model="model.categories" multiple>
          <el-option 
          v-for="item in categories"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="难度" >
        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.difficult"></el-rate>
      </el-form-item>
       <el-form-item label="技能" >
        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.skills"></el-rate>
      </el-form-item>  
       <el-form-item label="攻击" >
        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.attack"></el-rate>
      </el-form-item>  
       <el-form-item label="生存" >
        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.survive"></el-rate>
      </el-form-item>    
       <el-form-item label="顺风出装" >
        <el-select v-model="model.items1" multiple>
          <el-option 
          v-for="item in items"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧" >
         <el-input type="textarea" v-model="model.usageTips"></el-input>
      </el-form-item>
       <el-form-item label="对抗技巧" >
         <el-input type="textarea" v-model="model.vattleTips"></el-input>
      </el-form-item> 
       <el-form-item label="团战思路" >
         <el-input type="textarea" v-model="model.teamTips"></el-input>
      </el-form-item>   
      <el-form-item >
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data(){
    return{
      model: {
        name:'',
        avatar: '',
        title: '',
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        usageTips:''
      },
      categories: [],
      items: []
    }
  },
  methods:{
    async save(){
      if(this.id){
        await this.$http.put(`/rest/heroes/${this.id}`, this.model)
          this.$router.push('/heroes/list')
          this.$message({
            type:'success',
            message: '修改成功！'
          })
      }else{
        await this.$http.post('/rest/heroes', this.model)
        this.$router.push('/heroes/list')
        this.$message({
          type:'success',
          message: '保存成功！'
        })
      }
     
    },
    async fetch(){
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = {...this.model, ...res.data}
    },
    afterUpload(res){
      this.model.avatar = res.url
    },
    async fetchCategories(){
      const res = await this.$http.get('/rest/categories')
      this.categories = res.data
    },
    async fetchItems(){
      const res = await this.$http.get('/rest/items')
      this.items = res.data
    },
  },
  created(){
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch()
  }

}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
