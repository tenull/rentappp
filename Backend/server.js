const express = require("express");
const fs = require("fs");
const path = require('path');
const cors = require("cors");
const app = express();
const port = 8000;
const multer = require("multer")
const upload = multer({dest:"./house/images/"})



app.use(cors());
app.use(express.json());


app.use('/', express.static("house/images"));

app.get("/houses", (req, res) => {
    const data = fs.readFileSync(__dirname + "/house/house.json");
    const houses = JSON.parse(data);
  
    res.json(houses);
  });


//   app.get("/house4.jpg", (req, res) =>
// 	res.sendFile(path.join(`${__dirname}/../Backend/house/images/house4.jpg`))
// );

//   app.get("/house3.jpg", (req, res) =>
// 	res.sendFile(path.join(`${__dirname}/../Backend/house/images/house3.jpg`))
// );

// app.get("/house2.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/house2.jpg`))
// );
// app.get("/House1.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/House1.jpg`))
// );
// app.get("/house5.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/house5.jpg`))
// );
// app.get("/house6.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/house6.jpg`))
// );
// app.get("/house7.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/house7.jpg`))
// );
// app.get("/house8.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/house8.jpg`))
// );
// app.get("/house9.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/house9.jpg`))
// );
// app.get("/house10.jpg", (req, res) =>
// res.sendFile(path.join(`${__dirname}/../Backend/house/images/house10.jpg`))
// );




 app.post("/houses",upload.single("picture"), (req, res) => {
 let fileType = req.file.mimetype.split("/")[1]
 let newFileName = req.file.filename + "." + fileType;
  console.log("req.file",fileType)
  fs.rename(
  `./house/images/${req.file.filename}`,
  `./house/images/${newFileName}`,
  function(){
    console.log("callback")
    res.send("200")
  }
 )

 
 const fileData = JSON.parse(JSON.stringify(req.body));
 const fileDataString = JSON.stringify(fileData, null, 2);
 const uploadPath = __dirname + "/house/house.json";

 fs.writeFileSync(uploadPath, fileDataString, (err) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

})

app.delete("/houses", (req, res) => {
	
  const uploadPath = __dirname + "/house/house.json";


	if (fs.existsSync(uploadPath)) {
		fs.unlinkSync(uploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	return res.status(200).send("done");
});




  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  