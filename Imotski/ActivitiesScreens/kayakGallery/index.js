import React from 'react';
import {useTheme} from 'styled-components';
import {ActivitiesInfoTemplate} from '../../ActivitiesInfoTemplate';
import GalleryTemplate from '../../galleryTemplate';

export const KayakGallery = () => {
  const {colors} = useTheme();
  return (
    <ActivitiesInfoTemplate
      image={require('../../images/kayakAdventure.jpg')}
      city={'Imotski'}
      color={'grey'}
      color2={colors.PRIMARY_TEXT_COLOR}
      sight={'Vrljika river'}
      title={'Kayak adventures on Vrljika river'}
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
