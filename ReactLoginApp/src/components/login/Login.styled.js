import styled from 'react-emotion';

export const LoginContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 30px 0 0 30px;
  gap: 20px;
  background-color: green;
  padding: 40px;
  height: 200px;
`;

export const FieldContainer = styled('div')`
  display: flex;
`;

export const InputContainer = styled('input')`
  border: 1px solid orange;
  border-radius: 8px;
  padding: 4px;
  flex: 65%;
`;

export const LabelContainer = styled('label')`
  flex: 35%;
  color: white;
`;

export const LoginSuccess = styled('div')`
  color: white;
`;

export const LoginFailed = styled('div')`
  color: orange;
`;

export const ErrorContainer = styled('div')`
  color: blue;
  text-align: center;
`;

export const Submit = styled('button')`
  width: 60%;
  background-color: white;
  border-radius: 8px;
  padding: 4px;
  border: 1px solid orange;
`;

export const SubmitContainer = styled('div')`
  width: 100%;
`;
