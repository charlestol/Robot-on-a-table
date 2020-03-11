// Creating Robot image element
const robot = document.createElement("img");
robot.src = "robot.png";
robot.id = 'robot';
robot.style.width = "50px";

// Initializing coordinate default (0,0,NORTH)
let x = 0;
let y = 0;
let f = 180;

// Directions for Report, console.log, and Output 
const facings = {
    0: 'SOUTH',
    90: 'WEST',
    180: 'NORTH',
    270: 'EAST'
}

// Boolean if Robot was active at least once
let robotWasActivated = false;
// Boolean if Robot is currently active
let robotActive = false;



// Place function to set Robot position values
const place = (inX, inY, inF) => {
    // If somehow, invalid inputs are passed in, keep coordinates to the default (0,0,NORTH)
    x = (inX < 0 || inX > 4) ? 0 : inX;
    y = (inY < 0 || inY > 4) ? 0 : inY;
    f = (!facings[inF]) ? 180 : inF;
    console.log(`PLACE ${x},${y},${facings[f]}-${f}`);
}

// Move function to move Robot by one unit depending on direction facing
const move = (inX, inY, inF) => {
    switch(inF) {
        // If trying to move past edge of table, do not increment/decrement
        case 0: // South
            y = inY !== 0 ? inY - 1 : 0;
            break;
        case 90: // West
            x = inX !== 0 ? inX - 1 : 0;
            break;
        case 180: // North
            y = inY !== 4 ? inY + 1 : 4;
            break;
        case 270: // East
            x = inX !== 4 ? inX + 1 : 4;
            break;
    }
    console.log(`MOVE ${x},${y},${facings[f]}-${f}`);
}

// Left function to rotate Robot counter-clockwise
const left = inF => {
    // Handle f (angle) if f is currently 0 since left rotation subtracts 90 deg
    f = inF === 0 ? 270 : inF-90;
    console.log(`LEFT ${facings[f]}-${f}`);
}

// Right function to rotate Robot clockwise
const right = inF => {
    // Handle f (angle) if f is currently 270 since right rotation adds 90 deg
    f = inF === 270 ? 0 : inF+90;
    console.log(`RIGHT ${facings[f]}-${f}`);
}

// Report function to display Robot's current position
const report = () => {
    console.log(`REPORT ${x},${y},${facings[f]}-${f}`);
}

// Setting a rounded border which is used to indicate the direction the Robot is facing
const setFace = () => {
    let facingIndicator = {
        0: 'border-bottom',
        90: 'border-left',
        180: 'border-top',
        270: 'border-right'
    }
    if(!robot.classList.length) {
        robot.classList.add('border-primary','rounded-circle',facingIndicator[f]);
    } else {
        let face = robot.classList.item(2);
        if(face !== facingIndicator[f]) {
            robot.classList.remove(face);
            robot.classList.add(facingIndicator[f]);
        }
    }
}

// User interactions
$('#place').click(() => {
    let xSubmitted = Number(document.getElementById('x').value);
    let ySubmitted = Number(document.getElementById('y').value);
    let fSubmitted = Number(document.getElementById('f').value);
    robotActive = true;
    robotWasActivated = true;
    place(xSubmitted,ySubmitted,fSubmitted);
    setFace();
    document.getElementById(`${x}${y}`).appendChild(robot);
    // Enabling other command buttons
    let robotCommands = document.getElementsByClassName('robot-commands');
    for(let i = 0; i < robotCommands.length; i++) {
        robotCommands[i].disabled = false;
    }
});

$('#move').click(() => { 
    if(robotActive && robotWasActivated) {
        let prevX = x;
        let prevY = y;
        move(x,y,f);
        if(x != prevX || y != prevY) {
            document.getElementById(`${prevX}${prevY}`).removeChild(robot);
            document.getElementById(`${x}${y}`).appendChild(robot);
        }
    } 
});

$('#left').click(() => { 
    if(robotActive && robotWasActivated) {
        left(f); 
        setFace();
    }
});

$('#right').click(() => { 
    if(robotActive && robotWasActivated) {
        right(f);
        setFace();
    }
});

$('#report').click(() => { 
    if(robotActive && robotWasActivated) {
        report(x,y,f);
        document.getElementById('xReport').textContent = x;
        document.getElementById('yReport').textContent = y;
        document.getElementById('fReport').textContent = facings[f];
        document.getElementById('reportContainer').classList.remove('d-none');
    } 
});

// Handle closing Place Robot modal when clicking cancel, x, or outside and whether or not there's an active robot
$('#placeRobotModal').on('hidden.bs.modal', () => {
    robotActive = robotWasActivated ? true : false;
});

module.exports = {
    place,
    move,
    left,
    right,
    report
}