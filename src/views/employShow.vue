<template>
    <div style="width: 1350px; height: 950px">
        <a-descriptions title="基础信息" bordered size="small">
            <a-descriptions-item label="使用部门" :span="2">
                <a-input v-model:value="EmployData.employ_Section" />
            </a-descriptions-item>
            <a-descriptions-item label="核定日期" :span="2">
                <a-input v-model:value="EmployData.employ_Hdate" />
            </a-descriptions-item>
            <a-descriptions-item label="岗位名称" :span="2">
                <a-input v-model:value="EmployData.employ_Post" />
            </a-descriptions-item>
            <a-descriptions-item label="岗位说明" :span="2">
                <a-input v-model:value="EmployData.employ_State" />
            </a-descriptions-item>
            <a-descriptions-item label="人员类别" :span="3">
                <a-input v-model:value="EmployData.employ_Style" />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="录入人员基本信息" bordered size="small">
            <a-descriptions-item label="姓名" :span="2">
                <a-input v-model:value="EmployData.employ_Name" />
            </a-descriptions-item>
            <a-descriptions-item label="性别" :span="2">
                <a-input v-model:value="EmployData.employ_Sex" />
            </a-descriptions-item>
            <a-descriptions-item label="出生年月" :span="2">
                <a-input v-model:value="EmployData.employ_Date" />
            </a-descriptions-item>
            <a-descriptions-item label="文化程度" :span="2">
                <a-input v-model:value="EmployData.employ_Culture" />
            </a-descriptions-item>
            <a-descriptions-item label="健康状况" :span="2">
                <a-input v-model:value="EmployData.employ_Health" />
            </a-descriptions-item>
            <a-descriptions-item label="电话" :span="2">
                <a-input v-model:value="EmployData.employ_Phone" />
            </a-descriptions-item>
            <a-descriptions-item label="住址" :span="4">
                <a-input v-model:value="EmployData.employ_Address" />
            </a-descriptions-item>
            <a-descriptions-item label="特长" :span="4">
                <a-input v-model:value="EmployData.employ_Speciality" />
            </a-descriptions-item>
            <a-descriptions-item label="本人有否亲属在本公司工作" :span="2">
                <a-input v-model:value="EmployData.employ_Isput" />
            </a-descriptions-item>
            <a-descriptions-item label="拟核工资及待遇" :span="2">
                <a-input v-model:value="EmployData.employ_Treatment" />
            </a-descriptions-item>
            <a-descriptions-item label="合同期限" :span="2">
                <a-input v-model:value="EmployData.employ_Time" />
            </a-descriptions-item>
            <a-descriptions-item label="试用期" :span="2">
                <a-input v-model:value="EmployData.employ_Period" />
            </a-descriptions-item>
        </a-descriptions>
        <!-- 标题 -->
        <a-descriptions title="员工亲属详细信息" bordered size="small">
        </a-descriptions>
        <!-- 表格 -->
        <a-table
            :dataSource="dataSource"
            :columns="columns"
            :scroll="scroll"
            :pagination="false"
        /><!-- 表格 dataSource指定数据源，columns指定列名，scroll指定宽高，pagination是否开启分页器-->
        <a-button :size="large" style="width: 1350px" @click="OpenModal"
            >新增</a-button
        ><!-- 按钮调用打开对话框 -->
        <a-descriptions title="备注" bordered size="small">
            <a-descriptions-item>
                <a-textarea v-model:value="Remark" showCount :maxlength="100" />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions bordered>
            <a-descriptions-item label="请选择职位" :span="2">
                <a-select
                    ref="select"
                    v-model:value="WorkPost"
                    style="width: 120px"
                    @focus="focus"
                    @change="handleChange"
                >
                    <a-select-option value="技术部总监"
                        >技术部总监</a-select-option
                    >
                    <a-select-option value="项目部经理"
                        >项目部经理</a-select-option
                    >
                    <a-select-option value="人事行政部主管"
                        >人事行政部主管</a-select-option
                    >
                </a-select>
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script>
export default {
    data() {
        return {
            EmployData: {
                employ_Section: "",
                employ_Hdate: "",
                employ_Post: "",
                employ_State: "",
                employ_Style: "",
                employ_Name: "",
                employ_Sex: true,
                employ_Date: "",
                employ_Culture: "",
                employ_Health: "",
                employ_Phone: "",
                employ_Address: "",
                employ_Speciality: "",
                employ_Isput: true,
                employ_Treatment: "",
                employ_Time: "",
                employ_Period: "",
                TaskId: "1",
            },
        };
    },
    mounted() {
        this.GetProcessInfo();
    },
    methods: {
        GetProcessInfo() {
            this.$ajax({
                url: "http://localhost:21231/GetProcessInfo",
                method: "get",
                params: {
                    process: "Employ",
                    taskId: window.sessionStorage["taskId"],
                },
            }).then((r) => {
                this.EmployData = r.data;
            });
        },
    },
};
</script>