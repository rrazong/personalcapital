"use strict";

// move to a constants.js file
const MINIMUM_QUERY_LENGTH = 2;

const products = new Products();
const memo = {};

// Initiate results
handleSearch();

var timer;
function handleSearch() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    const queryNode = document.getElementById('query');
    const query = queryNode.value;

    // check for queries that are too short and check cache
    if (query.length <= MINIMUM_QUERY_LENGTH) {
      renderResults([]);
    } else if (memo[query]) {
      renderResults(memo[query]);
    }
    else {
      products.search(query)
        .then(function(result){
          // save result to cache
          memo[query] = result;
          renderResults(result);
        })
        .catch(function(){
          console.error("product search failed")
        });
    }
  }, 500);
}

function renderResults(results) {
  const resultsNode = document.getElementById('results');
  //console.log(results);
  if (0 === results.length) {
    resultsNode.className = "no-results"
    resultsNode.innerHTML = '<span>No results found.</span>';
    return;
  }

  resultsNode.className = "";

  const groups = results.reduce((prev, d) => {
    if (!prev[d.type]) {
      prev[d.type] = [];
    }
    prev[d.type].push(d);
    return prev;
  }, {});
  let html = '';
  Object.keys(groups).forEach(d => {
    groups[d] = groups[d].sort((a,b)=>{return a.name.localeCompare(b.name)}).slice(0,5);
    const groupTitle = convert_type(d);
    const rows = groups[d].reduce((html, dd) => {
      return `${html}<li><a href="${dd.url}">${dd.name}</a></li>`;
    }, '');
    const pod = `
      <div class="pod">
        <h3>${groupTitle}</h3>
        <ul>
          ${rows}
        </ul>
      </div>
    `;
    html += pod;
  });
  console.log(groups);
  console.log(html);
  /*
  html = `    <div class="pod">
        <h3>Banks</h3>
        <ul>
            <li>Bank xOne</li>
            <li>Bank Two </li>
            <li>Bank Three</li>
            <li>Bank Four</li>
        </ul>
    </div>
    <div class="pod">
        <h3>Credit Cards</h3>
        <ul>
            <li>Credit Card One</li>
            <li>Credit Card Two </li>
            <li>Credit Card Three</li>
            <li>Credit Card Four</li>
        </ul>

        </div>
`;
*/
  resultsNode.innerHTML = html;
  /*
  results.forEach(r => {
    html += `<li><a href="">${r.name}</a> - ${r.type ? convert_type(r.type) : null}</li>`
  });
  resultsNode.className = "";
  resultsNode.innerHTML = `<ul>${html}</ul>`
  */
}

// move to a util.js
function convert_type(string) {
  string = string.replace(/_/g, ' ');
  string = toTitleCase(string);
  return string;
}

// copied from stackoverflow
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
