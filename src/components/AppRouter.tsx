import { publicRoutes } from "../router"
import { Route, Routes } from 'react-router-dom';

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
