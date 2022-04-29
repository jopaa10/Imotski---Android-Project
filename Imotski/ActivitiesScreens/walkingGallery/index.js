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
          image1={require('../../images/redLakeWalking.jpg')}
          image2={require('../../images/walking/walkingTour.jpg')}
          image3={require('../../images/walking/walkingTour1.jpg')}
          image4={require('../../images/walking/walkingTour2.jpg')}
          image5={require('../../images/walking/walkingTour3.jpg')}
          image6={require('../../images/walking/walkingTour4.jpg')}
        />
      }
    />
  );
};
