import axios from "axios";

const apiURL = "http://206.189.130.102:5050/api/hr-management-user";

const axiosApiInstance = axios.create({ baseURL: apiURL });

export const interceptor = () => {
    axiosApiInstance.interceptors.request.use(
        async (config) => {
            const token = sessionStorage.getItem("token");

            config.headers = {
                Accept: "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            };

            return config;
        },
        (error) => Promise.reject(error)
    );
};

const callAPI = {
    get: async (url, data) => {
        try {
            const response = await axiosApiInstance.get(url, { params: data });
            return response;
        } catch (error) {
            return callAPI.catchError(error);
        }
    },

    post: async (url, data) => {
        try {
            const response = await axiosApiInstance.post(url, data);
            return response;
        } catch (error) {
            return callAPI.catchError(error);
        }
    },

    del: async (url, data) => {
        try {
            const response = await axiosApiInstance.delete(url, { data });
            return response;
        } catch (error) {
            return callAPI.catchError(error);
        }
    },

    delWithParams: async (url, data) => {
        try {
            const response = await axiosApiInstance.delete(url, { params: data });
            return response;
        } catch (error) {
            return callAPI.catchError(error);
        }
    },

    patch: async (url, data) => {
        try {
            const response = await axiosApiInstance.patch(url, data);
            return response;
        } catch (error) {
            return callAPI.catchError(error);
        }
    },

    put: async (url, data) => {
        try {
            const response = await axiosApiInstance.put(url, data);
            return response;
        } catch (error) {
            return callAPI.catchError(error);
        }
    },

    catchError: (error) => {
        const response = error.response || {};
        const message = response.data?.message || "Something went wrong.";
        return { message, status: response.status || 500 };
    },
};

export default callAPI;
