'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function Search() {
    const [termino, setTermino] = useState('');
    const [resultados, setResultados] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [data, setData] = useState([]); // Estado para almacenar los datos cargados
    const router = useRouter();
    const searchRef = useRef(null);

    // Función para cargar datos del JSON
    const fetchData = async () => {
        const response = await fetch('/data/data-news.json'); // Asegúrate de que la ruta sea correcta
        if (!response.ok) {
            console.error('Error al cargar los datos:', response.statusText);
            return;
        }
        const jsonData = await response.json();
        const articlesWithCategory = jsonData.categories.flatMap(category => 
            category.articles.map(article => ({
                ...article,
                category: category.name // Asignar el nombre de la categoría correctamente
            }))
        );
        console.log("Articles with category:", articlesWithCategory); // Añadir verificación
        setData(articlesWithCategory); // Aplanar la estructura de datos
    };

    useEffect(() => {
        fetchData();
    }, []);

    const buscar = (valor) => {
        const valorBusqueda = valor.toLowerCase();
        const resultadosBusqueda = data.filter((pagina) => {
            console.log("Filtering page:", pagina); // Añadir verificación
            return (
                pagina.title.toLowerCase().includes(valorBusqueda) ||
                pagina.category.toLowerCase().includes(valorBusqueda) ||
                (pagina.tags && pagina.tags.some((tag) => tag.toLowerCase().includes(valorBusqueda)))
            );
        });
        setResultados(resultadosBusqueda);
    };

    const manejarCambio = (e) => {
        const valor = e.target.value;
        setTermino(valor);
        buscar(valor);
        setMostrarResultados(true);
    };

    const manejarEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (resultados.length > 0) {
                console.log("Navigating to:", `/${resultados[0].category}/${resultados[0].slug}`); // Añadir verificación
                router.push(`/${resultados[0].category}/${resultados[0].slug}`); // Usar slug para la redirección
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setMostrarResultados(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setMostrarResultados(true);
    };

    return (
        <div className='Search' ref={searchRef}>
            <div className="search-content">
                <input
                    type="text"
                    value={termino}
                    onChange={manejarCambio}
                    onKeyDown={manejarEnter}
                    onFocus={handleFocus}
                    placeholder="Buscar..."
                />
                <span><Icon icon="mingcute:search-fill" /></span>
            </div>
            {mostrarResultados && (
                <ul className='search-resultados'>
                    {resultados.length > 0 ? (
                        resultados.map((resultado) => (
                            <li key={resultado.slug}>
                                <Link href={`/${resultado.category}/${resultado.slug}`}>
                                    <div>
                                        <div>
                                            <img src={resultado.img} alt="imagen" />
                                        </div>
                                        <h1>{resultado.title}</h1>
                                        <p>{resultado.content}</p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>No Hay Resultados</li>
                    )}
                </ul>
            )}
        </div>
    );
}
