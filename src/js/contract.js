function remix_wait_for_no_animal() {
  console.log("wait for no annimal");
  MoodForestC.hasItem(params_remix_free, remix_wait_for_no_animal_callback);
}

function remix_wait_for_no_animal_callback(err, link) {
  if (err) {
    alert("Error : " + err);
  } else {
    if (link && parseInt(link)) {
      setTimeout(function() {
        remix_wait_for_no_animal()
      }, 1000);
    } else {
      App.addAlert("You have canceled your animal");
      App.displayPage("chose");
    }
  }
}

function remix_wait_for_win() {
  console.log("wait for win");
  MoodForestC.hasItem(params_remix_free, remix_wait_for_win_callback);
}

function remix_wait_for_win_callback(err, link) {
  if (err) {
    alert("Error : " + err);
  } else {
    if (link && parseInt(link)) {
      setTimeout(function() {
        remix_wait_for_win()
      }, 1000);
    } else {
      App.addAlert("Check is done");
      App.displayPage("chose");
    }
  }
}

function remix_wait_for_animal() {
  console.log("wait for annimal");
  MoodForestC.hasItem(params_remix_free, remix_wait_for_animal_callback);
}

function remix_wait_for_animal_callback(err, link) {
  if (err) {
    alert("Error : " + err);
  } else {
    if (link && parseInt(link) != 0) {
      animal = window.localStorage.getItem('animal');
      color = window.localStorage.getItem('color');
      mood = window.localStorage.getItem('mood');
      App.setlink(link);
      App.addAlert("You have created an animal: " + animal + " " + color + " " + mood + " : " + link);
      App.displayPage("animal");
    } else {
      setTimeout(function() {
        remix_wait_for_animal()
      }, 1000);;
    }
  }
}


function remix_has_animal() {

  console.log("check annimal");
  MoodForestC.hasItem(params_remix_free, remix_has_animal_callback)
}

function remix_has_animal_callback(err, link) {
  if (err) {
    alert("Error : " + err);
  } else {
    if (link && parseInt(link)) {
      animal = window.localStorage.getItem('animal');
      color = window.localStorage.getItem('color');
      mood = window.localStorage.getItem('mood');
      App.setlink(link);
      App.addAlert("You have an animal: " + animal + " " + color + " " + mood + " : " + link);
      App.displayPage("animal");
    } else {
      App.addAlert("You have not chose an animal today");
      App.displayPage("chose");
    }
  }
}


function remix_cancel_animal() {
  console.log("cancel annimal");
  MoodForestC.cancelItem(params_remix, remix_cancel_animal_callback);
}

function remix_cancel_animal_callback(err, ans) {
  if (err) {
    alert("Error : " + err);
  } else {
    App.addAlert("Animal canceling ...");
    setTimeout(function() {
      remix_wait_for_no_animal()
    }, 1000);
  }
}

function remix_bet_animal(animal, color, mood, user_key) {
  console.log("creating bet ", user_key, animal, color, mood);
  MoodForestC.addBet(user_key, animal, color, mood, params_remix, remix_bet_animal_callback);
}

function remix_bet_animal_callback(err, ans) {
  if (err) {
    alert("Error : " + err);
  } else {
    App.addAlert("The Bet is on the Way");
    App.displayPage("bet_ok");
  }
}

function remix_submit_animal(animal, color, mood) {
  console.log("creating transaction of", animal, color, mood);
  random_value = Math.floor(Math.random() * 1000000);
  window.localStorage.setItem('random_value', random_value);
  window.localStorage.setItem('animal', animal);
  window.localStorage.setItem('color', color);
  window.localStorage.setItem('mood', mood);
  MoodForestC.addItemTest(animal, color, mood, random_value, params_remix, remix_submit_animal_callback)
}

function remix_submit_animal_callback(err, link, link2) {
  if (err) {
    alert("Error : " + err);
  } else {
    App.addAlert("Animal creation ... ");
    setTimeout(function() {
      remix_wait_for_animal()
    }, 1000);
  }
}

function remix_check_animal() {
  console.log("check animal");
  random_value = window.localStorage.getItem('random_value');
  animal = window.localStorage.getItem('animal');
  color = window.localStorage.getItem('color');
  mood = window.localStorage.getItem('mood');
  MoodForestC.checkBet(animal, color, mood, random_value, params_remix, remix_check_animal_callback)
}

function remix_check_animal_callback(err, link) {
  if (err) {
    alert("Error : " + err);
  } else {
    App.addAlert("Animal check ... ");
    setTimeout(function() {
      remix_wait_for_win()
    }, 1000);
  }
}
