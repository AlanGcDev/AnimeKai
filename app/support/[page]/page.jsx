import Terminos from "@/components/terminos/terminos";
import AvisoPrivacidad from "@/components/terminos/AvisoPrivacidad";
import PoliticaCookies from "@/components/terminos/PoliticaCookies";
import SobreNosotros from "@/components/terminos/SobreNosotros";
import UsoContenido from "@/components/terminos/UsoContenido";
import Custom404 from "@/app/not-found";

export default async function SupportPage({ params }) {
  // Asegúrate de esperar la resolución de 'params'
  const resolvedParams = await params;
  const { page } = resolvedParams;

  let content;
  switch (page) {
    case "terminos-y-condiciones":
      content = <Terminos></Terminos>;
      break;
    case "politica-de-cookies":
      content = <PoliticaCookies></PoliticaCookies>;
      break;
    case "aviso-de-privacidad":
      content = <AvisoPrivacidad></AvisoPrivacidad>;
      break;
    case "uso-de-contenido":
        content = <UsoContenido></UsoContenido>;
        break;
    case "sobre-nosotros":
      content = <SobreNosotros></SobreNosotros>;
      break;
    default:
      content = <Custom404></Custom404>;
      break;
  }

  return <div className="support">{content}</div>;
}

// Función para generar los metadatos dinámicamente


export async function generateStaticParams() {
  return [
    { page: "terminos-y-condiciones" },
    { page: "politica-de-cookies" },
    { page: "aviso-de-privacidad" },
    { page: "uso-de-contenido" },
    { page: "sobre-nosotros" },
  ];
}


export async function generateMetadata({ params }) {
    const resolvedParams = await params;
  const { page } = resolvedParams;
  
    // Títulos y descripciones personalizados según la página
    let title;
    let description;
  
    switch (page) {
      case "terminos-y-condiciones":
        title = "Términos y Condiciones";
        description = "Lee nuestros términos y condiciones para más información.";
        break;
      case "politica-de-cookies":
        title = "Política de Cookies";
        description = "Conoce cómo utilizamos cookies en nuestro sitio.";
        break;
      case "aviso-de-privacidad":
        title = "Aviso de Privacidad";
        description = "Consulta nuestro aviso de privacidad y cómo manejamos tus datos.";
        break;
      default:
        title = "Página no encontrada";
        description = "La página que buscas no existe.";
        break;
    }
  
    return {
      title,
      description,
    };
  }