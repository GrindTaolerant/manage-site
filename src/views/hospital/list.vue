<template>
    <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-select
                v-model="searchObj.provinceCode"
                placeholder="Please select state"
                    @change="provinceChanged">
                <el-option
                    v-for="item in provinceList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"/>
            </el-select>
        </el-form-item>
    
        <el-form-item>
            <el-select
            v-model="searchObj.cityCode"
            placeholder="Please select city"
            @change="cityChanged">
                <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
        </el-form-item>
    
        <el-form-item>
            <el-input v-model="searchObj.hosname" placeholder="Hospital Name"/>
        </el-form-item>
    
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">Search</el-button>
        <el-button type="default" @click="resetData()">Clear</el-button>
        </el-form>
    
    <!-- banner列表 -->
    <el-table v-loading="listLoading" :data="list"
            border
          fit
          highlight-current-row>
    
        <el-table-column
        label="No"
        width="60"
        align="center">
            <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>
    
        <el-table-column label="Hospital Logo">
            <template slot-scope="scope">
            <img :src="'data:image/jpeg;base64,'+scope.row.logoData" width="80">
            </template>
        </el-table-column>
    
        <el-table-column prop="hosname" label="Hospital Name"/>
        <el-table-column prop="param.hostypeString" label="Level" width="90"/>
        <el-table-column prop="param.fullAddress" label="Address"/>
        <el-table-column label="Status" width="80">
            <template slot-scope="scope">
                    {{ scope.row.status === 0 ? 'Offline' : 'Online' }}
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="Created Time"/>
    
        <el-table-column label="Action" width="230" align="center">
            <template slot-scope="scope">
                <router-link :to="'/hospitalSet/hospital/show/'+scope.row.id">
                    <el-button type="primary" size="mini">Display</el-button>
                </router-link>

                <router-link :to="'/hospitalSet/hospital/schedule/'+scope.row.hoscode">
                    <el-button style="margin:10px;" type="primary" size="mini">Schedule</el-button>
                </router-link> 



                <el-button style="margin:10px;" v-if="scope.row.status == 1"  type="danger" size="mini" @click="updateStatus(scope.row.id, 0)">Offline</el-button>
                <el-button style="margin:10px;" v-if="scope.row.status == 0"  type="primary" size="mini" @click="updateStatus(scope.row.id, 1)">Online</el-button>
            </template>

        </el-table-column>
    </el-table>
    
        <!-- 分页组件 -->
        <el-pagination
            :current-page="page"
            :total="total"
            :page-size="limit"
            :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
            style="padding: 30px 0; text-align: center;"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            @current-change="fetchData"
            @size-change="changeSize"
        />
    </div>
</template>

<script>
import hospitalApi from '@/api/hospital'
import { stat } from 'fs'

export default{
    data() {
        return {
            listLoading: true, // 数据是否正在加载
            list: null, // banner列表
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询表单对象
            provinceList: [],
            cityList: [],
            districtList: []
        }
    },
    created(){
        this.fetchData(this.page)
        this.findAllProvince()
    },
    methods:{
        updateStatus(id, status){
            hospitalApi.updateStatus(id, status).then(response => {
                this.fetchData(this.page)
            })
        },

        fetchData(page=1){
            this.page = page
            hospitalApi.getHospitalList(this.page, this.limit, this.searchObj)
            .then(response =>{
                this.list = response.data.content
                this.total = response.data.totalElements

                this.listLoading = false
            })
        },
        findAllProvince(){
            hospitalApi.findByDictCode('Province').then(reponse => {
                this.provinceList = reponse.data
            })
        },
        //show cities in state
        provinceChanged() {
            this.cityList = []
            this.searchObj.cityCode = null

            hospitalApi.findChildData(this.searchObj.provinceCode).then(response => {
                this.cityList = response.data
            })
        },       
        changeSize(size) {
            console.log(size)
            this.limit = size
            this.fetchData(1)
        },
    }
}
</script>

    