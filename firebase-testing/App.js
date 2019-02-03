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

export class App extends React.Component {
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
//
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
              <Button
                title="Full description"
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate('DescriptionScreen', {
                    title: item,
                    otherParam: 'anything you want here',
                  });
                }}
              />
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
    marginTop: Constants.statusBarHeight,
    marginBottom: 0
  },
  bottombith: {
    bottom: 0
  },
  mainBar: {
    backgroundColor: 'blue'
  },
  score: {
    backgroundColor: 'gold',
    textAlign: 'right',
    margin: 5,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  idea: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  filterBox: {
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    height: 75},

    descripBox: {
      flexDirection: 'row',
      backgroundColor: '#808080',
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
      justifyContent: "center",
      padding: 20,
      bottom: 10,
  },
  listItem: {
    fontSize: 20,
    padding: 10
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  logincontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});


import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = { header: null };
  render() {

    return (
      <View style={styles.container}>

        <View style={styles.filterBox}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', padding: 20}}>
            Filter by:
            </Text>
            <View style={{ padding: 10, width: 30, height: 30, backgroundColor: 'red',margin:10, marginTop: 25}}/>
            <View style={{padding:10, width: 30, height: 30, backgroundColor: 'orange',margin: 10, marginTop:25, textAlign: 'center'}}/>
            <View style={{padding:10, width: 30, height: 30, backgroundColor: 'green',margin: 10, marginTop:25, textAlign: 'center'}}/>
            <View style={{padding:10, width: 30, height: 30, backgroundColor: 'purple',margin: 10, marginTop:25, textAlign: 'center'}}/>
    </View>

        <FlatList data={["Poop", "Poop the Sequel",
                            "Poop: Origins", "Poop: Final Frontier"]} //normally data = this.state.messages
            renderItem={
              ({item}) =>
              <View style={styles.idea}>
                <Text style={styles.listItem}>
                  {item}
                </Text>
                <Text style={styles.score}>
                  23
                </Text>
              </View>
            }
        />

        <View style={styles.msgBox}>
                  <TextInput placeholder='Enter Idea'
                    /*value={this.state.message}

                    Potential here for onPress to switch UIs
                    or to expand the bar upwards

                    onChangeText={(text) => this.setState({message: text})}*/
                    style={styles.txtInput}/>
                  <Button title='Send' /*onPress={this.addItem}*//>
                </View>

      </View>

    );
  }
}

export class LoginScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

  }

  

  render() {
    return (
      <View style={styles.container}>
        
          <View style={styles.logincontainer}>
                <TextInput
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  placeholder={'Username'}
                  style={styles.input}
                />
                <TextInput
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  style={styles.input}
                />
                
                
              <Button
                title="Log In"
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate('Home', {
                    username: this.state.username,
                    password: this.state.password,
                  });
                }}
              />
          </View>  
        
      </View>
    );
  }
}

class DescriptionScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('username', 'NO-ID');
    const rating = navigation.getParam('rating', '99');
    const description = navigation.getParam('description', 'TEST DESCRIPTION');
    const catagories = navigation.getParam('catagories', [1,0,1]);

    return (

      <View style = {{ flex: 1, padding: 20, backgroundColor: '#808080', alignItems: 'center' }}>
      <View style = {{flexDirection: 'row',margin: 20, backgroundColor: 'gold',  textAlign: 'right',  color: 'white', fontSize: 25, fontWeight: 'bold', color: 'yellow' }}>
      <Text>{JSON.parse(JSON.stringify(rating))}</Text>
      </View>
      <View style = {styles.descripBox}>
        <Text style={{ backgroundColor: 'skyblue', margin: 10, justifyContent: 'center', color: 'black', fontSize: 35, fontWeight: 'bold' }}>{JSON.parse(JSON.stringify(title))}</Text>
        </View>
        <View style = {styles.descripBox}>
        <Text style={{  backgroundColor: 'skyblue',margin: 15, justifyContent: 'center', color: 'black',  fontSize: 20 }}>Description: {JSON.parse(JSON.stringify(description))}</Text>
        </View>
        <View style = {styles.descripBox}>
        <Text style={{ backgroundColor: 'skyblue',margin: 10, justifyContent: 'center', color: 'purple', fontSize: 20 }}>Catagories: {JSON.parse(JSON.stringify(catagories))}</Text>
        </View>
        </View>
    );
  }
}

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

import Icon from '@expo/vector-icons/FontAwesome';
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-home${focused ? '' : '-outline'}`;

  } else if (routeName === 'SwitchAccount') {
    iconName = `ios-arrow-back${focused ? '' : '-outline'}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  DescriptionScreen: { screen: DescriptionScreen },
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      SwitchAccount: { screen: LoginScreen, 
                     navigationOptions: { tabBarVisible: false, 
                                     tabBarIcon: ({ tintColor }) => (
                                     <Icon
                                          name="refresh"
                                          color={tintColor}
                                          size={24}
                                      />
      )}

                      },

      Home: { screen: HomeStack, 
                     navigationOptions: { tabBarVisible: true, 
                                     tabBarIcon: ({ tintColor }) => (
                                     <Icon
                                          name="home"
                                          color={tintColor}
                                          size={24}
                                      />
      )}

                       },
      
//
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);
