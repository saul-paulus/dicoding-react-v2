const BASE_URL = 'https://notes-api.dicoding.dev/v1';

const getAccessToken = ()=>{
    return localStorage.getItem('accessToken');
}

const putAccessToken = (token)=> {
    return localStorage.setItem('accessToken',token);
}

const fetchWithToken = async (url, option ={}) =>{
    return fetch(url, {
        ...option,
        headers: {
            ...option.headers,
            Authorization: `Bearer ${getAccessToken()}`
        }
    });
}

const authLogin = async ({email,password}) =>{
    const response = await fetch(`${BASE_URL}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    });


    const responseJson =  await response.json();

    if(responseJson.status !== 'success'){
        alert(responseJson.message);
        return {error: true,data: null};
    }

    return {error: false, data: responseJson.data};
} 

