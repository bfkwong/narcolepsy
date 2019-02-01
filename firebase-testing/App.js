import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {Constants} from 'expo';
import * as firebase from 'firebase';
import { addone } from './test_functions.js';

const config = {
    apiKey: "AIzaSyAe7ExQFhUoIzeeWEhpEEMobVLa6WdwUa8",
    authDomain: "fir-testing-fe210.firebaseapp.com",
    databaseURL: "https://fir-testing-fe210.firebaseio.com",
    projectId: "fir-testing-fe210",
    storageBucket: "",
    messagingSenderId: "113944131587"
  };
  firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: [],
      add_count: 0
    }
    this.addit = this.addit.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("messages")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("messages")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages]
          }))
        }
      })

  }

  addItem () {
    if (!this.state.message) return;

    const newMessage = firebase.database().ref()
                          .child("messages")
                          .push();
    newMessage.set(this.state.message, () => this.setState({message: ''}))
  }

  addit () {
  	let x = this.state.add_count;
  	let y = addone(x);
  	this.setState({add_count: y});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput placeholder='Enter your message'
            value={this.state.message}
            onChangeText={(text) => this.setState({message: text})}
            style={styles.txtInput}/>
          <Button title='Send' onPress={this.addItem}/>
        </View>
        <FlatList data={this.state.messages}
          renderItem={
            ({item}) => 
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item}
              </Text>
            </View>
          }
          />
        <View style={styles.halfo}>
          <Text style={styles.finn}>
                {this.state.add_count}
          </Text>
          <Button title='Add 1 (from external js file)' onPress={this.addit}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    marginTop: Constants.statusBarHeight
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  txtInput: {
    flex: 1
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  finn: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
    marginBottom: 5,
  },
  halfo: {
      backgroundColor: 'skyblue',
      flex: 1,
      justifyContent: "center",
      padding: 20,
  },
  listItem: {
    fontSize: 20,
    padding: 10
  }
});
