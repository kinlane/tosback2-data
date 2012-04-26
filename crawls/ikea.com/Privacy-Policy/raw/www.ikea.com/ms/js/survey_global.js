//Ver. 2010-11-11_01
//Returns true if the page is an exception that should NOT have an invitation
function surveyExceptionUrl(surveyHref, exceptionUrl) {
    return surveyHref.indexOf(exceptionUrl, 0) > -1;
}

//Returns true if found the site    
function surveyIsSite(surveyPathArray, sites, iter) {
    var surveyParentFolder,  surveyLanguageCountry, surveyCountry, surveyLanguage;
    surveyParentFolder = sites[iter + 6];
    surveyLanguageCountry = sites[iter + 7];
    surveyCountry  = sites[iter + 8];
    surveyLanguage = sites[iter + 9];
    
    // Example ms en_SE
    if (surveyPathArray[1] === surveyParentFolder && surveyPathArray[2] === surveyLanguageCountry) {
        return true;
    }
    
    // Example se sv
    if (surveyPathArray[1] === surveyCountry && surveyPathArray[2] === surveyLanguage) {
        return true;
    }
        
    // Example se
    if (surveyPathArray[1] === surveyCountry && (surveyPathArray[2] === undefined || surveyPathArray[2] === "")) {
        return true;
    }
                
    return false;
}

//Session cookie management
var surveySessionCookieName = "surveySessionCookie";
var surveySessionCookieValue = "survey-session";

function surveyCreateCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function surveyGetCookie(name) {
    var cookie_start = document.cookie.indexOf(name + "=");
    if (cookie_start == -1) return null;
    var cookie_end = document.cookie.indexOf("; ", cookie_start);
    if (cookie_end == -1) cookie_end = document.cookie.length;
    return unescape(document.cookie.substring(cookie_start + name.length + 1, cookie_end));
}

function surveySetSessionCookie(cookiename, value) {
    var days = 1;
    //surveyCreateCookie(cookiename, value, days);
    document.cookie = escape(cookiename) + "=" + escape(value) + "; path=/";
}

//Returns true if no session cookie found
function surveyNewSession()
{
    var sessionCookie, returnValue;
    sessionCookie = surveyGetCookie(surveySessionCookieName);
    returnValue = (sessionCookie !== surveySessionCookieValue) ;
    return returnValue;
}
function surveyAcceptsCookies() {
    var name, value, days, returnValue, surveyCheckCookie;
    name = "surveyCheckAcceptsCookies";
    value = "1";
    days = 1;
    surveyCreateCookie(name,value,days);
    
    surveyCheckCookie = surveyGetCookie(name);
    
    returnValue =  (surveyCheckCookie === value);
    erase_cookie(name);
    
    return returnValue;
    
}

/*
 * GfK NOP DHTML on-exit (c) 2007 GfK NOP Ltd
 */

// *****  Use this var to enable/disable this script *****
var active = true;

// Change path to heartbeat file
var HeartBeatPath = "heartbeat.htm";

var exceptionUrl = "preindex.html";
var surveyHref = document.location.href;


