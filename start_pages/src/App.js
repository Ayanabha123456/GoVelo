import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import Register from "./pages/register";
import Landing from "./pages/landing";
import Bookpage from "./pages/bookpage";
import VehicleBookpage from "./pages/vehiclebook";
import VehicleConfirmation from "./pages/vehicleconfirmation";
import TripFinish from "./pages/tripfinish";
import TripBill from "./pages/tripbill";
import Receipt from "./pages/receipt";
import ReportVehicle from "./pages/reportvehicle";
import Problem from "./pages/problem";
import OperatorLanding from './pages/operatorlanding';
import Trackpage from './pages/trackpage';
import ChargeVehicle from './pages/chargevehicle';
import RepairVehicle from './pages/repairvehicle';
import MovePageFrom from './pages/movepagefrom';
import VehicleCount from './pages/vehiclecount';
import MovePageTo from './pages/movepageto';
import Manager from './pages/manager';
import ChangePass from './pages/ChangePassword';
import WalletPage from './pages/WalletPage';
import Confirmed from './pages/vehicleconfirmed';
import DefectSubmit from './pages/defectsubmit';
import Charged from './pages/charged';
import Repaired from './pages/repaired';
import Moved from './pages/vehiclemoved';
import About from './pages/about';
import PaymentError from './pages/paymenterror';
import QRBook from './pages/qrbook';
import VehicleConfirmationQR from './pages/vehicleconfirmationqr';
import BookOptions from './pages/bookoptions';
import Contact from './pages/contact';
import Delete from './pages/delete';
import DeleteOperator from './pages/delete_operator';
import DeleteManager from './pages/delete_manager';
import Account from './pages/Account';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/landing" element={<Landing />} />
          <Route exact path="/bookoptions" element={<BookOptions />} />
          <Route exact path="/qrbook" element={<QRBook />} />
          <Route exact path="/bookpage" element={<Bookpage />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/vehiclebook" element={<VehicleBookpage />} />
          <Route exact path="/vehicleconfirm" element={<VehicleConfirmation />} />
          <Route exact path="/vehicleconfirmqr" element={<VehicleConfirmationQR />} />
          <Route exact path="/confirmed" element={<Confirmed />} />
          <Route exact path="/tripfinish" element={<TripFinish />} />
          <Route exact path="/tripbill" element={<TripBill />} />
          <Route exact path="/receipt" element={<Receipt />} />
          <Route exact path="/pay_error" element={<PaymentError />} />
          <Route exact path="/reportvehicle" element={<ReportVehicle />} />
          <Route exact path='/vehicleproblem' element={<Problem />} />
          <Route exact path='/defectsubmit' element={<DefectSubmit />} />
          <Route exact path='/operatorlanding' element={<OperatorLanding />} />
          <Route exact path='/trackpage' element={<Trackpage />} />
          <Route exact path='/chargevehicle' element={<ChargeVehicle />} />
          <Route exact path='/charged' element={<Charged />} />
          <Route exact path='/repairvehicle' element={<RepairVehicle />} />
          <Route exact path='/repaired' element={<Repaired />} />
          <Route exact path='/movepagefrom' element={<MovePageFrom />} />
          <Route exact path='/vehiclecount' element={<VehicleCount />} />
          <Route exact path='/movepageto' element={<MovePageTo />} />
          <Route exact path='/vehiclemoved' element={<Moved />} />
          <Route exact path='/manager' element={<Manager />} />
          <Route exact path='/password_reset' element={<ChangePass />} />
          <Route exact path='/wallet' element={<WalletPage />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/delete_account' element={<Delete />} />
          <Route exact path='/delete_account_operator' element={<DeleteOperator />} />
          <Route exact path='/delete_account_manager' element={<DeleteManager />} />
        </Routes>
      </BrowserRouter >
    </>
  );

}

export default App;
