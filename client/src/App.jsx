import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">{t("welcome")}</h1>
      <select
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="or">ଓଡ଼ିଆ</option>
      </select>
    </div>
  );
}
