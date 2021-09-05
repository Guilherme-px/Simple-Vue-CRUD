<template>
    <div class="container">
        <h2>User Management</h2>
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Users">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import UserAdmin from "./UserAdmin";

export default {
    name: "AdminPages",
    components: { UserAdmin },
};
</script>

<style scoped>
h2 {
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}
</style>