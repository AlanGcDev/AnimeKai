"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import data from '../public/data/data-news.json';

export default function NewsIndex() {
    const [latestItems, setLatestItems] = useState([]);

    useEffect(() => {
        // Aplanar artículos y añadir el nombre de la categoría a cada artículo
        const articles = data.categories ? data.categories.flatMap(category => 
            category.articles.map(article => ({
                ...article,
                categoryName: category.name // Asignar el nombre de la categoría
            }))
        ) : [];
        
        const sortedArticles = [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const latest = sortedArticles.slice(0, 3);
        setLatestItems(latest);
    }, []);

    return (
        <div className='news-container'>
            
            {latestItems.length === 0 ? (
                <div>Cargando...</div>
            ) : (
                <div className='latest-news'>
                    <h3>Últimas Noticias</h3>
                    {latestItems.map((item, index) => (
                        <div key={index} className='latest-news-content'>
                            <Link href={`/${item.categoryName}/${item.slug}`} > {/* Asegúrate de que 'categoryName' esté presente */}
                                <h4>{item.title}</h4>
                                <img src={item.img} alt="Imagen" />
                                <p>{item.content}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
