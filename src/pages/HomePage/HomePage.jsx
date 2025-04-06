import { Link } from "react-router-dom";
import s from "./HomePage.module.css";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Rental Car | HOME";
  }, []);
  return (
    <main>
      <div className={s.homePage}>
        <div>
          <h1 className={s.titleText}>Find your perfect rental car</h1>
          <p className={s.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link to="/catalog" className="button">
            View Catalog
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
