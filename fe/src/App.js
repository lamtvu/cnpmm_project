import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { mainRoutes } from "./routes";

function App() {
  const routing = useRoutes([...mainRoutes]);
  return (
    <>
      {routing}
    </>
  );
}
const AppWrapper = () => {
  return (
    <Router>
      <App/>
    </Router>
  )
}

export default AppWrapper;
