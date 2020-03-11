global.window = window
global.$ = require('jquery');

let { place,move,left,right,report } = require('./index.js')

/******** Start of testing command functions ********/
test('Testing place()',() => {
    console.log = jest.fn();
    console.log(
        place(0,0,0),
        place(0,100,90),
        place(10,0,270),
        place(2,2,300),
        place(-4,500,500)
    );

    expect(console.log.mock.calls[0][0]).toBe('PLACE 0,0,SOUTH-0');
    expect(console.log.mock.calls[1][0]).toBe('PLACE 0,0,WEST-90');
    expect(console.log.mock.calls[2][0]).toBe('PLACE 0,0,EAST-270');
    expect(console.log.mock.calls[3][0]).toBe('PLACE 2,2,NORTH-180');
    expect(console.log.mock.calls[4][0]).toBe('PLACE 0,0,NORTH-180');
});

test('Testing move()', () => {
    console.log = jest.fn();
    console.log(
        place(0,0,0),
        move(0,0,0),
        place(4,4,270),
        move(4,4,270),
        place(2,0,0),
        move(2,0,0),
        place(2,0,90),
        move(2,0,90),
        place(4,4,180),
        move(4,4,180),
        place(2,4,90),
        move(2,4,90)
    );
    expect(console.log.mock.calls[1][0]).toBe('MOVE 0,0,SOUTH-0');
    expect(console.log.mock.calls[3][0]).toBe('MOVE 4,4,EAST-270');
    expect(console.log.mock.calls[5][0]).toBe('MOVE 2,0,SOUTH-0');
    expect(console.log.mock.calls[7][0]).toBe('MOVE 1,0,WEST-90');
    expect(console.log.mock.calls[9][0]).toBe('MOVE 4,4,NORTH-180');
    expect(console.log.mock.calls[11][0]).toBe('MOVE 1,4,WEST-90');
});

test('Testing left()', () => {
    console.log = jest.fn();
    console.log(
        place(0,0,0),
        left(0),
        left(270),
        left(180),
        left(90)
    )

    expect(console.log.mock.calls[1][0]).toBe('LEFT EAST-270');
    expect(console.log.mock.calls[2][0]).toBe('LEFT NORTH-180');
    expect(console.log.mock.calls[3][0]).toBe('LEFT WEST-90');
    expect(console.log.mock.calls[4][0]).toBe('LEFT SOUTH-0');
});

test('Testing right()', () => {
    console.log = jest.fn();
    console.log(
        place(0,0,0),
        right(0),
        right(90),
        right(180),
        right(270)
    )

    expect(console.log.mock.calls[1][0]).toBe('RIGHT WEST-90');
    expect(console.log.mock.calls[2][0]).toBe('RIGHT NORTH-180');
    expect(console.log.mock.calls[3][0]).toBe('RIGHT EAST-270');
    expect(console.log.mock.calls[4][0]).toBe('RIGHT SOUTH-0');
});
/******** End of testing command functions ********/


/******** Start of testing given example Input and Output ********/
test('Test Case a)', () => {
    console.log = jest.fn();
    console.log(
        place(0,0,180),
        move(0,0,180),
        report(0,1,180)
    );

    expect(console.log.mock.calls[0][0]).toBe('PLACE 0,0,NORTH-180');
    expect(console.log.mock.calls[1][0]).toBe('MOVE 0,1,NORTH-180');
    expect(console.log.mock.calls[2][0]).toBe('REPORT 0,1,NORTH-180');
});

test('Test Case b)', () => {
    console.log = jest.fn();
    console.log(
        place(0,0,180),
        left(180),
        report(0,0,90)
    );

    expect(console.log.mock.calls[0][0]).toBe('PLACE 0,0,NORTH-180');
    expect(console.log.mock.calls[1][0]).toBe('LEFT WEST-90');
    expect(console.log.mock.calls[2][0]).toBe('REPORT 0,0,WEST-90');
});

test('Test Case c)', () => {
    console.log = jest.fn();
    console.log(
        place(1,2,270),
        move(1,2,270),
        move(2,2,270),
        left(270),
        move(3,2,180),
        report(3,3,180)
    );
    
    expect(console.log.mock.calls[0][0]).toBe('PLACE 1,2,EAST-270');
    expect(console.log.mock.calls[1][0]).toBe('MOVE 2,2,EAST-270');
    expect(console.log.mock.calls[2][0]).toBe('MOVE 3,2,EAST-270');
    expect(console.log.mock.calls[3][0]).toBe('LEFT NORTH-180');
    expect(console.log.mock.calls[4][0]).toBe('MOVE 3,3,NORTH-180');
    expect(console.log.mock.calls[5][0]).toBe('REPORT 3,3,NORTH-180');
});
/******** End of testing given example Input and Output ********/

/******** Start of testing table edges ********/
test('Test Case: attemping to fall off left and top edge)', () => {
    console.log = jest.fn();
    console.log(
        place(0,0,90),
        move(0,0,90),
        right(90),
        move(0,0,180),
        move(0,1,180),
        move(0,2,180),
        move(0,3,180),
        move(0,4,180),
        right(180),
        left(270),
        report(0,4,180)
    );

    expect(console.log.mock.calls[0][0]).toBe('PLACE 0,0,WEST-90');
    expect(console.log.mock.calls[1][0]).toBe('MOVE 0,0,WEST-90');
    expect(console.log.mock.calls[2][0]).toBe('RIGHT NORTH-180');
    expect(console.log.mock.calls[3][0]).toBe('MOVE 0,1,NORTH-180');
    expect(console.log.mock.calls[4][0]).toBe('MOVE 0,2,NORTH-180');
    expect(console.log.mock.calls[5][0]).toBe('MOVE 0,3,NORTH-180');
    expect(console.log.mock.calls[6][0]).toBe('MOVE 0,4,NORTH-180');
    expect(console.log.mock.calls[7][0]).toBe('MOVE 0,4,NORTH-180');
    expect(console.log.mock.calls[8][0]).toBe('RIGHT EAST-270');
    expect(console.log.mock.calls[9][0]).toBe('LEFT NORTH-180');
    expect(console.log.mock.calls[10][0]).toBe('REPORT 0,4,NORTH-180');
});
/******** End of testing table edges ********/
