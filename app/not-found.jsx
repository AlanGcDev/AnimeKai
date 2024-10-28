import Link from 'next/link';
import { Icon } from '@iconify/react';
import "../public/css/animekai-main.css";


export default function Custom404() {
    return (
        <div className='container-terms' >
          <div className="content-404">
            <h1 >404</h1>
            <p >Parece que la página que buscas no existe. <Icon icon="fluent-emoji:sad-but-relieved-face" /></p>
            <Link href="/">
                Regresar al Inicio
            </Link>
          </div>
            
        </div>
    );
}
