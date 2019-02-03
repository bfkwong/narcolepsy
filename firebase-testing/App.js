import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, Dimensions, Alert } from 'react-native';
import {Constants} from 'expo';
import * as firebase from 'firebase';
import { addone, getAllPosts, getSnapshot, sortPosts, signIn,allResponses, enterSleepyNess } from './test_functions.js';
import Slider from "react-native-slider";
import Icon from '@expo/vector-icons/FontAwesome';
import { Divider, Header } from 'react-native-elements';
import PureChart from 'react-native-pure-chart';


console.disableYellowBox = true;
let database = firebase.database();

export class HS extends React.Component {

    constructor() {
        super();
        this.submitSleep = this.submitSleep.bind(this);
        this.state = { value: 50 };
    }

    submitSleep() {
        let time = new Date();
        console.log("This Value" + this.state.value);
        console.log("This Time" + time);
        enterSleepyNess(time, this.state.value);
        Alert.alert(
          'SUBMITTED',
          'Data entered at ' + time.getHours() + ':' + time.getMinutes() + ' GMT for ' + this.state.value + '% sleepiness.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
    }

    componentDidMount() {


    }

    render() {
        let sampleData = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

        return (
            <ScrollView>
                <Header
                    style={{position: 'absolute', top: '0'}}
                    /*leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => {this.props.navigation.navigate('YEETGOD');},
                    }}*/
                    centerComponent={{ text: 'NUDGE', style: { fontSize: 28, fontWeight: 'bold', color: '#fff' } }}
                    rightComponent={{
                        icon: 'home',
                        color: '#fff',
                        onPress: () => {this.props.navigation.navigate('Community');},
                    }}
                />
                <Text style={HSStyles.nextPLapse}>
                    NEXT PREDICTED LAPSE
                </Text>
                <Text style={HSStyles.lapseTime}>
                   9:45 PM
                </Text>
                <Icon
                    style={HSStyles.moonImage}
                    name="moon-o"
                    size={180}
                    color="#4256c9" />
                <Text style={HSStyles.tiredText}>
                    HOW TIRED ARE YOU?
                </Text>
                <View style={{marginLeft: 20, marginRight: 20}}>
                <Slider
                    value={this.state.value}
                    onValueChange={value => this.setState({value})}
                    trackStyle={HSStyles.track}
                    thumbStyle={HSStyles.thumb}
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                />
                </View>
                <View style={HSStyles.buttonContainer}>
                    <Button
                      title="Submit"
                      type="Submit"
                      onPress={this.submitSleep}
                    />
                    <Text>Value: {this.state.value}</Text>
                </View>
                <Divider style={HSStyles.divider} />
                <View style={HSStyles.graphView}>
                    <Text style={HSStyles.sleepPatternTitle}>
                        YOUR SLEEP PATTERN
                    </Text>
                    <PureChart
                        data={sampleData}
                        type='line'
                        height={200}/>
                </View>

            </ScrollView>
        );
    }

}

const HSStyles = {

    sleepPatternTitle: {
        fontSize: 17,
        color:"gray",
        fontWeight:'600',
        marginTop:20,
        marginBottom: 20
    },
    graphView: {
        marginLeft: 20,
        marginRight: 20
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 80,
        marginRight: 80
    },
    divider: {
        backgroundColor: 'gray',
        marginTop: 15
    },
    sliderContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#ffffff"
    },
    track: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
    },
    thumb: {
        width: 20,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#eb6e1b',
    },
    slider: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    tiredText:  {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 30,
        marginTop: 20
//        color: '#ffffff'
    },
    nextPLapse:  {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 30,
        marginTop: 20
//        color: '#ffffff'
    },
    moonImage: {
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    inlineView: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    lapseTime: {
        textAlign: "center",
        fontWeight: '500',
        fontSize: 55,
//        color: '#ffffff'
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
            style={{position: 'absolute', top: '0'}}
            centerComponent={{
                text: 'NUDGE',
                style: {
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#fff'
                }
            }}
            rightComponent={{
                icon: 'home',
                color: '#fff',
                onPress: () => {this.props.navigation.navigate('Community');},
            }}
        />

        <Text style={{
                             textAlign: 'center',
                             fontWeight: '500',
                             fontSize: 20,
                             marginTop: 20
                         }}>
            SUBMIT YOUR COMMUNITY POST
        </Text>
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
        <Button
            title='SUBMIT'
            onPress={this.addItem}/>
      </View>

    );
  }
}



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
        if (allResponses.length != 0) {
            console.log(allResponses);
            var snap = allResponses.sort(function(a,b) {
                return a.score - b.score;
            })
            this.setState({messages: snap});
        }

    }

  render() {

    return (
      <View>

        <Header
                    style={{position: 'absolute', top: '0'}}
                    centerComponent={{
                        text: 'NUDGE',
                        style: {
                            fontSize: 28,
                            fontWeight: 'bold',
                            color: '#fff'
                        }
                    }}
                    rightComponent={{
                        icon: 'home',
                        color: '#fff',
                        onPress: () => {this.props.navigation.navigate('Community');},
                    }}
        />

        <View style={styles.filterBox}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', padding: 20}}>
            Filter by:
            </Text>
            <View style={{  width: 45, height: 38, backgroundColor: 'red', margin:5, marginTop: 20}}>
            <Button  title="O" color = 'red'/>
            </View>
            <View style={{ width: 45, height: 38, backgroundColor: 'orange',margin: 5, marginTop:20, textAlign: 'center'}}>
            <Button  title="I" color = 'orange'/>
            </View>
            <View style={{ width: 45, height: 38, backgroundColor: 'green',margin: 5, marginTop:20, textAlign: 'center'}}>
            <Button  title="P" color = 'green'/>
            </View>
            <View style={{ width: 45, height: 38, backgroundColor: 'purple',margin: 5, marginTop:20, textAlign: 'center'}}>
            <Button  title="A" color = 'purple'/>
            </View>
    </View>



        <FlatList data={this.state.messages} //normally data = this.state.messages
            renderItem={
              ({item}) =>
              <View style={styles.idea}>
                <Text style={styles.listItem}>
                  {item.title}
                </Text>
                <Text style={styles.score}>
                  {item.score}
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
                  this.props.navigation.navigate('MyNudge', {
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

      <View style = {{ flex: 1, padding: 20, backgroundColor: '#808080',alignItems:'center' }}>

      <Header
                  style={{position: 'absolute', top: '0'}}
                  centerComponent={{
                      text: 'NUDGE',
                      style: {
                          fontSize: 28,
                          fontWeight: 'bold',
                          color: '#fff'
                      }
                  }}
                  rightComponent={{
                      icon: 'home',
                      color: '#fff',
                      onPress: () => {this.props.navigation.navigate('Community');},
                  }}
      />

      <Text style = {{backgroundColor: 'gold',fontSize: 25, alignSelf: 'flex-end',textAlign: 'right'}}>{JSON.parse(JSON.stringify(rating))}</Text>

      <View style = {styles.descripBox}>
        <Text style={{ backgroundColor: 'skyblue', margin: 10, justifyContent: 'center', color: 'black', fontSize: 35, fontWeight: 'bold' }}>{JSON.parse(JSON.stringify(title))}</Text>
        </View>
        <View style = {styles.descripBox}>
        <Text style={{  backgroundColor: 'powderblue',margin: 15, justifyContent: 'center', color: 'black',  fontSize: 20 }}>Description: {JSON.parse(JSON.stringify(description))}</Text>
        </View>
        <View style = {styles.descripBox}>
        <Text style={{ backgroundColor: 'steelblue',margin: 10, justifyContent: 'center', color: 'purple', fontSize: 25 }}>Catagories: {JSON.parse(JSON.stringify(catagories))}</Text>
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

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Community') {
    iconName = `ios-home${focused ? '' : '-outline'}`;

  } else if (routeName === 'SwitchAccount') {
    iconName = `ios-arrow-back${focused ? '' : '-outline'}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeStack = createStackNavigator({
  Community: { screen: HomeScreen },
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

      Community: { screen: HomeStack, 
                     navigationOptions: { tabBarVisible: true, 
                                     tabBarIcon: ({ tintColor }) => (
                                     <Icon
                                          name="home"
                                          color={tintColor}
                                          size={24}
                                      />
      )}

                       },
      MyNudge: { screen: HS, 
                     navigationOptions: { tabBarVisible: true, 
                                     tabBarIcon: ({ tintColor }) => (
                                     <Icon
                                          name="user"
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
