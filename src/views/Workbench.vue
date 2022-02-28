<template>
    <a-skeleton :loading="loading" active :paragraph="paragraph">
        <div class="wLevel_1_Div">
            <img class="icon" :src="Icon" style="width: 40px; position: relative; bottom: 12px" />
            <label class="wLevel_1_Label">你好，{{ firstName + lastName }}</label><br />
            <div style="width: 880px; height: 120px">
                <div style="
                    width: 180px;
                    height: 120px;
                    float: left;
                    padding-top: 10px;
                    padding-left: 10px;
                ">
                    <label style="
                        font-size: 16px;
                        font-weight: 400;
                        color: #909399;
                        margin-left: 2px; ;
                    ">已处理申请</label><br />
                    <label style="font-size: 33px; font-weight: 500">1,653</label>
                </div>
                <div style="
                    width: 180px;
                    height: 120px;
                    float: left;
                    padding-top: 10px;
                    padding-left: 10px;
                ">
                    <label style="
                        font-size: 16px;
                        font-weight: 400;
                        color: #909399;
                        margin-left: 2px; ;
                    ">待处理申请</label><br />
                    <label style="font-size: 33px; font-weight: 500">20</label>
                </div>
                <div style="
                    width: 180px;
                    height: 120px;
                    float: left;
                    padding-top: 10px;
                    padding-left: 10px;
                ">
                    <label style="
                        font-size: 16px;
                        font-weight: 400;
                        color: #909399;
                        margin-left: 2px; ;
                    ">待审核申请</label><br />
                    <label style="font-size: 33px; font-weight: 500">3</label>
                </div>
            </div>
        </div>
        <div style="
            width: 880px;
            height: 600px;
            float: left;
        ">
            <a-radio-group size="default" type="dashed">
                <a-radio-button style="width: 80px">已关注</a-radio-button>
                <a-radio-button style="width: 80px">待处理</a-radio-button>
            </a-radio-group>
            <br /><br />
            <div
                style="width:300px;height:180px;border-radius: 5px;box-shadow:0 0 5px #606266;float: left;margin-right: 20px;">

            </div>
            <div style="width:300px;height:180px;border-radius: 5px;box-shadow:0 0 5px #606266;float: left;">

            </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <label style="font-size: 23px;font-weight: 600;">待处理申请</label>
            <br /><br />
            <a-table :pagination="false" :columns="columns" :data-source="data">
                <template #name="{ text }">
                    <a>{{ text }}</a>
                </template>
                <template #customTitle>
                    <span>
                        <smile-outlined />
                        Name
                    </span>
                </template>
                <template #tags="{ text: tags }">
                    <span>
                        <a-tag v-for="tag in tags" :key="tag"
                            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template #action="{ record }">
                    <span>
                        <a>Invite 一 {{ record.name }}</a>
                        <a-divider type="vertical" />
                        <a>Delete</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            More actions
                            <down-outlined />
                        </a>
                    </span>
                </template>
            </a-table>
        </div>
    </a-skeleton>
</template>

<script>
    import deImg from "@/assets/hands.png";
    const columns = [
        {
            width: 150,
            dataIndex: 'name',
            key: 'name',
            slots: {
                title: 'customTitle',
                customRender: 'name',
            },
        },
        {
            width: 100,
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            width: 200,
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            width: 200,
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            slots: {
                customRender: 'tags',
            },
        },
        {
            width: 400,
            title: 'Action',
            key: 'action',
            slots: {
                customRender: 'action',
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
    ];
    export default {
        data() {
            return {
                loading: true,
                data,
                columns,
                firstName: "",
                lastName: "",
                Icon: deImg,
                paragraph: {
                    rows: 7,
                    width: [700, 700, 700, 700, 700, 700, 700],
                }
            };
        },
        mounted() {
            setInterval(() => {
                this.loading = false;
            }, 2000);
            this.firstName = window.sessionStorage["userName"].substr(0, 1);
            this.lastName = window.sessionStorage["userName"].substr(1);
        },
    };
</script>

<style scoped>
    .wLevel_1_Div {
        width: 880px;
        height: 170px;
    }

    .wLevel_1_Label {
        font-size: 30px;
        margin-left: 5px;
        position: relative;
        bottom: 2px;
        font-weight: 600;
    }
</style>