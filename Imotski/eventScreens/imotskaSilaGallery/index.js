import React from 'react';
import {useTheme} from 'styled-components';
import ActivitiesInfoTemplate from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const ImotskaSilaGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/imotskaSila.jpg')}
      city={'Imotski'}
      navigate={'Entertainment Screen'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'City Imotski'}
      title={'Imotska Sila'}
      details={
        <GalleryTemplate
          image1={require('../../images/imotskaSila.jpg')}
          image2={require('../../images/imotskaSila/imotskaSila.jpg')}
          image3={require('../../images/imotskaSila/imotskaSila1.jpg')}
          image4={require('../../images/imotskaSila/imotskaSila2.jpg')}
          image5={require('../../images/imotskaSila/imotskaSila3.jpg')}
          image6={require('../../images/imotskaSila/imotskaSila4.jpg')}
        />
      }
    />
  );
};
