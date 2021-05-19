import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { useHistory } from 'react-router-dom'
import { BASE_URL } from '../context'

const registerUrl = `${BASE_URL}/auth/register/`
const loginUrl = `${BASE_URL}/auth/token/`
const updateUserInfoUrl = `${BASE_URL}/api/profile/`
const addBalanceUrl = `${BASE_URL}/api/balance/`


export class UserStore {
    constructor() {
        this.user = null
        makeAutoObservable(this)
    }

    getUser() {

    }

    logOut() {
        this.user = null
    }

    registerUser = async ({ email, username, password1, password2 }) => {
        try {
            await axios.post(registerUrl, {
                email: email,
                username: username,
                password: password1,
                password2: password2
            })
            const password = password1
            await this.loginUser({ username, password })
        } catch (ex) {
            alert(ex.response.request.responseText)
        }
    }

    loginUser = async ({ username, password }) => {
        try {
            const { data } = await axios.post(loginUrl, {
                username,
                password
            })
            this.user = data
        } catch (ex) {
            alert(ex.response.request.responseText)
        }
    }

    updateUserInfo = async ({ first_name, last_name, email }) => {
        try {
            const newUserData = await axios.put(updateUserInfoUrl, {
                first_name,
                last_name,
                email
            },
                {
                    headers: {
                        "Authorization": `JWT ${this.user.token}`
                    }
                }
            )
            console.log(newUserData);
            this.user = {...this.user, ...newUserData.data}

        } catch (ex) {
            alert(ex.response.request.responseText)
        }
    }

    addToBalance = async ({ adding }) => {
        if (adding <= 0) {
            alert(`Enter positive number`)
            return
        }
        try {
            const response = await axios.post(addBalanceUrl, {
                adding
            }, {
                headers: {
                    "Authorization": `JWT ${this.user.token}`
                }
            })
            const balance = response.data.balance
            this.user.balance = balance
        } catch (ex) {
            console.log(ex.response)
        }

    }

}

