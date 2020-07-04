import React, {useContext} from 'react';
import {ConfigContext} from '../routes';
import ImageBanner from './ImageBanner';
import Banner from './Banner';
import Styles from 'styles/About.css';
import { Link } from 'react-router-dom';

export default function About () {

  const { url, token, env } = useContext(ConfigContext);
  const userDataUrl = env === 'production' ? '/assets' : url;

  return (
    <div>
      <ImageBanner 
        url={"/assets/ferrari/three.JPEG"} 
        heading={"About us"}
        paragraph={"Professional paint protection installers with over 15 years of experience working on dozens of high end car brands"}
        bottomStatement={"Learn more about us below"}
        // coverPosition={'top'}
      />
      <Banner heading={'Meet the team'} color='#f1f1f1' fontColor='#444' paddingBottom={'20px'}/>
      <div className={Styles.aboutContainer}>
        <div className={Styles.aboutSubContainer}>
          <div className={Styles.imageContainer}>
            <img className={Styles.image} src={'/assets/gabe.jpg'} />
          </div>
          <div className={Styles.textContainer}>
            <div className={Styles.heading}>Gabriel Mello</div>
            <div className={Styles.title}>CEO of Automotive Shield</div>
            <div className={Styles.text}>
              Gabriel has over 14 years of experience working in the car wash and auto detailing industry. 
              Ever since a young age he was passionate about super cars and would watch endless episodes of Top Gear.
              After acquiring years experience Gabriel wanted to turn his passion into a business. Thats when 
              Gabriel decided to move to Florida and open up Automotive Shield and 918 Hand Car Wash. 
              Ever since he has been serving customers and providing high quality service with his partner Lou.
            </div>
          </div>
          <div className={Styles.imageContainer}>
            <img className={Styles.image} src={'/assets/partner.jpeg'} />
          </div>
          <div className={Styles.textContainer}>
            <div className={Styles.heading}>Lou</div>
            <div className={Styles.title}>Paint Protection Installer</div>
            <div className={Styles.text}>
            With 14 years of experience and over 13,000 installs done,
            Lou is easily one of the best paint protection installers in the country. 
            His knowledge, experience and attention to detail provide a quality of work 
            that is unmatched. Lou has worked for many paint protection companies in the past and has   
            perfected his skills over the years. Along with his years of experience, Lou is also a XPEL 
            certified installer making him a true master of his craft.
            </div>
          </div>
        </div>
      </div>
      <Banner heading={'Our Commitment'} color='#131921' fontColor='white' paddingBottom={'20px'}/>
      <div className={Styles.commitment}>
        <div>
        With almost 30 years of experience combined, we are prepared to provide 
        the highest quality of service every step of the way.
        </div>
        <Link to={'/contact'} className={Styles.button}>Get in touch</Link>
      </div>
    </div>
  );
};

// has over 14 years experience and over 13.000 installs done, 
// this easily makes this man one of the best clear Bra installers 
// in the country, his knowledge, experience and quality are untouchable. 
// Lou has worked for many clear bra companies in the past where he acquire all
// the experience that makes him one of the best. Lou is a Xpel certified installer.

/*

  With 14 years of experience and over 13,000 installs done,
  Lou is easily one of the best paint protection installers in the country. 
  His knowledge, experience and attention to detail provide a quality of work 
  that is unmatched. Lou has worked for many paint protection companies in the past and has   
  perfected his skills over the years. Along with his years of experience, Lou is also a XPEL 
  certified installer making him a true master of his craft.

has over 14 years experience in the auto detailing and car wash business,
he has worked and all types of cars from regular cars to exotics and classics, 
Gabe has worked and owned detail shops in Massachusetts, 
now in South Florida Gabe owns 918 Hand car wash and auto detail.

With over 14 years of experience in the auto detailing and car wash industry, Gabriel has worked 
on all types of cars from standard cars to exotics and classics. 

Gabriel has over 14 years of experience working in the car wash and auto detailing industry. 
Ever since a young age he was passionate about super cars and would watch endless episodes of Top Gear.
After acquiring years experience Gabriel wanted to turn his passion into a business. Thats when 
Gabriel decided to move to Florida and open up Automotive Shield and 918 Hand Car Wash. 

Both of them have about 30 years experience combined in the business, 
what set us apart from our competition is our passions for the cars, we have a professional d
etailer on site to make sure the car is ready for the PPF installation and also have best installer 
that will make sure the car is done correctly. ClearbraFlorida is also Xpel Certified meaning you will
 always get the best product and the correct warranty from us.

With almost 30 years of experience combined, we are prepared to provide the highest quality of service
every step of the way.  

*/