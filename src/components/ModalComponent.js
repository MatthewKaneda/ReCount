import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Text,
} from 'react-native';

const ModalComponent = (props) => {

  const [input, onChangeInput] = useState(0);

  // player selected = props.playerSelected

  const modalStyles = {
    player: {
      placeholderText: 'Player Name',
      keyboardType: 'default',
      submitButtonText: 'Add Player',
    },
    score: {
      placeholderText: 'Score',
      keyboardType: 'numbers-and-punctuation',
      submitButtonText: 'Add Score',
    },
  };

  const handleButtonPress = () => {
    if (props.modalType === 'score') {
      if (!isNaN(parseInt(input, 10))) {
        let updatedScore = props.playerSelected.score + parseInt(input, 10) || 0;
        props.handleScoreUpdate(updatedScore);
      }
      // props.onScoreSubmit(props.tempCount + parseInt(props.tempScore, 10) || 0);
      onChangeInput('');
      props.setModalVisible(props.modalVisible);
      // props.onChangeScore('');
    } else if (props.modalType === 'player') {
      onChangeInput('');
      props.handleAddPlayer(input);
      props.setModalVisible(props.modalVisible);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      // presentationStyle="formSheet"
      visible={props.modalVisible}
    >
      <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
        <TouchableOpacity
          style={{flex: 4}}
          onPress={() => props.setModalVisible(props.modalVisible)}
        />
        <View style={styles.modalView}>
          {props.popupTitle !== '' ? (
            <Text style={styles.popupTitle}>{props.popupTitle}</Text>
          ) : null}
          <View style={styles.scoreInputContainer}>
            <TextInput
              style={styles.scoreInput}
              // onChangeText={props.onChangeScore}
              onChangeText={onChangeInput}
              placeholder={modalStyles[props.modalType].placeholderText}
              keyboardType={modalStyles[props.modalType].keyboardType}
              // value={props.tempScore}
              value={input}
              autoFocus={true}
            />
            <Button
              onPress={handleButtonPress}
              title={modalStyles[props.modalType].submitButtonText}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: '50%',
    marginTop: 'auto',
    backgroundColor: 'white',
    // backgroundColor: 'black',
    // opacity: 0.5,
    opacity: 1,
    margin: 40,
    borderRadius: 10,
    // flexDirection: 'row',
    // shadowColor: '#000',
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#171717',
    // shadowOffset: {width: 100, height: 100},
    shadowOpacity: 0.4,
    shadowRadius: 100,
  },
  scoreInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 4,
    // backgroundColor: 'black',
    // opacity: 0.7,
  },
  scoreInput: {
    height: 40,
    width: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  popupTitle: {
    fontSize: 18,
  },
});

export default ModalComponent;
