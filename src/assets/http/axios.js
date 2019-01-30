import http from 'axios';
import qs from 'qs';
/* 
    是：
*/
export default class server {
    constructor() {
        this.config = [
            'store/storeApplication.do'
        ]
        this.headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': this.getCookie('token')
        }
    }
    init() {
        this.http = http.create({
            baseURL: 'http://192.168.1.8:8080/shops/',  // 贾
            // baseURL: 'http://192.168.1.2:8080/shops/',  // 徐
            // baseURL: 'http://localhost:7007/',
            //timeout: 3000
            headers: this.headers,
        })
    }
  
    getCookie(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }
    post(url, data, callback) {
        this.isFile(url)
        this.http.post(url, this.params(data,url)).then(function (r) {
            if (r.status == 200) {
                callback && callback(r.data)
            }
        }).catch(function (err) {
            console.log(url + "接口报错" + err)
        })
    }
    get(url, data, callback) {
        this.isFile(url)
        this.http.get(url, {
            params: this.params(data,url)
        }).then(function (r) {
                //  console.log(r)
                if (r.status == 200) {
                    callback && callback(r.data)
                }

            })
            .catch(function (err) {
                console.log(url + "接口报错" + err)
            });
    }
    params(d,url){
        if (this.config.indexOf(url) != -1) { // 图片上传
            return d
        }else{
            var o = new URLSearchParams();
            for(let key in d){
                o.append(key, d[key]);
            }
            return o;
        }
       
    }
    isFile(url) {
        if (this.config.indexOf(url) != -1) { // 图片上传
            this.headers['Content-Type'] = 'multipart/form-data'
        }else{
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        this.init()
    }
}
