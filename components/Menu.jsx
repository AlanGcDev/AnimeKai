"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import data from '../public/data/data-news.json';

const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [categories, setCategories] = useState([]);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuVisible(prev => !prev);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOnMenuButton = (event) => {
      event.stopPropagation();
    };

    if (menuRef.current) {
      menuRef.current.addEventListener('mousedown', handleClickOnMenuButton);
    }

    return () => {
      if (menuRef.current) {
        menuRef.current.removeEventListener('mousedown', handleClickOnMenuButton);
      }
    };
  }, [menuRef]);

  // Extraer categorías con íconos desde el JSON
  useEffect(() => {
    setCategories(data.categories);
  }, []);

  return (
    <div>
      <li className='menu-li' onClick={toggleMenu}>
        <span><Icon icon="material-symbols:menu" /></span> Menu
      </li>

      {menuVisible && (
        <div ref={menuRef} className="dropdown-menu">
          <div className="card-container">
            <Link href="/" className="card-content">
              <span><Icon icon="material-symbols:home" /></span>Inicio
            </Link>
            {categories.map((category, index) => (
              <Link key={index} href={`/${category.name}`} className="card-content">
                <span><Icon icon={category.icon} /></span>{category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
