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