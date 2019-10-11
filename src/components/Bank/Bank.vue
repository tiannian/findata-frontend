<template>
    <b-container>
        <b-row>
            <b-col>
                <Header name="DCEP测试原型" content="测试原型123balabala" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div>
                    <b-button v-b-modal.modal-1>显示公钥信息</b-button>
                    <b-modal id="modal-1" title="BootstrapVue">
                        <p>姓名:{{name}}</p>
                        <p>公钥:{{displayPublicKey}}</p>
                    </b-modal>
                </div>
                    <br>
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
import nacl from 'tweetnacl';
import axios from 'axios';

const certUrl = 'http://localhost:8500/api/v0.1/certificate';
const coinsUrl = 'http://localhost:8501/api/v0.1/owner';
const sendUrl = 'http://localhost:8501/api/v0.1/transfer/send';

export default {
    name: 'User',
    components: { 
        Header,
        Footer,
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
            let req = [];
            for (let coin of this.coins) {
                if(coin.selected) {
                    req.push(coin.id);
                }
            }
            let result = await axios.post(sendUrl, {
                coins: req
            });
            console.log(result.data);
            this.status.code = result.data.data;
            let code = await QrCode.toDataURL(this.status.code);
            this.status.img = code;
            this.status.upload = false;
            this.$refs['qrcode'].show();
        },
    },
    async mounted () {
        // Load info
        let infoStr = localStorage.getItem('BankInfo');
        if(infoStr == null) {
            this.name = "商业银行";
            let keys = nacl.sign.keyPair();
            this.publicKey = keys.publicKey;
            this.secretKey = keys.secretKey;
            let info = {
                name: this.name,
                publicKey: Buffer.from(this.publicKey).toString('hex'),
                secretKey: Buffer.from(this.secretKey).toString('hex'),
            }
            localStorage.setItem('BankInfo', JSON.stringify(info));
            let result = await axios.post(certUrl, {
                name: "商业银行",
                email: "example@example.com",
                publicKey: info.publicKey,
            });
            // eslint-disable-next-line
            console.log(result.data);
        } else {
            let info = JSON.parse(infoStr);
            this.name = info.name;
            this.publicKey = Uint8Array.from(Buffer.from(info.publicKey, 'hex'));
            this.secretKey = Uint8Array.from(Buffer.from(info.secretKey, 'hex'));
        }
        // get coin list
        let result = await axios.get(`${coinsUrl}/${Buffer.from(this.publicKey).toString('hex')}`);
        for (let coin of result.data.data) {
            let res = {};
            // let _result = await axios.get(`${publicKeyUrl}/${coin.owner}`)
            //res.owner_name = _result.data.data.user.name;
            res.amount = coin.amount;
            res.owner = coin.owner;
            res.id = coin.hash;
            res.selected = false;
            // eslint-disable-next-line
            console.log(res);
            
            this.coins.push(res);
        }
    },
    computed: {
        isSelected() {
            return this.status.selected != 0;
        },
        displayPublicKey() {
            return Buffer.from(this.publicKey).toString('hex');
        }
    },
    data () {
        return {
            coins: [],
            name: "商业银行",
            publicKey: "",
            secretKey: "",
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
