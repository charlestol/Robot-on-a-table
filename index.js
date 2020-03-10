const robot = document.createElement("img");
robot.src = "robot.png";
robot.id = 'robot';
robot.style.width = "50px";

let xPosition = 0;
let yPosition = 0;
let angle = 180;

let facings = {
    0: 'South',
    90: 'West',
    180: 'North',
    270: 'East'
}

let robotWasActivated = false;
let robotActive = false;

const setFace = () => {
    let facingIndicator = {
        0: 'border-bottom',
        90: 'border-left',
        180: 'border-top',
        270: 'border-right'
    }
    if(!robot.classList.length) {
        robot.classList.add('border-primary','rounded-circle',facingIndicator[angle]);
    } else {
        let f = robot.classList.item(2);
        if(f !== facingIndicator[angle]) {
            robot.classList.remove(f);
            robot.classList.add(facingIndicator[angle]);
        }
    }
}

const placeRobot = () => {
    let x = Number(document.getElementById('x').value);
    let y = Number(document.getElementById('y').value);
    let f = Number(document.getElementById('f').value);
    place(x,y,f);
    setFace();
    robotActive = true;
    robotWasActivated = true;
    document.getElementById(`${xPosition}${yPosition}`).appendChild(robot);

    let robotCommands = document.getElementsByClassName('robot-commands');
    for(let i = 0; i < robotCommands.length; i++) {
        robotCommands[i].disabled = false;
    }
}

const place = (x,y,f) => {
    xPosition = x;
    yPosition = y;
    angle = f;
    console.log(`PLACE ${x},${y},${facings[angle]}`);
}

const move = () => {
    switch(angle) {
        case 0: // South
            if(yPosition !== 0) {
                document.getElementById(`${xPosition}${yPosition}`).removeChild(robot);
                yPosition--;
                document.getElementById(`${xPosition}${yPosition}`).appendChild(robot);
            }
            break;
        case 90: // West
            if(xPosition !== 0) {
                document.getElementById(`${xPosition}${yPosition}`).removeChild(robot);
                xPosition--;
                document.getElementById(`${xPosition}${yPosition}`).appendChild(robot);
            }            
            break;
        case 180: // North
            if(yPosition !== 4) {
                document.getElementById(`${xPosition}${yPosition}`).removeChild(robot);
                yPosition++;
                document.getElementById(`${xPosition}${yPosition}`).appendChild(robot);
            }
            break;
        case 270: // East
            if(xPosition !== 4) {
                document.getElementById(`${xPosition}${yPosition}`).removeChild(robot);
                xPosition++;
                document.getElementById(`${xPosition}${yPosition}`).appendChild(robot);
            }
            break;
    }
    console.log('MOVE');
}

const left = () => {
    angle = angle === 0 ? 270 : angle-90;
    setFace();
    console.log('LEFT');
}

const right = () => {
    angle = angle === 270 ? 0 : angle+90;
    setFace();
    console.log('RIGHT');
}

const report = () => {
    document.getElementById('xReport').textContent = xPosition;
    document.getElementById('yReport').textContent = yPosition;
    document.getElementById('fReport').textContent = facings[angle];
    document.getElementById('reportContainer').classList.remove('d-none');
    console.log(`REPORT\nOutput: ${xPosition},${yPosition},${facings[angle]}`);
}

document.onkeydown = e => {
    if(e.keyCode === 32) {
        document.getElementById('place').click();
    } else {
        if(robotActive && robotWasActivated) {
            switch (e.keyCode) {
                case 37:
                    document.getElementById('left').click();
                    break;
                case 38:
                    document.getElementById('move').click();
                    break;
                case 39:
                    document.getElementById('right').click();
                    break;
                case 40:
                    document.getElementById('report').click();
                    break;
            }
        }
    }
};