import { RouterProvider } from "react-router-dom";
import "./app.scss"
import MainContainer from "./components/mainContainer/MainContainer";
import Sidebar from "./components/sidebar/Sidebar";
import { router } from "./router";


export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
