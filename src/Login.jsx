import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import LogoImg from "./assets/images/ZarinLogo.svg";
import UserImg from "./assets/images/UserImg.svg";
import { API_BASE } from './api';
import "./login.scss";

const LoginSection = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4em;
`;

const LogoContainer = styled(motion.div)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: #F3F3F3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const LoginButton = styled(motion.div)`
`;

const LoginMessage = styled(motion.div)`
  color: red;
  margin: 1.5rem 0 0rem 0;
  padding: 0;
  position: absolute;
  bottom: 0;
`;

const Login = () => {
  const [personalCode, setPersonalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/login`, {
        personalCode,
        phoneNumber
      });

      if (response.data.success) {
        setMessage('Login successful! SMS sent.');
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setMessage('لطفا بعدا امتحان کنید.');
    }
  };

  return (
    <div className='app-container login'>
      <LoginSection>
        <img src={LogoImg} alt="Logo Image" className="loginLogo" />

        <LogoContainer
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", stiffness: 100 }}
        >
          <img src={UserImg} alt="User Img" className='userLogo' />
        </LogoContainer>

        <FormContainer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3, type: "spring", stiffness: 100 }}
        >
          <input
            type="text"
            required
            className="loginFormInput"
            placeholder='شماره تلفن'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            required
            className="loginFormInput"
            placeholder='کد پرسنلی'
            value={personalCode}
            onChange={(e) => setPersonalCode(e.target.value)}
          />
        </FormContainer>

        <LoginButton
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 4, type: "spring", stiffness: 100 }}
        >
          <button className='loginButton' onClick={handleLogin}>
            ورود
          </button>
        </LoginButton>

        {message && <LoginMessage>{message}</LoginMessage>}
      </LoginSection>
    </div>
  );
}

export default Login;