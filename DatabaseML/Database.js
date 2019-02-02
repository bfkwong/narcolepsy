export let database;
export var userEmail;

export let config = {
    apiKey: "AIzaSyBNPoFd-affJz2oC01SjF_xLoVj_N5LIG8",
    authDomain: "narcolepsy-79d01.firebaseapp.com",
    databaseURL: "https://narcolepsy-79d01.firebaseio.com",
    projectId: "narcolepsy-79d01",
    storageBucket: "narcolepsy-79d01.appspot.com",
    messagingSenderId: "914058585382"
};
firebase.initializeApp(config);

class Post {
    constructor(title, score, link) {
        this.title = link; 
        this.score = score; 
        this.link = link; 
    }
}

export function signUp(email, password){
    userEmail = email.replace(".","");
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return false;
    });
    database = firebase.database();
    initiateTrainingModel(); 
    return true;
}

export function signIn(email, password) {
    userEmail = email.replace(".","");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return false;
    });
    database = firebase.database();
    initiateTrainingModel(); 
    return true;
}

export function signOut() {
    firebase.auth().signOut().then(function() {
        console.log("Error: Sign out failed");
    }).catch(function(error) {
        console.log("Sign out successful");
    });
}

export function initUserData(age, height, weight) {
    database.ref("user/" + userEmail).set({
        email: userEmail,
        age: age,
        height: height,
        weight: weight
    });
}

export function enterSleepyNess(time, awakeness) {
    var timeStampMSecs = getMinutesSinceMidnight(time); 
    console.log(timeStampMSecs);
    database.ref("user/" + userEmail + "/sleepyTime").push({time: timeStampMSecs, awake: awakeness});
}

export function submitCommunityPost(title, score) {
    let post = new Post(title, score, "");
    database.ref("user/posts").push(post); 
}

export function getMinutesSinceMidnight(d) {
    var n = (d.getHours()*60) + d.getMinutes();
    return n; 
}

