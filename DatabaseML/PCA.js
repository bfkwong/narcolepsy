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
