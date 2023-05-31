<template>
    <div class="app-container">
        <h1>Hospital Set List</h1>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input  v-model="searchObj.hosname" placeholder="Hospital Name"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchObj.hoscode" placeholder="Hospital Code"/>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">Search</el-button>
        </el-form>

        <div>
            <el-button type="danger" size="mini" @click="removeRows()">Batch Delete</el-button>
        </div>


        <el-table
        :data="list"
        stripe
        style="width: 100%" @selection-change="handleSelectionChange">


            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" width="50"/>
            <el-table-column prop="hosname" label="Hospital Name"/>
            <el-table-column prop="hoscode" label="Hospital Code"/>
            <el-table-column prop="apiUrl" label="URL" width="200"/>
            <el-table-column prop="contactsName" label="Contact Name"/>
            <el-table-column prop="contactsPhone" label="Contact Number"/>
            <el-table-column label="Status" width="80">
                <template slot-scope="scope">
                        {{ scope.row.status === 1 ? 'Available' : 'Unavailable' }}
                </template>
            </el-table-column>

            <el-table-column label="Action" width="400" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" 
                        icon="el-icon-delete" @click="removeDataById(scope.row.id)"> </el-button>
                    <el-button v-if="scope.row.status==1" type="primary" size="mini" 
                        icon="el-icon-delete" @click="lockHostSet(scope.row.id,0)">Lock</el-button>
                    <el-button v-if="scope.row.status==0" type="danger" size="mini" 
                         icon="el-icon-delete" @click="lockHostSet(scope.row.id,1)">Unlock</el-button>

                    
                    <router-link :to="'/hospitalSet/edit/'+scope.row.id" >
                    <el-button style="margin:10px;" type="warning" size="mini" icon="el-icon-edit">Edit</el-button>
                    </router-link>



                
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
        />


    </div>
</template>

<script>

import hospitalset from '@/api/hospitalset.js'

export default {
    data(){
        return{
            current:1,
            limit:3,
            searchObj:{},
            list:[],
            total:0,
            multipleSelection:[]
        }

    },
    created(){
        this.getList()
    },
    methods:{

        lockHostSet(id,status) {
            hospitalset.lockHospSet(id,status)
            .then(response => {
                 //刷新
                this.getList(this.current)
            })
        },

        //get selection id
        handleSelectionChange(selection){
            this.multipleSelection = selection
        },

        //batch remove
        removeRows(){
            this.$confirm('delete this hopsital information, continue?', 'note',{
                confirmButtonText: 'confirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => { //confirm 
                var idList = []
        
                for(var i=0;i<this.multipleSelection.length;i++) {
                    var obj = this.multipleSelection[i]
                    var id = obj.id
                    idList.push(id)
                }
                //get api
                hospitalset.batchDeleteHospSet(idList)
                    .then(response => {
                        //notice
                        this.$message({
                        type: 'success',
                        message: 'delete success!'
                        })
                        //refresh
                        this.getList(1)
                    })
            })


        },

        getList(page = 1){
            this.current = page
            hospitalset.getHospSetList(this.current, this.limit, this.searchObj)
            .then(response => {
                this.list = response.data.records
                this.total = response.data.total
            })
            .catch(error => {console.log(error)})
        },

        removeDataById(id){
            this.$confirm('delete this hopsital information, continue?', 'note', {
                confirmButtonText: 'confirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => { //确定执行then方法
                //call api
                hospitalset.deleteHospSet(id).then(response => {
                    this.$message({
                        type: 'success',
                        message: 'success'
                    })
                    this.getList(this.list == 1 ? this.current - 1: this.current)
                })

            })
        }

    }
}
</script>
