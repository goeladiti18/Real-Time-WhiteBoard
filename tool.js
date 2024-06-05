let toolArray=document.querySelectorAll(".tool");
let canvas=document.querySelector(".board");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  
 let tool=canvas.getContext("2d");
 let toolHeight=document.querySelector(".tools");
 let occupiedHeight = toolHeight.offsetHeight;



let currTool="pencil";
for(let i=0;i<toolArray.length;i++){
    let id=toolArray[i].id;

    if(id=="pencil"){
        
        toolArray[i].addEventListener("click",function(){
            currTool="pencil";
            console.log(currTool+" is clicked");
           
            tool.strokeStyle="red";
            tool.lineWidth = 10;

        });

    }else if(id=="eraser"){
        toolArray[i].addEventListener("click",function(){
            currTool="eraser";
            console.log(currTool+" is clicked");
           
            tool.strokeStyle="white";
            tool.lineWidth = 20;

        });

    }else if(id=="sticky"){
        toolArray[i].addEventListener("click",function(){
            currTool="sticky";
            console.log(currTool+" is clicked");
           
           createSticky();

        });

    }else if(id=="upload"){
        toolArray[i].addEventListener("click",function(){
            currTool="upload";
            console.log(currTool+" is clicked");
           
           uploadPicture();

        });

    }else if(id=="download"){
        toolArray[i].addEventListener("click",function(){
            currTool="download";
            console.log(currTool+" is clicked");
           
           downloadTemplate();

        });
        
    }else if(id=="undo"){
        toolArray[i].addEventListener("click",function(){
            currTool="undo";
            console.log(currTool+" is clicked");
           
           undoFN();

        });
        
    }else if(id=="redo"){
        toolArray[i].addEventListener("click",function(){
            currTool="redo";
            console.log(currTool+" is clicked");
           
           redoFN();

        });
        
    }

}


/*****pencil*******/
let pencilInDrawMode=false;
let undoStack=[];
let redoStack=[];


canvas.addEventListener("mousedown",function(e){
    let sx=e.clientX;
    let sy=e.clientY-occupiedHeight;
    tool.beginPath();
    tool.moveTo(sx,sy);
    pencilInDrawMode=true;
    //tool.strokeStyle="white";

    let ptdesc={
        x:sx,
        y:sy,
        desc:"md"
    }
    undoStack.push(ptdesc);

});

canvas.addEventListener("mousemove",function(e){
    if(pencilInDrawMode==false)
        return;
    let ex=e.clientX;
    let ey=e.clientY-occupiedHeight;
    tool.lineTo(ex,ey);
    tool.stroke();

    let ptdesc={
        x:ex,
        y:ey,
        desc:"mm"
    }
    undoStack.push(ptdesc);
});
canvas.addEventListener("mouseup",function(e){
    pencilInDrawMode=false;
});


/****sticky******* */
{/* <div class="sticky">
<div class="nav">
    <div class="close">X</div>
</div>
    <textarea class="textarea">ahajnaj</textarea>

</div> */}

function createSticky(){
    let sticky=document.createElement("div");
    let nav=document.createElement("div");
    let close=document.createElement("div");
    let text=document.createElement("textarea");
    sticky.setAttribute("class","sticky");
    nav.setAttribute("class","nav");
    text.setAttribute("class","textarea");
    nav.innerText="X";
    sticky.appendChild(nav);
    nav.appendChild(close);
    sticky.appendChild(text);
    document.body.appendChild(sticky);

    let cross=nav.innerText;
    nav.addEventListener("click",function(){
        text.remove();
        nav.remove();
    });

}


/*******upload picture**** */
let element=document.querySelector(".upload");

function uploadPicture(){
    //file opening thing
    element.click();
    //get that file
    element.addEventListener("change",function(){
        let file=element.files[0];
    
    //create an image element
    let img=document.createElement("img");
    //converted the uploaded file into URL format
    let url=URL.createObjectURL(file);
    //add image into that element using URL
    img.src=url;
    document.body.appendChild(img);

})


}


/*download****************/

function downloadTemplate(){

    let a=document.createElement("a");
    a.download="file.png";

    //convert board to url
    let url =canvas.toDataURL("image/jpeg;base64");

    a.href=url;
    a.click();
    a.remove();

}

function undoFN(){
    //clear everything
  tool.clearRect(0,0,canvas.width,canvas.height); 
  if(undoStack.length>0){
    redoStack.push(undoStack.pop());
for(let i=0;i<undoStack.length;i++){
    let{x,y,desc}=undoStack[i];
    if(desc=="md"){
      tool.beginPath();
      tool.moveTo(x,y);
    }else {
tool.lineTo(x,y);
tool.stroke();
    }
}
    
  } 
}


function redoFN(){
    //clear everything
  tool.clearRect(0,0,canvas.width,canvas.height); 
  if(undoStack.length>0){
    undoStack.push(redoStack.pop());
for(let i=0;i<undoStack.length;i++){
    let{x,y,desc}=undoStack[i];
    if(desc=="md"){
      tool.beginPath();
      tool.moveTo(x,y);
    }else {
tool.lineTo(x,y);
tool.stroke();
    }
}
    
  } 
}