const courses = [ 
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const courseList = document.getElementById("course-list");
const totalCredits = document.getElementById("total-credits");
const allBtn = document.getElementById("all-btn");
const cseBtn = document.getElementById("cse-btn");
const wddBtn = document.getElementById("wdd-btn");

function displayCourses(filter = "ALL") {
    courseList.innerHTML = "";
    let filteredCourses = courses;
    if (filter !== "ALL") {
        filteredCourses = courses.filter(course => course.subject === filter);
    }
    
    let creditSum = 0;
    filteredCourses.forEach(course => {
        creditSum += course.credits;
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-card");
        courseItem.innerHTML = `
            <h3>${course.title} (${course.subject} ${course.number})</h3>
            <p>Credits: ${course.credits}</p>
            <p class="${course.completed ? 'completed' : 'pending'}">
                ${course.completed ? '✔ Completed' : '⏭In Progress'}
            </p>
        `;
        courseList.appendChild(courseItem);
    });
    totalCredits.textContent = `Total Credits: ${creditSum}`;
}

document.addEventListener("DOMContentLoaded", () => {
    displayCourses();

    allBtn.addEventListener("click", () => displayCourses("ALL"));
    cseBtn.addEventListener("click", () => displayCourses("CSE"));
    wddBtn.addEventListener("click", () => displayCourses("WDD"));
});

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById("currentyear").textContent = currentYear;
    document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;
});