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

    registerUser = async ({email, username, password1, password2}) => {
        try {
            console.log({
                email,username,password1,password2
            })

            const {username: usern, password} = await axios.post(registerUrl, {
                email: email,
                username: username,
                password: password1,
                password2: password2
            })

            await this.loginUser({usern, password})
        } catch (ex) {
            console.log(ex.message)
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
            console.log(ex)
        }
    }
}