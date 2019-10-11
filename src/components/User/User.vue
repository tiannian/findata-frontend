<template>
    <b-container>
        <b-row>
            <b-col>
                <Header name="DCEP测试原型" content="测试原型123balabala" />
            </b-col>
        </b-row>
        <b-row v-for="i in coins.length" :key="i">
            <b-col>
                <b-card
                    :border-variant="computedColor(coins[i-1].selected)"
                    :header="cardAmount(coins[i-1].amount)"
                    :title="cardTitle(coins[i-1].id)"
                    v-on:click=selectCard(i-1)>
                    <b-card-text>发行方: 中国人民银行</b-card-text>
                </b-card>
                <br>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button block variant="primary" v-on:click="sendCoin" v-if="isSelected">
                    <span v-if="status.upload">
                        <b-spinner small></b-spinner>
                        提交中 ...
                    </span>
                    <span v-if="!status.upload">
                        提交
                    </span>
                </b-button>
                <b-modal id="qrcode" ref="qrcode" title="请扫描二维码" centered>
                    <p>
                        转账码为: {{status.code}}
                    </p>
                    <p>
                        <img :src="status.img" class="qr"/>
                    </p>
                </b-modal>
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
import QrCode from 'qrcode';

export default {
    name: 'User',
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
        selectCard(i) {
            if (this.coins[i].selected == false) {
                this.coins[i].selected = true;
                this.status.selected ++;
            } else {
                this.coins[i].selected = false;
                this.status.selected --;
            }
        },
        computedColor(status) {
            return status ? "warning": "dark";
        },
        async sendCoin() {
            this.status.upload = true;
            let code = await QrCode.toDataURL(this.status.code);
            this.status.img = code;
            this.$refs['qrcode'].show();
        },
    },
    computed: {
        isSelected() {
            return this.status.selected != 0;
        },
    },
    data () {
        return {
            coins: [
                {
                    id: "5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 500,
                    selected: false,
                },
                {
                    id: "66b1132a0173910b01ee3a15ef4e69583bbf2f7f1e4462c99efbe1b9ab5bf808",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 10000,
                    selected: false,
                },
                {
                    id: "0c4c8e302e7a074a8a1c2600cd1af07505843adb2c026ea822f46d3b5a98dd1f",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 10000,
                    selected: false,
                },
                {
                    id: "bf5b76c021a30a736a5c40c6ba6ee8a5be435f2ca7e2e8e18e5ae27268582d9f",
                    owner: "411257069909f74653add60de007c33fb000753c2a021a576fe17f45a3cab74d",
                    amount: 10000,
                    selected: false,
                },
            ],
            status: {
                selected :0,
                code: "asdasdasdsds",
                img: null,
                upload: false,
            }
        }
    }
}
</script>

<style scoped>
.qr {
    display: block;
    margin: 0 auto;
}
</style>
