import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './components/Header';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import { API_BASE } from './api';
import { authHeaders, getUserId } from './auth';
import { useLanguage } from './i18n/LanguageContext';


// CARD DATA
// SUB 1 = EXCITE
// SUB 2 = LEARN
// SUB 3 = PEACE
const cardData = [
  { id: 50, value: 'نجاری', subject: ['subThree', 'subTwo'], imgSrc: './src/assets/images/peace2/sub3-7.png' },
  { id: 2, value: 'تغییر دکوراسیون', subject: 'subOne', imgSrc: './src/assets/images/excite2/sub1-2.png' },
  { id: 62, value: 'والیبال', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-19.png' },
  { id: 35, value: 'بازدید بناهای تاریخی', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-13.png' },
  { id: 7, value: 'بازی های ویدیویی', subject: 'subOne', imgSrc: './src/assets/images/excite2/sub1-7.png' },
  { id: 45, value: 'طبیعت‌گردی', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-2.png' },
  { id: 38, value: 'موزه‌گردی', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-16.png' },
  { id: 19, value: 'کارائوکه', subject: 'subOne', imgSrc: './src/assets/images/excite2/sub1-19.png' },
  { id: 54, value: 'ماساژ', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-11.png' },
  { id: 26, value: 'عکاسی', subject: ['subTwo', 'subOne'], imgSrc: './src/assets/images/learn2/sub2-4.png' },
  { id: 56, value: 'صخره‌نوردی', subject: ['subThree', 'subOne'], imgSrc: './src/assets/images/peace2/sub3-13.png' },
  { id: 64, value: 'رقص', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-21.png' },
  { id: 58, value: 'یوگا', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-15.png' },
  { id: 22, value: 'شنا', subject: ['subOne', 'subThree'], imgSrc: './src/assets/images/excite2/sub1-22.png' },
  { id: 40, value: 'خیاطی', subject: ['subTwo', 'subOne'], imgSrc: './src/assets/images/learn2/sub2-18.png' },
  { id: 51, value: 'بدنسازی', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-8.png' },
  { id: 14, value: 'مانیکور', subject: 'subOne', imgSrc: './src/assets/images/excite2/sub1-14.png' },
  { id: 57, value: 'اسب‌سواری', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-14.png' },
  { id: 33, value: 'یاد گرفتن زبان جدید', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-11.png' },
  { id: 37, value: 'پازل', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-15.png' },
  { id: 60, value: 'تیراندازی', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-17.png' },
  { id: 8, value: 'کنسرت', subject: 'subOne', imgSrc: './src/assets/images/excite2/sub1-8.png' },
  { id: 4, value: 'بافتنی', subject: 'subOne', imgSrc: './src/assets/images/excite2/sub1-4.png' },
  { id: 27, value: 'نوشتن', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-5.png' },
  { id: 63, value: 'خانواده', subject: ['subOne', 'subTwo', 'subThree'], imgSrc: './src/assets/images/peace2/sub3-20.png' },
  { id: 52, value: 'ایروبیک', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-9.png' },
  { id: 9, value: 'شهر‌گردی', subject: ['subOne', 'subTwo'], imgSrc: './src/assets/images/excite2/sub1-9.png' },
  { id: 32, value: 'ماهی‌گیری', subject: ['subTwo', 'subThree'], imgSrc: './src/assets/images/learn2/sub2-10.png' },
  { id: 55, value: 'بسکتبال', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-12.png' },
  { id: 43, value: 'موسیقی', subject: ['subTwo', 'subOne'], imgSrc: './src/assets/images/learn2/sub2-21.png' },
  { id: 48, value: 'سفالگری', subject: ['subThree', 'subTwo'], imgSrc: './src/assets/images/peace2/sub3-5.png' },
  { id: 53, value: 'دوچرخه‌سواری', subject: ['subThree', 'subOne'], imgSrc: './src/assets/images/peace2/sub3-10.png' },
  { id: 1, value: 'حیوان خانگی', subject: ['subOne', 'subThree'], imgSrc: './src/assets/images/excite2/sub1-1.png' },
  { id: 49, value: 'گل‌آرایی', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-6.png' },
  { id: 25, value: 'فیلم', subject: ['subTwo', 'subOne'], imgSrc: './src/assets/images/learn2/sub2-3.png' },
  { id: 47, value: 'نقاشی', subject: ['subThree', 'subTwo'], imgSrc: './src/assets/images/peace2/sub3-4.png' },
  { id: 20, value: 'استادیوم', subject: 'subOne', imgSrc: './src/assets/images/excite2/sub1-20.png' },
  { id: 42, value: 'اوریگامی', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-20.png' },
  { id: 61, value: 'پینگ‌پونگ', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-18.png' },
  { id: 34, value: 'کتاب خواندن', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-12.png' },
  { id: 65, value: 'مراقبت‌های پوستی', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-22.png' },
  { id: 39, value: 'کاردستی', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-17.png' },
  { id: 59, value: 'ژیمناستیک', subject: ['subThree'], imgSrc: './src/assets/images/peace2/sub3-16.png' },
  { id: 30, value: 'آشپزی', subject: ['subTwo', 'subOne'], imgSrc: './src/assets/images/learn2/sub2-8.png' },
  { id: 41, value: 'خوش‌نویسی', subject: ['subTwo'], imgSrc: './src/assets/images/learn2/sub2-19.png' },
  { id: 36, value: 'تئاتر', subject: ['subTwo', 'subOne'], imgSrc: './src/assets/images/learn2/sub2-14.png' },
  { id: 17, value: 'بولینگ', subject: ['subOne', 'subTwo'], imgSrc: './src/assets/images/excite2/sub1-17.png' }
];


// STYLES
const ListContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  direction: ${(props) => props.$dir};
  text-align: center;
  margin: 0;
  padding: 0;
  gap: 20px;

  @media (min-width: 768px) {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 28px 160px;
    box-sizing: border-box;
    gap: 28px;
  }
`;
const CardListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 0 24px;

  @media screen and (max-width: 768px) {
    height: calc(100vh - 100px);
  }

  @media screen and (max-width: 480px) {
    height: calc(100vh - 80px);
  }

  @media (min-width: 768px) {
    height: auto;
    max-height: none;
    overflow: visible;
    padding: 20px 8px 40px;
  }
`;
const ListCards = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 20px;
    row-gap: 20px;
    align-items: stretch;
  }
`;
const ListCard = styled(motion.div)`
  width: 90%;
  margin: 0 auto;
  padding: 12px 14px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 2px;
  display: flex;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  border: ${(props) => (props.isActive ? '2px solid #3498db' : 'none')};
  background-color: ${(props) => (props.isActive ? '#d9d9d9' : 'transparent')};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#d9d9d9' : '#f5f5f5')};
  }

  @media (min-width: 768px) {
    width: 100%;
    margin: 0;
    min-height: 110px;
    padding: 18px 20px;
    border-radius: 18px;
    background-color: ${(props) => (props.isActive ? '#e8f6fc' : '#fff')};
    border: ${(props) => (props.isActive ? '2px solid #0ca4d4' : '1px solid rgba(12, 164, 212, 0.14)')};
    box-shadow: 0 8px 22px rgba(12, 164, 212, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(12, 164, 212, 0.15);
      background-color: ${(props) => (props.isActive ? '#e8f6fc' : '#f7fbfe')};
    }
  }
`;
const CardContent = styled.div`
  display: flex;
  gap: 10px;
  color: ${(props) => props.theme.titleColor};
  font-size: ${(props) => props.theme.fontSizeLg};
  font-weight: 700;
  width: 100%;

  @media (min-width: 768px) {
    align-items: center;
    gap: 18px;
    font-size: 1.1rem;
  }
`;
const ContentImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 96px;
    height: 96px;
    border-radius: 18px;
  }
`;
const ListSubjects = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: min(300px, 88%);
  margin: 0;
  padding: 6px 12px 10px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  background: linear-gradient(180deg, rgba(32, 155, 224, 0.96), rgba(12, 140, 190, 0.98));
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 0 -8px 28px rgba(12, 164, 212, 0.24);
  backdrop-filter: blur(12px);
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: min(360px, 90%);
    padding: 8px 14px 12px;
  }
`;

const ScoreRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
`;

const ScoreRowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ScoreBadge = styled.span`
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => Math.min(props.$progress, 100)}%;
  background-color: ${(props) => props.$color || '#FE929C'};
  border-radius: 999px;
  transition: width 0.35s ease;
`;

const AlertMessage = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  width: 90%;
  margin: 10px auto;
  text-align: center;
  font-weight: 600;
  direction: ${(props) => props.$dir};
`;

const ShowResultIcon = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #fff;
  cursor: pointer;
  padding: 2px 0 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;
  align-items: center;
  line-height: 1.15;

  .game-icon_text {
    font-size: 0.82rem;
    font-weight: 600;
  }

  .score-summary {
    font-size: 0.7rem;
    opacity: 0.9;
    font-weight: 500;
  }

  &:hover {
    opacity: 0.92;
  }
`;

const ProgressContent = styled.div`
  display: ${(props) => (props.$show ? 'block' : 'none')};
  width: 100%;
  padding-top: 6px;
`;

const ScoresPanel = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EndButton = styled.button`
  width: 100%;
  margin-top: 2px;
  border: none;
  outline: none;
  cursor: pointer;
  background: #fff;
  color: #0ca4d4;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
  }
`;

const SuccessContainer = styled(AlertMessage)`
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
`;

function game() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  // VARIABLES
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ subOne: 0, subTwo: 0, subThree: 0 });
  const [selectedCards, setSelectedCards] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedBySubject, setSelectedBySubject] = useState({ subOne: [], subTwo: [], subThree: [] });
  const [showProgressContent, setShowProgressContent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userId, setUserId] = useState(null);




  const containerVariants = {
    collapsed: { height: 0 },
    expanded: { height: "auto" },
  };

  const toggleProgressContent = () => {
    setShowProgressContent(!showProgressContent);
  };



  const endHandler = () => {
    const exciteCount = selectedBySubject.subOne.length;
    const learnCount = selectedBySubject.subTwo.length;
    const peaceCount = selectedBySubject.subThree.length;
    const firstName = location.state?.firstName || '';
    const lastName = location.state?.lastName || '';
    const headers = authHeaders();

    if (exciteCount + learnCount + peaceCount < 15) {
      setAlertMessage(t('game.notAllPoints'));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } else {
      axios.get(`${API_BASE}/user/${userId}`, {
        headers,
      })
        .then(response => {
          axios.put(`${API_BASE}/user/${userId}`, {
            exciteCount,
            learnCount,
            peaceCount
          }, {
            headers,
          })
            .then(response => {
              setShowSuccess(true);
              setTimeout(() => {
                setShowSuccess(false);
                navigate('/result', { state: { userId, exciteCount, learnCount, peaceCount, firstName, lastName } });
              }, 3000);
            })
            .catch(error => {
              console.error('Error updating user counts:', error);
              setAlertMessage(t('game.updateError'));
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 5000);
            });
        })
        .catch(error => {
          console.error('Error retrieving user data:', error);
          setAlertMessage(t('game.fetchError'));
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
        });
    }
  };



  // CARD CLICK FUNCTION
  // CARD CLICK FUNCTION
  const handleCardClick = (card) => {
    const subjects = Array.isArray(card.subject) ? card.subject : [card.subject];

    subjects.forEach((subject) => {
      if (selectedBySubject[subject].find((selectedCard) => selectedCard.id === card.id)) {
        // Deselect the card
        setProgress((prevProgress) => ({
          ...prevProgress,
          [subject]: Math.max(prevProgress[subject] - 1, 0),
        }));
        setSelectedCards(selectedCards.filter((id) => id !== card.id));
        setSelectedBySubject((prevSelectedBySubject) => ({
          ...prevSelectedBySubject,
          [subject]: prevSelectedBySubject[subject].filter((selectedCard) => selectedCard.id !== card.id),
        }));
      } else {
        // Select the card only if the maximum selection limit is not reached
        if (selectedCards.length < 15) {
          setProgress((prevProgress) => ({
            ...prevProgress,
            [subject]: Math.min(prevProgress[subject] + 1, 15),
          }));
          setSelectedCards([...selectedCards, card.id]);
          setSelectedBySubject((prevSelectedBySubject) => ({
            ...prevSelectedBySubject,
            [subject]: [...prevSelectedBySubject[subject], card],
          }));
        } else {
          setAlertMessage(t('game.allUsed'));
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
        }
      }
    });
  };

  const { data } = location.state || {};

  useEffect(() => {
    const storedUserId = getUserId();
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('User ID not found in localStorage.');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const url = `${API_BASE}/user/${userId}`;
      axios.get(url, { headers: authHeaders() })
        .then(response => {
          // console.log('User data:', response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);
  return (
    <div className='app-container CARds' dir={dir}>
      <Header />
      <ListContainer $dir={dir} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <AlertMessage $dir={dir} show={showAlert}>
          {alertMessage}
        </AlertMessage>
        <SuccessContainer $dir={dir} show={showSuccess}>
          {t('game.success')}
        </SuccessContainer>

        <CardListContainer>
          <ListCards>
            {cardData.map((card) => (
              <ListCard
                key={card.id}
                onClick={() => handleCardClick(card)}
                isActive={selectedCards.includes(card.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardContent>
                  <ContentImg src={card.imgSrc} alt="img" />
                  <p className='card-text'>{t(`cards.${card.id}`)}</p>
                </CardContent>
              </ListCard>
            ))}
          </ListCards>
        </CardListContainer>

        <ListSubjects>
          <ShowResultIcon
            type="button"
            onClick={toggleProgressContent}
            className="show-result-icon"
            aria-expanded={showProgressContent}
          >
            {showProgressContent ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
            <span className="game-icon_text">{t('game.viewScores')}</span>
            <span className="score-summary">
              {selectedCards.length}/15
            </span>
          </ShowResultIcon>

          <ProgressContent $show={showProgressContent}>
            <ScoresPanel
              initial="collapsed"
              animate={showProgressContent ? 'expanded' : 'collapsed'}
              variants={containerVariants}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <ScoreRow>
                <ScoreRowHeader>
                  <span>{t('game.subjects.excite')}</span>
                  <ScoreBadge>{progress.subOne}</ScoreBadge>
                </ScoreRowHeader>
                <ProgressBarContainer>
                  <Progress $progress={(progress.subOne / 15) * 100} $color="#FF8FB1" />
                </ProgressBarContainer>
              </ScoreRow>

              <ScoreRow>
                <ScoreRowHeader>
                  <span>{t('game.subjects.learn')}</span>
                  <ScoreBadge>{progress.subTwo}</ScoreBadge>
                </ScoreRowHeader>
                <ProgressBarContainer>
                  <Progress $progress={(progress.subTwo / 15) * 100} $color="#FFD166" />
                </ProgressBarContainer>
              </ScoreRow>

              <ScoreRow>
                <ScoreRowHeader>
                  <span>{t('game.subjects.peace')}</span>
                  <ScoreBadge>{progress.subThree}</ScoreBadge>
                </ScoreRowHeader>
                <ProgressBarContainer>
                  <Progress $progress={(progress.subThree / 15) * 100} $color="#7CDEDC" />
                </ProgressBarContainer>
              </ScoreRow>

              <EndButton type="button" onClick={endHandler}>
                {t('game.end')}
              </EndButton>
            </ScoresPanel>
          </ProgressContent>
        </ListSubjects>
      </ListContainer>
    </div>
  )
}

export default game
