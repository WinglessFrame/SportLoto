import { makeAutoObservable } from "mobx";
import { UserStore } from "./UserStore";

class RootStore {
    constructor() {
        this.userStore = new UserStore()
        makeAutoObservable(this)
    }   
}

export const rootStore = new RootStore() 