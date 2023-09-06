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
        sessionStorage.setItem('id_usuario', dataToken.id_Usuario);
        sessionStorage.setItem('Token', 'Bearer ' + dataToken.token);
        return "Auntenticado"
    } else {
        return "Error"
    }
}

//get session storage