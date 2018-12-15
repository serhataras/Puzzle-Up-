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
var result_data = [];
var Author;
var publishDate;
var crossword_JSON;
var fullResultPath="";
var wordPoints = [];
var wordLength = [];
var textfieldResult = [];
//done
function setPathandLoadJSON(){

    date = document.getElementById("datetimepickerID");
    //console.log(date.value);
//
    fullPath=pathPreFix.concat(date.value,pathPostFix);

    setTimeout(function (){  
    // Something you want delayed.
    loadJSON(function(json) {
        //console.log(json); // this will log out the json object
        crossword_JSON=json;

        grid_data = crossword_JSON.grid;
        clues =  crossword_JSON.clues;
        date = crossword_JSON.date;
        title = crossword_JSON.title;
        clueNumbers = crossword_JSON.clueNumbers;
        
       // console.log(grid_data);
        //console.log(date);
        //console.log(title);

        
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

        //console.log(accross_clues_numbers);
        //console.log(accross_clues);
        //console.log(down_clues_numbers);
        //console.log(down_clues);
        parseJSON();
        initializeCrosswordInstance();
        initClues(accross_clues_numbers,accross_clues,down_clues_numbers, down_clues);
        }); 
    }, 200);
}

//done
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

//done
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
        //console.log(puzzlenumbers);
        //console.log(lockedboxids);
        //console.log(solution_puzzle);
    }

//done
    function reset(){
        setPathandLoadJSON();
        var result_wrapvarper = document.getElementById("result_AI");
        result_wrapvarper.innerHTML = "";
    }

//done
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
    
//done
    function removeElement(elementId) {
        // Removes an element from the document
        var element = document.getElementById(elementId);
        
        element.parentNode.removeChild(element);
    }
    
//done
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

//done
    function initClues(accross_clues_numbers,accross_clues,down_clues_numbers, down_clues)
    {
        var clues = document.getElementById("clue_panel");

        var accross_col = document.getElementById("acrossClue");
        var down_col = document.getElementById("downClue");

        accross_col.className = "cluescol";
        down_col.className = "cluescol";
        
        down_col.innerHTML="";
        accross_col.innerHTML="";
        
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

//done
    function loadResultJSON(callback) {   
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', fullResultPath, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
            }
        };

        xobj.send(null);  
    }
   
//done
    function getAIResult(){
          
        date = document.getElementById("datetimepickerID");
        fullResultPath=pathPreFix.concat(date.value,"-Result");
        fullResultPath= fullResultPath.concat(pathPostFix);
       //console.log(fullResultPath);
        setTimeout(function (){  
        // Something you want delayed.
            loadResultJSON(function(json) {
                result_data = json.result;
                //console.log(result_data);
                loadResult();    
                }); 
        }, 200);
        
      
            
           
      
    }    
//done
    function displayAIResult(){
        setTimeout(function (){  
            for(var i = 0 ; i < 25; i++)
            {
                if(result_data[i])
                {
                    removeElement("GridInput"+i)
                    var myWrapper= document.getElementById("box"+i);
                    var textnode = document.createElement("h1");
                    textnode.className = "revealed";
                    textnode.innerHTML = ""+result_data[i];
                    
                    myWrapper.appendChild(textnode);
                }
            }
            }, 100);
    }
//done
    function loadResult(){

        //myWrapper.innerHTML="";
        for(var i = 0 ; i < 25; i++)
        {
            if(result_data[i])
            {
                removeElement("GridInput"+i)
                var myWrapper= document.getElementById("box"+i);
                
                var textnode = document.createElement("h1");
                textnode.className = "revealed";
                textnode.innerHTML = ""+result_data[i];
                
                myWrapper.appendChild(textnode);
            }
        }
    }

//done
    function getInputs(){
        
        for(var i = 0 ; i < 25; i++){  
            if(document.getElementById("GridInput"+i)!=null)
                textfieldResult[i] = document.getElementById("GridInput"+i).value.toUpperCase();
        }

        
        //  console.log(textfieldResult);
    }

//done
     function createWordIndexes(){

        var rowMax = 25;    
        for(var wordCount = 0 ; wordCount < 10; wordCount++){  
            coordinates = []; 
            
            if(wordCount<5){
            //across
            index = puzzlenumbers.indexOf(""+down_clues_numbers[wordCount])
         
            while(index<rowMax){
                coordinates.push(index);
                index = index + 5;
               
                
                }
             }
            else{   
            index = puzzlenumbers.indexOf(""+accross_clues_numbers[wordCount%5]);
            var row = Math.floor(index/5);
            maxColumnForIndex = (row*5)+4; 
            coordinates.push(index);
    
            while(index<maxColumnForIndex){
                index = index + 1;
                coordinates.push(index);
                }
             }
             wordLength[wordCount] = coordinates.length;
             wordPoints[wordCount] = coordinates;

        }
            ///console.log(wordPoints);
            //console.log(wordLength);
           //getInputs();
    }
    
//done **   
    function playAI(){
       var wrongCount = [];
       var wrong  = 0;
   
       createWordIndexes(); 
       getAIResult();
       displayAIResult();
       textfieldResult=result_data;

        for(var i = 0 ; i < 10; i++){  

            for(var j = 0; j< wordLength[i] ; j++){
                

                if((result_data[wordPoints[i][j]][0]) != solution_puzzle[wordPoints[i][j]]){
                    wrongCount[i] = 1;
                    index  = wordPoints[i][j] ;
                    document.getElementById("box"+(index)).className = "box_wrong";
                }

            }    
            if( wrongCount[i] == 1)
                wrong++;
        }
        
        prob = (10-wrong)*10;

        var result_wrapvarper = document.getElementById("result_AI");
        result_wrapvarper.innerHTML = "";
        var textnode = document.createElement("h5");
        textnode.className="";
        textnode.innerHTML = "The Crossword Solving Model has accuracy of : "+prob + "% !";
        result_wrapvarper.append(textnode);
       
        
    }
    
//done **   
    function playPlayer(){
        createWordIndexes(); 
        getInputs();
           // This function will play the puzzle by checking the answers and comparing them to the result in the crawled json.
          
            for(var i = 0 ; i <25; i++){  
                if(textfieldResult[i]!=""){
                    if(textfieldResult[i] != solution_puzzle[i]){
                        if(document.getElementById("box"+i)!=null)
                            document.getElementById("box"+i).className = "box_wrong";
                    }
                    else{
                        if(document.getElementById("box"+i)!=null)
                            document.getElementById("box"+i).className = "box_correct";
                    }
                }
            }
        
         
         //console.log(wordPoints);
         //console.log(wordLength);
    }