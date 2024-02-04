import RegisterComponent from "./Auth/RegisterComponent";

const AuthMaster = (props) =>{
    return (
        <>
            <div className="loader"></div>
            <div id="app">
                <div className="main-wrapper main-wrapper-1">
                    <RegisterComponent/>
                </div>

            </div>
        </>
    );
}

export  default AuthMaster;