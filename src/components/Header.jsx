import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import Logo from "../assets/images/Logo.png"
import { useLanguage } from '../i18n/LanguageContext';

const HeaderContainer = styled(motion.header)`
  width: inherit;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  direction: ${(props) => props.$dir};
  text-align: center;

  @media (min-width: 768px) {
    margin: 1.75rem auto 1rem;
    max-width: 1100px;
    gap: 14px;

    .logo-img {
      max-width: 120px;
      height: auto;
    }

    .header-title {
      font-size: 1.65rem;
      max-width: 640px;
      line-height: 1.4;
    }
  }
`;

const Header = () => {
  const { t, dir } = useLanguage();

  return (
    <HeaderContainer $dir={dir}>
      <div className="header-logo">
        <img src={Logo} alt="" className="logo-img" />
      </div>
      <h2 className="header-title">
        {t('game.headerTitle')}
      </h2>
    </HeaderContainer>
  )
}

export default Header;
