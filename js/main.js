// AngelList Search Url.
var searchUrl = "http://api.angel.co/1/search";
// Amount of Users to limit the results by.
var maxResults = 5;
// Data structure to store letter frequencies.
var metric;

// Iterate through a list of User objects. 
// Gather data on recurring letters.
// Make Graph.
function handleResults(userList) {
  console.log(userList);
  window.a = userList;
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