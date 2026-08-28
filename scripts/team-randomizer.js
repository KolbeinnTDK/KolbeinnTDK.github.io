const competitors = [];

const shuffle = (arr) => {
    let arrClone = arr.map((x) => x);
    var j, x, i;
    for (i = arrClone.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arrClone[i];
        arrClone[i] = arrClone[j];
        arrClone[j] = x;
    }
    return arrClone;
};


const addCompetitor = () => {
    const name = document.getElementById("competitor-name").value;

    if (name !== "" && !competitors.includes(name)) {

        document.getElementById("competitor-name").value = "";

        const list = document.getElementById("competitors-list");

        competitors.push(name);

        const li = document.createElement("li");
        li.innerText = name;

        li.onclick = function delCompetitor() {
            for( var i = 0; i < competitors.length; i++){ 
                                   
                if ( competitors[i] === name) { 
                    competitors.splice(i, 1); 
                    i--; 
                }
            }
            list.removeChild(li);
        };

        list.appendChild(li);
    };
};


document.getElementById("add").addEventListener("click", (e) => {  
    addCompetitor();
});


document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addCompetitor();
    };
});



const clean = () => {
    const teamList = document.getElementById("team-list");

    teamList.innerHTML = ""
};

document.getElementById("randomize").addEventListener("click", (e) => {  
    clean();
    let teamSize = 0;

    if (document.getElementById("team-size").value != "") {
        teamSize = document.getElementById("team-size").value;
    }

    if (teamSize > 0) {
        const numLobbies = Math.ceil(competitors.length / teamSize);
        let numCompetitorsPerTeam = Math.ceil(competitors.length / numLobbies);

        let randomized = shuffle(competitors);

        let teams = {};

        let lobbiesLeft = numLobbies;

        for (let i = 0; i < numLobbies; i++) {
            const team = [];
            for (let j = 0; j < numCompetitorsPerTeam; j++) {
                if (randomized.length != 0) {
                    const competitor = randomized.pop();
                    team.push(competitor);
                }
            }
            const num = i+1;

            teams["Team " + num] = team;

            lobbiesLeft -= 1;
            if (randomized.length >= teamSize) {
                numCompetitorsPerTeam = Math.ceil(randomized.length / lobbiesLeft);
            }
        }

        const teamList = document.getElementById("team-list");

        Object.entries(teams).forEach(([key, val]) => {
            const ul = document.createElement("ul");
            ul.innerText = key;
            ul.id = key;
            teamList.appendChild(ul);

            const randomizedTeams = document.getElementById(key);

            val.forEach(elem => {
                const il = document.createElement("li");
                il.innerText = elem;
                randomizedTeams.appendChild(il);
            });
        });
    };
});