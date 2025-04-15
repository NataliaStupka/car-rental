import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  addFavoriteCar,
  deleteFavoriteCar,
  setSelectedCar,
} from "../../redux/cars/slice";
import s from "./CarItem.module.css";
import sprite from "../../assets/sprite.svg";
import { selectFavoriteCars } from "../../redux/cars/selectors";
import clsx from "clsx";

const CarItem = ({ car }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const favoriteCars = useSelector(selectFavoriteCars);

  const {
    img,
    type,
    brand,
    model,
    year,
    address,
    rentalPrice,
    rentalCompany,
    mileage,
    id,
  } = car;

  //замінити на зберігання по id ??
  const handleSelectCar = () => {
    dispatch(setSelectedCar(car)); // зберігаємо авто в store
  };

  const isFavorite = favoriteCars.find((item) => item.id === id);
  const handleAddFavorite = () => {
    dispatch(addFavoriteCar(car));
  };
  const handleRemoveFavorite = () => {
    dispatch(deleteFavoriteCar(id));
  };

  return (
    <>
      <div className={s.cardCar}>
        <div className={s.imgWrapper}>
          <img src={img} alt={type} className={s.img} />
          <button className={s.heart}>
            <svg
              className={isFavorite ? clsx(s.svg, s.svgFavorite) : s.svg}
              onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
            >
              <use href={`${sprite}#icon-heart`} />
            </svg>
          </button>
        </div>
        <div className={s.wrap}>
          <h2 className={s.titleCar}>
            {brand} <span className={s.modelCar}>{model}</span>, {year}
          </h2>
          <p className={s.price}>${rentalPrice}</p>
        </div>
        <p className={s.textLine}>
          <span>{address?.split(",")?.slice(-2)[0].trim()}</span>
          <span>{address?.split(",")?.slice(-1)[0].trim()}</span>
          <span>{rentalCompany}</span>
        </p>
        <p className={s.textLine}>
          <span>{type}</span>
          <span>{mileage.toLocaleString("en-US").replace(/,/g, " ")} km</span>
        </p>
      </div>
      <Link
        to={`/catalog/${id}`}
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
