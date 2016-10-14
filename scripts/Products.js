
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
    return this.loadData()
      .then(function(data) {
        // escape user input
        const regex = new RegExp(escapeRegExp(query), "gi");
        const results = data.products.reduce((prev, p) => {
          // filter on name and url
          if (regex.test(p.name) || regex.test(p.url)) {
            prev.push(p);
          }
          return prev;
        }, []);
        return results;
      });
  }
}

// move to a util.js file
// copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
