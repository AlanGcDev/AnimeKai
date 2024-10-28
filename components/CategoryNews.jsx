"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import data from '../public/data/data-news.json';

export default function CategoryNews({ category }) {
    const [articles, setArticles] = useState([]);
    const [latestItems, setLatestItems] = useState([]);

    useEffect(() => {
        console.log("Category received:", category);
        const categoryData = data.categories.find(cat =>
            cat.name.toLowerCase() === (category || '').toLowerCase()
        );

        if (categoryData) {
            // Añadir la categoría a cada artículo
            const articlesWithCategory = categoryData.articles.map(article => ({
                ...article,
                category: categoryData.name // Aseguramos que cada artículo tenga la categoría
            }));
            setArticles(articlesWithCategory);
        } else {
            setArticles([]);
        }
    }, [category]);

    useEffect(() => {
        // Obtener los últimos 3 artículos con sus categorías
        const allArticlesWithCategories = data.categories.flatMap(cat =>
            cat.articles.map(article => ({
                ...article,
                category: cat.name // Añadir la categoría a cada artículo
            }))
        );

        // Ordenar por fecha de creación y tomar los últimos 3
        const sortedArticles = allArticlesWithCategories
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

        setLatestItems(sortedArticles);
    }, []);

    if (!category) {
        return <div>Categoría no especificada</div>;
    }

    if (articles.length === 0) {
        return <div>No hay artículos en esta categoría.</div>;
    }

    return (
        <div className='news-container'>
            <div className='latest-news'>
                <h3>Últimas Noticias:</h3>
                {latestItems.map((item, index) => (
                    <div key={`latest-${item.slug}-${index}`} className="latest-news-content">
                        <Link href={`/${item.category}/${item.slug}`}>
                            <h4>{item.title}</h4>
                            <img src={item.img} alt="" />
                            <p>{item.content.substring(0, 100)}...</p>
                            <small>Categoría: {item.category}</small>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='latest-news'>
                <h3>Artículos en la categoría: {category}</h3>
                {articles.map((item, index) => (
                    <div key={`category-${item.slug}-${index}`} className="latest-news-content">
                        <Link href={`/${item.category}/${item.slug}`}>
                            <h4>{item.title}</h4>
                            <img src={item.img} alt="Imagen" />
                            <p>{item.content.substring(0, 100)}...</p>
                            <small>Categoría: {item.category}</small>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
