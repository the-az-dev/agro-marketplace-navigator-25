import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Listbox } from "@headlessui/react";
import JSONLocales from '../../../assets/mocks/locales.json';

const languages = JSONLocales;

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLang.code);
  }, [selectedLang, i18n]);

  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      <div className="relative w-32">
        <Listbox.Button className="w-full p-2 border rounded-lg flex items-center gap-2 bg-white shadow">
          <span>{selectedLang.flag}</span>
          <span>{selectedLang.label}</span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg overflow-hidden">
          {languages.map((lang) => (
            <Listbox.Option
              key={lang.code}
              value={lang}
              className="p-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default LanguageSwitcher;