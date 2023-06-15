
function float2(n,x){
    x=Math.floor(x*10**n)/10**n
    return x
}
//输入格子数，计算各边格子个数,计算css参数
function calsize(box,wid,hei){
    var x=4,y,w=0,pxY,perX
    var pad=float2(4,1*wid/100)
    var bor=float2(4,0.2*wid/100)
    while(w<box){
        w=0
        perX=float2(5,(1-(pad/wid+bor/wid)*(2*x))/x)
        pxY=perX*wid/4*3
        y=Math.floor(hei/(pxY+(pad+bor)*1))
        w=Object.getOwnPropertyNames(boxCodeNew(x,y,box)).length
        ++x
    //console.log(perX)
    }
    console.log("x",x);
    console.log("y",y);
    perf=wid/30
    console.log("perf",perf);
    var dict={
        x:x-1,
        y:y,
        pad:pad,
        bor:bor,
        perX:perX*100-0.5,
        pxY:pxY,
        perf:perf
    }
    return dict
}
//生成格子
function setBox(x,y,dfw,boxCode,calsize){
    //console.log(x,y)
    var boxList={}
    for(b=1;b<=y;++b){
        for(a=1;a<=x;++a){
            boxList[`${a}_${b}`]={}
            boxList[`${a}_${b}`].id=`${a}_${b}`
            var num=boxCode[`${a}_${b}`]
            if(typeof num!="undefined"){
                boxList[`${a}_${b}`].content=dfw[num][2]
                boxList[`${a}_${b}`].number=num
                boxList[`${a}_${b}`].css={
                    width:calsize.perX+'%',
                    height:calsize.pxY+'px',
                    border:calsize.bor+'px'+' solid rgb(137, 216, 255)',
                    padding:calsize.pad+'px',
                    float:'left',
                    fontSize : calsize.perf+'%'
                    // fontSize : '5%'
                } 
            }
            else{
                boxList[`${a}_${b}`].css={
                    width:calsize.perX+'%',
                    height:calsize.pxY+'px',
                    border:calsize.bor+'px'+' solid rgb(255, 255, 255)',
                    padding:calsize.pad+'px',
                    float:'left',
                    fontSize : '80%'
                }

            }
        }
    }
    console.log(boxList)
    return boxList
}
//新的boxcode
function boxCodeNew(x0,y0,l){
    var boxCodes={},n=1,x,y,nn
    //定义向上下左右
    function write(){
        boxCodes[`${x}_${y}`]=n
        //console.log(x,y,'write'+n)
        ++n
    }
    function up(){
        --y
        write()
    }
    function down(){
        ++y
        write()
    }
    function left(){
        --x
        write()
    }
    function right(){
        ++x
        write()
    }
    //开始点
    x=x0
    y=y0
    write()
    var t=0
    while(n<=l&&y0-2*t>=1+2*t){
        do{
            nn=n
            if(y==y0-2*t&&x>1+2*t&&x<x0+3-2*t)left()
            else if(x==1+2*t&&y>1+2*t&&y<y0+1-2*t)up()
            else if(y==1+2*t&&x<x0-2*t&&x>0+2*t)right()
            else if(x==x0-2*t&&y<y0-2-2*t&&y>0+2*t)down()
            //console.log(nn,n)

        }while(n<=l&&n!=nn)
    ++t
    }
    return boxCodes
}
