import { Outlet ,Navigate, useLocation} from "react-router-dom";

function PrivateRoutes(props) {
    const auth = {'token':props.token} 

    return (
        auth.token ? <Outlet/> : <Navigate to="/login" state={{ from: location }} replace/>
    )
}
 export default PrivateRoutes;