import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Footer () {
    return (
        <footer>
          <div className="img">
            <Link href="/"><img src="/image/logo.webp" alt="" /></Link>
            <p>©️ 2023 AnimeKai. Todos los derechos reservados.</p>
          </div>
          <div className="term">
            <div className="redes">
              <Link href="/"><Icon icon="ic:baseline-facebook" /></Link>
              <Link href="/"><Icon icon="mdi:instagram" /></Link>
              <Link href="/"><Icon icon="prime:twitter" /></Link>
              <Link href="/"><Icon icon="mdi:youtube" /></Link>
              <Link href="/"><Icon icon="ic:baseline-tiktok" /></Link>
              <Link href="/"><Icon icon="ic:baseline-discord" /></Link>
            </div>
            <div className="terms">
              <Link href="/support/terminos-y-condiciones">Términos y Condiciones</Link>
              <Link href="/support/politica-de-cookies">Política de Cookies</Link>
              <Link href="/support/aviso-de-privacidad">Aviso de Privacidad</Link>
              <Link href="/support/uso-de-contenido">Uso De Contenido</Link>
              <Link href="/support/sobre-nosotros">Sobre Nosotros</Link>
              <Link href="/support">Contacto</Link>
            </div>
          </div>
        </footer>
    )
}