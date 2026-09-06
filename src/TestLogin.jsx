import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LogoImg from "./assets/images/ZarinLogo.svg";
import UserImg from "./assets/images/UserImg.svg";
import { useNavigate } from 'react-router-dom';
import { API_BASE } from './api';
import { setSession } from './auth';
import { useLanguage } from './i18n/LanguageContext';
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

  @media (min-width: 768px) {
    height: auto;
    min-height: calc(100vh - 88px);
    overflow: visible;
    gap: 2.5em;
    width: min(520px, 92%);
    margin: 2rem auto;
    padding: 2.5rem 2rem 3rem;
    box-sizing: border-box;
    background: #fff;
    border-radius: 28px;
    box-shadow: 0 24px 60px rgba(12, 164, 212, 0.14);
    border: 1px solid rgba(12, 164, 212, 0.12);
  }
`;

const LogoContainer = styled(motion.div)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: #F3F3F3;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

const TimerText = styled.p`
  color: #717171;
  font-size: 1rem;
`;

const TestLogin = () => {
  const { t, dir } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [personalCode, setPersonalCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && step === 2) {
      setResendMessage(t('login.resendPrompt'));
    }
    return () => clearInterval(interval);
  }, [step, timer, t]);

  useEffect(() => {
    if (resendCount >= 5) {
      setResendMessage(t('login.maxAttempts'));
    }
  }, [resendCount, t]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !personalCode) {
      setMessage(t('login.needFields'));
      setTimeout(() => setMessage(''), 8000);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/login`, {
        phoneNumber,
        personalCode,
      });

      const userId = response.data.userId;
      setSession({ userId });

      setStep(2);
      setResendCount(0);
      setTimer(120);
      setResendMessage('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage(t('login.badCredentials'));
      } else {
        const errorMessage = error.response?.data?.error || error.message || 'An unknown error occurred';
        setMessage(errorMessage);
      }
      setTimeout(() => setMessage(''), 8000);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setTimeout(() => setMessage(''), 8000);
      return;
    }
    try {
      const response = await axios.post(`${API_BASE}/verify`, {
        phoneNumber,
        verificationCode,
      });
      if (response.data.success) {
        const { token, user } = response.data;
        setSession({ token, userId: user?.id });
        navigate('/game', { state: { token, user } });
      } else {
        setMessage(t('login.badCode'));
        setTimeout(() => setMessage(''), 8000);
      }
    } catch (error) {
      setMessage(`${error.response ? error.response.data.error : error.message}`);
      setTimeout(() => setMessage(''), 6000);
    }
  };

  const handleResend = async () => {
    if (resendCount < 5) {
      try {
        await axios.post(`${API_BASE}/login`, {
          phoneNumber,
          personalCode,
        });
        setTimeout(() => {
          setResendMessage(t('login.resendOk'));
          setTimeout(() => setResendMessage(''), 5000);
        }, 8000);
        setResendCount(prevCount => prevCount + 1);
        setTimer(120);
      } catch (error) {
        setMessage(`Error: ${error.response ? error.response.data.error : error.message}`);
        setTimeout(() => setMessage(''), 8000);
      }
    }
  };

  return (
    <div className='app-container login' dir={dir}>
      <LoginSection>
        <img src={LogoImg} alt="Logo Image" className="loginLogo" />

        <LogoContainer
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", stiffness: 100 }}
        >
          <img src={UserImg} alt="User Img" className='userLogo' />
        </LogoContainer>

        {step === 1 ? (
          <motion.form
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 3, type: "spring", stiffness: 100 }}
            className='login-form'
            onSubmit={handleLogin}
          >
            <div>
              <input
                type="text"
                value={phoneNumber}
                className="loginFormInput"
                placeholder={t('login.phone')}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="loginFormInput"
                placeholder={t('login.personalCode')}
                value={personalCode}
                onChange={(e) => setPersonalCode(e.target.value)}
              />
            </div>
            <button type="submit" className='loginButton'>
              {t('login.enter')}
            </button>
          </motion.form>
        ) : (
          <form className='login-form' onSubmit={handleVerify}>
            <div>
              <input
                type="text"
                className="loginFormInput"
                placeholder={t('login.verifyPlaceholder')}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <button className='loginButton' type="submit">
              {t('login.startGame')}
            </button>
            {timer > 0 ? (
              <TimerText>{t('login.remaining', { s: timer })}</TimerText>
            ) : (
              resendCount < 5 && (
                <button type="button" className='resendButton resendLoginCode' onClick={handleResend}>
                  {t('login.resend')}
                </button>
              )
            )}
            {resendMessage && <p>{resendMessage}</p>}
          </form>
        )}
        {message && <p className='resendButton resendLoginCode'>{message}</p>}
      </LoginSection>
    </div>
  );
};

export default TestLogin;
