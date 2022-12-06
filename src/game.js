// Create config settings for the game
let config = {
    width: 700,
    height: 500,
    backgroundColor: 0x000000, // Black
    scene: [Scene1, GameOver],
    physics: {
        default: "arcade"
    },
    parent: "game"
}

// Read scores.json with Fetch API

const Errors = document.getElementById("error");
function get_scores (callback) {
    let file = "scores.json";
    fetch(file, {cache: 'no-cache'})
    .then(function(response) {
        //Response is not okay, then...
        if (response.status !== 200) {
            Errors.innerHTML = response.status;
        }
        //Response is good, then...
        response.json().then(function (data){
            let scores = JSON.stringify(data);
            console.log(scores);
            callback(scores);
        });
    });

//High Score list to be displayed

//High Score List
const List = document.getElementById("highscores");

var list_scores = function (scores) {
    let object = JSON.parse(scores);
    //lower score saved for later

    lowest_score = object[9].score;
    document.getElementById("lowscore").value = lowest_score;
    
    //for Loop created here.
    for (let i=0; i<object.length; i++) {
        // console.log(object[i])
        let li = document.createElement("LI");
        let text = document.createTextNode(object[i].name + "..." + object[i].score);
        li.appendChild(text);
        List.appendChild(li);
        if (i===0) {
            li.setAttribute("class", "top1");
        }
        if (i===1) {
            li.setAttribute("class", "top2");
        }
        if (i===2) {
            li.setAttribute("class", "top2");
             }
         }
    }
 // reload items
 function resetForm () {
    while(list_scores.hasChildNodes()) {
        List.removeChild(List.firstChild);
    }
    //fetch the data and make the High Score List
    get_scores(list_scores);
    //reset stuff
    document.getElementById("score").value = 0;
    score = 0;
 }
  //submit the form

  //listen for clicking submit button
  myform.addEventListener("submit", function (event) {
    //dont reload page
    event.preventDefault();

    //lowest High Score
    var tenth_score = document.getElementById("lowscore").value;

    //form Data Object
    var formData = new FormData (this);

    //POST fetch requests
    fetch ("snake.php", {
        method: "post",
        body: formData
    })
    .then (function (response) {
        return response.text();
    })
    .then (function (text){
        resetForm();
        console.log(text);
    })
    .catch(function (err) {
        Errors.innerHTML = err;
    })
  });

}
