/* 
    ランキングで、すでに訪れた動画ページの背景を暗くする。
*/
const videos = document.getElementsByClassName("RankingMainVideo");
// const videos = document.getElementsByClassName("VideoItem");

Array.from(videos).forEach(async video => {
    const hrefs = Array.from(video.getElementsByTagName("a")).map(a => a.href);
    const visited = await Promise.all(hrefs.map(url => {
        return new Promise(resolve => chrome.runtime.sendMessage({ url }, resolve));
    }));

    if (visited.some(item => item)) {
        video.style.backgroundColor = "gainsboro";
    }
});

/* 
    動画ページで、niconicoで実装されたフルスクリーンが本来のもの(ディスプレイ全画面に表示される)と異なっている問題を解消
*/
const observer = new MutationObserver(([mutation]) => {
    if (mutation.target.classList.contains("is-fullscreen")) {
        console.log("full");
        mutation.target.requestFullscreen();
    }
});

observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
});

/* 
    動画ページで、Youtubeと同じく0-9キーを押すと指定の時間位置に移動するように
*/

const keyMap = new Map(Array.from({ length: 10 }, (v, k) => [k.toString(), k / 10]));

document.addEventListener("keydown", event => {
    if (!keyMap.has(event.key)) {
        return;
    }

    const videos = document.getElementsByTagName("video");
    for (const video of videos) {
        video.currentTime = video.duration * keyMap.get(event.key);
    }
})