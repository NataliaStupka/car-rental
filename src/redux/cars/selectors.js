export const selectAllCars = (state) => state.car.items;
// export const selectCarsByBrand = (state) => state.car.brandItem;

export const selectCarById = (state) => state.car.carById;
export const selectFavoriteCars = (state) => state.car.favoriteCars;

export const selectCurrentPage = (state) => state.car.currentPage;
export const selectTotalPages = (state) => state.car.totalPages;
export const selectTotalCars = (state) => state.car.totalCars;
export const selectWasFetched = (state) => state.car.wasFetched; //?????

export const selectIsError = (state) => state.car.isError; //???
export const selectIsLoading = (state) => state.car.isLoading;
