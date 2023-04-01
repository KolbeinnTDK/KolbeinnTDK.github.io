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

    const numLobbies = Math.ceil(competitors.length / lobbySize)
    let numCompetitorsPerLobby = Math.ceil(competitors.length / numLobbies)

    competitors = shuffle(competitors);
    competitors = [0,1,2,3,4,5,6,7,8,9,10,11,12]

    var groups = {};

    for (let i = 0; i < numLobbies; i++) {
        const group = [];
        let lobbiesLeft = numLobbies;

        for (let j = 0; j < numCompetitorsPerLobby; j++) {
            if (competitors.length != 0) {
                console.log(numCompetitorsPerLobby)
                const competitor = competitors.pop();
                group.push(competitor)
            }
        }
        const num = i+1;

        groups["Group " + num] = group;

        if (competitors.length > lobbySize) {
            lobbiesLeft -= 1;
            numCompetitorsPerLobby = Math.ceil(competitors.length / lobbiesLeft);
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