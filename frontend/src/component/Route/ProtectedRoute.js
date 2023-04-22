import React, {Fragment} from 'react'
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({isAdmin, element: Element, ...rest}) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading === false && (
        <Routes>
          <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <Element {...props} />;
          }}
        />
        </Routes>
      )}
    </Fragment>
  )
}

export default ProtectedRoute
