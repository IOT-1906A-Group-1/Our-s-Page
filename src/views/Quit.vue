<template>
    <div style="width: 1000px; height: 500px">
        <a-descriptions title="基础信息" bordered>
            <a-descriptions-item label="申请人" :span="2">
                <a-input
                    v-model:value="form.departure_Name"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>

            <a-descriptions-item label="申请部门">
                <a-input
                    v-model:value="form.departure_Bu"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>
            <a-descriptions-item label="申请日期">
                <a-space direction="vertlc ical">
                    <a-date-picker v-model:value="form.departure_Date" />
                </a-space>
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="离职详细信息" bordered>
            <a-descriptions-item label="职位" :span="2">
                <a-input
                    v-model:value="form.departure_Zhi"
                    placeholder="Basic usage"
                />
            </a-descriptions-item>

            <a-descriptions-item label="入职日期">
                <a-date-picker v-model:value="form.departure_RDate" />
            </a-descriptions-item>
            <a-descriptions-item label="离职日期" :span="2">
                <a-date-picker v-model:value="form.departure_LDate" />
            </a-descriptions-item>
            <a-descriptions-item label="离职类型">
                <a-select
                    ref="select"
                    v-model:value="form.departure_Lizhi"
                    style="width: 200px"
                    @focus="focus"
                    @change="handleChange"
                >
                    <a-select-option value="辞退">辞退</a-select-option>
                    <a-select-option value="主动">主动</a-select-option>
                </a-select>
            </a-descriptions-item>
            <a-descriptions-item label="离职原因">
                <a-textarea
                    v-model:value="form.departure_LContext"
                    placeholder="textarea with clear icon"
                    allow-clear
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
            form: {
                departure_Name: "",
                departure_Bu: "",
                departure_Date: "",
                departure_Zhi: "",
                departure_RDate: "",
                departure_Lizhi: "",
                departure_LDate: "",
                departure_LContext: "",
            },
            hrdate: {
                action: "提交",
                bpmUser: "李超",
                bpmUserPass: "",
                fullName: "李超",
                processName: "departure",
                departure: "",
            },
        };
    },
    methods: {
        OnSubmit() {
            this.hrdate.departure = JSON.stringify(this.form);
            this.$ajax({
                url: "http://localhost:21231/api/startDepartur",
                method: "post",
                data: this.hrdate,
            }).then((res) => {
                if (res.data > 0) {
                    alert("提交成功");
                } else {
                    alert("提交失败");
                }
            });
        },
    },
};
</script>