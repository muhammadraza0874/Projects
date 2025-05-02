import { useEffect } from "react";
import storeConfig from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react"
import { Route, Routes, Navigate,useLocation} from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import routes from "routes";
import {ConfirmProvider} from "material-ui-confirm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { store, persistor } = storeConfig;


export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <CssBaseline />
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/users" />} />
            </Routes>
          </Provider>
        </PersistGate>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="dark"
        />
      </ConfirmProvider>
    </ThemeProvider>
  );
}
