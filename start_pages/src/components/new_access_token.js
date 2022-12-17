import axios from 'axios';

export function newAccessToken(config, callback, errorcallback){
    axios.post("http://127.0.0.1:8000/api/token/refresh/", config)
    .then(res => {
      console.log(res)
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
export default newAccessToken;
