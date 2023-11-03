import MovieDetailsPage from "./components/pages/MovieDetailsPage/MovieDetailsPage";
import MovieSearchPage from "./components/pages/MovieSearchPage/MovieDetailsPage";
import PersonalLibraryPage from "./components/pages/PersonalLibraryPage/PersonalLibraryPage";
import Route from "./types/Route";

const routes: Route[] = [
  {
    path: "/",
    element: <MovieSearchPage />,
    linkText: "Home",
  },
  {
    path: "/movie-details",
    element: <MovieDetailsPage />,
  },
  {
    path: "/my-library",
    element: <PersonalLibraryPage />,
    linkText: "My library",
  },
];

export default routes;
