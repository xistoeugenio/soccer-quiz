import { RouterProvider } from "react-router-dom";
import "./app.scss"
import { router } from "./router";


export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
