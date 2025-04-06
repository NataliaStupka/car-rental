import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCars } from "../../redux/cars/selectors";
import * as Yup from "yup";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilterBrands } from "../../redux/filters/selectors";
import { useEffect } from "react";
import { fetchBrands } from "../../redux/filters/operations";

const SearchBar = () => {
  const dispatch = useDispatch();

  const brands = useSelector(selectFilterBrands);
  const cars = useSelector(selectAllCars);
  const uniquePrice = [
    ...new Set(cars.map((car) => Number(car.rentalPrice))),
  ].sort((a, b) => a - b);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSubmit = (values, options) => {
    options.resetForm();
    Object.entries(values).forEach(([name, value]) => {
      dispatch(changeFilter({ name, value }));
    });
  };
  const initialValues = {
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  };

  return (
    <div className="container">
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <label>Car brand</label>
          <Field as="select" name="brand">
            <option disabled value="">
              Choose a brand
            </option>
            {brands.map((brand) => {
              return (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              );
            })}
          </Field>

          <label>
            <span>Price/ 1 hour</span>
            <Field as="select" name="price">
              <option disabled value="">
                Choose a price
              </option>
              {uniquePrice.map((price) => {
                return (
                  <option key={price} value={price}>
                    To ${price}
                  </option>
                );
              })}
            </Field>
          </label>

          <label>
            <span>Сar mileage / km</span>
            <label>From</label>
            <Field type="number" name="mileageFrom" />
            <label>To</label>
            <Field type="number" name="mileageTo" />
          </label>

          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
