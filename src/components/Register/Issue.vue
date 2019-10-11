<template>
    <b-container>
        <b-row>
            <b-col>
                <Header name="DCEP测试原型：货币发行" content="央行发行新的数字货币" />
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>
                <b-button type="submit" variant="primary" v-on:click="addPlan">添加新的发行计划</b-button>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <div v-for="i in plans.length" :key="i">
                    <div>
                        <b-input-group prepend="面额与数量" class="mb-2">
                            <b-form-input aria-label="面额" placeholder="请输入面额"></b-form-input>
                            <b-form-input aria-label="数量" placeholder="请输入数量"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="outline-success" v-on:click="delPlan(i - 1)">删除</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button 
                          variant="primary" 
                          v-on:click="uploadPlan()"
                          :disabled="status.uploader.upload" v-if="uploadDisplay">
                    <span v-if="status.uploader.upload">
                        <b-spinner small></b-spinner>
                        提交中 ...
                    </span>
                    <span v-if="!status.uploader.upload">
                        提交
                    </span>
                </b-button>
            </b-col>
        </b-row>
        <br>
        <br>
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
        addPlan() {
            this.plans.push({});
        },
        delPlan(i) {
            if (this.plans.length >= 0) {
                this.plans.splice(i,1);
            }
        },
        uploadPlan(){
            this.status.uploader.upload = true;
        }
    },
    computed:{
        uploadDisplay() {
            return this.plans.length != 0;
        }
    },
    data () {
        return {
            plans: [],
            status: {
                uploader: {
                    upload: false,
                },
            }
        }
    }
}
</script>

<style scoped>
</style>
