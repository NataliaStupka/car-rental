import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import s from "./CarDetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCar } from "../../redux/cars/slice";
import { selectCar } from "../../redux/cars/selectors";
import sprite from "../../assets/sprite.svg";

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
  }

  const initialValues = {
    username: "",
    email: "",
    bookingDate: "",
    comment: "",
  };
  const handleSubmit = (value, options) => {
    console.log("Form-value", value);
    options.resetForm();
  };
  const contactSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too short!")
      .max(50, "Поле не може бути більше ніж 50 символи")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    bookingDate: Yup.string().required("Required"),
    comment: Yup.string(),
  });

  return (
    <main>
      <div className="container">
        <Link to={goBackLink.current}>Go back</Link>
        <div className={s.detailsContainer}>
          <div className={s.wrapper}>
            <img src={car.img} alt={car.model} className={s.img} />

            <div className={s.formWrap}>
              <h2 className={s.title}>Book your car now</h2>
              <p className={s.text}>
                Stay connected! We are always ready to help you.
              </p>

              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={contactSchema}
              >
                <Form className={s.form}>
                  <div className={s.inputGroup}>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Name"
                      className={s.input}
                    />
                  </div>

                  <div className={s.inputGroup}>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={s.input}
                    />
                  </div>

                  <div className={s.inputGroup}>
                    <Field
                      type="text"
                      name="bookingDate"
                      placeholder="Booking date"
                      className={s.input}
                    />
                  </div>
                  <div className={s.inputGroup}>
                    <Field
                      as="textarea"
                      name="comment"
                      placeholder="Comment"
                      className={s.textarea}
                    />
                  </div>

                  <button type="submit" className={s.btn}>
                    Send
                  </button>
                </Form>
              </Formik>
            </div>
          </div>

          <div>
            <h3 className={s.titleCar}>
              {car.brand} {car.model}, {car.year}
            </h3>
            <p className={s.adress}>
              <svg className={s.svg}>
                <use href={`${sprite}#icon-Location`} />
              </svg>
              {car.address} Mileage: {car.mileage}
            </p>
            <p className={s.price}>${car.rentalPrice}</p>
            <p className={s.descrip}>{car.description}</p>
            <ul className={s.list}>
              Rental Conditions:
              {car.rentalConditions.map((item) => {
                return (
                  <li key={nanoid()} className={s.item}>
                    <svg className={s.svg}>
                      <use href={`${sprite}#icon-check-circle`} />
                    </svg>
                    {item}
                  </li>
                );
              })}
            </ul>
            <ul className={s.list}>
              Car Specifications:
              <li className={s.item}>
                <svg className={s.svg}>
                  <use href={`${sprite}#icon-calendar`} />
                </svg>
                Year: {car.year}
              </li>
              <li className={s.item}>
                <svg className={s.svg}>
                  <use href={`${sprite}#icon-car`} />
                </svg>
                Type: {car.type}
              </li>
              <li className={s.item}>
                <svg className={s.svg}>
                  <use href={`${sprite}#icon-fuel-pump`} />
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={s.item}>
                <svg className={s.svg}>
                  <use href={`${sprite}#icon-gear`} />
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
            <ul className={s.list}>
              Accessories and functionalities:
              {car.accessories.map((item) => {
                return (
                  <li key={nanoid()} className={s.item}>
                    <svg className={s.svg}>
                      <use href={`${sprite}#icon-check-circle`} />
                    </svg>
                    {item}
                  </li>
                );
              })}
              {car.functionalities.map((item) => {
                return (
                  <li key={nanoid()} className={s.item}>
                    <svg className={s.svg}>
                      <use href={`${sprite}#icon-check-circle`} />
                    </svg>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;

// "id": "11a3ab35-07b8-4336-b06b-602cdc309f2c",
// "year": 2008,
// "brand": "Buick",
// "model": "Enclave",
// "type": "SUV",
// "img": "https://ac.goit.global/car-rental-task/9582-ai.jpg",
// "description": "The Buick Enclave is a stylish and spacious SUV known for its comfortable ride and luxurious features.",
// "fuelConsumption": "10.5",
// "engineSize": "3.6L V6",
// "accessories": [
//     "Leather seats",
//     "Panoramic sunroof",
//     "Premium audio system"
// ],
// "functionalities": [
//     "Power liftgate",
//     "Remote start",
//     "Blind-spot monitoring"
// ],
// "rentalPrice": "40",
// "rentalCompany": "Luxury Car Rentals",
// "address": "123 Example Street, Kiev, Ukraine",
// "rentalConditions": [
//     "Minimum age: 25",
//     "Valid driver's license",
//     "Security deposit required"
// ],
// "mileage": 5858
