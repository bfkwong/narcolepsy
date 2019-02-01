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
        time.push([obj[key]["time"]]);
        sleepiness.push([obj[key]["awake"]]);
    }
    
    if (time.length != 0 && sleepiness.length != 0){
        console.log("retrainModel");
        createAndTrainModel(); 
        graphNetwork();
    }    
}

function createAndTrainModel(){
    
    SleepPredictor.model = tf.sequential(); 
    
    let inputLayer = tf.layers.dense({
        units: 10, 
        inputShape: [1], 
        activation: 'relu'
    });
    
    let hiddenLayer1 = tf.layers.dense({
        units: 30,  
        activation: 'relu'
    });
    
    let hiddenLayer2 = tf.layers.dense({
        units: 60, 
        activation: 'relu'
    });
    
    let hiddenLayer3 = tf.layers.dense({
        units: 60, 
        activation: 'relu'
    });
    
    let outputLayer = tf.layers.dense({
        units: 1,
        activation: 'relu'
    })
    
    SleepPredictor.model.add(inputLayer);
    SleepPredictor.model.add(hiddenLayer1);
    SleepPredictor.model.add(hiddenLayer2);
    SleepPredictor.model.add(hiddenLayer3);
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
        return SleepPredictor.model.predict(tf.tensor2d([[time]])).toString().replace(/[^0-9.]/g, "");
    }
    return false; 
    
}

var range;
var output;
 
function graphNetwork() {
    range = [];
    output = []; 
    for (var i = 0; i <= 1440; i+=2) {
        range.push(i/1440);
        output.push(parseFloat(modelPrediction(i)));
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

function runPCA(train, test, dim) {
    const PCA = require('ml-pca');
    const pca = new PCA(train);

    return pca.predict(test); 
}