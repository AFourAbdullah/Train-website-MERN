import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import Dashboard from "./components/admin/Dashboard";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Search from "./components/search/Search";
import Trains from "./components/trains/Trains";
import LoginSignup from "./components/user/loginSignup/LoginSignup";
import UserOptions from "./components/user/UserOptions";
import store from "./store";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminTrains from "./components/admin/AdminTrains";
import NewTrain from "./components/admin/NewTrain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import ScrollTop from "./scroll/ScrollTop";
import Train from "./components/trains/Train";
import TrainInfo from "./components/payment/TrainInfo";
import Payment from "./components/payment/Payment";

import TicketSuccess from "./components/payment/TicketSuccess";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import Updatetrain from "./components/admin/UpdateTrain";
import MyTickets from "./components/user/MyTickets";
import TicketDetails from "./components/user/TicketDetails";
import TrainForCity from "./components/Hero/TrainForCity";
import Contact from "./components/contact/Contact";
import About from "./About/About";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import TicketList from "./components/admin/TicketsList";
import Cookies from "js-cookie";
import axios from "axios";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
    // window.location.reload(false);
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
  }, []);
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <BrowserRouter>
        <Header />

        {isAuthenticated && <UserOptions user={user} />}
        <ScrollTop>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <Payment />
                </ProtectedRoutes>
              }
            />
            <Route exact path="/" element={<Hero />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/trains" element={<Trains />} />
            <Route exact path="/train/:trainId" element={<Train />} />
            <Route exact path="/city/:destination" element={<TrainForCity />} />
            <Route
              path="/trainInfo"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <TrainInfo />
                </ProtectedRoutes>
              }
            />

            <Route exact path="/login" element={<LoginSignup />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/trains/:startingCity/:destination/:category/:date"
              element={<Trains />}
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/train/:id"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <Updatetrain />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/trains"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <AdminTrains />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <TicketSuccess />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/tickets/me"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <MyTickets />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/ticket/:ticketId"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <TicketDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <UpdateProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/train"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <NewTrain />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <UsersList />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/tickets"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <TicketList />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/user/:userId"
              element={
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={true}
                >
                  <UpdateUser />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </ScrollTop>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
