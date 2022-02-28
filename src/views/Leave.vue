<template>
    <div style="width: 1000px; height: 650px">
        <a-descriptions title="基础信息" bordered size="small">
            <a-descriptions-item label="申请人">
                <a-input
                    v-model:value="leaveData.applyPeople"
                    placeholder="请输入申请人"
                />
            </a-descriptions-item>
            <a-descriptions-item label="申请部门" :span="2">
                <a-input
                    v-model:value="leaveData.applyDepartment"
                    placeholder="请输入申请部门"
                />
            </a-descriptions-item>
            <a-descriptions-item label="申请时间">
                <a-date-picker
                    v-model:value="leaveData.applyDate"
                    style="width: 250px"
                    placeholder="申请时间"
                />
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="请假信息" bordered size="small">
            <a-descriptions-item label="请假开始时间">
                <a-date-picker
                    v-model:value="startValue"
                    :disabled-date="disabledStartDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="开始日期"
                    @openChange="handleStartOpenChange"
                    @change="DateChange"
                />
            </a-descriptions-item>
            <a-descriptions-item label="请假结束时间" :span="2">
                <a-date-picker
                    v-model:value="endValue"
                    :disabled-date="disabledEndDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="结束日期"
                    :open="endOpen"
                    @openChange="handleEndOpenChange"
                    @change="DateChange"
                />
            </a-descriptions-item>
            <a-descriptions-item label="请假类型"
                ><a-select
                    ref="select"
                    v-model:value="leaveData.leaveType"
                    style="width: 120px"
                    @focus="focus"
                    @change="handleChange"
                >
                    <a-select-option value="事假">事假</a-select-option>
                    <a-select-option value="婚假">婚假</a-select-option>
                    <a-select-option value="丧假">丧假</a-select-option>
                    <a-select-option value="产假">产假</a-select-option>
                    <a-select-option value="陪产假">陪产假</a-select-option>
                </a-select>
            </a-descriptions-item>
            <a-descriptions-item label="请假天数" :span="2">
                <a-input
                    disabled
                    v-model:value="leaveData.leaveDays"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="请假原因" :span="3">
                <a-textarea
                    :autosize="{ minRows: 3, maxRows: 3 }"
                    v-model:value="leaveData.leaveReason"
                    placeholder="请输入请假原因"
                    allow-clear
                />
            </a-descriptions-item>
            <a-descriptions-item label="附件" :span="3">
                <!-- http://localhost:21231/FileUpload -->
                <a-upload
                    v-model:file-list="fileList"
                    name="file"
                    :multiple="true"
                    action="http://localhost:21231/FileUpload"
                    :headers="headers"
                    @change="handleChange"
                >
                    <a-button>
                        <upload-outlined></upload-outlined>
                        Click to Upload
                    </a-button>
                </a-upload>
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="备注" bordered size="small">
            <a-descriptions-item :span="3">
                <a-textarea
                    :autosize="{ minRows: 3, maxRows: 3 }"
                    v-model:value="leaveData.remarks"
                    placeholder="请输入备注"
                    allow-clear
                />
            </a-descriptions-item>
        </a-descriptions>
        <br />
        <a-button type="primary" shape="round" @click="OnSubmit">
            提交
        </a-button>
    </div>
</template>

