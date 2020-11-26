const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const Fs = require('fs')
var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=8c553c1ce53a433ca7434c77bf8ed27a';

app.use('/', express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
count = 1

app.get('/article',(req,res)=>{
  request(url,function(error,response,body){
    res.send(JSON.parse(body))
  })  

})

app.post('/listen',(req,res)=>{
  // create polly
  const Polly = new AWS.Polly({
    region: 'us-east-1'
  })

  let params = {
    'Text': req.body.text,
    'OutputFormat': 'mp3',
    'VoiceId':'Kimberly'
  }

  // Fs.unlinkSync('./public/speech.mp3');

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err.code)
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            Fs.writeFile("./public/speech" + count + ".mp3", data.AudioStream, function(err) {
                if (err) {
                    return console.log(err)
                }
                console.log("The file was saved!")
            })
        }
    }
  })  
  console.log(req.body.text)
  count = count + 1
  res.send("./speech" + count +".mp3")
})
app.listen(8000, ()=>{
  console.log('Server Running')
})