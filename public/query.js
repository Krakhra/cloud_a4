function random(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function listen(event){
  console.log(document.getElementById("exampleFormControlTextarea1").value)
  axios({
    method:'post',
    url: '/listen',
    data:{
      text:document.getElementById("exampleFormControlTextarea1").value
    }
  })
  .then(function(response){
    console.log(response)
  })
}

function getArticle(event){
  axios.get('/article')
    .then(function(response){
      var target = event.target || event.srcElement;
      randomNum = random(response.data.articles.length)
      document.getElementById("exampleFormControlTextarea1").value = response.data.articles[randomNum].description
      console.log(response.data.articles)
    })
}