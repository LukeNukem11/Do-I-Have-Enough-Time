$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    // Get the id of the time-block containing the button that was clicked
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Save the user input in local storage using the time block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr("id");

    // Get the current hour using Day.js
    var currentHour = dayjs().format("H");

    // Extract the hour from the timeBlockId (assuming it follows the format "hour-x")
    var hour = parseInt(timeBlockId.split("-")[1]);

    // Check if the hour is within the range of 9 AM and 5 PM (inclusive)
    if (hour >= 9 && hour <= 17) {
      // Compare the hour to the current hour and add the appropriate class
      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    } else {
      // Hide time blocks outside the desired range
      $(this).hide();
    }
  });

  // Get user input from local storage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr("id");

    // Get the user input from local storage using the time block id as the key
    var userInput = localStorage.getItem(timeBlockId);

    // Set the value of the textarea to the user input
    $(this).find(".description").val(userInput);
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});