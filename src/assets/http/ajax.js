import $ from 'jquery'
function getcookie(c_name) {
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
};

const ajax = {
    baseURL: 'http://192.168.1.8:8080/shops/',
    post(url, data, callback) {
        console.log(getcookie('token'))
        console.log('post jq ')
        return $.ajax({
            type: 'post',
            data: data,
            dataType: "json",
            //  contentType:'application/json;charset=utf-8',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("token",getcookie('token'));
            },
            timeout: 3000,
            url: this.baseURL + url,
            complete: function (r) {
               // console.log(r)
                if (r.status == 200) {
                    callback && callback(r.responseJSON)
                } else {
                    console.error('请求错误');
                }

            }
        })
    },
    get() {
        console.log(getcookie('token'))
        $.ajax({
            type: 'get',
            data: data,
            timeout: 3000,
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("token",getcookie('token'));
            },
            url: this.baseURL + url,
            complete: function (r) {
                console.log(r.status)
                if (r.status == 200) {
                    r.done
                    callback && callback(r.responseJSON)
                } else {
                    console.error('请求错误');
                }
            }
        })
    }

}

export default ajax
