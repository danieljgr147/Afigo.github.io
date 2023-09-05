import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Create, Update } from '../../API/usuarios'


function AddEditForm(props) {
    const [usuario, setUsuario] = useState({
        user_id: 0,
        nombre: "",
        direccion: "",
        usuario_admin: 0,
        nombre_de_usuario: "",
        contrasenia: ""
    });
 
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    const submitFormAdd = async (e) => {
        e.preventDefault();
        const params = {
            direccion: e.target.direccion.value,
            nombre: e.target.nombre.value,
            usuario_admin: parseInt(e.target.usuario_admin.value),
            nombre_de_usuario: e.target.nombre_de_usuario.value,
            contrasenia: e.target.contrasenia.value
        };

        await Create(params)
        props.addItemToState();
        props.toggle()


    };

    const submitFormEdit = async (e) => {
        e.preventDefault();
        const params = {
            user_id:  parseInt(e.target.user_id.value),
            direccion: e.target.direccion.value,
            nombre: e.target.nombre.value,
            usuario_admin: parseInt(e.target.usuario_admin.value),
            nombre_de_usuario: e.target.nombre_de_usuario.value,
            contrasenia: e.target.contrasenia.value
        };

        await Update(params)
        props.updateState()
        props.toggle()

    };

    useEffect(() => {
        if (props.item) {
            const { user_id, nombre, direccion, usuario_admin, nombre_de_usuario, contrasenia } = props.item;
            setUsuario({ user_id, nombre, direccion, usuario_admin, nombre_de_usuario, contrasenia });
        }
    }, [props.item]);

    return (
        <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
            <Input
                type="text"
                name="Id user_id"
                id="user_id"
                onChange={onChange}
                value={usuario.user_id === null ? "" : usuario.user_id}
                style={{ display: 'none' }}
            />
            <FormGroup>
                <Label for="nombre">nombre</Label>
                <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    onChange={onChange}
                    value={usuario.nombre === null ? "" : usuario.nombre}
                />
            </FormGroup>
            <FormGroup>
                <Label for="direccion">direccion</Label>
                <Input
                    type="text"
                    name="direccion"
                    id="direccion"
                    onChange={onChange}
                    value={usuario.direccion === null ? "" : usuario.direccion}
                />
            </FormGroup>
            <FormGroup>
                <Label for="usuario_admin">usuario_admin</Label>
                <select
                    name="usuario_admin"
                    id="usuario_admin"
                    onChange={onChange}
                    value={usuario.usuario_admin === null ? "" : usuario.usuario_admin}
                >
                    <option value="0">No</option>
                    <option value="1">Si</option></select>
            </FormGroup>
            <FormGroup>
                <Label for="nombre_de_usuario">nombre_de_usuario</Label>
                <Input
                    type="text"
                    name="nombre_de_usuario"
                    id="nombre_de_usuario"
                    onChange={onChange}
                    value={usuario.nombre_de_usuario === null ? "" : usuario.nombre_de_usuario}
                />
            </FormGroup> 
            <FormGroup>
                <Label for="contrasenia">contrasenia</Label>
                <Input
                    type="text"
                    name="contrasenia"
                    id="contrasenia"
                    onChange={onChange}
                    value={usuario.contrasenia === null ? "" : usuario.contrasenia}
                />
            </FormGroup>
            <Button>Agregar</Button>
        </Form>
    );
}

export default AddEditForm;
