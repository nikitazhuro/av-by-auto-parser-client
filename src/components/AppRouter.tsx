import { Route, Routes } from 'react-router-dom';

import { publicRoutes } from "../router";

const AppRouter = () => {
  return (
    <Routes>
    {publicRoutes.map((page) => (
      <Route
        key={page.path}
        path={page.path}
        element={page.element}
      />
    ))}
  </Routes>
  )
}

export default AppRouter;
