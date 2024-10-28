import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import News from '@/components/News';
import Countdown from '@/components/Countdown';
import ArticleClient from '@/components/ArticleClient'; // Importa el componente cliente
import Link from 'next/link';

const Article = ({ article }) => {
  if (!article) {
    return <div>No se encontró el artículo.</div>;
  }

  const renderArticle = (article) => {
    const topArticle = [
      { title: article.contentTitle1, text: article.contentText1, img: article.contentImg1, alt: article.contentAlt1},
      { title: article.contentTitle2, text: article.contentText2, img: article.contentImg2, alt: article.contentAlt2 },
      { title: article.contentTitle3, text: article.contentText3, img: article.contentImg3, alt: article.contentAlt3 },
      { title: article.contentTitle4, text: article.contentText4, img: article.contentImg4, alt: article.contentAlt4 },
      { title: article.contentTitle5, text: article.contentText5, img: article.contentImg5, alt: article.contentAlt5 },
    ];

    return topArticle.map((section, index) => (
      section.title && section.text ? (
        <article key={index} className='slug-article'>
          <h2>{section.title}</h2>
          <img src={section.img} alt={section.alt} />
          <p>{section.text}</p>
        </article>
      ) : null
    ));
  };

  const renderTopLinks = (article) => {
    const topSections = [
      { title: article.contentTitleTop1, text: article.contentTextTop1, img: article.contentImgTop1, alt: article.contentAltTop1, link: article.contentLinkTop1 },
      { title: article.contentTitleTop2, text: article.contentTextTop2, img: article.contentImgTop2, alt: article.contentAltTop2, link: article.contentLinkTop2 },
      { title: article.contentTitleTop3, text: article.contentTextTop3, img: article.contentImgTop3, alt: article.contentAltTop3, link: article.contentLinkTop3 },
      { title: article.contentTitleTop4, text: article.contentTextTop4, img: article.contentImgTop4, alt: article.contentAltTop4, link: article.contentLinkTop4 },
      { title: article.contentTitleTop5, text: article.contentTextTop5, img: article.contentImgTop5, alt: article.contentAltTop5, link: article.contentLinkTop5 },
      { title: article.contentTitleTop6, text: article.contentTextTop6, img: article.contentImgTop6, alt: article.contentAltTop6, link: article.contentLinkTop6 },
      { title: article.contentTitleTop7, text: article.contentTextTop7, img: article.contentImgTop7, alt: article.contentAltTop7, link: article.contentLinkTop7 },
      { title: article.contentTitleTop8, text: article.contentTextTop8, img: article.contentImgTop8, alt: article.contentAltTop8, link: article.contentLinkTop8 },
      { title: article.contentTitleTop9, text: article.contentTextTop9, img: article.contentImgTop9, alt: article.contentAltTop9, link: article.contentLinkTop9 },
      { title: article.contentTitleTop10, text: article.contentTextTop10, img: article.contentImgTop10, alt: article.contentAltTop10, link: article.contentLinkTop10 },
      { title: article.contentTitleTop11, text: article.contentTextTop11, img: article.contentImgTop11, alt: article.contentAltTop11, link: article.contentLinkTop11 },
      { title: article.contentTitleTop12, text: article.contentTextTop12, img: article.contentImgTop12, alt: article.contentAltTop12, link: article.contentLinkTop12 },
      { title: article.contentTitleTop13, text: article.contentTextTop13, img: article.contentImgTop13, alt: article.contentAltTop13, link: article.contentLinkTop13 },
    ];

    return topSections.map((section, index) => (
      section.title && section.text ? (
        <Link key={index} href={section.link || '#'} className='slug-article'>
          <h2>{section.title}</h2>
          <img src={section.img} alt={section.alt} />
          <p>{section.text}</p>
        </Link>
      ) : null
    ));
  };

  return (
    <>
    <div className='container'>
      <div className="slug-container">
        <div className="slug-title">
          <h1>{article.title}</h1>
          <img src={article.img} alt={article.title} />
        </div>

        <div className="slug-resumen">
          <p>{article.content}</p>
        </div>

        {renderArticle(article)}
        {renderTopLinks(article)}

        {/* Componente cliente para manejar enlaces */}
        <ArticleClient article={article} />

        {article.releaseDate && <Countdown releaseDate={article.releaseDate} />}
      </div>
      
    </div>
    <News />
    </>
  );
};

// Función para generar los parámetros estáticos
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data-news.json');
  const jsonData = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  return jsonData.categories.flatMap(category =>
    category.articles.map(article => ({
      category: category.name,
      slug: article.slug,
    }))
  );
}

async function getArticleData(category, slug) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data-news.json');
  const jsonData = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  const categoryData = jsonData.categories.find(cat => cat.name === category);
  if (!categoryData) {
    console.log(`Categoría no encontrada: ${category}`);
    return null;
  }

  const article = categoryData.articles.find(item => item.slug === slug);
  if (!article) {
    console.log(`Artículo no encontrado: ${slug} en la categoría ${category}`);
  }
  return article ? { ...article, category: categoryData.name } : null;
}

export default async function Page(props) {
  const params = await props.params;
  const article = await getArticleData(params.category, params.slug);

  if (!article) {
    notFound();
  }

  return <Article article={article} />;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const article = await getArticleData(params.category, params.slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado',
      description: 'El artículo que buscas no está disponible.',
    };
  }

  return {
    title: article.title,
    description: article.content.substring(0, 150),
  };
}
