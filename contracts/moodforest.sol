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
        Item[Max_item] win;
        uint8 nb_bets;
        uint8 nb_wins;
        uint8 nb_items;
        bytes32 next_item;
    }
    
    mapping(address=>Player) public players;
    
    constructor() public {
    }
    
    function hasItem() external view returns(address address_sender){
        if (players[tx.origin].next_item != 0){
            return tx.origin;
        }
        return address(0);
    }
    
    function addItem(bytes32 item) external payable{
        require(item != 0,"No animal set");
        require(players[tx.origin].next_item == 0, "Item already set");
        players[tx.origin].next_item = item;
    }
    
    function addItemTest(uint8 animal, uint8 color, uint8 feeling, uint64 random) external payable returns(address address_sender){
        require(animal != 0,"No animal set");
        require(players[tx.origin].next_item == 0, "Item already set");
        players[tx.origin].next_item = keccak256(abi.encodePacked(animal, color, feeling, random));
        return (tx.origin);
    }
    
    function getNextItem() external view returns(address address_sender){
        return (tx.origin);
    }
    
    function getListItem(uint8 i) external view returns(uint8 animal, uint8 color, uint8 feeling, address owner){
        if (i < players[tx.origin].nb_items){
            return (players[tx.origin].item[i].animal, players[tx.origin].item[i].color,  players[tx.origin].item[i].feeling, players[tx.origin].item[i].owner);
        }
        return (0, 0, 0, address(0));
    }
    
    function getListWin(uint8 i) external view returns(uint8 animal, uint8 color, uint8 feeling, address owner){
        if (i < players[tx.origin].nb_wins){
            return (players[tx.origin].win[i].animal, players[tx.origin].win[i].color,  players[tx.origin].win[i].feeling, players[tx.origin].win[i].owner);
        }
        return (0, 0, 0, address(0));
    }
    
    function cancelItem() external payable{
        require(players[tx.origin].next_item != 0, "Item not set");
        players[tx.origin].next_item = 0;
    }
    
    function addBet(address player, uint8 animal, uint8 color, uint8 feeling) external payable{
        require(players[player].next_item != 0, "no Item for player");
        require(players[player].nb_bets < Max_item, "too many bet");
        players[player].bet[players[player].nb_bets++] = Item({animal: animal, color: color, feeling: feeling, owner: tx.origin});
    }
    
    function checkBet(uint8 animal, uint8 color, uint8 feeling, uint64 random) external payable returns (uint16 nb_win_ret){
        require(animal != 0, "no animal");
        require(color != 0, "no color");
        require(feeling != 0, "no feeling");
        require(random != 0, "no random");
        require(players[tx.origin].next_item != 0, "no player item");
        require(keccak256(abi.encodePacked(animal, color, feeling, random)) == players[tx.origin].next_item, "no match hash");
        uint16 nb_wins = 0;
        
        if (players[tx.origin].nb_bets != 0){
            //check all the bets
            for (uint8 i = 0;i < players[tx.origin].nb_bets; i++){
                if (players[tx.origin].bet[i].animal == animal || players[tx.origin].bet[i].color == color || players[tx.origin].bet[i].feeling == feeling){
                    players[players[tx.origin].bet[i].owner].win[players[players[tx.origin].bet[i].owner].nb_wins].animal = animal;
                    players[players[tx.origin].bet[i].owner].win[players[players[tx.origin].bet[i].owner].nb_wins].color = color;
                    players[players[tx.origin].bet[i].owner].win[players[players[tx.origin].bet[i].owner].nb_wins].feeling = feeling;
                    players[players[tx.origin].bet[i].owner].nb_wins++;
                    nb_wins++;
                }
            }
            //reset the bets
            players[tx.origin].nb_bets = 0;
            //add te wining animal to the owner
            if (nb_wins > 0){
                players[tx.origin].item[players[tx.origin].nb_wins].animal = animal;
                players[tx.origin].item[players[tx.origin].nb_wins].color = color;
                players[tx.origin].item[players[tx.origin].nb_wins].feeling = feeling;
                players[tx.origin].nb_items++;
            }  
        }
        //reset the game
        players[tx.origin].next_item = 0;
        
        
        
        return nb_wins;
        
    }
    
}
