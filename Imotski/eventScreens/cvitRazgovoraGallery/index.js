import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const CvitRazgovoraGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/cvitRazgovora.jpg')}
      city={'Imotski'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'City Imotski'}
      title={'Cvit Razgovora'}
      navigate={'Entertainment Screen'}
      details={
        <GalleryTemplate
          image1={require('../../images/cvitRazgovora.jpg')}
          image2={require('../../images/cvitRazgovora/cvitRazgovora.jpg')}
          image3={require('../../images/cvitRazgovora/cvitRazgovora1.jpg')}
          image4={require('../../images/cvitRazgovora/cvitRazgovora2.jpg')}
          image5={require('../../images/cvitRazgovora/cvitRazgovora3.jpg')}
          image6={require('../../images/cvitRazgovora/cvitRazgovora4.jpg')}
        />
      }
    />
  );
};
