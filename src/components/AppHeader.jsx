import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoHomeOutline } from 'react-icons/io5';
import { useLanguage } from '../i18n/LanguageContext';

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100%;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(12, 164, 212, 0.15);
`;

const HeaderBar = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  box-sizing: border-box;
  direction: ${(props) => props.$dir};

  @media (min-width: 768px) {
    max-width: 1100px;
    padding: 10px 28px;
  }

  @media (min-width: 1200px) {
    max-width: 1240px;
  }
`;

const Brand = styled(Link)`
  display: none;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #0ca4d4;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.02em;

  @media (min-width: 768px) {
    display: inline-flex;
  }
`;

const IconButton = styled(Link)`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0ca4d4;
  background: #fff;
  border: 1.5px solid #0ca4d4;
  text-decoration: none;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #0ca4d4;
    color: #fff;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const TimeBlock = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
`;

const TimeValue = styled.time`
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const TimeZone = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: #0ca4d4;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const LangButton = styled.button`
  border: 1.5px solid #0ca4d4;
  background: #fff;
  color: #0ca4d4;
  border-radius: 999px;
  min-width: 48px;
  height: 36px;
  padding: 0 12px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #0ca4d4;
    color: #fff;
  }

  @media (min-width: 768px) {
    min-width: 56px;
    height: 38px;
  }
`;

function getClockParts(date, lang) {
  const locale = lang === 'fa' ? 'fa-IR' : 'en-GB';
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  let zone = '';
  try {
    zone =
      new Intl.DateTimeFormat(locale, { timeZoneName: 'shortOffset' })
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName')?.value || '';
  } catch {
    zone =
      new Intl.DateTimeFormat(locale, { timeZoneName: 'short' })
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName')?.value || '';
  }

  return { time, zone: zone.replace(/^GMT/, 'UTC') };
}

export default function AppHeader() {
  const { t, toggleLang, dir, lang } = useLanguage();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { time, zone } = getClockParts(now, lang);

  return (
    <HeaderShell>
      <HeaderBar $dir={dir}>
        <IconButton to="/" aria-label={t('header.home')} title={t('header.home')}>
          <IoHomeOutline size={18} />
        </IconButton>

        <Brand to="/" aria-label={t('header.home')}>
          Zarrin Mehr
        </Brand>

        <TimeBlock title={t('header.localTime')}>
          <TimeValue dateTime={now.toISOString()}>{time}</TimeValue>
          {zone ? <TimeZone>{zone}</TimeZone> : null}
        </TimeBlock>

        <LangButton type="button" onClick={toggleLang} aria-label="Toggle language">
          {t('langToggle')}
        </LangButton>
      </HeaderBar>
    </HeaderShell>
  );
}
