import Navbar from "./layouts/Nevbar";
import Sidebar from "./layouts/Sidebar";
import Footer from "./layouts/Footer";
// import RegisterComponent from "./Auth/RegisterComponent";

const Master = (props) =>{
    return (
        <>
            {/* <div className="loader"></div> */}
            <div id="app">
                <div className="main-wrapper main-wrapper-1">
                    <Navbar/>
                    <Sidebar/>
                        <div className="main-content">
                            {props.children}
                        </div>
                    <Footer/>
                </div>

            </div>
        </>
    );
}

export  default Master;