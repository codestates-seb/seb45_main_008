import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

const GoogleSignInComponent: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSuccess = (credentialResponse: any) => {
        console.log(credentialResponse);
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    // One-tap 로그인 (선택적)
    useGoogleOneTapLogin({
        onSuccess: handleSuccess,
        onError: handleError,
    });

    return (
        <GoogleOAuthProvider clientId="
        690344785644-2oj84rcukd2rhu3o56gbq6rahap16m37.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignInComponent;

