import Header from '../layout/Header'
import Footer from '../layout/Footer'
import Slide from '../components/Slide'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


function Home() {
    // Hooks
    const [florerias, setFlorerias] = useState([])
    console.log(florerias);
    
    // florerias: contiene la información de las florerias
    // setFlorerias: va a definir el valor de 'florerias'

    // const jsonFlorerias = [
    //     {
    //         "idfloreria": 1,
    //         "nombre": "El  girasol",
    //         "ubicacion": "Av. La Luna",
    //         "telefono": "9998128712",
    //         "estatus": 1
    //     },
    //     {
    //         "idfloreria": 2,
    //         "nombre": "Los tulipanes",
    //         "ubicacion": "Av. 135",
    //         "telefono": "1234567890",
    //         "estatus": 1
    //     },
    //     {
    //         "idfloreria": 3,
    //         "nombre": "La mesa de madera",
    //         "ubicacion": "Av. Tulum",
    //         "telefono": "203232323",
    //         "estatus": 1
    //     },
    //     {
    //         "idfloreria": 4,
    //         "nombre": "La mesa de roble",
    //         "ubicacion": "Av. Holbox",
    //         "telefono": "1222345",
    //         "estatus": 1
    //     }
    // ]

    // setFlorerias(jsonFlorerias)
    console.log(florerias);
    // Mostrar la lista en consola
    // console.log(
    //     jsonFlorerias.map(e => ({ id: e.idfloreria, nombre: e.nombre }))
    // );

    useEffect(()=>{
        axios.get('http://localhost:3000/florerias')
        .then(res=>{
            setFlorerias(res.data)
        })
        .catch(error=>{
            console.error("Ha ocurrido un error");
            
        })
    },[])

    return (
        <>
            <Header />
            <main>
                <Slide />
                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        <h1 className="mb-3">Las florerias más populares</h1>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {
                                florerias.map((floreria) => (
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img src="src/assets/floreriaDefault.jpg" class="card-img-top" alt="Image description" width="100%" height="225"/>
                                            {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                                <title>Placeholder</title>
                                                <rect width="100%" height="100%" fill="#55595c" />
                                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                                            </svg> */}
                                            <div class="card-body">
                                                <h4>{floreria.nombre}</h4>
                                                <p class="card-text">
                                                    {floreria.ubicacion}
                                                    <br />
                                                    {"Tel. " + floreria.telefono}
                                                </p>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                                    </div>
                                                    <small class="text-body-secondary">9 mins</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            }



                        </div>
                    </div>
                </div>


            </main >
            <Footer />

        </>
    )
}

export default Home