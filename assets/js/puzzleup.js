var canvas;
var stage;
var solution_puzzle= [  '','','','','',
                        '','','','','',
                        '','','','','',
                        '','','','','',
                        '','','','',''];


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

    var accross_clues_numbers = [];
    var accross_clues= [];
    var down_clues_numbers= [];
    var down_clues= [];
    var grid_data= [];
    var grid= [];

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
/*
            grid_data=crossword_JSON[0].Grid[0].gridType;
            accross_clues_numbers=crossword_JSON[0].left[1].number;
            accross_clues=crossword_JSON[0].left[1].clue;
            down_clues_numbers=crossword_JSON[0].right[1].number;
            down_clues=crossword_JSON[0].right[1].clue;
*/
            grid_data = crossword_JSON.grid;
            clues =  crossword_JSON.clues;
            date = crossword_JSON.date;
            title = crossword_JSON.title;
            clueNumbers = crossword_JSON.clueNumbers;
            console.log(grid_data);
            console.log(clues);
            console.log(date);
            console.log(title);
            console.log(clueNumbers);
            
            for(var i = 0 ; i < 10; i++)
            {
                if(i<5){
                    accross_clues_numbers[i] = clueNumbers[i];
                    accross_clues[i] = clues[i];
                }
                else{
                    i = i -5;
                    down_clues_numbers[i] = clueNumbers[i+5];
                    down_clues[i] =  clues[i+5]; 
                    i = i +5;
                }
            }
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

function reset(){
    setPathandLoadJSON();
}

//########################################
/*
* Parser for the JSON file
*
*/
function parseJSON(){

        for(var i = 0 ; i < 25; i++)
        {
            if(grid_data[i][0] == -1 )
                lockedboxids[i] = 0;
            else if( grid_data[i][0] == null)
                lockedboxids[i] = 1;
            else 
            {
                lockedboxids[i] = 1;
                puzzlenumbers[i] = grid_data[i][0];
            }
            if( -1 == grid_data[i][1])
                solution_puzzle[i] = "";
            else
            solution_puzzle[i] = grid_data[i][1];
                
        }
       
        console.log(puzzlenumbers);
        console.log(lockedboxids);
        console.log(solution_puzzle);
        

}

 // function 
    function initializeCrosswordInstance(){
        var myWrapper= document.getElementById("game_panel");
        myWrapper.innerHTML="";
        for(var i = 0 ; i < 25; i++)
        {
            if(lockedboxids[i]==1)
            {
                var node = document.createElement("div");
                node.className = "box";
                node.id = "box"+i;    
                myWrapper.appendChild(node);
                var textbox = document.createElement("input");
                textbox.className="GridInput";
                textbox.id="GridInput"+i;
                textbox.type = "text";
                textbox.setAttribute("maxlength","1");
                
                if(puzzlenumbers[i]!=0)
                {
                    var text = document.createElement("div");
                    text.className = "minitext";
                    text.id = "minitext"+i;
                    var textnode = document.createElement("span");
                    textnode.innerHTML = ""+puzzlenumbers[i];
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
    function removeElement(elementId) {
        // Removes an element from the document
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }

    function reveal(){
    
        //myWrapper.innerHTML="";
        for(var i = 0 ; i < 25; i++)
        {
            if(solution_puzzle[i])
            {
                removeElement("GridInput"+i)
                var myWrapper= document.getElementById("box"+i);
                var textnode = document.createElement("h1");
                textnode.className = "revealed";
                textnode.innerHTML = ""+solution_puzzle[i];
             
                myWrapper.appendChild(textnode);
            }
        }
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

