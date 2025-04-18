import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import CarDetailsPage from "../pages/CarDetailsPage/CarDetailsPage";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
