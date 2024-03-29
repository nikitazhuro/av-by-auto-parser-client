import Home from "../pages/Home";
import Marketplace from "../pages/Marketplace";
import VehiclesSold from "../pages/VehiclesSold";
import Auction from "../pages/Auction";
import Vehicle from "../pages/Vehicle";

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/vehicles-sold', element: <VehiclesSold /> },
  { path: '/vehicles-sold/:option', element: <VehiclesSold /> },
  { path: '/vehicles-sold/:option/:id', element: <Vehicle /> },
  { path: '/marketplace', element: <Marketplace /> },
  { path: '/auction', element: <Auction /> },
];
