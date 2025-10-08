const fs = require("fs");

//read file
/* fs.readFile("./doc/greeting.txt", (err, data) => {
  if (err) console.log(err);
  if (data) console.log(data.toString());
}); */

//write file

/* if (!fs.existsSync("./doc/greeting.txt")) {
  fs.writeFile(
    "./doc/greeting.txt",
    "Coffee is life! ☕ for developers.What kind of coffee do you like?Cappuccino?",
    (err) => {
      if (err) console.log("An error occurred :" + err);

      console.log("File written successfully. yay! 🎉");
    }
  );
} else {
  fs.unlink("./doc/greeting.txt", (err) => {
    if (err) console.log(err);
    console.log("File deleted successfully.");
  });
} */

//create directory
if (!fs.existsSync("./content")) {
  fs.mkdir("./content", (err) => {
    if (err) console.log(err);
    console.log("Folder created successfully.");
  });
} else {
  fs.rmdir("./content", (err) => {
    if (err) console.log(err);
    console.log("Folder deleted successfully.");
  });
}
