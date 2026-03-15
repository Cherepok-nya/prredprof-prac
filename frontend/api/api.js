import axios, {AxiosError} from "axios";
import {message} from "antd";
import domain from "./domain.js";

const apiURL = "/api"

const api = axios.create({
    baseURL: apiURL,
    timeout: 10000,
    withCredentials: true,
})

api.interceptors.response.use(
    (res) => {
        return res
    },
    async function (error) {
        const status = error.response?.status;
        if (!status) {
            message.error("Нет подключения к серверу", 1);
            return Promise.resolve(null);
        }
        switch (status) {
            case 400:
                message.error("400 Некорректные данные", 1);
                break;
            case 401:
                if (error.request.responseURL === `${domain}${apiURL}/users/me`) {
                    return Promise.reject(error);
                }
                message.error("401 Ошибка авторизации", 1);
                break;
            case 403:
                message.error("403 Нехватка полномочий", 1);
                break;
            case 404:
                message.error("404 Не найдено", 1);
                break;
            default:
                message.error(`Неопознанная ошибка ${error.status}`, 1);

        }

        return Promise.resolve({
            data: null,
            status: status,
            headers: {},
            config: error.config,
        });
    }
)

export default api;