// store all issues and later filter all issues 
let allIssues = []; 

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("loadingSpinner");
const totalIssues = document.getElementById("totalIssues");


//loading issues from API
const loadIssues = async () => {

    // show spinner
    spinner.classList.remove("hidden");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

    const data = await res.json();

    // store issues
    allIssues = data.data;

    // show all issues
    displayIssues(allIssues);

    // hide spinner
    spinner.classList.add("hidden");
};



// display issues on UI
const displayIssues = (issues) => {

    // clear container
    container.innerHTML = "";

    // update issue counter
    totalIssues.innerText = issues.length;

    issues.forEach(issue => {

        // dynamic border color
        const borderColor =
            issue.status === "open"
            ? "border-green-500"
            : "border-purple-500";

        // dynamic status icon
        const statusIcon =
    issue.status.toLowerCase() === "open"
    ? "./assets/Open-Status.png"
    : "./assets/Closed-Status.png";

        const card = document.createElement("div");

        card.className =
        `bg-white rounded-xl shadow border-t-4 ${borderColor} p-5 cursor-pointer hover:shadow-lg transition flex flex-col`;

        card.innerHTML = `

        <div class="flex justify-between items-center mb-3">

            <div class="w-10 h-10 bg-purple-100 rounded-full flex justify-center items-center">
                <img src="${statusIcon}" class="w-5 h-5">
            </div>

            <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">
                ${issue.priority}
            </span>

        </div>

        <h3 class="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 min-h-14">
            ${issue.title}
        </h3>

        <p class="text-gray-500 text-sm mb-4 line-clamp-3 min-h-[60px]">
            ${issue.description}
        </p>

        <div class="flex gap-2 mb-4">
            ${issue.labels.map(label => `
                <span class="border border-yellow-400 text-yellow-600 px-3 py-1 rounded-full text-xs">
                    ${label}
                </span>
            `).join("")}
        </div>

        <div class="border-t pt-3 text-sm text-gray-500 mt-auto">

            <p>#${issue.id} by ${issue.author}</p>

            <p>${issue.createdAt}</p>

        </div>
        `;

        // modal open
        card.addEventListener("click", () => {
            openModal(issue);
        });

        container.appendChild(card);

    });

};







//step3.style on active tab
const setActiveTab = (activeId) => {

    const buttons = ["tabAll","tabOpen","tabClosed"];

    buttons.forEach(id => {

        const btn = document.getElementById(id);

        btn.classList.remove("bg-purple-600","text-white");

        btn.classList.add("text-[#64748B]","border","border-gray-200");

    });

    const activeBtn = document.getElementById(activeId);

    activeBtn.classList.add("bg-purple-600","text-white");

    activeBtn.classList.remove("border","border-gray-200","text-[#64748B]");
};



//step 3a. showing all issues on tab All and set active tabs
const showAllIssues = () => {

    displayIssues(allIssues);

    setActiveTab("tabAll");

};



//step 3b. showing open issues on tab Open and set active tabs
const showOpenIssues = () => {

    const openIssues =
        allIssues.filter(issue => issue.status === "open");

    displayIssues(openIssues);

    setActiveTab("tabOpen");

};



// step 3c. showing closed issues on tab Closed and set active tabs
const showClosedIssues = () => {

    const closedIssues =
        allIssues.filter(issue => issue.status === "closed");

    displayIssues(closedIssues);

    setActiveTab("tabClosed");

};



//step 4. adding event and showing specific issues by clicking each tab
document.getElementById("tabAll").addEventListener("click", showAllIssues);

document.getElementById("tabOpen").addEventListener("click", showOpenIssues);

document.getElementById("tabClosed").addEventListener("click", showClosedIssues);


// running page load
loadIssues();