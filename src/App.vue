<template>
    <div id="app">
        <Header :hideUserDropdown="!user" />
        <Loading v-if="validatingToken" />
        <Content v-else />
        <Footer />
    </div>
</template>

<script>
import Header from "./components/template/Header"
import Content from "./components/template/Content"
import Footer from "./components/template/Footer"
import Loading from "./components/template/Loading.vue"
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'

export default {
    components: { Header, Content, Footer, Loading },
    computed: mapState([ 'user' ]),
    data: function() {
        return {
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if(!userData) {
                this.validatingToken = false
                this.$router.push({ name: 'auth' })
				return
            }

            const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

            if(res.data) {
                this.$store.commit('setUser', userData)
            } else {
                localStorage.removeItem(userKey)
            }

            this.validatingToken = false
        }
    },
    created() {
        this.validateToken()
    }
}
</script>

<style>
* {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
}

body {
    margin: 0;
    background-color: whitesmoke;
}

#app {
    height: 100vh;
    display: grid;
    grid-template-rows: 70px 1fr 60px;
    grid-template-areas: 
        "header"
        "content"
        "footer";
}
</style>