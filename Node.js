export default class Node {

    constructor(data, left = null, right = null){
        // data will be a number
        this.data = data;
        this.left = left;
        this.right = right;
    }
}