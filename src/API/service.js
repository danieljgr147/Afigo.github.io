export const Auth = async (usuario, contrasenna) => {
    const params = {
        nombre_de_usuario: usuario,
        contrasenia: contrasenna
    }

    const tok = await fetch("https://AfigoControl.somee.com/API/api/Auth/Login/", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json; charset=utf-8"
        }
    })

    const dataToken = await tok.json()

    if (dataToken.token != undefined) {
        sessionStorage.setItem('Token', 'Bearer ' + dataToken.token);
        return "Auntenticado"
    } else {
        return "Error"
    }
}

export const Send_Info = async (params) => {
    await fetch("https://AfigoControl.somee.com/API/api/sp/qt", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "Authorization": sessionStorage.getItem('Token')
        }
    })
}

export const Get_Info = async (params) => {

    const info = await fetch("https://AfigoControl.somee.com/API/api/sp/sqt", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "Authorization": sessionStorage.getItem('Token')
        }
    })

    const data = await info.json();


    return data;
}
