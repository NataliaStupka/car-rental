import s from "./DetailsInfo.module.css";
import sprite from "../../assets/sprite.svg";
import { nanoid } from "@reduxjs/toolkit";

const DetailsInfo = ({ car }) => {
  return (
    <>
      <div className={s.titleCar}>
        <h2 className={s.nameCar}>
          {car.brand} {car.model}, {car.year}
        </h2>
        <p className={s.carId}>
          id: {car.img?.split("/").pop()?.split("-")[0]}
        </p>
      </div>
      <p className={s.adress}>
        <svg className={s.svg}>
          <use href={`${sprite}#icon-Location`} />
        </svg>
        {car.address?.split(",")?.slice(-2).join(",")}
        <span className={s.mileage}>
          Mileage: {car.mileage.toLocaleString("en-US").replace(/,/g, " ")} km
        </span>
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
    </>
  );
};

export default DetailsInfo;

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
