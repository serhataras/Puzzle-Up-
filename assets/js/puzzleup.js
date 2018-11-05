var canvas;
var stage;
var solution_puzzle= [  '','','','','',
                        '','','','','',
                        '','','','','',
                        '','','','','',
                        '','','','',''];
<<<<<<< HEAD
var lockedboxids = [1,1,1,1,1,
                    1,1,1,0,1,
                    1,1,0,1,1,
                    1,1,1,1,1,
                    1,1,1,1,1];
var puzzlenumbers = [1,2,3,4,5,
                    6,0,0,0,0,
                    7,0,0,0,0,
                    8,0,0,0,0,
                    9,0,0,0,0];     
    function init()
    {
        initWrapper();
    }    
    function setLockedBoxID(ids)
    {
            for(var i = 0; i < 25; i++)
                lockedboxids[i] = ids[i];
    }
    function initWrapper(){
        var myWrapper= document.getElementById("game_panel");
=======


var lockedboxids = [1,1,1,1,1,
                    1,1,1,1,1,
                    1,1,1,1,1,
                    1,1,1,1,1,
                    1,1,1,1,1];
var puzzlenumbers = [0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0];     



    
    //force to handle it as text
    

    var pathPreFix= "./crawler/data/";
    var pathPostFix='.json';
    var date;
    var fullpath; 

    var accross_clues_numbers;
    var accross_clues;
    var down_clues_numbers;
    var down_clues;
    var grid_data;
    var grid;

    var Author;
    var publishDate;
    var crossword_JSON ;
    
  
    


//########################################
/*
* Utility Functions to Perform CORS AJAX calls and initial parsing with specific dates.
*
*/
    function setPathandLoadJSON(){
   
    date = document.getElementById("datetimepickerID");
    console.log(date.value);
    
    fullPath=pathPreFix.concat(date.value,pathPostFix);

    setTimeout(function (){  
        // Something you want delayed.
        loadJSON(function(json) {
            console.log(json); // this will log out the json object
            crossword_JSON=json;

            grid_data=crossword_JSON[0].Grid[0].gridType;
           
            accross_clues_numbers=crossword_JSON[0].left[1].number;
            accross_clues=crossword_JSON[0].left[1].clue;
            
            down_clues_numbers=crossword_JSON[0].right[1].number;
            down_clues=crossword_JSON[0].right[1].clue;

            console.log(grid_data);
            console.log(accross_clues_numbers);
            console.log(accross_clues);
            console.log(down_clues_numbers);
            console.log(down_clues);
            parseJSON();
            initializeCrosswordInstance();
            initClues(accross_clues_numbers,accross_clues,down_clues_numbers, down_clues);
          }); 
      }, 200);

     
    }
  
    function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', fullPath, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
        }
    };

    xobj.send(null);  
    }
//########################################


  function init() {
    
}



//########################################
/*
* Parser for the JSON file
*
*/
function parseJSON(){

        for(var i = 0 ; i < 25; i++)
        {
            if(grid_data[i].includes("Cell-block--1oNaD")){
                lockedboxids[i]=0;
            }
            else{
                lockedboxids[i]=1;
                if(grid_data[i].includes("font-size=\"33.33\">")){
                    //charcount = 20
                    var index= grid_data[i].indexOf("font-size=\"33.33\">")+18
                    puzzlenumbers[i]=grid_data[i][index];
                }
                else puzzlenumbers[i]=0;
            }    
        }
        console.log(puzzlenumbers);
        console.log(lockedboxids);
}

 // function 
    function initializeCrosswordInstance(){
        var myWrapper= document.getElementById("game_panel");
        myWrapper.innerHTML="";
>>>>>>> master
        for(var i = 0 ; i < 25; i++)
        {
            if(lockedboxids[i]==1)
            {
                var node = document.createElement("div");
                node.className = "box";
                node.id = "box"+i;    
                myWrapper.appendChild(node);
                var textbox = document.createElement("input");
                textbox.className="GridInput"
                textbox.type = "text";
                textbox.setAttribute("maxlength","1");
                
                if(puzzlenumbers[i]!=0)
                {
                    var text = document.createElement("div");
                    text.className = "minitext";
                    text.id = "minitext"+i;
                    var textnode = document.createElement("span");
<<<<<<< HEAD
                    textnode.innerHTML = ""+i;
=======
                    textnode.innerHTML = ""+puzzlenumbers[i];
>>>>>>> master
                    text.id="textnode"+i;
                    text.appendChild(textnode);
                    node.appendChild(text);
                }
                node.appendChild(textbox);

            }
            else
            {
                var node = document.createElement("div");
                node.className = "lockedbox";
                node.id = "lockedbox"+i;
                myWrapper.appendChild(node);
                
            }
        }
<<<<<<< HEAD
    }
=======
    }

    function initClues(accross_clues_numbers,accross_clues,down_clues_numbers, down_clues)
    {
        var clues = document.getElementById("clue_panel");

        var accross_col = document.getElementById("acrossClue");
        var down_col = document.getElementById("downClue");

        accross_col.className = "cluescol";
        down_col.className = "cluescol";
        
        down_col.innerHTML="";
        accross_col.innerHTML="";
        console.warn(accross_clues.length);
        for(var i = 0; i < accross_clues.length ; i++)
        {
            var text = document.createElement("div");
            text.className = "cluetextAccross";
            text.id = "accross_Clue_Text_"+i;
            text.setAttribute("cluenumber_",accross_clues_numbers[i]);
            var textnode = document.createElement("span");
            textnode.className="clueNumberAccross";
            textnode.innerHTML = ""+accross_clues_numbers[i]+" - ";

            var textnodeClue = document.createElement("span");
            textnodeClue.className="accrossClueText";
            textnodeClue.innerHTML=accross_clues[i];

            text.appendChild(textnode);
            text.appendChild(textnodeClue);

            accross_col.appendChild(text);
        }
        for(var i = 0; i < down_clues.length ; i++)
        {
            var text = document.createElement("div");
            text.className = "cluetextDown";
            text.id = "downcluetext"+i;
            text.setAttribute("cluenumber",down_clues_numbers[i]);
            var textnode = document.createElement("span");
            textnode.className="clueNumberDown";
            textnode.innerHTML = ""+down_clues_numbers[i]+" - ";

            var textnodeClue = document.createElement("span");
            textnodeClue.className="DownClueText";
            textnodeClue.innerHTML=down_clues[i];

            text.appendChild(textnode);
            text.appendChild(textnodeClue);

            down_col.appendChild(text);
        }
        clues.appendChild(accross_col);
        clues.appendChild(down_col);

    }

>>>>>>> master
