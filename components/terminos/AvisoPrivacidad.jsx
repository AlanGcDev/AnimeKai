import Link from "next/link"
import { Icon } from "@iconify/react"


export default function AvisoPrivacidad(){
  
    return (
        <>
        
        <section className="legal-section">
            <h2 className="section-title">Aviso de Privacidad</h2>
            <p className="section-content">En AnimeKai respetamos tu privacidad y la seguridad de tus datos personales. Este Aviso de Privacidad describe cómo recopilamos, utilizamos y protegemos tus datos, en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>

            <h3 className="subsection-title">1. Datos Recopilados</h3>
            <p className="subsection-content">Recopilamos información básica como nombre y dirección de correo electrónico, que el Usuario puede proporcionar de forma voluntaria. Esta información se utiliza principalmente para enviar boletines informativos o actualizaciones sobre AnimeKai.</p>

            <h3 className="subsection-title">2. Finalidad del Tratamiento de Datos</h3>
            <p className="subsection-content">AnimeKai puede utilizar los datos personales recopilados para:</p>
                <ul className="data-list">
                    <li>Enviar información sobre noticias y actualizaciones de anime.</li>
                    <li>Ofrecer contenido personalizado.</li>
                    <li>Mejorar el servicio y la experiencia de usuario.</li>
                </ul>
            

            <h3 className="subsection-title">3. Protección de los Datos</h3>
            <p className="subsection-content">AnimeKai implementa medidas de seguridad para proteger los datos personales del Usuario. No compartimos, vendemos ni divulgamos los datos a terceros sin el consentimiento previo del Usuario.</p>

            <h3 className="subsection-title">4. Derechos del Usuario</h3>
            <p className="subsection-content">El Usuario tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, puede contactarnos a través de <a href="/support">soporte.animekai@gmail.com</a>.</p>
        </section>


        </>
    )
}