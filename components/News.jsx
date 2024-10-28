"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import data from '../public/data/data-news.json';

export default function News() {
    const pathname = usePathname();
    const slug = pathname.split('/').pop(); // Obtiene el slug de la URL
    const [currentItem, setCurrentItem] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const [latestItems, setLatestItems] = useState([]);

    useEffect(() => {
        if (!slug) {
            console.log("Slug no disponible todavía");
            return;
        }
        // Buscar el artículo en todas las categorías
        const allArticles = data.categories.flatMap(category => category.articles.map(article => ({
            ...article,
            category: category.name // Asignar el nombre de la categoría correctamente
        })));
        const item = allArticles.find(item => item.slug === slug);
        if (item) {
            setCurrentItem(item);
            // Encontrar artículos relacionados por categoría y ordenarlos por fecha de creación
            const related = allArticles
                .filter(i => i.category === item.category && i.slug !== slug)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5); // Limitar a 5 artículos
            setRelatedItems(related);
        }
    }, [slug]);

    useEffect(() => {
        const allArticles = data.categories.flatMap(category => category.articles.map(article => ({
            ...article,
            category: category.name // Asignar el nombre de la categoría correctamente
        })));
        const latest = allArticles.slice(-3); // Obtener los 3 últimos artículos
        setLatestItems(latest);
    }, []);

    if (!currentItem) {
        return <div>Cargando...</div>;
    }

    // Obtener la categoría del artículo actual
    const category = data.categories.find(cat =>
        cat.articles.some(article => article.slug === currentItem.slug)
    );

    // Verificamos si encontramos la categoría
    if (!category) {
        console.error("Categoría no encontrada para el artículo", currentItem);
        return <div>Artículo no encontrado o categoría no disponible.</div>;
    }

    return (
        <div className='news-container'>
            <div>
                <span className='news-navegator'>
                    <Link href="/">Inicio</Link> - 
                    <Link href={`/${category.name}`}> {category.name} </Link> - 
                    <p>{currentItem.title}</p>
                </span>
            </div>
            <div className='latest-news'>
                <h3>Últimas Noticias:</h3>
                {latestItems.map((item, index) => (
                    <div key={index} className='latest-news-content'>
                        <Link href={`/${item.category}/${item.slug}`}>
                            <h4>{item.title}</h4>
                            <img src={item.img} alt="Imagen" />
                            <p>{item.content}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='latest-news'>
                <h3>Artículos relacionados:</h3>
                {relatedItems.map((item, index) => (
                    <div key={index} className='latest-news-content'>
                        <Link href={`/${item.category}/${item.slug}`}>
                            <h4>{item.title}</h4>
                            <img src={item.img} alt="Imagen" />
                            <p>{item.content}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
