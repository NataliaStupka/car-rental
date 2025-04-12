import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSelectedCar } from "../../redux/cars/slice";
import s from "./CarItem.module.css";
import sprite from "../../assets/sprite.svg";

const CarItem = ({ car }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car)); // зберігаємо авто в store
  };

  return (
    <>
      <div className={s.cardCar}>
        <div className={s.imgWrapper}>
          <img src={car.img} alt={car.type} className={s.img} />
          <button>
            <svg className={s.svg}>
              <use href={`${sprite}#icon-heart`} />
            </svg>
          </button>
        </div>
        <div className={s.wrap}>
          <h2 className={s.titleCar}>
            {car.brand} <span className={s.modelCar}>{car.model}</span>,{" "}
            {car.year}
          </h2>
          <p className={s.price}>${car.rentalPrice}</p>
        </div>
        <p className={s.textLine}>
          <span>{car.address?.split(",")?.slice(-2)[0].trim()}</span>
          <span>{car.address?.split(",")?.slice(-1)[0].trim()}</span>
          <span>{car.rentalCompany}</span>
        </p>
        <p className={s.textLine}>
          <span>{car.type}</span>
          <span>
            {car.mileage.toLocaleString("en-US").replace(/,/g, " ")} km
          </span>
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
