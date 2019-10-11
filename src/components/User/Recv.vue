<template>
    <b-container>
        <b-row>
            <b-col>
                <Header name="DCEP测试原型" content="测试原型123balabala" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>您收到了一笔转账，转账货币列表如下</p>
            </b-col>
        </b-row>
        <b-row v-for="i in coins.length" :key="i">
            <b-col>
                <b-card
                    :border-variant="computedColor(coins[i-1].selected)"
                    :header="cardAmount(coins[i-1].amount)"
                    :title="cardTitle(coins[i-1].id)">
                    <b-card-text>发行方: 中国人民银行</b-card-text>
                </b-card>
                <br>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button block variant="primary" v-on:click="recvCoin" v-b-modal.qrcode>
                    <span v-if="status.upload == 1">
                        <b-spinner small></b-spinner>
                        收款中 ...
                    </span>
                    <span v-if="status.upload == 0">
                        点击收款
                    </span>
                    <span v-if="status.upload == 2">
                        收款成功
                    </span>
                </b-button>
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

const fetchUrl = 'http://localhost:8501/api/v0.1/transfer/fetch';
const recvUrl = 'http://localhost:8501/api/v0.1/transfer/recv';


export default {
    name: 'Recv',
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
        },
        computedColor(status) {
            return status ? "warning": "dark";
        },
        async recvCoin() {
            this.status.upload = 1;
            let userFlag = this.$route.params.id;
            let infoStr = localStorage.getItem(`User${userFlag}Info`);
            let info = JSON.parse(infoStr);
            let result = await axios.post(`${recvUrl}/${this.$route.params.txid}`, {
                target: info.publicKey
            });
            console.log(result);
            this.status.upload = 2;
        },
    },
    async mounted () {
        console.log(this.$route.params.txid);
        // 读取货币列表
        let result = await axios.get(`${fetchUrl}/${this.$route.params.txid}`);
        console.log(result.data);
        for (let coin of result.data.data) {
            let res = {};
            res.amount = coin.amount;
            res.owner = coin.owner;
            res.id = coin.hash;
            this.coins.push(res);
        }
    },
    data () {
        return {
            coins: [],
            status: {
                upload: 0,
            }
        }
    }
}
</script>

<style scoped>
</style>
