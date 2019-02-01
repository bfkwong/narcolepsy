var someGlobal = 0; 
var time = []; 
time.length = 1440;
var sleepiness = [];
sleepiness.length = 1440; 

for(var x=0; x<time.length;x++) {
    time[x] = x;
    sleepiness[x] = 0;
}

let SleepPredictor = {
    model: null,
    trained: false
}

var ssRef = firebase.database().ref('user/' + userEmail + '/sleepyTime');
ssRef.on('value', function(snapshot) {
    retrainModel(snapshot.val());
    console.log("graph Network");
});

function initiateTrainingModel() {
    var ssRef = firebase.database().ref('user/' + userEmail + '/sleepyTime');
    ssRef.on('value', function(snapshot) {
        retrainModel(snapshot.val());
    });
}

function retrainModel(obj) {
    for (var key in obj) {
        sleepiness[obj[key]["time"]] = obj[key]["awake"];
        time[obj[key]["time"]] = obj[key]["time"];
        for (x = obj[key]["time"]-7; x < obj[key]["time"]+7; x++) {
            if (x >= 0 && x <1440){
                sleepiness[x] += obj[key]["awake"]; 
            }
        }
    }
    
    if (time.length != 0 && sleepiness.length != 0){
        console.log("retrainModel");
        createAndTrainModel(); 
        graphNetwork();
    }    
}

function createAndTrainModel(){
    
//    SleepPredictor.model = tf.sequential(); 
//    
//    let inputLayer = tf.layers.dense({
//        units: 10, 
//        inputShape: [1], 
//        activation: 'relu'
//    });
//    
//    let hiddenLayer1 = tf.layers.dense({
//        units: 30,  
//        activation: 'relu'
//    });
//    
//    let hiddenLayer2 = tf.layers.dense({
//        units: 60, 
//        activation: 'relu'
//    });
//    
//    let hiddenLayer3 = tf.layers.dense({
//        units: 60, 
//        activation: 'relu'
//    });
//    
//    let outputLayer = tf.layers.dense({
//        units: 1,
//        activation: 'relu'
//    })
//    
//    SleepPredictor.model.add(inputLayer);
//    SleepPredictor.model.add(hiddenLayer1);
//    SleepPredictor.model.add(hiddenLayer2);
//    SleepPredictor.model.add(hiddenLayer3);
//    SleepPredictor.model.add(outputLayer)
//    
//    let sgdOpt = tf.train.sgd(0.05); 
//    SleepPredictor.model.compile({
//        optimizer: sgdOpt, 
//        loss: tf.losses.meanSquaredError
//    })
//    
//    var train = tf.tensor2d(time);
//    var test = tf.tensor2d(sleepiness);
//    
//    trainModel().then(() => SleepPredictor.trained = true);
//    
//    async function trainModel() {
//        for (let i = 0; i < 8; i++) {
//            let resp = await SleepPredictor.model.fit(train, test)
//            console.log(resp.history.loss[0]);
//        }
//    }
}

function modelPrediction(time){
     
    if (SleepPredictor.trained == true) {
        return SleepPredictor.model.predict(tf.tensor2d([[time]])).toString().replace(/[^0-9.]/g, "");
    }
    return false; 
    
}

var range;
var output;
 
function graphNetwork() {
    var newModel = new nPolynomialRegression();
    newModel.fit(time, sleepiness, 10);
    
    range = [];
    output = []; 
    for (var i = 0; i <= 1440; i+=2) {
        range.push(i/1440);
        output.push(newModel.predict(i));
    }
    
    var trace1 = {
      x: range,
      y: output,
      type: 'scatter',
    };


    var data = [trace1];
    var layout = {
      xaxis: {range: [-0.1, 1.1]},
      yaxis: {range: [-0.1, 1.1]}
    };

    Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});
}