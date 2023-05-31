<template>
    <div class="app-container">
        <h4>Detail Information</h4>
        <table class="table table-striped table-condenseda table-bordered" width="100%">
            <tbody>
                <tr>
                    <th width="15%">Hospital Name</th>
                    <td width="35%"><b style="font-size: 14px">{{ hospital.hosname }}</b> | {{ hospital.param.hostypeString }}</td>
                    <th width="15%">Hospital Logo</th>
                    <td width="35%">
                        <img :src="'data:image/jpeg;base64,'+hospital.logoData" width="80">
                    </td>
                </tr>
                <tr>
                    <th>Hospital Code</th>
                    <td>{{ hospital.hoscode }}</td>
                    <th>Address</th>
                    <td>{{ hospital.param.fullAddress }}</td>
                </tr>
                <tr>
                    <th>Public Transition</th>
                    <td colspan="3">{{ hospital.route }}</td>
                </tr>
                <tr>
                    <th>Hospital Profile</th>
                    <td colspan="3">{{ hospital.intro }}</td>
                </tr>
            </tbody>
            </table>
    
            <h4>Booking Rules</h4>
            <table class="table table-striped table-condenseda table-bordered" width="100%">
            <tbody>
                <tr>
                    <th width="15%">Booking Cycle</th>
                    <td width="35%">{{ bookingRule.cycle }}天</td>
                    <th width="15%">Release Time</th>
                    <td width="35%">{{ bookingRule.releaseTime }}</td>
                </tr>
                <tr>
                    <th>Close Time</th>
                    <td>{{ bookingRule.stopTime }}</td>
                    <th>Quit Time</th>
                    <td>{{ bookingRule.quitDay == -1 ? '就诊前一工作日' : '就诊当日' }}{{ bookingRule.quitTime }} 前取消</td>
                </tr>
                <tr>
                    <th>Booking Rules</th>
                    <td colspan="3">
                    <ol>
                    <li v-for="item in bookingRule.rule" :key="item">{{ item }}</li>
                    </ol>
                    </td>
                </tr>
            <br>
                <el-row>
                <el-button @click="back">Return</el-button>
                </el-row>
            </tbody>
        </table>
    </div>
</template>

<script>
import hospitalApi from '@/api/hospital'
export default ({
    data() {
        return{
            hospital: null,
            bookingRule: null
        }
    },
    created(){
        const id = this.$route.params.id
        this.fetchHospDetail(id)
    },
    methods:{
        fetchHospDetail(id){
            hospitalApi.getHospById(id).then(response => {
                this.hospital = response.data.hospital
                this.bookingRule = response.data.bookingRule
            })
        },
        back() {
            this.$router.push({ path: '/hospSet/hospital/list' })
        }

    }
})
</script>

    