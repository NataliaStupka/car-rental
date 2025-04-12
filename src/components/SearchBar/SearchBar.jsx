import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCars } from "../../redux/cars/selectors";
import * as Yup from "yup";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilterBrands } from "../../redux/filters/selectors";
import { useEffect } from "react";
import { fetchBrands } from "../../redux/filters/operations";
import s from "./SearchBar.module.css";
import clsx from "clsx";
import { fetchCarsByFilters } from "../../redux/cars/operations";
import { clearCars } from "../../redux/cars/slice";

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
    console.log("values", values);
    options.resetForm();

    // оновлення фільтра
    Object.entries(values).forEach(([name, value]) => {
      dispatch(changeFilter({ name, value }));
    });

    //---
    if (
      values.brand ||
      values.price ||
      values.mileageFrom ||
      values.mileageTo
    ) {
      dispatch(clearCars());
      dispatch(
        fetchCarsByFilters({
          brand: values.brand,
          price: values.price,
          mileageFrom: values.mileageFrom,
          mileageTo: values.mileageTo,
        })
      );
    }
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
        <Form className={s.form}>
          <div className={s.group}>
            <label className={s.label}>Car brand</label>
            <Field as="select" name="brand" className={s.select}>
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
          </div>

          <div className={s.group}>
            <label className={s.label}>Price/ 1 hour</label>
            <Field as="select" name="price" className={s.select}>
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
          </div>

          <div className={s.group}>
            <label className={s.label}>Сar mileage / km </label>
            <div className={s.mileageGroup}>
              <div className={s.inputWrap}>
                <label className={s.labelFloat}>From</label>
                <Field
                  type="number"
                  name="mileageFrom"
                  className={clsx(s.input, s.inputFrom)}
                  // placeholder="From"
                />
              </div>

              <div className={s.inputWrap}>
                <label className={s.labelFloat}>To</label>
                <Field
                  type="number"
                  name="mileageTo"
                  className={clsx(s.input, s.inputTo)}
                  // placeholder="To"
                />
              </div>
            </div>
          </div>

          <button type="submit" className={clsx("button", s.btnSearch)}>
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
