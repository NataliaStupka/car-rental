import { createSelector } from "@reduxjs/toolkit";

export const selectAllCars = (state) => state.car.items;

//filter
export const selectSearchFilterBrand = (state) => state.filter.brand;
export const selectSearchFilterPrice = (state) => state.filter.price;

//складений селектор, пошук/фільтрація cars
export const selectSearchFilter = createSelector(
  [selectAllCars, selectSearchFilterBrand, selectSearchFilterPrice],
  (cars, brand, price) => {
    return cars.filter((car) => {
      const matchBrand = brand
        ? car.brand.toLowerCase().includes(brand.toLowerCase())
        : true;

      const matchPrice = price
        ? Number(car.rentalPrice) <= Number(price)
        : true;

      return matchBrand && matchPrice;
    });
  }
);
