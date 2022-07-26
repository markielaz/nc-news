import Navigation from "./Navigation"
import { UserContext } from "../contexts/User"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";

export default function Header() {


    const {loggedInUser, setLoggedInUser, isLoggedIn} = useContext(UserContext);


    const navigate = useNavigate();
    
    const clickLogin = () => {
        navigate(`/login`)
    }
    const goHome = () => {
        navigate(`/`)
    }

    const handleLogOut = () => {
        setLoggedInUser({})
            alert('logged out successfully')
    }


    return (
        <>
        <header>
            <div id="logo" className="header-section" onClick={() => goHome()}>
                <div className="logo-img">
                    <img src="https://mpng.subpng.com/20191012/foh/transparent-idea-icon-seo-icon-lightbulb-icon-5da1bd4d12a1d0.3939065915708808450763.jpg"/>
                </div>
                <div className="logo-text">
                    <h1>Re<span className="alt-color">mark</span>able</h1>
                    <span className="subtitle">News from around the world</span>
                </div>
                
            </div>
            <div>
                
            </div>
            <div className="header-section">
            
            {
            isLoggedIn 
            ?   <div className="nav-login">
                    <div id="logged-in-user">
                        <span>Hello {loggedInUser.username}</span>
                        <img id="logged-in-avatar" src={loggedInUser.avatar_url} alt='user-avatar'/>
                    </div>
                    <button id="log-out-button" onClick={handleLogOut}>Log out?</button>
                </div> 
            :   <div>
                    <button className="nav-login" onClick={() => clickLogin()}>Log in</button>
                </div>}
                </div>
        </header>
        <Navigation />
        </>
    )
}