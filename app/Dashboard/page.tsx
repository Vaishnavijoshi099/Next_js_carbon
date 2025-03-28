'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Archive, Compare, Dashboard, SearchAdvanced, UserService, Settings, Product, DataBase } from '@carbon/icons-react';
import { Column, FlexGrid, Row, Tile, Modal, Form } from '@carbon/react';
import './dashboard.scss';


const loadLanguage = async (lang: string) => {
  try {
    const module = await import(`../messages/${lang}.json`);
    return module.default;
  } catch (error) {
    console.error("Error loading language:", error);
    return {};
  }
};

function Page() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [language, setLanguage] = useState('en'); // Default language is English
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    loadLanguage(language).then((data) => setTranslations(data));
  }, [language]);

  const handleArchive = () => router.push('/Table');
  const handleProducts = () => router.push('/products');
  const handleBrowse = () => router.push('/Browse');
  const handleForms = () => router.push('/Forms');
  const handleComingSoon = (feature: string) => {
    setModalContent(`${feature} feature is unavailable`);
    setModalOpen(true);
  };

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    loadLanguage(selectedLang).then((data) => setTranslations(data));
  };

  return (
    <>
      <div className="dashboard-header">
        <h1 id="heading1">
          <Dashboard size={30} /> &nbsp;{translations.dashboard?.dashboard || 'Dashboard'}
        </h1>

      
        <div className="language-selector">
          <select onChange={changeLanguage} value={language}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      <FlexGrid>
        <Row className="rows">
          <Tile className="archiveTile" onClick={handleArchive}>
            <Column lg={4} className="cols">
              <Archive size={80} />
              <h4 id="heading4">{translations.dashboard?.archive || 'Archive'}</h4>
            </Column>
          </Tile>

          <Tile className="productsTile" onClick={handleProducts}>
            <Column lg={4} className="cols">
              <Product size={80} />
              <h4 id="heading4">{translations.dashboard?.products || 'Products'}</h4>
            </Column>
          </Tile>

          <Tile className="searchTile" onClick={handleBrowse}>
            <Column lg={4} className="cols">
              <SearchAdvanced size={80} />
              <h4 id="heading4">{translations.dashboard?.browse || 'Browse'}</h4>
            </Column>
          </Tile>

          <Tile className="compareTile" onClick={handleForms}>
            <Column lg={4} className="cols">
              <DataBase size={80} />
              <h4 id="heading4">{translations.dashboard?.Forms || 'Forms'}</h4>
            </Column>
          </Tile>
        </Row>
      </FlexGrid>

      <div className="admin">
        <h1 id="heading1">{translations.dashboard?.admin || 'Admin'}</h1>
        <FlexGrid>
          <Row className="rows">
            <Column className="cols" lg={4}>
              <Tile className="manageUsers" onClick={() => handleComingSoon('Manage Users')}>
                <UserService size={80} />
                <h4 id="heading4">{translations.dashboard?.manageUsers || 'Manage Users'}</h4>
              </Tile>
            </Column>

            <Column className="cols" lg={4} onClick={() => handleComingSoon('Settings')}>
              <Tile className="settings">
                <Settings size={80} />
                <h4 id="heading4">{translations.dashboard?.settings || 'Settings'}</h4>
              </Tile>
            </Column>
          </Row>
        </FlexGrid>
      </div>
      <Modal
        open={modalOpen}
        modalHeading={translations.dashboard?.featureUnavailable || 'Feature Unavailable'}
        primaryButtonText={translations.dashboard?.close || 'Close'}
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={() => setModalOpen(false)}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  );
}

export default Page;
