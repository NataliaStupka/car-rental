//ClipLoader
import { ClipLoader } from "react-spinners";

const LoaderComponent = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "70px" }}
    >
      <ClipLoader
        color="#3470FF"
        loading={true}
        //   cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoaderComponent;
