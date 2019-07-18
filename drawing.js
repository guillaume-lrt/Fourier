
let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];
let drawing_house = [];

let A_aux = [[0,0],[200,200],[100,325],[0,200],[200,0],[200,200],[0,200],[0,0],[200,0],
            [0,200],[100,325],[200,200],[0,0],[0,200],[200,200],[200,0],[0,0]];
// let A_aux = [[0,0],[200,200],[0,200]];

function setup() {
  createCanvas(1000, 800);
  let drawing_house_bis = get_all_inter_coord(A_aux,20);
  const skip = 1;
  for (let i = 0; i < drawing_house_bis.length; i += skip) {
    x.push(drawing_house_bis[i].x);
    y.push(drawing_house_bis[i].y);
  }
  fourierX = DiscreteFourierTransform(x);
  fourierY = DiscreteFourierTransform(y);

  fourierX.sort((a, b) => b.amp - a.amp);  //sort the cycles by amplitude
  fourierY.sort((a, b) => b.amp - a.amp);
}

function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);

  let epi_x = epicycles(width / 2, 150, 0, fourierX);
  let epi_y = epicycles(100, height / 2 + 150, HALF_PI, fourierY);
  let v = createVector(epi_x.x, epi_y.y);
  path.unshift(v);
  line(epi_x.x, epi_x.y, v.x, v.y);   //draw the line between the epicycle and the drawing
  line(epi_y.x, epi_y.y, v.x, v.y);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / (fourierY.length * 1);
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];   //if you want to reset your drawing after each cycle
  }
}
