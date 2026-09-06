import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Disco from './components/Results/Disco';
import Learn from './components/Results/Learn';
import StringLight from './components/Results/StringLight';
import Peace from './components/Results/Peace';
import GrowLight from './components/Results/GrowLight';
import LampShade from './components/Results/LampshadeLight';
import AromatherapyLight from './components/Results/AromatherapyLight';
import { useLanguage } from './i18n/LanguageContext';

function pickResultComponent(userData) {
  const e = userData.excite_count;
  const l = userData.learn_count;
  const p = userData.peace_count;

  if (e === l && l === p) return LampShade;

  // Strict orderings
  if (e > l && l > p) return Disco;
  if (e > p && p > l) return AromatherapyLight;
  if (l > e && e > p) return StringLight;
  if (l > p && p > e) return AromatherapyLight;
  if (p > e && e > l) return Peace;
  if (p > l && l > e) return GrowLight;

  // Ties (including peace high + excite == learn, which was blank before)
  if (e === p && e > l) return Learn;
  if (p === l && p > e) return Peace;
  if (e === l && e > p) return Disco;
  if (e === l && p > e) return Peace;
  if (e === p && l > e) return StringLight;
  if (l === p && e > l) return Disco;

  // Fallback by dominant category
  const max = Math.max(e, l, p);
  if (e === max) return Disco;
  if (l === max) return StringLight;
  return Peace;
}

function Result() {
  const location = useLocation();
  const { t } = useLanguage();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (location.state?.exciteCount != null) {
      const { userId, exciteCount, learnCount, peaceCount, firstName, lastName } = location.state;
      const next = {
        userId,
        excite_count: exciteCount,
        learn_count: learnCount,
        peace_count: peaceCount,
        firstName,
        lastName,
      };
      setUserData(next);
      localStorage.setItem('lastResult', JSON.stringify(next));
      return;
    }

    const cached = localStorage.getItem('lastResult');
    if (cached) {
      try {
        setUserData(JSON.parse(cached));
      } catch {
        setUserData(null);
      }
    }
  }, [location.state]);

  const ResultView = userData ? pickResultComponent(userData) : null;

  return (
    <div>
      {ResultView ? (
        <ResultView userData={userData} />
      ) : (
        <p>{t('result.noData')}</p>
      )}
    </div>
  );
}

export default Result;
