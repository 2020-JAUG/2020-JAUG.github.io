import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Top = () => {

    //Hook inicial para la paginación
    const [page, setPage] = useState(1);
    const [oldpage, setOldPage] = useState(1);
    const [movies, setFilms] = useState([]);

    //useEffect...estados...

    useEffect(()=>{

        //traemos las películas por primera vez
        bringFilms();

    },[]);

    useEffect(()=> {

        if(page !== oldpage){
            setOldPage(page);
            bringFilms();
        }

    })

    const bringFilms = async () => {

        try {
            console.log("estamos en la página....",page);
            let res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&page=${page}`);
            setFilms(res.data.results);

        } catch (error) {
            console.log(error);
        }
    }

    const changePage = (operacion) => {

        if(operacion === "+"){

            //Cambiamos la página
            let newPage = page + 1;

            setOldPage(page);
            setPage(newPage);


        } else if (operacion === "-" && page > 1) {

            let newPage = page - 1;
            setOldPage(page);
            setPage(newPage);
        }

    }

    if(movies[0]?.id !== 0){

        return(
            <div className="vistaPaginacion">
                <div className="boton" onClick={()=> changePage("-")}>ANTERIOR</div>
                <div className="contenedorFilms">
                    {movies.map((pelicula,index) => {
                        return (
                            <div key={index}>{pelicula.title}</div>
                        )
                    })}
                </div>
                <div className="boton" onClick={()=> changePage("+")}>SIGUIENTE</div>
            </div>
        )

    }else{
        return(
            <div>
                Soy Top y estoy cargando las películas
            </div>
        )
    }
}

export default Top;