if (active && surveyAcceptsCookies() && surveyNewSession() && !surveyExceptionUrl(surveyHref, exceptionUrl)) {

    surveySetSessionCookie(surveySessionCookieName, surveySessionCookieValue);
    
    // The incidence rate... 100 = everyone, -1 = no one
    var INCIDENCE = 100;

    // --
    var theDate = new Date();
    var month;
    month = theDate.getMonth();
    month = month + 3;
    theDate.setMonth(month); // this is all for the cookie expiry
    var colorscheme = "#3399fd;text-decoration:none;"; // for border and link colour
    var d = document.createElement("div"); // create the invitation layer
    var winHeight = (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    if (self.innerHeight) { // for Safari (or all but Explorer)
        winHeight = self.innerHeight;
    }

    // now style it
    d.style.borderStyle = "solid";
    d.style.borderWidth = "2px";
    d.style.borderColor = "#333333";
    d.style.width = "500px";
    //d.style.height="220px";
    d.style.fontFamily = "verdana,sans-serif";
    d.style.fontSize = "12px";
    d.style.textAlign = "center";
    d.style.zIndex = "100";
    d.style.padding = "10px";
    d.style.position = "absolute";
    d.style.left = ((document.body.clientWidth / 2) - 250) + "px";
    d.style.top = ((winHeight / 2) - 110) + "px";
    d.style.backgroundColor = "#ffffff";


    // Set valid sites. Used to identify if page is a survey page
    // D delayed, I Immidiate
    // Stop survey with incidence = -1 
    var Sites = [

"www.ikea.com/au/en", "aue", "en", "D", 20, "TS", "ms", "en_AU", "au", "en",
"www.ikea.com/aa/en", "auw", "en", "D", 25, "TS", "ms", "en_AA", "aa", "en",
"www.ikea.com/at/de", "at", "de-at,sl,it", "D", 60, "TS", "ms", "de_AT", "at", "de",
"www.ikea.com/be/nl", "be", "nl-be,fr", "D", 30, "TS", "ms", "nl_BE", "be", "nl",
"www.ikea.com/be/fr", "be", "fr,nl-be", "D", 30, "TS", "ms", "fr_BE", "be", "fr",
"www.ikea.com/ca/en", "ca", "en,fr-ca", "D", 40, "TS", "ms", "en_CA", "ca", "en",
"www.ikea.com/ca/fr", "ca", "fr-ca,en", "D", 40, "TS", "ms", "fr_CA", "ca", "fr",
"www.ikea.com/cn/en", "cn", "zh-cn,en", "D", 70, "TS", "ms", "en_CN", "cn", "en",
"www.ikea.com/cn/zh", "cn", "zh-cn,en", "D", 70, "TS", "ms", "zh_CN", "cn", "zh",
"www.ikea.com.cy", "cy", "el,en", "D", 100, "-", " ", "-", " ", " ",
"www.ikea.com/cz/cs", "cz", "cs,en", "D", 15, "TS", "ms", "cs_CZ", "cz", "cs",
"www.ikea.com/dk/da", "dk", "da,en", "D", 25, "TS", "ms", "da_DK", "dk", "da",
"www.ikea.com.do", "do", "es", "D", 100, "-", " ", "-", " ", " ",
"www.ikea.com/fi/fi", "fi", "fi,se", "D", 20, "TS", "ms", "fi_FI", "fi", "fi",
"www.ikea.com/fr/fr", "fr", "fr", "D", 60, "TS", "ms", "fr_FR", "fr", "fr",
"www.ikea.com/de/de", "de", "de,tr,ru", "D", 50, "TS", "ms", "de_DE", "de", "de",
"www.ikea.gr", "gr", "el", "D", 100, "-", " ", "-", " ", " ",
"www.ikea.com/hk/zh", "hk", "zh-hk,en", "D", 100, "TS", "ms", "zh_HK", "hk", "zh",
"www.ikea.com/hk/en", "hk", "en,zh-hk", "D", 100, "TS", "ms", "en_HK", "hk", "en",
"www.ikea.com/hu/hu", "hu", "hu,en", "D", 5, "TS", "ms", "hu_HU", "hu", "hu",
"www.ikea.is", "is", "is,en", "D", 40, "-", " ", "-", " ", " ",
"www.ikea.com/ie/en", "ie", "en", "D", 20, "TS", "ms", "en_IE", "ie", "en",
"www.ikea.co.il", "il", "he,en,ar", "D", 40, "-", " ", "-", " ", " ",
"www.ikea.com/it/it", "it", "it,en,sl", "D", 20, "TS", "ms", "it_IT", "it", "it",
"www.ikea.com/jp/en", "jp", "en,ja", "D", 10, "TS", "ms", "en_JP", "jp", "en",
"www.ikea.com/jp/ja", "jp", "ja,en", "D", 10, "TS", "ms", "ja_JP", "jp", "ja",
"www.ikea.com.kw", "kw", "ar,en", "D", 100, "-", " ", "-", " ", " ",
"www.ikea.com/my/en", "my", "my,en", "D", 50, "TS", "ms", "en_MY", "my", "en",
"www.ikea.com/nl/nl", "nl", "nl,de", "D", 20, "TS", "ms", "nl_NL", "nl", "nl",
"www.ikea.com/no/no", "no", "no", "D", 30, "TS", "ms", "no_NO", "no", "no",
"www.ikea.com/pl/pl", "pl", "pl", "D", 10, "TS", "ms", "pl_PL", "pl", "pl",
"www.ikea.com/pt/pt", "pt", "pt", "D", 10, "TS", "ms", "pt_PT", "pt", "pt",
"www.ikea.com/ro/ro", "ro", "ro", "D", 10, "TS", "ms", "ro_RO", "ro", "ro",
"www.ikea.com/ru/ru", "ru", "ru", "D", 30, "TS", "ms", "ru_RU", "ru", "ru",
"www.ikea.com.sa", "sa", "ar,en", "D", 100, "-", " ", "-", " ", " ",
"www.ikea.com.sa/index.php?lang=en", "sa", "en,ar", "D", 100, "-", " ", "-", " ", " ",
"www.ikea.com/sg/en", "sg", "en,zh-cn,my", "D", 100, "TS", "ms", "en_SG", "sg", "en",
"www.ikea.com/sk/sk", "sk", "sk,en", "D", 10, "TS", "ms", "sk_SK", "sk", "sk",
"www.ikea.com/es/es", "es", "es,en", "D", 20, "TS", "ms", "es_ES", "es", "es",
"islas.ikea.es/IKEA-islas.php", "esi", "es", "D", 100, "-", " ", "-", " ", " ",
"www.ikea.com/se/sv", "se", "se,fi,en", "D", 30, "TS", "ms", "sv_SE", "se", "sv",
"www.ikea.com/ch/de", "ch", "de,fr,it", "D", 50, "TS", "ms", "de_CH", "ch", "de",
"www.ikea.com/ch/fr", "ch", "fr,de,it", "D", 50, "TS", "ms", "fr_CH", "ch", "fr",
"www.ikea.com/ch/it", "ch", "it,fr,de", "D", 50, "TS", "ms", "it_CH", "ch", "it",
"www.ikea.com/tw/zh", "tw", "zh-tw,en", "D", 40, "TS", "ms", "zh_TW", "tw", "zh",
"www.ikea.com.tr", "tr", "tr", "D", 75, "-", " ", "-", " ", " ",
"www.ikea.com/ae/en", "ae", "en,ar", "D", 100, "TS", "ms", "en_AE", "ae", "en",
"www.ikea.com/gb/en", "uk", "en", "D", 70, "TS", "ms", "en_GB", "gb", "en",
"www.ikea.com/us/en", "us", "en,es-us", "D", 60, "TS", "ms", "en_US", "us", "en",
"www.ikea.com/th/en", "th", "en", "D", -1, "TS", "ms", "en_TH", "th", "en",
"www.ikea.com/th/th", "th", "en", "D", -1, "TS", "ms", "th_TH", "th", "th",
"www.ikea.com/se/en", "se", "se,fi,en", "D", -1, "TS", "ms", "en_SE", "se", "en"

];


        var immediateStartURL = "https://five.surveys.com/projects/j582974/startsurvey.asp";

        var inviteLanguages = "";
        var inviteLanguageSelected;
        var inviteCountry = "";
        var inviteIncidence = -1;
        var inviteSite = "";
        var inviteType = "";
        var inviteLine1 = [];
        var inviteLine2 = [];
        var inviteLine3 = [];
        var inviteYes = [];
        var inviteNo = [];
        var inviteSurveyLink = "";
        var inviteSurveyOnClick = "";
        var inviteTextDirection = "ltr";
        var surveyTsWeb;
        var surveyParentFolder = "";
        var surveyHeartbeatFolder = "";
        var surveyCountry = "";
        var surveyLanguage= "";
 

 
        surveyHref = surveyHref.replace("http://","");
        surveyHref = surveyHref.replace("#","/");
        var surveyPathArray = surveyHref.split( '/' );
 
        var iter;

        for (iter = 0; iter < Sites.length; iter += 10) {
            
            surveyTsWeb = Sites[iter + 5];
            
            if (surveyTsWeb === "TS")  {
                
                if (surveyIsSite(surveyPathArray, Sites, iter)) {
                    inviteSite = Sites[iter];
                    inviteCountry = Sites[iter + 1];
                    inviteLanguages = Sites[iter + 2];
                    inviteType = Sites[iter + 3];
                    inviteIncidence = Sites[iter + 4];  
                    surveyHeartbeatFolder = Sites[iter + 7];
                    break;
                }
            }
        }

       
        // language templates



        inviteLine1["en"] = "Help us to improve!";
        inviteLine2["en"] = "Would you like to participate in our short survey?";
        inviteLine3["en"] = "If you agree to take part the survey will start when you finish your visit to IKEA.com today";
        inviteYes["en" ] = "Take Part";
        inviteNo["en"] = "No thanks";

        inviteLine1["fr"] = "Aidez-nous &#224; nous am&#233;liorer !";
        inviteLine2["fr"] = "Souhaiteriez-vous participer &#224; une petite enqu&#234;te ?";
        inviteLine3["fr"] = "Si vous acceptez de prendre part, l'enqu&#234;te commencera aujourd'hui &#224; la fin de votre visite sur IKEA.com";
        inviteYes["fr"] = "Prendre part";
        inviteNo["fr"] = "Non, merci";

        inviteLine1["da"] = "Hj&#230;lp os med at blive bedre!";
        inviteLine2["da"] = "Har du lyst til at deltage i vores korte unders&#248;gelse?";
        inviteLine3["da"] = "Hvis du vil v&#230;re med, starter unders&#248;gelsen, n&#229;r du afslutter dit bes&#248;g hos IKEA.com i dag";
        inviteYes["da"] = "Deltag";
        inviteNo["da"] = "Nej tak";


        inviteLine1["cs"] = "Pomozte n&#225;m zlep&#353;it se!";
        inviteLine2["cs"] = "Cht&#283;l/a byste se z&#250;&#269;astnit na&#353;eho kr&#225;tk&#233;ho pr&#367;zkumu?";
        inviteLine3["cs"] = "Pokud se chcete z&#250;&#269;astnit, pr&#367;zkum za&#269;ne, jakmile ukon&#269;&#237;te dne&#353;n&#237; n&#225;v&#353;t&#283;vu webov&#233; str&#225;nky IKEA.com";
        inviteYes["cs"] = "Z&#250;&#269;astnit se";
        inviteNo["cs"] = "Ne, d&#283;kuji";

        inviteLine1["fi"] = "Kerro mielipiteesi!";
        inviteLine2["fi"] = "Haluaisitko osallistua lyhyeen kyselyymme?";
        inviteLine3["fi"] = "Jos haluat osallistua, kysely k&#228;ynnistyy, kun poistut IKEA-sivustolta.";
        inviteYes["fi"] = "Haluan osallistua";
        inviteNo["fi"] = "Ei kiitos";

        inviteLine1["el"] = "&#914;&#959;&#951;&#952;&#942;&#963;&#964;&#949; &#956;&#945;&#962; &#957;&#945; &#946;&#949;&#955;&#964;&#953;&#969;&#952;&#959;&#973;&#956;&#949;!";
        inviteLine2["el"] = "&#920;&#945; &#952;&#941;&#955;&#945;&#964;&#949; &#957;&#945; &#955;&#940;&#946;&#949;&#964;&#949; &#956;&#941;&#961;&#959;&#962; &#963;&#964;&#951; &#963;&#973;&#957;&#964;&#959;&#956;&#951; &#941;&#961;&#949;&#965;&#957;&#940; &#956;&#945;&#962;;";
        inviteLine3["el"] = "&#917;&#940;&#957; &#963;&#965;&#956;&#966;&#969;&#957;&#942;&#963;&#949;&#964;&#949; &#957;&#945; &#955;&#940;&#946;&#949;&#964;&#949; &#956;&#941;&#961;&#959;&#962;, &#951; &#941;&#961;&#949;&#965;&#957;&#945; &#952;&#945; &#958;&#949;&#954;&#953;&#957;&#942;&#963;&#949;&#953; &#972;&#964;&#945;&#957; &#964;&#949;&#961;&#956;&#945;&#964;&#943;&#963;&#949;&#964;&#949; &#964;&#951;&#957; &#949;&#960;&#943;&#963;&#954;&#949;&#968;&#942; &#963;&#945;&#962; &#963;&#964;&#959;  IKEA.com &#963;&#942;&#956;&#949;&#961;&#945;";
        inviteYes["el"] = "&#920;&#945; &#955;&#940;&#946;&#969; &#956;&#941;&#961;&#959;&#962;";
        inviteNo["el"] = "&#908;&#967;&#953;, &#949;&#965;&#967;&#945;&#961;&#953;&#963;&#964;&#974;";

        inviteLine1["he"] = "&#1506;&#1494;&#1493;&#1512; &#1500;&#1504;&#1493; &#1500;&#1492;&#1513;&#1514;&#1508;&#1512;!";
        inviteLine2["he"] = "&#1492;&#1488;&#1501; &#1492;&#1497;&#1497;&#1514; &#1512;&#1493;&#1510;&#1492; &#1500;&#1492;&#1513;&#1514;&#1514;&#1507; &#1489;&#1505;&#1511;&#1512; &#1492;&#1511;&#1510;&#1512; &#1513;&#1500;&#1504;&#1493;?";
        inviteLine3["he"] = "&#1488;&#1501; &#1514;&#1505;&#1499;&#1497;&#1501; &#1500;&#1511;&#1495;&#1514; &#1495;&#1500;&#1511; &#1489;&#1505;&#1511;&#1512;, &#1492;&#1493;&#1488; &#1497;&#1514;&#1495;&#1497;&#1500; &#1499;&#1513;&#1514;&#1505;&#1497;&#1497;&#1501; &#1488;&#1514; &#1492;&#1489;&#1497;&#1511;&#1493;&#1512; &#1513;&#1500;&#1498; &#1489;-IKEA.com &#1492;&#1497;&#1493;&#1501;";
        inviteYes["he"] = "&#1500;&#1511;&#1495;&#1514; &#1495;&#1500;&#1511; &#1489;&#1505;&#1511;&#1512;";
        inviteNo["he"] = "&#1500;&#1488; &#1514;&#1493;&#1491;&#1492;";

        inviteLine1["hu"] = "Seg&#237;ts benn&#252;nket a fejl&#337;d&#233;sben!";
        inviteLine2["hu"] = "Szeretn&#233;l r&#233;szt venni r&#246;vid felm&#233;r&#233;s&#252;nkben?";
        inviteLine3["hu"] = "Ha beleegyezel a r&#233;szv&#233;telbe, a felm&#233;r&#233;s akkor kezd&#337;dik meg, ha befejezted mai l&#225;togat&#225;sodat az IKEA.com oldalon.";
        inviteYes["hu"] = "R&#233;szt veszek";
        inviteNo["hu"] = "K&#246;sz&#246;n&#246;m, nem";        

        inviteLine1["it"] = "Ci aiuti a migliorare?";
        inviteLine2["it"] = "Vuoi prendere parte ad un breve sondaggio?";
        inviteLine3["it"] = "Se accetti di partecipare, il sondaggio verr&#224; lanciato al termine della tua visita di oggi su IKEA.com.";
        inviteYes["it"] = "Partecipa";
        inviteNo["it"] = "No, grazie";

         inviteLine1["no"] = "Hjelp oss &#229; bli bedre!";
        inviteLine2["no"] = "Har du lyst til &#229; delta i en unders&#248;kelse?";
        inviteLine3["no"] = "Hvis du velger &#229; delta, starter unders&#248;kelsen n&#229;r du avslutter dagens bes&#248;k p&#229; IKEA.no.";
        inviteYes["no"] = "Delta";
        inviteNo["no"] = "Nei takk";


        inviteLine1["pl"] = "Prosimy o pomoc w podniesieniu jako&#347;ci naszych us&#322;ug!";
        inviteLine2["pl"] = "Czy chcia&#322;(a)by Pan(i) wzi&#261;&#263; udzia&#322; w kr&#243;tkiej ankiecie?";
        inviteLine3["pl"] = "Je&#380;eli wyrazi Pan(i) zgod&#281;, ankieta rozpocznie si&#281; po zako&#324;czeniu Pana(-i) dzisiejszej wizyty w IKEA.com.";
        inviteYes["pl"] = "Chc&#281; wzi&#261;&#263; udzia&#322;";
        inviteNo["pl"] = "Nie, dzi&#281;kuj&#281; ";


        inviteLine1["rm"] = "Ajuta&#355;i-ne s&#259; fim mai buni!";
        inviteLine2["rm"] = "Dori&#355;i s&#259; participa&#355;i la sondajul nostru scurt?";
        inviteLine3["rm"] = "Dac&#259; sunte&#355;i de acord s&#259; participa&#355;i, sondajul va &#238;ncepe la &#238;ncheierea vizitei dumneavoastr&#259; de ast&#259;zi de pe IKEA.com";
        inviteYes["rm"] = "Vreau s&#259; iau parte";
        inviteNo["rm"] = "Nu, mul&#355;umesc ";

        inviteLine1["sl"] = "Pomagajte nam biti bolj&#353;i!";
        inviteLine2["sl"] = "Si &#382;elite sodelovati v na&#353;i kratki anketi?";
        inviteLine3["sl"] = "&#268;e se boste strinjali, se bo anketa za&#269;ela, ko boste kon&#269;ali svoj dana&#353;nji obisk spletnega mesta IKEA.com.";
        inviteYes["sl"] = "&#381;elim sodelovati";
        inviteNo["sl"] = "Ne, hvala";

        inviteLine1["es-us"] = "&#161;Ay&#250;denos a mejorar!";
        inviteLine2["es-us"] = "&#191;Le gustar&#237;a participar en nuestra peque&#241;a encuesta?";
        inviteLine3["es-us"] = "Si acepta participar, la encuesta comenzar&#225; cuando termine su visita a IKEA.com hoy.";
        inviteYes["es-us"] = "Participar";
        inviteNo["es-us"] = "No, gracias";

        inviteLine1["fr-ca"] = "Aidez-nous &#224; nous am&#233;liorer!";
        inviteLine2["fr-ca"] = "Aimeriez-vous participer &#224; notre court sondage?";
        inviteLine3["fr-ca"] = "Si vous acceptez de participer, le sondage commencera lorsque vous aurez termin&#233; de visiter IKEA.com";
        inviteYes["fr-ca"] = "Je d&#233;sire participer";
        inviteNo["fr-ca"] = "Non, merci";

        inviteLine1["ru"] = "&#1055;&#1086;&#1084;&#1086;&#1075;&#1080;&#1090;&#1077; &#1085;&#1072;&#1084; &#1089;&#1090;&#1072;&#1090;&#1100; &#1083;&#1091;&#1095;&#1096;&#1077;!";
        inviteLine2["ru"] = "&#1042;&#1099; &#1093;&#1086;&#1090;&#1077;&#1083;&#1080; &#1073;&#1099; &#1087;&#1088;&#1080;&#1085;&#1103;&#1090;&#1100; &#1091;&#1095;&#1072;&#1089;&#1090;&#1080;&#1077; &#1074; &#1082;&#1086;&#1088;&#1086;&#1090;&#1082;&#1086;&#1084; &#1080;&#1089;&#1089;&#1083;&#1077;&#1076;&#1086;&#1074;&#1072;&#1085;&#1080;&#1080;?";
        inviteLine3["ru"] = "&#1045;&#1089;&#1083;&#1080; &#1074;&#1099; &#1089;&#1086;&#1075;&#1083;&#1072;&#1089;&#1080;&#1090;&#1077;&#1089;&#1100; &#1091;&#1095;&#1072;&#1089;&#1090;&#1074;&#1086;&#1074;&#1072;&#1090;&#1100;, &#1090;&#1086; &#1089;&#1084;&#1086;&#1078;&#1077;&#1090;&#1077; &#1087;&#1088;&#1080;&#1089;&#1090;&#1091;&#1087;&#1080;&#1090;&#1100; &#1082; &#1080;&#1089;&#1089;&#1083;&#1077;&#1076;&#1086;&#1074;&#1072;&#1085;&#1080;&#1102;, &#1082;&#1086;&#1075;&#1076;&#1072; &#1079;&#1072;&#1082;&#1088;&#1086;&#1077;&#1090;&#1077; &#1089;&#1072;&#1081;&#1090; IKEA.com. ";
        inviteYes["ru"] = "&#1055;&#1088;&#1080;&#1085;&#1103;&#1090;&#1100; &#1091;&#1095;&#1072;&#1089;&#1090;&#1080;&#1077;";
        inviteNo["ru"] = "&#1053;&#1077;&#1090;, &#1089;&#1087;&#1072;&#1089;&#1080;&#1073;&#1086;";

        inviteLine1["zh-hk"] = "&#24171;&#21161;&#25105;&#20497;&#25913;&#21892;&#65281;";
        inviteLine2["zh-hk"] = "&#24744;&#39000;&#24847;&#21443;&#33287;&#25105;&#20497;&#30340;&#31777;&#30701;&#35519;&#26597;&#21966;&#65311;";
        inviteLine3["zh-hk"] = "&#22914;&#26524;&#24744;&#21516;&#24847;&#21443;&#33287;&#65292;&#21063;&#22312;&#24744;&#36896;&#35370;&#23436; IKEA.com &#24460;&#65292;&#21363;&#38283;&#22987;&#26412;&#35519;&#26597;";
        inviteYes["zh-hk"] = "&#21443;&#33287;";
        inviteNo["zh-hk"] = "&#19981;&#21443;&#33287;&#65292;&#35613;&#35613;";
        
        inviteLine1["zh-tw"] = "&#24744;&#30340;&#24847;&#35211;&#26159;&#25105;&#20497;&#36914;&#27493;&#30340;&#21205;&#21147;&#65281;";
        inviteLine2["zh-tw"] = "IKEA&#35488;&#25711;&#36992;&#35531;&#24744;&#21443;&#33287;&#21839;&#21367;&#35519;&#26597;&#65292;&#25552;&#20379;&#24744;&#23542;&#36020;&#30340;&#24847;&#35211;&#12290;";
        inviteLine3["zh-tw"] = "&#22914;&#26524;&#24744;&#39000;&#24847;&#21443;&#21152;&#65292;&#21839;&#21367;&#35519;&#26597;&#23559;&#26371;&#22312;&#24744;&#28687;&#35261;&#23436;IKEA&#32178;&#31449;&#12289;&#38626;&#38283;&#25110;&#38364;&#38281;&#35222;&#31383;&#24460;&#38283;&#22987;&#36914;&#34892;&#12290;";
        inviteYes["zh-tw"] = "&#25105;&#39000;&#24847;&#21443;&#21152;";
        inviteNo["zh-tw"] = "&#19981;&#29992;&#20102;&#65292;&#35613;&#35613;";

        inviteLine1["zh-cn"] = "&#24110;&#21161;&#25105;&#20204;&#25913;&#36827;&#65281;";
        inviteLine2["zh-cn"] = "&#24744;&#26159;&#21542;&#24895;&#24847;&#21442;&#19982;&#25105;&#20204;&#30340;&#31616;&#30701;&#35843;&#26597;&#65311;";
        inviteLine3["zh-cn"] = "&#22914;&#26524;&#21516;&#24847;&#21442;&#19982;&#65292;&#24744;&#29616;&#22312;&#27983;&#35272;&#23436; IKEA.com &#21518;&#21363;&#21487;&#24320;&#22987;&#20570;&#35843;&#26597;&#38382;&#21367;";
        inviteYes["zh-cn"] = "&#21442;&#19982;";
        inviteNo["zh-cn"] = "&#19981;&#65292;&#35874;&#35874;";

        inviteLine1["is"] = "Hj&#225;lpa&#240;u okkur a&#240; b&#230;ta okkur?";
        inviteLine2["is"] = "Viltu taka &#254;&#225;tt &#237; stuttri k&#246;nnun okkar?";
        inviteLine3["is"] = "Ef &#254;&#250; sam&#254;ykkir a&#240; taka &#254;&#225;tt mun k&#246;nnunin hefjast &#254;egar &#254;&#250; l&#253;kur heims&#243;kn &#254;inni &#225; IKEA.is &#237; dag";
        inviteYes["is"] = "Taka &#254;&#225;tt";
        inviteNo["is"] = "Nei takk";

        inviteLine1["ja"] = "&#12469;&#12540;&#12499;&#12473;&#25913;&#21892;&#12395;&#12372;&#21332;&#21147;&#19979;&#12373;&#12356;&#12290;";
        inviteLine2["ja"] = "&#24330;&#31038;&#12398;&#31777;&#21336;&#12394;&#35519;&#26619;&#12395;&#12372;&#21332;&#21147;&#38914;&#12369;&#12414;&#12377;&#12363;?";
        inviteLine3["ja"] = "&#35519;&#26619;&#12408;&#12398;&#12372;&#21442;&#21152;&#12395;&#21516;&#24847;&#12373;&#12428;&#12383;&#22580;&#21512;&#12399;&#12289;&#12362;&#23458;&#27096;&#12364;&#26412;&#26085;IKEA.com &#12408;&#12398;&#12450;&#12463;&#12475;&#12473;&#12434;&#32066;&#20102;&#12375;&#12383;&#24460;&#12391;&#35519;&#26619;&#12364;&#22987;&#12414;&#12426;&#12414;&#12377;&#12290;";
        inviteYes["ja"] = "&#21442;&#21152;&#12377;&#12427;";
        inviteNo["ja"] = "&#21442;&#21152;&#12375;&#12394;&#12356;";

        inviteLine1["tr"] = "Geli&#351;memiz i&#231;in bize yard&#305;m edin!";
        inviteLine2["tr"] = "K&#305;sa anketimize kat&#305;lmak ister misiniz?";
        inviteLine3["tr"] = "Ankete kat&#305;lmay&#305; kabul etti&#287;iniz takdirde, anket IKEA.com.tr'den &#231;&#305;kt&#305;&#287;&#305;n&#305;z zaman ba&#351;layacakt&#305;r.";
        inviteYes["tr"] = "Kat&#305;l";
        inviteNo["tr"] = "Hay&#305;r, te&#351;ekk&#252;r ederim.";

        inviteLine1["se"] = "Hj&#228;lp oss att bli b&#228;ttre!";
        inviteLine2["se"] = "Vill du delta i v&#229;r korta unders&#246;kning?";
        inviteLine3["se"] = "Om du vill delta s&#229; b&#246;rjar unders&#246;kningen n&#228;r du har avslutat ditt bes&#246;k p&#229; IKEA.com i dag.";
        inviteYes["se"] = "Delta";
        inviteNo["se"] = "Nej, tack";



        inviteLine1["nl"] = "Help ons te verbeteren!";
        inviteLine2["nl"] = "Wilt u meedoen aan een kort onderzoek?";
        inviteLine3["nl"] = "Als u meedoet, begint het onderzoek wanneer u de IKEA-site verlaat.";
        inviteYes["nl"] = "Ik doe mee";
        inviteNo["nl"] = "Nee, bedankt";    



        inviteLine1["pt"] = "Ajude-nos a melhorar!";
        inviteLine2["pt"] = "Gostaria de participar num breve inqu&#233;rito que temos para si?";
        inviteLine3["pt"] = "Se concordar em participar, o inqu&#233;rito ter&#225; in&#237;cio assim que concluir a sua visita a IKEA.com hoje";
        inviteYes["pt"] = "Participar";
        inviteNo["pt"] = "N&#227;o, obrigado(a)";    


        inviteLine1["ar"] = "&#1587;&#1575;&#1593;&#1583;&#1606;&#1575; &#1601;&#1610; &#1578;&#1591;&#1608;&#1610;&#1585; &#1571;&#1606;&#1601;&#1587;&#1606;&#1575;!";
        inviteLine2["ar"] = "&#1607;&#1604; &#1578;&#1585;&#1610;&#1583; &#1575;&#1604;&#1605;&#1588;&#1575;&#1585;&#1603;&#1577; &#1601;&#1610; &#1575;&#1604;&#1583;&#1585;&#1575;&#1587;&#1577; &#1575;&#1604;&#1602;&#1589;&#1610;&#1585;&#1577;&#1567;";        
        inviteLine3["ar"] = "&#1573;&#1584;&#1575; &#1603;&#1606;&#1578; &#1578;&#1608;&#1575;&#1601;&#1602; &#1593;&#1604;&#1609; &#1575;&#1604;&#1605;&#1588;&#1575;&#1585;&#1603;&#1577; &#1601;&#1587;&#1578;&#1576;&#1583;&#1571; &#1575;&#1604;&#1583;&#1585;&#1575;&#1587;&#1577; &#1593;&#1606;&#1583; &#1575;&#1604;&#1575;&#1606;&#1578;&#1607;&#1575;&#1569; &#1605;&#1606; &#1586;&#1610;&#1575;&#1585;&#1578;&#1603; &#1604;&#1605;&#1608;&#1602;&#1593; IKEA.com &#1575;&#1604;&#1610;&#1608;&#1605;";
        inviteYes["ar"] = "&#1587;&#1571;&#1588;&#1575;&#1585;&#1603;";
        inviteNo["ar"] = "&#1604;&#1575; &#1588;&#1603;&#1585;&#1575;";

        inviteLine1["de"] = "Wir m&#246;chten noch besser werden. Helfen Sie uns dabei!";
        inviteLine2["de"] = "M&#246;chten Sie an unserer kurzen Umfrage teilnehmen?";        
        inviteLine3["de"] = "Wenn Sie an der Umfrage teilnehmen m&#246;chten, startet diese, sobald Sie Ihren heutigen Besuch bei IKEA.com beendet haben.";
        inviteYes["de"] = "Teilnehmen";
        inviteNo["de"] = "Nein danke";

        inviteLine1["es"] = "&#161;Ay&#250;denos a mejorar!";
        inviteLine2["es"] = "&#191;Le gustar&#237;a participar en nuestra breve encuesta?";        
        inviteLine3["es"] = "Si desea participar, la encuesta empezar&#225; cuando termine la visita de hoy a IKEA.com.";
        inviteYes["es"] = "Participar";
        inviteNo["es"] = "No, gracias";        

        inviteLine1["sk"] = "Pom&#244;&#382;te n&#225;m, aby sme sa zlep&#353;ovali!";
        inviteLine2["sk"] = "Chceli by ste sa z&#250;&#269;astni&#357; na na&#353;om kr&#225;tkom prieskume?";        
        inviteLine3["sk"] = "Pokia&#318; s&#250;hlas&#237;te so svojou &#250;&#269;as&#357;ou, anketa za&#269;ne, ke&#271; ukon&#269;&#237;te svoju dne&#353;n&#250; n&#225;v&#353;tevu na IKEA.com";
        inviteYes["sk"] = "Z&#250;&#269;astn&#237;m sa";
        inviteNo["sk"] = "Nie, &#271;akujem ";        

        inviteLine1["my"] = "Bantulah kami untuk menjadi lebih baik!";
        inviteLine2["my"] = "Mahukah anda sertai kaji selidik ringkas kami?";        
        inviteLine3["my"] = "Kalau anda bersetuju untuk ikut serta, kaji selidik ini akan bermula apabila anda selesai kunjungan anda ke IKEA.com hari ini";
        inviteYes["my"] = "Ikut serta";
        inviteNo["my"] = "Tidak, terima kasih";

        inviteLine1["nl-be"] = "Help ons te verbeteren!";
        inviteLine2["nl-be"] = "Wilt u meedoen aan een korte enqu&#234;te";
        inviteLine3["nl-be"] = "Als u meedoet, begint de enqu&#234;te wanneer u de IKEA-site verlaat";
        inviteYes["nl-be"] = "Ik doe mee";
        inviteNo["nl-be"] = "Nee, bedankt";

        inviteLine1["de-at"] = "Wir m&#246;chten stets besser werden. Hilf uns dabei!";
        inviteLine2["de-at"] = "Hier kannst du an unserer kurzen Umfrage teilnehmen.";
        inviteLine3["de-at"] = "Wenn du mitmachen m&#246;chtest, klick auf 'Teilnehmen'. Du kannst den Fragebogen dann nach deinem Besuch auf www.IKEA.at ausf&#252;llen.";
        inviteYes["de-at"] = "Teilnehmen";
        inviteNo["de-at"] = "Nein danke";
        
        inviteLine1["ro"] = "Doriti sa participati la sondajul nostru scurt?";
        inviteLine2["ro"] = "Daca sunteti de acord sa participati, sondajul va &#238;ncepe";
        inviteLine3["ro"] = "&#238;ntr-o noua fereasta, la &#238;ncheierea vizitei dumneavoastra de astazi de pe IKEA.ro";
        inviteYes["ro"] = "Vreau sa particip";
        inviteNo["ro"] = "Nu, multumesc";
        
        if (inviteIncidence > -1) {
            INCIDENCE = inviteIncidence;
        }
        else
        {
            INCIDENCE = -1;
        }
        
        if (INCIDENCE == undefined)
        {
            INCIDENCE=-1; // ie we just don't pop them
        }  

        d.style.display="none";
        var popStart = "<p></p><p>";
        

        createInviteHTML(inviteLanguages.split(/,/)[0]);
        survey_cookie = survey2CookieName(Sites, "1");
        if (inviteCountry == "GFK") { survey_cookie += Math.random().toString() } 
        d.style.display="block";


        // check if mySite found
        if(inviteSite != "")
        {

            // check against incidence rate (100=everyone, -1 = no one)
            //var thisCookie = parseInt(get_cookie(survey_cookie));
            var thisCookie = get_cookie(survey_cookie);
            var surveyDisplayCount = 1; //The number of times a user must enter a valid survey page before it display

            if ( (thisCookie== '') || (thisCookie== '-1'))
            {
                    if(incidence_rate(INCIDENCE))
                    {
                        set_cookie(survey_cookie,"1");
                        if(surveyDisplayCount == 1)
                        {
                            window.setTimeout("document.body.appendChild(d)",1500); // pop up question after 1.5 secs
                        }
                    }
            }
        }
    }


//True if survey page found
function surveyPage(index, surveyStart, surveyEnd) {
    return index >= surveyStart && index <= surveyEnd;
}

//Builds the cookiename for survey2
function survey2CookieName(sites, index) {
    var firstPart = "686160_survey2_";
    return firstPart + sites[index];
}

//Builds the HTML for survey
function surveyHTML(index, sites, surveyHeading, surveyBody, surveyParticipate, surveyNoThanks) {


    var inputStyle = "";

    var htmlString = "<b>#helpHeading</b>" + "<p>#helpBody</p><br/>" + "<input #inputStyle1 type=\"button\" onclick=\"run_survey('#inMarket');return false;\" value=\"#participate\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<input #inputStyle2 type=\"button\" onclick=\"close_popup()();return false;\" value=\"#noThanks\">";
    return htmlString.
    replace("#inputStyle1", inputStyle).
    replace("#inputStyle2", inputStyle).
    replace("#inMarket", sites[index]).
    replace("#helpHeading", surveyHeading[index]).
    replace("#helpBody", surveyBody[index]).
    replace("#participate", surveyParticipate[index]).
    replace("#noThanks", surveyNoThanks[index]);
}

function close_popup() {
    d.style.display = "none";
}

var surveyPopupWindow;
var looper;

// Path to the heartbeat html file 

if (surveyTsWeb === "TS") {
    HeartBeatPath = "/ms/" + surveyHeartbeatFolder +"/heartbeat.htm";
}


function run_survey(inMarket) {


    if (inviteType == "D") {
        thisSurvey = window.open(HeartBeatPath + "?l=" + inviteLanguageSelected + "&c=" + inviteCountry, "_blank", "resizable=yes,scrollbars=yes"); // open the heartbeat window - this will check the opener until it can't any more - ie we've left the opening domain
    }
    else {
        thisSurvey = window.open(immediateStartURL + "?lang=" + inviteLanguageSelected + "&country=" + inviteCountry, "_blank", "resizable=yes,scrollbars=yes"); // open the heartbeat window - this will check the opener until it can't any more - ie we've left the opening domain
    }
    window.focus();
    close_popup();
    
    thisSurvey.focus();
    close_popup();
}

function checker() {
    try {
        myopener = surveyPopupWindow.location.href;
    }
    catch (err) {
        window.clearInterval(looper);
        close_popup();
    }
}

// Functions to set, get and delete cookies
// First, to set a cookie - set a 3 month expiry date. Year is handled automatically if the month spills over
function set_cookie(cookiename, value) {
    document.cookie = cookiename + "=" + value + ";expires=" + theDate.toGMTString() + ";path=/";
}

function get_cookie(cookiename) {
    // document.cookie gives us a list of all the cookies from this domain
    // we need to find just the cookie we are interested in
    // take a substring between "cookiename=" and ";" - this is the value of the cookie
    // this function will return either the value of the cookie, or a null value if it's not there
    var nameStr = cookiename + "=";
    var maxLen = document.cookie.length
    var i = 0
    while (i < maxLen) {
        var j = i + nameStr.length
        if (document.cookie.substring(i, j) == nameStr) {
            var cookieEnd = document.cookie.indexOf(";", j);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            return unescape(document.cookie.substring(j, cookieEnd));
        }
        i++
    }
    return "";
}

// simply erase the cookie by making it expire before now
function erase_cookie(cookiename) {
    document.cookie = cookiename + "=0;expires=Sun, 26 Mar-2000 12:00:00 GMT;path=/";
}

// do they accept cookies?
// simply drop a test cookie and try to retrieve it. if it's not there, they don't take cookies
function check_cookie_accept() {
    set_cookie('testaccept', '1');
    var ck = get_cookie('testaccept');
    if (ck == 1) {
        return 1;
    }
    else {
        return 0;
    }
    // erase it for good measure
    erase_cookie('testaccept');
}

function incidence_rate(incidence) {
    var percentage = incidence;
    var randNum = Math.round(Math.random() * 100);

    if (randNum <= percentage) {
        return 1; // success
    }
    else {
        return 0; // failed
    }
}

function createInviteHTML(inviteLanguage) {

    inviteTextDirection = "ltr";


    if (inviteLanguage == "getFromSelect") {
        inviteLanguage = document.getElementById("inviteSelectLanguage").value;
    }

    //alert(inviteLanguage); 
    var inviteLanguagesArray = inviteLanguages.split(/,/);
    var inviteHTML = "";

    inviteLanguageSelected = inviteLanguagesArray[0];


    if (inviteLanguagesArray.length > 1) {
        inviteHTML += "<div align=\"right\"><select id=\"inviteSelectLanguage\" onchange=\"createInviteHTML('getFromSelect')\">";
        for (iter = 0; iter < inviteLanguagesArray.length; iter++) {
            inviteHTML += "<option value=\"" + inviteLanguagesArray[iter] + "\"";
            if (inviteLanguagesArray[iter] == inviteLanguage) {
                inviteHTML += " selected = \"selected\" ";
                inviteLanguageSelected = inviteLanguagesArray[iter];
            }
            inviteHTML += ">" + friendlyLanguageName(inviteLanguagesArray[iter]);

            if (inviteCountry == "GFK") {
                inviteHTML += " ( " + inviteLanguagesArray[iter] + " ) "
            }
            inviteHTML += "</option>";
        }
        inviteHTML += "</select></div>"
    }

    inviteSurveyLink = "#";
    inviteSurveyOnClick = "run_survey();";

    if (inviteLanguage == "ar" || inviteLanguage == "he") {
        inviteTextDirection = "rtl";
    }



    inviteHTML += "<p dir=\"" + inviteTextDirection + "\">" + inviteLine1[inviteLanguage] + "</p><p>" + inviteLine2[inviteLanguage] + "</p>";
    if (inviteType == "D") {
        inviteHTML += "<p dir=\"" + inviteTextDirection + "\">" + inviteLine3[inviteLanguage] + "</p>";
    }
    inviteHTML += "<p dir=\"" + inviteTextDirection + "\"><a href=\"" + inviteSurveyLink + "\" onclick=\"" + inviteSurveyOnClick + "\">" + inviteYes[inviteLanguage] + "</a></p>";
    inviteHTML += "<p dir=\"" + inviteTextDirection + "\"><a href=\"#\" onclick=\"close_popup();\">" + inviteNo[inviteLanguage] + "</a></p>";
    d.innerHTML = inviteHTML;
}

function friendlyLanguageName(languageCode) {
    switch (languageCode) {
        case "en":
            return "English";
        case "fr":
            return "Fran&#231;ais";
        case "fr-ca":
            return "Fran&#231;ais";

        case "de": 
            return "Deutsch";
            
        case "de-at": 
            return "Deutsch";
            
        case "sl": 
            return "Slovenski ";
        case "it": 
            return "Italiano";
        case "nl":
            return "Nederlands";
        case "nl-be":
            return "Nederlands";
        
        case "zh-cn":
            return "&#20013;&#25991;";
        case "el":
            return "&#949;&#955;&#955;&#951;&#957;&#953;&#954;&#940;";
        case "cs":
            return "&#269;e&#353;tina";

        case "da":
            return "Dansk";
        case "es-us":
            return "Espa&#241;ol";
        case "es":
            return "Espa&#241;ol";
        case "fi": 
            return "Suomi";
        case "se": 
            return "Svenska";
           case "tr": 
               return "T&#252;rk&#231;e";
        case "ru":
                return "&#1088;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;";
        case "zh-hk":
                return "&#20013;&#25991;";
                
        case "zh-tw":
            return "&#20013;&#25991;";

        case "hu":
                return "Magyar";
        case "is":
                return "Islenska";
        case "he": 
                return "&#1506;&#1460;&#1489;&#1456;&#1512;&#1460;&#1497;&#1514;";
        case "ar": 
            return "&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;";
        case "ja": 
            return "&#26085;&#26412;&#35486;";
        case "my":
            return "Bahasa Malaysia";
        case "no": 
            return "Norsk";
        case "pl":
            return "Polski";
        case "pt":
            return "Portugu&#234;s";
        case "rm":
            return "Rom&#226;n&#259;";
        case "sk":
            return "Slovensk&#253;";
            



            
    }
}


