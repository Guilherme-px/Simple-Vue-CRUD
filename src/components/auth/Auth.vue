<template>
    <div class="container">
        <div class="content-login">
            <h2 class="auth-title">{{ showSignup ? "Register" : "Login" }}</h2>
            <div class="form">
                <div v-if="showSignup" class="input-field">
                    <input type="text" v-model="user.name" name="name" placeholder="Enter your name.">
                    <div class="underline"></div>
                </div>
                <div class="input-field">
                    <input type="email" v-model="user.email" name="email" placeholder="Enter your E-mail.">
                    <div class="underline"></div>
                </div>
                <div v-if="showSignup" class="input-field">
                    <input type="text" v-model="user.birth" name="birth" max="3000-01-01" onfocus="(this.type='date')"
                        placeholder="Enter your birth.">
                    <div class="underline"></div>
                </div>
                <div class="input-field">
                    <input type="password" v-model="user.password" name="password" placeholder="Enter your password.">
                    <div class="underline"></div>
                </div>
                <div v-if="showSignup" class="input-field">
                    <input type="password" v-model="user.confirmPassword" name="password" placeholder="Confirm your password.">
                    <div class="underline"></div>
                </div>
                <div class="submit">
                    <button v-if="showSignup" type="submit" @click.prevent="signup">Register</button>
                    <button v-else type="submit" @click.prevent="signin">Login</button>
                </div>
            </div>
            <div class="form-footer">
                <a href @click.prevent="showSignup = !showSignup">
                    <span v-if="showSignup">You already have an account ?</span>
                    <span v-else>You don't have an account?</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {},
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-login {
    min-width: 350px;
    min-height: 40vh;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    background-color: white;
}

.auth-title {
    margin-bottom: 4rem;
    font-weight: 600;
    font-size: 2rem;
}

.input-field {
    position: relative;
    margin-bottom: 2.5rem;
}

.input-field .underline::before {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 1px;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
}

.input-field .underline::after {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 1px;
    left: 0;
    background: #000;
    transform: scale(0);
    transition: all 0.2s ease;
}

.input-field input:focus ~ .underline::after {
    transform: scale(1);
}

.input-field input {
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
    width: 16rem;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.submit button {
    background-color: black;
    color: #fff;
    width: 6.6rem;
    height: 2.2rem;
    border: none;
    border-radius: 8px;
}

.submit button:hover {
    box-shadow: 5px 5px 20px purple;
}

.form-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}

.form-footer span {
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    padding-top: 10px;
}
</style>