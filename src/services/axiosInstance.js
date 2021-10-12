import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast("Wow so easy !");

const token = localStorage.getItem('token');

// if (
//     window.location.protocol !== 'https:' &&
//     process.env.NODE_ENV === 'production' &&
//     window.location.hostname !== 'localhost' &&
//     window.location.hostname !== '127.0.0.1'
// ) {
//     window.location.replace(
//         `https:${window.location.href.substring(window.location.protocol.length)}`
//     );
// }

export const axiosApi = Axios.create({
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:3001',
    timeout: 240000,
    headers: {
        'x-access-token': token ?? "",
        "Content-Type": "application/json",
    }
});

export const viaCep = Axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 240000,
    headers: { "Content-Type": "application/json" },
});


export const errorInterceptor = axiosApi.interceptors.response.use(
    function (response) {
        return response;
    }, async function (error) {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.reload();
        }
        else if (error.response.data.message) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            toast.error(`Algo não saiu como o esperado.`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
