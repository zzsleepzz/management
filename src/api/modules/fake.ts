import { get } from "../config"

export default {
    gFake() {
        return get<{ code: number, data: {} }>("fakeuri")
    },
    userList() {
        return get<{ code: number, data: {} }>("localhost:8080/user/list?pageNo=1")
    }
}