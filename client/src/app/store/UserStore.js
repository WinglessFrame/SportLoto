import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import {BASE_URL} from '../context'

const registerUrl = `${BASE_URL}/auth/register/`
const loginUrl = `${BASE_URL}/auth/token/`



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

    registerUser = async ({email, username, password1, password2}) => {
        try {
            await axios.post(registerUrl, {
                email: email,
                username: username,
                password: password1,
                password2: password2
            })
            const password = password1
            await this.loginUser({username, password})
        } catch (ex) {
            alert(ex.response.request.responseText)
        }
    }

    loginUser = async ({username, password}) => {
        try {
            const {data} = await axios.post(loginUrl, {
                username,
                password
            }) 
            this.user = data
        } catch (ex) {
            alert(ex.response.request.responseText)
        }
    }
}