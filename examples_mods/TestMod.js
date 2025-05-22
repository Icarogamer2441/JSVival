JSV.api.modname = "TestMod";
JSV.api.modversion = "1.0.0";
JSV.api.moddescription = "A test mod to demonstrate the modding API.";
JSV.api.modauthor = "Your Name";

let can_delete_entities = false; // Flag to control entity deletion

// Example of using the game loop
JSV.api.gameloop = function() {
    // This runs every frame
    let player_position = JSV.api.get_player_position();
    let nearest_entity = JSV.api.get_nearest_entity();
    
//    if (nearest_entity && JSV.api.get_distance(nearest_entity.position, player_position) < 10) {
//        JSV.api.send_message("An entity is nearby!");
//    }
    if (can_delete_entities && nearest_entity && JSV.api.get_distance(nearest_entity.position, player_position) < 15) {
        JSV.api.delete_entity(nearest_entity);       // you can delete the player (use JSV.api.get_player_entity() to get the player entity), but if you delete it, it will just die
        JSV.api.send_message("Deleted an entity!");
    }
};

// Example of using event handlers
JSV.api.on_chat_message = function(message) {
    if (message.toLowerCase().includes("hello")) {
        JSV.api.send_message("TestMod says: Hello back!");
    }
    if (message.toLowerCase().includes("delete")) {
        can_delete_entities = !can_delete_entities; // Toggle deletion flag
        JSV.api.send_message(`Entity deletion is now ${can_delete_entities ? "enabled" : "disabled"}.`);
    }
};

JSV.api.on_player_move = function(player) {
    // Log when player reaches certain height
    if (player.y > 10) {
        JSV.api.send_message("You're very high up!");
    }
};