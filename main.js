var rec = {}
var n = 0
var xx //最大人数1开始需要赋值

function init_rec(z) {
    if (z > 0 && z < 5) {
        n = 0
        xx = z
        for (i = 1; i <= z; ++i) {
            rec[i] = {}
            // rec[i].stay=0

            rec[i].boxNum = 0
        }
        console.log(JSON.stringify(rec))
    }
    else console.log("人数不正确")

}

function start(x, y) {
    //判断是否所有人完成
    var IsDone = 1
    for (i = 1; i <= xx; ++i) {

        if (typeof rec[i] == "undefined") { IsDone = 0 }
    }
    if (IsDone == 1) ++n


    //updata content boxNum done stay NO DICE
    function updata() {
        rec[x].done = 0 //是否到达终点
        //防止溢出
        if (boxNum > dfw.length){
            boxNum = dfw.length
            rec[x].done = 1
        } 
        if (boxNum < 1) boxNum = 1
        rec[x].boxNum = boxNum
        if (typeof rec[x].content == "undefined") rec[x].content = dfw[boxNum][2]
        // else rec[x].content += dfw[boxNum][2]
    }
   let  seed = Date.now() + performance.now();
    Math.seedrandom(seed.toString());
    var dice = Math.ceil(Math.random() * 6)
    if (y != 0) dice = y

    var boxNum = rec[x].boxNum + dice
    // var boxNum = rec[x].boxNum + 3
    // console.log("boxNum======",boxNum);
    rec[x] = {}
    rec[x].dice = dice
    updata()
    if (dfw[boxNum][0] == "move" && dfw[boxNum][1] != 0) {
        boxNum += dfw[boxNum][1]
        // console.log(dfw[boxNum])
        // rec[x].content += `---> ${dfw[boxNum][2]} `
        updata()
    }
    else if(dfw[boxNum][0] == "modo" && dfw[boxNum][1] != 0){
        boxNum += dfw[boxNum][1]
        rec[x].content += `---> ${dfw[boxNum][2]} `
        updata()
    }
    else if(dfw[boxNum][0] == "fly" && dfw[boxNum][1] != 0){
        boxNum = dfw[boxNum][1]
        updata()
    }
    console.log(rec[x]);
    return rec[x]
}


