import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Components/Body"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Components/Feed"
import Connections from "./Components/Connections"
import Requests from "./Components/Requests"

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>

          {/* Login is standalone — no NavBar/Footer */}
          <Route path="/login" element={<Login />} />

          {/* Everything inside Body is protected */}
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections/>} />
            <Route path="requests" element={<Requests/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App