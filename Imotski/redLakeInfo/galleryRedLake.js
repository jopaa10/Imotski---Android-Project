import React from 'react';

//overview template
import {TemplateInfo} from '../infoTemplate';

//gallery template
import GalleryTemplate from '../galleryTemplate';
import {useTheme} from 'styled-components';

export const GalleryRedLake = () => {
  const {colors} = useTheme();

  return (
    <>
      <TemplateInfo
        image={require('../images/redLakeH.jpg')}
        city={'Imotski'}
        sight={'Red Lake'}
        title={'Red Lake'}
        color={'grey'}
        color2={colors.PRIMARY_TEXT_COLOR}
        color3={'grey'}
        gallery={
          <GalleryTemplate
            image1={require('../images/redLakeWalking.jpg')}
            image2={require('../images/redLake.jpg')}
            image3={require('../images/redLakeH.jpg')}
            image4={require('../images/redLakeWalking.jpg')}
            image5={require('../images/redLake.jpg')}
            image6={require('../images/redLakeH.jpg')}
          />
        }
      />
    </>
  );
};
