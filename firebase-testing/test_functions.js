import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import {Constants} from 'expo';
import * as firebase from 'firebase';
import regression from 'regression';

export let userEmail = "";
export let allResponses = [];
export let config = {
    apiKey: "AIzaSyBNPoFd-affJz2oC01SjF_xLoVj_N5LIG8",
    authDomain: "narcolepsy-79d01.firebaseapp.com",
    databaseURL: "https://narcolepsy-79d01.firebaseio.com",
    projectId: "narcolepsy-79d01",
    storageBucket: "narcolepsy-79d01.appspot.com",
    messagingSenderId: "914058585382"
};
firebase.initializeApp(config);
export let database = firebase.database();
export let sleepiness = [];
export let time = [];
export let sampleData = [20,2,0,0,6];
export let training = [];

export function addone(x) {
  return x + 1;
}

export function binarySearchInsertion(element, array, lower, upper) {
    index = (upper - lower) / 2;
    comp = array[index];
    if (upper > lower && postComp(element, comp) > 0)
        return binarySearchInsertion(element, array, index, upper);
    else if (upper > lower && postComp(element, comp) < 0)
        return binarySearchInsertion(element, array, lower, index);
    return array.slice(0, index).concat([element]).concat(array.slice(index, array.length))
}

export function postComp(post1, post2) {
    if (post1.score == post2.score)
        return stringComp(post1.title, post2.title);
    return post1.score - post2.score;
}

export function stringComp(string1, string2) {
    let i = 0;
    let result = 0;
    while (string1[i] == string2[i] && i < string1.length && i < string2.length)
        i++;
    result = string1[i-1] - string2[i-1];
    if (result == 0) {
        if (string1.length < string2.length)
            return -1;
        else if (string1.length > string2.length)
            return 1;
    }
    return result
}

export function sortPosts(messages) {
    let result = [];
    for (post in messages) {
        if (result.length == 0)
            result.push(messages[0]);
        else
            result = binarySearchInsertion(post, result, 0, result.length);
    }
    return result;
}

export class Post {
    constructor(title, score, body, author, filter) {
        this.title = title;
        this.score = score;
        this.body = body;
        this.author = author;
        this.filters = filter
    }
}

export function getAllPosts(snapshotObj) {
   let newObj;
   let tempBody, tempScore, tempTitle, tempAuthor, tempFilters;
   for (val in snapshotObj) {
      tempBody = snapshotObj[val]["body"];
      tempScore =  snapshotObj[val]["score"];
      tempTitle = snapshotObj[val]["title"];
      tempAuthor = snapshotObj[val]["author"];
      tempFilters = snapshotObj[val]["filters"] //Here?

      newObj = new Post(tempTitle, tempScore, tempBody, tempAuthor, tempFilters);

      allResponses.push(newObj);
   }
}

let postRefernce = firebase.database().ref('posts');
postRefernce.on('value', function(snapshot) {
    getAllPosts(snapshot.val());
});

let userReference = firebase.database().ref('user/12@gcom' + '/sleepyTime');
userReference.on('value', function(snapshot) {
    retrainModel(snapshot.val());
    console.log("graph Network");
});


export function signIn(email, password) {
    userEmail = email.replace(".","");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return false;
    });
    database = firebase.database();
    return true;
}

export let result;
export let max;

export function getGraphOutput() {

    output = [];
    range = [];

    result = regression.polynomial(training, { order: 5 });

    for (var i = 0; i < 1440; i+=1) {
        range.push(i/1440);
        output.push(result.predict(i));
    }
    max = Math.max(output);
    console.log(Math.max(output))

    let increment = 240;
    let prev = 0;
    for(var x = increment; x < output.length; x+=increment) {
      let mean = 0;
      for (var y = prev; y < increment; y++) {
         mean += output[y][0];
      }
      mean /= 240;
      console.log(mean);
      sampleData.push(mean);
      prev = x + increment;
   }
}

export function retrainModel(obj) {
    for (var x = 0; x < 1440; x++) {
      sleepiness[x] = 0;
      time[x] = x;
      training[x] = [x,0];
   }
    for (var key in obj) {
        sleepiness[obj[key]["time"]] = obj[key]["awake"];
        time[obj[key]["time"]] = obj[key]["time"];
        training[obj[key]["time"]] = [obj[key]["time"], obj[key]["awake"]];
        for (x = obj[key]["time"]-0; x < obj[key]["time"]+0; x++) {
            if (x >= 0 && x <1440){
                sleepiness[x] += obj[key]["awake"];
            }
        }
    }
    getGraphOutput();
}

export function enterSleepyNess(time, awakeness) {
    var timeStampMSecs = (time.getHours()*60) + time.getMinutes();
    database.ref("user/" + userEmail + "/sleepyTime").push({time: timeStampMSecs, awake: awakeness});
}

export function submitCommunityPost(title, body, score, author, filters) {
    let post = new Post(title, body, score, author, filters);
    database.ref("posts").push(post);
}
