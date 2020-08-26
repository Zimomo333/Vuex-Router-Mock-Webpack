<template>
    <div>
        <el-row>
            <el-col>
                <el-dropdown style="float:right;">
                    <el-button type="primary">
                        菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <el-row class="tac">
            <el-col :span="4">
                <h3>导航栏</h3>
                <el-menu
                :default-active="this.$route.path"
                class="el-menu-vertical-demo"
                router
                >
                <el-menu-item v-for="item in routelist" :key="item.path" :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
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
import { routes } from '../router'   // {}指定需要引用的模块

export default {
    name: 'home',
    data() {
        return {
            routelist: routes[0].children
        }
    },

    methods: {
        logout(){
            this.$store.dispatch('logout').then(() => {
                this.$router.push('login')
            }).catch(() => {
                console.log('登出失败')
            })
        }
    }
}
</script>

<style scoped>  /* scoped 范围css 防止全局污染 */
h3 {
    text-align: center;
}
</style>