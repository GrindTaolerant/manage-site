<template>
    <div class="app-container">
        <h4>User Info</h4>
        <table class="table table-striped table-condenseda table-bordered" width="100%">
        <tbody>
            <tr>
                <th width="15%">Email</th>
                <td width="35%"><b>{{ userInfo.phone }}</b></td>
                <th width="15%">Name</th>
                <td width="35%">{{ userInfo.name }}</td>
            </tr>
        <tr>
            <th>Status</th>
            <td>{{ userInfo.status == 0 ? 'Locked' : 'Normal' }}</td>
            <th>Created Time</th>
            <td>{{ userInfo.createTime }}</td>
        </tr>
        </tbody>
        </table>
        <h4>Authentication</h4>
        <table class="table table-striped table-condenseda table-bordered" width="100%">
            <tbody>
            <tr>
                <th width="15%">Name</th>
                <td width="35%"><b>{{ userInfo.name }}</b></td>
                <th width="15%">ID</th>
                <td width="35%">{{ userInfo.certificatesType }}</td>
            </tr>
            <tr>
                <th>SSN</th>
                <td>{{ userInfo.certificatesNo }}</td>
                <th>Profile Picture</th>
                <td><img :src="userInfo.certificatesUrl" width="80px"></td>
            </tr>
            </tbody>
        </table>
    <h4>就诊人信息</h4>
    <el-table
        v-loading="listLoading"
        :data="patientList"
        stripe
            style="width: 100%">
        <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
                {{ scope.$index + 1 }}
        </template>
        </el-table-column>

        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="param.certificatesTypeString" label="ID"/>
        <el-table-column prop="certificatesNo" label="SSN"/>
        <el-table-column label="Sex">
        <template slot-scope="scope">
                {{ scope.row.sex == 1 ? 'Male' : 'Female' }}
        </template>
        </el-table-column>
        <el-table-column prop="birthdate" label="Date of Birth"/>
        <el-table-column prop="phone" label="Phone"/>
        <el-table-column label="Marriage">
        <template slot-scope="scope">
                {{ scope.row.isMarry == 1 ? '时' : '否' }}
        </template>
    </el-table-column>
    <el-table-column prop="fullAddress" label="Address"/>
    <el-table-column prop="createTime" label="Created Time"/>
    </el-table>
    <br>
    <el-row>
    <el-button  @click="back">Return</el-button>
    </el-row>
    </div>
</template>
<script>
import userInfoApi from '@/api/userInfo'
export default {
    // 定义数据
    data() {
        return {
            id: this.$route.params.id,
            userInfo: {}, // 会员信息
            patientList: [] // 就诊人列表
        }
    },
    // 当页面加载时获取数据
    created() {
        this.fetchDataById()
    },
    methods: {
        // 根据id查询会员记录
        fetchDataById() {
            userInfoApi.show(this.id).then(response => {
                this.userInfo = response.data.userInfo
                this.patientList = response.data.patientList
            })
        },
        back() {
            window.history.back(-1)
        }
    }
}
</script>
