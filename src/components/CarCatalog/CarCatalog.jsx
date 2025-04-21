import CarItem from "../CarItem/CarItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCars,
  selectCurrentPage,
  selectIsLoading,
  selectTotalCars,
  selectTotalPages,
} from "../../redux/cars/selectors";
import s from "./CarCatalog.module.css";
import { incrementPage } from "../../redux/cars/slice";
import LoaderComponent from "../Loader/Loader";

//props - favoriteCars
const CarCatalog = ({ cars: propCars }) => {
  const dispatch = useDispatch();
  const storeCars = useSelector(selectAllCars);

  const allCars = propCars || storeCars;

  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const totalCars = useSelector(selectTotalCars);

  const isLoading = useSelector(selectIsLoading);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(incrementPage());
    }
  };

  const isEmptyAfterSearch = allCars.length === 0 && !isLoading;

  return (
    <div className="container" style={{ marginBottom: "124px" }}>
      {isEmptyAfterSearch ? (
        <p className={s.noResults}>
          No cars found with these filters. Try adjusting your criteria
        </p>
      ) : (
        <>
          <ul className={s.carList}>
            {allCars.map((car) => (
              <li key={car.id}>
                <CarItem car={car} />
              </li>
            ))}
          </ul>
        </>
      )}

      {isLoading && <LoaderComponent />}

      {!isLoading &&
        !propCars &&
        allCars.length > 0 &&
        allCars.length < totalCars && (
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
