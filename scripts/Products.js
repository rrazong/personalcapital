
const DATAFILE = "./data/products.json";

class Products {

  constructor() {
    if (!this.instance) {
      this.instance = this;
      this.loadData().then(data => {
        this.data = data
      });
    }
    return this.instance;
  }

  loadData() {
    if (this.data) {
      const data = this.data;
      return new Promise(function(resolve, reject){
        resolve(data);
      })
    } else {
      return new Promise(function(resolve, reject) {
        const rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", DATAFILE, true);
        rawFile.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(rawFile.responseText));
            } else {
              reject('loadData() in Products failed.');
            }
        }
        rawFile.onerror = function() {
          reject('loadData() in Products failed.');
        }
        rawFile.send(null);
      });
    }
  }

  search(query) {
    return this.loadData().then(function(data) {
      console.log(`search for ${query} in data`);
      return ['result1', 'result2'];
    })
  }
}
