"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Archive, Compare, Dashboard, SearchAdvanced, UserService, Settings, Product, DataBase } from '@carbon/icons-react';
import { Column, FlexGrid, Row, Tile, Modal } from '@carbon/react';
import './dashboard.scss';
import '/app/navbar.scss';

function Page() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleArchive = () => router.push('/Table');
  const handleProducts = () => router.push('/products');
  const handleBrowse = () => router.push('/Browse');
  const handleForms = () => router.push('/Forms');
  const handleComingSoon = (feature: string) => {
    setModalContent(`${feature} feature is unavailable`);
    setModalOpen(true);
  };

  return (
    <>
      <div className="dashboard-header">
        <h1 id="heading1">
          <Dashboard size={30} /> &nbsp;Dashboard
        </h1>
      </div>

      <FlexGrid>
        <Row className="rows">
          <Column lg={4} className="cols">
            <Tile className="archiveTile" onClick={handleArchive}>
              <Archive size={80} />
              <h4 id="heading4">Archive</h4>
            </Tile>
          </Column>

          <Column lg={4} className="cols">
            <Tile className="productsTile" onClick={handleProducts}>
              <Product size={80} />
              <h4 id="heading4">Products</h4>
            </Tile>
          </Column>

          <Column lg={4} className="cols">
            <Tile className="searchTile" onClick={handleBrowse}>
              <SearchAdvanced size={80} />
              <h4 id="heading4">Browse</h4>
            </Tile>
          </Column>

          <Column lg={4} className="cols">
            <Tile className="compareTile" onClick={handleForms}>
              <DataBase size={80} />
              <h4 id="heading4">Forms</h4>
            </Tile>
          </Column>
        </Row>
      </FlexGrid>

      <div className="admin">
        <h1 id="heading1">Admin</h1>
        <FlexGrid>
          <Row className="rows">
            <Column className="cols" lg={4}>
              <Tile className="manageUsers" onClick={() => handleComingSoon('Manage Users')}>
                <UserService size={80} />
                <h4 id="heading4">Manage Users</h4>
              </Tile>
            </Column>

            <Column className="cols" lg={4} onClick={() => handleComingSoon('Settings')}>
              <Tile className="settings">
                <Settings size={80} />
                <h4 id="heading4">Settings</h4>
              </Tile>
            </Column>
          </Row>
        </FlexGrid>
      </div>

      <Modal
        open={modalOpen}
        modalHeading="Feature Unavailable"
        primaryButtonText="Close"
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={() => setModalOpen(false)}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  );
}

export default Page;