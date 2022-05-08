import { get } from "../config"

export default {
    list() {
        return get("http://localhost:8080/notice/list?pageNo=1")
    },
}