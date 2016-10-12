"use strict";

const queryNode = document.getElementById('query');
const resultsNode = document.getElementById('results');
const products = new Products();

var timer;
function handleSearch() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    // check cache
    products.search(queryNode.value).then(function(result){
      // save result to cache
      console.log(result);
    }).catch(function(){
      console.error("product search failed")
    })
  }, 500);
}
