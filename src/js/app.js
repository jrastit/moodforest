var json_data;

App = {
  animals: null,
  web3Provider: null,
  contracts: {},
  selected: {
    "animal": 0,
    "color": 0,
    "mood": 0
  },
  trans_id: "",

  init: async function() {

    await $.getJSON('../pets.json', function(data) {
      App.animals = data["animals"];
      App.colors = data["colors"];
      App.moods = data["moods"];

      if (!addr_animal) {
        remix_has_animal();
      } else {
        App.addAlert("Animal guess");
        App.displayPage("chose");
      }
    });
  },

  displayItem: function(parent, method, argument, picture) {
    /*
    $("\
          <div class=\"col-sm-6 col-md-4 col-lg-3\">\
            <div class=\"panel panel-default panel-pet\">\
              <div class=\"panel-body\" onclick=\"App."+ method + "(" + argument + ")\">\
                <img class=\"img-rounded img-center img-responsive\" src=\"" + picture + "\" data-holder-rendered=\"true\">\
              </div>\
            </div>\
          </div>\
        </div>").appendTo(parent);
        */
    $("\
            <div class=\"col-sm-6 col-md-4 col-lg-3\">\
              <div class=\"panel panel-default panel-pet\">\
                <div class=\"panel-body\"" + (method ? (" onclick=\"App." + method + "(" + argument + ")") : "") + " \">\
                  <div style=\"background-image:url('" + picture + "');padding-top:100%;background-repeat:no-repeat;background-position:center;background-size:contain;\"></div>\
                </div>\
              </div>\
            </div>\
          </div>").appendTo(parent);
  },

  displayChoseAnimal: function(parent, animal, color, mood) {
    if (animal) {
      App.displayItem(parent, "selectAnimal", animal, App.animals[animal - 1]["picture"]);
    }
    if (color) {
      App.displayItem(parent, "selectColor", color, App.colors[color - 1]["picture"]);
    }
    if (mood) {
      App.displayItem(parent, "selectMood", mood, App.moods[mood - 1]["picture"]);
    }
  },

  displayAnimal: function(parent, animal, color, mood) {
    if (animal) {
      App.displayItem(parent, null, animal, App.animals[animal - 1]["picture"]);
    }
    if (color) {
      App.displayItem(parent, null, color, App.colors[color - 1]["picture"]);
    }
    if (mood) {
      App.displayItem(parent, null, mood, App.moods[mood - 1]["picture"]);
    }
  },

  bindEvents: function() {
    $('#animalsRow').on('click', '.bt-animal', App.handleAnimal);
    $('#colorsRow').on('click', '.bt-color', App.handleColor);
    $('#moodsRow').on('click', '.bt-mood', App.handleMood);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  createTransaction: function() {
    if (App.selected["animal"] == 0 ||
      App.selected["color"] == 0 ||
      App.selected["mood"] == 0) {
      alert("Please selected all of the three");
      return;
    }
    // function from remix-contract.js
    remix_submit_animal(App.selected["animal"], App.selected["color"], App.selected["mood"]);
  },

  selectAnimal: function(animalId) {
    App.selected["animal"] = animalId;
    console.log(App.selected);
    App.displayPage("chose");
  },

  selectColor: function(colorId) {
    App.selected["color"] = colorId;
    console.log(App.selected);
    App.displayPage("chose");
  },

  selectMood: function(moodId) {
    App.selected["mood"] = moodId;
    console.log(App.selected);
    App.displayPage("chose");
  },

  getQueryParams: function() {
    console.log("url", document.URL);
    let url = document.URL;
    var qparams = {},
      parts = (url || '').split('?'),
      qparts, qpart,
      i = 0;

    if (parts.length <= 1) {
      return qparams;
    } else {
      qparts = parts[1].split('&');
      for (i in qparts) {

        qpart = qparts[i].split('=');
        qparams[decodeURIComponent(qpart[0])] =
          decodeURIComponent(qpart[1] || '');
      }
    }
    return qparams.bet;
  },

  betAnimal: function() {
    this.displayPage("wait");
    remix_bet_animal(App.selected["animal"], App.selected["color"], App.selected["mood"], addr_animal);
  },

  createAnimal: function() {
    this.displayPage("wait");
    remix_submit_animal(App.selected["animal"], App.selected["color"], App.selected["mood"]);
  },

  checkAnimal: function() {
    this.displayPage("wait");
    remix_check_animal();
  },

  cancelAnimal: function() {
    this.displayPage("wait");
    remix_cancel_animal();
  },

  setlink: function(link) {
    link = window.location.protocol + "//" + window.location.hostname + "?addr=" + link;
    this.addAlert("Make your friends guess, share the link: <a href='" + link + "'>" + link + "</a>");
  },

  addAlert: function(message) {
    $('#alerts').append(
      '<div class="alert alert-info">' +
      '<button type="button" class="close" data-dismiss="alert">' +
      '&times;</button>' + message + '</div>');
  },

  displayPage: function(name) {
    if (name == "chose") {
      $('#choseButton').hide();
      $('#betButton').hide();
      $("#chose_animal").empty();
      if (!App.selected["animal"]) {
        for (i = 0; i < App.animals.length; i++) {
          App.displayChoseAnimal($("#chose_animal"), i + 1, 0, 0);
        }
      } else if (!App.selected["color"]) {
        for (i = 0; i < App.colors.length; i++) {
          App.displayChoseAnimal($("#chose_animal"), 0, i + 1, 0);
        }
      } else if (!App.selected["mood"]) {
        for (i = 0; i < App.moods.length; i++) {
          App.displayChoseAnimal($("#chose_animal"), 0, 0, i + 1);
        }
      } else {
        App.displayChoseAnimal($("#chose_animal"), App.selected["animal"], App.selected["color"], App.selected["mood"]);
        if (!addr_animal) {
          $('#choseButton').show();
        } else {
          $('#betButton').show();
        }
      }
      $('#chose').show();
    } else {
      $('#chose').hide();
    }
    if (name == "animal") {
      $("#animal_selected").empty();
      App.displayAnimal($("#animal_selected"), window.localStorage.getItem('animal'), window.localStorage.getItem('color'), window.localStorage.getItem('mood'));
      $('#animal').show();
    } else {
      $('#animal').hide();
    }
    if (name == "wait") {
      $('#wait').show();
    } else {
      $('#wait').hide();
    }

  }

};

$(function() {
  $(window).load(function() {
    App.init();

  });
});
