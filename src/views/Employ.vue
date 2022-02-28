<template>
    <div style="width: 1350px; height: 950px">
        <a-descriptions title="基础信息" bordered size="small">
            <a-descriptions-item label="使用部门" :span="2">
                <a-select
                    ref="select"
                    v-model:value="EmployData.employ_Section"
                    style="width: 120px"
                    @focus="focus"
                    @change="handleChange"
                >
                    <a-select-option value="技术部">技术部</a-select-option>
                    <a-select-option value="项目部">项目部</a-select-option>
                    <a-select-option value="人事部">人事部</a-select-option>
                </a-select>
            </a-descriptions-item>
            <a-descriptions-item label="核定日期" :span="2">
                <a-space direction="vertical">
                    <a-date-picker v-model:value="EmployData.employ_Hdate" />
                </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="岗位名称" :span="2">
                <a-select
                    ref="select"
                    v-model:value="EmployData.employ_Post"
                    style="width: 120px"
                    @focus="focus"
                    @change="handleChange"
                >
                    <a-select-option value="总经理">总经理</a-select-option>
                    <a-select-option value="部门经理">部门经理</a-select-option>
                    <a-select-option value="项目经理">项目经理</a-select-option>
                </a-select>
            </a-descriptions-item>
            <a-descriptions-item label="岗位说明" :span="2">
                <a-checkbox-group v-model:value="EmployData.employ_State">
                    <a-checkbox value="已设" name="type">已设</a-checkbox>
                    <a-checkbox value="新增" name="type">新增</a-checkbox>
                    <a-checkbox value="临时" name="type">临时</a-checkbox>
                </a-checkbox-group>
            </a-descriptions-item>
            <a-descriptions-item label="人员类别" :span="3">
                <a-checkbox-group v-model:value="EmployData.employ_Style">
                    <a-checkbox value="员工级" name="type">员工级</a-checkbox>
                    <a-checkbox value="主管级" name="type">主管级</a-checkbox>
                    <a-checkbox value="经理级" name="type">经理级</a-checkbox>
                    <a-checkbox value="其他" name="type">其他</a-checkbox>
                </a-checkbox-group>
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="录入人员基本信息" bordered size="small">
            <a-descriptions-item label="姓名" :span="2">
                <a-input
                    v-model:value="EmployData.employ_Name"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="性别" :span="2">
                <a-radio-group v-model:value="EmployData.employ_Sex">
                    <a-radio :value="true">男</a-radio>
                    <a-radio :value="false">女</a-radio>
                </a-radio-group>
            </a-descriptions-item>
            <a-descriptions-item label="出生年月" :span="2">
                <a-space direction="vertical">
                    <a-date-picker v-model:value="EmployData.employ_Date" />
                </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="文化程度" :span="2">
                <a-input
                    v-model:value="EmployData.employ_Culture"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="健康状况" :span="2">
                <a-input
                    v-model:value="EmployData.employ_Health"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="电话" :span="2">
                <a-input
                    v-model:value="EmployData.employ_Phone"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="住址" :span="4">
                <a-input
                    v-model:value="EmployData.employ_Address"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="特长" :span="4">
                <a-input
                    v-model:value="EmployData.employ_Speciality"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="本人有否亲属在本公司工作" :span="2">
                <a-radio-group v-model:value="EmployData.employ_Isput">
                    <a-radio :value="true">是</a-radio>
                    <a-radio :value="false">否</a-radio>
                </a-radio-group>
            </a-descriptions-item>
            <a-descriptions-item label="拟核工资及待遇" :span="2">
                <a-input
                    v-model:value="EmployData.employ_Treatment"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="合同期限" :span="2">
                <a-input
                    v-model:value="EmployData.employ_Time"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="试用期" :span="2">
                <a-input
                    v-model:value="EmployData.employ_Period"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="员工亲属详细信息" bordered size="small">
            <a-descriptions-item label="亲属姓名" :span="2">
                <a-input
                    v-model:value="EmployeeDetail.employee_Name"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="与本人关系" :span="2">
                <a-input
                    v-model:value="EmployeeDetail.employee_Relation"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="亲属在公司任何部门工作、任何职务">
                <a-input
                    v-model:value="EmployeeDetail.employee_Post"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
        </a-descriptions>
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

        <a-button type="primary" shape="round" @click="OnSubmit">
            提交
        </a-button>
    </div>
</template>
<script>
// import moment from 'moment';
// import {ref } from 'vue';
export default {
    data() {
        //const dateFormat = 'YYYY/MM/DD';
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
            EmployeeDetail: {
                employee_Name: "",
                employee_Relation: "",
                employee_Post: "",
                TaskId: "1",
            },
            EmployAll: {
                //流程提交
                action: "提交",
                bpmUser: "冯俊杰",
                bpmUserPass: "",
                fullName: "冯俊杰",
                processName: "Employ",
                employData: "",
                employeeDetail: "",
            },
            Remark: "",
            WorkPost: "",
        };
    },
    methods: {
        OnSubmit() {
            var d = new Date(this.EmployData.employ_Hdate._d);
            var date =
                d.getFullYear() +
                "年" +
                (d.getMonth() + 1) +
                "月" +
                d.getDate() +
                "日";
            var ds = new Date(this.EmployData.employ_Date._d);
            var dates =
                ds.getFullYear() +
                "年" +
                (ds.getMonth() + 1) +
                "月" +
                ds.getDate() +
                "日";
            this.EmployData.employ_Hdate = date;
            this.EmployData.employ_Date = dates;
            var s = this.EmployData.employ_State;
            let sd = s.join(",");
            this.EmployData.employ_State = sd;
            var p = this.EmployData.employ_Style;
            let sa = p.join(",");
            this.EmployData.employ_Style = sa;
            this.EmployAll.employData = JSON.stringify(this.EmployData);
            this.EmployAll.employeeDetail = JSON.stringify(this.EmployeeDetail);
            console.log(this.EmployAll);
            this.$ajax({
                url: "http://localhost:21231/api/startemploy",
                method: "post",
                data: this.EmployAll,
            }).then((res) => {
                if (res.data > 0) {
                    this.$message("提交成功");
                } else {
                    this.$message("提交失败");
                }
            });
        },
    },
};
</script>