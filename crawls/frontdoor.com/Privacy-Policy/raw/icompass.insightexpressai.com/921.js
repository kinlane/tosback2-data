(function(){var PID=921;var RATE=100;function writeTag(p){if((Math.random()*100.0)<RATE){p=typeof(p)=='string'&&p.length?('&'+p):'';document.write(['<script type="text/javascript" language="javascript" src="http://ad.insightexpressai.com/adserver/adServer.aspx?publisherID=',PID,p,'"></', 'script>'].join(''))}};writeTag('');}())