import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { utilService } from '../services/util.service';
import { useSelector, useDispatch } from 'react-redux';


const clientId = "52418967336-cfdovdnof9ju47roksb5d2etem57i6ev.apps.googleusercontent.com";

export const GoogleLoginButton = () => {

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
    const dispatch = useDispatch();

    const onLoginSuccess = (res) => {
        const userObj = res.profileObj
        console.log('userObj', userObj);
        const user = {
            _id: userObj.googleId,
            username: userObj.givenName,
            fullname: userObj.name,
            imgUrl: userObj.imageUrl
        }
        const action = {type: 'SET_USER', user}
        dispatch(action)
        setShowloginButton(false);
        setShowlogoutButton(true);
        // alert(`Welcome To Notello ${userObj.name}!`)
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        // alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
        const user = {
            _id: 'GuestId',
            username: 'Guest',
            fullname: 'Guest',
            imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643293928/Notello/wkyvzzdkw2e4whnbt1lt.png'
        }
        const action = {type: 'SET_USER', user}
        dispatch(action)
    };

    return (
        <div className='google-button-container' >
            { showloginButton ?
                <GoogleLogin
                    className='google-login-button'
                    clientId={clientId}
                    buttonText="Sign In"
                    style={{width: '343px'}}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    className='google-login-button'
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
