
//retrive data of saved students from local storage if any
const getSavedStudentInfo = () => {
    const studentsJSON = localStorage.getItem('students')

    try {
        return studentsJSON ? JSON.parse(studentsJSON) : []
    } catch (e) {
        return []
    }
}

//saving student infomation to local storage
const saveStudents = (students) => {
    localStorage.setItem('students', JSON.stringify(students))
}

//this is the retrieved array of objects of students
let students = getSavedStudentInfo()


$(function(){
    let renderStudentDOM = (student)=>{
        let tableRow = $('<tr>' , {class: 'tableRow'});
            $('.display-area').append(tableRow);
            
            let studentId = $(`<td>${student.id}</td>`);
            let studentFirstName = $(`<td>${student.firstName}</td>`);
            let studentLastName = $(`<td>${student.lastName}</td>`);
            let studentEmail = $(`<td>${student.email}</td>`);
            let studentAge = $(`<td>${student.age}</td>`);
        
            $(tableRow).append(studentId, studentFirstName, studentLastName, studentEmail, studentAge);
        
    };
    for(let student of students){
        renderStudentDOM(student)
    };

    let firstNameInput = $('#firstN');
    let lastNameInput = $('#lastN');
    let emailInput = $('#email');
    let ageInput = $('#age');

    $('.submitBtn').click((e)=>{
        e.preventDefault();

        if(firstNameInput.val()=== '' || lastNameInput.val()=== '' || emailInput.val()==='' || ageInput.val() === ''){
            alert("Fill out all fields");
        } else {
            const studentItem = (
                {
                    id: students.length + 1,
                    firstName: firstNameInput.val(),
                    lastName: lastNameInput.val(),
                    email: emailInput.val(),
                    age: ageInput.val()
                }
            );
            students.push(studentItem);
            saveStudents(students);
            renderStudentDOM(studentItem);
    
            firstNameInput.val('');
            lastNameInput.val('');
            emailInput.val('');
            ageInput.val('')
        } 
    })
        
});

