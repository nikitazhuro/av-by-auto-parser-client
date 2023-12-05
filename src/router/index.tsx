import Home from "../pages/Home";
import Marketplace from "../pages/Marketplace";
import VehiclesSold from "../pages/VehiclesSold";
import Auction from "../pages/Auction";
import VehiclePage from "../pages/Vehicle";
import PhoneNumberts from "../pages/PhoneNumbers";

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/vehicles-sold', element: <VehiclesSold /> },
  { path: '/vehicles-sold/:option', element: <VehiclesSold /> },
  { path: '/vehicles-sold/:option/:uuid', element: <VehiclePage /> },
  { path: '/marketplace', element: <Marketplace /> },
  { path: '/phonenumbers', element: <PhoneNumberts /> },
  { path: '/auction', element: <Auction /> },
];
