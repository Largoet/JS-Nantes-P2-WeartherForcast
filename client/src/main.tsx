// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import DayByDay from "./pages/DayByDay";
import GeolocaliseMe from "./pages/GeolocaliseMe";
import MeteoInfo from "./pages/MeteoInfo";
import MyCities from "./pages/MyCities";
import PreferenciesWear from "./pages/PreferenciesWear";
import WeatherNews from "./pages/WeatherNews";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MeteoInfo />,
      },
      {
        path: "/geolocation",
        element: <GeolocaliseMe />,
      },
      {
        path: "/myCities",
        element: <MyCities />,
      },
      {
        path: "/preferenciesWear",
        element: <PreferenciesWear />,
      },
      {
        path: "/dayByDay",
        element: <DayByDay />,
      },
      {
        path: "/WeatherNews",
        element: <WeatherNews />,
      },
    ],
  },
]);
/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
