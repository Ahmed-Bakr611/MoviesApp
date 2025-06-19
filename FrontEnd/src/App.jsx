import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomLoading from "./components/CustomLoading";
import { store } from "./redux/stores/store";
import { Provider } from "react-redux";
import AppInitializer from "./components/AppInitializer";
import AppExitHandler from "./components/AppExitHandler";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const DetailsPage = lazy(() => import("./pages/DetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LayoutPage = lazy(() => import("./pages/LayoutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const FavouritesPage = lazy(() => import("./pages/FavouritesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPage></LayoutPage>,
      children: [
        { index: true, element: <LoginPage /> },
        { path: "movies", element: <HomePage /> },
        { path: "contact", element: <ContactUsPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "movies/:id", element: <DetailsPage /> },
        { path: "favourites", element: <FavouritesPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <Suspense fallback={<CustomLoading />}>
        <AppInitializer />
        <RouterProvider router={routes} />
        <AppExitHandler />
      </Suspense>
      {/* </ThemeProvider> */}
    </Provider>
  );
}

export default App;
