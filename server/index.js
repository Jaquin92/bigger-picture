const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
require("dotenv").config();
const axios = require("axios")

const app = express();

app.use(express.static(`${__dirname}/../build`))



app.use(bodyParser.json());
app.use(cors());


massive(process.env.CONNECTION_STRING)
    .then(dbInstance => {
        app.set("db", dbInstance);
        // console.log(dbInstance);
    })
    .catch(() => console.log("error"));

app.post("/api/post", (req, res) => {
    const dbInstance = req.app.get("db");

    let str = process.env.API

    let obj = {
        "longUrl": req.body.longUrl
    }

    axios.post(`https://www.googleapis.com/urlshortener/v1/url?key=${str}`, obj).then((url) => {

        dbInstance.addPhoto([req.body.url, url.data.id]).then((r) => {
            res.status(200).send(r)
        }).catch(err => console.log(err))

    }).catch(() => console.log('err'))





})

app.get("/api/get", (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance.getPhotos().then(r => {
        res.status(200).send(r)
    }).catch(err => console.log(err))

})



let port = 1534
const path = require('path');

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

app.listen(port, () => console.log(`listening on port ${port}`));