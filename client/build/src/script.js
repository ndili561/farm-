window.onload = function(){

  var button = document.getElementById('button')
  button.onclick = function(){
    url = '/animals'
    console.log(url)
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
      }
    }
  //   request.send(JSON.stringify( //**YOUR OBJECT HERE **//  ));
  // }
}
}