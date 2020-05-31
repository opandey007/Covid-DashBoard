var countryDataDrpdwn = "";
var recvrCase = "";
var confrmedCase = "";
var deathCase = "";
$(document).ready(function () {
  var ajax1 = $.ajax({
    dataType: "json",
    url: "./data/recovered.json",
    success: function (result) {},
  });
  var ajax2 = $.ajax({
    dataType: "json",
    url: "./data/totaldeath.json",
    success: function (result) {},
  });
  var ajax3 = $.ajax({
    dataType: "json",
    url: "./data/confirmed.json",
    success: function (result) {},
    statusCode: {
      404: function () {
        alert("There was a problem with the server.  Try again soon!");
      },
    },
  });
  $.when(ajax1, ajax2, ajax3).done(function (recovered, death, conrfmd) {
    countryDataDrpdwn = death[0];
    deathCase = death[0];
    recvrCase = recovered[0];
    confrmedCase = conrfmd[0];
    $.each(countryDataDrpdwn, function (i, data) {
      var CountryData = data["Country/Region"];
      $("#countryList").append(
        "<option class=" + CountryData + ">" + CountryData + "</option>"
      );
      $("#asOnDate").append(
        "<option class=" + CountryData + ">" + CountryData + "</option>"
      );
    });
  });

  $("#countryList").change(function () {
    var ajax1 = $.ajax({
      dataType: "json",
      url: "./data/recovered.json",
      success: function (result) {},
    });
    var ajax2 = $.ajax({
      dataType: "json",
      url: "./data/totaldeath.json",
      success: function (result) {},
    });
    var ajax3 = $.ajax({
      dataType: "json",
      url: "./data/confirmed.json",
      success: function (result) {},
      statusCode: {
        404: function () {
          alert("There was a problem with the server.  Try again soon!");
        },
      },
    });
    $.when(ajax1, ajax2, ajax3).done(function (recovered, death, conrfmd) {
      countryDataDrpdwn = death[0];
      deathCase = death[0];
      recvrCase = recovered[0];
      confrmedCase = conrfmd[0];
      $.each(countryDataDrpdwn, function (i, data) {
        var CountryData = data["Country/Region"];
        $("#countryList").append(
          "<option class=" + CountryData + ">" + CountryData + "</option>"
        );
        $("#asOnDate").append(
          "<option class=" + CountryData + ">" + CountryData + "</option>"
        );
      });
    });

    $("#firstRow").show();
    $("Highcharts").remove();
    var arrayDataDeath = [];
    var arrayDataConfirmed = [];
    var arrayDataRecovered = [];
    var today = new Date();
    var dd = String(today.getDate() - 10);
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = "20";
    today = mm + "/" + dd + "/" + yyyy;
    var selectedCountry = $(this).children("option:selected").val();
    $.each(confrmedCase, function (i, obj) {
      arrayDataConfirmed = [];
      arrayDataConfirmed.push(obj["" + today + ""]);
      if (selectedCountry == obj["Country/Region"]) {
        $("#total_confrmd").html(obj["" + today + ""]);
      }
    });
    $.each(recvrCase, function (j, obj1) {
      arrayDataRecovered.push(obj1["" + today + ""]);
      if (selectedCountry == obj1["Country/Region"]) {
        $("#total_recoverd").html(obj1["" + today + ""]);
      }
    });
    $.each(deathCase, function (k, obj2) {
      arrayDataDeath.push(obj2["" + today + ""]);
      if (selectedCountry == obj2["Country/Region"]) {
        $("#total_death").html(obj2["" + today + ""]);
      }
    });

    Highcharts.chart("container", {
      title: {
        text: "Covid-19 Live Data",
      },

      yAxis: {
        title: {
          text: "Number of People",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      series: [
        {
          name: "Total Death",
          data: arrayDataDeath,
        },
        {
          name: "Total Confirmed",
          data: arrayDataConfirmed,
        },
        {
          name: "Total Recovered",
          data: arrayDataConfirmed,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });
});
