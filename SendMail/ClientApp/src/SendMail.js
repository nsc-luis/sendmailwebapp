import React, { Component } from 'react';
import './components/SendMail.css';
import axios from 'axios';

export default class SendMail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objeto: {}
        }
    }

    componentDidMount() {
        this.setState({
            objeto: {
                ...this.state.objeto,
                smtpServer: "smtp.gmail.com",
                puerto: "587",
                remitente: "luis.gera.rdz@gmail.com",
                password: "",
                encriptacion: "true",
                formato: "false",
                destinatario: "cartasdirector@autolineasvillarreal.com.mx",
                asunto: "Correo de prueba a cartasdirector@autolineasvillarreal.com.mx",
                mensaje: "Solo prueba"
            }
        })
    }

    handle_onChange = (e) => {
        this.setState({
            objeto: {
                ...this.state.objeto,
                [e.target.name]: e.target.value
            }
        })
    }

    enviar = (e) => {
        e.preventDefault();
        console.log(this.state.objeto);
        axios.post('/api/SendMail', this.state.objeto)
            .then(res => {
                alert("Status: " + res.data.status + "\nMensaje: " + res.data.mensaje);
            });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Formulario de prueba para envio de correo </h1>
                <h5>Aplicación web .NET Core, C#, ReactJS </h5>
                <hr />
                <strong>Descripción: </strong> <br />
                Para envio a buzón: cartasdirector@autolineasvillarreal.com.mx
                <hr />

                <section>
                    <p><strong>Parametros: </strong></p>
                    <form onSubmit={this.enviar}>

                        <label>Servidor SMTP:</label>
                        <input
                            type="text"
                            name="smtpServer"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.smtpServer}
                        /> <br />

                        <label>Puerto:</label>
                        <input
                            type="text"
                            name="puerto"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.puerto}
                        /> <br />

                        <label>Remitente:</label>
                        <input
                            type="text"
                            name="remitente"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.remitente}
                        /> <br />

                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.password}
                        /> <br />

                        <label>Encriptación:</label>
                        <select
                            name="encriptacion"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.encriptacion}
                        >
                            <option value="true">SSL/TLS</option>
                            <option value="false">NO</option>
                        </select> <br />

                        <label>Formato:</label>
                        <select
                            name="formato"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.formato}
                        >
                            <option value="false">Texto</option>
                            <option value="true">HTML</option>
                        </select>
                        <hr />

                        <p><strong>Mensaje: </strong></p>
                        <label>Destinatario(s):</label>
                        <input
                            type="text"
                            name="destinatario"
                            className="emailText"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.destinatario}
                        /> <br />

                        <label>Asunto:</label>
                        <input
                            type="text"
                            name="asunto"
                            className="emailText"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.asunto}
                        /> <br />

                        <label>Mensaje:</label>
                        <textarea
                            name="mensaje"
                            className="emailText"
                            onChange={this.handle_onChange}
                            value={this.state.objeto.mensaje}
                        ></textarea> <br /> <br />

                        <button type="submit">Enviar</button>
                    </form>
                </section>
                <hr />
            </React.Fragment>
        );
    }
}