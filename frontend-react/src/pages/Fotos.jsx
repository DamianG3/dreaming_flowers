import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";

function Fotos() {
    const [ archivo, setArchivo ] = useState(null);
    const [ cargando, setCargando ] = useState(false);

    const subirFoto = async() => {
        if(!archivo) {
            console.log("No se ha seleccionado una imagen");
            return;
        }

        const datosFormulario = new FormData()
        datosFormulario.append('file', archivo)
        try{
            setCargando(true);
            const respuesta = await axios.post('http://localhost:3000/procesar-foto',datosFormulario,
                {
                    'Content-Type': 'multipart/form-data'
                }
            )
        } catch (error){
            console.log('Hubo un error al subir la foto', error);
        } finally {
            setCargando(false)
        }
    }


    const cargarArchivo = (event) => {
        setArchivo(event.target.files[0])
        // setArchivo("nombre del archivo");   
    }


    return (
        <>
            <Header />
            <main>
                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        <h1>Subir foto</h1>
                        <input type="file" onChange={cargarArchivo}/>
                        <button onClick={subirFoto} disabled={cargando}>
                            {cargando ? "Subiendo..." : "Subir Foto"}
                        </button>
                    </div></div>
            </main>
            <Footer />
        </>
    )
}

export default Fotos