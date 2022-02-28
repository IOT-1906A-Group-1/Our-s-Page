<template>
    <a-modal
        :visible="hrModalVisible"
        width="1100px"
        title="人力资源需求申请"
        @cancel="hrHandleCancel"
        :footer="null"
    >
        <iframe
            src="http://localhost:8080/HRPage?sk=1"
            width="1050"
            height="870"
            frameborder="0"
        >
        </iframe>
    </a-modal>
    <a-modal
        :visible="annualPlanModalVisible"
        width="1550px"
        title="年度招聘计划申请"
        @cancel="annualPlanHandleCancel"
        :footer="null"
    >
        <iframe
            src="http://localhost:8080/AnnualPlan?sk=1"
            width="1500"
            height="540"
            frameborder="0"
        >
        </iframe>
    </a-modal>
    <a-modal
        :visible="quitModalVisible"
        width="1050px"
        title="离职申请"
        @cancel="quitHandleCancel"
        :footer="null"
    >
        <iframe
            src="http://localhost:8080/Quit?sk=1"
            width="1000"
            height="500"
            frameborder="0"
        >
        </iframe>
    </a-modal>
    <a-modal
        :visible="leaveModalVisible"
        width="1060px"
        title="请假申请"
        @cancel="leaveHandleCancel"
        :footer="null"
    >
        <iframe
            src="http://localhost:8080/Leave?sk=1"
            width="1030"
            height="670"
            frameborder="0"
        >
        </iframe>
    </a-modal>
    <a-modal
        :visible="employModalVisible"
        width="1390px"
        title="录用申请"
        @ok="handleOk"
        @cancel="employHandleCancel"
        :footer="null"
    >
        <iframe
            src="http://localhost:8080/Employ?sk=1"
            width="1350"
            height="960"
            frameborder="0"
        >
        </iframe>
    </a-modal>
    <div style="width: 1380px; height: 50px">
        <label style="font-size: 27px; font-weight: 500">发起申请</label>
    </div>
    <div style="width: 1378px; height: 600px">
        <a-auto-complete
            v-model="value"
            :options="options"
            style="width: 250px"
            placeholder="input here"
            :filter-option="filterOption"
            @focus="OpenMenu"
            @blur="CloseMenu"
            :open="isOpenMenu"
        />
        <br />
        <a-collapse v-model="activeKey" accordion>
            <a-collapse-panel key="1" header="人资申请">
                <EditOutlined /><a-button type="link" @click="ShowhrModal"
                    >人力资源需求申请</a-button
                ><br />暂无说明
            </a-collapse-panel>
            <a-collapse-panel key="2" header="招聘申请">
                <EditOutlined /><a-button
                    type="link"
                    @click="ShowannualPlanModal"
                    >年度招聘计划申请</a-button
                ><br />暂无说明</a-collapse-panel
            >
            <a-collapse-panel key="3" header="离职申请">
                <EditOutlined /><a-button type="link" @click="ShowquitModal"
                    >离职申请</a-button
                ><br />暂无说明</a-collapse-panel
            >
            <a-collapse-panel key="4" header="请假申请">
                <EditOutlined /><a-button type="link" @click="ShowleaveModal"
                    >请假申请</a-button
                ><br />暂无说明</a-collapse-panel
            >
            <a-collapse-panel key="5" header="录用申请">
                <EditOutlined /><a-button type="link" @click="ShowemployModal"
                    >录用申请</a-button
                ><br />暂无说明</a-collapse-panel
            >
        </a-collapse>
    </div>
</template>

<script>
import { EditOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
export default {
    components: { EditOutlined },
    data() {
        const filterOption = (input, option) => {
            return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
        };
        return {
            value: ref(""),
            isOpenMenu: false,
            hrModalVisible: false,
            annualPlanModalVisible: false,
            quitModalVisible: false,
            leaveModalVisible: false,
            employModalVisible: false,
            options: ref([
                {
                    value: "人力资源需求申请",
                },
                {
                    value: "年度招聘计划申请",
                },
                {
                    value: "离职申请",
                },
                {
                    value: "请假申请",
                },
                {
                    value: "录用申请",
                },
            ]),
            filterOption,
        };
    },
    methods: {
        OpenMenu() {
            this.isOpenMenu = true;
        },
        CloseMenu() {
            this.isOpenMenu = false;
        },
        //显示hr对话框
        ShowhrModal() {
            this.hrModalVisible = true;
        },
        //关闭hr对话框
        hrHandleCancel() {
            this.hrModalVisible = false;
        },
        //显示招聘计划对话框
        ShowannualPlanModal() {
            this.annualPlanModalVisible = true;
        },
        //关闭招聘计划对话框
        annualPlanHandleCancel() {
            this.annualPlanModalVisible = false;
        },
        //显示离职对话框
        ShowquitModal() {
            this.quitModalVisible = true;
        },
        //关闭离职对话框
        quitHandleCancel() {
            this.quitModalVisible = false;
        },
        //显示请假对话框
        ShowleaveModal() {
            this.leaveModalVisible = true;
        },
        //关闭请假对话框
        leaveHandleCancel() {
            this.leaveModalVisible = false;
        },
        //显示录用对话框
        ShowemployModal() {
            this.employModalVisible = true;
        },
        //关闭录用对话框
        employHandleCancel() {
            this.employModalVisible = false;
        },
    },
};
</script>