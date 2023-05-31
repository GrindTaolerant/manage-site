<template>
    <div class="app-container">
        <h1>Add Hospital</h1>
        <el-form label-width="150px">
            <el-form-item label="Hospital Name">
                <el-input v-model="hospitalSet.hosname"/>
            </el-form-item>
            <el-form-item label="Hopsital Code">
                <el-input v-model="hospitalSet.hoscode"/>
            </el-form-item>
            <el-form-item label="URL">
                <el-input v-model="hospitalSet.apiUrl"/>
            </el-form-item>
            <el-form-item label="Contact Name">
                <el-input v-model="hospitalSet.contactsName"/>
            </el-form-item>
            <el-form-item label="Contact Number">
                <el-input v-model="hospitalSet.contactsPhone"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveOrUpdate">Save</el-button>
            </el-form-item>
      </el-form>
   </div>

</template>

<script>
import hospitalset from '@/api/hospitalset.js'

export default{
    data() {
        return {
            hospitalSet:{}
        }
    },
    created(){
        if(this.$route.params && this.$route.params.id) {
         const id = this.$route.params.id
         this.getHostSet(id)
      }
    },

    methods:{
        getHostSet(id) {
         hospitalset.getHospSet(id) 
            .then(response => {
               this.hospitalSet = response.data
            })
        },


        save(){
            hospitalset.saveHospSet(this.hospitalSet)
            .then(response => {
               //提示
               this.$message({
                  type: 'success',
                  message: 'Add Success!'
               })
               //jump back to list page
               this.$router.push({path:'/hospitalSet/list'})
            })
        },

        update(){
            hospitalset.updateHospSet(this.hospitalSet)
            .then(response => {
               //提示
               this.$message({
                  type: 'success',
                  message: 'Edit Success!'
               })
               //jump back to list page
               this.$router.push({path:'/hospitalSet/list'})
            })
        },

        saveOrUpdate(){
            if(!this.hospitalSet.id){
                this.save();
            }else{
                this.update();
            }
        }
    }
}
</script>
