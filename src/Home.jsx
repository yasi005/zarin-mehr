import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import Marquee from 'react-fast-marquee';
import exciteIcon from './assets/images/exciteIcon.svg';
import leanIcon from './assets/images/leanIcon.svg';
import peaceIcon from './assets/images/peaceIcon.svg';
import { useLanguage } from './i18n/LanguageContext';

const HomeContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1.5rem 0 2.5rem;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 2rem 0 3.5rem;
    gap: 0.5rem;
  }
`;

const HomeBanner = styled(motion.div)`
  width: 90%;
  height: 90vh;
  background: url("./src/assets/images/banner.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 25px;

  @media (min-width: 768px) {
    width: min(100%, 1100px);
    height: min(62vh, 520px);
    border-radius: 32px;
    box-shadow: 0 24px 60px rgba(12, 164, 212, 0.18);
  }

  @media (min-width: 1200px) {
    height: min(58vh, 560px);
  }
`;

const MarqueeText = styled.h2`
  font-size: 4.5rem;
  color: #0CA4D4;
  font-weight: 500;
  margin: 0.5rem 0 0 0;

  @media (min-width: 768px) {
    font-size: 5.5rem;
    margin: 1.25rem 0 0.5rem;
  }
`;

const HomeFilter = styled(motion.div)`
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    width: min(100%, 1100px);
    margin: 0 auto;
    padding: 1rem 24px 0;
    box-sizing: border-box;
  }
`;

const HomeRules = styled(motion.div)`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1.5rem 0;

  @media (min-width: 768px) {
    width: min(100%, 1100px);
    padding: 2.5rem 24px 1rem;
    box-sizing: border-box;
  }
`;

const RulesGrid = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const RuleCardStatic = styled.div`
  min-height: 280px;
  border: 5px solid #bde1f6;
  border-radius: 35px;
  background: #fff;
  text-align: center;
  padding: 1.25rem 1rem 1.5rem;
  box-sizing: border-box;
  box-shadow: 0 12px 32px rgba(12, 164, 212, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(12, 164, 212, 0.16);
  }

  .card-title {
    margin-top: 1rem;
  }
`;

const MobileRules = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: 900px) {
    display: none;
  }
`;

const subjectIds = ['peace', 'learn', 'excite'];
const subjectIcons = {
  excite: exciteIcon,
  peace: peaceIcon,
  learn: leanIcon,
};

const images = [
  { src: './src/assets/images/excite/sub1-1.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-2.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-3.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-4.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-5.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-6.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-7.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-8.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-9.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-10.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-11.png', subject: 'excite' },
  { src: './src/assets/images/excite/sub1-12.png', subject: 'excite' },
  { src: './src/assets/images/peace/sub3-1.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-2.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-3.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-4.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-5.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-6.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-7.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-8.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-9.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-10.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-11.png', subject: 'peace' },
  { src: './src/assets/images/peace/sub3-12.png', subject: 'peace' },
  { src: './src/assets/images/learn/sub2-1.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-2.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-3.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-4.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-5.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-6.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-7.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-8.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-9.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-10.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-11.png', subject: 'learn' },
  { src: './src/assets/images/learn/sub2-12.png', subject: 'learn' },
];

function Multiline({ text }) {
  return text.split('\n').map((line, index, arr) => (
    <React.Fragment key={`${line}-${index}`}>
      {line}
      {index < arr.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}

function Home() {
  const { t, dir, lang } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState('All');

  const filteredImages = selectedSubject === 'All'
    ? images
    : images.filter((image) => image.subject === selectedSubject);

  return (
    <div className='App home' dir={dir}>
      <HomeContainer>
        <HomeBanner />

        <Marquee gradient={false} direction={lang === 'fa' ? 'right' : 'left'}>
          <MarqueeText style={{ padding: '0 10px' }}>
            {t('home.marquee')}
          </MarqueeText>
        </Marquee>

        <HomeFilter>
          <div className="filter-header">
            <h2 className="filter-title">{t('home.filterTitle')}</h2>
            <p className="filter-text">{t('home.filterText')}</p>
          </div>

          <div className='filter-container'>
            <div className='filter-buttons'>
              {subjectIds.map((subject) => (
                <button
                  className='filter-btn'
                  key={subject}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                >
                  {t(`home.subjects.${subject}`)}
                  <img
                    src={subjectIcons[subject]}
                    alt=""
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              ))}
            </div>
            <Marquee speed={30} className='filter-row'>
              {filteredImages.slice(0, 6).map((image, index) => (
                <img className='filter-img' key={`a-${index}`} src={image.src} alt="" />
              ))}
            </Marquee>
            <Marquee direction={lang === 'fa' ? 'rtl' : 'ltr'} speed={30} className='filter-row'>
              {filteredImages.slice(6, 12).map((image, index) => (
                <img className='filter-img' key={`b-${index}`} src={image.src} alt="" />
              ))}
            </Marquee>
          </div>
        </HomeFilter>

        <HomeRules>
          <div className="rule-header">
            <h3 className="rule-title">{t('home.ruleTitle')}</h3>
            <h4 className="rule-preTitle">{t('home.rulePreTitle')}</h4>
            <p className="rule-text">
              <Multiline text={t('home.ruleText')} />
            </p>
          </div>

          <MobileRules>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="rule-cards"
            >
              <SwiperSlide className='rule-card'>
                <h2 className="card-title">{t('home.cards.chooseTitle')}</h2>
                <p className="card-text">
                  <Multiline text={t('home.cards.chooseText')} />
                </p>
              </SwiperSlide>
              <SwiperSlide className='rule-card'>
                <h2 className="card-title">{t('home.cards.categoryTitle')}</h2>
                <p className="card-text">
                  <Multiline text={t('home.cards.categoryText')} />
                </p>
              </SwiperSlide>
              <SwiperSlide className='rule-card'>
                <h2 className="card-title">{t('home.cards.characterTitle')}</h2>
                <p className="card-text">
                  <Multiline text={t('home.cards.characterText')} />
                </p>
              </SwiperSlide>
              <SwiperSlide className='rule-card'>
                <h2 className="card-title">{t('home.cards.prizeTitle')}</h2>
                <p className="card-text">
                  <Multiline text={t('home.cards.prizeText')} />
                </p>
              </SwiperSlide>
            </Swiper>
          </MobileRules>

          <RulesGrid>
            <RuleCardStatic>
              <h2 className="card-title">{t('home.cards.chooseTitle')}</h2>
              <p className="card-text">
                <Multiline text={t('home.cards.chooseText')} />
              </p>
            </RuleCardStatic>
            <RuleCardStatic>
              <h2 className="card-title">{t('home.cards.categoryTitle')}</h2>
              <p className="card-text">
                <Multiline text={t('home.cards.categoryText')} />
              </p>
            </RuleCardStatic>
            <RuleCardStatic>
              <h2 className="card-title">{t('home.cards.characterTitle')}</h2>
              <p className="card-text">
                <Multiline text={t('home.cards.characterText')} />
              </p>
            </RuleCardStatic>
            <RuleCardStatic>
              <h2 className="card-title">{t('home.cards.prizeTitle')}</h2>
              <p className="card-text">
                <Multiline text={t('home.cards.prizeText')} />
              </p>
            </RuleCardStatic>
          </RulesGrid>
        </HomeRules>

        <a href='/login' className="home-btn">
          {t('home.enter')}
        </a>
      </HomeContainer>
    </div>
  );
}

export default Home;
