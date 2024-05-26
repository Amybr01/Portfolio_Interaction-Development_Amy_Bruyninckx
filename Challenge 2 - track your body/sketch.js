let video;
let poseNet;
let poses = [];
let objects = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();

  for (let i = 0; i < 5; i++) {
    objects.push(new GameObject(random(width), random(height), 50, 50));
  }
}

function modelReady() {
  console.log('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  for (let obj of objects) {
    obj.display();
  }

  drawKeypoints();
  drawSkeleton();
  checkInteractions();
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function checkInteractions() {
  if (poses.length > 0) {
    let hands = [poses[0].pose.rightWrist, poses[0].pose.leftWrist];
    for (let hand of hands) {
      for (let obj of objects) {
        if (dist(hand.x, hand.y, obj.x + obj.w / 2, obj.y + obj.h / 2) < 50) {
          obj.x += random(-5, 5);
          obj.y += random(-5, 5);
        }
      }
    }
  }
}

class GameObject {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}
