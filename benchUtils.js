
function incrCanvas(){
    for(var i=0;i<1000;i++){
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        context.fillRect(0, 0, 100, 100);
        context.strokeRect(120, 0, 100, 100);
        context.beginPath();
        context.arc(randInt(), randInt(), 100, 0, Math.PI * 2, true);
        //不关闭路径路径会一直保留下去
        context.closePath();
        context.fillStyle = 'rgba(0,255,0,0.25)';
        context.fill();
    }
    
    
}


var db;
var version = 1;
var databaseName = "database";
var request = window.indexedDB.open(databaseName, 2);//这是一个异步操作，但是会立刻返回一个IDBOpenDBRequest对象。方法返回一个IDBRequest对象。这个对象通过三种事件error、success、upgradeneeded处理打开数据库的操作结果。
request.onupgradeneeded = function(e) {
    db = e.target.result;
    console.log("onupgrageneeded");
    // 通常新建数据库以后，第一件事是新建对象仓库（即新建表），并设置主键
    db = e.target.result;
    console.log("onupgrageneeded");
    // 通常新建数据库以后，第一件事是新建对象仓库（即新建表），并设置主键
    var objectStore;
    if(!db.objectStoreNames.contains(databaseName)) {//如果这个 对象仓库/表 不存在，就新建
        objectStore = db.createObjectStore("person", {
            keyPath: "id" //设置主键为 id
        },{ autoIncrement: false });
       
    }
}

function addRecord(db,obj){
    if(!db){
        console.log("db not exists")
        return;
    }
    var request = db.transaction(["person"],"readwrite") //写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（“只读”或“读写”）
    .objectStore("person") //新建事务以后，通过IDBTransaction.objectStore(name)方法，拿到 IDBObjectStore 对象
    .add(obj); //再通过表格对象的add()方法，向表格写入一条记录
    request.onsuccess = function(e){
        console.log("数据写入成功");
    }
    request.onerror = function(e){
        console.log("数据写入失败");
    }
}
request.onsuccess = function(e) {
    db = request.result;
    console.log("success");
    //addRecord(db,{name:randStr(),age:randInt()})
}

/**
 * 数据库打开错误时调用此回调函数
 * */
request.onerror = function(e) {
    console.log("error");
}
function incrIndexDb(db,num=1){
    for (var i = 0; i <num; i++) {
        addRecord(db,{id:randInt(1000000000),name:randStr(),age:randInt()})
    }
/**
 * 新建数据库与打开数据库是同一个操作。
 * 如果要打开的数据库不存在，则会先新建数据库：
 *         1. 新建数据库时调用 request.onupgradeneeded（因为这时版本从无到有，所以会触发这个事件）
 *         2. 把数据库版本设为 1
 *         3. 此时数据库对象 db = e.target.result;
 * 新建数据库后，就可以打开数据库了，所以继续调用 request.onsuccess
 * */


/**
 * 如果要打开的数据库存在，则会直接打开该数据库
 * 此时数据库对象 db = request.result;
 * */



}

function incrSvg() {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  var svgWidth = Math.floor(Math.random() * 200) + 100; // 随机生成100到300之间的宽度
  var svgHeight = Math.floor(Math.random() * 200) + 100; // 随机生成100到300之间的高度
  var rectWidth = Math.floor(Math.random() * 100) + 20; // 随机生成20到120之间的宽度
  var rectHeight = Math.floor(Math.random() * 100) + 20; // 随机生成20到120之间的高度
  var rectColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // 随机生成颜色

  // 确保SVG的大小大于矩形的大小
  svg.setAttribute('width', svgWidth);
  svg.setAttribute('height', svgHeight);
  rect.setAttribute('class', 'svg');
  rect.setAttribute('width', rectWidth);
  rect.setAttribute('height', rectHeight);
  rect.setAttribute('fill', rectColor);

  svg.appendChild(rect);
  document.body.appendChild(svg);
}
function ajax(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:10000', true); // 设置请求方法、URL和异步标志

    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) { // 请求完成且响应成功
        const response = JSON.parse(xhr.responseText); // 解析响应数据
        console.log(response);
    }
    };

    xhr.onerror = function() {
    console.error('请求出错');
    };

    xhr.send(); // 发送请求
}
function generateRandomColor() {
  // 生成0到255之间的随机整数作为RGB值
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  
  // 将RGB值转换为十六进制格式
  var hex = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
  
  return hex;
}
function randInt(range=1024){
    return 10+Math.floor(Math.random() * 1024);
}

function incrCpu(cnt=10000000) {

    // 执行一些计算密集型的任务
    // 这里可以使用一些复杂的算法或循环来增加 CPU 消耗
    var result = 0;
    for(var j=0;j<1;j++){
        for (var i = 0; i < 10000000; i++) {
        result += i;
        }
    }
 
    
}
function incrWorker(){

    var worker = new Worker("worker.js");
    incrCpu(1000000)
    worker.postMessage(randInt()+"");
    worker.onmessage = function(e) {
        console.log(e.data);
    }
}
function testUnRemoveEventListener(){
    function unRemoveEventListener() {
        document.addEventListener("mousedown", onMousedown);
    }

function onMousedown() {
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
}
function onMousemove() {
    console.log("mousemove");
}
function onMouseup() {
    console.log("mouseup");
    // 事件处理完后应该立刻释放 事件监听
    //   document.removeEventListener("mousedown", onMousedown);
    //   document.removeEventListener("mousemove", onMousemove);
    //   document.removeEventListener("mouseup", onMouseup);
}

}
function incrGpu(){
    function setTransform(node, x, y, z, perspective) { 
        let transformValue = `translate3d(${x}px, ${y}px, ${z}px) perspective(${perspective}px)`; 
        node.style.transform = transformValue;
        let animationStyle = `@keyframes myAnimation { 
    0% { transform: translate3d(0, 0, 0) perspective(0); }
    100% { ${animationValue} }
  }`;
        node.style.animation = `myAnimation ${duration}s`;
     }
     setTransform(document.querySelector("#gpu"),randInt(),randInt(),randInt(),randInt())
}
function detachNode(){
    function onclick() {}
    let node = document.getElementById("detachedNode");
    node.addEventListener("click", onclick);
    //node.removeEventListener("click", onclick); // 删除节点后，未移除的事件监听也会造成内存泄漏。
    node.parentNode.removeChild(node);
}
function randStr(){
    return Math.random().toString(19).substr(3)
}
        function incrSpan(text,node) {
            var text=randStr()
            var span = document.createElement("span"); // 创建 <span> 元素
            span.textContent = text; // 设置文本内容
            node.appendChild(span).appendChild(document.createElement("br"))
            return span;
        }
           
          
            
            
            function incrLayout(){
                document.querySelector("#layout").style.width=parseFloat(Math.random()*100)+"px";
                document.querySelector("#style").style.color=generateRandomColor()
                document.querySelector("#node").style.color=generateRandomColor()
            }
            function curMem(){

                var mem = window.performance.memory;
                var usedJSHeapSize = mem.usedJSHeapSize;
                var totalJSHeapSize = mem.totalJSHeapSize;

                document.getElementById("mem").innerHTML = "usedJSHeapSize: " + usedJSHeapSize + " totalJSHeapSize: " + totalJSHeapSize;
            }
            curMem()


            var arr={sub:[]}
            function doIncMem(){
                arr.sub.push(new Array(250000))
                incMem()
            }
            function doIncMem2(){
                arr.sub.push(new Array(300000))
                doIncMem()
            }
            function incMem(){

               arr.sub.push(new Array(400000))
            }