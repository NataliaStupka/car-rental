import CarItem from "../CarItem/CarItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCars,
  selectCurrentPage,
  selectIsLoading,
  selectTotalCars,
  selectTotalPages,
  selectWasFetched,
} from "../../redux/cars/selectors";
import s from "./CarCatalog.module.css";
import { incrementPage } from "../../redux/cars/slice";
import { selectSearchFilter } from "../../redux/filters/selectors";
import LoaderComponent from "../Loader/Loader";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations";

const CarCatalog = () => {
  const dispatch = useDispatch();

  const cars = useSelector(selectSearchFilter);

  const page = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const totalCars = useSelector(selectTotalCars);

  const isLoading = useSelector(selectIsLoading);
  const wasFetched = useSelector(selectWasFetched);

  // Завантажує нові машини при зміні сторінки (крім першої)
  useEffect(() => {
    if (wasFetched && page > 1) {
      dispatch(fetchCars(page));
    }
  }, [dispatch, page, wasFetched]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(incrementPage());
    }
  };

  return (
    <>
      <ul className={s.carList}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarItem car={car} />
          </li>
        ))}
      </ul>
      {isLoading && <LoaderComponent />}
      {cars.length < totalCars && (
        <button
          type="button"
          onClick={handleLoadMore}
          style={{
            marginTop: "30px",
            padding: "15px 20px",
            border: "1px solid #3470FF",
            borderRadius: "12px",
          }}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default CarCatalog;
