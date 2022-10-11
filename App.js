import {React, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Touchable,
  Keyboard,
  Button,
  modal,
  Modal,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ActionSheetIOS,
} from 'react-native';
import ModalComponent from './src/components/ModalComponent';
import PlayerTableComponent from './src/components/PlayerTableComponent';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const HelloWorldApp = () => {
  const [score, onChangeScore] = useState(0);
  const [name, onChangeName] = useState('');
  const [count, onPress] = useState(0);
  const [people, onAdd] = useState([]);
  const [modalAddScoreVisible, setModalVisible] = useState(false);
  const [modalAddPlayerVisible, setAddPlayerVisible] = useState(false);
  const [playerKeyClicked, setPlayerKeyClickeck] = useState('');

  const [players, modifyPlayers] = useState({});

  const samplePlayers = {
    test1: {
      name: 'Tom',
      score: 0,
    },
    test2: {
      name: 'Alex',
      score: 0,
    },
  };

  const handleReset = () => {
    onChangeScore('');
    onPress(0);
    onAdd([]);
    modifyPlayers({});
  };

  const hash = () => {
    let randomHash = Math.random().toString(36).substring(7);
    return randomHash;
  };

  const getPlayerKey = () => {
    let numberOfPlayers = Object.keys(players).length;
    return numberOfPlayers === 0 ? 0 : parseInt(Object.keys(players)[numberOfPlayers - 1], 10) + 1;
  };

  const handlePlayerClicked = (playerKeyIdx) => {
    let playerKey = Object.keys(players)[playerKeyIdx];
    setPlayerKeyClickeck(playerKey);
    setModalVisible(!modalAddScoreVisible);
  };

  const handleScoreUpdate = (scoreToAdd) => {
    let player = players[playerKeyClicked];
    let newPlayer = {
      [playerKeyClicked]: {
        name: player.name,
        score: parseInt(scoreToAdd, 10),
        testText: "<Text style={{color: 'red'}}>Testing colors</Text>",
      },
    };
    modifyPlayers(oldPlayers => ({
      ...oldPlayers,
      ...newPlayer,
    }));
  };

  const handleAddPlayer = (playerName) => {
    // name !== '' ? onAdd(people => [...people, name]) : null;
    let newPlayer = {
      [hash()]: {
        name: playerName,
        score: 0,
        testText: "<Text style={{color: 'red'}}>Testing colors</Text>",
      },
    };
    playerName !== ''
      ? modifyPlayers(players => ({
          ...players,
          ...newPlayer,
        }))
      : null;
    onChangeName('');
  };

  const handleEditMenu = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Add Player', 'Delete Player', 'New Game'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          // cancel action
        } else if (buttonIndex == 1) {
          setAddPlayerVisible(!modalAddPlayerVisible);
        } else if (buttonIndex == 2) {
          // Delete player
        } else if (buttonIndex == 3) {
          handleReset();
        }
      },
    );

  let tempStats = [];

  Object.entries(samplePlayers).map(([keyOuter, valueOuter]) => {
    tempStats.push([valueOuter.name, valueOuter.score]);
  });

  const testText = "<Text style={{color: 'red'}}>Testing colors</Text>";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* <View style={{flexDirection: 'column', flex: 1}}> */}
      {/* </View> */}
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonView}>
          {Object.keys(players).length > 0 ? (
            <Button
              // style={styles.editButton}
              onPress={() => handleEditMenu()}
              title="Edit"
            />
          ) : null}
        </View>
        <View style={styles.secondContainer}>
          <Text></Text>
          {Object.keys(players).length > 0 ? (
            <PlayerTableComponent
              players={players}
              handlePlayerClicked={handlePlayerClicked}
            />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.startText}>Please add players to start</Text>
              {/* <View style={styles.addPlayerButton}>
                <Button
                  onPress={() => setAddPlayerVisible(!modalAddPlayerVisible)}
                  title="Add Player"
                />
              </View> */}
              <TouchableWithoutFeedback onPress={() => setAddPlayerVisible(!modalAddPlayerVisible)}>
                <View style={styles.addPlayerButton}>
                  <Text style={styles.addPlayerButtonText}>Add Player</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          <ModalComponent
            popupTitle={Object.keys(players).length > 0 && modalAddScoreVisible ? `Input Score for ${players[playerKeyClicked].name}` : null}
            modalVisible={modalAddScoreVisible}
            setModalVisible={() => setModalVisible(!modalAddScoreVisible)}
            playerSelected={players[playerKeyClicked]}
            players={players}
            handleScoreUpdate={handleScoreUpdate}
            modalType="score"
            handleAddPlayer={handleAddPlayer}
            // onChangeScore={onChangeScore}
            // onScoreSubmit={onPress}
            // tempScore={score}
            // tempCount={count}
          />
          <ModalComponent
            // popupTitle="Add Player"
            popupTitle=""
            modalVisible={modalAddPlayerVisible}
            setModalVisible={() => setAddPlayerVisible(!modalAddPlayerVisible)}
            playerSelected={players[playerKeyClicked]}
            players={players}
            handleScoreUpdate={handleScoreUpdate}
            handleAddPlayer={handleAddPlayer}
            modalType="player"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  secondContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  footer: {
    flex: 1,
    backgroundColor: '#ddd',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    padding: 26,
  },
  buttonContainer: {
    // ...StyleSheet.absoluteFillObject,
    // marginTop: 30,
    // marginRight: -20,
    position: 'relative',
    // top: 20,
    // right: 5,
    // alignSelf: 'flex-end',
    // marginTop: -5,
    // position: 'absolute',
  },
  buttonStyle: {
    position: 'absolute',
    top: 8,
    right: 16,
  },
  buttonView: {
    // flex: 1,
    // flexDirection: 'column',
    alignSelf: 'flex-end',
    marginTop: -10,
    marginRight: 10,
  },
  menuButton: {
    color: '#007AFF',
    marginRight: 10,
    fontSize: 18,
  },
  startText: {
    fontSize: 28,
    textAlign: 'center',
  },
  addPlayerButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  addPlayerButtonText: {
    fontSize: 18,
    color: '#007AFF',
    padding: 10,
  },
});

export default HelloWorldApp;
