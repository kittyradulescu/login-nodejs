import React, { useState } from 'react';
import {
  FieldContainer,
  InputContainer,
  LoginContainer,
  LabelContainer,
  LoginSuccess,
  LoginFailed,
  ErrorContainer,
  Submit,
  SubmitContainer,
} from './Login.styled';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { saveUser } from '../../api/saveUser';

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({
  token: 'L5J8ZdKDdAdjZANmN6Cy',
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [showInfo, setShowInfo] = useState('');

  // Get the visitor identifier when you need it.
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      setVisitorId(result.visitorId);
    });

  const login = async () => {
    if (username && password) {
      const saveUserResponse = await saveUser(username, password, visitorId);

      /* TODO: implement fetching user history
      Proposed solution:
       */
      //console.log('vistor history', await fetchUserHistory(visitorId));

      if (saveUserResponse.users.length > 0) {
        setShowInfo('success');
      } else {
        setShowInfo('failed');
      }
      if (saveUserResponse.loginDisabled) {
        setLoginDisabled(true);
      } else {
        setLoginDisabled(false);
      }
    }
  };

  return (
    <LoginContainer>
      <FieldContainer>
        <LabelContainer>Username:</LabelContainer>
        <InputContainer
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelContainer>Password:</LabelContainer>
        <InputContainer
          type="password"
          name="passsword"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FieldContainer>
      <SubmitContainer>
        <Submit onClick={login}>Submit</Submit>
      </SubmitContainer>
      {loginDisabled && (
        <ErrorContainer>
          We detected multiple log in attempts for this user, but we didn't
          perform the login action
        </ErrorContainer>
      )}
      {!loginDisabled && showInfo && showInfo === 'success' && (
        <LoginSuccess> Login successfull</LoginSuccess>
      )}
      {!loginDisabled && showInfo && showInfo === 'failed' && (
        <LoginFailed> Login failed</LoginFailed>
      )}
    </LoginContainer>
  );
};

export default Login;
