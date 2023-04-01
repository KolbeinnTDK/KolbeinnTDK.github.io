let competitors = [];

shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


document.getElementById("add").addEventListener("click", (e) => {  
    const name = document.getElementById("competitorName").value;

    const list = document.getElementById("competitorsList");

    competitors.push(name);

    const li = document.createElement("li");
    li.innerText = name;
    list.appendChild(li);
});


document.getElementById("randomize").addEventListener("click", (e) => {  

    const lobbySize = 6

    let numLobbies = Math.ceil(competitors.length / lobbySize)
    const numCompetitorsPerLobby = Math.ceil(competitors.length / numLobbies)

    competitors = shuffle(competitors);

    var groups = {};
    console.log(competitors.length)

    for (let i = 0; i < numLobbies; i++) {
        const group = [];

        for (let j = 0; j < numCompetitorsPerLobby; j++) {
            if (competitors != []) {
                const competitor = competitors.pop();
                group.push(competitor)
            }
        }
        const num = i+1;

        groups["Group " + num] = group;
        console.log("AAA"+groups["Group " + i+1]);

        if (competitors.length > lobbySize) {
            numLobbies -= 1;
            numCompetitorsPerLobby = Math.ceil(competitors.length / numLobbie);
        }
    }

    const groupList = document.getElementById("groupsList");

    Object.entries(groups).forEach(([key, val]) => {
        const ul = document.createElement("ul");
        ul.innerText = key;
        ul.id = key;
        groupList.appendChild(ul);

        const randomizedGroups = document.getElementById(key);

        console.log("val: "+val.length);

        val.forEach(elem => {
            console.log(elem)
            const il = document.createElement("li");
            il.innerText = elem;
            randomizedGroups.appendChild(il);
        });
    }); 
});