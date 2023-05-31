<template>
    <div class="app-container">
        <div class="el-toolbar">
            <div class="el-toolbar-body" style="justify-content: flex-start;">
                <a href="http://localhost:8202/admin/cmn/dict/exportData" target="_blank">
                    <el-button type="text" @click="exportData"><i class="fa fa-plus"/> EXPORT</el-button>
                </a>
                <el-button style="margin:10px" type="text" @click="importData"><i class="fa fa-plus"/> IMPORT</el-button>
            </div>
        </div>


        <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getChildrens"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="Name" width="230" align="left">
            <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
            </template>
            </el-table-column>

            <el-table-column label="Code" width="220">
            <template slot-scope="{row}">
                    {{ row.dictCode }}
            </template>
            </el-table-column>
            <el-table-column label="Value" width="230" align="left">
            <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
            </template>
            </el-table-column>
            <el-table-column label="Create Time" align="center">
            <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
            </template>
            </el-table-column>
        </el-table>


        <!-- import xls dialog -->
        <el-dialog title="IMPORT" :visible.sync="dialogImportVisible" width="480px">
            <el-form label-position="right" label-width="170px">

            <el-form-item label="File">
            <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/cmn/dict/importData'"
            class="upload-demo">
            <el-button size="small" type="primary">Click to Upload</el-button>
            <div slot="tip" class="el-upload__tip">.xls ONLY，500kb max</div>
            </el-upload>
            </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogImportVisible = false">
                Cancel
            </el-button>
            </div>
        </el-dialog>

    </div>

</template>
<script>
import dict from '@/api/dict'

export default{
    data(){
        return{
            list: [],
            listLoading: true,
            dialogImportVisible: false

        }
    },
    created(){
        this.getDictList(1)
    },
    methods: {
        getDictList(id){
            dict.dictList(id).then(response =>{
                this.list = response.data
            })
        },
        getChildrens(tree, treeNode, resolve){
            dict.dictList(tree.id).then(response => {
                resolve(response.data)
            })
        },
        exportData() {
            window.location.href = 'http://localhost:8202/admin/cmn/dict/exportData'
        },
        importData() {
            this.dialogImportVisible = true
        },
        onUploadSuccess() {
            this.$message.info('SUCCESS!')
            this.dialogImportVisible = false
            this.getDictList(1)
        }





    }


}
</script>
