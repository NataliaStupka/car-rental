import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import s from "./CarDetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCar } from "../../redux/cars/slice";
import { selectCar } from "../../redux/cars/selectors";

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
  //   const contactSchema = Yup.object().shape({
  //     username: Yup.string()
  //       .min(3, "Too short!")
  //       .max(50, "Поле не може бути більше ніж 50 символи")
  //       .required("Required"),
  //     tel: Yup.number()
  //       .positive("Число має бути додатним")
  //       .integer("Число має бути цілим")
  //       .required("Required"),
  //   });

  return (
    <div>
      <Link to={goBackLink.current}>Go back</Link>
      <div className={s.detailsContainer}>
        <div className={s.wrapper}>
          <img src={car.img} alt={car.model} />
          <h2>Book your car now</h2>
          <p>Stay connected! We are always ready to help you.</p>

          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            //   validationSchema={contactSchema}
          >
            <Form className={s.form}>
              <Field type="text" name="username" placeholder="Name" />
              <Field type="email" name="email" placeholder="Email" />
              <Field
                type="text"
                name="bookingDate"
                placeholder="Booking date"
              />
              <Field as="textarea" name="comment" placeholder="Comment" />
              <button type="submit">Send</button>
            </Form>
          </Formik>
        </div>
        <div>
          Informations
          <h3>
            {car.brand} {car.model}, {car.year} id: ??
          </h3>
          <p>
            {car.address} Mileage: {car.mileage}
          </p>
          <p>{car.rentalPrice}</p>
          <p>{car.description}</p>
          <ul style={{ border: "1px solid green", marginBottom: "10px" }}>
            Rental Conditions:
            {car.rentalConditions.map((item) => {
              return <li key={nanoid()}> ✅ {item}</li>;
            })}
          </ul>
          <ul style={{ border: "1px solid red", marginBottom: "10px" }}>
            Car Specifications:
            <li>Year: {car.year}</li>
            <li>Type: {car.type}</li>
            <li>Fuel Consumption: {car.fuelConsumption}</li>
            <li>Engine Size: {car.engineSize}</li>
          </ul>
          <ul>
            Accessories and functionalities:
            {car.accessories.map((item) => {
              return <li key={nanoid()}> ✅ {item}</li>;
            })}
            {car.functionalities.map((item) => {
              return <li key={nanoid()}> ✅ {item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
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
