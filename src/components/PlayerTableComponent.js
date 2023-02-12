import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {
  Table,
  Row,
  TableWrapper,
  Cell,
} from 'react-native-table-component';

const PlayerTableComponent = (props) => {
  const sampleHeader = ['Names', 'Score'];

  let tempStats = [];

  Object.entries(props.players).map(([keyOuter, valueOuter]) => {
    tempStats.push([valueOuter.name, valueOuter.score]);
  });

  return (
    <SafeAreaView style={styles.sampleContainer}>
      <ScrollView horizontal={true}>
        {/* <View style={styles.scrollView}> */}
        <View style={{width: useWindowDimensions().width - 20}}>
          <Table borderStyle={styles.borderStyle}>
          {/* <Table> */}
            <Row data={sampleHeader} style={styles.head} textStyle={styles.text} />
            {
              tempStats.map((rowData, idx) => (
                <TableWrapper key={idx} style={styles.row}>
                  {
                    rowData.map((cellData, cellIdx) => (
                      <TouchableOpacity
                        style={styles.tableWrapper}
                        key={cellIdx}
                        // onPress={() => Alert.alert('Pressed')}
                        onPress={() => props.handlePlayerClicked(idx)}
                      >
                        <Cell data={cellData} textStyle={styles.text}/>
                      </TouchableOpacity>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sampleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    // borderWidth: 5,
    // borderColor: 'black',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    marginLeft: 6,
  },
  borderStyle: {
    borderWidth: 2,
    borderColor: '#c8e1ff',
    // alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#FFF1C1',
    // borderWidth: 1,
    // borderColor: '#c8e1ff',
  },
  tableWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  scrollView: {
    // alignSelf: 'stretch',
    // width: '100%',
    // borderWidth: 10,
    // borderColor: 'orange',
    // flexGrow: 1,
    // flex: 1,
    width: Dimensions.get('window').width - 20,
    // borderWidth: 5,
    // borderColor: 'black',
  },
});

export default PlayerTableComponent;
