<template>
    <header class="header">
        <div class="item-login">
            <ul>
                <li>
                    <router-link to="/auth" v-if="hideUserDropdown">Login</router-link>
                    <UserDropdown v-if="!hideUserDropdown" />
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import UserDropdown from "./UserDropdown.vue"

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        hideUserDropdown: Boolean
    }
}
</script>

<style scoped>
.header {
    grid-area: header;
    background: linear-gradient(to right, #070606, #0c0c0c);
    color: #fff;
    font-size: 1.5rem;
    margin: 0;

    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.item-login {
    height: 100%;
}

.item-login ul {
    list-style: none;
    height: 100%;
}

.item-login li {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-login a {
    color: #fff;
    text-decoration: none;
    padding-right: 30px;
}
</style>