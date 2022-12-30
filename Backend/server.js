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
  
    res.send(houses);
  });

  app.get("/houses/:id", (req, res) => {
    const data = fs.readFileSync(__dirname + "/house/house.json");
    const houses = JSON.parse(data);
    let house = houses.find((house) => house.id == req.params.id)
  
    res.send(house);
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




//  app.post("/houses",upload.single("picture"), (req, res) => {
//  let fileType = req.file.mimetype.split("/")[1]
//  let newFileName = req.file.filename + "." + fileType;
//   console.log("req.file",fileType)
//   fs.rename(
//   `./house/images/${req.file.filename}`,
//   `./house/images/${newFileName}`,
//   function(){
//     console.log("callback")
//     res.send("200")
//   }
//  )

 
//  const fileData = JSON.parse(JSON.stringify(req.body));
//  const fileDataString = JSON.stringify(fileData, null, 2);
//  const uploadPath = __dirname + "/house/house.json";

//  fs.writeFileSync(uploadPath, fileDataString, (err) => {
//   if (err) {
//     console.log(err);
//     return res.status(500).send(err);
//   }
// });


// })

app.delete('/houses/:id', (req, res) => {
  const data = fs.readFileSync(__dirname + "/house/house.json", 'utf8');
  const json = JSON.parse(data);
  const id = req.params.id;
  const index = json.findIndex((item) => item.id === id);
  json.splice(index, 1);
  fs.writeFileSync(__dirname + "/house/house.json", JSON.stringify(json));
  res.send(json);
});

//__________________________________________	
//   const uploadPath = __dirname + "/house/house.json";


// 	if (fs.existsSync(uploadPath)) {
// 		fs.unlinkSync(uploadPath, (err) => {
// 			if (err) {
// 				console.log(err);
// 				return res.status(500).send(err);
// 			}
// 		});
// 	}

//   return res.status(200).send("done");
// });

// _____________________________________________________
  
  // const data = fs.readFileSync(__dirname + "/house/house.json");
  // const houses = JSON.parse(data);
  
  // let newFileName = req.file.filename + "." + fileType;


  // const chosen = req.body.chosen;
  // console.log(chosen);
  // const pictureUploadPath =
  // __dirname + `./house/images/${newFileName}`;

  // const result = houses.filter((house) => house.id != chosen);

  // const newArr = JSON.stringify(result);
  // fs.writeFileSync(__dirname + "/house/house.json", newArr);

  // if (fs.existsSync(pictureUploadPath)) {
  //   fs.unlinkSync(pictureUploadPath, (err) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send(err);
  //     }
  //   });
  // }
// _________________________________________
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
  
  const housePost = JSON.parse(
    fs.readFileSync(__dirname + "/house/house.json")
  )
  let lastHouseId = housePost
  if (lastHouseId.length ===0){
    lastHouseId = 0
  } else{
    lastHouseId = housePost[housePost.length-1].id
  }
  const pictureUploadPath =
  __dirname + "/house/images/" + `pizza${lastHouseId + 1}.jpg`;

  if (req.files) {
    const uploadedPicture = req.files.picture;
    uploadedPicture.mv(pictureUploadPath, (err) => {
      if (err) {
        console.log(err);
        // return res.status(500).send(err);
      }
    });
  }

  const name = req.body.name
  const squaremeter = req.body.squaremeter
  const grossrent = req.body.grossrent
  const picture = "/" + newFileName


    const newHouse = {
      id: lastHouseId + 1,
      name: req.body.name,
      text: req.body.text,
      bedroom:req.body.bedroom,
      kitchen:req.body.kitchen,
      bathroom:req.body.bathroom,
      squaremeter: req.body.squaremeter,
     grossrent: req.body.grossrent,
     picture: picture
    };

    housePost.push(newHouse);
    const newData = JSON.stringify(housePost)
    fs.writeFileSync(__dirname + "/house/house.json", newData);
  
    res.sendStatus(204);
  });













  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  