import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("uk")}>Українська</button>
      <button onClick={() => changeLanguage("en")}>English</button>
    </div>
  );
}

export default LanguageSwitcher;
