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


export class Post {

    constructor(title, body, score, author) {
        this.title = title;
        this.body = body;
        this.score = score;

        this.author = author;
    }
}


export function signUp(email, password, age, height, weight){
// Sign up user
// PARAMS:  email (string)
//          password (string)
//          age (int)
//          height (float)
//          weight (float)
// RETURNS: 1 for failure
//          0 for success

    userEmail = email.replace(".","");
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return false;
    });
    database = firebase.database();
    initiateTrainingModel();
    initUserData(age, height, weight)
    return true;
}


export function signIn(email, password) {
// Sign in user
// PARAMS:  email (string)
//          password (string)
// RETURNS: 1 for failure
//          0 for success


    userEmail = email.replace(".","");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return 1;
    });
    database = firebase.database();

    initiateTrainingModel();
    return 0;
}

export function signOut() {
// Sign user out
// PARAMS:  null
// RETURNS: 1 for failure
//          0 for success

    firebase.auth().signOut().then(function() {
        console.log("Sign out successful");
        return 0;
    }).catch(function(error) {
        console.log("Error: Sign out failed");
        return 1;
    });
}


export function initUserData(age, height, weight) {
// Add User Data into database
// PARAMS:  age (int) - age of user
//          height (float) - height of user
//          weight (float) - weight of user
// RETURNS: 1 for failure
//          0 for success
   firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         database.ref("user/" + userEmail).set({
            email: userEmail,
            age: age,
            height: height,
            weight: weight
         });
         return 0;
      } else {
         console.log("Error: User not signed in (initUserData)")
         return 1;
      }
   });
}

export function enterSleepyNess(time, awakeness) {
// Get retrieve when the user is sleepy
// PARAMS:  Time (JS Time Object) - Current Time
//          Awakeness (int from 0-100)
// RETURNS: 1 for failure
//          0 for success
   function getMinutesSinceMidnight(d) {
       let n = (d.getHours()*60) + d.getMinutes();
       return n;
   }
   var timeStampMSecs = getMinutesSinceMidnight(time);
   console.log(timeStampMSecs);
   database.ref("user/" + userEmail + "/sleepyTime").push({time: timeStampMSecs, awake: awakeness});
   return 0;
}


export function submitCommunityPost(title, body, score, author) {

    let post = new Post(title, body, score, author);


 export function getMinutesSinceMidnight(d) {
    let n = (d.getHours()*60) + d.getMinutes();
    return n;
}

 export let allResponses = []
 export let ssRef = firebase.database().ref('post');

ssRef.on('value', function(snapshot) {
   // If a change is noticed run the following functions to
   // do whatever change is necessary to accomodate with database change
   allResponses = getAllPosts(snapshot.val());
});


export function getAllPosts(snapshotObj) {

// Takes in firebase snapshot object and return an array
// of everything inside that snapshot
// PARAMS: Snapshot Object from Firebase
// RETURNS: Array of Posts Object from Firebase

   let allResponses = []

   let newObj;

   let tempBody, tempScore, tempTitle, tempAuthor;

   for (val in snapshotObj) {
      tempBody = snapshotObj[val]["body"];
      tempScore =  snapshotObj[val]["score"];
      tempTitle = snapshotObj[val]["title"];
      tempAuthor = snapshotObj[val]["author"]


      newObj = new Post(tempTitle, tempScore, tempBody, tempAuthor);


      allResponses.push(newObj);
   }
   return allResponses;

}

