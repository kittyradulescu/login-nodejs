import styled from 'react-emotion';

export const LoginContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 30px 0 0 30px;
  gap: 20px;
`;

export const FieldContainer = styled('div')`
  display: flex;
`;

export const InputContainer = styled('input')`
  flex: 65%;
`;

export const LabelContainer = styled('label')`
  flex: 35%;
`;

export const LoginSuccess = styled('div')`
  color: green;
  text-align: center;
`;

export const ErrorContainer = styled('div')`
  color: red;
  text-align: center;
`;