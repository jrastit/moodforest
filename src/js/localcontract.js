if (contract_use_local) {

  if (1 || !window.localStorage.getItem("localcontract_user_address")) {
    window.localStorage.setItem("localcontract_user_address", "0x1");
  };

  MoodForestC = {
    hasItem: function(params_remix_free, callback_function) {
      if (
        window.localStorage.getItem("localcontract_animal") == null &&
        window.localStorage.getItem("localcontract_color") == null &&
        window.localStorage.getItem("localcontract_feeling") == null &&
        window.localStorage.getItem("localcontract_random_value") == null) {
        callback_function(null, "0x");
      } else {
        callback_function(null, window.localStorage.getItem("localcontract_user_address"));
      }
    },
    addItemTest: function(animal, color, feeling, random_value, params_remix, callback_function) {
      window.localStorage.setItem("localcontract_animal", animal);
      window.localStorage.setItem("localcontract_color", color);
      window.localStorage.setItem("localcontract_feeling", feeling);
      window.localStorage.setItem("localcontract_random_value", random_value);
      if (!animal ||
        !color ||
        !feeling ||
        !random_value) {
        callback_function("error value not set");
      } else {
        callback_function(null);
      }
    },
    checkBet: function(animal, color, feeling, random_value, params_remix, callback_function) {
      if (
        window.localStorage.getItem("localcontract_animal") != animal ||
        window.localStorage.getItem("localcontract_color") != color ||
        window.localStorage.getItem("localcontract_feeling") != feeling ||
        window.localStorage.getItem("localcontract_random_value") != random_value) {
        callback_function("error value does not match");
      } else {
        window.localStorage.removeItem("localcontract_animal");
        window.localStorage.removeItem("localcontract_color");
        window.localStorage.removeItem("localcontract_feeling");
        window.localStorage.removeItem("localcontract_random_value");
        callback_function(null);
      }
    },
    addBet: function(address, animal, color, feeling, params_remix, callback_function) {
      window.localStorage.setItem("localcontract_animal", animal);
      window.localStorage.setItem("localcontract_color", color);
      window.localStorage.setItem("localcontract_feeling", feeling);
      if (!animal ||
        !color ||
        !feeling) {
        callback_function("error value not set");
      } else {
        bet_list = window.localStorage.getItem("bet_list");
        bet_list = window.localStorage.getItem("bet_nb");
        if (!bet_nb) {
          bet_nb = 0;
        }
        bet_list[bet_nb].animal = animal;
        bet_list[bet_nb].color = color;
        bet_list[bet_nb].feeling = feeling;
        bet_list[bet_nb].owner = address;
        window.localStorage.setItem("bet_list", bet_list);
        window.localStorage.setItem("bet_nb", bet_nb);
        callback_function(null);
      }
    },
    cancelItem: function(params_remix, callback_function) {
      if (
        window.localStorage.getItem("localcontract_animal") == null ||
        window.localStorage.getItem("localcontract_color") == null ||
        window.localStorage.getItem("localcontract_feeling") == null ||
        window.localStorage.getItem("localcontract_random_value") == null) {
        callback_function("error some value are empty");
      } else {
        window.localStorage.removeItem("localcontract_animal");
        window.localStorage.removeItem("localcontract_color");
        window.localStorage.removeItem("localcontract_feeling");
        window.localStorage.removeItem("localcontract_random_value");
        callback_function(null);
      }
    }
  };

}
