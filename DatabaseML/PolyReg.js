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
        let prediction = this.model.predict(x); 
        if (prediction < 0) {
            return 0;
        } else {
            return prediction; 
        }
    }
    
}