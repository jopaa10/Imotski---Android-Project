import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const ZabarskaGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/zabarskaVecerImotski.jpg')}
      city={'Zmijavci'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'Zmijavci'}
      title={'Zabarska Vecer'}
      navigate={'Entertainment Screen'}
      details={
        <GalleryTemplate
          image1={require('../../images/zabarskaVecerImotski.jpg')}
          image2={require('../../images/zabarskaVecer/zabarskaVecer.jpg')}
          image3={require('../../images/zabarskaVecer/zabarskaVecer1.jpg')}
          image4={require('../../images/zabarskaVecer/zabarskaVecer2.jpg')}
          image5={require('../../images/zabarskaVecer/zabarskaVecer3.jpg')}
          image6={require('../../images/zabarskaVecer/zabarskaVecer4.jpg')}
        />
      }
    />
  );
};
