import { Outlet } from "react-router-dom"

const GrandFather = () => {

    return (<>
        <h5>Hi I'm grandfather!</h5>
        <Outlet/>
    </>)
}
export default GrandFather