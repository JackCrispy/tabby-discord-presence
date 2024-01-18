import { Client } from "discord-rpc";

const clientId = '1196732274947919912';

let activeTabName = "Tabby"
let smallImgActivity = "tabby"
let amountOfTabs = 1
let idleTimer = 0
let idle = false
let timeNow = getTime();

setInterval(() => {
    idleTimer++;
    if (idleTimer > 900) {
        idle = true;
    } else {
        idle = false;
    }
}, 1000)

export function updateInfo(activeTabNameD, amountOfTabsD) {
    if (idle === false) {
        activeTabName = activeTabNameD;
        amountOfTabs = amountOfTabsD;
    }
}

export function updateIdleInfo() {
    idleTimer = 0;
}

function getTime() {
    const startTimestamp = new Date();
    return startTimestamp;
}

function setActivity(rpc) {
    let stateName = `Viewing (1 of ${amountOfTabs}) tabs`
    let smallImageTextD = `Viewing ${activeTabName}`
    if (activeTabName !== "Settings") smallImgActivity = "terminal_2"
    if (activeTabName === "Settings") smallImgActivity = "settings"

    if (idle === true) stateName = "Idle"
    if (idle === true) smallImgActivity = "idle"
    if (idle === true) smallImageTextD = "zZz"
    
    rpc.setActivity({
        details: stateName,
        state: activeTabName,
        largeImageKey: 'tabby',
        startTimestamp: timeNow,
        largeImageText: 'tabby.sh',
        smallImageKey: smallImgActivity,
        smallImageText: smallImageTextD,
        instance: false,
    });
}

export default function Activity() {
    try {
        const rpc = new Client({ transport: 'ipc' });

        rpc.on('ready', () => {
            console.log('[Discord Presence] Ready/connected to socket');
        });

        rpc.login({ clientId }).catch(console.error);

        setInterval(() => {
            setActivity(rpc);
            console.log('[Discord Presence] Updating activity');
        }, 15e3);
        
        return rpc;
    } catch (e) {
        console.log(e);
    }
}

