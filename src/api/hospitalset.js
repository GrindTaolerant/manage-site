import request from '@/utils/request'

export default{
    getHospSetList(current, limit, searchObj){
        return request({
            url:   `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
            method: 'post',
            data: searchObj //use json
        })
    },

    deleteHospSet(id){
         return request({
            url: `/admin/hosp/hospitalSet/${id}`,
            method: 'delete'
         })
    },

    //batch delete
    batchDeleteHospSet(idList){
        return request({
            url: `/admin/hosp/hospitalSet/batchRemove`,
            method: 'delete',
            data: idList
        })
    },

    lockHospSet(id, status){
        return request({
            url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
            method: 'put'
        })
    },

    saveHospSet(hospitalSet) {
        return request ({
          url: `/admin/hosp/hospitalSet/saveHospitalSet`,
          method: 'post',
          data: hospitalSet
        })
    },

    getHospSet(id){
        return request ({
            url: `/admin/hosp/hospitalSet/getHospital/${id}`,
            method: 'get',
        })
    },

    updateHospSet(hospitalSet) {
        return request ({
          url: `/admin/hosp/hospitalSet/updateHospital`,
          method: 'post',
          data: hospitalSet
        })
      }
    

    
}