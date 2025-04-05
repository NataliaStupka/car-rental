import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations";

import CarCatalog from "../../components/CarCatalog/CarCatalog";
import SearchBar from "../../components/Navigation/SearchBar/SearchBar";
import { selectCurrentPage } from "../../redux/cars/selectors";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    document.title = "Rental Car | Catalog";
  }, []);

  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  return (
    <>
      <SearchBar />
      <CarCatalog />
    </>
  );
};

export default CatalogPage;
