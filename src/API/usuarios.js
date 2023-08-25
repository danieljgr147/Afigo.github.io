export const All = async () => {

    const info = await fetch("https://AfigoControl.somee.com/API/api/user/All", {
        method: 'GET',
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "Authorization": sessionStorage.getItem('Token')
        }
    })

    const data = await info.json();

    console.log(data)

    return data;
}

export const One = async (params) => {

    const info = await fetch("https://AfigoControl.somee.com/API/api/user/One", {
        method: 'GET',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "Authorization": sessionStorage.getItem('Token')
        }
    })

    const data = await info.json();


    return data;
}

export const Create = async (params) => {
    console.log(params)
    await fetch("https://AfigoControl.somee.com/API/api/user/create", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "Authorization": sessionStorage.getItem('Token')
        }
    })
}

export const Update = async (params) => {
    await fetch("https://AfigoControl.somee.com/API/api/user/update", {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "Authorization": sessionStorage.getItem('Token')
        }
    })
}

export const Delete = async (params) => {
    await fetch("https://AfigoControl.somee.com/API/api/user/delete", {
        method: 'DELETE',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "Authorization": sessionStorage.getItem('Token')
        }
    })
}
