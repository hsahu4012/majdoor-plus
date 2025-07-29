import { useState } from 'react'
import './App.css'
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return <h1 className="text-xl">{t("welcome")}</h1>;
}
export default App
