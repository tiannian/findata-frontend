<template>
    <b-container>
        <b-row>
            <b-col>
                <Header name="DCEP测试原型" content="测试原型123balabala" />
            </b-col>
        </b-row>
        <b-row>
            <b-col sm=12 v-for="role in roles" :key="role.name">
                <div>
                    <b-card
                        :title="role.content"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                    >
                    <b-card-text>
                        {{ role.desc }}
                    </b-card-text>

                    <b-button href="#" variant="primary" v-on:click="navigateTo(role.path)">登陆</b-button>
                    </b-card>
                    <br>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <Footer name="Findata" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
    name: 'Login',
    components: { 
        Header,
        Footer,
    },
    props: {
        msg: String
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path)
        }
    },
    data () {
        return {
            roles: [
                {
                    name: "register",
                    content: "数字货币登记中心",
                    desc: "负责记录数字货币所有权的转换过程。",
                    path: "/register"
                },
                {
                    name: "bank",
                    content: "商业银行",
                    desc: "辅助央行发行DCEP。",
                    path: "/bank"
                },
                {
                    name: "userA",
                    content: "用户A",
                    desc: "用户A的DCEP钱包。",
                    path: "/user/A"
                },
                {
                    name: "userB",
                    content: "用户B",
                    desc: "用户B的DCEP钱包。",
                    path: "/user/B"
                },
            ]
        }
    }
}
</script>

<style scoped>
</style>
