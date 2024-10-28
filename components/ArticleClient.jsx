'use client'; // Componente cliente

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function ArticleClient({ article }) {
  const [showOfficialLinks, setShowOfficialLinks] = useState(false);
  const [showAnimeKaiLinks, setShowAnimeKaiLinks] = useState(false);
  const [isAnimeCategory, setIsAnimeCategory] = useState(false);

  // Detecta si la categoría es "anime"
  useEffect(() => {
    if (article.category === 'anime') {
      setIsAnimeCategory(true);
    }
  }, [article.category]);

  const handleOfficialLinksClick = () => {
    // Redirige a la URL al hacer clic
    window.open('https://icon-sets.iconify.design/ep/success-filled/', '_blank');
    setShowOfficialLinks(true); // Muestra los enlaces oficiales
  };

  const handleAnimeKaiLinksClick = () => {
    // Redirige a la URL al hacer clic
    window.open('https://icon-sets.iconify.design/ep/success-filled/', '_blank');
    setShowAnimeKaiLinks(true); // Muestra los enlaces AnimeKai
  };

  const hasOfficialLinks = article.linkSiteOficial1 || article.linkSiteOficial2 || article.linkSiteOficial3;
  const hasAnimeKaiLink = article.linkAnimeKai;

  return (
    <div className="links-section">
      {isAnimeCategory && (
        <>
          {/* Botón para mostrar enlaces oficiales */}
          {hasOfficialLinks && !showOfficialLinks && (
            <button onClick={handleOfficialLinksClick} className="show-links-button">
              Mostrar Enlaces Oficiales <span><Icon icon="emojione-monotone:down-arrow" /></span>
            </button>
          )}

          {/* Enlaces oficiales */}
          {showOfficialLinks && (
            <div className="links-container">
              <ul>
                {article.linkSiteOficial1 && (
                    <li>
                        <button onClick={() => window.open(article.linkSiteOficial1, '_blank')}>
                        <span> <Icon icon={article.linkSiteOficialIcon1} /> </span> {article.linkSiteOficial1}
                        </button>
                    </li>
                )}
                {article.linkSiteOficial2 && (
                    <li>
                        <button onClick={() => window.open(article.linkSiteOficial2, '_blank')}>
                        <span> <Icon icon={article.linkSiteOficialIcon2} /> </span> {article.linkSiteOficial2}
                        </button>
                    </li>
                )}
                {article.linkSiteOficial3 && (
                    <li>
                        <button onClick={() => window.open(article.linkSiteOficial3, '_blank')}>
                            <span> <Icon icon={article.linkSiteOficialIcon3} /> </span> {article.linkSiteOficial3}
                        </button>
                    </li>
                )}
              </ul>
            </div>
          )}

          {/* Botón para mostrar enlaces AnimeKai */}
          {hasAnimeKaiLink && !showAnimeKaiLinks &&  (
            <button onClick={handleAnimeKaiLinksClick} className="show-links-button">
              Mostrar Enlaces AnimeKai <span><Icon icon="emojione-monotone:down-arrow" /></span>
            </button>
          )}

          {/* Enlaces AnimeKai */}
          {showAnimeKaiLinks && (
            <div className="links-container">
              <ul>
                {article.linkAnimeKai && (
                    <li>
                        <button onClick={() => window.open(article.linkAnimeKai, '_blank')}>
                        <span> <Icon icon={article.linkAnimeKaiIcon} /> </span> {article.linkAnimeKai}
                        </button>
                    </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
