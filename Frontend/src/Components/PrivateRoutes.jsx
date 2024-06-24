import { Outlet ,Navigate} from "react-router-dom";

function PrivateRoutes(props) {
    const auth = {'token':props.token} 
    return (
        auth.token ? <Outlet/> : <Navigate to="/login" />
    )
}
 export default PrivateRoutes;