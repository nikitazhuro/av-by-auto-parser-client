import Home from "../pages/Home";
import Transport from "../pages/Transport";

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/transport', element: <Transport /> },
  { path: '/transport/:option', element: <Transport /> },
];
