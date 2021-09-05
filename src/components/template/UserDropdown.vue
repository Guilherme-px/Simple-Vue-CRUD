<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span>{{ user.name.split(" ")[0] }}</span>
            <font-icon class="icon" :icon="['fas', 'chevron-down']"></font-icon>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin" v-if="user.admin">
                <font-icon class="icon" :icon="['fas', 'cogs']"></font-icon>Administrator</router-link>
            <a href @click.prevent="logout"><font-icon class="icon" :icon="['fas', 'sign-out-alt']">
                </font-icon>Logout</a>
        </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userKey } from '@/global'

export default {
    name: "UserDropdown",
    computed: mapState(["user"]),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
};
</script>

<style scoped>
.user-dropdown {
    position: relative;
    height: 100%;
}

.user-button:hover {
    color: rgb(197, 14, 197);
}

.user-button .icon {
    transition: transform 0.5s;
    font-size: 19px;
}

.user-button:hover .icon {
    transform: rotate(180deg);
}

.user-button span {
    padding-right: 10px;
}

.user-button {
    display: flex;
    align-items: center;
    color: #fff;
    height: 100%;
    font-weight: 100;
    padding-right: 30px;
}

.user-dropdown-content a {
    color: #fff;
}

.user-dropdown-content {
    position: absolute;
    right: 0;
    background: #141414;
    min-width: 170px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    top: 100px;
    visibility: hidden;
    transition: all 0.3s ease-in;
}

.user-dropdown:hover .user-dropdown-content {
    top: 70px;
    visibility: visible;
    transition: all 0.3s ease;
}

.user-dropdown-content a {
    text-decoration: none;
    padding: 10px;
    font-size: 15px;
}

.user-dropdown-content a:hover {
    text-decoration: none;
    padding: 10px;
    font-size: 15px;
    color: rgb(197, 14, 197);
}

.user-dropdown-content .icon {
    padding-right: 5px;
    font-size: 1.3rem;
}
</style>