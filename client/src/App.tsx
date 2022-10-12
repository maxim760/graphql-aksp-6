import { Navigate, Route, Routes } from 'react-router-dom';
import { PageUrls, routes } from './utils/routes';

export const App = () => {
  return (
    <Routes>
      {routes.map(({element, path}) => (
        <Route element={element} path={path} key={path} />
      ))}
      <Route path="*" element={<Navigate replace to={PageUrls.books()} />} />
    </Routes>
  );
}