var canvas;
var stage;
var solution_puzzle= [  '','','','','',
                        '','','','','',
                        '','','','','',
                        '','','','','',
                        '','','','',''];


var lockedboxids = [1,1,1,1,1,
                    1,1,1,0,1,
                    1,1,0,1,1,
                    1,1,1,1,1,
                    1,1,1,1,1];
var puzzlenumbers = [1,2,3,4,0,
                    6,0,0,0,0,
                    7,0,0,0,0,
                    8,0,0,0,0,
                    9,0,0,0,0];     



    
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
    initializeCrosswordInstance();
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
                    textnode.innerHTML = ""+i;
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
    }

    function initClues(accross_clues_numbers,accross_clues,down_clues_numbers, down_clues)
    {
        var clues = document.getElementById("clues_text");
        var accross_col = document.getElementById("across_clues");
        var down_col = document.getElementById("down_clues");
        accross_col.className = "cluescol";
        down_col.className = "cluescol";


        console.warn(accross_clues.length);
        for(var i = 0; i < accross_clues.length ; i++)
        {
            var text = document.createElement("div");
            text.className = "cluetext";
            text.id = "accrosscluetext"+i;
            text.setAttribute("cluenumber",accross_clues_numbers[i]);
            var textnode = document.createElement("span");
            textnode.innerHTML = ""+accross_clues_numbers[i]+" "+accross_clues[i];
            text.appendChild(textnode);
            accross_col.appendChild(text);
        }
        for(var i = 0; i < down_clues.length ; i++)
        {
            var text = document.createElement("div");
            text.className = "cluetext";
            text.id = "downcluetext"+i;
            text.setAttribute("cluenumber",down_clues_numbers[i]);
            var textnode = document.createElement("span");
            textnode.innerHTML = ""+down_clues_numbers[i]+" "+down_clues[i];
            text.style = 
            text.appendChild(textnode);
            down_col.appendChild(text);
        }
        clues.appendChild(accross_col);
        clues.appendChild(down_col);

    }

