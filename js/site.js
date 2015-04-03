$(function () {

  var currentStep = $("body > section").data("step");

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
          redirectURL += "?jurisdiction=" + geography.id;
          window.location.href = redirectURL;
      });
    },

    fills: {
      defaultFill: '#5bc0de'
    },
  });

  usmap.labels();

});
