$(document).ready(function(){
  // [category, categoryQuestion, categoryConclusion]
  var categories = [
    ["study", "How has snow-mageddon affected your studies? (Check all that apply)", "Snow-mageddon has affected your studies: "]
  ];

  // [[categories], checkboxValue, checkboxQuestion, checkboxConclusion]
  var checkboxes = [
    [["study"], "media", "Consuming too much TV, Netflix, Youtube, Social Media etc.", "Media consumption is out of hand."]
  ];

  // Get HTML templates for header and checkbox
  var headerTemplate = $("#headerTemplate").html();
  var checkboxTemplate = $("#checkboxTemplate").html();

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
      var checkboxName = checkbox[2];
      var checkboxQuestion = checkbox[3];

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



  });

}); // End Document Ready
