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

 class Post {
    constructor(title, body, score, author) {
        this.title = title;
        this.body = body;
        this.score = score;
        this.author = author;
    }
}

 function signUp(email, password){
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

 function signIn(email, password) {
    userEmail = email.replace(".","");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(error.message);
        return false;
    });
    database = firebase.database();
//    initiateTrainingModel();
    return true;
}

 function signOut() {
    firebase.auth().signOut().then(function() {
        console.log("Error: Sign out failed");
    }).catch(function(error) {
        console.log("Sign out successful");
    });
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

 function submitCommunityPost(title, body, score, author) {
    let post = new Post(title, body, score, author);
    database.ref("posts").push(post);
}

 function getMinutesSinceMidnight(d) {
    let n = (d.getHours()*60) + d.getMinutes();
    return n;
}

 let allResponses = []
 let ssRef = firebase.database().ref('post');
ssRef.on('value', function(snapshot) {
   getAllPosts(snapshot.val());
});

 function getAllPosts(snapshotObj) {
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
}

