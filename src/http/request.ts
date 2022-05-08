import axios from "./axios";

//get
export const GET = (path: string, data: any) => {
  return axios({
    url: path,
    method: "get",
    data,
    config: {
      timeout: 6000,
    },
  });
};
//post
export const POST = (path: string, data: any) => {
  return axios({
    url: path,
    method: "post",
    data,
    config: {
      timeout: 6000,
    },
  });
};
