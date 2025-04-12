import { ErrorMessage, Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilterBrands } from "../../redux/filters/selectors";
import { useEffect } from "react";
import { fetchBrands } from "../../redux/filters/operations";
import s from "./SearchBar.module.css";
import clsx from "clsx";
import { fetchCarsByFilters } from "../../redux/cars/operations";
import { clearCars } from "../../redux/cars/slice";

const staticPrice = [30, 40, 50, 60, 70, 80];

const SearchBar = () => {
  const dispatch = useDispatch();

  const brands = useSelector(selectFilterBrands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSubmit = (values, options) => {
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

  const validationSchema = Yup.object().shape({
    brand: Yup.string().notRequired(),
    price: Yup.string().notRequired(),
    mileageFrom: Yup.number()
      .typeError("Must be a number")
      .min(0, "Must be greater than or equal to 0")
      .nullable(),
    mileageTo: Yup.number()
      .typeError("Must be a number")
      .min(0, "Must be greater than or equal to 0")
      .nullable()
      .when("mileageFrom", (mileageFrom, schema) =>
        mileageFrom
          ? schema.min(mileageFrom, "Must be greater than 'From'")
          : schema
      ),
  });

  return (
    <div className="container">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          {/* BRAND */}
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
            <ErrorMessage name="brand" component="div" className={s.error} />
          </div>

          {/* PRICE */}
          <div className={s.group}>
            <label className={s.label}>Price/ 1 hour</label>
            <Field as="select" name="price" className={s.select}>
              <option disabled value="">
                Choose a price
              </option>
              {staticPrice.map((price) => {
                return (
                  <option key={price} value={price}>
                    To ${price}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage name="price" component="div" className={s.error} />
          </div>

          {/* MILEAGE */}
          <div className={s.group}>
            <label className={s.label}>Сar mileage / km </label>
            <div className={s.mileageGroup}>
              {/* FROM */}
              <div className={s.inputWrap}>
                <label className={s.labelFloat}>From</label>
                <Field
                  type="number"
                  name="mileageFrom"
                  className={clsx(s.input, s.inputFrom)}
                />
              </div>

              {/* TO */}
              <div className={s.inputWrap}>
                <label className={s.labelFloat}>To</label>
                <Field
                  type="number"
                  name="mileageTo"
                  className={clsx(s.input, s.inputTo)}
                />
              </div>
            </div>
            <ErrorMessage
              name="mileageFrom"
              component="div"
              className={s.error}
            />
            <ErrorMessage
              name="mileageTo"
              component="div"
              className={s.error}
            />
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
