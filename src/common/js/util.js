import storage from 'good-storage';

export function isChides(num) {  // 数字转为中文万
  var s = num.toString(),
    len = s.length,
    n1 = num,
    str = '次';
  var uDate = [{
    n: 11,
    s: '万亿'
  }, {
    n: 8,
    s: '亿'
  }, {
    n: 4,
    s: '万'
  }];
  for (let index = uDate.length - 1; index > -1; index--) {
    var iten = uDate[index];
    if (len > iten.n) {
      n1 = s.substr(0, len - iten.n);
      str = iten.s;
    }
  }
  return n1 + str;
}

// 转名字
export function singerName(arr) {
  let name = []
  name = arr.map((item) => {
    // console.log(arr)
    return item.name
  })
  return name.join('/')
}

// 转时间 时、分
export function format(interval) {
  interval = interval | 0;
  let minute = (interval / 60) | 0;
  let second = interval % 60;
  if (second < 10) {
    second = "0" + second;
  }
  return minute + ":" + second;
}

export function mukautuva(str) {
  let o = null,
    regs = /\[(?<tims>.+)(?=\])\](?<text>.+)/g,
    sepear = str.split("\n");

  sepear.splice(-1, 1);

  sepear.forEach(item => {
    let s = regs.exec(item)
    console.log(item);
    console.log(s);

  })

  // console.log(sepear);

  return o;
}
// 保存数据到locastor
export function saveLocastre(name, data) {
  return storage.set(name, data)
}

// 获取数据
export function getLocastre(name) {
  if (!storage.get(name)) {
    saveLocastre("aggPlay", [])
  }
  return storage.get(name)
}