// AngelList Search Url.
var searchUrl = "http://api.angel.co/1/search";
// Amount of Users to limit the results by.
var maxResults = 5;
// Data structure to store letter frequencies.
var metric;

// Set up the data structure to collect the graph data.
function setUpMetric() {
  var chars = "abcdefghijklmnopqrstuvwxyz".split("");
  chars.push("others");
  var zeros = _.map(_.range(0, chars.length), _.constant(0));
  metric = _.object(chars, zeros);
}

// Determine the frequency of characters in a given string.
function strFrequency(str) {
  _.each(str, function(chr, ii) {
    // If the character is a KEY in the metric, then increment the object with the KEY.
    var c = chr.toLowerCase();
    if(_.has(metric, c))
      metric[c] += 1;
    else
      metric["others"] += 1;
    });
}

// Create a chart displaying the frequency data.
function createChart() {
}

// Iterate through a list of User objects. 
// Gather data on recurring letters.
// Make Graph.
function handleResults(userList) { 
  console.log(userList);
  window.a = userList;
  // Setup an empty data structure.
  setUpMetric();
  
  // Iterate through the list of users.
  _.each(userList, function(usr, i) {
    // Collect character frequency of a user's name.
    strFrequency(usr.name);
  });
  
  createChart();
}

// Ajax call to the AngelList API.
function searchUsers(q) {
  $.ajax({
    url: searchUrl,
    type: "GET",
    dataType: "jsonp",
    jsonpCallback: "handleResults",
    data: {
      "type": "User",
      "query": q
    },
    success: function(data, status) {
      console.log("Success!!");
      window.d = data;
    },
    error: function(data, status) {
      console.log("Error!!");
      window.d = data;
    }
  });
}

$(document).ready(function() {
  
  // When the search form is submitted.
  $("#search-form").submit(function(e) {
    e.preventDefault();
    // Get text box value.
    var searchQuery = $("#search-input").val();
    console.log("query is " + searchQuery);
    // Ajax call to search url.
    searchUsers(searchQuery);
  });
  
});