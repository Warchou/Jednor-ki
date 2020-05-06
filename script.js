let player = {
    srodki: 100,
    rozegrane: 0,
    wygrane: 0,
    przegrane: 0,

    stawka: 0,

    OdswiezInfo: () => {
        srodkiMsg = document.getElementById("srodki");
        winrateMsg =  document.getElementById("winrate");

        winrateMsg.innerHTML = "Rozegrane:" + player.rozegrane + " Wygrane:" + player.wygrane + " Przegrane:" + player.przegrane;
        srodkiMsg.innerHTML = "Twoje obecne środki:" + player.srodki;
    },

    Wygrana: () => {
        player.srodki += player.stawka*2;
        player.rozegrane++;
        player.wygrane++;
        player.OdswiezInfo();
    },

    Przegrana: (hajs) => {
        player.srodki -= player.stawka;
        player.rozegrane++;
        player.przegrane++;
        player.OdswiezInfo();
    }

}

const SprawdzStawke = () => {
    value = document.getElementById("inputText").value;
    msg = document.getElementById("inputMsg");

    if(isNaN(value)){
        msg.style.display = "block";
        msg.innerHTML = "Proszę podać liczbę"
        return false;
    }
    else if (value == ""){
        msg.style.display = "block";
        msg.innerHTML = "Proszę wypełnić to pole"
        return false;
    }
    else if(value > player.srodki){
        msg.style.display = "block";
        msg.innerHTML = "Niewystarczająca liczba środków";
        return false;
    }
    else{
        msg.style.display = "none";
        player.stawka = value;
        return true;
    }
}

const Gra = () => {

    if(SprawdzStawke()){
        los = [(Math.floor(Math.random() * (4 - 1)) + 1) , (Math.floor(Math.random() * (4 - 1)) + 1), (Math.floor(Math.random() * (4 - 1)) + 1) ];
        pola = document.getElementsByClassName("pole");
        for(i = 0; i < 3; i++){
            color = "";
            if(los[i] == 1){
                color = "red";
            }else if(los[i] == 2){
                color = "green";
            }else if(los[i] == 3){
                color = "blue";
            }
            pola[i].style.backgroundColor = color;
        }

        if(los[0] == los[1] && los[1] == los[2]){
            player.Wygrana();
        }else{
            player.Przegrana();
        }

    }
}

const button = document.getElementById("inputButton");
button.addEventListener("click", Gra);