import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSelectedCar } from "../../redux/cars/slice";

const CarItem = ({ car }) => {
  //   console.log("CAR!:", car);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car)); // зберігаємо авто в store
  };

  return (
    <>
      <div>
        <img src={car.img} alt={car.type} />
        <div>
          <h2>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h2>
          <p>${car.rentalPrice}</p>
        </div>
        <p>
          {car.address} {car.rentalCompany}
        </p>
        <p>
          {car.type} {car.mileage} km
        </p>
      </div>
      <Link
        to={`/catalog/${car.id}`}
        state={{ car, from: location }}
        onClick={handleSelectCar}
        style={{
          padding: "10px 15px",
          color: "#FFFFFF",
          backgroundColor: "#3470FF",
          borderRadius: "5px",
        }}
      >
        Read more
      </Link>
    </>
  );
};

export default CarItem;
