const readline = require('readline')
const path = require('path');
const fs = require('fs');
const WaveFile = require('wavefile').WaveFile;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = prompt => {
  return new Promise((resolve, reject) => {
    rl.question(prompt, resolve)
  })
}

(async () => {
  console.clear()
  const directoryPath = await question('Enter path of directory which you want to scan for waw files : ')
  console.log(`Nice to meet you, ${directoryPath}.`)
  fs.readdir(directoryPath, { withFileTypes: true }, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    // for (const file of files) {
    //     console.log(file.name)
    // }
    const wawfiles = files.filter(x => x.isDirectory() === false && x.name.endsWith(".wav"))
    console.log("you have ", wawfiles.length + " in ", directoryPath)

    wawfiles.forEach(async function (file) {
      // Do whatever you want to do with the file

      function createdDate(file) {
        let __filepath = directoryPath + '\\' + file.name;
        const { birthtime, size } = fs.statSync(__filepath)
        //console.log(fs.statSync(__filepath))
        return { time: birthtime.toDateString(), size };
      }

      
      if (!file.isDirectory()) {
        console.log(file.name)

        const _path = path.join(directoryPath, file.name)
        console.log(_path);
        var buffer = fs.readFileSync(_path);
        const wav = new WaveFile();
        // Read a wav file from a buffer
        wav.fromBuffer(buffer);
        // Read a wav file from a ba

        let wavDataURI = wav.toDataURI();
        console.log(wavDataURI.substring(0 , 200))



      }
    });

  });



  rl.close()
})()