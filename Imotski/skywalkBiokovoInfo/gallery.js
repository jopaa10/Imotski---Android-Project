import React from 'react';

//overview template
import {TemplateInfo} from '../infoTemplate';

//gallery template
import GalleryTemplate from '../galleryTemplate';
import {useTheme} from 'styled-components';

export const GallerySkywalk = () => {
  const {colors} = useTheme();

  return (
    <>
      <TemplateInfo
        image={require('../images/skywalkBiokovo.jpg')}
        city={'Biokovo'}
        sight={'Skywalk Biokovo'}
        title={'Skywalk Biokovo'}
        navigateBack={'Explore Biokovo'}
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
