import request from "../util/request";
import config from "../util/config";

const banner = async (ctx, next) => {
  let data = await request(config.banner);
  ctx.body = JSON.parse(data).data.info;
};

const music = async (ctx, next) => {
  let data = await request(config.music);
  ctx.body = JSON.parse(data).plist.list.info.slice(0, 6);
};

const album = async (ctx, next) => {
  const url = ctx.url;
  let id = url.substring(url.lastIndexOf("/") + 1);
  let music = await request(config.playListAPI.replace("id", id));
  let data = JSON.parse(music);
  let d = {
    list: data.list.list.info,
    info: data.info.list
  };
  ctx.body = d;
};

const musicDetail = async (ctx, next) => {
  const url = ctx.url;
  let id = url.substring(url.lastIndexOf("/") + 1);
  let music = await request(config.musicDetail.replace("HASH", id));
  let data = JSON.parse(music);

  let krc = await request(
    config.krc
      .replace("HASH", id)
      .replace("TIMELENGTH", data.timeLength + "000")
  );
  let krcArray = [];
  krc.split("\n").map((item, index) => {
    let t = item.substring(1, item.indexOf("]"));
    let tt =
      parseInt(t.substring(0, t.indexOf(":"))) * 60 +
      parseFloat(t.substring(t.indexOf(":") + 1));
    krcArray.push({
      time: tt,
      str: item.substring(item.indexOf("]") + 1),
      index: index
    });
  });
  krcArray.pop();

  let vo = {
    krc: krcArray,
    hash: id,
    url: data.url,
    singerName: data.singerName,
    songName: data.songName,
    imgUrl: data.imgUrl,
    duration: data.timeLength
  };

  ctx.body = vo;
};

export default { banner, music, album, musicDetail };
