import "./App.css"
import AddUser from "./users/AddUser";
import UpdateUser from "./users/UpdateUser";
import User from './users/User'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element: <User/>
    },
    {
      path:"/users/add",
      element:<AddUser/>
    },
    {
      path: "users/:id/edit",
      element: <UpdateUser/>
    }
  ])
  return (
    <div className="App">
      <h1 >This is react app</h1>
      <RouterProvider router={route}/>
    </div>
  );
}

export default App;
