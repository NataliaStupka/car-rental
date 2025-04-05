import CarItem from "../CarItem/CarItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCars,
  selectCurrentPage,
  selectTotalCars,
  selectTotalPages,
} from "../../redux/cars/selectors";
import s from "./CarCatalog.module.css";
import { incrementPage } from "../../redux/cars/slice";
import { selectSearchFilter } from "../../redux/filters/selectors";

const CarCatalog = () => {
  const dispatch = useDispatch();
  // const cars = useSelector(selectAllCars);
  const cars = useSelector(selectSearchFilter);
  console.log("????----", cars);
  const page = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const totalCars = useSelector(selectTotalCars);
  console.log(`???${cars.length} <<< ${totalCars}`);

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
