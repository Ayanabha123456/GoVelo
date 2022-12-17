import axios from 'axios';

export async function checkToken(config, callback, errorcallback){
    console.log("in check token")
    console.log(config)
    await axios.post("http://127.0.0.1:8000/api/token/verify/", config)
    .then(res => {
      console.log(res.statusText)
    if(callback != null){
        callback(res);
     }
    })
    .catch(err => {
      console.log(err)

    if(errorcallback != null){
      errorcallback(err);
    }
  })
}
export default checkToken;
