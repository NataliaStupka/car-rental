import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchAllCars } from "../../redux/cars/operations";

import CarCatalog from "../../components/CarCatalog/CarCatalog";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  selectAllCars,
  selectCurrentPage,
  selectLoadedPages,
} from "../../redux/cars/selectors";
import { clearCars } from "../../redux/cars/slice";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const loadedPages = useSelector(selectLoadedPages);
  const allCars = useSelector(selectAllCars);
  const isFirstMount = useRef(true);

  //перше монтування
  useEffect(() => {
    document.title = "Rental Car | Catalog";

    if (
      isFirstMount.current &&
      allCars.length === 0 &&
      loadedPages.length === 0
    ) {
      dispatch(clearCars());
      isFirstMount.current = false;
    }
  }, [dispatch, allCars, loadedPages]);

  //якщо сторінка currentPage ще не завантажена
  useEffect(() => {
    if (!loadedPages.includes(currentPage)) {
      dispatch(fetchAllCars(currentPage));
    }
  }, [dispatch, currentPage]); // Видалено loadedPages із залежностей

  return (
    <main>
      <SearchBar />
      <CarCatalog />
    </main>
  );
};

export default CatalogPage;
