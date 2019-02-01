let database;
var userEmail;

let config = {
    apiKey: "AIzaSyBNPoFd-affJz2oC01SjF_xLoVj_N5LIG8",
    authDomain: "narcolepsy-79d01.firebaseapp.com",
    databaseURL: "https://narcolepsy-79d01.firebaseio.com",
    projectId: "narcolepsy-79d01",
    storageBucket: "narcolepsy-79d01.appspot.com",
    messagingSenderId: "914058585382"
};
firebase.initializeApp(config);

function signUp(email, password){
    userEmail = email.replace(".","");
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return false;
    });
    database = firebase.database();
    initiateTrainingModel(); 
    return true;
}

function signIn(email, password) {
    userEmail = email.replace(".","");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return false;
    });
    database = firebase.database();
    initiateTrainingModel(); 
    return true;
}

function initUserData(age, height, weight) {
    database.ref("user/" + userEmail).set({
        email: userEmail,
        age: age,
        height: height,
        weight: weight
    });
}

function enterSleepyNess(time, awakeness) {
    var timeStampMSecs = getMinutesSinceMidnight(time); 
    console.log(timeStampMSecs);
    database.ref("user/" + userEmail + "/sleepyTime").push({time: timeStampMSecs, awake: awakeness});
}

function getMinutesSinceMidnight(d) {
    var n = (d.getHours()*60) + d.getMinutes();
    return n; 
}

