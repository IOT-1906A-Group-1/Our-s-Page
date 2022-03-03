<template>
    <div style="width: 1380px; height: 50px">
        <label style="font-size: 27px; font-weight: 500">待处理申请</label>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
        <template #serialNum="{ record }">
            <a-button
                style="width: 40px"
                @click="
                    OpenForm(record.taskID, record.stepID, record.processName)
                "
                type="link"
                >{{ record.serialNum }}</a-button
            >
        </template>
        <template #action="{ record }">
            <a-button
                style="width: 70px"
                @click="
                    Return(record.taskID, record.stepID, record.processName)
                "
                type="link"
                >退回重填</a-button
            >
            <a-button
                style="width: 30px"
                @click="
                    Refuse(record.taskID, record.stepID, record.processName)
                "
                type="link"
                >拒绝</a-button
            >
        </template>
    </a-table>
    <a-modal
        :visible="modalVisible"
        width="1060px"
        title="请假申请"
        @cancel="modalHandleCancel"
        :footer="null"
    >
        <iframe :src="local" width="1030" height="670" frameborder="0">
        </iframe>
        <br />
        <a-button
            type="primary"
            style="margin-right: 10px"
            ghost
            @click="Adopt()"
        >
            通过
        </a-button>
        <a-button
            style="
                border: 1px solid #e6a23c;
                color: #e6a23c;
                margin-right: 10px;
            "
            @click="OnSubmit"
        >
            退回重填 </a-button
        ><a-button danger ghost @click="OnSubmit" style="margin-right: 10px">
            拒绝
        </a-button>
    </a-modal>
</template>

<script>
export default {
    data() {
        return {
            modalVisible: false,
            local: "",
            dataSource: [],
            obj: {
                action: "同意",
                bpmUser: "",
                bpmUserPass: "123",
                fullName: "",
                processName: "",
                taskID: 0,
                stepId: 0,
                comments: "",
            },
            columns: [
                {
                    title: "流水号",
                    key: "serialNum",
                    slots: {
                        customRender: "serialNum",
                    },
                    align: "center",
                },
                {
                    title: "流程名",
                    dataIndex: "processName",
                    key: "processName",
                    align: "center",
                },
                {
                    title: "拥有人",
                    dataIndex: "ownerAccount",
                    key: "ownerAccount",
                    align: "center",
                },
                {
                    title: "发起时间",
                    dataIndex: "createAt",
                    key: "createAt",
                    align: "center",
                },
                {
                    title: "当前步骤",
                    dataIndex: "nodeName",
                    key: "nodeName",
                    align: "center",
                },
                {
                    title: "操作",
                    key: "action",
                    slots: {
                        customRender: "action",
                    },
                    align: "center",
                },
            ],
        };
    },
    mounted() {
        this.GetCurrentProcess();
    },
    methods: {
        GetCurrentProcess() {
            this.$ajax({
                url: "http://localhost:21231/GetCurrentProcess",
                method: "get",
                params: { account: window.sessionStorage["userName"] },
            }).then((r) => {
                this.dataSource = r.data;
                this.dataSource.forEach((e) => {
                    let date = e.createAt;
                    e.createAt = date.substr(0, 10) + " " + date.substr(11, 8);
                });
            });
        },
        Adopt() {
            this.obj.processName = window.sessionStorage["processName"];
            this.obj.bpmUser = window.sessionStorage["userName"];
            this.obj.fullName = window.sessionStorage["userName"];
            this.obj.taskID = window.sessionStorage["taskId"];
            this.obj.stepId = window.sessionStorage["stepId"];
            this.$ajax({
                url: "http://localhost:21231/api/approveLeave",
                method: "post",
                data: this.obj,
            }).then((r) => {
                if (r.data > 0) {
                    this.$message.success("通过成功！");
                }
            });
        },
        Return() {},
        Refuse() {},
        OpenForm(taskId, stepID, processName) {
            this.local = "http://localhost:8080/" + processName + "Show";
            console.log(this.local);
            window.sessionStorage["taskId"] = taskId;
            window.sessionStorage["stepId"] = stepID;
            window.sessionStorage["processName"] = processName;
            this.modalVisible = true;
        },
        modalHandleCancel() {
            this.modalVisible = false;
        },
    },
};
</script>