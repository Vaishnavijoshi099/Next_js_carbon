"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Archive,
  Dashboard,
  SearchAdvanced,
  UserService,
  Settings,
  Product,
  DataBase,
} from "@carbon/icons-react";
import { Column, FlexGrid, Row, Tile, Modal } from "@carbon/react";
import "./dashboard.scss";
import "../navbar.scss";

function Page() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Navigation handlers
  const handleArchive = () => router.push("/Table");
  const handleProducts = () => router.push("/products");
  const handleBrowse = () => router.push("/Browse");
  const handleForms = () => router.push(`/Forms?isReadOnly=true`);
  const handleComingSoon = (feature: string) => {
    setModalContent(t("featureUnavailable", { feature }));
    setModalOpen(true);
  };

  // Language change handler
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    console.log(`Changing language to: ${lang}`); // Debugging
    i18n.changeLanguage(lang).then(() => {
      console.log(`Language changed to: ${i18n.language}`); // Verify the language change
    });
  };

  // Language options
  const languageOptions = [
    { id: "en", label: "English" },
    { id: "fr", label: "Français" },
    { id: "es", label: "Español" },
  ];

  return (
    <>
      <div className="dashboard-header">
        <h1 id="heading1">
          <Dashboard size={30} /> &nbsp;{t("dashboard")}
        </h1>

        {/* <label htmlFor="language-dropdown">Select Language</label> */}
        <select
          id="language-dropdown"
          value={i18n.language}
          onChange={handleLanguageChange}
          aria-label="Select Language"
        >
          {languageOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>

      </div>

      {/* Dashboard Tiles */}
      <FlexGrid>
        <Row className="rows">
          <Column lg={4} className="cols">
            <Tile className="archiveTile" onClick={handleArchive}>
              <Archive size={80} />
              <h4 id="heading4">{t("archive")}</h4>
            </Tile>
          </Column>

          <Column lg={4} className="cols">
            <Tile className="productsTile" onClick={handleProducts}>
              <Product size={80} />
              <h4 id="heading4">{t("products")}</h4>
            </Tile>
          </Column>

          <Column lg={4} className="cols">
            <Tile className="searchTile" onClick={handleBrowse}>
              <SearchAdvanced size={80} />
              <h4 id="heading4">{t("browse")}</h4>
            </Tile>
          </Column>

          <Column lg={4} className="cols">
            <Tile className="compareTile" onClick={handleForms}>
              <DataBase size={80} />
              <h4 id="heading4">{t("forms")}</h4>
            </Tile>
          </Column>
        </Row>
      </FlexGrid>

      {/* Admin Section */}
      <div className="admin">
        <h1 id="heading1">{t("admin")}</h1>
        <FlexGrid>
          <Row className="rows">
            <Column className="cols" lg={4}>
              <Tile
                className="manageUsers"
                onClick={() => handleComingSoon(t("manageUsers"))}
              >
                <UserService size={80} />
                <h4 id="heading4">{t("manageUsers")}</h4>
              </Tile>
            </Column>

            <Column
              className="cols"
              lg={4}
              onClick={() => handleComingSoon(t("settings"))}
            >
              <Tile className="settings">
                <Settings size={80} />
                <h4 id="heading4">{t("settings")}</h4>
              </Tile>
            </Column>
          </Row>
        </FlexGrid>
      </div>

      {/* Modal for unavailable features */}
      <Modal
        open={modalOpen}
        modalHeading={t("featureUnavailable")}
        primaryButtonText={t("close")}
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={() => setModalOpen(false)}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  );
}

export default Page;
