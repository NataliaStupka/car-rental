import { useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import s from "./CarDetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCarById,
  selectIsError,
  selectIsLoading,
} from "../../redux/cars/selectors";

import clsx from "clsx";

import BookingForm from "../../components/BookingForm/BookingForm";
import DetailsInfo from "../../components/DetailsInfo/DetailsInfo";
import { fetchCarById } from "../../redux/cars/operations";
import LoaderComponent from "../../components/Loader/Loader";

const CarDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); //id з URL
  const location = useLocation();

  const car = useSelector(selectCarById); // {}

  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    document.title = "Rental Car | Car";
  }, []);

  useEffect(() => {
    dispatch(fetchCarById({ id }));
  }, [dispatch, id]);

  const goBackLink = useRef(location.state?.from || "/");

  if (isLoading) {
    return <LoaderComponent />;
  }
  if (isError || !car) {
    return (
      <div className={clsx("container", s.details)}>
        <Link to={goBackLink.current}>Повернутися назад</Link>
        <p>Не вдалося завантажити дані автомобіля. Спробуйте ще раз.</p>
      </div>
    );
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;
