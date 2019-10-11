<template>
    <b-container>
        <b-row>
            <b-col>
                <Header name="DCEP测试原型：数字货币登记中心" content="查看所有已经存在的数字货币" />
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>
                <p>
                    <b-button block variant="primary" v-on:click="navigateTo('/register/issue')">发行新货币</b-button>
                </p>
            </b-col>
        </b-row>
        
        <b-row v-for="coin in coins" :key="coin.id">
            <b-col>
                <b-card border-variant="dark" :header="cardAmount(coin.amount)" :title="cardTitle(coin.id)">
                    <b-card-text>拥有者公钥: {{ coin.owner }}</b-card-text>
                    <b-card-text>拥有者姓名: {{ coin.owner_name }}</b-card-text>
                </b-card>
                <br>
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
import Header from '../Header.vue';
import Footer from '../Footer.vue';

export default {
    name: 'Register',
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
        },
        cardTitle(id) {
            return "货币ID:" + id;
        },
        cardAmount(amount) {
            return "面额 " + (amount / 100) +" 元货币";
        }
    },
    data () {
        return {
            coins: [
                {
                    id: "5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 500,
                    owner_name: "商业银行",
                },
                {
                    id: "66b1132a0173910b01ee3a15ef4e69583bbf2f7f1e4462c99efbe1b9ab5bf808",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 10000,
                    owner_name: "商业银行",
                },
                {
                    id: "0c4c8e302e7a074a8a1c2600cd1af07505843adb2c026ea822f46d3b5a98dd1f",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 10000,
                    owner_name: "商业银行",
                },
                {
                    id: "bf5b76c021a30a736a5c40c6ba6ee8a5be435f2ca7e2e8e18e5ae27268582d9f",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 10000,
                    owner_name: "商业银行",
                },
            ]
        }
    }
}
</script>

<style scoped>
</style>
