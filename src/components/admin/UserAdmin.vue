<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Name:" label-for="user-name">
                        <b-form-input
                            id="user-name"
                            type="text"
                            v-model="user.name"
                            required
                            :readonly="mode === 'remove'"
                            placeholder="Enter user name."
                        />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input
                            id="user-email"
                            type="email"
                            v-model="user.email"
                            required
                            :readonly="mode === 'remove'"
                            placeholder="Enter user E-mail."
                        />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Birth date:" label-for="user-birth">
                        <b-form-input
                            v-model="user.birth"
                            required
                            id="user-birth"
                            type="date"
                            :readonly="mode === 'remove'"
                            placeholder="Birth date."
                        />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-checkbox
                        id="user-admin"
                        v-show="mode === 'save'"
                        v-model="user.admin"
                        class="mt-3 mb-3"
                    >
                        Administrator
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Password:" label-for="user-password">
                        <b-form-input
                            id="user-password"
                            type="password"
                            v-model="user.password"
                            required
                            :readonly="mode === 'remove'"
                            placeholder="Enter user password."
                        />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group
                        label="Confirm password:"
                        label-for="user-confirm-password"
                    >
                        <b-form-input
                        id="user-confirm-password"
                        type="password"
                        v-model="user.confirmPassword"
                        required
                        :readonly="mode === 'remove'"
                        placeholder="Confirm user password."
                        />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cs="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Delete</b-button>
                    <b-button class="ml-2" @click="reset">Cancel</b-button>
                </b-col>
            </b-row>
        </b-form>
        <br>
        <b-table hover striped :items="users" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <font-icon class="icon" :icon="['fas', 'user-edit']"></font-icon>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <font-icon class="icon" :icon="['fas', 'trash']"></font-icon>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" pills align="center" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import moment from 'moment'

export default {
    name: "UserAdmin",
    data: function () {
        return {
            mode: "save",
            user: {},
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "id", label: "Id", sortable: true },
                { key: "name", label: "Name", sortable: true },
                { key: "email", label: "E-mail", sortable: true },
                { key: "admin", label: "Administrator", sortable: true,
                    formatter: (value) => (value ? "Yes" : "No") },
                { key: "actions", label: "Actions" },
            ],
        };
    },
    methods: {
        formatarData () {
            let data = this.user.birth
            this.user.birth = moment(data).format('YYYY-MM-DD')
        },
        loadUsers() {
            const url = `${baseApiUrl}/users?page=${this.page}`;
            axios.get(url).then((res) => {
                this.users = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            });
        },
        reset() {
            this.mode = "save";
            this.user = {};
            this.loadUsers();
        },
        save() {
            const method = this.user.id ? "put" : "post";
            const id = this.user.id ? `/${this.user.id}` : "";
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        remove() {
            const id = this.user.id;
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        loadUser(user, mode = "save") {
            this.mode = mode;
            this.user = { ...user };
            this.formatarData()
        },
    },
    watch: {
        page() {
            this.loadUsers(),
            this.formatarData()
        }
    },
    mounted() {
        this.loadUsers();
        
    },
};
</script>

<style>

</style>