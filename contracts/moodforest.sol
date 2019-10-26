pragma solidity >=0.4.22 <0.6.0;

contract moodForest {
    
    uint nb_player = 0;

    uint constant Max_item = 100;

    struct Item {
        uint8 animal;
        uint8 color;
        uint8 feeling;
        address owner;
    }

    struct Player {
        Item[Max_item] bet;
        Item[Max_item] item;
        uint8 nb_bets;
        uint8 nb_items;
        bytes32 next_item;
    }
    
    mapping(address=>Player) public players;
    
    constructor() public {
    }
    
    
    function addItemTest(uint8 animal, uint8 color, uint8 feeling, uint64 random) public payable{
        this.addItem(keccak256(abi.encode(random, feeling, color, animal)));
    }
    
    function addItem(bytes32 item) public payable{
        require(item != 0,"No item set");
        require(players[msg.sender].next_item == 0, "Item already set");
        players[msg.sender].next_item = item;
    }
    
    
    function cancelItem() public payable{
        require(players[msg.sender].next_item != 0, "Item not set");
        players[msg.sender].next_item == 0;
    }
    
    function addBet(address player, uint8 animal, uint8 color, uint8 feeling) public payable{
        require(players[player].next_item != 0, "no Item for player");
        require(players[player].nb_bets < Max_item, "too many bet");
        players[player].bet[players[player].nb_bets++] = Item({animal: animal, color: color, feeling: feeling, owner: player});
    }
    
    function checkBet(uint8 animal, uint8 color, uint8 feeling, uint64 random) public payable{
        require(animal != 0, "no animal");
        require(color != 0, "no color");
        require(feeling != 0, "no feeling");
        require(random != 0, "no random");
        require(players[msg.sender].next_item != 0, "no player item");
        require(keccak256(abi.encode(random, feeling, color, animal)) == players[msg.sender].next_item, "no random");
        Player memory owner = players[msg.sender];
        for (uint8 i = 0;i < players[msg.sender].nb_bets; i++){
            if (owner.bet[i].animal == animal){
                Player memory winner = players[players[msg.sender].bet[i].owner];
                winner.item[winner.nb_bets].animal == animal;
                winner.item[winner.nb_bets].color == color;
                winner.item[winner.nb_bets].feeling == feeling;
                winner.nb_bets++;
            }
        }
    }
    
}
