function axios ({
    url,
    method= 'GET',
    params= {},
    data= {}
}){

    return new Promise((resolve,reject) => {

        method = method.toUpperCase();

        url = normalizedParams(url,params);
        console.log('url ',url)
        const request = new XMLHttpRequest();

        request.open(method,url,true);

        if (method === 'GET' || method === 'DELETE') {
            request.send()
        }

        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            request.setRequestHeader('Content-Type','application/json;charset=utf-8');
            request.send(JSON.stringify(data))
        }

        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;

            // 如果響應狀態碼在 (200 ~ 300) 之間代表成功,否則失敗
            const {status, statusText} = request;

            if (status >= 200 && status <= 299) {

                const res = {
                    data: JSON.parse(request.response),
                    status,
                    statusText
                }

                resolve(res);
            }else {
                reject(new Error('request error status is ' + status));
            }
        }
    })

}

// utils //
function normalizedParams (url,params) {
    var queryString = '';

    Object.keys(params).forEach(key => {
        queryString = `${key}=${params[key]}&`
    })

    if (queryString) {

        queryString = queryString.substring(0,queryString.length - 1);

        url += '?' + queryString
    }

    return url;
}

// test // 
function getRequest () {
    axios({
        url: 'https://jsonplaceholder.typicode.com/posts',
        params: {
            userId: 1
        }
    }).then((res,err) => {
        console.log('res ',res)
        console.log('err ',err)
    })
}

function postRequest () {
    axios({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'post',
        data: {
            title: 'new post 1'
        }
    }).then((res,err) => {
        console.log('res ',res)
        console.log('err ',err)
    })
}

function putRequest () {
    axios({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'put',
        data: {
            title: 'update post 1'
        }
    }).then((res,err) => {
        console.log('res ',res)
        console.log('err ',err)
    })
}

function patchRequest () {
    axios({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'patch',
        data: {
            title: 'update post 1 with patch'
        }
    }).then((res,err) => {
        console.log('res ',res)
        console.log('err ',err)
    })
}

function deleteRequest () {
    axios({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'delete',
    }).then((res,err) => {
        console.log('res ',res)
        console.log('err ',err)
    })
}