import React, { useState } from 'react';
import {
  FieldContainer,
  InputContainer,
  LoginContainer,
  LabelContainer,
  LoginSuccess,
  ErrorContainer,
} from './Login.styled';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { saveUser } from '../../api/saveUser';
import { fetchUserHistory } from '../../api/fetchUserHistory';

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
        setShowInfo('Login is successful');
      } else {
        setShowInfo('Login failed');
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
      <button onClick={login}>Submit</button>
      {loginDisabled ? (
        <ErrorContainer>
          We detected multiple log in attempts for this user, but we didn't
          perform the login action
        </ErrorContainer>
      ) : showInfo ? (
        <LoginSuccess> {showInfo}</LoginSuccess>
      ) : (
        <div></div>
      )}
    </LoginContainer>
  );
};

export default Login;
