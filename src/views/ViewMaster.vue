<template>
    <body class="body">
        <div class="Level_1_Div">
            <div class="Level_1-1_Div">
                <div class="Level_1-1-1_Div_Left">
                    <div class="Level_1-1-1-1_Div_Top1">
                        <label class="Level_1-1-1-1_Div_Top_Label">{{
                            firstName
                        }}</label>
                    </div>
                    <label class="Level_1-1-1_Div_Left_Label_1">{{
                        firstName + lastName
                    }}</label>
                    <div class="Level_1-1-1-1_Div_Top2">
                        <a-menu
                            style="
                                width: 256px;
                                position: relative;
                                right: 25px;
                                bottom: 8px;
                            "
                            mode="inline"
                            v-model:selectedKeys="selKey"
                        >
                            <a-menu-item key="22" @click="JumpToWorkbench">
                                <HomeOutlined />&emsp;工作台
                            </a-menu-item>
                        </a-menu>
                    </div>
                    <a-input-search
                        v-model="value"
                        placeholder="搜索"
                        style="width: 257px; position: relative; right: 1px"
                        size="default"
                        @search="onSearch"
                    />
                </div>
                <a-menu
                    style="width: 256px"
                    mode="inline"
                    :openKeys="openKeys"
                    v-model:selectedKeys="selKey"
                    @openChange="onOpenChange"
                >
                    <a-sub-menu key="sub1">
                        <template #icon>
                            <MailOutlined />
                        </template>
                        <template #title>人事行政管理</template>
                        <a-menu-item @click="JumpToCreateApply" key="1"
                            >发起申请</a-menu-item
                        >
                        <a-menu-item @click="JumpToHRPage" key="2"
                            >待处理申请</a-menu-item
                        >
                        <a-menu-item @click="JumpToEmploy" key="3"
                            >已处理申请</a-menu-item
                        >
                        <a-menu-item @click="JumpToLeave" key="4"
                            >我的申请</a-menu-item
                        >
                        <a-menu-item @click="JumpToQuit" key="5"
                            >已完成申请</a-menu-item
                        >
                        <a-menu-item key="6">离职交接</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <template #icon>
                            <SettingOutlined />
                        </template>
                        <template #title>公司资产管理</template>
                        <a-menu-item key="7">用车申请</a-menu-item>
                        <a-menu-item key="8">用章申请</a-menu-item>
                        <a-menu-item key="9">刻章申请</a-menu-item>
                        <a-menu-item key="10">日常用品采购</a-menu-item>
                        <a-menu-item key="11">固定资产购置</a-menu-item>
                        <a-menu-item key="12">固定资产验收</a-menu-item>
                        <a-menu-item key="13">固定资产资料借用</a-menu-item>
                        <a-menu-item key="14">固定资产交接</a-menu-item>
                        <a-menu-item key="15">接待申请</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <template #icon>
                            <SettingOutlined />
                        </template>
                        <template #title>其他管理</template>
                        <a-menu-item key="16">会议室管理</a-menu-item>
                        <a-menu-item key="17">公司文件管理</a-menu-item>
                        <a-menu-item key="18">公告管理</a-menu-item>
                        <a-menu-item key="19">车辆管理</a-menu-item>
                        <a-menu-item key="20">日常用品管理</a-menu-item>
                        <a-menu-item key="21">固定资产验收</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
            <div class="Level_1-2_Div">
                <router-view />
            </div>
            <div class="Level_1-3_Div">
                <a
                    style="
                        font-size: 25px;
                        font-weight: 600;
                        color: #303133;
                        margin-left: 30px;
                    "
                    href="https://github.com/IOT-1906A-Group-1"
                    target="_Blank"
                    >我的组织</a
                ><br />
                <div class="Cryle" style="background-color: #409eff">
                    <label class="LabelCryleText"> Y </label>
                </div>
                <label class="LabelCryleFullText">杨泽霖 </label>
                <label class="PeopleAt">@yangzelin638&emsp;&emsp;&emsp;</label>
                <br />
                <div class="Cryle" style="background-color: #f56c6c">
                    <label class="LabelCryleText"> F </label>
                </div>
                <label class="LabelCryleFullText">冯俊杰 </label>
                <label class="PeopleAt"
                    >@0916feng&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label
                ><br />
                <div class="Cryle" style="background-color: #67c23a">
                    <label class="LabelCryleText"> L </label>
                </div>
                <label class="LabelCryleFullText">刘文耀</label>
                <label class="PeopleAt"
                    >@lwy710&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label
                ><br />
                <div class="Cryle" style="background-color: #f0b114">
                    <label class="LabelCryleText"> L </label>
                </div>
                <label class="LabelCryleFullText">李超 </label>
                <label class="PeopleAt"
                    >@lichao3576&emsp;&emsp;&emsp;&emsp;&emsp;</label
                ><br />
                <div class="Cryle" style="background-color: #000">
                    <label class="LabelCryleText"> C </label>
                </div>
                <label class="LabelCryleFullText">常皓 </label>
                <label class="PeopleAt"
                    >@ch8520&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label
                ><br />
            </div>
        </div>
    </body>
