$(document).ready(function(){
  // Message if not checkboxes apply
  var unaffectedMessage = "Wow! You are unaffected by snow-mageddon!";

  // [category, categoryQuestion, categoryConclusion]
  var categories = [
    ["study", "How has snow-mageddon affected your studies? (Check all that apply)", "Snow-mageddon has affected your studies:"],
    ["home", "How has snow-mageddon affected your home / personal life? (Check all that apply)", "Snow-mageddon has affected your personal life:"]
  ];

  // [[categories], checkboxValue, checkboxQuestion, checkboxConclusion]
  var checkboxes = [
    [["study"], "media", "Are you consuming too much TV, Netflix, Youtube, Social Media etc.", "Media consumption is out of hand."],
    [["home"], "mate", "Has your bizarre obsessive behavior driven those who live with you crazy?", "Your craziness has infected others."]
  ];

  // Get HTML templates for header and checkbox
  var headerTemplate = $("#headerTemplate").html();
  var checkboxTemplate = $("#checkboxTemplate").html();
  var buttonTemplate = $("#buttonTemplate").html();

  // Clear out templates in preparation for
  // list of headers and questions
  $("#inputForm").html("");

  // Generate list of headers and checkboxes
  categories.forEach(function(category) {
    var categoryID = category[0];
    var categoryQuestion = category[1];

    // Append the header into the DOM but replace the contents with the actual question
    $("#inputForm").append(
      headerTemplate.
        replace(/categoryQuestion/g, categoryQuestion)
    );

    checkboxes.forEach(function(checkbox) {
      var checkboxCategories = checkbox[0];
      var checkboxValue = checkbox[1];
      var checkboxQuestion = checkbox[2];

      // Does this checkbox apply to the category?
      if (checkboxCategories.includes(categoryID)) {
        // Append the checkbox into the DOM but do replacements first
        $("#inputForm").append(
          checkboxTemplate.
            replace(/category/g, categoryID).
            replace(/checkboxQuestion/g, checkboxQuestion).
            replace(/checkboxValue/, checkboxValue)
        );
      }
    }); // End checkboxes.forEach
  }); // End categories.forEach

  // Finally append submit button
  $("#inputForm").append(buttonTemplate);

  ////////////////////////////////////////////////////

  // Respond to submit button
  $("#inputForm").submit(function(event) {
    event.preventDefault();

    var someCheckboxChecked = false;
    var outputMessage = "";

    categories.forEach(function(category) {
      var categoryID = category[0];
      var categoryConclusion = category[2];

      // Which checkboxes were checked for this category?
      $("#inputForm input:checkbox[name=" + categoryID +"]:checked").each(function() {
        someCheckboxChecked = true;

        var checkboxValue = $(this).val();

        var checkboxIndex = checkboxes.findIndex(function(element) {
          return element[1] === checkboxValue;
        });

        // Output the category conclusion just one time per category
        if (categoryConclusion) {
          if (outputMessage) {
            outputMessage += "\n\n";
          }
          outputMessage += categoryConclusion;
          categoryConclusion = false;
        }

        outputMessage += "  " + checkboxes[checkboxIndex][3];
      }); // End which checkboxes were checked
    }); // End categories.forEach

    // Handle case where no checkboxes were checked
    if (!someCheckboxChecked) {
      outputMessage = unaffectedMessage;
    }
    $("#outputMessage").text(outputMessage);
    $("#outputSection").fadeOut(100).fadeIn(100);
  }); // End Respond to submit button

}); // End Document Ready
