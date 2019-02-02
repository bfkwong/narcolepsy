class nNaiveBayes {
//    2d input array
    
    constructor(type) {
        this.type = type; 
        this.x = null;
        this.y = null;
        this.model = null;
    }
    
    fit(x, y) {
        this.x = x;
        this.y = y; 
        if (this.type == "Gaussian") {
            this.model = new ML.GaussianNB()
            this.model.train(x,y);
            return this.model;
        } else {
            this.model = new ML.MultinomialNB()
            this.model.train(x,y);
            return this.model;
        }
        console.log("Error: Not valid Naive Bayes Type");
        return; 
    }
    
    predict(x) {
        if (this.model == null) {
            console.log("Error: Model not yet trained");
            return; 
        }
        return this.model.predict(x); 
    }
    
}