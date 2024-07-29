import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "../Components/Customer/Customer";
import { PageLoader } from "../Common/PageLoader";
import { useSelector } from "react-redux";

export default function AppRouter() {

  const loading = useSelector((state) => state.CommonReducer.isLoader)

  return (
    <BrowserRouter>
      <PageLoader loading={loading} />
      <Routes>
        <Route path="/" element={<Customer />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
