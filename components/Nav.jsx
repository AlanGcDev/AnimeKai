import Menu from "./Menu"
import Search from "./Search"
import Link from "next/link"
import data from '../public/data.json';


export default function Nav(){
  
    return (
        <nav>
          <Link href="/"><img src="/image/Logo.webp" alt="" /></Link>
          <ul className='menu'>
            <Menu data={data} /> {/* Usa el componente Menu aquí */}
            <li><Search data={data} /></li>
          </ul>
          <ul>
            <li className='nav-contact'>
              <Link href="/support"> Contacto </Link>
            </li>
          </ul>
        </nav>
    )
}