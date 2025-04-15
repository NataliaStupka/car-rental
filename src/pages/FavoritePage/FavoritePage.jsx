import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectFavoriteCars } from "../../redux/cars/selectors";
import CarCatalog from "../../components/CarCatalog/CarCatalog";

const FavoritePage = () => {
  const favoriteCars = useSelector(selectFavoriteCars);

  useEffect(() => {
    document.title = "Rental Car | Favorite ♥️";
  }, []);

  return (
    <>
      <main style={{ paddingTop: "60px" }}>
        <CarCatalog cars={favoriteCars} />
      </main>
    </>
  );
};

export default FavoritePage;
