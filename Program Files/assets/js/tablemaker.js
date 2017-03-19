function calculado(){
	var expressionVal = document.getElementById('expression').value;
	var initialVal = document.getElementById('initialvalue').value;

	if(expressionVal=="" || initialVal=="")
	{
		alert('wronginput');
	}
	else
	{
		goldenbrownpotato();
		document.getElementById('hiddenyeah').style.opacity = "1";
		document.getElementById('hiddenrow').style.opacity = "1";
		document.getElementById('startbut').style.display = "none";
		document.getElementById('initialvalue').style.display = "none";
		document.getElementById('expression').style.display = "none";

		alternativeNewtonRhapson(expressionVal, initialVal);
	}
}

function goldenbrownpotato(){
	document.getElementById('calculate').style.display = "none";
	document.getElementById('result').style.display = "block";
}
function alternativeNewtonRhapson(expressionV, initialV){

	//------------------------------------------------------------------------
	console.log("----------------------------------------------------------");
	console.log("--      ----      --      -----       ---           ------");
	console.log("--      ----      --        ---        --          -------");
	console.log("--      ----      ----      -        ----  -------  ------");
	console.log("--                -----             -----  -----      ----");
	console.log("--                ------           ------  ------      ---");
	console.log("--                -----           -------  -------      --");
	console.log("--      ----      ----     ---     ------  --------     --");
	console.log("--      ----      ---      ---      -----  -------     ---");
	console.log("--      ----      ---     -----      ----  ------     ----");
	console.log("--      ----      --      -----      ----  ----      -----");
	console.log("--      ----      --     -------      ---           ------");
	console.log("----------------------------------------------------------");
	console.log("==========================================================");
	console.log(" V  E  R  Y  W  E  L  L  M  A  D  E  C  O  N  S  O  L  E  ");
	console.log("==========================================================");
	console.log("     M A D E  B Y :   H  E  X  X  A  B  L  E  Y  D ™      ");
	console.log("==========================================================");
	//------------------------------------------------------------------------

	//----------------------------------------
	//          A  R  R  A  Y  S
	var trueValue = 0;
	var i = 0; // Iteration Number
	var xi = []; // Xi
	var fxi = []; // Function Xi
	var fixi = []; // Derivative of Xi
	var fiixi = []; // Double Derivative of Xi
	var xip1 = []; // Xi + 1
	var ea = []; // Approximate Error
	var et = []; // True Value Error
	var squaredfixi = []; // Square of Xi
	//----------------------------------------

	//-------------------------------------------------------------------------
	//              I  N  I  T  I  A  L    V  A  L  U  E  S
	ea[i-1] = 100.00; //Approximate Error Initial Value
	xi[i] = nerdamer(initialV); //Xi Form

	//  L  O  G  S
	console.log("xi["+i+"] = "+xi[i]+" Type: "+typeof xi[i]);
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//        E  Q  U  A  T  I  O  N  S //  F  O  R  M  U  L  A  S
	var fx = nerdamer(expressionV); //f(x)
	draw(fx);
	var fix = nerdamer.diff(fx, 'x'); //f'(x)

	var string = "(";
	var string2 = ")^2";
	var strfix1 = string.concat(fix);
	var strfix = strfix1.concat(string2); //f'(x)^2
	strfix = nerdamer(strfix);

	var fiix = nerdamer.diff(fix, 'x'); //f''(x)

	//  L  O  G  S
	console.log("f(x)= "+fx+" Type: "+typeof fx);
	console.log("f'(x)= "+fix+" Type: "+typeof fix);
	console.log("(f'(x))^2= "+strfix+" Type: "+typeof strfix);
	console.log("f''(x)= "+fiix+" Type: "+typeof fiix);
	console.log("----------------------------------------");
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//     L  O  O  P    F  O  R    G  E  T  T  I  N  G    V  A  L  U  E
	while(ea[i-1] > 0.0005){

		console.log("Current Iteration: "+i);

		//---------------------------------------------------------------------
		//                       V  A  L  U  E  S
		fxi[i] = parseFloat((parseFloat(nerdamer(fx, {x:xi[i]}).text())).toFixed(5)); //f(x) Value
		fixi[i] = parseFloat((parseFloat(nerdamer(fix, {x:xi[i]}).text())).toFixed(5)); //f'(x) Value
		squaredfixi[i] = parseFloat((parseFloat(nerdamer(strfix, {x:xi[i]}).text())).toFixed(5)); //f'(x)^2 Value
		fiixi[i]= parseFloat((parseFloat(nerdamer(fiix, {x:xi[i]}).text())).toFixed(5)); //f''(x) Value
		
		xip1[i]=(((fxi[i])*(fixi[i]))/((squaredfixi[i])-((fxi[i])*(fiixi[i])))); // (f(Xi))(f'(Xi)) / (f'(Xi)^2) - (f(Xi))(f''(Xi))

		if(isNaN(xip1[i]) || xip1[i] == 0)
		{
			xip1[i] = xi[i]; // Xi - 0
		}
		else
		{
			xip1[i] = xi[i] - xip1[i]; // Xi - (f(Xi))(f'(Xi)) / (f'(Xi)^2) - (f(Xi))(f''(Xi))
		}
		xip1[i] = parseFloat((parseFloat(xip1[i])).toFixed(5));

		//  L  O  G  S
		console.log("xi= "+xi[i]+" Type: "+typeof xi[i]);
		console.log("f(xi) = "+fxi[i]+" Type: "+typeof fxi[i]);
		console.log("f'(xi) = "+fixi[i]+" Type: "+typeof fixi[i]);
		console.log("(f'(xi))^2 = "+squaredfixi[i]+" Type: "+typeof squaredfixi[i]);
		console.log("f''(xi) = "+fiixi[i]+" Type: "+typeof fiixi[i]);
		console.log("xi+1 = "+xip1[i]+" Type: "+typeof xip1[i]);
		//---------------------------------------------------------------------

		//---------------------------------------------------------------------
		//          P  E  R  C  E  N  T  A  G  E    E  R  R  O  R
		//                      A P P R O X I M A T E
		if( i == 0 )
		{
			ea[i] = '---';
		}
		else
		{
			if(xi[i] == 0)
			{
				ea[i] = (xi[i] - xi[i-1])*100;
			}
			else
			{
				ea[i] = ((xi[i] - xi[i-1])/(xi[i]))*100;
			}
			ea[i] = (Math.abs(ea[i])).toFixed(5); // GET ABSOLUTE VALUE OF THE PERCENTAGE ERROR
		}

		//  L  O  G  S
		console.log("Approx Error: "+ea[i]+"% Type: "+typeof ea[i]);
		//---------------------------------------------------------------------

		//---------------------------------------------------------------------
		//                    X i    C  O  U  N  T  E  R
		xi[i+1] = xip1[i];

		//  L  O  G  S
		console.log("new xi: "+xi[i+1]+" Type: "+typeof xi[i+1]);
		//---------------------------------------------------------------------

		//---------------------------------------------------------------------
		//         I  T  E  R  A  T  I  O  N    C  O  U  N  T  E  R
		if(i == 0){
			ea[i] = 100;
		}
		i++;

		//  L  O  G  S
		console.log("new iteration: "+i+" Type: "+typeof i);
		console.log("-------------------------------------------------------");
		//---------------------------------------------------------------------
		// ea[i-1] = 0.25;
	}
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//     T  R  U  E    V  A  L  U  E    C  A  L  C  U  L  A  T  I  O  N
	trueValue = Math.round(xi[i]);
	for(ctr = 0 ; ctr < i ; ctr++)
	{
		if(trueValue == 0)
		{
			et[ctr] = (Math.abs((trueValue-xi[ctr])*100)).toFixed(5);
		}
		else
		{
			et[ctr] = (Math.abs(((trueValue - xi[ctr])/trueValue) * 100)).toFixed(5);
		}

		//  L  O  G  S
		console.log("True Percentage Error for x["+ctr+"] = "+et[ctr]+"%");
		console.log("-------------------------------------------------------");
	}
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//                    C  R  E  A  T  E    T  A  B  L  E
	var tableArray = Create2DArray(100);

	for( v=0 ; v<i ; v++)
	{
		for( q=0 ; q<8 ; q++)
		{
			switch(q)
			{
				case 0: tableArray[v][q] = v; break;
				case 1: tableArray[v][q] = xi[v]; break;
				case 2: tableArray[v][q] = fxi[v]; break;
				case 3: tableArray[v][q] = fixi[v]; break;
				case 4: tableArray[v][q] = fiixi[v]; break;
				case 5: tableArray[v][q] = xip1[v]; break;
				case 6: if(v==0){ tableArray[v][q] = '---%'; } else{ tableArray[v][q] = ea[v]+"%"; } break;
				case 7: tableArray[v][q] = et[v]+"%"; break;
			}
		}
	}
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//             C  R  E  A  T  E    T  H  E    T  A  B  L  E
	$('#tb').ready(     
        function() {
           var theTable = "";
          for(var j=0;j<i;j++){
              theTable += '<tr>';
              for(var k=0;k<8;k++){             
                theTable += '<td>'+tableArray[j][k]+'</td>';
              }
              theTable += '</tr>';
          }
           $('#tb').append(theTable);
        });
    //------------------------------------------------------------------------- 

    //-------------------------------------------------------------------------
    //           C  R  E  A  T  E    T  H  E    L  A  B  E  L  S
    $('#fxlabel').ready(
    	function(){
    		var theFx = fx.text();
    		$('#fxlabel').append(theFx);
    	});

    $('#fixlabel').ready(
    	function(){
    		var theFix = fix.text();
    		$('#fixlabel').append(theFix);
    	});

    $('#fiixlabel').ready(
    	function(){
    		var theFiix = fiix.text();
    		$('#fiixlabel').append(theFiix);
    	});

    $('#xilabel').ready(
    	function(){
    		var theXi = xi[0].text();
    		$('#xilabel').append(theXi);
    	});
    $('#truelabel').ready(
    	function(){
    		var theTrue = trueValue;
    		$('#truelabel').append(theTrue);
    	});
    //--------------------------------------------------------------------------

}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function draw(expression) {
	try {
	  functionPlot({
	    target: '#plot',
	    data: [{
	      fn: expression.toString(),
	      sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
	      graphType: 'polyline'
	    }]
	  });
	}
	catch (err) {
	  console.log(err);
	  alert(err);
	}
}