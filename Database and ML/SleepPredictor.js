var someGlobal = 0; 
var time = []; 
var sleepiness = []; 
let SleepPredictor = {
    model: null,
    trained: false
}

var ssRef = firebase.database().ref('user/' + userEmail + '/sleepyTime');
ssRef.on('value', function(snapshot) {
    retrainModel(snapshot.val());
});

function initiateTrainingModel() {
    var ssRef = firebase.database().ref('user/' + userEmail + '/sleepyTime');
    ssRef.on('value', function(snapshot) {
        retrainModel(snapshot.val());
    });
}

function retrainModel(obj) {
    for (var key in obj) {
        time.push([obj[key]["time"]]);
        sleepiness.push([obj[key]["awake"]]);
    }
    
    if (time.length != 0 && sleepiness.length != 0){
        createAndTrainModel(); 
    }    
}

function createAndTrainModel(){
    
    SleepPredictor.model = tf.sequential(); 
    
    let inputLayer = tf.layers.dense({
        units: 10, 
        inputShape: [1], 
        activation: 'sigmoid'
    });
    
    let hiddenLayer1 = tf.layers.dense({
        units: 30, 
        activation: 'sigmoid'
    });
    
    let outputLayer = tf.layers.dense({
        units: 1
    })
    
    SleepPredictor.model.add(inputLayer);
    SleepPredictor.model.add(hiddenLayer1);
    SleepPredictor.model.add(outputLayer)
    
    let sgdOpt = tf.train.sgd(0.05); 
    SleepPredictor.model.compile({
        optimizer: sgdOpt, 
        loss: tf.losses.meanSquaredError
    })
    
    var train = tf.tensor2d(time);
    var test = tf.tensor2d(sleepiness);
    
    trainModel().then(() => SleepPredictor.trained = true);
    
    async function trainModel() {
        for (let i = 0; i < 8; i++) {
            let resp = await SleepPredictor.model.fit(train, test)
            console.log(resp.history.loss[0]);
        }
    }
}

function modelPrediction(time){
    
    if (SleepPredictor.trained == true) {
        return SleepPredictor.model.predict(tf.tensor2d([[time]])).toString();
    }
    return false; 
    
}