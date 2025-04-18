import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectFavoriteCars } from "../../redux/cars/selectors";
import CarCatalog from "../../components/CarCatalog/CarCatalog";
import s from "./FavoritePage.module.css";

const FavoritePage = () => {
  const favoriteCars = useSelector(selectFavoriteCars);

  useEffect(() => {
    document.title = "Rental Car | Favorite ♥️";
  }, []);

  return (
    <>
      <main style={{ paddingTop: "60px" }}>
        {favoriteCars.length === 0 ? (
          <p className={s.noFavorites}>You don't have any favorite cars yet.</p>
        ) : (
          <CarCatalog cars={favoriteCars} />
        )}
      </main>
    </>
  );
};

export default FavoritePage;
