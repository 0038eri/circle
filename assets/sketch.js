// 基本

var canvas_size = 915;
var circle_size;

// circle

var circle_r;
var circle_g;
var circle_b;

// design

var obj_count; // オブジェクトの数
var objs_types; // オブジェクトの種類
var objs_number; // 各オブジェクトの数
var objs_shapes; // オブジェクトの描写タイプ
var objs_sizeMin = 50; // オブジェクトの最小サイズ
var objs_sizeMax = 150; // オブジェクトの最大サイズ
var objs_r;
var objs_g;
var objs_b;
var objs_a;

var objs_x1; // オブジェクト生成x軸開始値
var objs_y1; // オブジェクト生成y軸開始値
var objs_x2; // オブジェクト生成x軸終了値
var objs_y2; // オブジェクト生成y軸終了値

var fps = 7;
var reset = fps * 5;
var drawCount;
var colorType;
var resetTimer = 0;

var coverImg;

function preload() {
    coverImg = loadImage("assets/cover.png");
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("p5Canvas");

    var radius = 915 / 2;
    objs_x1 = width / 2 - radius;
    objs_x2 = width / 2 + radius;
    objs_y1 = height / 2 - radius;
    objs_y2 = height / 2 + radius;

    frameRate(fps);

    background('#f0f0f0');
    randomDesign();
}

function randomDesign() {
    // design
    obj_count = 3;

    objs_types = Array(obj_count);
    objs_number = Array(obj_count);
    objs_shapes = Array(obj_count);
    objs_r = Array(obj_count);
    objs_g = Array(obj_count);
    objs_b = Array(obj_count);
    objs_a = Array(obj_count);

    for (var i = 0; i < obj_count; i++) {
        objs_types[i] = floor(random(4));
        objs_number[i] = floor(random(1, 40));
        objs_shapes[i] = floor(random(2));
        objs_r[i] = random(255);
        objs_g[i] = random(255);
        objs_b[i] = random(255);
        objs_a[i] = random(100);
    }
}

function colorMethod(colorType) {
    if (colorType == 0) {
        noStroke();
        fill(objs_r[drawCount], objs_g[drawCount], objs_b[drawCount], objs_a[drawCount]);
    } else if (colorType == 1) {
        noFill();
        strokeWeight(random(1, 11));
        stroke(objs_r[drawCount], objs_g[drawCount], objs_b[drawCount], objs_a[drawCount]);
    }
}

function draw() {
    if (resetTimer == reset) {
        resetTimer = 0;
    } else {
        resetTimer++;
    }

    if (resetTimer == 0) {
        randomDesign();
    }

    background('#f0f0f0');

    push();
    noStroke();
    fill(circle_r, circle_g, circle_b);
    circle_size = map(mouseX, 0, width, 200, 800);
    ellipse(width / 2, height / 2, circle_size);
    pop();

    // design
    for (drawCount = 0; drawCount < obj_count; drawCount++) {

        for (var i = 0; i < objs_number[0]; i++) {
            push();
            colorMethod(objs_shapes[drawCount]);
            ellipse(random(objs_x1, objs_x2), random(objs_y1, objs_y2), random(objs_sizeMin, objs_sizeMax));
            pop();
        }

        var size_rect;
        for (var j = 0; j < objs_number[1]; j++) {
            push();
            colorMethod(objs_shapes[drawCount]);
            rotate(random(360));
            size_rect = random(objs_sizeMin, objs_sizeMax);
            rect(random(objs_x1, objs_x2), random(objs_y1, objs_y2), size_rect, size_rect);
            pop();
        }

        var size_line;
        for (var k = 0; k < objs_number[2]; k++) {
            push();
            colorMethod(objs_shapes[drawCount]);
            translate(random(objs_x1, objs_x2), random(objs_y1, objs_y2));
            rotate(random(360));
            size_line = random(objs_sizeMin, objs_sizeMax);
            line(0, 0, size_line, size_line);
            pop();
        }
    }

    //    console.log(resetTimer);

    var imgSize;
    imgSize = map(circle_size, 200, 800, 300, 1200);
    push();
    imageMode(CENTER);
    image(coverImg, width / 2, height / 2, imgSize, imgSize);
    pop();

    var coverX;
    var coverY;
    coverX = width - imgSize;
    coverY = height - imgSize;
    push();
    noStroke();
    fill('#f0f0f0');
    rectMode(RADIUS);
    rect(coverX / 4, height / 2, coverX / 4, height / 2);
    rect(width - coverX / 4, height / 2, coverX / 4, height / 2);
    rect(width / 2, coverY / 4, width / 2, coverY / 4);
    rect(width / 2, height - coverY / 4, width / 2, coverY / 4);
    pop();
}

function keyTyped() {
    resetTimer = 0;
    randomDesign();
}