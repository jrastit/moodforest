App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        // Load pets.
        $.getJSON('../pets.json', function(data) {
            var petsRow = $('#petsRow');
            var petTemplate = $('#petTemplate');

            for (i = 0; i < data.length; i++) {

                petTemplate.find('.panel-title').text(data[i].animal);
                // petTemplate.find('img').attr('src', data[i].picture);
                petTemplate.find('.pet-breed').text(App.getColor(data[i].color));
                petTemplate.find('.pet-age').text(App.getMood(data[i].mood));
                petTemplate.find('.panel-body')[0].style.background = App.getColor(data[i].color);
                petsRow.append(petTemplate.html());
            }
        });

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
        $(document).on('click', '.btn-adopt', App.handleAdopt);
    },

    markAdopted: function(adopters, account) {
        /*
         * Replace me...
         */
    },

    handleAdopt: function(event) {
        event.preventDefault();

        var petId = parseInt($(event.target).data('id'));

        /*
         * Replace me...
         */
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
    }


};

$(function() {
    $(window).load(function() {
        App.init();
    });
});