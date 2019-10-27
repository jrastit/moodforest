var json_data;

App = {
    web3Provider: null,
    contracts: {},
    selected: {
        "animal": 0,
        "color": 0,
        "mood": 0
    },
    trans_id: "",

    init: async function() {
        //check if query param is present
        /*        
        let trans = await App.getQueryParams();
        App.trans_id = trans;
        console.log(trans)
        if (trans.length > 0) {
            $("#bet").show()
            $("#create-bet").hide()
            $('#formButton').text("BET");
            $('#formButton').off().on('click', function() { App.betNow() });

            // from remix-contract.js
            check_if_exist(trans);
        } else {
            $("#bet").hide()
            $("#create-bet").show()
            $('#formButton').text("SUBMIT");
            $('#formButton').off().on('click', function() { App.createTransaction() });
        }
        */
        // if (!trans.length > 0) {
        // Load pets.
        $.getJSON('../pets.json', function(data) {
            json_data = data;
            let animalsRow = $('#animalsRow');
            let colorsRow = $('#colorsRow');
            let moodsRow = $('#moodsRow');
            let animalTemplate = $('#animalTemplate');
            let colorTemplate = $('#colorTemplate');
            let moodTemplate = $('#moodTemplate');
            let animals = data["animals"];
            let colors = data["colors"];
            let moods = data["moods"]
            if (animalsRow.length) {
                for (i = 0; i < animals.length; i++) {
                    animalTemplate.find(".panel-body").attr('id', "div_animal_" + animals[i].id);
                    animalTemplate.find('.display-value').text(animals[i]["animal"]);
                    animalTemplate.find('img').attr('src', animals[i]["picture"]);
                    animalTemplate.find('button')[0].classList.add('bt-animal');
                    animalTemplate.find('button').attr('data-id', animals[i].id);
                    animalTemplate.find('button').attr('data-name', animals[i]["animal"]);
                    animalsRow.append(animalTemplate.html());
                }
            }
            if (colorsRow.length) {
                for (i = 0; i < colors.length; i++) {
                    colorTemplate.find('.display-value').text(colors[i]["color"]);
                    colorTemplate.find('img').attr('src', colors[i]["picture"]);
                    colorTemplate.find('button')[0].classList.add('bt-color');
                    colorTemplate.find('button').attr('data-id', colors[i].id);
                    colorTemplate.find('button').attr('data-name', colors[i]["color"]);
                    colorsRow.append(colorTemplate.html());
                }
            }
            if (moodsRow.length) {
                for (i = 0; i < moods.length; i++) {
                    moodTemplate.find('.display-value').text(moods[i]["mood"]);
                    moodTemplate.find('img').attr('src', moods[i]["picture"]);
                    moodTemplate.find('button')[0].classList.add('bt-mood');
                    moodTemplate.find('button').attr('data-id', moods[i].id);
                    moodTemplate.find('button').attr('data-name', moods[i]["mood"]);
                    moodsRow.append(moodTemplate.html());
                }
            }
        });
        // }

        return await App.initWeb3();
    },

    initWeb3: async function() {
        /*
         * Replace me...
         */

        return App.initContract();
    },

    initContract: function() {
        /*
         * Replace me...
         */

        return App.bindEvents();
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

    handleAnimal: function(event) {
        event.preventDefault();
        let animalId = parseInt($(event.target).data('id'));
        let animalName = $(event.target).data('name');
        App.selected["animal"] = animalId;
        $('#div_animal_' + animalId).css("backgroud-color", "blue");
        $('#animalSelected').text(animalName)
        console.log(App.selected);
    },

    handleColor: function(event) {
        event.preventDefault();
        let colorId = parseInt($(event.target).data('id'));
        let colorName = $(event.target).data('name');
        App.selected["color"] = colorId;
        $('#colorSelected').text(colorName);
        console.log(App.selected);
    },

    handleMood: function(event) {
        event.preventDefault();
        let moodId = parseInt($(event.target).data('id'));
        let moodName = $(event.target).data('name');
        App.selected["mood"] = moodId;
        $('#moodSelected').text(moodName);
        console.log(App.selected);
    },

    betNow: function() {
        console.log("betnow called");
        // do the bet with 
        // App.selected
        // App.transaction
    },


    getColor: function(color) {
        switch (color) {
            case 1:
                return "Red"
            case 2:
                return "Blue"
            case 3:
                return "Green"
            default:
                return 0
        }
    },


    getMood: function(mood) {
        console.log("mood", mood)
        switch (mood) {
            case 1:
                return "Happy"
            case 2:
                return "Sad"
            case 3:
                return "Embarassed"
            default:
                return 0
        }
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

    betAnimal: function () {
        this.displayPage("wait");
        remix_bet_animal(App.selected["animal"], App.selected["color"], App.selected["mood"], addr_animal);
    },

    createAnimal: function () {
        this.displayPage("wait");
        remix_submit_animal(App.selected["animal"], App.selected["color"], App.selected["mood"]);
    },

    checkAnimal: function () {
        this.displayPage("wait");
        remix_check_animal();
    },

    cancelAnimal: function () {
        this.displayPage("wait");
        remix_cancel_animal();
    },

    setlink: function (link) {
        link="https://moodforest.com?addr=" + link;
        this.addAlert("Make your friends guess, share the link: <a href='" + link + "'>" + link + "</a>");    
    },

    addAlert: function (message) {
    $('#alerts').append(
        '<div class="alert alert-info">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button>' + message + '</div>');
    },

    displayPage: function (name) {
        if (name == "chose"){
            $('#chose').show();        
        }else{
            $('#chose').hide();
        }
        if (name == "animal"){
            $.getJSON('../pets.json', function(data) {
            let animalTemplate = $('#animalTemplate');
            let colorTemplate = $('#colorTemplate');
            let moodTemplate = $('#moodTemplate');
            let animals = data["animals"];
            let colors = data["colors"];
            let moods = data["moods"]

                i = window.localStorage.getItem('animal') - 1;                
                    animalTemplate.find(".panel-body").attr('id', "div_animal_" + animals[i].id);
                    animalTemplate.find('.display-value').text(animals[i]["animal"]);
                    animalTemplate.find('img').attr('src', animals[i]["picture"]);
                    animalTemplate.find('button').hide();
                


                i = window.localStorage.getItem('color') - 1;                
                
                    colorTemplate.find('.display-value').text(colors[i]["color"]);
                    colorTemplate.find('img').attr('src', colors[i]["picture"]);
                    colorTemplate.find('button').hide();
                

                i = window.localStorage.getItem('feeling') - 1;
                
                    moodTemplate.find('.display-value').text(moods[i]["mood"]);
                    moodTemplate.find('img').attr('src', moods[i]["picture"]);
                    moodTemplate.find('button').hide();
                    moodsRow.append(moodTemplate.html());
                
});
            $('#animal').show();        
        }else{
            $('#animal').hide();
        }
        if (name == "wait"){
            $('#wait').show();        
        }else{
            $('#wait').hide();
        }

    }

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
