import Axios from "axios";

interface IUsers {
  name: string;
  username: string;
  email: string;
  phone: string;
  id?: string;
}

const AxiosConfig = () => {
  let instance = Axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 30 * 1000,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error.response);
    }
  );

  return instance;
};

export function HTTPGetUsers(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosConfig().get("/users");
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPAddUsers(param: IUsers): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosConfig().post("/users", {
        name: param.name,
        username: param.username,
        email: param.email,
        phone: param.phone,
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPEditUsers(param: IUsers): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosConfig().put(`/users/${param.id}`, {
        name: param.name,
        username: param.username,
        email: param.email,
        phone: param.phone,
      });
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}

export function HTTPDeleteUsers(param: { id: string }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosConfig().delete(`/users/${param.id}`);
      return resolve(response);
    } catch (error: any) {
      return reject(error);
    }
  });
}
