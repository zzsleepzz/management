import { defineStore } from "pinia";

export default defineStore("test", {
  state() {
    return {
      msg: "???",
    };
  },
  actions: {
    toggleMsg() {
      if (this.msg === "???") this.msg = "!!!";
      else this.msg = "???";
    },
  },
});
