const fs = require("fs");

const readStream = fs.createReadStream("./doc/large.txt");
const writeStream = fs.createWriteStream("./doc/moreLarger.txt");

/* readStream.on('data',(data)=>{
    console.log(data.toString());
    console.log("---chunk---");
    
}) */

/* readStream.on("data", (data) => {
  writeStream.write(data.toString());
  writeStream.write("---chunk---");
}); */

readStream.pipe(writeStream);
