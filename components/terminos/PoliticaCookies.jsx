import Link from "next/link"
import { Icon } from "@iconify/react"


export default function PoliticaCookies(){
  
    return (
        <>

        <section className="legal-section">
            <h2 className="section-title">Política de Cookies</h2>
            <p className="section-content">AnimeKai utiliza cookies para mejorar la experiencia de navegación y personalizar el contenido. Las cookies son archivos pequeños que se almacenan en el dispositivo del Usuario y facilitan la interacción y navegación en nuestro Sitio Web.</p>

            <h3 className="subsection-title">1. Uso de Cookies</h3>
            <p className="subsection-content">Las cookies utilizadas en AnimeKai permiten almacenar información sobre las preferencias del Usuario, mejorar la navegación y, en algunos casos, presentar anuncios relevantes. Estas cookies pueden ser de origen propio o de terceros.</p>

            <h3 className="subsection-title">2. Tipo de Cookies Utilizadas</h3>
            <ul className="cookie-list">
                <li>Cookies de sesión: permiten el funcionamiento adecuado del Sitio Web.</li>
                <li>Cookies de análisis: utilizadas para entender el comportamiento de los usuarios y mejorar el contenido.</li>
                <li>Cookies de publicidad: utilizadas para mostrar anuncios relevantes según los intereses del Usuario.</li>
            </ul>

            <h3 className="subsection-title">3. Gestión y Desactivación de Cookies</h3>
            <p className="subsection-content">El Usuario puede desactivar el uso de cookies desde la configuración de su navegador. Sin embargo, desactivar las cookies puede afectar la funcionalidad del Sitio Web, y es posible que algunas características no estén disponibles. Para más información sobre cómo desactivar las cookies, revisa la configuración de tu navegador.</p>
        </section>



        </>
    )
}