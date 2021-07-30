import {
  faArrowLeft,
  faTimes,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';

//dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GalleryTemplate = props => {
  const images = [
    {
      key: 1,
      image: props.image1,
    },
    {
      key: 2,
      image: props.image2,
    },
    {
      key: 3,
      image: props.image3,
    },
    {
      key: 4,
      image: props.image4,
    },
    {
      key: 5,
      image: props.image5,
    },
    {
      key: 6,
      image: props.image6,
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  let [imageIndex, setImageIndex] = useState(0);
  let [modalIndex, setModalIndex] = useState(0);

  let currentImage = images[imageIndex];

  const openModal = Index => {
    setModalVisible(true);
    imageIndex = Index;
    currentImage = images[Index];
    console.log(currentImage);
    setImageIndex(imageIndex);
    setModalIndex(imageIndex);
  };

  const nextImg = modalIndex => {
    if (modalIndex === images.length - 1) {
      modalIndex = 0;
      setModalIndex(modalIndex);
      imageIndex = modalIndex;
      setImageIndex(imageIndex);
      currentImage = images[imageIndex];
    } else {
      modalIndex++;
      setModalIndex(modalIndex);
      imageIndex = modalIndex;
      setImageIndex(imageIndex);
      currentImage = images[imageIndex];
    }
  };

  const prevImg = modalIndex => {
    if (modalIndex === 0) {
      modalIndex = images.length - 1;
      setModalIndex(modalIndex);
      imageIndex = modalIndex;
      setImageIndex(imageIndex);
      currentImage = images[imageIndex];
    } else {
      modalIndex--;
      setModalIndex(modalIndex);
      imageIndex = modalIndex;
      setImageIndex(imageIndex);
      currentImage = images[imageIndex];
    }
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
    //setModalImage({image: ''});
  };

  return (
    <>
      <View style={styles.container}>
        {images.map((item, index) => (
          <Pressable
            onPress={() => {
              openModal(index, item.image);
            }}>
            <Image key={item.key} source={item.image} style={styles.image} />
          </Pressable>
        ))}
      </View>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.modal}>
            <Image
              source={currentImage.image}
              key={modalIndex}
              style={styles.modalImg}
            />
            <Pressable onPress={closeModal} style={styles.btnClose}>
              <FontAwesomeIcon
                icon={faTimes}
                color={'rgba(0, 0, 0, 0.8)'}
                size={20}
              />
            </Pressable>
            <Pressable
              onPress={() => prevImg(modalIndex)}
              style={styles.btnLeft}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                color={'rgba(0,0,0,0.8)'}
                size={20}
              />
            </Pressable>
            <Pressable
              onPress={() => nextImg(modalIndex)}
              style={styles.btnRight}>
              <FontAwesomeIcon
                icon={faArrowRight}
                color={'rgba(0,0,0,0.8)'}
                size={20}
              />
            </Pressable>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default GalleryTemplate;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    bottom: windowWidth * 0.2,
    elevation: 5,
  },
  image: {
    width: 118,
    height: 70,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderStyle: 'solid',
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    paddingVertical: windowHeight * 0.25,
    paddingHorizontal: windowWidth * 0.2,
  },
  modalImg: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.5,
  },
  btnClose: {
    position: 'absolute',
    top: windowWidth * 0.5,
    left: windowWidth * 0.85,
  },
  btnLeft: {
    position: 'absolute',
    top: windowWidth * 0.9,
    right: windowWidth * 0.85,
  },
  btnRight: {
    position: 'absolute',
    top: windowWidth * 0.9,
    left: windowWidth * 0.85,
  },
});