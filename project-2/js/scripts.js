window.onload= function(){
  document.getElementById('table').style.visibility = "hidden";
  document.getElementById('analysis').style.visibility = "hidden";
}

function processForm(){
  //get user input from form

  var txt_feet = document.getElementById('feet');
  var txt_inches = document.getElementById('inches');
  var txt_weight = document.getElementById('weight');
  var txt_name = document.getElementById('name');
  var txt_age = document.getElementById('age');

  //parse all text to integers
  var feet = parseTextToInt(txt_feet);
  var inches = parseTextToInt(txt_inches);
  var weight = parseTextToInt(txt_weight);

  //convert height to inches
  var height = calculateHeight(feet, inches);

  //calculate BMI
  var BMI = BMICalc(height, weight);

  //analyze BMI
  var bmiEval = analyzeBMI(BMI);

  //create report and show table
  document.getElementById('table').style.visibility = "visible";
  document.getElementById('analysis').style.visibility = "visible";
  var report = [["Name", txt_name.value],
                ["Age", txt_age.value + " [yrs]"],
                ["Height", height + " [in]"],
                ["Weight", weight + " [lbs]"],
                ["BMI", BMI.toFixed(1)]],
  //print report
  table = document.getElementById('table');
  for(var i = 0; i < table.rows.length; i++)
  {
      for(var j = 0; j < table.rows[i].cells.length; j++)
      {
        table.rows[i].cells[j].innerHTML = report[i][j];
      }
  }

  //display evaluation
  evalEl = document.getElementById('analysis');
  evalEl.innerHTML = bmiEval;
}

function parseTextToInt(input){
  aValue = parseInt(input.value);
  return aValue;
}

function calculateHeight(feet, inches){
  //calculate
  height = (feet*12) + inches;
  return height;
}

function BMICalc(height, weight){
    var BMI = (weight/(height*height)) * 703;
    return BMI;
}

function analyzeBMI(BMI){
  var preamble = "Your body mass index indicates that you may be "
  var eval;
  var postamble = ".\nPlease consult with a doctor if you have any further questions."
  if(BMI < 18.5)
  {
    eval = "underweight";
  }
  else if (BMI < 25)
  {
    eval = "at an ideal weight";
  }
  else if (BMI < 30)
  {
    eval = "overweight";
  }
  else if (BMI > 30)
  {
    eval = "obese";
  }
  return preamble + eval + postamble;
}
