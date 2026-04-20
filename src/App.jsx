import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Body from "./Components/Body"
import Login from "./Components/Login"
import LandingPage from "./Components/LandingPage"
import Feed from "./Components/Feed"
import Profile from "./Components/Profile"
import EditProfile from "./Components/EditProfile"   
import Connections from "./Components/Connections"
import Requests from "./Components/Requests"

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>

          {/* Public Routes */}
          <Route path="/"      element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/app" element={<Body />}>
            <Route index                element={<Feed />}        />
            <Route path="profile"       element={<Profile />}     />
            <Route path="edit"          element={<EditProfile />} />  
            <Route path="connections"   element={<Connections />} />
            <Route path="requests"      element={<Requests />}    />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App