<script>
import { message } from "ant-design-vue";
import calendarFormatter from "../common/dateChange.js";
import { ref } from "vue";
export default {
    data() {
        const fileList = ref([]);
        const startValue = ref();
        const endValue = ref();
        const endOpen = ref(false);
        const disabledStartDate = (startValue) => {
            if (!startValue || !endValue.value) {
                return false;
            }

            return startValue.valueOf() > endValue.value.valueOf();
        };

        const handleChange = (info) => {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        };

        const disabledEndDate = (endValue) => {
            if (!endValue || !startValue.value) {
                return false;
            }

            return startValue.value.valueOf() >= endValue.valueOf();
        };

        const handleStartOpenChange = (open) => {
            if (!open) {
                endOpen.value = true;
            }
        };

        const handleEndOpenChange = (open) => {
            endOpen.value = open;
        };
        return {
            headers: {
                authorization: "authorization-text",
            },
            fileList,
            handleChange,
            startValue,
            endValue,
            endOpen,
            disabledStartDate,
            disabledEndDate,
            handleStartOpenChange,
            handleEndOpenChange,
            value: "",
            text: "",
            leave: {
                action: "提交",
                bpmUser: "杨泽霖",
                bpmUserPass: "",
                fullName: "杨泽霖",
                processName: "LeaveProcess",
                leaveData: "",
            },
            leaveData: {
                id: 0,
                taskId: 0,
                applyPeople: "",
                applyDepartment: "",
                applyDate: "",
                startDate: "",
                endDate: "",
                leaveType: "事假",
                leaveDays: "0天0小时",
                leaveReason: "",
                fileName: "",
                remarks: "",
            },
            //农历假期
            //春节
            timeN_01_01: "",
            timeN_01_07: "",
            //清明
            timeN_02_19: "",
            timeN_02_21: "",
            //端午
            timeN_05_3: "",
            timeN_05_5: "",
            //中秋
            timeN_08_12: "",
            timeN_08_15: "",
        };
    },
    mounted() {
        this.getNongDate();
    },
    methods: {
        OnSubmit() {
            var date = new Date(this.leaveData.applyDate._d);
            this.leaveData.applyDate =
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate();
            date = new Date(this.startValue._d);
            this.leaveData.startDate =
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate();
            date = new Date(this.endValue._d);
            this.leaveData.endDate =
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate();
            this.leave.leaveData = JSON.stringify(this.leaveData);

            this.$ajax({
                url: "http://localhost:21231/api/stratLeave",
                method: "post",
                data: this.leave,
            }).then((r) => {
                if (r.data > 0) {
                    this.$message.success("提交成功！");
                    location.href = "Leave";
                } else {
                    this.$message.error("提交失败！");
                }
            });
        },
        DateChange() {
            var yearNow = new Date().getFullYear(); //获取今年
            var timeN_cj = this.timeN_01_01, //春节开始日期
                timeN_cje = this.timeN_01_07; //春节结束日期
            var time_01_01 = new Date(yearNow + "/01/01 00:00:00"), //元旦开始日期
                time_01_01e = new Date(yearNow + "/01/01 23:59:59"); //元旦结束日期
            var time_04_30 = new Date(yearNow + "/04/30 00:00:00"), //五一开始日期
                time_05_04 = new Date(yearNow + "/05/04 23:59:59"); //五一结束日期
            var time_qm = this.timeN_02_19, //清明开始日期
                time_qme = this.timeN_02_21; //清明结束日期
            var time_dw = this.timeN_05_3, //端午开始日期
                time_dwe = this.timeN_05_5; //端午结束日期
            var time_zq = this.timeN_08_12, //中秋开始日期
                time_zqe = this.timeN_08_15; //中秋结束日期
            var time_10_01 = new Date(yearNow + "/10/01 00:00:00"), //国庆开始日期
                time_10_07 = new Date(yearNow + "/10/07 23:59:59"); //国庆结束日期
            var dates = new Date(this.startValue), //请假开始日期
                datee = new Date(this.endValue); //请假结束日期
            var difSec = 0, //两日期相差秒数
                days = 0, //相差天数
                hours = 6; //相差小时数
            if (this.startValue != undefined && this.endValue != undefined) {
                //开始结束都不为空
                if (
                    (dates >= timeN_cj && dates <= timeN_cje) ||
                    (datee >= timeN_cj && datee <= timeN_cje) ||
                    (dates < timeN_cj && datee > timeN_cje)
                ) {
                    //春节
                    if (dates >= timeN_cj && dates <= timeN_cje) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于节假日！");
                    } else if (datee >= timeN_cj && datee <= timeN_cje) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于节假日！");
                    } else if (dates < timeN_cj && datee > timeN_cje) {
                        debugger;
                        difSec = (datee - dates) / 1000;
                        days = parseInt(difSec / 86400);
                        hours = parseInt(difSec / 3600) - 24 * days;
                        this.leaveData.leaveDays =
                            days - 7 + "天" + hours + "小时 ";
                    }
                } else if (
                    (dates >= time_01_01 && dates <= time_01_01e) ||
                    (datee >= time_01_01 && datee <= time_01_01e) ||
                    (dates < time_01_01 && datee > time_01_01e)
                ) {
                    //元旦
                    if (dates >= time_01_01 && dates <= time_01_01e) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于节假日！");
                    } else if (datee >= time_01_01 && datee <= time_01_01e) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于节假日！");
                    } else if (dates < time_01_01 && datee > time_01_01e) {
                        debugger;
                        difSec = (datee - dates) / 1000;
                        days = parseInt(difSec / 86400);
                        hours = parseInt(difSec / 3600) - 24 * days;
                        this.leaveData.leaveDays =
                            days - 1 + "天" + hours + "小时 ";
                    }
                } else if (
                    (dates >= time_04_30 && dates <= time_05_04) ||
                    (datee >= time_04_30 && datee <= time_05_04) ||
                    (dates < time_04_30 && datee > time_05_04)
                ) {
                    //五一
                    if (dates >= time_04_30 && dates <= time_05_04) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于节假日！");
                    } else if (datee >= time_04_30 && datee <= time_05_04) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于节假日！");
                    } else if (dates < time_04_30 && datee > time_05_04) {
                        debugger;
                        difSec = (datee - dates) / 1000;
                        days = parseInt(difSec / 86400);
                        hours = parseInt(difSec / 3600) - 24 * days;
                        this.leaveData.leaveDays =
                            days - 5 + "天" + hours + "小时 ";
                    }
                } else if (
                    (dates >= time_qm && dates <= time_qme) ||
                    (datee >= time_qm && datee <= time_qme) ||
                    (dates < time_qm && datee > time_qme)
                ) {
                    //清明
                    if (dates >= time_qm && dates <= time_qme) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于节假日！");
                    } else if (datee >= time_qm && datee <= time_qme) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于节假日！");
                    } else if (dates < time_qm && datee > time_qme) {
                        debugger;
                        difSec = (datee - dates) / 1000;
                        days = parseInt(difSec / 86400);
                        hours = parseInt(difSec / 3600) - 24 * days;
                        this.leaveData.leaveDays =
                            days - 3 + "天" + hours + "小时 ";
                    }
                } else if (
                    (dates >= time_dw && dates <= time_dwe) ||
                    (datee >= time_dw && datee <= time_dwe) ||
                    (dates < time_dw && datee > time_dwe)
                ) {
                    //端午
                    if (dates >= time_dw && dates <= time_dwe) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于节假日！");
                    } else if (datee >= time_dw && datee <= time_dwe) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于节假日！");
                    } else if (dates < time_dw && datee > time_dwe) {
                        debugger;
                        difSec = (datee - dates) / 1000;
                        days = parseInt(difSec / 86400);
                        hours = parseInt(difSec / 3600) - 24 * days;
                        this.leaveData.leaveDays =
                            days - 3 + "天" + hours + "小时 ";
                    }
                } else if (
                    (dates >= time_zq && dates <= time_zqe) ||
                    (datee >= time_zq && datee <= time_zqe) ||
                    (dates < time_zq && datee > time_zqe)
                ) {
                    //中秋
                    if (dates >= time_zq && dates <= time_zqe) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于节假日！");
                    } else if (datee >= time_zq && datee <= time_zqe) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于节假日！");
                    } else if (dates < time_zq && datee > time_zqe) {
                        debugger;
                        difSec = (datee - dates) / 1000;
                        days = parseInt(difSec / 86400);
                        hours = parseInt(difSec / 3600) - 24 * days;
                        this.leaveData.leaveDays =
                            days - 3 + "天" + hours + "小时 ";
                    }
                } else if (
                    (dates >= time_10_01 && dates <= time_10_07) ||
                    (datee >= time_10_01 && datee <= time_10_07) ||
                    (dates < time_10_01 && datee > time_10_07)
                ) {
                    //国庆
                    if (dates >= time_10_01 && dates <= time_10_07) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于节假日！");
                    } else if (datee >= time_10_01 && datee <= time_10_07) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于节假日！");
                    } else if (dates < time_10_01 && datee > time_10_07) {
                        debugger;
                        difSec = (datee - dates) / 1000;
                        days = parseInt(difSec / 86400);
                        hours = parseInt(difSec / 3600) - 24 * days;
                        this.leaveData.leaveDays =
                            days - 7 + "天" + hours + "小时 ";
                    }
                } else {
                    //判断是否包含或处于周六日
                    if (dates.getDay() == 6 || dates.getDay() == 0) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将开始日期设于周末！");
                    } else if (datee.getDay() == 6 || datee.getDay() == 0) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("不能将结束日期设于周末！");
                    } else {
                        var count = 0;
                        difSec = (datee - dates) / 1000; //计算秒数
                        days = parseInt(difSec / 86400); //计算天数
                        var dayss = days;
                        hours = parseInt(difSec / 3600) - 24 * days; //计算小时数
                        var startWeek = dates.getDay();
                        var endWeek = datee.getDay();
                        if (startWeek >= 2 && startWeek <= 6) {
                            count += 2;
                            dayss -= 7 - startWeek + 1;
                        } else if (startWeek == 0) {
                            count += 1;
                            dayss -= 1;
                        }
                        if (endWeek == 0) {
                            count += 2;
                        } else if (endWeek == 6) {
                            count += 1;
                            dayss -= endWeek;
                        }
                        count += Math.round((dayss / 7) * 2) - 1;
                        if (datee.getDay() == 1 || datee.getDay() == 2) {
                            count++;
                        }
                        this.leaveData.leaveDays =
                            days - count + "天" + hours + "小时 ";
                    }
                    if (days == 0 && hours < 6) {
                        this.startValue = "";
                        this.endValue = "";
                        this.leaveData.leaveDays = "0天0小时";
                        this.$message.error("请假时间不得小于半天！");
                    }
                }
            } else {
                this.leaveData.leaveDays = "0天0小时";
            }
        },
        getNongDate() {
            var yearNow = new Date().getFullYear(); //获取今年
            var nong_01_01 = calendarFormatter.lunar2solar(yearNow, 1, 1); //获取农历春节
            var nong_01_07 = calendarFormatter.lunar2solar(yearNow, 1, 7); //获取农历春节
            var nong_02_19 = calendarFormatter.lunar2solar(yearNow, 2, 19); //获取农历清明
            var nong_02_21 = calendarFormatter.lunar2solar(yearNow, 2, 21); //获取农历清明
            var nong_05_3 = calendarFormatter.lunar2solar(yearNow, 5, 3); //获取农历端午
            var nong_05_5 = calendarFormatter.lunar2solar(yearNow, 5, 5); //获取农历端午
            var nong_08_12 = calendarFormatter.lunar2solar(yearNow, 8, 12); //获取农历中秋
            var nong_08_15 = calendarFormatter.lunar2solar(yearNow, 8, 15); //获取农历中秋
            this.timeN_01_01 = new Date(
                nong_01_01.cYear +
                    "/" +
                    nong_01_01.cMonth +
                    "/" +
                    nong_01_01.cDay +
                    " 00:00:00"
            ); //获取春节标准日期
            this.timeN_01_07 = new Date(
                nong_01_07.cYear +
                    "/" +
                    nong_01_07.cMonth +
                    "/" +
                    nong_01_07.cDay +
                    " 23:59:59"
            ); //获取春节标准日期
            this.timeN_02_19 = new Date(
                nong_02_19.cYear +
                    "/" +
                    nong_02_19.cMonth +
                    "/" +
                    nong_02_19.cDay +
                    " 00:00:00"
            ); //获取清明标准日期
            this.timeN_02_21 = new Date(
                nong_02_21.cYear +
                    "/" +
                    nong_02_21.cMonth +
                    "/" +
                    nong_02_21.cDay +
                    " 23:59:59"
            ); //获取清明标准日期
            this.timeN_05_3 = new Date(
                nong_05_3.cYear +
                    "/" +
                    nong_05_3.cMonth +
                    "/" +
                    nong_05_3.cDay +
                    " 00:00:00"
            ); //获取端午标准日期
            this.timeN_05_5 = new Date(
                nong_05_5.cYear +
                    "/" +
                    nong_05_5.cMonth +
                    "/" +
                    nong_05_5.cDay +
                    " 23:59:59"
            ); //获取端午标准日期
            this.timeN_08_12 = new Date(
                nong_08_12.cYear +
                    "/" +
                    nong_08_12.cMonth +
                    "/" +
                    nong_08_12.cDay +
                    " 00:00:00"
            ); //获取中秋标准日期
            this.timeN_08_15 = new Date(
                nong_08_15.cYear +
                    "/" +
                    nong_08_15.cMonth +
                    "/" +
                    nong_08_15.cDay +
                    " 23:59:59"
            ); //获取中秋标准日期
        },
    },
};
</script>