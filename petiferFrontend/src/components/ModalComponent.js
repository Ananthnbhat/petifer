import React from 'react';
import { Button, Text, View } from 'react-native';
import Modal from 'react-native-modal';

const ModalComponent = ({ openModal, modalText }) => {
  const [isModalVisible, setModalVisible] = useState(openModal || false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>{modalText}</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
