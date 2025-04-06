import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSelectedCar } from "../../redux/cars/slice";
import s from "./CarItem.module.css";

const CarItem = ({ car }) => {
  //   console.log("CAR!:", car);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car)); // зберігаємо авто в store
  };

  return (
    <>
      <div className={s.cardCar}>
        <img src={car.img} alt={car.type} className={s.img} />
        <div className={s.wrap}>
          <h2 className={s.titleCar}>
            {car.brand} <span className={s.modelCar}>{car.model}</span>,{" "}
            {car.year}
          </h2>
          <p className={s.price}>${car.rentalPrice}</p>
        </div>
        <p className={s.text}>
          {car.address} {car.rentalCompany}
        </p>
        <p className={s.text}>
          {car.type} {car.mileage} km
        </p>
      </div>
      <Link
        to={`/catalog/${car.id}`}
        state={{ car, from: location }}
        onClick={handleSelectCar}
        className={s.btnMore}
      >
        Read more
      </Link>
    </>
  );
};

export default CarItem;
