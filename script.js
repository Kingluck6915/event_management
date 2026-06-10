let events = [

{
    name:"Web Development Workshop",
    date:"2026-07-10",
    description:"Learn HTML CSS and JavaScript"
},

{
    name:"AI Seminar",
    date:"2026-08-05",
    description:"Introduction to Artificial Intelligence"
},

{
    name:"Past Conference",
    date:"2025-01-10",
    description:"Completed Event"
}

];

const eventList =
document.getElementById("eventList");

const eventForm =
document.getElementById("eventForm");

const warning =
document.getElementById("warning");

const searchInput =
document.getElementById("searchInput");

function displayEvents(data){

    eventList.innerHTML = "";

    data.forEach((event,index)=>{

        const today =
        new Date().toISOString().split("T")[0];

        const card =
        document.createElement("div");

        card.classList.add("event-card");

        if(event.date < today){
            card.classList.add("past");
        }
        else{
            card.classList.add("upcoming");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong>
            ${event.date}</p>

            <p>${event.description}</p>

            <button
            class="delete-btn"
            onclick="deleteEvent(${index})">
            Delete
            </button>
        `;

        eventList.appendChild(card);
    });

}

displayEvents(events);

eventForm.addEventListener("submit",
function(e){

    e.preventDefault();

    const name =
    document.getElementById("eventName").value;

    const date =
    document.getElementById("eventDate").value;

    const description =
    document.getElementById("eventDescription").value;

    if(
        name === "" ||
        date === "" ||
        description === ""
    ){
        warning.innerText =
        "Please fill all fields.";
        return;
    }

    warning.innerText = "";

    events.push({
        name:name,
        date:date,
        description:description
    });

    events.sort(
        (a,b)=>
        new Date(a.date) -
        new Date(b.date)
    );

    displayEvents(events);

    eventForm.reset();

});

function deleteEvent(index){

    events.splice(index,1);

    displayEvents(events);

}

searchInput.addEventListener("keyup",
function(){

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    events.filter(event =>

        event.name.toLowerCase()
        .includes(value)

        ||

        event.date.includes(value)

    );

    displayEvents(filtered);

});