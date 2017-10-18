const serviceUrl = 'http://127.0.0.1:1026/'

let Config = {}

if (process.env.NODE_ENV === 'production') {
    Config = {
        loginUrl: '/api/uaa/oauth/token',
        test: '/api/resource/test',
        bannerAPI: '/api/banner',
        homeAPI: './json/home.json',
        musicListAPI: '/api/music',
        musicSearchAPI: '/musicSearch/api/v3/search/song?page=PAGE&pagesize=30&keyword=KEYWORD',
        playListAPI: '/api/music',
        musicAPI: '/kugou/app/i/getSongInfo.php?cmd=playInfo&hash=HASH&from=mkugou',
        krcAPI: '/kugou/app/i/krc.php?cmd=100&hash=HASH&timelength=TIMELENGTH',
        searchHotAPI: '/mobilecdn/api/v3/search/hot',
        searchResultAPI: '/mobilecdn/api/v3/search/song',
        // rankListAPI: 'kugou/rank/list?json=true',
        rankListAPI: 'cdnbj/api/v3/rank/list?plat=2&withsong=1&showtype=2&parentid=0&apiver=4&version=8550',
        rankInfoAPI: 'kugou/rank/info/{rankid}?json=true'
    }
} else {
    Config = {
        loginUrl: '/api/uaa/oauth/token',
        test: '/api/resource/test',
        bannerAPI: '/api/banner',
        homeAPI: './json/home.json',
        musicListAPI: '/api/music',
        musicSearchAPI: '/musicSearch/api/v3/search/song?page=PAGE&pagesize=30&keyword=KEYWORD',
        playListAPI: '/api/music',
        musicAPI: '/kugou/app/i/getSongInfo.php?cmd=playInfo&hash=HASH&from=mkugou',
        krcAPI: '/kugou/app/i/krc.php?cmd=100&hash=HASH&timelength=TIMELENGTH',
        searchHotAPI: '/mobilecdn/api/v3/search/hot',
        searchResultAPI: '/mobilecdn/api/v3/search/song',
        // rankListAPI: 'kugou/rank/list?json=true',
        rankListAPI: 'cdnbj/api/v3/rank/list?plat=2&withsong=1&showtype=2&parentid=0&apiver=4&version=8550',
        rankInfoAPI: 'kugou/rank/info/{rankid}?json=true'
    }
}

export default Config