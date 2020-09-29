
import React, { Component } from 'react';
import {
  StyleSheet,
  View, TouchableHighlight,
  Button, Modal,
  Text, FlatList, Image, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from './actions/pageList';

class App extends Component {

  state = {

  }

  componentDidMount() {
    this.getData()
  }


  getData() {
    let { actions } = this.props;
    actions.getPageList();
  }

  _onPress = (item) => {
    this.setState({ selectedItem: item })
  }

  render() {
    const { pageList } = this.props;
    console.log("pageList", JSON.stringify(pageList));
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={pageList}
          renderItem={({ item, index, separators }) => (
            <TouchableHighlight
              style={styles.cell}
              key={item.key}
              onPress={() => this._onPress(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={{ backgroundColor: 'white', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={styles.imageContainer}>
                  <Image
                    style={{ flex: 1, backgroundColor: "green" }}
                    source={{ uri: item.thumbnailUrl }}>
                  </Image>
                </View>
                <Text style={{ width: "85%", height: 40, textAlign: "left" }} numberOfLines={2}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item.id.toString()}

          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({ highlighted }) => (
              <View
                style={[
                  styles.separator,
                  highlighted && { marginLeft: 0 }
                ]}
              />
            ))
          }
        />
        {this.state.selectedItem && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              this.setState({ selectedItem: undefined })
            }}
          >
            <SafeAreaView style={{ width: "100%", height: "100%", alignSelf: "center", backgroundColor: "white" }}>
              <View style={{ height: 30, width: "100%" }}>
                <TouchableHighlight onPress={() => { this.setState({ selectedItem: undefined }) }}>
                  <Text style={{ alignSelf: "flex-end", margin: 4 }}>Close</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={{ uri: this.state.selectedItem.url }}
                  style={{ height: 300, width: "100%", backgroundColor: "gray" }}
                ></Image>
                <Text style={{ margin: 8 }}>{this.state.selectedItem.title}</Text>
                <View style={{ flex: 1 }}></View>
              </View>
            </SafeAreaView>

          </Modal>
        )}
      </SafeAreaView>

    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell: {
    flex: 1,
    minHeight: 40,
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center'
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: 1
  },
  employeeWrapper: {
    padding: 10,
    borderBottomWidth: 1

  },
  imageContainer: {
    marginLeft: 8,
    marginRight: 8,
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: "hidden"
  }
});

const mapStateToProps = state => ({
  pageList: state.pageList.pageList,
});

const ActionCreators = Object.assign(
  {},
  pageActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
