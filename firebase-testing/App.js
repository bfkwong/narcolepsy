import React from 'react';
import { ActivityIndicator, Dimensions, AppRegistry, ScrollView, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { Header, Divider, Image } from 'react-native-elements';
import {Constants} from 'expo';
import * as firebase from 'firebase';
import { addone, getAllPosts, getSnapshot, sortPosts, signIn } from './test_functions.js';

import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';

  var screen = Dimensions.get('window');

  console.disableYellowBox = true;

  let database = firebase.database();

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

  }

  addItem () {
    if (!this.state.message) return;

    const newMessage = firebase.database().ref("messages")
                     //     .child("messages")
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
                title="Go to DescriptionScreen"
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
  bigChungus: {
    flexDirection: 'row',
    padding: 60,
    backgroundColor: '#fff'
  },
  filterBox: {
    flexDirection: 'row',
    backgroundColor: '#4286f4',
    height: 75
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
  wrapper: {
      paddingTop: 50,
      flex: 1
    },

    modal: {
      justifyContent: 'center',
      alignItems: 'center'
    },

    modal2: {
      height: 230,
      backgroundColor: "#3B5998"
    },

    modal3: {
      height: 300,
      width: 300
    },

    modal4: {
      height: 300
    },

    btn: {
      margin: 10,
      backgroundColor: "#3B5998",
      color: "white",
      padding: 10
    },

    btnModal: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      backgroundColor: "transparent"
    },

    text: {
      color: "black",
      fontSize: 22
    }
});


import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
      super(props)

      this.state = {
        messages: []
      }
      this.obtainMessages = this.obtainMessages.bind(this);
    }
  //
    componentDidMount() {
        this.obtainMessages();
    }

    obtainMessages() {
        signIn("1@g.com", "00000000");
        let snap = getSnapshot();
        console.log("snap: " +snap);
        snap = sortPosts(snap);
        this.setState({messages: snap});
    }

  render() {

    return (
      <View style={styles.container}>

        <Header
                  leftComponent={{ icon: 'menu', color: '#fff' }}
                  centerComponent={{ text: 'NUDGE', style: { fontSize: 28, fontWeight: 'bold', color: '#fff' } }}
                  rightComponent={{ icon: 'home', color: '#fff' }}
        />

        <View style={styles.filterBox}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', padding: 20}}>
            Filter by:
            </Text>
            <View style={{width: 30, height: 30, backgroundColor: 'red', textAlign: 'center'}}/>
        </View>

        <FlatList data={this.state.messages}
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
                  <Button title='Create Your Own Idea' onPress={this.addItem}/>
                </View>

      </View>

    );
  }
}

class DescriptionScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'NO-ID');
    const rating = navigation.getParam('rating', '99');
    const description = navigation.getParam('description', 'TEST DESCRIPTION');
    const catagories = navigation.getParam('catagories', [1,0,1]);

    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Text>Title: {JSON.parse(JSON.stringify(title))}</Text>
        <Text>Rating: {JSON.parse(JSON.stringify(rating))}</Text>
        <Text>Description: {JSON.parse(JSON.stringify(description))}</Text>
        <Text>Catagories: {JSON.parse(JSON.stringify(catagories))}</Text>

      </View>

    );
  }
}

class SubmissionScreen extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
        title: '',
        text: '',
        height: 0
      }
    }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'NO-ID');
    const rating = navigation.getParam('rating', '99');
    const description = navigation.getParam('description', 'TEST DESCRIPTION');
    const catagories = navigation.getParam('catagories', [1,0,1]);

    return (

      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'NUDGE', style: { fontSize: 28, fontWeight: 'bold', color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />

        <View style={styles.msgBox}>
          <TextInput style={{}} placeholder='Enter a Title'
            value={this.state.title}
            onChangeText={(message) => this.setState({title: message})}
            style={styles.txtInput}/>
        </View>
        <Divider style={{ backgroundColor: 'gray' }}/>
        <Divider style={{ backgroundColor: 'gray' }}/>

        <View style={{padding: 40, flexDirection: 'row', justifyContent: 'space-between'}}>

        </View>

        <Divider style={{ backgroundColor: 'gray' }}/>
        <Divider style={{ backgroundColor: 'gray' }}/>
        <View style={styles.msgBox}>
          <TextInput
            placeholder='Enter your message'
            multiline={true}
            value={this.state.text}
            onChangeText={(message) => this.setState({text: message})}
            style={styles.txtInput}/>

        </View>
        <Button title='SUBMIT' onPress={this.addItem}/>
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

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Settings') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
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
      App: { screen: App },
      Home: { screen: HomeStack },
      SubmissionScreen: { screen: SubmissionScreen },
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
