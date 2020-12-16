//this is the retrieved array of objects of students
// let students = getSavedStudentInfo()

let students = []

$(function(){
    let renderStudentDOM = (student)=>{
        let tableRow = $('<tr>' , {class: 'tableRow'});
            $('.display-area').append(tableRow);
            
            let studentId = $(`<td>${student._id}</td>`);
            let studentFirstName = $(`<td>${student.firstName}</td>`);
            let studentLastName = $(`<td>${student.lastName}</td>`);
            let studentEmail = $(`<td>${student.email}</td>`);
            let studentAge = $(`<td>${student.age}</td>`);
        
            $(tableRow).append(studentId, studentFirstName, studentLastName, studentEmail, studentAge);
        
    };
    //retrive data of saved students from database
    const getSavedStudentInfo = async () => {
        const response = await fetch("http://localhost:8081/students");
        const students = await response.json();
        students.forEach((student)=>{
            renderStudentDOM(student)
        });
    }
    getSavedStudentInfo();
    // for(let student of students){
    //     renderStudentDOM(student)
    // };

    let firstNameInput = $('#firstN');
    let lastNameInput = $('#lastN');
    let emailInput = $('#email');
    let ageInput = $('#age');

    $('.submitBtn').click( async (e)=>{
        e.preventDefault();
        
        if(firstNameInput.val()=== '' || lastNameInput.val()=== '' || emailInput.val()==='' || ageInput.val() === ''){
            alert("Fill out all fields");
        } else {
            const studentItem = (
                {
                    firstName: firstNameInput.val(),
                    lastName: lastNameInput.val(),
                    email: emailInput.val(),
                    age: ageInput.val()
                }
            );
            const response = await fetch("http://localhost:8081/students", {
                method: "POST",
                body: JSON.stringify(studentItem),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const student = await response.json();
    
            // students.push(studentItem);
            // saveStudents(students);
            renderStudentDOM(student);
    
            firstNameInput.val('');
            lastNameInput.val('');
            emailInput.val('');
            ageInput.val('')
        };
        
        
    })
        
});

