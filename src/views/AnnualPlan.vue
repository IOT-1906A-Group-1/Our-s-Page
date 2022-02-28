<template>
    <div style="width: 1450px; height: 500px; background-color: #ffffff">
        <!-- 基础信息 -->
        <a-descriptions title="基础信息" bordered>
            <a-descriptions-item label="制表人" style="background-color: white">
                <a-input
                    v-model:value="PlanData.plan_People"
                    placeholder="请输入"
                    style="width: 250px"
                />
            </a-descriptions-item>
            <a-descriptions-item
                label="制表部门"
                :span="2"
                style="background-color: white"
            >
                <a-select
                    v-model:value="PlanData.plan_PartMent"
                    placeholder="请选择"
                    style="width: 200px; background-color: white"
                >
                    <a-select-option value="人事部">人事部</a-select-option>
                    <a-select-option value="财务部">财务部</a-select-option>
                </a-select>
            </a-descriptions-item>
            <a-descriptions-item
                label="制表时间"
                style="background-color: white"
            >
                <a-date-picker
                    v-model:value="PlanData.plan_CreateTime"
                    show-time
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
            </a-descriptions-item>
            <a-descriptions-item
                label="年份"
                :span="2"
                style="background-color: white"
            >
                <a-date-picker
                    v-model:value="PlanData.plan_Years"
                    show-time
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
            </a-descriptions-item>
        </a-descriptions>

        <!-- 详细信息 -->
        <div style="width: 1450px; height: 190px; background-color: white">
            <div style="font-weight: bold; font-size: 16px">详细信息</div>
            <div>
                <div class="xuhao">序号</div>
                <div class="gangwei">岗位</div>
                <div class="shangnian">上年已有</div>
                <div class="bennian">本年预计增加</div>
                <div class="heji">合计</div>
                <div class="month" v-for="item in month" :key="item">
                    {{ item }}月份
                </div>
            </div>
            <div>
                <div class="xuhaoInput">
                    <span style="font-weight: bold">1</span>
                </div>
                <div class="gangweiInput">
                    <input
                        type="text"
                        v-model="PlanInfoDetail.info_Position"
                        class="textInput"
                    />
                </div>
                <div class="shangnianInput">
                    <input
                        type="text"
                        v-model="PlanInfoDetail.info_LastYears_Has"
                        class="textInput"
                    />
                </div>
                <div class="monthInput" v-for="item in month" :key="item">
                    <input
                        type="text"
                        v-model="PlanInfoDetail.info_January"
                        class="textInput"
                    />
                </div>
                <div class="hejiInput">
                    <input
                        type="text"
                        v-model="PlanInfoDetail.info_Sum"
                        class="textInput"
                    />
                </div>
            </div>
            <div>
                <div class="hejiText">合计:</div>
                <div class="shangnianhejiInput"></div>
                <div class="monthInput" v-for="item in month" :key="item"></div>
                <div class="hejihejiInput"></div>
            </div>
        </div>

        <!-- 备注 -->
        <a-descriptions title="备注" bordered></a-descriptions>
        <div>
            <a-textarea
                v-model:value="PlanData.plan_Remark"
                showCount
                :maxlength="100"
                style="width: 100%; background-color: white"
            />
        </div>
        <div style="width: 100%; height: 50px">
            <a-button type="primary" shape="round" @click="OnSubmit">
                提交
            </a-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            PlanData: {
                plan_People: "", //制表人
                plan_CreateTime: "", //制表时间
                plan_PartMent: "", //制表部门
                plan_Years: "", //制表年
                plan_InFormationId: 1, //外键
                plan_Remark: "", //备注
            },
            PlanInfoDetail: {
                info_Position: "", //岗位
                info_LastYears_Has: "", //上年已有
                info_January: "", //一月
                info_February: "", //二月
                info_March: "", //三月
                info_April: "", //四月
                info_May: "", //五月
                info_June: "", //六月
                info_July: "", //七月
                info_August: "", //八月
                info_September: "", //九月
                info_October: "", //十月
                info_November: "", //十一月
                info_December: "", //十二月
                info_Sum: "", //合计
            },
            formData: {
                action: "提交",
                bpmUser: "常皓",
                bpmUserPass: "",
                fullName: "常皓",
                processName: "年度计划审批流程",
                planData: "",
                planInfoDetail: "",
            },
        };
    },
    methods: {
        OnSubmit() {
            var d = new Date(this.PlanData.plan_CreateTime._d);
            var data =
                d.getFullYear() +
                "年" +
                d.getMonth() +
                "月" +
                d.getDate() +
                "日";
            this.PlanData.plan_CreateTime = data;
            var ds = new Date(this.PlanData.plan_Years._d);
            var datas =
                ds.getFullYear() +
                "年" +
                ds.getMonth() +
                "月" +
                ds.getDate() +
                "日";
            this.PlanData.plan_Years = datas;
            this.formData.planData = JSON.stringify(this.PlanData);
            this.formData.planInfoDetail = JSON.stringify(this.PlanInfoDetail);
            console.log(this.formData);
            this.$ajax({
                url: "http://localhost:21231/api/StartPlan",
                method: "post",
                data: this.formData,
            }).then((res) => {
                if (res.data != 0) {
                    this.$message.success("提交成功!");
                }
            });
        },
    },
};
</script>



<style scoped>
.xuhao {
    text-align: center;
    width: 140px;
    background-color: white;
    height: 60px;
    border: 1px solid #f0f0f0;
    float: left;
}
.gangwei {
    text-align: center;
    width: 130px;
    background-color: white;
    height: 60px;
    border: 1px solid #f0f0f0;
    float: left;
}
.shangnian {
    text-align: center;
    width: 100px;
    background-color: white;
    height: 60px;
    border: 1px solid #f0f0f0;
    float: left;
}
.bennian {
    text-align: center;
    width: 972px;
    background-color: white;
    height: 30px;
    border: 1px solid #f0f0f0;
    float: left;
}
.heji {
    text-align: center;
    width: 108px;
    background-color: white;
    height: 60px;
    border: 1px solid #f0f0f0;
    float: right;
}
.month {
    text-align: center;
    width: 81px;
    height: 30px;
    border: 1px solid #f0f0f0;
    background-color: white;
    float: left;
}
.xuhaoInput {
    width: 140px;
    background-color: white;
    height: 40px;
    border: 1px solid #f0f0f0;
    float: left;
}
.gangweiInput {
    width: 130px;
    background-color: white;
    height: 40px;
    border: 1px solid #f0f0f0;
    float: left;
}
.shangnianInput {
    width: 100px;
    background-color: white;
    height: 40px;
    border: 1px solid #f0f0f0;
    float: left;
}
.monthInput {
    width: 81px;
    height: 40px;
    border: 1px solid #f0f0f0;
    background-color: white;
    float: left;
}
.textInput {
    border: 0px solid white;
    width: 100%;
    height: 100%;
}
.hejiInput {
    width: 108px;
    background-color: white;
    height: 40px;
    border: 1px solid #f0f0f0;
    float: right;
}
.hejiText {
    width: 270px;
    background-color: white;
    height: 40px;
    border: 1px solid #f0f0f0;
    float: left;
    text-align: right;
}
.shangnianhejiInput {
    width: 100px;
    background-color: white;
    height: 40px;
    border: 1px solid #f0f0f0;
    float: left;
}
.hejihejiInput {
    width: 108px;
    background-color: white;
    height: 40px;
    border: 1px solid #f0f0f0;
    float: right;
}
</style>