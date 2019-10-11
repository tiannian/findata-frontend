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
import axios from 'axios';

const allCoinUrl = 'http://localhost:8501/api/v0.1/coin'
const publicKeyUrl = 'http://localhost:8500/api/v0.1/certificate'

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
    async mounted () {
        let result = await axios.get(allCoinUrl);
            // eslint-disable-next-line
            console.log(result.data.data)
        for (let coin of result.data.data) {
            
            let res = {};
            let _result = await axios.get(`${publicKeyUrl}/${coin.owner}`)
            res.owner_name = _result.data.data.user.name;
            res.amount = coin.amount;
            res.owner = coin.owner;
            res.id = coin.hash;
            // eslint-disable-next-line
            console.log(res);
            
            this.coins.push(res);
        }
        /*for (let index in result.data.data.result) {
            let owner = result.data.data.result[index];
            let data = {};
            data.owner = owner;
            let _result = await axios.get(`${publicKeyUrl}/${owner}`)
            // eslint-disable-next-line
            console.log(_result.data)
            data.owner_name = _result.data.data.user;
            data.amount = 
        }*/
    },
    data () {
        return {
            coins: []
        }
    }
}
</script>

<style scoped>
</style>
