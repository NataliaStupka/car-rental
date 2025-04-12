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
import LoaderComponent from "../Loader/Loader";
import { useEffect } from "react";
import { fetchAllCars } from "../../redux/cars/operations";

const CarCatalog = () => {
  const dispatch = useDispatch();

  const allCars = useSelector(selectAllCars);

  const page = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const totalCars = useSelector(selectTotalCars);

  const isLoading = useSelector(selectIsLoading);
  const wasFetched = useSelector(selectWasFetched);

  // Завантажує нові машини при зміні сторінки (крім першої)
  useEffect(() => {
    if (wasFetched && page > 1) {
      dispatch(fetchAllCars(page));
    }
  }, [dispatch, page, wasFetched]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(incrementPage());
    }
  };

  return (
    <div className="container" style={{ marginBottom: "124px" }}>
      <ul className={s.carList}>
        {allCars.map((car) => (
          <li key={car.id}>
            <CarItem car={car} />
          </li>
        ))}
      </ul>
      {isLoading && <LoaderComponent />}
      {allCars.length < totalCars && (
        <button
          type="button"
          onClick={handleLoadMore}
          className={s.btnLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CarCatalog;
