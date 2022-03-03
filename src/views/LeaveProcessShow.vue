<template>
    <div style="width: 1000px; height: 650px">
        <a-descriptions title="基础信息" bordered size="small">
            <a-descriptions-item label="申请人">
                <a-input disabled v-model:value="leaveData.applyPeople" />
            </a-descriptions-item>
            <a-descriptions-item label="申请部门" :span="2">
                <a-input disabled v-model:value="leaveData.applyDepartment" />
            </a-descriptions-item>
            <a-descriptions-item label="申请时间">
                <a-input disabled v-model:value="leaveData.applyDate" />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="请假信息" bordered size="small">
            <a-descriptions-item label="请假开始时间">
                <a-input disabled v-model:value="leaveData.startDate" />
            </a-descriptions-item>
            <a-descriptions-item label="请假结束时间" :span="2">
                <a-input disabled v-model:value="leaveData.endDate" />
            </a-descriptions-item>
            <a-descriptions-item label="请假类型">
                <a-input disabled v-model:value="leaveData.leaveType" />
            </a-descriptions-item>
            <a-descriptions-item label="请假天数" :span="2">
                <a-input disabled v-model:value="leaveData.leaveDays" />
            </a-descriptions-item>
            <a-descriptions-item label="请假原因" :span="3">
                <a-textarea
                    disabled
                    :autosize="{ minRows: 3, maxRows: 3 }"
                    v-model:value="leaveData.leaveReason"
                    placeholder="请输入请假原因"
                    allow-clear
                />
            </a-descriptions-item>
            <a-descriptions-item label="附件" :span="3"> </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="备注" bordered size="small">
            <a-descriptions-item :span="3">
                <a-textarea
                    disabled
                    :autosize="{ minRows: 3, maxRows: 3 }"
                    v-model:value="leaveData.remarks"
                    placeholder="请输入备注"
                    allow-clear
                />
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leaveData: {
                id: 0,
                taskId: 0,
                applyPeople: "",
                applyDepartment: "",
                applyDate: "",
                startDate: "",
                endDate: "",
                leaveDay: 0,
                leaveType: "",
                leaveDays: "0天0小时",
                leaveReason: "",
                fileName: "",
                remarks: "",
                roleName: "",
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
                    process: "Leave",
                    taskId: window.sessionStorage["taskId"],
                },
            }).then((r) => {
                this.leaveData = r.data;
            });
        },
    },
};
</script>