import { useCookies } from "react-cookie";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { adminRoutes, customerRoutes, mainRoutes } from "./routes";

function App() {
  const [cookies] = useCookies(['auth'])

  const routing = useRoutes([
    ...mainRoutes(cookies.auth),
    ...adminRoutes(cookies.auth),
    ...customerRoutes(cookies.auth)]);


  return (
    <>
      {routing}
    </>
  );
}
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper;
