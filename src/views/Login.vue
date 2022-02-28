<template>
    <div
        style="
            width: 1920px;
            height: 959px;
            background-color: #fff;
            user-select: none;
        "
    >
        <div
            style="
                width: 1250px;
                height: 959px;
                background-color: #f8f8f8;
                float: left;
            "
        >
            <label
                style="
                    font-size: 30px;
                    color: #606266;
                    font-weight: 600;
                    float: left;
                    position: relative;
                    left: 20px;
                    top: 15px;
                "
                >BPM Manage System</label
            >

            <img
                :src="loginImg"
                style="
                    width: 750px;
                    position: relative;
                    top: 205px;
                    float: left;
                    right: 22px;
                "
            />
        </div>
        <div
            style="
                width: 670px;
                height: 959px;
                background-color: #fff;
                float: left;
            "
        >
            <div style="width: 670px; height: 70px; margin-top: 220px">
                <label style="font-size: 27px; margin-left: 100px"
                    >Welcome To BPM Manage System!</label
                >
                <img
                    class="icon"
                    :src="hands"
                    style="width: 35px; position: relative; bottom: 8px"
                /><br />
                <label
                    style="font-size: 17px; margin-left: 100px; color: #909399"
                >
                    Please enter your account and log in...</label
                >
            </div>
            <div
                style="
                    width: 500px;
                    height: 70px;
                    background-color: #d9ecff;
                    border-radius: 7px;
                    margin-left: 100px;
                    padding-top: 8px;
                    padding-left: 10px;
                    margin-top: 10px;
                "
            >
                <div style="width: 400px; height: 60px">
                    <label style="font-size: 16px; color: #1890ff; float: left"
                        >Account:</label
                    >
                    <label style="font-size: 16px; color: #409eff; float: left"
                        >Your name</label
                    ><br /><br />
                    <label
                        style="
                            font-size: 16px;
                            color: #1890ff;
                            float: left;
                            position: relative;
                            bottom: 15px;
                        "
                        >Password:</label
                    >
                    <label
                        style="
                            font-size: 16px;
                            color: #409eff;
                            float: left;
                            position: relative;
                            bottom: 15px;
                        "
                        >The default password is 123</label
                    ><br />
                </div>
            </div>
            <label
                style="
                    font-size: 14px;
                    color: #909399;
                    float: left;
                    margin-left: 100px;
                    margin-top: 20px;
                    position: relative;
                    right: 375px;
                "
                >Account</label
            ><br /><br />
            <a-input
                v-model:value="account"
                size="large"
                placeholder="Please input account"
                style="width: 500px; margin-left: 100px"
            />

            <label
                style="
                    font-size: 14px;
                    color: #909399;
                    float: left;
                    margin-left: 100px;
                    margin-top: 20px;
                "
                >Password</label
            ><br /><br />
            <a-input
                v-model:value="password"
                size="large"
                type="password"
                placeholder="Please input password"
                style="width: 500px; margin-left: 100px"
            /><br /><br />
            <a-button
                type="primary"
                @click="Login"
                size="large"
                style="width: 500px; margin-left: 100px"
                >Login</a-button
            >
            <label
                style="
                    font-size: 14px;
                    color: #909399;
                    float: left;
                    margin-left: 100px;
                    margin-top: 20px;
                    margin-left: 200px;
                "
                >No account? You can
            </label>
            <a-button
                type="link"
                style="position: relative; right: 10px; top: 15px; float: left"
                >sign up for a new account. </a-button
            ><br /><br /><br />
            <label
                style="
                    font-size: 14px;
                    color: #909399;
                    margin-top: 5px;
                    margin-left: 105px;
                "
                >—————————————————&nbsp;&nbsp;or&nbsp;&nbsp;———————————————— </label
            ><br />
            <div
                style="
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    float: left;
                    margin-right: 5px;
                    margin-left: 290px;
                "
            >
                <GooglePlusOutlined
                    style="
                        font-size: 35px;
                        color: #f30;
                        position: relative;
                        top: 2px;
                        left: 2px;
                    "
                />
            </div>
            <div
                style="
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    float: left;
                    margin-right: 5px;
                "
            >
                <TwitterOutlined
                    style="
                        font-size: 30px;
                        color: #1890ff;
                        position: relative;
                        top: 5px;
                        left: 5px;
                    "
                />
            </div>
            <div
                style="
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    float: left;
                    margin-right: 5px;
                "
            >
                <GithubOutlined
                    style="
                        font-size: 28px;
                        color: #000;
                        position: relative;
                        top: 6px;
                        left: 5px;
                    "
                />
            </div>
        </div>
    </div>
</template>

<script>
import {
    GooglePlusOutlined,
    TwitterOutlined,
    GithubOutlined,
} from "@ant-design/icons-vue";
import deImg from "@/assets/login.png";
import Img from "@/assets/hands.png";
export default {
    components: {
        GooglePlusOutlined,
        TwitterOutlined,
        GithubOutlined,
    },
    data() {
        return {
            account: "",
            password: "",
            loginImg: deImg,
            hands: Img,
        };
    },
    methods: {
        Login() {
            this.$ajax({
                url: "http://localhost:21231/api/Login",
                method: "Get",
                params: { account: this.account, password: this.password },
            }).then((r) => {
                if (r.data != "登录失败") {
                    window.sessionStorage["userName"] = r.data.loginUserInfo;
                    this.$message.success("登录成功！正在跳转...");
                    setInterval(() => {
                        location.href = "Workbench?sk=22";
                    }, 2000);
                } else {
                    this.$message.error("登录失败！");
                }
            });
        },
    },
};
</script>