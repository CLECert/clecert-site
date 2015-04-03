$(function () {

  // This is really not the correct way to do this, but it'll do for demo purposes. It'll do.
  // Will move to SPA soon

  var currentStep = $("body > section").data("step");
  var jurisMap = document.getElementById('jurisdiction-map');
  var jurisNameSpan = document.getElementById('juris-name');

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  if (currentStep) {
    var stepLink = document.getElementById("step-" + currentStep);

    if (stepLink) $(stepLink).replaceWith(stepLink.innerHTML);
  }

  if (jurisMap) {
    var usmap = new Datamap({
      scope: 'usa',
      element: document.getElementById('jurisdiction-map'),

      geographyConfig: {
        popupOnHover: false,
        highlightFillColor: '#8ad1e5'
      },

      done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            var redirectURL = "../data-entry/";
            redirectURL += "?jurisdiction=" + geography.id + "&jurisdiction_name=" + geography.properties.name;
            window.location.href = redirectURL;
        });
      },

      fills: {
        defaultFill: '#5bc0de'
      },
    });

    usmap.labels();
  }

  if (jurisNameSpan && getParameterByName("jurisdiction_name")) {
    jurisNameSpan.innerHTML = getParameterByName("jurisdiction_name");
  }

  $('input[type="datetime"]').datetimepicker();

  $('input[type="radio"]').change(function() {
    $(".radio label").removeClass("active");

    if ($(this).is(':checked')) {
      $(this).parent().addClass("active");
    }
  });

});
