export default class NoDocError extends Error {
    constructor(message){
        super(message);
        this.name = "Not Found"
    }
}