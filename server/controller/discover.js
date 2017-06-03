const banner = async (ctx,next) => {
    let a = [{
      imgurl:'http://p4.music.126.net/MD1Rxeu4O21KQ9SBgx0EBQ==/18880813672319248.jpg',
      },
      {imgurl:'http://p3.music.126.net/1EZqWQYmxlzRU3iAJo-_Qw==/18660911348461171.jpg'}
    ]
   ctx.body = JSON.stringify(a)
}

export default banner