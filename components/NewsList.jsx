"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const NewsList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/data/data-news.json'); // Asegúrate de que la ruta sea correcta
            if (!response.ok) {
                console.error('Error al cargar los datos:', response.statusText);
                return;
            }
            const jsonData = await response.json();
            setData(jsonData);
        };
        fetchData();
    }, []);

    // Asegúrate de que data.categories está definido antes de usarlo
    const articles = data.categories ? data.categories.flatMap(category =>
        category.articles.map(article => ({
            ...article,
            category: category.name // Asignar el nombre de la categoría correctamente
        }))
    ) : [];

    return (
        <div className='index'>
            <h1>Noticias, Reseñas y Estrenos de Anime</h1>
            <ul className='index-article'>
                {articles.slice(0, 10).map(item => (  // Cambiado para usar articles
                    <li key={item.slug} className='index-article-content'>

                        <Link href={`/${item.category}/${item.slug}`} className='index-article-product'> {/* Asegurarse de que 'category' esté presente */}
                            <div className="index-img">
                                <img src={item.img} alt="Imagen" />
                            </div>

                            <div className="index-info">
                                <h2>{item.title}</h2>
                                <p>{item.content}</p>
                            </div>

                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;
