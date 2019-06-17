/**
 * config
 */

const config = {
  // banner: 'http://localhost:8889/banner',
  banner:
    "http://ads.service.kugou.com/v1/mobile_fmbanner?&appid=1&clientver=1&clienttime=1&key=1",
  // music:'http://localhost:8889/music'
  music: "http://m.kugou.com/plist/index?page=0&json=true",
  playListAPI: "http://m.kugou.com/plist/list/id/?json=ture",
  musicDetail:
    "http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=HASH&from=mkugou",
  krc:
    "http://m.kugou.com/app/i/krc.php?cmd=100&hash=HASH&timelength=TIMELENGTH"
};

export default config;
