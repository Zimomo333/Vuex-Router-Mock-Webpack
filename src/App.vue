<template>
    <div id="app">
        <el-row class="tac">
            <el-col :span="4">
                <h3>导航栏</h3>
                <el-menu
                :default-active="this.$route.path"
                class="el-menu-vertical-demo"
                router
                >
                <el-menu-item v-for="item in routes" :key="item.path" :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="16">
                <h3>正文</h3>
                <router-view />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { routes } from './router'   // {}指定需要引用的模块
export default {
    name: 'App',
    data(){
        return {
            routes
        }
    }
}
</script>

<style scoped>  /* scoped 范围css 防止全局污染 */
h3 {
    text-align: center;
}
</style>