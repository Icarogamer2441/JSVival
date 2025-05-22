JSV.api.modname = "BallMod";
JSV.api.modversion = "1.0.0";
JSV.api.moddescription = "A mod to add a ball entity and handle its interactions.";
JSV.api.modauthor = "Your Name";

let ball = null;
let ballSpeed = 0.1;

function initBall() {
    // Create the sphere shape
    JSV.api.new_shape(JSV.api.shapes.sphere(1.0), "ball");
    JSV.api.set_shape_color("ball", "#ff0000");
    JSV.api.create_entity("ball", "ball_entity");
    
    ball = JSV.api.get_entity("ball_entity");
    if (ball) {
        ball.position.set(0, 50, 0);
        ball.userData.gravity = true;
        ball.userData.active = false;
        ball.userData.collision_radius = 17 * 2; // Physical size of the ball
        ball.userData.collide_other_entities = true; // Enable entity collisions
        ball.userData.can_push = true; // Allow the ball to be pushed
    }
}

initBall();

// Add a game loop to ensure the ball stays active
JSV.api.gameloop = function() {
    if (ball && ball.active) {
        // Add friction when the ball is on the ground
        // Use terrain height directly since we're in the game context
        const { height } = getTerrainData(ball.position.x, ball.position.z);
        
        // Check if ball is close to the ground
        if (Math.abs(ball.position.y - height) < 0.1) {
            // Apply ground friction to slow the ball down
            ball.userData.velocity.x *= 0.98;
            ball.userData.velocity.z *= 0.98;
        }
    }
};

JSV.api.on_chat_message = function(message) {
    if (!ball) return;

    const msg = message.toLowerCase();
    if (msg.includes("ball")) {
        ball.active = !ball.active;
        JSV.api.send_message(ball.active ? "BallMod says: Ball is active!" : "BallMod says: Ball is inactive!");
        ball.position.set(0, 50, 0);
        ball.userData.velocity.set(0, 0, 0);
    }
    else if (msg.includes("gravity")) {
        ball.gravity = !ball.gravity;
        JSV.api.send_message(`BallMod says: Gravity is now ${ball.gravity ? "ON" : "OFF"}`);
    }
    else if (msg.includes("bounce")) {
        if (ball.active) {
            ball.userData.velocity.y = 0.5;
            JSV.api.send_message("BallMod says: Boing!");
        }
    }
    else if (msg.includes("collide")) {
        ball.userData.collide_other_entities = !ball.userData.collide_other_entities;
        JSV.api.send_message(`BallMod says: Collisions are now ${ball.userData.collide_other_entities ? "ON" : "OFF"}`);
    }
    else if (msg.includes("push")) {
        ball.userData.can_push = !ball.userData.can_push;
        JSV.api.send_message(`BallMod says: Push interaction is now ${ball.userData.can_push ? "ON" : "OFF"}`);
    }
};