class nKNN {
//    2d input array
    
    constructor(type) {
        this.x = null;
        this.y = null;
        this.model = null;
    }
    
    fit(x, y) {
        this.x = x;
        this.y = y; 
        this.model = new ml.KNN(x,y);
        return this.model; 
    }
    
    predict(x) {
        if (this.model == null) {
            console.log("Error: Model not yet trained");
            return; 
        }
        return this.model.predict(x); 
    }
    
}

class nPCA{
//    2d input array
    
    constructor(dimension) {
        this.dimension = dimension; 
        this.x = null; 
        this.model = null; 
    }
    
    fit(x) {
        this.x = x; 
        const x = new ML.PCA(x); 
        this.model = pca; 
        return pca; 
    }
    
    transform(data) {
        if (this.model == null) {
            console.log("Error: Model not yet trained");
            return; 
        }
        return this.model.predict(data); 
    }
    
}

class nPolynomialRegression {
    // 1d input array
    
    constructor() {
        this.x = null;
        this.y = null; 
        this.degree = null; 
        this.model = null;
    }
    
    fit(x, y, degree) {
        this.model = new ML.PolynomialRegression(x,y,degree);
        this.x = x;
        this.y = y; 
        this.degree = degree;
        return this.model; 
    }
    
    predict(x) {
        if (this.model == null) {
            console.log("Error: Model not yet trained");
            return; 
        }
        return this.model.predict(x); 
    }
    
}

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