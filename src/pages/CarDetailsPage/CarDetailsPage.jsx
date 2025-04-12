import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import s from "./CarDetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCar } from "../../redux/cars/slice";
import { selectCar } from "../../redux/cars/selectors";

import clsx from "clsx";

import BookingForm from "../../components/BookingForm/BookingForm";
import DetailsInfo from "../../components/DetailsInfo/DetailsInfo";

const CarDetailsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    document.title = "Rental Car | Car";
  }, []);

  const carFromLocation = location.state?.car;
  const carFromStore = useSelector(selectCar);

  const car = carFromLocation || carFromStore;

  useEffect(() => {
    if (carFromLocation) {
      dispatch(setSelectedCar(carFromLocation));
    }
  }, [carFromLocation, dispatch]);

  const goBackLink = useRef(location.state?.from || "/");

  // ?????????
  if (!car) {
    return <p>Поверніться назад до каталогу</p>;
    // <div className={clsx("container", s.details)}>
    //   <Link to={goBackLink.current}>Go back</Link>
    //   <p>Please return to the catalog.</p>
    // </div>;
  }

  return (
    <main>
      <div className={clsx("container", s.details)}>
        <Link to={goBackLink.current}>Go back</Link>
        <div className={s.detailsContainer}>
          <div className={s.wrapper}>
            <img src={car.img} alt={car.model} className={s.img} />

            <div className={s.formWrap}>
              <h2 className={s.title}>Book your car now</h2>
              <p className={s.text}>
                Stay connected! We are always ready to help you.
              </p>

              <BookingForm />
            </div>
          </div>

          <div>
            <DetailsInfo car={car} />

            {/* separet. component */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;
