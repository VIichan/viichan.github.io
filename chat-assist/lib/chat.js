const chatfilter = {
    "replaceall": [
        ".",
        " ",
        "?",
        "ㅋ",
        "ㄹㅇ",
        "ㄱㄴ",
        "ㄲㅂ",
        "ㅇㅈ",
        "ㄴㅇㅅ",
        "ㅇㅎ",
        "ㅗㅜㅑ",
        "ㅓㅜㅑ",
        "ㄱㅇㅇ",
        "ㅔ",
        "ㅖ",
        "ㄴ",
        "ㄷ",
        "ㅏ",
        "ㅑ",
        "ㅠ",
        "ㅎ",
        "어우",
        "와",
        "어",
        "컷",
        "크",
        "캬",
        "앗",
        "헉",
        "오",
        "휴",
        "비",
        "바",
        "챤",
        "보",
        "챤하",
        "난하",
        "고하",
        "릴하",
        "리라",
    ],
    "monitor": [
        "ㅅㅂ",
        "시발",
        "씨발",
        "병신",
        "허버",
        "씹",
        "섹스",
        "애미",
        "SEX",
        "정치",
        "빨갱",
        "보지",
        "자지",
        "좆",
        "새끼",
        "ㅄ",
        "ㅂㅅ",
        "존나",
    ]
};

const chatNormal = document.getElementById("chatNormal");
var chatNormalarr = [];

const chatWarn = document.getElementById("chatWarn");
var chatWarnarr = [];

var lockonBtm = true;

function addChat2Normal(tags, message, warn)
{
    var chat = document.createElement('div'),
    chatBtn = document.createElement('button'),
    chatUsername = document.createElement('span'),
    chatText = document.createElement('span');

    chatBtn.innerText = "🚫";
    chatBtn.className = "btn";
    chatBtn.setAttribute("data-clipboard-text", "/timeout " + tags["username"]);

    chatUsername.innerText = " " + ((tags["display-name"] != tags["username"]) ? tags["display-name"] + " (" + tags["username"] + ")": tags["username"]);
    chatUsername.style.color = tags["color"];
    chatText.innerText =  " : " + message;

    chat.className = warn ? "chat-warn": 'chat';
    chat.appendChild(chatBtn);
    chat.appendChild(chatUsername);
    chat.appendChild(chatText);

    chatNormal.appendChild(chat);

    lockonBtm = chatNormal.scrollTop > chatNormal.scrollHeight - window.innerHeight - 450;

    while(chatNormalarr.length > 200 && lockonBtm)
    {
        if(chatNormalarr.length % 2 == 0)
        {
            chatNormalarr[0].style.display = "none";
        }
        else
        {
            chatNormalarr[0].remove();
            chatNormalarr[1].remove();
            chatNormalarr.splice(0, 2);
        }
    }

    chatNormalarr.push(chat);

    if(lockonBtm)
        chatNormal.scrollTop = chatNormal.scrollHeight;
}

function addChat2Warn(tags, id, message)
{
    var chat = document.createElement('div'),
    chatUsername = document.createElement('span'),
    chatMessage = docuement.createElement('span');
}

function ignorefilter(msg)
{
    for(var i = 0; i < chatfilter["replaceall"].length; i++)
    {
        msg = msg.replaceAll(chatfilter["replaceall"][i], "");
        if(msg.length == 0) break;
    }

    return msg;
}
function isEmpty(msg)
{
    if(ignorefilter(msg).length == 0) return true;
    return false;
}

function isMonitor(msg)
{
    if(msg.length > 60) return true;
    for(var i = 0; i < chatfilter["monitor"].length; i++)
    {
        if(msg.indexOf(chatfilter["monitor"][i]) != -1) return true;
    }
    return false;
}

function OnChat(channel, tags, message, self)
{
    if(tags["emote-only"]) return;
    else if (isEmpty(message)) return;

    //console.log("%s\n%o\n%s", channel, tags, message);
    addChat2Normal(tags, message, isMonitor(message));
}

function OnAction(channel, tags, message, self)
{
    console.log(message);
}

function OnTimeout(channel, username, reason, duration, tags)
{
    console.log("%s(%s) : %d s", tags["display-name"], username, duration);
}