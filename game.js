const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
let Squares = [];
let Bullets = [];
let score = 0;
let maxScore = 0;
const getRandomColor = () => {
    const r = () => Math.floor(Math.random()*256);
    return "rgb(" + r() + "," + r() + "," + r() + ")";
}

class Square {
    constructor(x){
        this.pos = {x, y: -100}
        this.color = getRandomColor();
    }

    draw(){
        this.pos.y = this.pos.y + 0.3;
        if(this.pos.y >= 750) {
            score = 0;
            Squares = [];
            Bullets = [];
            var audio = new Audio('./sounds/game_over.mp3');
            audio.play();
           
            return;
        }
        ctx.fillStyle = this.color;

        ctx.fillRect(this.pos.x, this.pos.y, 100, 50);
    }
    kill(){
        return Squares.splice(Squares.indexOf(this), 1);
    }
}
class Bullet{
    constructor(x, y){
        this.pos = {x, y};
    }
    draw() {
        if(this.pos.y <= 0) return this.kill();

        ctx.fillStyle = "#000000";
        this.pos.y = this.pos.y - 0.5;
        ctx.fillRect(this.pos.x + 45, this.pos.y, 10, 10);

        const found = Squares.find(s => s.pos.x === this.pos.x && this.pos.x <= (s.pos.x + 100) && this.pos.y - 48 <= s.pos.y );
        if(found){
            console.log(this.pos, Squares[0].pos)
            score++;
            if(score > maxScore) maxScore = score;

            var audio = new Audio('./sounds/cartoon.mp3');
            audio.play();

            found.kill();
            return this.kill()
        }
        }
    kill(){
        return Bullets.splice(Bullets.indexOf(this), 1);
    }
}
//Squares.push(new Square(10))
let selectedPos = 0;
const positions = [10, 120, 240, 360, 480, 600, 720, 840];
setInterval(() => {
    Squares.push(new Square(positions[Math.floor(Math.random()*positions.length)]));
}, 1000);
setInterval(() => {
    Bullets.push(new Bullet(positions[selectedPos], 800));
}, 500)
setInterval(() => {
    ctx.clearRect(0, 0, c.width, c.height);
    Squares.forEach(s => s.draw())
    Bullets.forEach(b => b.draw());
    ctx.fillRect(positions[selectedPos], 790, 100, 10);
    document.getElementById("score").innerText = score;
    document.getElementById("max_score").innerText = maxScore;
}, 1);


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(positions[selectedPos - 1]) selectedPos = selectedPos - 1;
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(positions[selectedPos + 1]) selectedPos = selectedPos + 1;

    }

}