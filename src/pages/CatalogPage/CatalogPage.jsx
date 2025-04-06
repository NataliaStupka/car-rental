import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations";

import CarCatalog from "../../components/CarCatalog/CarCatalog";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  selectCurrentPage,
  selectWasFetched,
} from "../../redux/cars/selectors";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const wasFetched = useSelector(selectWasFetched);

  useEffect(() => {
    document.title = "Rental Car | Catalog";
  }, []);

  useEffect(() => {
    if (!wasFetched) {
      dispatch(fetchCars(currentPage));
    }
  }, [dispatch, currentPage, wasFetched]);

  return (
    <>
      <SearchBar />
      <CarCatalog />
    </>
  );
};

export default CatalogPage;
