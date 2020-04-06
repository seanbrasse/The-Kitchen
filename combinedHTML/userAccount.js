window.onload = function () {
    let Words = document.getElementById("words");
    let Who = document.getElementById("who");
    let TalkWords = document.getElementById("talkwords");
    let TalkSub = document.getElementById("talksub");


    TalkSub.onclick = function () {

        let str = "";
        if (TalkWords.value == "") {

            alert("empty message!");
            return;
        }
        if (Who.value == 0) {

            str = '<div class="userA"><span>' + TalkWords.value + '</span></div>';
        } else {
            str = '<div class="userB"><span>' + TalkWords.value + '</span></div>';
        }
        Words.innerHTML = Words.innerHTML + str;
    }

}