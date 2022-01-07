const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function onVideoMetadataLoaded(e) {
    //When the metadata is loaded, let's start painting the video to the canvas
    paintToCanvas();
}

function getVideo() {
    navigator.mediaDevices.getUserMedia({video:true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(error => {
            console.error("Unable to open camera.", error);
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillRect(0, 0, width, height);
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        //pixels = redEffect(pixels);
        //pixels = rgbSplit(pixels);
        //ctx.globalAlpha = 0.1;

        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
   //Play the fun snap sound
   snap.currentTime = 0;
   snap.play();

   //Take a screenshot
   const imageData = canvas.toDataURL('image/jpeg');

   //Create and anchor with an image whose url is that of the snapshot's, and append to the strip.
   const link = document.createElement('a');
   const image = document.createElement('img');
   link.href = imageData;
   link.setAttribute('download', 'handsome');
   link.textContent = 'Download image';
   image.src = imageData;
   link.appendChild(image);
   strip.appendChild(link);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 20; // RED
      pixels.data[i + 1] = pixels.data[i + 1] + 150; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] * 0.55; // BLUE
    }
    return pixels;
  }

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // BLUE
    }
    return pixels;
  }

  function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];

      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }

    return pixels;
  }

video.addEventListener('loadedmetadata', onVideoMetadataLoaded);

getVideo();