</template>

<script>
import { reactive, toRefs } from "vue";
import {
    HomeOutlined,
    SettingOutlined,
    MailOutlined,
} from "@ant-design/icons-vue";
export default {
    components: { HomeOutlined, SettingOutlined, MailOutlined },
    data() {
        const state = reactive({
            rootSubmenuKeys: ["sub1", "sub2", "sub3"],
            openKeys: ["sub1"],
            selectedKeys: [],
        });

        const onOpenChange = (openKeys) => {
            const latestOpenKey = openKeys.find(
                (key) => state.openKeys.indexOf(key) === -1
            );

            if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                state.openKeys = openKeys;
            } else {
                state.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        };
        return {
            ...toRefs(state),
            onOpenChange,
            firstName: "",
            lastName: "",
            selKey: ["1"],
        };
    },
    mounted() {
        this.firstName = window.sessionStorage["userName"].substr(0, 1);
        this.lastName = window.sessionStorage["userName"].substr(1);
        this.selKey[0] = this.$route.query.sk;
    },
    methods: {
        JumpToWorkbench() {
            this.$router.push({ path: "Workbench", query: { sk: "22" } });
        },
        JumpToCreateApply() {
            this.$router.push({ path: "CreateApply", query: { sk: "1" } });
        },
        JumpToHRPage() {
            this.$router.push({ path: "HRPage", query: { sk: "2" } });
        },
        JumpToEmploy() {
            this.$router.push({ path: "Employ", query: { sk: "3" } });
        },
        JumpToLeave() {
            this.$router.push({ path: "Leave", query: { sk: "4" } });
        },
        JumpToQuit() {
            this.$router.push({ path: "Quit", query: { sk: "5" } });
        },
    },
};
</script>

<style scoped>
.body {
    width: 1920px;
    height: 959px;
}

.Level_1_Div {
    width: 1920px;
    height: 959px;
    user-select: none;
    border: 1px solid #fff;
}

.Level_1-1_Div {
    width: 256px;
    height: 957px;
    border-right: 1px solid #f0f0f0;
    float: left;
}

.Level_1-1-1_Div_Left {
    width: 256px;
    height: 145px;
    border-bottom: 1px solid #c0c4cc;
}

.Level_1-1-1_Div_Left_Label_1 {
    float: left;
    margin-top: 24px;
    font-size: 20px;
    font-weight: 600;
    margin-left: 9px;
    color: #000;
}

.Level_1-1-1-1_Div_Top1 {
    margin-left: 20px;
    margin-top: 20px;
    padding-top: 1px;
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #409eff;
}

.Level_1-1-1-1_Div_Top2 {
    width: 256px;
    height: 48px;
    background-color: #ebeef5;
    float: left;
    margin-top: 5px;
    padding-top: 8px;
    padding-left: 25px;
    border-right: 1px solid #f0f0f0;
}

.Level_1-1-1-1_Div_Top2_Label {
    margin-left: 11px;
    font-size: 17px;
    font-weight: 600;
    color: #007acc;
}

.Level_1-1-1-1_Div_Top_Label {
    font-size: 23px;
    font-weight: 500;
    margin-left: 9px;
    color: #fff;
    float: left;
}

.Level_1-2_Div {
    width: 1377px;
    height: 957px;
    float: left;
    padding: 15px;
    margin-right: 30px;
}

.Level_1-3_Div {
    width: 253px;
    height: 957px;
    float: left;
    border-left: 1px solid #c0c4cc;
    padding-top: 15px;
}

.LabelCryle {
    margin-left: 30px;
    margin-top: 5px;
    padding-top: 1px;
    float: left;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #f56c6c;
}

.Cryle {
    margin-left: 30px;
    margin-top: 5px;
    padding-top: 1px;
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.PeopleAt {
    position: relative;
    left: 10px;
    bottom: 8px;
    color: #909399;
}

.LabelCryleText {
    font-size: 18px;
    font-weight: 500;
    margin-left: 16px;
    color: #fff;
    position: relative;
    top: 4px;
    float: left;
}

.LabelCryleFullText {
    float: left;
    margin-top: 5px;
    font-size: 18px;
    font-weight: 600;
    margin-left: 9px;
    color: #303133;
}
</style>