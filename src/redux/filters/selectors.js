import { createSelector } from "@reduxjs/toolkit";

export const selectAllCars = (state) => state.car.items;

//filter
export const selectSearchFilterBrand = (state) => state.filter.brand;
export const selectSearchFilterPrice = (state) => state.filter.price;
export const selectFilterMileageFrom = (state) => state.filter.mileageFrom;
export const selectFilterMileageTo = (state) => state.filter.mileageTo;

export const selectFilterBrands = (state) => state.filter.brands;

//складений селектор, пошук/фільтрація cars
export const selectSearchFilter = createSelector(
  [
    selectAllCars,
    selectSearchFilterBrand,
    selectSearchFilterPrice,
    selectFilterMileageFrom,
    selectFilterMileageTo,
  ],
  (cars, brand, price, mileageFrom, mileageTo) => {
    return cars.filter((car) => {
      const matchBrand = brand
        ? car.brand.toLowerCase().includes(brand.toLowerCase())
        : true;

      const matchPrice = price
        ? Number(car.rentalPrice) <= Number(price)
        : true;

      // const matchMileage =
      //   (mileageFrom ? Number(car.mileage) >= Number(mileageFrom) : true) &&
      //   (mileageTo ? Number(car.mileage) <= Number(mileageTo) : true);

      const matchMileageFrom = mileageFrom
        ? Number(car.mileage) >= Number(mileageFrom)
        : true;

      const matchMileageTo = mileageTo
        ? Number(car.mileage) <= Number(mileageTo)
        : true;

      return matchBrand && matchPrice && matchMileageFrom && matchMileageTo;
    });
  }
);
