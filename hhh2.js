spacialusers =['eng2028','VIPMOHIT'] ;/// this is Admins users list
const token = '5406234179:AAF1H0_tZE6TWP2dMbdRIzuH1MpBcmYH4TQ'; /// Bot Token 
var chat4 = "@eng2080" // هنا اكتب قناتك
var subpost = "https://t.me/pro_service12" // هنا اكتب بوست الاشتراك 
const mainadmin = "@eng2028" ///  the main admin id
logourl = 'https://www6.0zz0.com/2022/02/24/21/376477537.jpeg' /// logo in answer page
//////////// bot Comonds اوامر البوت //////////////
//> !slepp 20 /// for make sleep time 20 secomnds
//> !free 20  /// for add 20 answr to each new user 
//> /statistics /// الاحصائيات
//> !active 10 4 /// for add 10 answers for 4 weeks
//> !activeu 10 /// for add 10 answers unlimited time
//> !pro7 /// show bot info
//> /info /// show user info
///////////////////////////////////////////////////
var Storage = require('node-storage');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var store = new Storage('storage');
const statics = require('./stat.js');
var request = require('request');
publicgroups=[/* -1001477247722,-1001439178335 */]
let cookies
anscount = store.get('anscount')
dsleep = store.get('sleep')
sleep = dsleep
let activebot =0
isTyping = 0
lastTime = 46464
const CronJob = require('cron').CronJob;


///////////////////////&&&&&&&&&&&& START BOT %%%%%%%%%%%%%%//////////////////////
const getUrls = require('get-urls');

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
/*  bot.sendMessage('-1001308262347', 'chegg is Active')
 bot.setChatTitle('-1001308262347','CheggVIPbyHassan'+ '[' +0+']') 
 */
 //bot.setChatPhoto('-1001308262347','0.jpg') 
 bot.onText(/\/statistics(.*)/,async (msg,match)=>{
  const userid = msg.from.id
  const chatId = msg.chat.id;
  data = await statics.getlinks()
await bot.sendMessage(chatId,data,{reply_to_message_id:msg.message_id})
})

