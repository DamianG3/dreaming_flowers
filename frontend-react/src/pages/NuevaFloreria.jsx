import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useState } from 'react';

export default function NuevaFloreria(){
    const [floreria, setFloreria] = useState({
        "nombre": "",
        "ubicacion": "",
        "telefono": ""
      })

    const capturaDatos = (e) => {
        const {name, value} = e.target;
        setFloreria(
            {
                ...floreria, [name]: value
                // ... : means the value is being added to that's already in it
            }
        )
    }

    const limpiarForm = (e) => {
        e.preventDefault(); // Prevents page reload
        setFloreria({
            "nombre": "",
            "ubicacion": "",
            "telefono": ""
        })
    }

    const guardarFloraria = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/guardar', floreria)
        .then(response=>{
            console.log(response.data);
            mostrarMensaje(response.data, 'success');
            limpiarForm(e);
        })
        .catch(error=>{
            console.log(error);
            mostrarMensaje("Algo salió mal!", 'error');
        })
    }

    const mostrarMensaje = (mensaje, tipo) => {
        withReactContent(Swal).fire({
            position: "top-end",
            icon: tipo,
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    }


    console.log(floreria);
    
    return (
        <>
            <Header />
            <main>
                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        <h1>Nueva Florería</h1>
                        <form onSubmit={guardarFloraria}>
                            <div className="mb-3">
                                <label className="form-label">Nombre de la Floreria</label>
                                <br />
                                <input type="text" name="nombre" id="" className="form-control" placeholder="Ingresa un nombre"
                                onChange={capturaDatos} value={floreria.nombre} required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ubicación</label>
                                <br />
                                <input type="text" name="ubicacion" id="" className="form-control" placeholder="Ingresa una dirección"
                                onChange={capturaDatos} value={floreria.ubicacion} required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <br />
                                <input type="text" name="telefono" id="" className="form-control" placeholder="Ingresa un número telefónico"
                                onChange={capturaDatos} value={floreria.telefono}/>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Guardar</button>
                                <button type="reset" className="btn btn-secondary  mx-2" onClick={limpiarForm}>Limpiar</button>
                            </div>
                        </form>
                    </div>
                </div>


            </main>
            <Footer />
        </>
    )

}