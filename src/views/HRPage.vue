<template>
    <div style="width: 1020px; height: 870px">
        <a-descriptions title="基础信息" bordered>
            <a-descriptions-item label="申请部门">
                <a-input
                    v-model:value="placeholder.hR_Department"
                    placeholder="请输入"
                    style="width: 105%; height: 105%"
                />
            </a-descriptions-item>
            <a-descriptions-item label="申请时间" :span="2">
                <a-date-picker v-model:value="placeholder.hR_Time" />
            </a-descriptions-item>
            <a-descriptions-item label="岗位名称">
                <a-input
                    v-model:value="placeholder.hR_Job"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="岗位说明" :span="2">
                <a-checkbox-group v-model:value="placeholder.hR_Description">
                    <a-checkbox value="已设" name="type">已设</a-checkbox>
                    <a-checkbox value="新增" name="type">新增</a-checkbox>
                    <a-checkbox value="临时" name="type">临时</a-checkbox>
                </a-checkbox-group>
            </a-descriptions-item>
            <a-descriptions-item label="现有人数">
                <a-input
                    v-model:value="placeholder.hR_Number"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="招聘人数" :span="2">
                <a-input
                    v-model:value="placeholder.hR_Recruits"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="招聘要求信息" bordered>
            <a-descriptions-item label="性别">
                <a-input
                    v-model:value="placeholder.hR_Sex"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="年龄" :span="2">
                <a-input
                    v-model:value="placeholder.hR_Age"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="文化程度">
                <a-input
                    v-model:value="placeholder.hR_Education"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="专业要求" :span="2">
                <a-input
                    v-model:value="placeholder.hR_Specialized"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="岗位要求">
                <a-input
                    v-model:value="placeholder.hR_Jobrequirements"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="其他" :span="2">
                <a-input
                    v-model:value="placeholder.hR_Other"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="详细信息" bordered>
            <a-descriptions-item label="薪资待遇">
                <a-input
                    v-model:value="placeholder.hR_Salarypackage"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="拟聘合同" :span="2">
                <a-input
                    v-model:value="placeholder.hR_Proposed"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="试用期">
                <a-input
                    v-model:value="placeholder.hR_Tryout"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
            <a-descriptions-item label="申请原因" :span="2">
                <a-input
                    v-model:value="placeholder.hR_Application"
                    placeholder="请输入"
                    style="width: 200px"
                />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="备注" bordered>
            <a-descriptions-item>
                <a-textarea
                    v-model:value="placeholder.hR_Annex"
                    placeholder=""
                    :rows="4"
                />
            </a-descriptions-item>
        </a-descriptions>

        <a-button type="primary" shape="round" @click="OnSubmit">
            提交
        </a-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            placeholder: {
                taskId: 0,
                hR_Department: "",
                hR_Job: "",
                hR_Number: 0,
                hR_Recruits: 0,
                hR_Time: "",
                hR_Sex: "",
                hR_Description: "",
                hR_Age: 0,
                hR_Education: "",
                hR_Specialized: "",
                hR_Jobrequirements: "",
                hR_Other: "",
                hR_Salarypackage: 0,
                hR_Proposed: "",
                hR_Tryout: "",
                hR_Application: "",
                hR_Annex: "",
            },
            hrdata: {
                action: "提交",
                bpmUser: "刘文耀",
                bpmUserPass: "",
                fullName: "刘文耀",
                processName: "人力资源需求申请",
                HRdata: "",
            },
        };
    },
    methods: {
        OnSubmit() {
            var d = this.placeholder.hR_Description;
            let a = d.join(",");
            this.placeholder.hR_Description = a;
            console.log(this.placeholder);
            this.hrdata.HRdata = JSON.stringify(this.placeholder);
            this.$ajax({
                url: "http://localhost:21231/api/StartHR",
                method: "post",
                data: this.hrdata,
            }).then((ad) => {
                if (ad.data > 0) {
                    alert("添加成功");
                } else {
                    alert("添加失败");
                }
            });
        },
    },
};
</script>