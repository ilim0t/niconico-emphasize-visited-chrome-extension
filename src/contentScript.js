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