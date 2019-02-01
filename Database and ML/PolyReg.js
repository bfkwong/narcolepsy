class nPolynomialRegression {
    
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