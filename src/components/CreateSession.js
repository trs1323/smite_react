
import md5 from 'md5';
import Axios from 'axios';

export default function CreateSession(api) {
    const devId = 3359;
    const authKey = 'A73937BDE832463B8251CFEE8FB45862';
    var dt = new Date();

    var timestamp = `${
        dt.getFullYear().toString().padStart(4, '0')}${
        (dt.getMonth() + 1).toString().padStart(2, '0')}${
        dt.getDate().toString().padStart(2, '0')}${
        dt.getUTCHours().toString().padStart(2, '0')}${
        dt.getUTCMinutes().toString().padStart(2, '0')}${
        dt.getUTCSeconds().toString().padStart(2, '0')}`;

    const signature = md5(`${devId}${api}${authKey}${timestamp}`)

    Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${api}json/${devId}/${signature}/${timestamp}`)
        .then(res => {
            console.log(res)
            var session = res.data.session_id.toString();
            console.log(session)
            return (session);
        })
        .catch(err => console.log(err))




}
