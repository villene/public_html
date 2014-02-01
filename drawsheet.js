window.onload = mainfunction;

function mainfunction(){
    
    document.getElementById("drawbutton").onclick = function(){
    var canvas=document.getElementById("graph");
    var ctx=canvas.getContext("2d");
    
    grapwt=canvas.width-50;
    grapht=canvas.height-40;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(grapwt,grapht);
    ctx.lineTo(40,grapht);
    ctx.lineTo(40,40);    
    ctx.lineWidth = 3;    
    ctx.stroke();
    
    for (var i=40; i<grapwt; i+=40)
        {
            ctx.moveTo(i,grapht-5);
            ctx.lineTo(i,grapht+5);            
        }    
        
    for (var i=60; i<grapht; i+=20)
        {
            ctx.moveTo(35,i);
            ctx.lineTo(grapwt,i);            
        }
    ctx.lineWidth = 1;    
    ctx.stroke();    
    
    XMLdraw(ctx, grapwt, grapht);
};
}
function XMLdraw(ctx, grapwt, grapht){        
        
    xmlhttp=new XMLHttpRequest();  
    xmlhttp.open("GET","Echigo-Jishi.xml",false); //būtu kruta iespēja izvēlēties failu
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;

    var steplist = xmlDoc.getElementsByTagName("step"); 
    var octlist = xmlDoc.getElementsByTagName("octave");
    ctx.lineWidth=3;
    ctx.font="12px Arial";  
    
    for(var i=0; i<steplist.length; i++)
        {
    var step = steplist[i].childNodes[0].nodeValue;
    var oct = octlist[i].childNodes[0].nodeValue;
    switch (step)
    {
        case 'C': note=7*oct+1; break;
        case 'D': note=7*oct+2; break;
        case 'E': note=7*oct+3; break;
        case 'F': note=7*oct+4; break;
        case 'G': note=7*oct+5; break;
        case 'A': note=7*oct+6; break;
        case 'B': note=7*oct+7; break;
    }
    ctx.beginPath();
    ctx.arc(80+40*i,grapht-(note*10)-10,10,0,2*Math.PI);
    var freq=notefreq(oct, step);
    ctx.fillText(freq, 66+40*i, grapht-(note*10)+18);
    var fullnote=freqnote(freq);
    ctx.fillText(fullnote, 66+40*i, grapht-(note*10)+30);
    ctx.stroke();    
        }    
}

function notefreq(oct, step){
    var freq;
    switch (step)
    {
        case 'C': step=oct*12+1; break;
        case 'D': step=oct*12+3; break;
        case 'E': step=oct*12+5; break;
        case 'F': step=oct*12+6; break;
        case 'G': step=oct*12+8; break;
        case 'A': step=oct*12+10; break;
        case 'B': step=oct*12+12; break;
    }   
    
        if (step===58) freq=440;
        else{ step-=58; freq=440*Math.pow(1.059463, step);}        
   
    return freq.toFixed(2);
}

function freqnote(freq){
    
    var note;
    var oct;
    var step;
    var diff=12*Math.log(freq/440)/Math.log(2);
    diff=Math.round(diff);
    
    note=58+diff;
    oct=Math.floor(note/12);
    note%=12;

    switch(note)
    {
        case 1: {step='C'; break;}
        case 2: {step='C♯/D♭'; break;}
        case 3: {step='D'; break;}
        case 4: {step='D♯/E♭'; break;}
        case 5: {step='E'; break;}
        case 6: {step='F'; break;}
        case 7: {step='F♯/G♭'; break;}
        case 8: {step='G'; break;}
        case 9: {step='G♯/A♭'; break;}
        case 10: {step='A'; break;}
        case 11: {step='A♯/B♭'; break;}
        case 0: {step='B'; oct--; break;}
    }
    return step+oct;
}

function frequencyFromNoteNumber( note ) {
    return 440 * Math.pow(2,(note-69)/12);
}