import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../../i18n/LanguageContext';;


const Aromathephy = styled(motion.div)`
  max-width: 470px;
  width: 100%;
  margin: 0 auto;
  height: 155vh;
  background: url("./src/assets/images/AromatherapyBg.svg");
  background-color: #cecece;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* overflow: hidden; */
  overflow:  hidden;
`

const AromathephyFooter = styled(motion.footer)`
  width: 100%;
  padding: 3rem 0 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AromathephyHeader = styled(motion.header)`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const AromathephyContainer = styled(motion.div)`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  direction: rtl;
  /* CENTER CONTENT */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`

const AromathephyAbsoluteImg = styled(motion.div)`
  position: absolute;
  content: "";
  width: 180px;
  height: 180px;
  left: -6.3rem;
  bottom: 500px;
  z-index: 1;
`

const AromathephyText = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 4rem 0;
`

const AromathephyEmojies = styled(motion.ul)`
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1.5rem;
  margin: 2rem 0 1rem 0;
  padding: 0;
`


const AromathephyEmoji = styled(motion.li)`
`

const emojiVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  },
};


function AromatherapyLight() {
  const { t, tList, dir } = useLanguage();

  // DOWNLOAD IMAGE 
  const imageUrl = './src/assets/images/aromatherapyResultDownload.jpg';

  const handleDownloadImages = () => {
    downloadImage(imageUrl);
  };

  const downloadImage = (imageUrl) => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'result.jpg'; // You can set the filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ANIMATION
  const { ref: containerRef, inView: containerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: emojiRef1, inView: emojiInView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: emojiRef2, inView: emojiInView2 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: emojiRef3, inView: emojiInView3 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const transition = { duration: 1.5, ease: 'easeInOut' };


  return (
    <Aromathephy>
      <AromathephyContainer ref={containerRef} dir={dir}>
        <AromathephyAbsoluteImg
          initial={{ opacity: 0, x: '-100%' }}
          animate={containerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <img src="./src/assets/images/AromatherapyIcon.svg" alt="Result Icon" />
        </AromathephyAbsoluteImg>

        {/* HEADER */}
        <AromathephyHeader
          initial={{ opacity: 0, y: -50 }}
          animate={containerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={transition}
        >
          <h2 className="result-title">
            {t('result.aroma.title')}
          </h2>
          <div className="result-header_text">
            {t('result.aroma.header').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 ? <br /> : null}</React.Fragment>
            ))}
          </div>
          <button className="result-btn aromathephy-btn" onClick={handleDownloadImages}>
            {t('result.saveShare')}
          </button>
        </AromathephyHeader>
        {/* HEADER */}

        {/* TEXT */}
        <AromathephyText
          initial={{ opacity: 0, x: '-100%' }}
          animate={containerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
          transition={transition}
        >
          <p className="result-text">
            {t('result.aroma.body')}
          </p>
        </AromathephyText>
        {/* TEXT */}

        {/* EMOJI */}
        <AromathephyEmojies>
          <AromathephyEmoji
            ref={emojiRef1}
            variants={emojiVariants}
            initial="hidden"
            animate={emojiInView1 ? "visible" : "hidden"}
          >
            <img src="./src/assets/images/defiantIcon.svg" alt="" className="emoji-img" />
            <p className="emoji-text">
              {tList('result.aroma.emojis')[0]}
            </p>
          </AromathephyEmoji>

          <AromathephyEmoji
            ref={emojiRef2}
            variants={emojiVariants}
            initial="hidden"
            animate={emojiInView2 ? "visible" : "hidden"}
          >
            <img src="./src/assets/images/Hyperactive2.svg" alt="" className="emoji-img" />
            <p className="emoji-text">
              {tList('result.aroma.emojis')[1]}
            </p>
          </AromathephyEmoji>

          <AromathephyEmoji
            ref={emojiRef3}
            variants={emojiVariants}
            initial="hidden"
            animate={emojiInView3 ? "visible" : "hidden"}
          >
            <img src="./src/assets/images/experties.svg" alt="" className="emoji-img" />
            <p className="emoji-text">
              {tList('result.aroma.emojis')[2]}
            </p>
          </AromathephyEmoji>
        </AromathephyEmojies>
        {/* EMOJI */}

        {/* FOOTER */}
        <AromathephyFooter
          initial={{ opacity: 0, scale: 0.5 }}
          animate={containerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <img src="./src/assets/images/zarinWhiteLogo.svg" alt="footer-img" className="result-footer_img" />
        </AromathephyFooter>
        {/* FOOTER */}
      </AromathephyContainer>
    </Aromathephy>
  )
}

export default AromatherapyLight
