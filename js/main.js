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

// Show a "No Results" message.
function noResults() {
  $("#user-chart").empty();
  $("<h2>")
    .text("Oops! No results to show.")
    .addClass("no-results")
    .addClass("text-muted")
    .appendTo("#user-chart");
}

// Create a chart displaying the frequency data.
function createChart() {
  $("#user-chart").empty();
  // Format the data so d3 will understand.
  var metricData = _.map(metric, function(val, key) {
    return {
      'letter': key,
      'frequency': val
    };
  });
  // Make a bar graph based on collected data.
  makeD3Chart(metricData);
}

// Iterate through a list of User objects. 
// Gather data on recurring letters.
// Make Graph.
function handleResults(userList) { 
  // Setup an empty data structure.
  setUpMetric();
  
  if(!_.isEmpty(userList)) {
    // Slice the results array.
    var userListSlice = userList.slice(0, maxResults);
    // Iterate through the list of users.
    _.each(userListSlice, function(usr, i) {
      // Collect character frequency of a user's name.
      strFrequency(usr.name);
    });
    
    createChart();
  }
  else {
    noResults();
  }
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
    },
    error: function(data, status) {
    }
  });
}

$(document).ready(function() {
  
  // When the search form is submitted.
  $("#search-form").submit(function(e) {
    e.preventDefault();
    // Get text box value.
    var searchQuery = $("#search-input").val();
    // Ajax call to search url.
    searchUsers(searchQuery);
  });
  
});
