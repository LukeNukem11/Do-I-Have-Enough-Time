$(function() {
  var hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

  var container = $('.container-fluid');
  var currentHour = dayjs().format('H');

  for (var i = 0; i < hours.length; i++) {
    var hour = i + 9; // Calculate the hour value
    var timeBlockDiv = $('<div>')
      .attr('id', 'hour-' + hour)
      .addClass('row time-block');

    var hourDiv = $('<div>')
      .addClass('col-2 col-md-1 hour text-center py-3')
      .text(hours[i]);

    var textarea = $('<textarea>')
      .addClass('col-8 col-md-10 description')
      .attr('rows', '3');

    var saveButton = $('<button>')
      .addClass('btn saveBtn col-2 col-md-1')
      .attr('aria-label', 'save')
      .append($('<i>').addClass('fas fa-save').attr('aria-hidden', 'true'));

    timeBlockDiv.append(hourDiv, textarea, saveButton);
    container.append(timeBlockDiv);

    if (hour < currentHour) {
      timeBlockDiv.addClass('past');
    } else if (hour == currentHour) {
      timeBlockDiv.addClass('present');
    } else {
      timeBlockDiv.addClass('future');
    }
  }

  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function() {
    var userInput = $(this).siblings('.description').val();
    var timeBlockId = $(this).closest('.time-block').attr('id');
    localStorage.setItem(timeBlockId, userInput);

    // Display a message when item is saved
    var saveMessage = $('<p>').text('Item saved to local storage').addClass('save-message');
    $(this).siblings('.description').after(saveMessage);

    // Remove the save message after a few seconds
    setTimeout(function() {
      saveMessage.remove();
    }, 3000);
  });

  // Get user input from local storage and set the values of the corresponding textarea elements
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find('.description').val(userInput);
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);
});