bot.onText(/!active+ ([0-9]*)+ ([0-9]*)/ ,async (msg,aa)=>{
  if (spacialusers.includes(msg.from.username)) {
  const userid = msg.from.id
  const chatId = msg.chat.id;
  await adduser(msg.reply_to_message.from.id  ,'VIP-user',parseInt(aa[1]) ,parseInt( aa[2]) -1)             
             
  bot.sendMessage(chatId, ' تم اضافه  ' + parseInt(aa[1]) +' اسئلة  لمده ' +  parseInt( aa[2]) + ' اسبوع ')
        }
  
})
bot.onText(/!activeu+ ([0-9]*)/ ,async (msg,aa)=>{
  if (spacialusers.includes(msg.from.username)) {
  const userid = msg.from.id
  const chatId = msg.chat.id;
  await adduser(msg.reply_to_message.from.id  ,'VIP-user',parseInt(aa[1]) ,999999999)             
             
  bot.sendMessage(chatId, ' تم اضافه  ' + parseInt(aa[1]) +' اسئلة  لمده غير محدودة ')
        }
  
})
bot.onText(/خطأ/ ,async (msg,match)=>{
 
 bot.sendMessage(msg.chat.id, mainadmin , {reply_to_message_id : msg.message_id} )
  
})
bot.onText(/!free+ ([0-9]*)/ ,async (msg,aa)=>{
  if (spacialusers.includes(msg.from.username)) {
  const userid = msg.from.id
  const chatId = msg.chat.id;
  await store.put("anscount",parseInt(aa[1]))
  bot.sendMessage(chatId, ' تم اضافه  ' + parseInt(aa[1]) +' اسئلة خارجيه مجانيه لجميع الحسابات ' )
        }
})
bot.onText(/!sleep+ ([0-9]*)/ ,async (msg,aa)=>{
  if (spacialusers.includes(msg.from.username)) {
  const userid = msg.from.id
  const chatId = msg.chat.id;
 dsleep =  parseInt(aa[1]) 
 sleep=dsleep   
 store.put('sleep', parseInt(aa[1]))   
  bot.sendMessage(chatId, ' تم اضافه  ' + parseInt(aa[1]) +' ثانيه بين كل عملية نشر ' )
        }
 
})
bot.onText(/!pro7/ ,async (msg,match)=>{
  if (spacialusers.includes(msg.from.username)) {
    const chatId = msg.chat.id;
    dsleep = store.get('sleep')
    currentfree = store.get('anscount')

    bot.sendMessage(chatId, "minimum sleep:"+dsleep )
    bot.sendMessage(chatId, "current sleep:"+sleep )
    bot.sendMessage(chatId, "current free post : "+currentfree )
  }
})
bot.onText(/\/info(.*)/ ,async (msg,match)=>{
  const userid = msg.from.id
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, cinfo(userid ,msg.from.first_name+' '+msg.from.last_name )  ,{reply_to_message_id: msg.message_id})
})
bot.onText(/(https:\/\/www.chegg.com\/homework-help.*)/ ,async (msg,match)=>{

  const chatId = msg.chat.id;
  ccname = msg.from.last_name? msg.from.first_name+ ' ' +msg.from.last_name :  msg.from.first_name
  const username = msg.from.username? msg.from.username : ccname  
  const userid = msg.from.id

if (msg.chat.type === "group" || msg.chat.type==="supergroup" || spacialusers.includes(msg.from.username) ) {

    let myArr = Array.from(getUrls(msg.text))
 var CheggLink = makeCheggLink(myArr.find((m)=>{return m.includes('https://chegg.com/homework-help/')})) 
 console.log('CheggLink' , CheggLink );
//await checkIfSolved(CheggLink,async (data) => {
  cuser =  CheckUser(userid)

  if ( cuser.count > 0) {
    if (!publicgroups.includes( msg.chat.id)) {
      if (activebot === 0 ) {
      //  Start(CheggLink , chatId,username,msg);
        ///////////////////////////////////////////
      if (new Date().getTime() > lastTime) {
        Start4(CheggLink , chatId,username,msg);
        lastTime = new Date().getTime() + sleep*1000
    }else{
      
await bot.sendMessage(chatId,"سيتم بحث الحل بعد  "+ (lastTime - new Date().getTime())/1000 +" ثانيه ⏰" , {reply_to_message_id: msg.message_id})
      //bot.sendMessage(msg.chat.id,"سيتم النشر في "+  new Date(lastTime).toTimeString(),{reply_to_message_id: msg.message_id}) 
    d = new Date(lastTime)
    lastTime = lastTime + sleep*1000
    str = d.getSeconds()+' '+d.getMinutes()+' '+d.getHours()+' '+ d.getUTCDate()+' '+d.getMonth()
     job = new CronJob(d,async function() {
      Start4(CheggLink , chatId,username,msg);

    }
     ,null,true )
    }
//////////////////////////////////////////////////

  }
    }else{
        await bot.sendMessage(chatId,' لديك : ' + cuser.count+ ' سؤال يمكنك ارسال الرابط في المجموعه الخاصة بلمشتركين فقط' ,{reply_to_message_id: msg.message_id })

    }
    
  }else{
    bot.sendMessage(chatId,' ليس لديك عدد كافي من الاسئلة للحصول على مزيد من الاسئلة اضغط اشتراك ' +' ' ,{reply_to_message_id: msg.message_id, reply_markup: {
      inline_keyboard: [
          [{
              text: 'اشتراك',
              url:subpost
          }]
      ]
  }})
  }

             
  



/* }) */
 } else {
        
  bot.sendMessage(chatId,'الرابط صحيح لكن يمكن استخدام البوت في المجموعة الخاصة بلمشتركين فقط , اذا كنت غير مشترك اضغط اشتراك' +' ' ,{reply_to_message_id: msg.message_id, reply_markup: {
    inline_keyboard: [
        [{
            text: 'اشتراك',
            url:subpost
        }]
    ]
}})
 }
  }) 



  
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async  function Start4 (CheggLink,chatId,username,msg) {
  
  var fss = await require("fs")
  await statics.addTototalsearch() 
   var startdate = await new Date().getTime()
   var filelist = new Array()
   filelist = await fss.readdirSync('answers/')
 async function checkData(name) {
   trackid =  name.indexOf('?trackid')
     if (trackid > -1 ) {
   name = name.slice(0,trackid)  
     }
     if ( name.includes('questions-and-answers')) {
       name = name.slice(58,name.length)
     }else{
       name = name.slice(36,name.length)
     }
   
   aa = await filelist.find(d=> {return d.includes(name)})
   return aa}
 
 
 
   n = await checkData (CheggLink)
 if (msg.chat.type!=='supergroup') {
 await bot.sendMessage(chatId, 'Start Searching In Data Base That Contains : '+ filelist.length +' answers');}
 
   if (n) {
     console.log('Found in Data');
 var enddate = await new Date().getTime()
 //var searchtime = new Storage('searchtime')
 //var searchtimearray = await searchtime.get('searchtime')
 //searchtimearray.push(parseInt(((enddate-startdate)/1000),10))
     //searchtime.put('searchtime', searchtimearray)
     try {
       await statics.addTosuccesslink()
       bot.sendDocument(chatId,'answers/'+ n ,{reply_to_message_id: msg.message_id,caption:'✅ تم الحصول على الاجابة بنجاح  '+'\n'+ '🕐 : '+parseInt(((enddate-startdate)/1000),10)+' s'})
 
     } catch (error) {
       bot.sendDocument(chatId,'answers/'+ n ,{caption:'@'+ username+' '+'✅ تم الحصول على الاجابة بنجاح قم بتحميل الملف للمعاينه بدقه عاليه '})
 
     }
   }
   
   else {
 var data1 = await  fss.readFileSync("cooki.json")
 cookies = JSON.parse(data1)
 bot.sendMessage(chatId,'@'+ username+' الرابط صحيح سيتم البحث عن الاجابه',{reply_to_message_id: msg.message_id})
   if (CheggLink.includes('questions-and-answers')) {
    await  request.get(CheggLink ,{
      headers: { 
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 
        'Accept-Language': 'ar,en-US;q=0.7,en;q=0.3', 
        'Connection': 'keep-alive', 
        'Cookie':cookies, 
        'Upgrade-Insecure-Requests': '1', 
        'Sec-GPC': '1', 
        'Cache-Control': 'max-age=0', 
        'TE': 'Trailers'
      }
     } , async function (err, res, body) {
      if (err) {
        console.log('err 000');
        await  bot.sendMessage(chatId,' لايوجد جواب : اذا كنت تعتقد ان هذا خطأ في البوت اكتب كلمة (خطأ) اما اذا كان السؤال فعلا لايحتوي على جواب فأرجو التاكد من وجود جواب قبل ارسال الرابط ' +' ' ,{reply_to_message_id: msg.message_id})
    
        } else{
    
          try {
            var  mm = body.match(/(<title>)+(.*)+(<\/title>)/)[2]
        } catch (error) {
          mm = 'body Err'
        }
       // console.log(body);
    
       console.log(mm);
    
       if (mm.startsWith("Access")) {
         
               await  bot.sendMessage(chatId,'@'+ username+'خطأ Access '+mainadmin +' ' ,{reply_to_message_id: msg.message_id})

       } else {
       
        
        const dom = new JSDOM(body);
        Qselector = 'div.ugc-base.question-body-text';
         Aselector = 'div.answer-given-body.ugc-base';
         qqq=  dom.window.document.querySelector(Qselector).innerHTML
         answer= dom.window.document.querySelector(Aselector).innerHTML 
         qqq = qqq.replace(/height:([^]+)px/ , "")
      if (answer.length === 0) {
        
        Aselector = 'section[id="steps"]'
        answer= dom.window.document.querySelector(Aselector).innerHTML 
      }
      if (answer.length === 0 ) {
        console.log('err 111');
    //    Start(CheggLink , chatId,username,msg);
    await  bot.sendMessage(chatId,' لايوجد جواب : اذا كنت تعتقد ان هذا خطأ في البوت اكتب كلمة (خطأ) اما اذا كان السؤال فعلا لايحتوي على جواب فأرجو التاكد من وجود جواب قبل ارسال الرابط ' +' ' ,{reply_to_message_id: msg.message_id})
    
    
      } else {            
      html = await creatHTML(qqq,answer)  
      html.replace('Show transcribed image text','')
    start =0 
    do {
    i = html.indexOf('src',start)
    ss = [html.slice(i,i+20)].join('')
    if (!ss.includes('http')&&ss.length>0) {
    html= [html.slice(0, i+5), 'https:', html.slice(i+5)].join('')
    }
    start = i+1
    } while (i!=-1);
          
     var   filename = await makeName(CheggLink)
        const validFilename = require('valid-filename');
    
      valid =await  validFilename(filename);
      if (valid === false) {
        filename = await makeid(10)
      }
    console.log(filename);
                 var fss = await require("fs")
              await fss.writeFileSync ('answers/'+ filename +'.html', html)
    await console.log('done');
    try {
     var enddate = await new Date().getTime()
     /* var searchtime = new Storage('searchtime')
     var searchtimearray = await searchtime.get('searchtime')
     searchtimearray.push(parseInt(((enddate-startdate)/1000),10))
     searchtime.put('searchtime', searchtimearray) */
     dsleep = store.get('sleep')
     if ( parseInt(((enddate-startdate)/1000),10) > dsleep) {
       sleep = parseInt(((enddate-startdate)/1000),10)
     } else{
       sleep= dsleep
     }
     await statics.addTosuccesslink()
     await bot.sendDocument(chatId,'answers/'+ filename +'.html',{reply_to_message_id: msg.message_id,caption:'✅ تم الحصول على الاجابة بنجاح  '+'\n'+ '🕐 : '+parseInt(((enddate-startdate)/1000),10)+' s'})
     console.log(1111111111111);
     
    
    } catch (error) {
     // await bot.sendMessage(chatId,'@'+ username+' '+'حدث خطا في رقع الملف اعد ارسال الرابط Fail To Upload Try aqain @mnwer595',{reply_to_message_id: msg.message_id})       
      await console.log('Fail To Upload Try aqain because size');
    console.log(error);
    }
    
    
    }
      
    
       }
     
    
    
    
        }
      
      
      })
} 

else {
  await     bot.sendMessage(chatId,'@'+ username+'عذرا حلول المصادر غير متوفره  ' +' ' ,{reply_to_message_id: msg.message_id})


}



 }
 await rmcount(msg.from.id)
 }

 async function adduser (username , type , count , w){
  var fss = await require("fs")
var usersList = []
 usersdata = await fss.readFileSync(type +'.json')
usersList = await JSON.parse(usersdata)
ii = await usersList.findIndex(d=> {return d.id === username})
if (ii > -1) {
  usersList[ii].date =new Date().getTime() + (w * 604800000)
  usersList[ii].count =  type ==='N-user'?anscount : count

} else {
  usersList.push({id:parseInt( username,10) , date:new Date().getTime() + (w * 604800000), count : type ==='N-user'?anscount : count }) 
}

await fss.writeFileSync(type +'.json', JSON.stringify(usersList))

}


       function makeName(name){

        trackid =  name.indexOf('?trackid')
          if (trackid > -1 ) {
        name = name.slice(0,trackid)  
          }
        
          if (name.includes('questions-and-answers')) {
            name = name.slice(58,name.length)
            name = '-chegg-Q&A-'+name
          }else{
            name = name.slice(36,name.length)
            name = '-chegg-'+name
          }
          return name
        }
        

      function   CheckUser(userid){
      var fss =  require("fs")

      var A_usersList = []
      var N_usersList = []
      var VIP_usersList = []
       usersdata =  fss.readFileSync('A-user.json')
       A_usersList =  JSON.parse(usersdata)
       usersdata =  fss.readFileSync('N-user.json')
       N_usersList =  JSON.parse(usersdata)
       usersdata =  fss.readFileSync('VIP-user.json')
       VIP_usersList =  JSON.parse(usersdata)
       usersdata =  fss.readFileSync('Super-user.json')
       Super_usersList =  JSON.parse(usersdata)
        IsVIP = VIP_usersList.find(d=>{return d.id === userid})
        ISnormal = N_usersList.find(d=>{return d.id === userid})
        IsSuper = Super_usersList.find(d=>{return d.id === userid})
/*   console.log(IsVIP);
console.log(ISnormal); */
if (IsSuper) {
  return {count : 99 ,type: 'Super'}
} else {
       if (IsVIP) {
        mm = new Date().getTime() - IsVIP.date
        cc = IsVIP.count
     //   console.log(IsVIP);
        if (mm < 604800000 && cc > 0 ) {
          return {id : IsVIP.id , date : IsVIP.date , count : IsVIP.count , type: 'VIP'}
        } else {
          if (ISnormal) {
            return {id : ISnormal.id , date : ISnormal.date , count : 0 , type: 'N'}
          }else{
            adduser(userid,'N-user')
            return {id : userid , date : new Date().getTime() , count : anscount , type: 'N'}
          }
        }
      }else{
        if (ISnormal) {
          return {id : ISnormal.id , date : ISnormal.date , count : ISnormal.count , type: 'N'}
        }else{
          adduser(userid,'N-user')
          
          return {id : userid , date : new Date().getTime() , count : anscount , type: 'N'}
        }
      }
}
 

     }

    

    function creatHTML(qqq,answer) {
      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      color = getRandomColor()
      

      var Hhh = '<!DOCTYPE >'+
      '<html">'+
      '<head>'+
      ''+
      '</head>'+
      '<body>'+
      '	<div id="templatemo_container">'+
      '		<div id="templatemo_header">'+
      '        	<div id="templatemo_logo">'+
      '            	</div>'+
      '       '+
      '        </div>'+
      '        '+
      '        '+
      ' '+
      '<div class="main">'+
      '	<div>	</h2><button class="accordion active"><b>Question:</b></button>'+
      '		'+qqq+
      '	'+
      '	</h2><button class="accordion active"><b>Answer</b></button>'+
      '	'+answer+
      ''+
      '	<script>                        var acc = document.getElementsByClassName("accordion"); var i; for (i = 0; i < acc.length; i++) { acc[i].addEventListener("click", function () { this.nextElementSibling.classList.toggle(\'collapse\')                                this.nextElementSibling.classList.toggle(\'expand\') }); }                    </script>'+
      '	</body>'+
      ''+
      '	<head>'+
      '		<meta name="viewport" content="width=device-width, initial-scale=1">'+
      '		<style>'+
      ''+
      '.hidden {'+
'        display: none;}'+  
      '			.accordion {'+
      '				background-color: #63c993;'+
      '				color: #00000;'+
      '				cursor: pointer;'+
      '				padding: 15px;'+
      '				width: 100%;'+
      '				border: solid black 1px;'+
      '				text-align: left;'+
      '				font-size: 15px;'+
      '				height: auto;'+
      '				overflow: hidden;'+
      '				filter: brightness(100%);'+
      '				transition: filter 0.15s;'+
      '			}'+
      ''+
      '			.accordion:hover {'+
      '				filter: brightness(125%);'+
      '				border: solid black;'+
      '			}'+
      ''+
      '			.panel {'+
      '				background-color: white;'+
      '				height: auto;'+
      '				opacity: 1;'+
      '				padding: 0 18px;'+
      '				max-height: 500em;'+
      '				border-style: groove;'+
      '				transition: max-height 0.5s ease;'+
      '				overflow: hidden;'+
      '			}'+
      ''+
      '			.panel.colapse {'+
      '				max-height: 0em;'+
      '				border-style: none;'+
      '			}'+
      ''+
      '			.panel.expand {'+
      '				max-height: 500em;'+
      '				border-style: groove;'+
      '			}'+
      ''+
      '			.answer {'+
      '				height: auto;'+
      '				max-height: 500em;'+
      '				transition: max-height 0.5s ease;'+
      '			}'+
      ''+
      '			.answer.colapse {'+
      '				max-height: 0em;'+
      '			}'+
      ''+
      '			.answer.expand {'+
      '				max-height: 500em;'+
      '			}'+
      ''+
      '			.question {'+
      '				padding: 0 18px;'+
      '				border: groove;'+
      '				overflow: hidden;'+
      '			}'+
      ''+
      '			.main {'+
      '				background-color: white;'+
      '            }'+
      ''+
      ''+
      'a:link, a:visited {	color: #CCFF00; text-decoration: underline; }'+
      'a:active, a:hover { color: #FF9900; text-decoration: none; }'+
      ''+
      ''+
      ''+
      '#templatemo_container {'+
      '	width: 900px;'+
      '	margin: auto;'+
      '}'+
      ''+
      '#templatemo_header {'+
      '	width: 900px;'+
      '	height: 220px;'+
      '	margin: 0;'+
      '	padding: 1px 0 0 0;'+
      '}'+
      ''+
      '#templatemo_logo {'+
      '	float: left;'+
      '	background: url('+logourl+');'+
      '	width: 270px;'+
      '	height: 20px;'+
      '	font-family: Arial, Helvetica, sans-serif;'+
      '	font-size: 16px;'+
      '	font-style: italic;'+
      '	color: #CCCCCC;'+
      '	margin: 105px 0 0 0;'+
      '	padding: 58px 0 0 90px;'+
      '}'+
      ''+
      '            '+
      '		</style>'+
      '	</head>'+
      '      '+
      '        '+
      '            '+
      '		</div>  '+
      ''+
      '        '+
      ''+
      '    '+
      '    <div id="templatemo_bottom"></div>'+
      '<!--  Free CSS Templates by TemplateMo.com  -->'+
      '</html>';
        
      
return Hhh      
    }
    
    function cinfo(id,name) {
      name = name.replace('undefined','')
    nn = CheckUser(id)

    mm = new Date().getTime() - nn.date
    if (nn.type === 'VIP') {
  
      if ((-1*mm) > 31556952000) {
        mydate = "غير محدود (unlimited)"
        } else{
       mydate = dhm(604800000-mm )
       
        }  
msg = ' الاسم : ' + name+ "\r\n" +' نوع الحساب : VIP '+ "\r\n" +'المتبقي من الاشتراك : '+ mydate + "\r\n" +' المتبقي من اسئلة موقع جيك : ' + nn.count
    }else if(nn.type === 'N'){
      msg = ' الاسم : ' + name+ "\r\n" +' نوع الحساب : free '+ "\r\n" +' المتبقي من اسئلة موقع جيك : ' + nn.count
    }else{
      msg = ' الاسم : ' + name+ "\r\n" +' نوع الحساب : super '
    }

    return msg
   }



  async function rmcount(userid) {
    var fss =  require("fs")
    var usersList = []
    let ss = await CheckUser(userid)
    let cfilenme = ''

    if (ss.type ==="VIP") {
      cfilenme ='VIP-user.json'
    } else if(ss.type==="N"){
      cfilenme ='N-user.json'
    }else{
      cfilenme ='Super-user.json'
    }

   let usersdata =  fss.readFileSync(cfilenme)
    usersList = JSON.parse(usersdata)

   ii = await usersList.findIndex(d => d.id === userid)
  
   usersList[ii].count = usersList[ii].count-1
   
   await fss.writeFileSync(cfilenme, JSON.stringify(usersList))
   }


   function dhm(t){
     var cd = 24 * 60 * 60 * 1000,
         ch = 60 * 60 * 1000,
         d = Math.floor(t / cd),
         h = Math.floor( (t - d * cd) / ch),
         m = Math.round( (t - d * cd - h * ch) / 60000),
         pad = function(n){ return n < 10 ? '0' + n : n; };
   if( m === 60 ){
     h++;
     m = 0;
   }
   if( h === 24 ){
     d++;
     h = 0;
   }
   return [d + 'day', pad(h) +'h ', pad(m)+'m'].join(':');
 }

function makeCheggLink(name){

  trackid =  name.indexOf('?trackid')
    if (trackid > -1 ) {
  name = name.slice(0,trackid)  
    }
    return name
  }

  function getUserAgent(){
let agentlist =require('user-agent-array')
  return agentlist[Math.floor(Math.random() * (800 - 1 + 1)) + 1]  
  }
