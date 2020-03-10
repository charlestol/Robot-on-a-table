// Creating Robot image element
const robot = document.createElement("img");
robot.src = "robot.png";
robot.id = 'robot';
robot.style.width = "50px";

// Initializing coordinates
let x = 0;
let y = 0;
let f = 180;

// Directions for Report and Output 
let facings = {
    0: 'South',
    90: 'West',
    180: 'North',
    270: 'East'
}

// Boolean if Robot was active at least once
let robotWasActivated = false;
// Boolean if Robot is currently active
let robotActive = false;

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

// Place function to set Robot onto table
const place = () => {
    x = Number(document.getElementById('x').value) || x;
    y = Number(document.getElementById('y').value) || y;
    f = Number(document.getElementById('f').value) || f;
    setFace();
    robotActive = true;
    robotWasActivated = true;
    document.getElementById(`${x}${y}`).appendChild(robot);
    // Enabling other command buttons
    let robotCommands = document.getElementsByClassName('robot-commands');
    for(let i = 0; i < robotCommands.length; i++) {
        robotCommands[i].disabled = false;
    }
    console.log(`PLACE ${x},${y},${facings[f]}`);
}

// Move function to move Robot by one unit depending on direction facing
const move = () => {
    if(robotActive && robotWasActivated) {
        switch(f) {
            case 0: // South
                if(y !== 0) {
                    document.getElementById(`${x}${y}`).removeChild(robot);
                    y--;
                    document.getElementById(`${x}${y}`).appendChild(robot);
                }
                break;
            case 90: // West
                if(x !== 0) {
                    document.getElementById(`${x}${y}`).removeChild(robot);
                    x--;
                    document.getElementById(`${x}${y}`).appendChild(robot);
                }            
                break;
            case 180: // North
                if(y !== 4) {
                    document.getElementById(`${x}${y}`).removeChild(robot);
                    y++;
                    document.getElementById(`${x}${y}`).appendChild(robot);
                }
                break;
            case 270: // East
                if(x !== 4) {
                    document.getElementById(`${x}${y}`).removeChild(robot);
                    x++;
                    document.getElementById(`${x}${y}`).appendChild(robot);
                }
                break;
        }
        console.log('MOVE');
    }
}

// Left function to rotate Robot counter-clockwise
const left = () => {
    if(robotActive && robotWasActivated) {
        f = f === 0 ? 270 : f-90;
        setFace();
        console.log('LEFT');
    }
}

// Right function to rotate Robot clockwise
const right = () => {
    if(robotActive && robotWasActivated) {
        f = f === 270 ? 0 : f+90;
        setFace();
        console.log('RIGHT');
    }
}

// Report function to display Robot's current position
const report = () => {
    if(robotActive && robotWasActivated) {
        document.getElementById('xReport').textContent = x;
        document.getElementById('yReport').textContent = y;
        document.getElementById('fReport').textContent = facings[f];
        document.getElementById('reportContainer').classList.remove('d-none');
        console.log(`REPORT\nOutput: ${x},${y},${facings[f]}`);
    }
}

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