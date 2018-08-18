import axios from "axios";
import cryptoJS from "crypto-js";

const publicKey = "5519c633b7affff5c6a6021202fe5164";
const privateKey = "3f9aadb78de8ef87a63cfe8bd77411ed25e3178a";
const ts = new Date().getTime();
const hash = cryptoJS.MD5(ts + privateKey + publicKey).toString();

const instance = axios.create({
    baseURL: `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`
});

export default instance;