import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const WalkingGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/redLakeWalking.jpg')}
      city={'Imotski'}
      navigate={'Overview'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'Red Lake'}
      title={'Walking Tour'}
      details={
        <GalleryTemplate
          image1={require('../../images/blueLakeArticle.jpg')}
          image2={require('../../images/blueLake.jpg')}
          image3={require('../../images/blueLakeH.jpg')}
          image4={require('../../images/blueLakeArticle.jpg')}
          image5={require('../../images/blueLake.jpg')}
          image6={require('../../images/blueLakeH.jpg')}
        />
      }
    />
  );
};
