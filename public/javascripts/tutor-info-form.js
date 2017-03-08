wiseApp.tutorInfoForm = {
  addCourse : function() {
    //<input id='courseField' class='form-control' type='text' placeholder='Courses'/>
    var coursesForm     = document.getElementById('coursesForm'),
        newTextField    = document.createElement('input'),
        newTextFieldDiv = document.createElement('div');
        lineBreak       = document.createElement('br');

    // Insert text inside an element
    newTextField.name = "courses[]";
    newTextField.type = "text";
    newTextField.class= "form-control";
    newTextField.id   = "courseField";
    newTextFieldDiv.appendChild(newTextField);
    newTextFieldDiv.appendChild(lineBreak);
    coursesForm.appendChild(newTextFieldDiv);
    newTextField.focus();

    // returning false because onClick directive inside a form will refresh the page
    return false;
  }
}
