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
    const name = document.getElementById("competitorName").value;

    if (name !== "") {

        document.getElementById("competitorName").value = "";

        const list = document.getElementById("competitorsList");

        competitors.push(name);

        const li = document.createElement("li");
        li.innerText = name;
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
    const groupList = document.getElementById("groupsList");

    groupList.innerHTML = ""
};

document.getElementById("randomize").addEventListener("click", (e) => {  
    clean();
    console.log(competitors);

    const lobbySize = 6;

    const numLobbies = Math.ceil(competitors.length / lobbySize);
    let numCompetitorsPerLobby = Math.ceil(competitors.length / numLobbies);

    let randomized = shuffle(competitors);

    let groups = {};

    let lobbiesLeft = numLobbies;

    for (let i = 0; i < numLobbies; i++) {
        const group = [];
        for (let j = 0; j < numCompetitorsPerLobby; j++) {
            if (randomized.length != 0) {
                const competitor = randomized.pop();
                group.push(competitor);
            }
        }
        const num = i+1;

        groups["Group " + num] = group;

        lobbiesLeft -= 1;
        if (randomized.length >= lobbySize) {
            console.log(lobbiesLeft + "    " +randomized.length +"   "+ randomized.length / lobbiesLeft)
            numCompetitorsPerLobby = Math.ceil(randomized.length / lobbiesLeft);
        }
    }

    const groupList = document.getElementById("groupsList");

    Object.entries(groups).forEach(([key, val]) => {
        const ul = document.createElement("ul");
        ul.innerText = key;
        ul.id = key;
        groupList.appendChild(ul);

        const randomizedGroups = document.getElementById(key);

        val.forEach(elem => {
            const il = document.createElement("li");
            il.innerText = elem;
            randomizedGroups.appendChild(il);
        });
    }); 
});