import data from '../../public/data/data-news.json';
import Link from 'next/link';
import CategoryNews from '@/components/CategoryNews';

// El componente debe ser un Server Component, no uses "use client"
const CategoryPage = async ({ params }) => {
    // Asegúrate de que params esté awaited
    const { category } = await params; // Captura la categoría de los parámetros
    
    // Filtra los artículos de la categoría
    const categoryData = data.categories.find(cat => cat.name === category);
    const articles = categoryData ? categoryData.articles : [];

    if (articles.length === 0) {
        return <div>No hay artículos en esta categoría.</div>;
    }

    return (
        <>
            <div className='container'>
                <h1>Artículos en la categoría: {category}</h1>
                <ul className='index-article'>
                    {articles.map((article, index) => (
                        <li key={index} className='index-article-content'>
                            <Link href={`/${category}/${article.slug}`} className='index-article-product'> {/* Asegurarse de que 'category' esté presente */}
                            <div className="index-img">
                                <img src={article.img} alt="Imagen" />
                            </div>

                            <div className="index-info">
                                <h2>{article.title}</h2>
                                <p>{article.content}</p>
                            </div>

                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <CategoryNews category={category} />
        </>
    );
};

// Genera las rutas estáticas
export async function generateStaticParams() {
    const categories = data.categories.map(category => category.name); // Extrae los nombres de las categorías
    return categories.map(category => ({ category }));
}

export async function generateMetadata({ params }) {
    const { category } = await params; // Captura la categoría
    const articles = data.categories.find(cat => cat.name === category)?.articles || [];
    const AnimeKai = "AnimeKai - ";

    return {
        title: articles.length > 0 ? `${AnimeKai}${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}` : 'Categoría no encontrada',
        description: articles.length > 0 ? articles[0].content.substring(0, 150) : 'Descripción no disponible',
    };
}

export default CategoryPage;
