var _w=window;// Shorthand notation for window reference
var _jsmd_default={
	version: "cnn.312.2411.20121102",
	release: "0",
	dictionary: {
		init: {
			/* ADBP Standards */

			"business.name":					"cnn",										//pageName
			"business.lob":						"news",										//hier1
			"business.brand":					"cnn",										//hier1
			"business.friendly_name":			getSiteSpecificSettings(1),					//prop30,eVar30,hier1
			"page.clean_url":					"raw:gCNNURL|",								//prop26
			"page.template_type":				"raw:gCNNTemplateType|long",				//prop32,eVar32
			"page.content_type":				"raw:gCNNContentType|adbp:none",			//prop33,eVar33
			"page.domain":						"raw:gADBPURL|domain",						//server,eVar29
			"page.reportDomain":				"raw:gCNNReportDomain|",					//server with exception for us.cnn.com
			"page.name":						"raw:gCNNPageName|",						//pageName,eVar26
			"page.franchise":					"gJObj|cnn_metadata,business.cnn.page.broadcast_franchise",	//prop31,eVar31
			"page.url_section[0]":				"raw:gADBPURL|path,1",						//prop41,eVar44
			"page.url_section[1]":				"raw:gADBPURL|path,2",						//prop42,eVar45
			"page.transaction_id":				(_w.cnnad_transactionID?_w.cnnad_transactionID+"":""),	//prop46,eVar46 - Transaction ID
			"page.gu_id":						"raw:gCNNgetCookie|ug",						//prop47,eVar47 - GU ID
			"promo.internal.id":				"gQuery|iid",								//eVar43
			"promo.internal.implied":			"",											//eVar48
			"promo.external.id":				"gQuery|cid,sr",							//campaign
			"promo.external.implied":			"",											//campaign, stacked
			"search.internal":					"gJObj|cnn_metadata,search",
			"search.internal.keyword":			"gQuery|query",								//prop39,eVar39
			"search.internal.number_results":	"",											//prop27
			"user.authenticated":				"raw:gCNNAuthenticated|authid,displayname,reg:logged in,anonymous,reg:not logged in,?", //prop34,eVar34 //cnn_metadata.user.authenticated
			"user.segment":						"gJObj|cnn_metadata,segment",				//prop36,eVar36
			"user.segment.zip":					"gQuery|lwp.weather",						//prop36,eVar36
			"page.type":						"",
			"video.id":							"",											//eVar42
			"video.title":						"",											//prop29,eVar41
			"video.players":					[],											//video player array object
			nielsen: {
				"video-census": {
					clientid: getSiteSpecificSettings(5),
					vcid: getSiteSpecificSettings(6),
					prod: "vc",
					sfcode: "us"
				}
			},
			/* TVE Definitions */
			"tve.brand":						"cnn",										//prop1,eVar1
			"tve.syndication_channel":			"tve",										//prop4,eVar4
			"tve.mode":							"live",										//prop8,eVar8
			"tve.player_location":				"onsite",									//prop11,eVar11
			"tve.video.progress":				"0",
			"tve.page.full_url":				window.location.href,						//prop21
			"tve.dev_string":					"gTVEDevString|",							//used in rsid
			"tve.promo.external.id":			"gQueryOnce|o_cid"							//campaign

			,
			/* ADBP Recommended Standards */

			"remove_this_too":					""											// This can be removed once other recommended standards are defined.  Simply copy & replace

			,
			/* Business-Specific Standards */

			"business.cnn.page.section[0]":		"gCNNSection|0", 							//channel,eVar27
			"business.cnn.page.section[1]":		"gCNNSection|1", 							//prop28,eVar28
			"business.cnn.page.section[2]":		"gCNNSection|2",							//prop62,eVar62
			"business.cnn.page.section[3]":		"gCNNSection|3",							//prop74,eVar74
			"business.cnn.page.section[4]":		"gCNNSection|4",							//prop75,eVar75
			"business.cnn.page.author":			"gCNNgetAuthor|", 							//prop2,eVar2
			"business.cnn.page.HPlocation":		"gCNNgetPageAttribution|", 					//prop4,eVar4
			"business.cnn.page.newspulse":		"", 										//prop5,eVar5
			"business.cnn.page.photo.gallery":	"gJObj|cnn_metadata,business.cnn.page.photo_gallery",	//prop6,eVar6
			"business.cnn.page.visit_number.$30Day":"raw:gADBPVisitorSegments|30day,28",	//prop8,eVar8
			"business.cnn.page.lateral_navigation":	"gCNNgetLatNav|", 						//prop9,eVar9
			"business.cnn.page.days_since_publish":	"gCNNDaysSinceLastPublish|a",			//prop10,eVar10
			"business.cnn.page.branding_content_partner":	"gCNNgetBrandingPartner|",		//prop11,eVar11
			"business.cnn.page.affiliate_partner":	"gQuery|pc", 							//prop12,eVar12
			"business.cnn.page.partner_referrer":	"gQuery|eref", 							//prop13,eVar13
			"business.cnn.page.branding_ad":		"gCNNgetBrandingAd|", 					//prop14,eVar14
			"business.cnn.page.exit_traffic_partner":	"gQuery|cid",						//prop15,eVar15 - used to have gQuery|pks
			"business.cnn.page.publish_date":	"gJObj|cnn_metadata,business.cnn.page.publish_date", 	//prop16,eVar16
			"business.cnn.page.ireport.member":	"gIreportgetMember|", 						//prop17,eVar17
			"business.cnn.page.impressions":	_w.cnnPSproducts||"", 						//prop18,eVar18
			"business.cnn.page.ireport.assignment":	"gIreportgetAssignment|",				//prop19,eVar19
			"business.cnn.page.flashversion":	"gCNNFlashVersion|", 						//prop20,eVar20
			"business.cnn.video.sequence":		"+1",										//eVar21
			"business.cnn.page.video_embed_count":	"gJObj|cnn_metadata,business.cnn.page.video_embed_count",	//eVar22
			"business.cnn.page.photo.slide":	"gCNNgetPhotoImage|", 						//prop25,evar25
			"business.cnn.page.socialType":		"", 										//prop69,eVar69
			"business.cnn.game.status":			"",											//prop71,eVar71
			"business.cnn.page.ireport.registration":	""									//prop72,eVar72

			,
			/* Pre-Metadata Collection Routines */
			preinit: function() {



			},
			/* Post-Metadata Translation Routines */
			postinit: function() {

				if (window.location.hostname.indexOf("inhealth.cnn.com") != -1) {
					this.set("business.cnn.page.section[0]","health");
					this.set("business.cnn.page.section[1]","inhealth");
					this.set("business.cnn.page.branding_content_partner","inhealth");
				}
				if (this.plugin.gQuery("refresh") != 1) {
					/* channel,eVar27 */
					var sect1 = this.get("business.cnn.page.section[0]");
					if (!sect1) {
						sect1 = this.plugin.gADBPURL("path",1);
						if (sect1) this.set("business.cnn.page.section[0]",sect1);
					}
					/* prop28,eVar28 */
					if (window.location.href.indexOf("flashLive/") > -1) {
						this.set("business.cnn.page.section[1]","live video");
					}

					var adbpPageName = this.get("page.name");

					if (window.location.href.indexOf("ireport.cnn.com") > -1) {
						var pageName = this.get("page.name");
						var title = this.plugin.gIreportgetMetaContents("title");
						if (title) { this.set("page.name", pageName + " [" + title + "]"); }
						if (adbpPageName == "cnn:sf:ireport:/") { this.set("business.cnn.page.section[1]","irp : ireport homepage"); }
						else if (window.location.href.indexOf("ireport.cnn.com/ir-topic-stories") > -1) { this.set("business.cnn.page.section[1]","irp : topic"); }
						else if (window.location.href.indexOf("ireport.cnn.com/recent-updates") > -1) { this.set("business.cnn.page.section[1]","irp : recent updates"); }
						else if (window.location.href.indexOf("ireport.cnn.com/blogs") > -1) { this.set("business.cnn.page.section[1]","irp : blog"); }
						else if (window.location.href.indexOf("ireport.cnn.com/map") > -1) { this.set("business.cnn.page.section[1]","irp : map"); }
						else if (window.location.href.indexOf("ireport.cnn.com/open-story") > -1) {
							this.set("business.cnn.page.section[1]","irp : open story");
							var pageName = this.get("page.name");
							var friendlyName = this.plugin.gJObj(cnn_metadata,"friendly_name");
							this.set("page.name", pageName + " [" + friendlyName + "]");
						} else if (window.location.href.indexOf("ireport.cnn.com/search") > -1) { this.set("business.cnn.page.section[1]","irp : search"); }
						else if (window.location.href.indexOf("ireport.cnn.com/people") > -1) { this.set("business.cnn.page.section[1]","irp : people"); }
						else if (window.location.href.indexOf("ireport.cnn.com/tags") > -1) { this.set("business.cnn.page.section[1]","irp : tag"); }
						else { this.set("business.cnn.page.section[1]","irp : misc"); }
					} else if (window.location.href.indexOf("ireportqa.cnn.com") > -1) {
						var pageName = this.get("page.name");
						var title = this.plugin.gIreportgetMetaContents("title");
						if (title) { this.set("page.name", pageName + " [" + title + "]"); }
						if (adbpPageName == "cnn:sf:ireportqa:/") { this.set("business.cnn.page.section[1]","irp : ireport homepage"); }
						else if (window.location.href.indexOf("ireportqa.cnn.com/ir-topic-stories") > -1) { this.set("business.cnn.page.section[1]","irp : topic"); }
						else if (window.location.href.indexOf("ireportqa.cnn.com/recent-updates") > -1) { this.set("business.cnn.page.section[1]","irp : recent updates"); }
						else if (window.location.href.indexOf("ireportqa.cnn.com/blogs") > -1) { this.set("business.cnn.page.section[1]","irp : blog"); }
						else if (window.location.href.indexOf("ireportqa.cnn.com/map") > -1) { this.set("business.cnn.page.section[1]","irp : map"); }
						else if (window.location.href.indexOf("ireportqa.cnn.com/open-story") > -1) {
							this.set("business.cnn.page.section[1]","irp : open story");
							var pageName = this.get("page.name");
							var friendlyName = this.plugin.gJObj(cnn_metadata,"friendly_name");
							this.set("page.name", pageName + " [" + friendlyName + "]");
						} else if (window.location.href.indexOf("ireportqa.cnn.com/search") > -1) { this.set("business.cnn.page.section[1]","irp : search"); }
						else if (window.location.href.indexOf("ireportqa.cnn.com/people") > -1) { this.set("business.cnn.page.section[1]","irp : people"); }
						else if (window.location.href.indexOf("ireportqa.cnn.com/tags") > -1) { this.set("business.cnn.page.section[1]","irp : tag"); }
						else { this.set("business.cnn.page.section[1]","irp : misc"); }
					}

					var sect2 = this.get("business.cnn.page.section[1]");
					if (!sect2) {
						sect2 = this.plugin.gADBPURL("path",2);
						if (sect2) { this.set("business.cnn.page.section[1]",sect2); }
					}
					if (sect1 == "" && sect2 == "") { this.set("business.cnn.page.section[0]","home"); }

					/* prop41,eVar44 */
					var adbpUrlSection = this.get("page.url_section[0]");
					if (!adbpUrlSection) {
						this.set("page.url_section[0]","home");
					}

					/* content page events */
					var ttContent = this.plugin.gJObj(cnn_metadata,"template_type_content");
					if (ttContent) {
						switch(ttContent) {
							case "quiz":
								this.set("page.content_type","other:quiz");
								this.push("page.events","content.quiz");
								break;
							case "gallery":
								break;
							case "chart":
								this.push("page.events","content.chart");
								break;
							case "map":
								this.set("page.content_type","other:map");
								this.push("page.events","content.map");
								break;
							case "timeline":
								this.push("page.events","content.timeline");
								break;
							case "interactive":
								this.push("page.events","content.interactive");
								break;
							case "explainer":
								this.push("page.events","content.explainer");
								break;
							case "partner":
								this.push("page.events","content.partner");
								break;
							case "ad":
								this.push("page.events","content.ad");
								break;
							default:
								this.push("page.events","content.interactive");
						}
					} else {
						var tType = this.plugin.gJObj(cnn_metadata,"template_type");
						if (tType == 'interactive') { this.push("page.events","content.interactive") };
					}
					/* Specials featured content event */
					if (sect1=="specials") { this.push("page.events","content.featured"); }

					/* Impressions content event */
					var impr = this.get("business.cnn.page.impressions");
					if (impr) { this.push("page.events","content.impressions"); }
				}

				/* elections patch */
				if (_w.location.pathname.indexOf("election/2012/results") > -1) {
					var hash_value = _w.location.hash.replace("#","").toLowerCase();
					if (hash_value && hash_value.match(/president|senate|house|governor|ballot/)) {
						this.set("business.cnn.page.section[4]",hash_value);	//prop75,eVar75
					}
				}

			}
		}
	},
	map: {

		"cnn_main": {
			vendors: [
				{
					name:			"Adobe SiteCatalyst H-code",
					account:		"cnn",
					settings:		["cnn"], // comment
					variablemap:	["cnn","adbp"],
					eventmap:		["cnn","adbp"],
					dynamic_actions: {
						"video": {
							variablemap:	["cnn","adbp-video"],
							eventmap:		["cnn","adbp-video"]
						},
						"audio": {
							variablemap:	["adbp-audio"],
							eventmap:		["adbp-audio"]
						},
						"autorefresh": {
							settings:		["cnn","cnn-autorefresh"],
							variablemap:	["cnn-autorefresh"],
							eventmap:		["cnn-autorefresh"]
						},
						"impressions": {
							settings:		["cnn","cnn-impressions"],
							variablemap:	["cnn-impressions"],
							eventmap:		["cnn-impressions"]
						},
						"tve": {
							variablemap:	["tve"],
							eventmap:		["tve"]
						},
						"vid-button": {
							variablemap:	["cnn","adbp"],
							eventmap:		["cnn","adbp"]
						},
						"game": {
							variablemap:	["cnn","adbp"],
							eventmap:		["cnn","adbp"]
						}
					},
					prevendor:		function() { },
					postvendor:		function() { }
				},
				{
					name: 			"Nielsen Hybrid Light Code",
					account:		"standard_nielsen",
					dynamic_actions: {
						"video":		{ ignore: true },
						"audio":		{ ignore: true },
						"autorefresh":	{ ignore: true },
						"impressions":	{ ignore: true },
						"vid":			{ ignore: true },
						"game":			{ ignore: true }
					}
				}
			],
			/** Variable: VendorSettingsObject
			*/
			standard_nielsen: {
				account: function() {
					return ("us-204044h");
				}
			},
			cnn: {
				filters: {
					"flash-link": 		{ include: ["video.","content_type","link."] }
				},
				account: function() {
					var hostName = window.location.hostname;
					var setting;
					var sites={
						"ireportdev":	["cnn-adbp-domestic-dev,cnnireport-adbp-dev"],
						"cnnintldev":	["cnn-adbp-intl-dev"],
						"cnndev":		["cnn-adbp-domestic-dev"],
						"ireport":		["cnn-adbp-domestic,cnnireport-adbp"],
						"cnnintl":		["cnn-adbp-intl"],
						"cnn":			["cnn-adbp-domestic"]
					}
					if (hostName.indexOf("ireportqa.cnn.com")!=-1) {
						setting = sites.ireportdev[0];
					} else if (hostName.indexOf("jcmsdev8.cnn.com")!=-1 || hostName.indexOf("jcmsref.cnn.com")!=-1 || hostName.indexOf("cnnpreview.cnn.com")!=-1 || hostName.indexOf("ref.cnn.com")!=-1 || hostName.indexOf("preview.cnn.com")!=-1 || hostName.indexOf("dev.cnn.com")!=-1 || hostName.indexOf("stage.cnngo.com")!=-1 || hostName.indexOf("travel.cnngo.com")!=-1) {
						var port = window.location.port;
						if (port.indexOf("94")!=-1 || hostName.indexOf("edition")!=-1 || hostName.indexOf("cnnespanol")!=-1 || hostName.indexOf("stage.cnngo.com")!=-1 || hostName.indexOf("travel.cnngo.com")!=-1) {
							setting = sites.cnnintldev[0];
						} else {
							setting = sites.cnndev[0];
						}
					} else if (hostName.indexOf("qai.cnn.com")!=-1) {
						setting = sites.cnndev[0];
					} else if (hostName.indexOf("cnn.staging.perfectmarket.com")!=-1||hostName.indexOf("cnn.staging2.perfectmarket.com")!=-1) {
						setting = sites.cnndev[0];
					} else if (hostName.indexOf("ireport.cnn.com")!=-1) {
						setting = sites.ireport[0];
					} else if (hostName.indexOf("edition.cnn.com")!=-1||hostName.indexOf("cnnespanol.cnn.com")!=-1||hostName.indexOf("backstory.blogs.cnn.com")!=-1||hostName.indexOf("inthefield.blogs.cnn.com")!=-1||hostName.indexOf("securityfiles.blogs.cnn.com")!=-1||hostName.indexOf("thecnnfreedomproject.blogs.cnn.com")!=-1||hostName.indexOf("ukelection.blogs.cnn.com")!=-1||hostName.indexOf("amanpour.blogs.cnn.com")!=-1||hostName.indexOf("screeningroom.blogs.cnn.com")!=-1||hostName.indexOf("internationaldesk.blogs.cnn.com")!=-1||hostName.indexOf("newsstream.blogs.cnn.com")!=-1||hostName.indexOf("prism.blogs.cnn.com")!=-1||hostName.indexOf("thebrief.blogs.cnn.com")!=-1||hostName.indexOf("insidethemiddleeast.blogs.cnn.com")!=-1||hostName.indexOf("connecttheworld.blogs.cnn.com")!=-1||hostName.indexOf("business.blogs.cnn.com")!=-1||hostName.indexOf("questmeansbusiness.blogs.cnn.com")!=-1||hostName.indexOf("goalmouth.blogs.cnn.com")!=-1||hostName.indexOf("olympics.blogs.cnn.com")!=-1||hostName.indexOf("worldsport.blogs.cnn.com")!=-1||hostName.indexOf("bodareal.blogs.cnn.com")!=-1||hostName.indexOf("travel.cnn.com")!=-1) {
						setting = sites.cnnintl[0];
					} else if (hostName.indexOf("cnn.com")!=-1) {
						setting = sites.cnn[0];
					}
					return setting;
				},
				settings: {
					"trackDownloadLinks":		true,
					"trackExternalLinks":		true,
					"trackInlineStats":			true,
					"linkDownloadFileTypes":	"exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls",
					"linkInternalFilters":		"javascript:,.cnn.com,#,.ireport.com,i.cdn.turner.com,i.cnn.net,.i-report.com,.ireport.net,mailto:",
					"externalLinkFilters":		".si.com,/time/,cnn.com/money,/si/,/ew/,/lawyers/,/popsci/,/southernaccents/,/parenting/,/cookinglight/,/budgettravel/,/healthmag/,/cottageliving/,/sunset/,/southern/,/coastal/,/peoplemag/,/travelandleisure/,/international/,/intl/,/healthologyvid/,/careerbuilder/,/fortune/,/ewhome/,/ewpop/,/healthologycom/,/healthologynet/,/instyle/,arabic.cnn.com,/arabic/,www.cnn.com/money,edition.cnn.com/money,us.cnn.com/money,sportsillustrated.cnn.com,money.cnn.com,edition.cnn.com,/newfrontier/,/people/,/cnnfn/,/cnet/,/interactiveworld/,/sportstonight/,/sports/,/cnnsi/,/shc/,/medpage/,/mayo/",
					"linkLeaveQueryString":		false,
					"trackingServer": 			getSiteSpecificSettings(3),
					"trackingServerSecure":		getSiteSpecificSettings(4),
					"dc":						"122",
					"visitorNamespace":			getSiteSpecificSettings(2),
					"charSet":					"ISO8859-1", //UTF-8
					"currencyCode":				"USD"
				},
				variablemap: {
					"business.cnn.page.author":						["prop2","eVar2"],
					"business.cnn.page.HPlocation":					["prop4","eVar4"],
					"business.cnn.page.newspulse":					["prop5","eVar5"],
					"business.cnn.page.photo.gallery":				["prop6","eVar6"],
					"business.cnn.page.visit_number.$30Day":		["prop8","eVar8"],
					"business.cnn.page.lateral_navigation":			["prop9","eVar9"],
					"business.cnn.page.days_since_publish":			["prop10","eVar10"],
					"business.cnn.page.branding_content_partner":	["prop11","eVar11"],
					"business.cnn.page.affiliate_partner":			["prop12","eVar12"],
					"business.cnn.page.partner_referrer":			["prop13","eVar13"],
					"business.cnn.page.branding_ad":				["prop14","eVar14"],
					"business.cnn.page.exit_traffic_partner":		["prop15","eVar15"],
					"business.cnn.page.publish_date": 				["prop16","eVar16"],
					"business.cnn.page.ireport.member":				["prop17","eVar17"],
					"business.cnn.page.impressions":				["prop18","eVar18"],
					"business.cnn.page.ireport.assignment":			["prop19","eVar19"],
					"business.cnn.page.flashversion":				["prop20","eVar20"],
					"business.cnn.page.video_embed_count": 			["eVar22"],
					"business.cnn.page.photo.slide": 				["prop25","eVar25"],
					"business.cnn.page.section[2]":					["prop62","eVar62"],
					"business.cnn.page.socialType": 				["prop69","eVar69"],
					"business.cnn.game.status":						["prop73","eVar73"],
					"m:page.type":									["pageType"],
					"business.cnn.page.ireport.registration":		["prop72","eVar72"],
					"business.cnn.page.section[3]":					["prop74","eVar74"],
					"business.cnn.page.section[4]":					["prop75","eVar75"]


				},
				eventmap: {
					"content.quiz":			["event4"],
					"content.gallery":		["event5"],
					"content.chart":		["event6"],
					"content.map":			["event7"],
					"content.timeline":		["event8"],
					"content.interactive":	["event9"],
					"content.explainer":	["event10"],
					"ireport.rate":			["event12"],
					"ireport.comment":		["event13"],
					"ireport.flag":			["event14"],
					"ireport.share":		["event15"],
					"content.impressions":	["event16"],
					"ireport.flag.story":	["event18"],
					"ireport.email":		["event19"],
					"ireport.form.success":	["event20"],
					"content.partner":		["event21"],
					"content.ad":			["event24"],
					"content.featured":		["event31"],
					"social.interaction":	["event76"],
					"game.interaction":		["event78"],
					"ireport.signup":		["event79"]


				},
				premap: function() { },
				postmap: function() {

					/* remove variable restrictions from previous dynamic action */
					this.v.linkTrackVars = "";

					/* prop8,eVar8 - replace | with : */
					try { this.v.prop8 = this.v.prop8.replace(/\|/,":"); } catch(e) {}

					/* linkHandler code for CNN */
					var s=this.v;

					var s_userAgent = navigator.userAgent;
					s_userAgent = s_userAgent.toLowerCase();
					if (s_userAgent.indexOf("webkit") == -1 && s_userAgent.indexOf("safari") == -1 || s_userAgent.indexOf("chrome") > 0) {
						s.usePlugins=true
						/*
						 * Plugin: linkHandler 0.5 - identify and report custom links
						 */
						s.linkHandler=new Function("p","t",""
						+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
						+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
						+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
						+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
						s.p_gn=new Function("t","h",""
						+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
						+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
						+"return 0;");
						/*
						 * Utility Function: p_gh
						 */
						s.p_gh=new Function(""
						+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
						+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
						+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
						+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

						/*
						 * TNT Integration Plugin v1.0
						 * v - Name of the javascript variable that is used. Defaults to s_tnt
						 (optional)
						 * p - Name of the url parameter. Defaults to s_tnt (optional)
						 * b - Blank Global variable after plugin runs. Defaults to true (Optional)
						 */
						s.trackTNT = function(v, p, b)
						{
						var s=this, n="s_tnt", p=(p)?p:n, v=(v)?v:n, r="",pm=false, b=(b)?b:true;
						if(s.getQueryParam)
						pm = s.getQueryParam(p); //grab the parameter
						if(pm)
						r += (pm + ","); // append the parameter
						if(s.wd[v] != undefined)
						r += s.wd[v]; // get the global variable
						if(b)
						s.wd[v] = ""; // Blank out the global variable for ajax requests
						return r;}

						/* Plugin: getQueryParam 2.3
						 */
						s.getQueryParam=new Function("p","d","u",""
						+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
						+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
						+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
						+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
						+"=p.length?i:i+1)}return v");
						s.p_gpv=new Function("k","u",""
						+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
						+"=s.pt(q,'&','p_gvf',k)}return v");
						s.p_gvf=new Function("t","k",""
						+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
						+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
						+"epa(v)}return ''");

						var hostN = window.location.hostname;
						s.doPlugins=function() {
							var url1=s.linkHandler('/time/','e');//e
							var url2=s.linkHandler('cnn.com/money/','e');//e
							var url3=s.linkHandler('/si/','e');//e
							var url4=s.linkHandler('/ew/','e');//e
							var url5=s.linkHandler('/lawyers/','e');//e
							var url6=s.linkHandler('/popsci/','e');//e
							var url7=s.linkHandler('/southernaccents/','e');//e
							var url8=s.linkHandler('/parenting/','e');//e
							var url9=s.linkHandler('/cookinglight/','e');//e
							var url10=s.linkHandler('/budgettravel/','e');//e
							var url11=s.linkHandler('/healthmag/','e');//e
							var url12=s.linkHandler('/cottageliving/','e');//e
							var url13=s.linkHandler('/sunset/','e');//e
							var url14=s.linkHandler('/southern/','e');//e
							var url15=s.linkHandler('/coastal/','e');//e
							var url16=s.linkHandler('/peoplemag/','e');//e
							var url17=s.linkHandler('/travelandleisure/','e');//e
							var url18=s.linkHandler('/international/','e');//e
							var url19=s.linkHandler('/intl/','e');//e
							var url20=s.linkHandler('/healthologyvid/','e');//e
							var url21=s.linkHandler('/careerbuilder/','e');//e
							var url22=s.linkHandler('/fortune/','e');//e
							var url23=s.linkHandler('/ewhome/','e');//e
							var url24=s.linkHandler('/ewpop/','e');//e
							var url25=s.linkHandler('/healthologycom/','e');//e
							var url26=s.linkHandler('/healthologynet/','e');//e
							var url27=s.linkHandler('/instyle/','e');//e
							var url28=s.linkHandler('/mayo/','e');//e
							var url29=s.linkHandler('/medpage/','e');
							var url30=s.linkHandler('/shc/','e');//e
							var url31=s.linkHandler('/cnnsi/','e');//e
							var url32=s.linkHandler('/sports/','e');//e
							var url33=s.linkHandler('/sportstonight/','e');//e
							var url34=s.linkHandler('/interactiveworld/','e');//e
							var url35=s.linkHandler('/cnet/','e');//e
							var url36=s.linkHandler('/cnnfn/','e');//e
							var url37=s.linkHandler('/people/','e');//e
							var url38=s.linkHandler('/newfrontier/','e');//e
							if (hostN.indexOf("edition.cnn.com") == -1 ) {
								var url39=s.linkHandler('edition.cnn.com','e');//e
							}
							var url40=s.linkHandler('money.cnn.com','e');//e
							var url41=s.linkHandler('sportsillustrated.cnn.com','e');//e
							var url42=s.linkHandler('topix.net','e');//na
							var url43=s.linkHandler('us.cnn.com/money/','e');//e
							var url44=s.linkHandler('edition.cnn.com/money/','e');//e
							var url45=s.linkHandler('www.cnn.com/money/','e');//e
							var url46=s.linkHandler('/arabic/','e');//e
							var url47=s.linkHandler('arabic.cnn.com/','e');//e
							var url48=s.linkHandler('www.oprah.com/','e');//na
							var url49=s.linkHandler('www2.oprah.com/','e');//na
							var url50=s.linkHandler('static.oprah.com/','e');//na

							s.tnt=s.trackTNT();
						}
					}

					if (window.location.hostname.indexOf("ireport.cnn.com")!=-1 || window.location.hostname.indexOf("ireportqa.cnn.com")!=-1) {
						this.v.channel = "ireport";
						this.v.eVar27 = this.v.channel;
					}
					if ((this.config.map.isDynamic != null) && (typeof(this.config.map.isDynamic) === "string") && (this.config.map.isDynamic.indexOf("tve-") == -1)) {
						if (this.config.map.isDynamic.indexOf("preroll") > -1) {
							this.v.eVar1 = this.v.prop1; this.v.prop1 = "";
							this.v.eVar2 = this.v.prop2; this.v.prop2 = "";
							this.v.eVar3 = this.v.prop3; this.v.prop3 = "";
							this.v.eVar7 = this.v.prop7; this.v.prop7 = "";
							this.v.eVar8 = this.v.prop8; this.v.prop8 = "";
							this.v.eVar10 = this.v.prop10; this.v.prop10 = "";
							this.v.eVar16 = this.v.prop16; this.v.prop16 = "";
							this.v.eVar17 = this.v.prop17; this.v.prop17 = "";
							this.v.eVar41 = this.v.prop29; this.v.prop29 = "";
							this.v.eVar30 = this.v.prop30; this.v.prop30 = "";
							this.v.eVar28 = ""; this.v.prop28 = "";
							this.v.eVar11 = this.v.prop11; this.v.prop11 = "";
							this.v.eVar14 = this.v.prop14; this.v.prop14 = "";
							this.v.eVar20 = this.v.prop20; this.v.prop20 = "";
							this.v.eVar47 = this.v.prop47; this.v.prop47 = "";
							this.v.eVar62 = this.v.prop62; this.v.prop62 = "";
							this.v.eVar68 = this.v.prop68; this.v.prop68 = "";
							this.v.eVar74 = this.v.prop74; this.v.prop74 = "";
							this.v.eVar75 = this.v.prop75; this.v.prop75 = "";
						}
						if (this.config.map.isDynamic.indexOf("autoRefresh") > -1 || this.config.map.isDynamic.indexOf("toggle") > -1 || this.config.map.isDynamic.indexOf("impressions") > -1) {
							this.v.hier1 = "";
						}
						if (this.config.map.isDynamic.indexOf("fifty") > -1 || this.config.map.isDynamic.indexOf("complete") > -1 || this.config.map.isDynamic.indexOf("ten") > -1 || this.config.map.isDynamic.indexOf("twentyfive") > -1 || this.config.map.isDynamic.indexOf("seventyfive") > -1 || this.config.map.isDynamic.indexOf("progress") > -1) {
							this.v.server = "";
							this.v.eVar1 = this.v.prop1; this.v.prop1 = "";
							this.v.eVar2 = this.v.prop2; this.v.prop2 = "";
							this.v.eVar3 = this.v.prop3; this.v.prop3 = "";
							this.v.eVar4 = this.v.prop4; this.v.prop4 = "";
							this.v.eVar7 = this.v.prop7; this.v.prop7 = "";
							this.v.eVar8 = this.v.prop8; this.v.prop8 = "";
							this.v.eVar10 = this.v.prop10; this.v.prop10 = "";
							this.v.eVar11 = this.v.prop11; this.v.prop11 = "";
							this.v.eVar14 = this.v.prop14; this.v.prop14 = "";
							this.v.eVar16 = this.v.prop16; this.v.prop16 = "";
							this.v.eVar17 = this.v.prop17; this.v.prop17 = "";
							this.v.eVar20 = this.v.prop20; this.v.prop20 = "";
							this.v.eVar26 = this.mdata.page.name;
							this.v.eVar27 = this.v.channel; this.v.channel = "";
							this.v.eVar41 = this.v.prop29; this.v.prop29 = "";
							this.v.eVar32 = this.v.prop32; this.v.prop32 = "";
							this.v.eVar33 = this.v.prop33; this.v.prop33 = "";
							this.v.eVar30 = this.v.prop30; this.v.prop30 = "";
							this.v.eVar28 = this.v.prop28; this.v.prop28 = "";
							this.v.eVar44 = this.v.prop41;
							this.v.eVar45 = this.v.prop42;
							this.v.eVar34 = this.v.prop34;
							this.v.eVar61 = this.v.prop61; this.v.prop61 = "";
							this.v.eVar62 = this.v.prop62; this.v.prop62 = "";
							this.v.eVar66 = this.v.prop66; this.v.prop66 = "";
							this.v.eVar68 = this.v.prop68; this.v.prop68 = "";
							this.v.eVar70 = this.v.prop70; this.v.prop70 = "";
							this.v.eVar71 = this.v.prop71; this.v.prop71 = "";
							this.v.eVar74 = this.v.prop74; this.v.prop74 = "";
							this.v.eVar75 = this.v.prop75; this.v.prop75 = "";
						}
						if (this.config.map.isDynamic.indexOf("autostart") > -1 || this.config.map.isDynamic.indexOf("audio") > -1) {
							this.v.eVar32 = this.v.prop32; this.v.prop32 = "";
						}
						if (this.config.map.isDynamic.indexOf("video-start") > -1 || this.config.map.isDynamic.indexOf("video-autostart") > -1 || this.config.map.isDynamic.indexOf("video-page") > -1) {
							this.v.eVar26 = this.mdata.page.name;
							this.v.eVar27 = this.v.channel; this.v.channel = "";
							this.v.eVar28 = this.v.prop28; this.v.prop28 = "";
						}
						if (this.config.map.isDynamic.indexOf("video-live") > -1) {
							this.v.events = "event1,event32";
						}
						if (this.config.map.isDynamic.indexOf("photo-page") > -1) {
							if (jsmdIsInit) {
								/* do nothing */
							} else {
								this.v.eVar6 = "";
							}
							this.v.eVar1 = "";
							this.v.eVar7 = "";
							this.v.eVar61 = "";
							this.v.eVar68 = "";
							this.v.eVar71 = "";
							this.v.eVar41 = "";
						}
						if (this.config.map.isDynamic.indexOf("social-click") > -1) {
							this.v.eVar26 = this.v.pageName; this.v.pageName = "";
							this.v.eVar27 = this.v.channel; this.v.channel = "";
							this.v.events = "event76";
							this.v.linkTrackVars = "prop69,eVar69,events,eVar26,eVar27";
						}
						if (this.config.map.isDynamic.indexOf("vid-button") > -1) {
							this.v.pageName = this.v.channel = this.v.server = this.v.events = this.v.hier1 = "";
							this.v.prop8 = this.v.prop17 = this.v.prop26 = this.v.prop28 = this.v.prop30 = this.v.prop32 = this.v.prop33 = this.v.prop34 = this.v.prop35 = this.v.prop41 = this.v.prop42 = "";
							this.v.eVar1 = this.v.eVar7 = this.v.eVar8 = this.v.eVar10 = this.v.eVar11 = this.v.eVar16 = this.v.eVar17 = this.v.eVar26 = this.v.eVar27 = this.v.eVar28 = this.v.eVar29 = this.v.eVar30 = this.v.eVar32 = this.v.eVar33 = this.v.eVar34 = this.v.eVar41 = this.v.eVar44 = this.v.eVar45 = this.v.eVar66 = this.v.eVar68 = "";
						}
						/* game interaction variable restrictions */
						if (this.config.map.isDynamic.indexOf("game-interaction") > -1) {
							this.v.pageName = "";
							this.v.linkTrackVars = "events,prop73,eVar73,pageName,eVar26,channel,eVar27";
						}
					}

					/* for error page, set pageType */
					var pageTemplateType = this.get("page.template_type");
					if (pageTemplateType && pageTemplateType == "adbp:error") this.v.pageType = "errorPage";

					/* Dynamic s Object set */
					var s_vendor = this.get("business.vendor.sitecatalyst");
					if (s_vendor!="" && s_vendor!=null) {
						var unl = this.v._jsmd.unset_list;
						for (var p in s_vendor) {
							var pv = p;
							this.v[pv] = s_vendor[pv];
							if (pv.toLowerCase().indexOf('prop') != -1 || pv.indexOf('eVar') != -1 ) {
								try { unl.push(([i]+'')); }catch(e) {} // added props or eVar to unset_list for deletion
							}
						}
						try {
							if (s_vendor.linkType) {
								this.v.linkType = s_vendor.linkType;
								if (s_vendor.linkType === "e" && jsmd.exitLinkVal) {
									this.v.pev1 = (s_vendor.linkName)?s_vendor.linkName:"";
								}
							}
							if (s_vendor.linkName) { this.v.linkName = s_vendor.linkName; }

							if (s_vendor.account) { this.v.fun = this.v.oun = this.v.un = s_vendor.account; }
							if (s_vendor.linkTrackVars) {
								var stg = s_vendor.linkTrackVars+"";
								stg = stg.replace(/evar/gi, "eVar");
								this.v.linkTrackVars = stg;
							}
							if (s_vendor.linkTrackEvents) {
								this.v.linkTrackEvents = s_vendor.linkTrackEvents
							}

						} catch(e) {}
					}

					/* add code version prop35 for all calls */
					this.v.prop35 = _jsmd_default.version + ":" + _jsmd_default.release;
					this.v.eVar35 = "D=c35";

					/* add transaction ID prop46,eVar46 for all calls */
					if (_w.cnnad_transactionID) {
						this.v.prop46 = _w.cnnad_transactionID;
						this.v.eVar46 = "D=c46";
					}

					/* add GUID prop47,eVar47 for all calls */
					var guid = _jsmd.plugin.gCookie("ug");
					if (guid) {
						this.v.prop47 = guid;
						this.v.eVar47 = "D=c47";
					}

				}

			} ,
			adbp: {
				settings: {
					"trackInlineStats":			true,
					"linkLeaveQueryString":		false
				},
				variablemap: {
					"m:page.name":						["pageName","eVar26"],
					"business.cnn.page.section[0]":		["channel","eVar27"],
					"m:page.domain":					["server","eVar29"],
					"m:page.clean_url":					["prop26"],
					"m:search.internal.number_results":	["prop27"],
					"business.cnn.page.section[1]":		["prop28","eVar28"],
					"m:video.title":					["prop29","eVar41"],
					"m:business.friendly_name":			["prop30","eVar30"],
					"m:page.franchise":					["prop31","eVar31"],
					"m:page.template_type":				["prop32","eVar32"],
					"m:page.content_type":				["prop33","eVar33"],
					"m:user.authenticated":				["prop34","eVar34"],
					"m:code.version":					["prop35","eVar35"],
					"m:user.segment":					["prop36","eVar36"],
					"m:search.internal.keyword":		["prop39","eVar39"],
					"m:time":							["prop40","eVar40"],
					"m:page.url_section[0]":			["prop41","eVar44"],
					"m:page.url_section[1]":			["prop42","eVar45"],
					"m:video.id":						["eVar42"],
					"m:promo.internal.id":				["eVar43"],
					"m:page.transaction_id":			["prop46","eVar46"],
					"m:page.gu_id":						["prop47","eVar47"],
					"m:promo.internal.implied":			["eVar48"],				//Campaign Stacking (SEO Driven)
					"m:promo.external.id":				["campaign"],			//Marketing/External Campaigns
					"m:business.lob|m:business.brand|m:business.friendly_name|m:page.reportDomain|m:business.cnn.page.section[0]|m:business.cnn.page.section[1]":	["hier1"],
					"delimiter":						"|"
				},
				eventmap: {
					"m:page.name":				["event26"],
					"page.view":				["event26"],
					"search.internal.keyword":	["event27"],
					"registration.complete":	["event28"],
					"promo.internal.id":		["event31"],
					"video.start":				["event32"],
					"video.complete":			["event33"],
					"video.autostart":			["event34,event32"],
					"ad.start.preroll":			["event35"],
					"video.timespent":			["event36"],
					"user.login":				["event37"],
					"blog.read":				["event38"],
					"article.read":				["event39"],
					"video.timespent":			["event29"],
					"product.view":				["prodView"],
					"product.multiview":		["prodView"],
					"cart.add":					["scAdd"],
					"cart.new":					["scOpen"],
					"checkout.start":			["scCheckout"],
					"purchase.complete":		["purchase"]
				},
				premap: function() { },
				postmap: function() {

					/* prop8,eVar8 - replace | with : */
					try { this.v.prop8 = this.v.prop8.replace(/\|/,":"); } catch(e) {}

				}
			},
			"tve": {
				filters: {
					"tve-cnn_video-start": 		{ include: ["tve.video.cnn.","tve.page.name","tve.brand","tve.host_location","tve.syndication_channel","tve.content_id","tve.video_title","tve.time_parting","tve.products","tve.player_location","tve.mode"] },
					"tve-cnn_video-complete": 	{ include: ["tve.page.name","tve.video.cnn.","tve.products"] },
					"tve-cnn_video-progress": 	{ include: ["tve.video.cnn.","tve.time_parting","tve.products"] }
				},
				variablemap: {
					"tve.page.name":				["pageName"],
					"tve.brand":					["prop1","eVar1"],
					"tve.host_location":			["prop2","eVar2"],
					"tve.syndication_channel":		["prop4","eVar4"],
					"tve.content_id":				["prop5","eVar5"],
					"tve.mode":						["prop8","eVar8"],
					"tve.video_title":				["prop12"],
					"tve.video.live.stream":		["prop14","eVar14"],
					"tve.video.adload":				["prop15","eVar15"],
					"tve.video.authentication":		["prop16","eVar16"],
					"tve.products":					["products"],
					"tve.time_parting":				["prop17","eVar17"],
					"tve.player_location":			["prop11","eVar11"],
					"delimiter":					"|"
				},
				eventmap: {
					"tve.page.view":					["event15"],
					"tve.video.cnn.video_start":		["event13"],
					"tve.video.cnn.video_progress":		["event6,event20"],
					"tve.video.live.video_start":		["event13,event27"],
					"tve.video.offair.video_start":		["event13,event25"],
					"tve.video.live.video_progress":	["event16,event20"],
					"tve.video.live.video_complete":	["event14,event16,event26"]

				},
				premap: function() { },
				postmap: function() { }
			},
			"adbp-video": {
				filters: {
					"video-preroll":			{ include: ["business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.preroll","video.midroll"] },
					"preview-video":			{ include: ["business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.preview"] },
					"video-progress":			{ include: ["business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.complete"] },
					"video-ten":				{ include: ["business.cnn.video.start_type","business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.ten"] },
					"video-twentyfive":			{ include: ["business.cnn.video.start_type","business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.twentyfive"] },
					"video-fifty":				{ include: ["business.cnn.video.start_type","business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.fifty"] },
					"video-seventyfive":		{ include: ["business.cnn.video.start_type","business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.seventyfive"] },
					"video-complete":			{ include: ["business.cnn.video.start_type","business.cnn.video.source","business.cnn.video.air_syndication","business.cnn.video.ad_duration","business.cnn.video.video_player","business.cnn.video.video_section","business.cnn.video.video_length","business.cnn.page.visit_number.$30Day","business.cnn.page.publish_date","business.cnn.page.flashversion","business.cnn.page.video_embed_count","video.title","video.id","business.friendly_name","page.content_type","page.domain","page.section[0]","page.template_type","code.version","video.duration_watched","business.cnn.page.section[1]","video.complete"] }
				},
				variablemap: {
					"business.cnn.video.video_player":		["prop1","eVar1"],
					"business.cnn.video.video_section":		["prop3","eVar3"],
					"business.cnn.page.HPlocation":			["prop4","eVar4"],
					"business.cnn.video.video_length":		["prop7","eVar7"],
					"business.cnn.page.visit_number.$30Day":["prop8","eVar8"],
					"business.cnn.page.days_since_publish": ["prop10","eVar10"],
					"business.cnn.page.publish_date":		["prop16","eVar16"],
					"business.cnn.page.flashversion":		["prop20","eVar20"],
					"business.cnn.video.video_collection":	["prop60","eVar60"],
					"business.cnn.video.air_syndication":	["prop61","eVar61"],
					"business.cnn.video.video_interaction":	["prop66","eVar66"],
					"business.cnn.video.ad_duration":		["prop68","eVar68"],
					"business.cnn.video.start_type":		["prop70","eVar70"],
					"business.cnn.video.source":			["prop71","eVar71"],
					"business.cnn.video.sequence":			["eVar21"],
					"business.cnn.page.video_embed_count": 	["eVar22"],
					"m:page.name":							["pageName","eVar26"],
					"business.cnn.page.section[0]":			["channel","eVar27"],
					"business.cnn.page.section[1]":			["prop28","eVar28"],
					"m:page.domain":						["eVar29"],
					"m:video.title":						["prop29","eVar41"],
					"m:video.id":							["eVar42"],
					"m:business.friendly_name":				["prop30","eVar30"],
					"m:page.template_type":					["prop32","eVar32"],
					"m:page.content_type":					["prop33","eVar33"],
					"m:code.version":						["prop35","eVar35"],
					"m:promo.internal.id":					["eVar43"],
					"m:promo.internal.implied":				["eVar48"],				//Campaign Stacking (SEO Driven)
					"m:promo.external.id":					["campaign"],			//Marketing/External Campaigns
					"m:video.products":						["products"],
					"delimiter":							"|"
				},
				eventmap: {
					"video.live":				["event1","event32"],
					"video.fifty":				["event2"],
					"video.partner_start":		["event22"],
					"video.ad_start":			["event23"],
					"video.midroll":			["event25"],
					"video.start":				["event32"],
					"video.complete":			["event33"],
					"video.autostart":			["event34,event32"],
					"video.preroll":			["event35"],
					"m:video.duration_watched":	["event36"],
					"page.view":				["event26"],
					"video.ten":				["event40"],
					"video.twentyfive":			["event41"],
					"video.seventyfive":		["event42"],
					"video.preview":			["event45"],
					"video.interaction":		["event66"],
					"video.sync":				["event77"]
				},
				premap: function() { },
				postmap: function() {

					/* prop8,eVar8 - replace | with : */
					try { this.v.prop8 = this.v.prop8.replace(/\|/,":"); } catch(e) {}

				}
			},
			"adbp-audio": {
				variablemap: {
					"business.cnn.audio.audio_title":	["prop24","eVar24"],
					"m:page.section[0]":				["eVar27"],
					"m:page.section[1]":				["eVar28"],
					"m:page.domain":					["eVar29"],
					"m:business.friendly_name":			["eVar30"],
					"m:page.template_type":				["prop32","eVar32"],
					"m:page.content_type":				["prop33","eVar33"],
					"m:code.version":					["prop35","eVar35"],
					"m:promo.internal.id":				["eVar43"],
					"m:promo.internal.implied":			["eVar48"],				//Campaign Stacking (SEO Driven)
					"m:promo.external.id":				["campaign"],			//Marketing/External Campaigns
					"m:video.products":					["products"],
					"delimiter":						"|"
				},
				eventmap: {
					"audio.start":				["event11"]
				},
				premap: function() { },
				postmap: function() {
				}
			},
			"cnn-autorefresh": {
				filters: {
					"dynamic-autoRefresh": { include: ["page.lateral_navigation"] }
				},
				settings: {
					"linkTrackVars":		"pageName,g,channel,events,prop9"
				},
				variablemap: {
					"business.cnn.page.lateral_navigation":				["prop9","eVar9"]
				},
				eventmap: { },
				premap: function() { },
				postmap: function() { }
			},
			"cnn-impressions": {
				filters: {
					"dynamic-impressions": { include: ["business.cnn.page.impressions","content.impressions"] }
				},
				settings: {
					"linkTrackVars":		"events,prop18,eVar18"
				},
				variablemap: {
					"business.cnn.page.impressions":				["prop18","eVar18"]
				},
				eventmap: {
					"content.impressions":	["event16"]
				},
				premap: function() { },
				postmap: function() { }
			}
		}

	},
	plugins: {

		/* Page Name fix for us.cnn.com domains */
		gCNNPageName: function() {
			var pn = _jsmd.plugin.gADBPPageName();
			return pn.replace(":us","");
		},
		/* Hierarchy fix for us.cnn.com domains */
		gCNNReportDomain: function() {
			var rd = _jsmd.plugin.gADBPURL("domain");
			return rd.replace(/^us\./,"");
		},
		/* video player collection */
		gCNNVideoCollection: function() {
			return {
				/* add: function (i,t) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					vplayer.push(new objVplayer(i,t));
					function objVplayer (videoId,videoTitle) {
						this.videoId = videoId;
						this.videoTitle = videoTitle;
						this.hasScrubbed = false;
						this.isAuto = false;
						this.isHalf = false;
						this.isBuffering = false;
						this.isPaused = false;
					}
				}, */
				get: function (i,p) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							return vplayer[j][p];
						}
					}
				},
				set: function (i,p,v) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							vplayer[j][p] = v;
							break;
						}
					}
				},
				toggle: function (i,p) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							var v = vplayer[j][p];
							vplayer[j][p] = !v;
							break;
						}
					}
				},
				start: function (i,t) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {	//if same video player object exists, remove it
						if (vplayer[j].videoId == i) {
							vplayer.splice (j,1);
						}
					}
					vplayer.push(new objVplayer(i,t));
					function objVplayer (videoId,videoTitle) {
						this.videoId = videoId;
						this.videoTitle = videoTitle;
						this.hasScrubbed = false;
						this.isTen = false;
						this.isTwentyFive = false;
						this.isHalf = false;
						this.isSeventyFive = false;
						this.isBuffering = false;
						this.isPaused = false;
						this.startTime = new Date().getTime();
						this.timeSpent = 0;		//used in pause action to calculate time spent
						this.adNumber = 0;		//used to track which ad in a pod is playing
					}
				},
				/*
				-- pause and buffering senario --
				buffer un-buffer pause     un-pause
				pause  un-pause  buffer    un-buffer
				buffer pause     un-pause  un-buffer
				buffer pause     un-buffer un-pause
				pause  buffer    un-buffer un-pause
				pause  buffer    un-pause  un-buffer
				*/
				pause: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							var p = vplayer[j].isPaused;
							var b = vplayer[j].isBuffering;
							if (!b) {	//not buffering
								if (p) {	//pause -> unpause
									vplayer[j].startTime = new Date().getTime();
								} else {	//unpause -> pause
									var playedTime = new Date().getTime() - vplayer[j].startTime + vplayer[j].timeSpent;	//calculate time spent
									vplayer[j].timeSpent = playedTime;
								}
							}
							vplayer[j].isPaused = !p;
							break;
						}
					}
				},
				buffer: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							var p = vplayer[j].isPaused;
							var b = vplayer[j].isBuffering;
							if (!p) {	//not paused
								if (b) {	//buffer -> unbuffer
									vplayer[j].startTime = new Date().getTime();
								} else {	//unbuffer -> buffer
									var playedTime = new Date().getTime() - vplayer[j].startTime + vplayer[j].timeSpent;	//calculate time spent
									vplayer[j].timeSpent = playedTime;
								}
							}
							vplayer[j].isBuffering = !b;
							break;
						}
					}
				},
				progress: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							var playedTime = ( new Date().getTime() - vplayer[j].startTime ) / 1000;
							vplayer[j].startTime = new Date().getTime();
							return Math.round(playedTime);
						}
					}
				},
				complete: function (i) {
					var vplayer = _jsmd.plugin.md.get("video.players");
					for(var j=vplayer.length-1; j>=0; j--) {
						if (vplayer[j].videoId == i) {
							var playedTime = ( new Date().getTime() - vplayer[j].startTime + vplayer[j].timeSpent ) / 1000;
							return Math.round(playedTime);
						}
					}
				}
			}
		},
		gCNNSection:function(position) { //mb:page.section[0], mb:page.section[1], mb:page.section[2]
			var section=(cnn_metadata.section[position]?cnn_metadata.section[position]:"");
			return section;
		},
		gCNNTemplateType: function(lookupType) { //page.template_type
			var templateTypeCode = cnn_metadata.template_type;
			var adbpprefix="adbp:",rval=["o","other"];
			var lookup={
				b:"blog",
				g:"game",
				it:"interactive",
				c:"content",
				"in":"index",
				err:"error",
				e:"ecom",
				s:"signup",
				v:"video",
				sf:"section front",
				sr:"search results",
				fm:"forum",
				o:"other",
				ir:"ireport",
				sp:"specials",
				pm:"perfect market",
				bf:"blog front",
				bc:"blog category",
				t:"topic",
				w:"weather",
				el:"election"
			},
			lookupRev={
				"blog":"b",
				"game":"g",
				"interactive":"it",
				"content":"c",
				"index":"in",
				"error":"err",
				"ecom":"e",
				"signup":"s",
				"video":"v",
				"section front":"sf",
				"search results":"sr",
				"forum":"fm",
				"other":"o",
				"ireport":"ir",
				"specials":"sp",
				"perfect market":"pm",
				"blog front":"bf",
				"blog category":"bc",
				"topic":"t",
				"weather":"w",
				"election":"el"
			};
			if (lookup[templateTypeCode]!=null) { rval=[templateTypeCode,lookup[templateTypeCode]]; }
			if (lookupRev[templateTypeCode]!=null) { rval=[lookupRev[templateTypeCode],templateTypeCode]; }
			var parameters = {
				c1:'ireport',
				c2:'search results',
				c3:'perfect market',
				c4:'specials',
				c5:'blog front',
				c6:'blog category',
				c7:'topic',
				c8:'weather',
				c9:'election'
			}
			for(p in parameters) {
				if (templateTypeCode == parameters[p]) {adbpprefix = "other:";}
			}
			rval[1]=adbpprefix+rval[1];
			if (lookupType=="short") { rval=rval[0]; }
			if (lookupType=="long") { rval=rval[1]; }
			return rval;
		},
		gCNNContentType:function(defaultVal) {
			var tt=this.md.get("page.template_type"),
			ct=this.md.get("page.content_type"),
			l={
				"adbp:blog":	["blog.read","adbp:blog read"],
				"adbp:content":	["article.read","adbp:article read"],
				"adbp:game":	["game.play","adbp:game played"],
				"other:ireport":	["other.ireport","other:ireport"],
				"other:photo wall":	["content.interactive","other:photo wall"]
			}[tt],
			m={
				"adbp:article read": "article.read"
			}[ct];
			if (m!=null) {
				this.md.push("page.events",m);return ct;
			}
			if (!l) { return defaultVal;}
			this.md.push("page.events",l[0]);return l[1];
		},
		gCNNAuthenticated:function(c1,c2,truevalue,falsevalue,neutralvalue,flag) {
			var rValue = 0;
			if (this.gCookie(c1,flag)) {
				rValue++;
			}
			if (this.gCookie(c2,flag)) {
				rValue++;
			}
			if (rValue == 0) {
				return falsevalue;
			} else if (rValue == 1) {
				return neutralvalue;
			} else {
				return truevalue;
			}
		},
		gCNNFlashVersion:function() {
			var version = "0,0,0";
			try {	//ie
				try {
					/* avoid fp6 minor version lookup issues */
					/* see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/ */
					var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
					try {
						axo.AllowScriptAccess = 'always';
					} catch(e) { version = "6,0,0"; }
				} catch(e) {}
				version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
			} catch(e) {	//other browsers
			try {
				if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
					version = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
				}
			} catch(e) {}
			}
			return version.split(",").shift();
		},
		gCNNgetAuthor:function() {
			var cnnOmniauthor=(cnn_metadata.business.cnn.page.author?cnn_metadata.business.cnn.page.author:"");
			if (!cnnOmniauthor) {
				if (document.getElementsByName("AUTHOR").item(0)) {
					cnnOmniauthor = document.getElementsByName("AUTHOR").item(0).content;
				}
			}
			return cnnOmniauthor;
		},
		gCNNgetLatNav:function() {
			var cnnLateralNav = this.gQuery("iref");
			if (this.gQuery("refresh")) { cnnLateralNav = "auto-refresh" };
			return cnnLateralNav;
		},
		gIreportgetMember:function() {
			var irptMember = this.gCNNAuthenticated("authid","displayname","member","anonymous","NonMember","?");
			return irptMember;
		},
		gIreportOnCNN:function() {
			var irptonCNN;
			if (_w.cnnOmniPartner == "iReport") { irptonCNN="Yes"; } else { irptonCNN="No"; }
			return irptonCNN;
		},
		gIreportgetAssignment:function() {
			var irptAllAssignment;
			if (this.gQuery("topicId")) {
				irptAllAssignment = _w.irptAssign +" ID: "+ this.gQuery("topicId");
			}
			else if (this.gJObj(cnn_metadata, "business.cnn.page.topic")) {
				irptAllAssignment = _w.irptAssign +" ID: "+ this.gJObj(cnn_metadata, "business.cnn.page.topic");
			}
			return irptAllAssignment
		},
		gCNNDaysSinceLastPublish:function(d) {
			var e = new Date();
			var p;
			var j;
			if (d =='a') {
				d = cnn_metadata.business.cnn.page.publish_date;
				j = new Date(d);
			} else if (d.toString().indexOf("/") != -1) {
				p = d.split("/");
				if (p[0].length != 4) {
					p[2] = "20" + p[2];
					j = new Date(p[2]+"/"+p[0]+"/"+p[1]);
				} else {
					j = new Date(d);
				}
			 } else {
				j = new Date(d);
			}
			var ONE_DAY = 1000 * 60 * 60 * 24;
			var date1_ms = e.getTime();
			var date2_ms = j.getTime();
			var difference_ms = Math.abs(date1_ms - date2_ms)
			var days = Math.round((difference_ms/ONE_DAY))
			if (isNaN(days)) {
				return ""
			}
			return Math.round((difference_ms/ONE_DAY)).toString()
		},
		gCNNgetPageAttribution:function() {
			var cnnPA = this.gQuery("hpt");
			if (document.referrer.indexOf("cnn.com") == -1) {cnnPA = "";}
			return cnnPA;
		},
		gCNNgetPhotoImage:function() {
			var cnnImg = this.gJObj(cnn_metadata, "business.cnn.page.photo_slide");
			return cnnImg;
		},
		gCNNURL:function() {	//prop26
			var hostname = _w.location.hostname;
			var pathname = _w.location.pathname;
			pathname = pathname.replace(/([^\/]+\.[^\/]+$)/,"");
			return hostname + pathname;
		},
		sTVEPlayerLocation:function(_val) {
			var loc = _val;
			jsmd.set("tve.player_location", loc);
		},
		gIreportgetMetaContents:function(mn) {
			var m = document.getElementsByTagName('meta');
			for(var i in m) {
				if (m[i].name == mn) {
					return m[i].content;
				}
			}
		},
		gCNNgetBrandingPartner:function() {
			var contentPartner=(cnn_metadata.business.cnn.page.branding_partner?cnn_metadata.business.cnn.page.branding_partner:_w.cnnOmniPartner||"");
			return contentPartner;
		},
		gCNNgetBrandingAd:function() {
			var contentAd=(cnn_metadata.business.cnn.page.branding_ad?cnn_metadata.business.cnn.page.branding_ad:_w.cnnOmniBranding||"");
			return contentAd;
		},
		gCNNgetCookie:function(name) {
			var cookie = this.cookie.get(name);
			return cookie;
		}


		,
/**
 *Description: The plugins object contains helper methods, these methods have been broken up in the core library into an ABDP specific methods file (�plugins_adbp.js�) and Global methods file (�plugins_global.js�) � All the methods in both files belong to the same plugins object and are compiled together in the build process.
 *
 */

		gADBPCampaignStacking:function(the_cookie,param_ref,expiration,max_storage) {
			var s=this.vendor.Adobe.plugins();
			var p1,p2,p3,p4,p5,p6,p7;
			p1 = this.get(param_ref);
			p2 = the_cookie;
			p3 = expiration||30;
			p4 = max_storage||5;
			p5 = "|";
			return (s.campstack.call(s,p1,p2,p3,p4,p5));
		},
		/*
		gADBPTimePart:function(val) {
			var s=this.vendor.Adobe.plugins();
			var currDate = new Date(); // date object
			var dp_year = currDate.getFullYear();	//4 digit year
			currDate.setFullYear(dp_year,2,1);		//set to March 1st of current year
			if (currDate.getDay() == 0) {
				currDate.setDate(currDate.getDate() + 7);
			} else {
				currDate.setDate(currDate.getDate() + (7 - currDate.getDay() + 7));
			}
			var dp_date = currDate.getDate();
			s.dstStart = "3/" + dp_date + "/" + dp_year;
			currDate.setFullYear(dp_year,10,1);		 //set to November 1st of current year
			if (currDate.getDay() > 0) {
				currDate.setDate(currDate.getDate() + (7 - currDate.getDay()));
			}
			dp_date = currDate.getDate();
			s.dstEnd = "11/" + dp_date + "/" + dp_year;
			s.currentYear = dp_year;
			var hourOfDayIn12 = s.getTimeParting("h","-5");
			var ampm = hourOfDayIn12.substring(hourOfDayIn12.length - 2,hourOfDayIn12.length);	//find AM/PM
			var hourOfDayIn24 = hourOfDayIn12.replace(ampm,"");	//remove AM/PM
			var hourOfDayIn12_array = hourOfDayIn24.split(":");
			var hourIn24 = parseInt(hourOfDayIn12_array[0],10) + 12;
			if (ampm == "PM") {
				if (hourIn24 == 24) hourIn24 = 12;
			} else {
				hourIn24 = hourIn24 - 12;
				if (hourIn24 == 12) hourIn24 = "00";
			}
			hourOfDayIn24 = hourIn24 + ":" + hourOfDayIn12_array[1];
			var c=hourOfDayIn24+"|"+s.getTimeParting("d","-5")+"|"+s.getTimeParting("w","-5");
			if (val && val == "h") {
				return hourOfDayIn24;
			} else {
				return (!val?c:s.getTimeParting(val,"-5"));
			}
		},
		*/
		gADBPTranslateTemplateType: function(templateTypeCode,lookupType) {
			var adbpprefix="adbp:",rval=["o","other"];
			var lookup={
					b:"blog",
					g:"game",
					it:"interactive",
					c:"content",
					"in":"index",
					err:"error",
					e:"ecom",
					s:"signup",
					v:"video",
					sf:"section front",
					o:"other"
				},
				lookupRev={
					"blog":"b",
					"game":"g",
					"interactive":"it",
					"content":"c",
					"index":"in",
					"error":"err",
					"ecom":"e",
					"signup":"s",
					"video":"v",
					"section front":"sf",
					"other":"o"
				};
			if(lookup[templateTypeCode]!=null) {rval=[templateTypeCode,lookup[templateTypeCode]];}
			if(lookupRev[templateTypeCode]!=null){rval=[lookupRev[templateTypeCode],templateTypeCode];}
			rval[1]=adbpprefix+rval[1];
			if(lookupType=="short") {rval=rval[0];}
			if(lookupType=="long") {rval=rval[1];}
			return rval;
		},
		gADBPTemplateType: function(defaultString,patterns,matchStrings,bsRules,bsMatchStringIndex) {
			var apre="adbp:",bpre="other:",i=bsMatchStringIndex,rval,adbptype="o";i=(!i?0:i);
			var mpt=matchStrings[i],md=patterns,bs=bsRules,t,t2,check;
			mpt=(!mpt?"":mpt.toLowerCase());t2=(!bs?null:bs[mpt]);
			if(t2!=null) {
				adbptype=t2[0];
				rval=(adbptype==="o"&&t2.length<2?mpt:t2[1]);
			} else {
				if(md!=null) {
					for(m in md) {
						t=chkMatch(matchStrings[md[m][0]],md[m],m);
						if(t) {adbptype=t; break;}
					}
				}
			}
			function chkMatch(checkStr,reArray,val) {
				var i,rval=false,re;
				for(i=reArray.length-1;i>0;i--) {
					re=reArray[i];
					rval=rval||(re.exec(checkStr)!=null?true:false);
				}
				return (!rval?null:val);
			}
			t2=adbptype.split(":");
			if(t2.length==2) { rval=t2[1]; adbptype=t2[0];}
			var x=this.gADBPTranslateTemplateType(adbptype,"long");
			return {full:(adbptype==="o"&&t2[1]?bpre+rval:x),small:adbptype};
		},
		gADBPURL:function(type,lvl){
			var hostname = _w.location.hostname.toLowerCase();
			var pathname = _w.location.pathname.toLowerCase();
			pathname=pathname.replace(/([^\/]+\.[^\/]+$)/,"");
			/* pathname = pathname.replace("index.html","");
			pathname = pathname.replace("index.htm",""); */
			var rval;
			switch(type) {
				case "domain":
					hostname = hostname.replace("www.","");
					if (lvl == parseFloat(lvl)) {
						var domain_array = hostname.split(".");
						var currentPointer = domain_array.length - lvl;
						var currentDomainLevel = (currentPointer >= 0 ? domain_array[currentPointer] : "");
						rval=currentDomainLevel;
					} else {
						rval=hostname;
					}
					break;
				case "path":
					var pathname2 = pathname.substring(1);
					var path_array = pathname2.split("/");
					if (lvl == parseFloat(lvl) && lvl >= 1) {
						var currentPathname = (path_array.length >= lvl ? path_array[lvl-1] : "");
						rval=currentPathname;
					} else {
						rval=pathname;
					}
					break;
				case "hier":
					/* prop41/eVar44, prop42/eVar45 - URL Hierarchy Levels */
					hostname = hostname.replace("www.","");
					var path_array = pathname.substring(1).split("/");
					var h1 = hostname + "/" + path_array[0];
					var h2 = h1;
					if (path_array[1]) h2 = h2 + "/" + path_array[1];
					rval=[h1,h2];
					break;
				default:
					rval=hostname + pathname;
			}
			return rval;
		},

		gADBPContentType:function(defaultVal){
			var tt=this.md.get("page.template_type"),
			ct=this.md.get("page.content_type"),
			l={
				"adbp:blog":	["blog.read","adbp:blog read"],
				"adbp:content":	["article.read","adbp:article read"],
				"adbp:game":	["game.play","adbp:game played"]
			}[tt],
			m={
				"adbp:article read": "article.read"
			}[ct];
			if(m!=null) {
				this.md.push("page.events",m);return ct;
			}
			if(!l) { return defaultVal;}
			this.md.push("page.events",l[0]);return l[1];
		},
		/**
		 *@function gADBPPageName
		 *Description: Gets and returns the ADBP standard page name.
		 * @requires page.template_type to be set before gADBPPageName function is call.
		 * @param {String} pathname: url string path.
		 * @param {String} delimiter: sets the delimiter in the page name string. If not set delimiter = :
		 * @return {String}
		 * @see #gADBPURL
		 */
		gADBPPageName: function(pathname,delimiter) {
			var s_pageName = "";
			if (!delimiter) delimiter = ":";
			var ttbefore = this.md.get("page.template_type");
			if (ttbefore) { //default to "other" if template type is not defined
				ttbefore = ttbefore.replace(/adbp./,"");
				var templateTypeSmall = _jsmd.plugin.gADBPTranslateTemplateType(ttbefore,"short");
			} else {
				var templateTypeSmall = "o";
			}
			var buc_p32 = this.md.get("business.name") + delimiter + templateTypeSmall;
			var thirdLevelDomain = _jsmd.plugin.gADBPURL("domain",3);
			var fullDomain = _jsmd.plugin.gADBPURL("domain");
			var lastTwoDomain = /(\.\w+\.\w+)$/.exec(fullDomain);
			if (lastTwoDomain) thirdLevelDomain = fullDomain.replace(lastTwoDomain[0],"");
			if (!pathname) {
				var p = _w.location.pathname.toLowerCase();
				var a = p.split('/');
				var l = a.length;
				var r = /^index./;
				pathname = (r.test(a[(l-1)])) ? p.replace(/([^\/]+\.[^\/]+$)/,"") : p;
				r = /([^\/]+\.[^\/]+$)/;
				if (!r.test(pathname)){
					l = pathname.length;
					if(pathname.charAt(l-1) !== "/"){pathname = pathname+"/";}
				}
			}
			var pageNameLen,r_len;
			if (thirdLevelDomain == "") {
				pageNameLen = buc_p32.length + 1 + pathname.length;
				if (pageNameLen <= 100) {
					s_pageName = buc_p32 + delimiter + pathname;
				} else {
					r_len = pageNameLen - 100;
					s_pageName = buc_p32 + delimiter + pathname.substring(r_len);
				}
			} else {
				pageNameLen = buc_p32.length + 1 + thirdLevelDomain.length + 1 + pathname.length;
				if (pageNameLen <= 100) {
					s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname;
				} else {
					if (thirdLevelDomain.length <= 5) {
						r_len = pageNameLen - 100;
						s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname.substring(r_len);
					} else {
						thirdLevelDomain = thirdLevelDomain.substring(0,5);
						pageNameLen = buc_p32.length + 1 + thirdLevelDomain.length + 1 + pathname.length;
						if (pageNameLen <= 100) {
							s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname;
						} else {
							r_len = pageNameLen - 100;
							s_pageName = buc_p32 + delimiter + thirdLevelDomain + delimiter + pathname.substring(r_len);
						}
					}
				}
			}
			return s_pageName;
		},
		gADBPRepeatVisitorByPeriod:function(period,domain) {
			var e=new Date(),now=new Date(),cp="rvis"+period,t=parseInt(this.cookie.get(cp),10),vnum=(t!=NaN&&t>0?t+1:1),
			sesonly=this.cookie.get("s"+cp);
			e.setHours(0);e.setMinutes(0);
			if(period==="w") {e.setDate(now.getDate()+7-now.getDay());}
			else if(period==="y") {e.setYear(now.getYear()+1); e.setMonth(0); e.setDate(1);}
			else { // Assume month
				e.setMonth(now.getMonth()+1);e.setDate(1);
			}
			if(sesonly.length==0) {
				this.cookie.set(cp,vnum,e,null,domain);
				sesonly=(vnum>1?"repeat":"new")+":"+vnum;
				this.cookie.set("s"+cp,sesonly,null,null,domain);
			}
			return sesonly;
		},
		gADBPReferralType:function(secDefURLs,refTypeMatchPat,urlTypeMatchPat,href){
			var match_pattern = /http:\/\/([^\/]+)/;
			var matches = match_pattern.exec(refTypeMatchPat);
			var matches2 = match_pattern.exec(urlTypeMatchPat);

			href=href||window.location.href;
			if(href.indexOf("m:")==0 || href.indexOf("mb:")==0) {href=this.md.get(href);}

			var section_definition;

			for (var i = 0; i < secDefURLs.length; i++) {
				var reg_result = secDefURLs[i][1].exec(refTypeMatchPat);

				if(reg_result!=null){
					section_definition = secDefURLs[i][0];
					break;
				}
			}
			if (!(matches && matches2 && matches[1] === matches2[1])) {
				return [section_definition,(matches != null?matches[1]:""),href];
			}
			return "";
		},
		gADBPVideoTimeSpent:function(event) {	//calculate video time spent in sec
			if (event && event == "start") {
				_w.video_start_time = new Date().getTime();	//sets video start times
				_w.video_progress = new Date().getTime();	//sets video progress start times
			} else if (event && event == "progress") {
				if (_w.video_progress > 0) {
					var timeSpent = ( new Date().getTime() - _w.video_progress ) / 1000;
					_w.video_progress = new Date().getTime();		//set new start time
					return Math.round(timeSpent);
				}
			} else if (event && event == "pause") {
				if (_w.video_start_time > 0) {
					if (_w.video_pause[0] == 0) {  //paused
						var playedTime = new Date().getTime() - _w.video_start_time + _w.video_pause[1];
						_w.video_pause = [1,playedTime];
					} else {  //restarted
						_w.video_pause[0] = 0;
						_w.video_start_time = new Date().getTime();
					}
				}
			} else if (event && event == "complete") {
				if (_w.video_start_time > 0) {
					var timeSpent = ( new Date().getTime() - _w.video_start_time + _w.video_pause[1] ) / 1000;
					_w.video_start_time = 0;	//reset value
					_w.video_pause = [0,0];		//reset value
					_w.video_progress = 0;		//reset value
					return Math.round(timeSpent);
				}
			} else {
				return false;
			}
		},

	/**
	 *@function gADBPVisitorSegments
	 *Description: shows whether or not visitors are a new or repeat visitor for the lifetime of the experience, gives user lifetime visits number, current calender month visits number and past 30 days visits.
	 	Has 4 different return values:
		 - if param "30day" is passed into the function:
		1. 30Day : [<new | repeat>, <visit number>]
		-return example 30Day: new, 1
		Note: this is a rolling 30 day count, showing the users visits for the past 30 days - not 30 days from last visit.

		 - if param "month" is passed into the function:
		2. calendar_month : [<new | repeat>, <visit number>]
		- return example calendar_month: new, 1

		 - if param "liftime" is passed into the function:
		3. lifetime: [<new | repeat>, <visit number>]
		-return example lifetime: new, 1

		 - if no param is passed into the function
		4. All : { $30Day:  [<new | repeat>, <visit number>],  calendar_month : [<new | repeat>, <visit number>],  lifetime : [<new | repeat>, <visit number>] }
		- return example: new,1|new,1|new,1
		- note here how you can also use the return of arrays so that $30Day[0] = new, calendar_month[1] = 1
	 * @return {String}
	 * @see #cookie
	 * @see Function.prototype.jsmdBind
	 */
		gADBPVisitorSegments:function(_rParam, _rollday) {
			var rollDay = parseInt(_rollday);	//rolling days (max 30 days)
			/** tt = current time */
			var tt = new Date().getTime();
			/** uc = user cookie: may return back null/undefined */
			var uc = this.cookie.get('tnr:usrvtstg01');		//1303834046328|2|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|2|f|2|3|1303836463058
			/** sa = array from cookie values */
			var sa = (uc)?uc.split('|'):'';
			/** lt = first index in array exp: {Date} 1296090865842 */
			var lt = (uc)?sa[0]:0;
			/** ltV= gets the last day visited */
			var ltV = (uc)?Math.round((tt-(sa[35]*1))/86400000):null;
			/** vsDCnt = gets the visited day count/ 24hrs */
			var vsDCnt = (uc)?(Math.round((tt-lt)/86400000))+1:1;
			/** sc = get session cookie */
			var sc = this.cookie.get('tnr:sesctmp01');
			var lts = (sc)?(sc)*1:null;
			/** thtyMinCk = checks if the user has returned in less then 30 min */
			var is30Min = ((tt - lts)>=1800000)?true:false;
			/** rnstg = return string value */
			var rnstg = null;
			/** isThtyD = thirty day check boolean */
			var isThtyD = (vsDCnt>rollDay || sa[32] == 't')?true:false;
			/** sPath = Set the path to track the users visit per page*/
			var sPath = (window.location)?window.location.pathname:'/';
			/** crntMnth = the users current month */
			var crntMnth = new Date().getMonth();
			/** rParam = return string param : values = '30Day' || 'lifetime' || 'month' */
			var rParam = _rParam, ks = false;
			var thirtyDSum, lifTimeSum, calMnthSum;
			var isIE7 = false, pagMtch = "";

			if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
				pagMtch = sPath.match(/([^\/]+\.[^\/]+$)/);
				sPath = sPath.replace(/([^\/]+\.[^\/]+$)/,"");
				isIE7 = true;
			}

			/** keeps a 30 day rolling value */
			thtyDRestChk = function(){
				if (isThtyD){
					var mv = ltV;//((vsDCnt*1) === 30)?0:(vsDCnt - 30);//2
					var ln = 34;
					var c = sa[30]*1;
					if (ltV > rollDay) {
						ks = true;
						sNewCookie();
					} else {
						for (var j = 1; j < ln; j++) {
							if (j < 31 && ltV == 1){
								sa[j] = sa[j+1];
							}else if ((mv+j) < 31 ){
								sa[j] = sa[j+mv];
							}
						}
						for(var e=rollDay; e>(rollDay-ltV); e--) {
							if (e < rollDay){
								sa[e] = 0;
							}
						}
						sa[32] = 't';
					}
					sa[30] = 0;
				}
			}.jsmdBind(this)

			/** sets the value of the user visits cookie for all return visitors */
			sUsrVistCookieVal = function(){
				if (!ks){
				sa[31] = (sa[31]*1) + 1; // set lifetime visits
				sa[33] = (sa[34] != crntMnth)?1:(sa[33]*1)+1; //set the month visit sum
				sa[34] = crntMnth; // set value for current month
				sa[35] = tt; // set value for current month

				var av = (sa[32] === 't' && ltV<30)?30:(vsDCnt<=30)?vsDCnt:((vsDCnt-30) < 30)?((vsDCnt - 30)+1):1;
				av = av + 30 - rollDay;

				sa[av] = (sa[av]*1) + 1;
				var ln = sa.length;
				var ns = '';
				for (var i = 0; i < ln; i++) {
					ns += (i < 35)?sa[i]+'|':sa[i];
				}
				if(!isIE7){
					this.cookie.set('tnr:usrvtstg01', ns, 2000, sPath);
				} else if (sa[36] == pagMtch){
					ns = ns+"|"+pagMtch;
					this.cookie.set('tnr:usrvtstg01', ns, 2000, sPath);
				}

				}
			}.jsmdBind(this)

			/** sets the return value */
			sRtnObj = function () {
				var r;
				var lng = sa.length;
				thirtyDSum = 0;
				lifTimeSum = sa[31];
				calMnthSum = sa[33];

				for (var x=31-rollDay; x<lng; x++) {
					var cnm = sa[x];
					if (cnm != 0 && x < 31) {
						thirtyDSum += (cnm*1);
					}
				}
				r = gRtArr();
				return r;
			}.jsmdBind(this)

			/** sets the return value */
			gRtArr = function () {
				var _r;
				if (thirtyDSum == null) thirtyDSum = '1';
				if (lifTimeSum == null) lifTimeSum = '1';
				if (calMnthSum == null) calMnthSum = '1';
				if(rParam === '30day' || rParam === '30Day'){
					_r = [gNoR(thirtyDSum),thirtyDSum+''];
				} else if(rParam === 'liftime'){
					_r = [gNoR(lifTimeSum),lifTimeSum+''];
				} else if(rParam === 'month'){
					_r = [gNoR(calMnthSum),calMnthSum+''];
				} else {
					_r = {
						'$30Day':[gNoR(thirtyDSum),thirtyDSum+''],
						'calendar_month':[gNoR(calMnthSum),calMnthSum+''],
						'liftime':[gNoR(lifTimeSum),lifTimeSum+'']
					};
				}

				return _r;
			}.jsmdBind(this)

			/* gets the new or repeat value */
			gNoR = function (_v) { if (_v <= '1') {return 'new'} else {return 'repeat'} }

			/** sets new cookie for first time visit */
			sNewCookie = function()  {
				var vStng = tt + "|";
				for (var i=0; i<30; i++) {
					vStng += (i==30-rollDay) ? 1 : 0;
					vStng += "|";
				}
				vStng = vStng + "1|f|1|" + crntMnth + "|" + tt;
				if(isIE7){ vStng = vStng+"|"+pagMtch}
				this.cookie.set('tnr:usrvtstg01', vStng, 2000, sPath);
				this.cookie.set('tnr:sesctmp01' , tt, null, sPath);
			}.jsmdBind(this)


			if (uc && sc && is30Min && !isIE7){
				thtyDRestChk();
				sUsrVistCookieVal();
			} else if (!uc) {
				sNewCookie();
				rnstg = gRtArr();
				return rnstg;
			} else if(isIE7 && sa[36] == pagMtch){
					thtyDRestChk();
					sUsrVistCookieVal();
			}
			this.cookie.set('tnr:sesctmp01' , tt, null, sPath);
			rnstg = sRtnObj();

			return rnstg;
		}

		,

		gCookie:function(param,flag){ var r=this.cookie.get(param); if(flag==='c'||flag===1) this.cookie.set(param,"-",-1000); return unescape(r);},
		gDOM:function(domstring){return eval(domstring);},
		gJObj:function(objectRef,attribute) {
			objectRef=(typeof objectRef=="string"?window[objectRef]:objectRef);
			var rval=(objectRef!=null&&attribute!=null&&attribute.indexOf(".")==-1&&attribute.indexOf("[")==-1?objectRef[attribute]:objectRef);
			if(rval===objectRef) {
				var attribs=attribute.split("."),len=attribs.length,reArray=/([^\[]+)\[(\d+)\]/,t,t2,rval=objectRef;
				for(var i=0;i<len;i++) {
					t=attribs[i];
					if((t2=reArray.exec(t))!=null) {
						rval=rval[t2[1]][parseInt(t2[2])];
					} else rval=rval[t];
				}
			}
			return rval;
		},
		gMeta:function(tag){
			var a=tag,b=this.metatags;if(b==null){var c=document.getElementsByTagName("meta"),i=c.length;b={};while(i--){if(c[i].name.length>0)b[c[i].name]=(c[i].content?c[i].content:"");} this.metatags=b;} return(b[a]==null?"":b[a]);},
		gQueryOnce:function() {
			var i,param="";
			for(i=arguments.length-1;i>=0;i--) { param+=arguments[i]+",";}
			return (!this[param]?this[param]=this.gQuery.call(this,param):null);
		},
		gQuery:function() {
			var s=this.vendor.Adobe.plugins();
			var i,param="";
			for(i=arguments.length-1;i>=0;i--) { param+=arguments[i]+",";}
			var r=(!s.getQueryParam?null:s.getQueryParam.call(s,param));
			return (r!=null&r.length>0?r:null);
		},
		/**
		 * @function gQeurySpecial
		 * Description: returns the value for a given query string param regardless of the delimiter starting the query string or between values . Pass in the query sting param you want to return and a delimiter if a character ignored by encodeURI() function is expected to separates query values.
		 * @param {String} _v : query string value you want to lookup and return.
		 * @param {String} _d : delimiter if a special character is expected to separates query values. Must be a character ignored by encodeURI() function.
		 * @return {String} qeury value
		 */
		gQeurySpecial: function (_v, _d){
			var q = _w.location.href;
			var s = '';
			var d = _d;
			var v = (_v.indexOf('=')!= -1)?_v+'':_v+'=';
			var l = v.length;

			if (q.indexOf(v) != -1) {
				var n = q.indexOf(v);
				s = q.substr(n+l);
				n = s.indexOf(d);
				n = (n != -1)?n:s.indexOf('&');
				s = (n != -1)?s.substr(0,n): s;
				return s;
			}
		},
		gIreportgetMetaCompatible:function(mn){
		  var m = document.getElementsByTagName('meta');
		  for(var i in m){
			if(m[i].content == mn){
				return m[i].content;
			}
		  }
		},
		vendor: {
			Adobe: {
				plugins: function(s) {
					if (!s) {
						s=this.tmp;
						if(!s) { s=s_gi("ignore");}
					}
					if(!s._jsmd_plugins_done) {
						/*
						 * Plugin: getQueryParam 2.3
						 */
						s.getQueryParam=new Function("p","d","u",""
						+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
						+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
						+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
						+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
						+"=p.length?i:i+1)}return v");
						s.p_gpv=new Function("k","u",""
						+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
						+"=s.pt(q,'&','p_gvf',k)}return v");
						s.p_gvf=new Function("t","k",""
						+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
						+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
						+"epa(v)}return ''");

						/*
						 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
						 */
						s.getTimeParting=new Function("t","z",""
						+"var s=this,cy;dc=new Date('1/1/2000');"
						+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
						+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
						+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
						+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
						+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
						+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
						+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
						+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
						+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
						+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
						+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
						+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
						+"if(t=='d'){return dow};if(t=='w'){return dt}}};");

						/*
						 * Campaign Stacking Plugin
						 */
						s.campstack=new Function("v","cn","ex","ct","dl","ev","dv",""
						+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
						+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
						+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
						+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
						+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
						+";if(c&&c!='')arry=eval(c);var e=new Date();e.setFullYear(e.getFullY"
						+"ear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[ar"
						+"ry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new"
						+" Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;var "
						+"td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.roun"
						+"d((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arr"
						+"y[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{deli"
						+"m:',',front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join"
						+"(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");

						/*
						* Plugin: getPreviousValue_v1.0 - return previous value of designated
						*   variable (requires split utility)
						*/
						s.getPreviousValue=new Function("v","c","el",""
						+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
						+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
						+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
						+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
						+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
						/*
						* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
						*/
						s.split=new Function("l","d",""
						+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
						+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

						/*
						* Plugin: getPercentPageViewed v1.2
						*/
						s.getPercentPageViewed=new Function("",""
						+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
						+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
						s.getPPVCalc=new Function("",""
						+"var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,"
						+"s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s."
						+"d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d."
						+"documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentE"
						+"lement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s"
						+".wd.document.documentElement.scrollTop||s.wd.document.body.scrollTo"
						+"p),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){"
						+"s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
						s.getPPVSetup=new Function("",""
						+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
						+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
						+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
						+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
						+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
						+"lc);}");

						/*
						 * Plugin: linkHandler 0.5 - identify and report custom links
						 */
						s.linkHandler=new Function("p","t",""
						+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
						+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
						+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
						+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
						s.p_gn=new Function("t","h",""
						+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
						+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
						+"return 0;");
						/*
			             * Utility Function: p_gh
			             */
			            s.p_gh=new Function(""
			            +"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
			            +"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
			            +"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
			            +"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
			            /*
						* TNT Integration Plugin v1.0
						* v - Name of the javascript variable that is used. Defaults to s_tnt
						(optional)
						* p - Name of the url parameter. Defaults to s_tnt (optional)
						* b - Blank Global variable after plugin runs. Defaults to true (Optional)
						*/
						s.trackTNT = function(v, p, b)
						{
						var s=this, n="s_tnt", p=(p)?p:n, v=(v)?v:n, r="",pm=false, b=(b)?b:true;
						if(s.getQueryParam)
						pm = s.getQueryParam(p); //grab the parameter
						if(pm)
						r += (pm + ","); // append the parameter
						if(s.wd[v] != undefined)
						r += s.wd[v]; // get the global variable
						if(b)
						s.wd[v] = ""; // Blank out the global variable for ajax requests
						return r;}
						s.getPPVSetup();

						s._jsmd_plugins_done=true;
					}
				return this.tmp=s;
				}
			}
		},
		tCase: function(arg) {
			var rval=arg,i;
			switch(typeof(arg)) {
				case "string": rval=arg.toLowerCase(); break;
				case "object":
					for(i in arg) {
						if(typeof(arg[i])=="string") arg[i]=arg[i].toLowerCase();
					}
			}
			return rval;		// Case transformation function
		},
		tTrim: function(arg,addlRegexs) {
			if(!(arg!=null&&arg.length>0)||typeof(arg)==="object") {return arg;}
			var a=addlRegexs,rval=arg;
			if(!addlRegexs) {
				a=[[/\s+/g," "],/^\s+/,/\s+$/];
			}
			var i=a.length,rstr="",r;
			while(i--) {
				rstr="";
				r=a[i];
				if(typeof(r.exec)==="undefined"){
					r=a[i][0];
					rstr=a[i][1];
				}
				rval=rval.replace(r,rstr);
			}
			return rval;
			},
		tSub: function(arg,delimiter,i) { var r=""; try{r=arg.split(delimiter)[i];}catch(err) {}; return r;
		},
		tAll: "tCase|tTrim",	// The "tAll" transform is a special transform and will be applied to all functions automatically
		/**
		 *Description: gets and sets client-side cookies.
		 */
		cookie: {
			/**
			 *@function get
			 *Description: Gets a cookie from local users computer
			 *@param k = key / name {String} of cookie
			 *@return {String} cookie value string
			 */
			get: function(k){var c=' '+document.cookie,s=c.indexOf(' '+k+'='),e=s<0?s:c.indexOf(';',s),v=s<0?'':c.substring(s+2+k.length,e<0?c.length:e);return unescape(v);},
			/**
			 *@function set
			 *Description: Sets a cookie on local users computer
			 *@param k = key / name {String}
			 *@param v = value {String}
			 *@param e = expires {Number, Date Object}
			 *@param p = path {String}
			 *@param d = domain {String}
			 */
			set: function(k,v,e,p,d){var exp=(typeof(e)=="object"?e:new Date((new Date().getTime())+(!e?0:e)*86400000));document.cookie=k+"="+escape(v)+(e!=null?"; expires="+exp.toGMTString():"")+"; path="+(!p?"/":p)+"; "+(d!=null?" domain="+d:"");}
		}

	},
	dynamic: {

		/* All dynamic Actions defined here */
		actions: {
			"dynamic-link": function(data,map) {
				this.set("action","link");
				this.set("link",{name:data.link_name,type:"o"});
				this.send();
			},
			"tab-page": function(data, map) {
				this.set("page.name", "cnn:v:/video/" + data);
				this.send();
			},
			"preview-video": function(data, map) {
				var player = this.plugin.gJObj(cnn_metadata,"business.cnn.video.video_player");
				var pageAtribution = this.plugin.gJObj(cnn_metadata,"business.cnn.video.video_hpt");
				var collection = this.plugin.gJObj(cnn_metadata,"business.cnn.video.video_collection");
				this.set("business.cnn.video.video_player",player);
				this.set("business.cnn.page.HPlocation", pageAtribution);
				this.set("business.cnn.video.video_collection", collection);
				this.set("action","link");
				this.set("link",{name: "video-preview: "+ data, type: "o"});
				this.push("page.events","video.preview");
				this.send();
			},
			"search-results": function(data,map) {
				this.set("page.template_type","other:search results");
				this.set("page.content_type",this.plugin.gJObj(data,"content_type"));
				this.set("page.section[0]",this.plugin.gJObj(data,"section[0]"));
				this.set("page.name",this.plugin.gADBPPageName());
				this.set("search.internal.number_results",this.plugin.gJObj(data,"search.number_results").toString());
				this.set("search.internal.keyword",this.plugin.gJObj(data,"search.term"));
				this.send();
			},
			"dynamic-newsPulseOmniCall": function(data,map) {
				var d=data.newspulse||{};
				this.set("business.cnn.page.newspulse", d.query);
				this.set("action","link");
				this.set("link",{name:"newspulse",type:"o"});
				this.send();
			},
			"dynamic-autoRefresh": function(data,map) {
				this.set("business.cnn.page.lateral_navigation", data);
				this.set("action","link");
				this.set("link",{name:"auto-refresh",type:"o"});
				this.set("business.cnn.page.section[0]",null);
				this.set("business.cnn.page.section[1]",null);
				this.set("business.cnn.page.section[2]",null);
				this.set("business.cnn.page.visit_number.$30Day",null);
				this.set("business.cnn.page.ireport.member",null);
				this.set("business.cnn.page.flashversion",null);
				this.set("page.clean_url",null);
				this.set("page.name",null);
				this.set("business.friendly_name",null);
				this.set("page.template_type",null);
				this.set("page.content_type",null);
				this.set("user.authenticated",null);
				this.set("code.version",null);
				this.set("time",null);
				this.set("page.url_section[0]",null);
				this.set("page.url_section[1]",null);
				this.set("page.events",null);
				this.set("page.hier1",null);
				this.send();
			},
			"dynamic-impressions": function(data,map) {
				this.set("business.cnn.page.impressions", data.value);
				this.set("action","link");
				this.set("link",{name:data.link_name,type:"o"});
				this.set("business.cnn.page.section[0]",null);
				this.set("business.cnn.page.section[1]",null);
				this.set("business.cnn.page.section[2]",null);
				this.set("business.cnn.page.visit_number.$30Day",null);
				this.set("business.cnn.page.ireport.member",null);
				this.set("business.cnn.page.flashversion",null);
				this.set("page.clean_url",null);
				this.set("page.name",null);
				this.set("business.friendly_name",null);
				this.set("page.template_type",null);
				this.set("page.content_type",null);
				this.set("user.authenticated",null);
				this.set("code.version",null);
				this.set("time",null);
				this.set("page.url_section[0]",null);
				this.set("page.url_section[1]",null);
				this.set("page.hier1",null);
				this.send();
			},
			"dynamic-toggle": function(data,map) {
				this.set("business.cnn.page.impressions", data);
				this.set("action","link");
				this.set("link",{name:data,type:"o"});
				this.set("business.cnn.page.section[0]",null);
				this.set("business.cnn.page.section[1]",null);
				this.set("business.cnn.page.section[2]",null);
				this.set("business.cnn.page.visit_number.$30Day",null);
				this.set("business.cnn.page.ireport.member",null);
				this.set("business.cnn.page.flashversion",null);
				this.set("page.clean_url",null);
				this.set("page.name",null);
				this.set("business.friendly_name",null);
				this.set("page.template_type",null);
				this.set("page.content_type",null);
				this.set("user.authenticated",null);
				this.set("code.version",null);
				this.set("time",null);
				this.set("page.url_section[0]",null);
				this.set("page.url_section[1]",null);
				this.set("page.hier1",null);
				var cnnVendors = jsmd.config.map.cnn_main.vendors;
				var cnnVenLen = cnnVendors.length;
				var cnnVenStorage;
				for(var i = 0; i < cnnVenLen; i++) {
					if (cnnVendors[i].account == "standard_nielsen") {
						cnnVenStorage = cnnVendors[i];
						cnnVendors[i] = {};
						this.send();
						cnnVendors[i] = cnnVenStorage;
					};
				};
			},
			"dynamic-page": function(data,map) {
				var co = data.clickObj||{};
				if (co.socialType) {	//zite drop down menu
					var pageName = this.get("page.name");
					if (pageName.match(/\s\[.+\]$/)) {	//remove previously added value
						var t1 = /(.+)\s\[.+\]$/.exec(pageName);
						if (t1) pageName = t1[1];
					}
					this.set("page.name", pageName + " [" + co.socialType + "]");	//pageName,eVar26
				}
				this.send();
			},
			"flash-link": "alias:dynamic-link",
			"flash-page": "alias:dynamic-page",
			"audio-start": function(data, map) {
				this.set("business.cnn.audio.audio_title",data);
				this.set("page.content_type","other:audio start");
				this.set("action","link");
				this.set("link",{name: "audio-start: "+ data, type: "o"});
				this.push("page.events","audio.start");
				this.send();
			},
			"ireport-rate": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-rate: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.rate");
				this.send();
			},
			"ireport-comment": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-comment: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.comment");
				this.send();
			},
			"ireport-flag-comment": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-flag-comment: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.flag");
				this.send();
			},
			"ireport-share": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-share: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.share");
				this.send();
			},
			"ireport-download": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-download: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.download");
				this.send();
			},
			"ireport-vote": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-vote: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.vote");
				this.send();
			},
			"ireport-flag-story": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-flag-story: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.flag.story");
				this.send();
			},
			"ireport-email": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-email: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.email");
				this.send();
			},
			"ireport-form-success": function(data, map) {
				this.set("action","link");
				this.set("link",{name: "ireport-form-success: ", type: "o"});
				this.set("page.events",null);
				this.push("page.events","ireport.form.success");
				this.send();
			},
			"ireport-sign-up": function (data, map) {
				var pageName = this.get("page.name");
				this.set("action", "link");
				this.set("link", {name: "ireport-sign-up: ",type: "o"});
				this.set("business.cnn.page.ireport.registration", pageName );
				this.set("page.events", null);
				this.push("page.events", "ireport.signup");
				this.send();
			},
			"ireport-openstory": function(data, map) {
				var d=data.openstory||{};
				this.set("business.cnn.page.photo.gallery", "ireport: " + d.openStoryID);
				this.set("business.cnn.page.photo.slide", "ireport: " + d.docID);
				this.set("link",{name: "ireport-openstory" + d.headline, type: "o"});
				var p = new Date(d.publish_date)
				var mo = p.getMonth() + 1;
				this.set("business.cnn.page.publish_date", p.getFullYear() + "/" + mo + "/" + p.getDate());
				var days = _jsmd.plugin.gCNNDaysSinceLastPublish(d.publish_date);
				this.set("business.cnn.page.days_since_publish",days+"");
				if (jsmdIsInit==true) {
					jsmdIsInit=false;
				} else {
					this.send();
				}
			},
			"photo-page": function(data, map) {
				var gallery = this.plugin.gJObj(cnn_metadata,"business.cnn.page.photo_gallery");
				this.set("business.cnn.page.photo.gallery", gallery);
				if (jsmdIsInit==true) {
					this.set("business.cnn.page.photo.slide", "");
					this.push("page.events", "content.interactive");
					jsmdIsInit=false;
				} else {
					this.set("page.events", null);
					this.push("page.events", "content.interactive");
					this.push("page.events", "content.gallery");
					this.set("page.content_type", "other:gallery");

					if (data.img) {
						this.set("business.cnn.page.photo.slide", data.img);
					} else if (data.before) {
						this.set("business.cnn.page.photo.slide", data.before);
					}
				}
				if (data.title) {
					this.set("link",{name: "photo-page:" + data.title, type: "o"});
				} else if (data.caption) {
					this.set("link",{name: "photo-page:" + data.caption, type: "o"});
				}
				if (this.plugin.gJObj(cnn_metadata,"template_type_content") == "gallery") {
					this.send();
				}
			},
			"video-page": function(data, map) {
				var v=data.video||{};
				this.set("page.name", "cnn:v:/video/video");

				/* add new video player object */
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.start(v.id,v.title);

				this.push("page.events","video.start");
				this.push("page.events","page.view");
				this.send();
				if (v.iscmsIIimport && v.cmsIIimportType && v.iscmsIIimport == "true" && v.cmsIIimportType == "legacy money") {
					/* add new video player object */
					var action=this.config.vendor.action,l=action.length,args,f,vo;
					while(l--) {
						vo=action[l][0];f=action[l][1];args=action[l][2];
						if (vo && vo[f].apply) {
							try {
								if (vo.trackingServer) {
									var voReferenceObjct = action[0][0];
									voReferenceObjct.trackingServer = "metrics.cnn.com";
									voReferenceObjct.trackingServerSecure = "smetrics.cnn.com";
									var host = _w.location.hostname;
									var path = _w.location.pathname;
									var accountName = "aolturnercnnmoneyoffsite";
									voReferenceObjct.fun = voReferenceObjct.oun = voReferenceObjct.un = accountName;
									voReferenceObjct.referrer = document.referrer;
									voReferenceObjct.pageName = voReferenceObjct.eVar1 = voReferenceObjct.prop7 = voReferenceObjct.products =this.get("video.id");
									voReferenceObjct.prop31 = voReferenceObjct.eVar31 = voReferenceObjct.prop1 = voReferenceObjct.eVar3= host;
									voReferenceObjct.prop33 = voReferenceObjct.eVar33 = voReferenceObjct.prop2 = voReferenceObjct.eVar4 = "news";
									voReferenceObjct.eVar71 = voReferenceObjct.prop71 = voReferenceObjct.prop30 = voReferenceObjct.eVar30 =v.source;
									voReferenceObjct.prop32 = voReferenceObjct.eVar32 = v.trt;
									voReferenceObjct.eVar61 = voReferenceObjct.prop61 = "primary";
									voReferenceObjct.events = "event1";
									voReferenceObjct.linkTrackVars = "pageName,products,prop1,eVar3,prop2,eVar4,eVar1,prop7,prop30,eVar30,prop31,eVar31,prop32,eVar32,prop33,eVar33,prop61,eVar61,prop71,eVar71,events";
									voReferenceObjct.linkTrackEvents = "event1";
									vo[f].apply(voReferenceObjct,args);
								}
								if (vo._jsmd.destroy!=null) { vo._jsmd.destroy(vo); vo._jsmd=null; }
							} catch(err) {}
						}
					}
				}
				var section = this.get("business.cnn.page.section[0]");
				var c4override = getSiteSpecificSettings(8,section);

				if (v.iscmsIIimport && v.cmsIIimportType && v.iscmsIIimport == "true" && v.cmsIIimportType == "legacy money") {
					neilsenCNNMoney = {
						"video-census": {
							clientid: "us-100120",
							vcid: "c02",
							prod: "vc",
							sfcode: "us"
						}
					};
					sendNielsenVideoCensusBeacon(neilsenCNNMoney, "start", v.id);
					_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}&rn=${random}", {
							c1:'1', 		// Video metrix tag identifier
							c2:'8587182', 	// Turner Specific Tag
							c3:'00003', 	// Report-suite numeric identifier for comparisons to Omniture
							c4:'8587295',	// SI Specific Tag
							c5:'020000'
						}
					);
				} else {
					sendComscoreVideoMetrixBeacon(v.id, 1, c4override); // Content-related comscore call
					sendNielsenVideoCensusBeacon(this.get("m:nielsen"), "start", v.id);
				}
			},
			"video-preroll": function(data, map) {
				var v=data.video||{};
				if (v.ad_duration) { jsmdAdRange = Math.round(v.ad_duration).toString(); }
				this.set("business.cnn.video.ad_duration",jsmdAdRange);
				this.set("page.content_type","other:ad start");
				this.set("action","link");
				if (_w.video_data) { //live video only
					var vc = new _jsmd.plugin.gCNNVideoCollection();
					var ad_number = vc.get(_w.video_data.video.id,"adNumber");
					var cur_ad_number = ad_number + 1;
					this.set("link",{name: "video-midroll"+cur_ad_number+": "+ v.headline, type: "o"});
					this.push("page.events","video.midroll");	//event25
				} else {
					this.set("link",{name: "video-preroll: "+ v.headline, type: "o"});
					this.push("page.events","video.preroll");	//event35
				}
				this.send();
				jsmdAdVidID = v.id;
				jsmdIsAd=true;
				if (_w.video_data) {
					if (_w.live_interval && _w.live_interval > 0 && ad_number == 0) {	//send only for the first ad in a pod
						_w.sendVideoProgress();	//moving down after this.send() because excuting another dynamic action before excuting the send() for the initial dynamic action won't send a desired custom link call
						clearInterval(_w.setinterval_id);	//clear setInterval
					}
					vc.set(_w.video_data.video.id,"adNumber",cur_ad_number);
				}
			},
			"video-midroll-complete": function(data, map) {
				if (_w.video_data) { //live video only
					var vc = new _jsmd.plugin.gCNNVideoCollection();
					vc.set(_w.video_data.video.id,"adNumber",0);
					if (_w.live_interval && _w.live_interval > 0) {
						var jj = _w.live_interval * 1000;
						_w.setinterval_id = setInterval("_w.sendVideoProgress()",jj);
					}
				}
			},
			"video-start": function(data, map) {
				var v=data.video||{};
				/* add new video player object */
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.start(v.id,v.title);
				this.set("action","link");
				this.set("link",{name: "video-start: "+ v.headline, type: "o"});
				this.push("page.events","video.start");
				this.send();
				if (v.iscmsIIimport && v.cmsIIimportType && v.iscmsIIimport == "true" && v.cmsIIimportType == "legacy money") {
					/* add new video player object */
					var action=this.config.vendor.action,l=action.length,args,f,vo;
					while(l--) {
						vo=action[l][0];f=action[l][1];args=action[l][2];
						if (vo && vo[f].apply) {
							try {
								if (vo.trackingServer) {
									var voReferenceObjct = action[0][0];
									voReferenceObjct.trackingServer = "metrics.cnn.com";
									voReferenceObjct.trackingServerSecure = "smetrics.cnn.com";
									var host = _w.location.hostname;
									var path = _w.location.pathname;
									var accountName = "aolturnercnnmoneyoffsite";
									voReferenceObjct.fun = voReferenceObjct.oun = voReferenceObjct.un = accountName;
									voReferenceObjct.referrer = document.referrer;
									voReferenceObjct.pageName = voReferenceObjct.eVar1 = voReferenceObjct.prop7 = voReferenceObjct.products =this.get("video.id");
									voReferenceObjct.prop31 = voReferenceObjct.eVar31 = voReferenceObjct.prop1 = voReferenceObjct.eVar3= host;
									voReferenceObjct.prop33 = voReferenceObjct.eVar33 = voReferenceObjct.prop2 = voReferenceObjct.eVar4 = "news";
									voReferenceObjct.eVar71 = voReferenceObjct.prop71 = voReferenceObjct.prop30 = voReferenceObjct.eVar30 =v.source;
									voReferenceObjct.prop32 = voReferenceObjct.eVar32 = v.trt;
									voReferenceObjct.eVar61 = voReferenceObjct.prop61 = "primary";
									voReferenceObjct.events = "event1";
									/* offiste tracking updates */
									voReferenceObjct.eVar5 = v.metas.branding;
									voReferenceObjct.eVar6 = "SingleClip";
									voReferenceObjct.eVar7 = v.source;
									voReferenceObjct.eVar8 = v.category;
									voReferenceObjct.eVar9 = v.headline;
									voReferenceObjct.linkTrackVars = "pageName,products,prop1,eVar3,prop2,eVar4,eVar1,prop7,prop30,eVar30,prop31,eVar31,prop32,eVar32,prop33,eVar33,prop61,eVar61,prop71,eVar71,events,eVar5,eVar6,eVar7,eVar8,eVar9";
									voReferenceObjct.linkTrackEvents = "event1";
									vo[f].apply(voReferenceObjct,args);
								}
								if (vo._jsmd.destroy!=null) { vo._jsmd.destroy(vo); vo._jsmd=null; }
							} catch(err) {}
						}
					}
				}
				var section = this.get("business.cnn.page.section[0]");
				var c4override = getSiteSpecificSettings(8,section);
				if (v.iscmsIIimport && v.cmsIIimportType && v.iscmsIIimport == "true" && v.cmsIIimportType == "legacy money") {
					neilsenCNNMoney = {
						"video-census": {
							clientid: "us-100120",
							vcid: "c02",
							prod: "vc",
							sfcode: "us"
						}
					};
					sendNielsenVideoCensusBeacon(neilsenCNNMoney, "start", v.id);
					_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}&rn=${random}", {
							c1:'1', 		// Video metrix tag identifier
							c2:'8587182', 	// Turner Specific Tag
							c3:'00003', 	// Report-suite numeric identifier for comparisons to Omniture
							c4:'8587295',	// SI Specific Tag
							c5:'020000'
						}
					);
				} else {
					sendComscoreVideoMetrixBeacon(v.id, 1, c4override); // Content-related comscore call
					sendNielsenVideoCensusBeacon(this.get("m:nielsen"), "start", v.id);
				}
			},
			"video-autostart": function(data, map) {
				var v=data.video||{};
				/* add new video player object */
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.start(v.id,v.title);
				this.set("action","link");
				this.set("link",{name: "video-autostart: "+ v.headline, type: "o"});
				this.push("page.events","video.autostart");
				this.send();
				if (v.iscmsIIimport && v.cmsIIimportType && v.iscmsIIimport == "true" && v.cmsIIimportType == "legacy money") {
					/* add new video player object */
					var action=this.config.vendor.action,l=action.length,args,f,vo;
					while(l--) {
						vo=action[l][0];f=action[l][1];args=action[l][2];
						if (vo && vo[f].apply) {
							try {
								if (vo.trackingServer) {
									var voReferenceObjct = action[0][0];
									voReferenceObjct.trackingServer = "metrics.cnn.com";
									voReferenceObjct.trackingServerSecure = "smetrics.cnn.com";
									var host = _w.location.hostname;
									var path = _w.location.pathname;
									var accountName = "aolturnercnnmoneyoffsite";
									voReferenceObjct.fun = voReferenceObjct.oun = voReferenceObjct.un = accountName;
									voReferenceObjct.referrer = document.referrer;
									voReferenceObjct.pageName = voReferenceObjct.eVar1 = voReferenceObjct.prop7 = voReferenceObjct.products =this.get("video.id");
									voReferenceObjct.prop31 = voReferenceObjct.eVar31 = voReferenceObjct.prop1 = voReferenceObjct.eVar3= host;
									voReferenceObjct.prop33 = voReferenceObjct.eVar33 = voReferenceObjct.prop2 = voReferenceObjct.eVar4 = "news";
									voReferenceObjct.eVar71 = voReferenceObjct.prop71 = voReferenceObjct.prop30 = voReferenceObjct.eVar30 =v.source;
									voReferenceObjct.prop32 = voReferenceObjct.eVar32 = v.trt;
									voReferenceObjct.eVar61 = voReferenceObjct.prop61 = "primary";
									voReferenceObjct.events = "event1";
									/* offiste tracking updates */
									voReferenceObjct.eVar5 = v.metas.branding;
									voReferenceObjct.eVar6 = "SingleClip";
									voReferenceObjct.eVar7 = v.source;
									voReferenceObjct.eVar8 = v.category;
									voReferenceObjct.eVar9 = v.headline;
									voReferenceObjct.linkTrackVars = "pageName,products,prop1,eVar3,prop2,eVar4,eVar1,prop7,prop30,eVar30,prop31,eVar31,prop32,eVar32,prop33,eVar33,prop61,eVar61,prop71,eVar71,events,eVar5,eVar6,eVar7,eVar8,eVar9";
									voReferenceObjct.linkTrackEvents = "event1";
									vo[f].apply(voReferenceObjct,args);
								}
								if (vo._jsmd.destroy!=null) { vo._jsmd.destroy(vo); vo._jsmd=null; }
							} catch(err) {}
						}
					}
				}
				var section = this.get("business.cnn.page.section[0]");
				var c4override = getSiteSpecificSettings(8,section);

				if (v.iscmsIIimport && v.cmsIIimportType && v.iscmsIIimport == "true" && v.cmsIIimportType == "legacy money") {
					neilsenCNNMoney = {
						"video-census": {
							clientid: "us-100120",
							vcid: "c02",
							prod: "vc",
							sfcode: "us"
						}
					};
					sendNielsenVideoCensusBeacon(neilsenCNNMoney, "start", v.id);
					_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}&rn=${random}", {
							c1:'1', 		// Video metrix tag identifier
							c2:'8587182', 	// Turner Specific Tag
							c3:'00003', 	// Report-suite numeric identifier for comparisons to Omniture
							c4:'8587295',	// SI Specific Tag
							c5:'020000'
						}
					);
				} else {
					sendComscoreVideoMetrixBeacon(v.id, 1, c4override); // Content-related comscore call
					sendNielsenVideoCensusBeacon(this.get("m:nielsen"), "start", v.id);
				}
			},
			"video-pause": function(data, map) {
				/* change video player object property */
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				var ad_number = vc.get(data.video.id,"adNumber");
				if (ad_number == 0) {	//only for content pause
					if (_w.live_interval && _w.live_interval > 0 && _w.video_data) { //live video only
						var is_pause = vc.get(data.video.id,"isPaused");
						if (is_pause) {	//if user resumes live player, start "video-progress"
							var jj = _w.live_interval * 1000;
							_w.setinterval_id = setInterval("_w.sendVideoProgress()",jj);
						} else {	//if user pauses live player, send "video-progress" beacon and set timer to zero
							_w.sendVideoProgress();
							clearInterval(_w.setinterval_id);	//clear setInterval
						}
					}
					vc.pause(data.video.id);
				}

					/* add new video player object */
			},
			"video-buffer": function(data, map) {
				/* change video player object property */
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.buffer(data.video.id);

					/* add new video player object */
			},
			"video-scrub": function(data, map) {
				/* change video player object property */
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.set(data.video.id,"hasScrubbed",true);

					/* add new video player object */
			},
			"video-complete": function(data, map) {
				var v=data.video||{};
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				var timeSpent = vc.complete(v.id);
				this.set("page.content_type","adbp:none");
				this.set("video.duration_watched",timeSpent+"");
				this.set("action","link");
				this.set("link",{name: "video-complete: "+ v.headline, type: "o"});
				this.push("page.events","video.complete");
				if (v.metas.branding && v.metas.branding != "") {
					this.push("page.events","video.partner_start");
				}
				if (v.subcategory && v.subcategory != "") {
					this.push("page.events","video.ad_start");
				}

				try {	//check video time spent value
					if ((parseFloat(timeSpent) == parseInt(timeSpent)) && !isNaN(timeSpent)) {	//valid time spent value
						if (timeSpent > 3600 || timeSpent < 0) {	//video watched longer than an hour
							if (v.trt && !isNaN(v.trt) && (parseFloat(v.trt) == parseInt(v.trt))) {	//valid video length
								timeSpent = parseFloat(v.trt) * 2;
							} else {	//invalid video length
								timeSpent = 0;
							}
						}
					} else {	//invalid time spent value
						timeSpent = 0;
					}
				} catch(e) { timeSpent = 0; }
				this.send();
				if (v.iscmsIIimport && v.cmsIIimportType && v.iscmsIIimport == "true" && v.cmsIIimportType == "legacy money") {
					var action=this.config.vendor.action,l=action.length,args,f,vo;
					while(l--) {
						vo=action[l][0];f=action[l][1];args=action[l][2];
						if (vo && vo[f].apply) {
							try {
								if (vo.trackingServer) {
									var voReferenceObjct = action[0][0];
									voReferenceObjct.trackingServer = "metrics.cnn.com";
									voReferenceObjct.trackingServerSecure = "smetrics.cnn.com";
									var host = _w.location.hostname;
									var path = _w.location.pathname;
									var accountName = "aolturnercnnmoneyoffsite";
									voReferenceObjct.fun = voReferenceObjct.oun = voReferenceObjct.un = accountName;
									voReferenceObjct.referrer = document.referrer;
									voReferenceObjct.eVar1 = voReferenceObjct.products = this.get("video.id");
									voReferenceObjct.eVar31 = voReferenceObjct.eVar3= host;
									voReferenceObjct.eVar33 = voReferenceObjct.eVar4 = "news";
									voReferenceObjct.eVar71 = voReferenceObjct.eVar30 =v.source;
									voReferenceObjct.eVar32 = v.trt;
									voReferenceObjct.eVar61 = "primary";
									voReferenceObjct.events = "event2";
									/* offiste tracking updates */
									voReferenceObjct.eVar5 = v.metas.branding;
									voReferenceObjct.eVar6 = "SingleClip";
									voReferenceObjct.eVar7 = v.source;
									voReferenceObjct.eVar8 = v.category;
									voReferenceObjct.eVar9 = v.headline;
									voReferenceObjct.linkTrackVars = "eVar3,eVar4,eVar1,eVar30,eVar31,eVar32,eVar33,eVar61,eVar71,events,products,eVar5,eVar6,eVar7,eVar8,eVar9";
									voReferenceObjct.linkTrackEvents = "event2";
									vo[f].apply(voReferenceObjct,args);
								}
								if (vo._jsmd.destroy!=null) { vo._jsmd.destroy(vo); vo._jsmd=null; }
							} catch(err) {}
						}
					}
				}
				if (v.iscmsIIimport && v.cmsIIimportType && v.cmsIIimportType == "legacy money") {
					neilsenCNNMoney = {
						"video-census": {
							clientid: "us-100120",
							vcid: "c02",
							prod: "vc",
							sfcode: "us"
						}
					};
					sendNielsenVideoCensusBeacon(neilsenCNNMoney, "complete", v.id, timeSpent + "");
				} else {
					sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"complete",v.id,timeSpent+"");
				}
			},
			"video-stop": "alias:video-complete",
			"video-fifty": function(data, map) {
				var v=data.video||{};
				this.set("page.content_type","adbp:none");
				var duration = (parseFloat(v.trt)/2);
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.set(v.id,"isHalf",true);
				var timeSpent = vc.progress(v.id);
				this.set("video.duration_watched",timeSpent+"");
				this.set("action","link");
				this.set("link",{name: "video-midpoint: "+ v.headline, type: "o"});
				this.push("page.events","video.fifty");
				if (duration == "") {
				} else {
					if (timeSpent > duration * 2) {
						timeSpent = duration * 2;
					};
					this.send();
				};
			},
			"video-ten": function(data, map) {
				var v=data.video||{};
				this.set("page.content_type","adbp:none");
				var duration = (parseFloat(v.trt)/2);
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.set(v.id,"isTen",true);
				var timeSpent = vc.progress(v.id);
				this.set("video.duration_watched",timeSpent+"");
				this.set("action","link");
				this.set("link",{name: "video-ten: "+ v.headline, type: "o"});
				this.push("page.events","video.ten");
				if (v.metas.branding && v.metas.branding != "") {
					this.push("page.events","video.partner_start");
				}
				if (v.subcategory && v.subcategory != "") {
					this.push("page.events","video.ad_start");
				}
				if (duration == "") {
				} else {
					if (timeSpent > duration * 2) {
						timeSpent = duration * 2;
					};
					this.send();
				};
			},
			"video-twentyfive": function(data, map) {
				var v=data.video||{};
				this.set("page.content_type","adbp:none");
				var duration = (parseFloat(v.trt)/2);
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.set(v.id,"isTwentyFive",true);
				var timeSpent = vc.progress(v.id);
				this.set("video.duration_watched",timeSpent+"");
				this.set("action","link");
				this.set("link",{name: "video-twentyfive: "+ v.headline, type: "o"});
				this.push("page.events","video.twentyfive");
				if (v.metas.branding && v.metas.branding != "") {
					this.push("page.events","video.partner_start");
				}
				if (v.subcategory && v.subcategory != "") {
					this.push("page.events","video.ad_start");
				}
				if (duration == "") {
				} else {
					if (timeSpent > duration * 2) {
						timeSpent = duration * 2;
					};
					this.send();
				};
			},
			"video-seventyfive": function(data, map) {
				var v=data.video||{};
				this.set("page.content_type","adbp:none");
				var duration = (parseFloat(v.trt)/2);
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.set(v.id,"isSeventyFive",true);
				var timeSpent = vc.progress(v.id);
				this.set("video.duration_watched",timeSpent+"");
				this.set("action","link");
				this.set("link",{name: "video-seventyfive: "+ v.headline, type: "o"});
				this.push("page.events","video.seventyfive");
				if (v.metas.branding && v.metas.branding != "") {
					this.push("page.events","video.partner_start");
				}
				if (v.subcategory && v.subcategory != "") {
					this.push("page.events","video.ad_start");
				}
				if (duration == "") {
				} else {
					if (timeSpent > duration * 2) {
						timeSpent = duration * 2;
					};
					this.send();
				};
			},
			"video-live": function(data, map) {
				_w.video_data = data;
				var v=data.video||{};
				var vc = new _jsmd.plugin.gCNNVideoCollection();
				vc.start(v.id,v.headline);
				this.set("video.id","live " + v.id);
				this.set("video.title","live: " + v.headline);
				this.set("business.cnn.page.section[1]","live video " + v.id );
				this.set("business.cnn.video.video_player","live player");
				this.set("business.cnn.video.start_type","live");
				this.set("action","link");
				this.set("link",{name: "video-live: "+ v.headline, type: "o"});
				this.push("page.events","video.live");
				if (v.metas && v.metas.branding && v.metas.branding != "") {
					this.push("page.events","video.partner_start");
				}
				if (v.subcategory && v.subcategory && v.subcategory != "") {
					this.push("page.events","video.ad_start");
				}
				this.send();
				sendComscoreVideoMetrixBeacon(v.id,1); // Content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",v.id,"live");
				if (_w.live_interval && _w.live_interval > 0) {
					var jj = _w.live_interval * 1000;
					_w.setinterval_id = setInterval("_w.sendVideoProgress()",jj);
				}
			},
			"video-progress": function(data, map) {
				var v=data.video||{};
				var vc = _jsmd.plugin.gCNNVideoCollection();
				var timeSpent = vc.progress(v.id);	//calculate video time spent
				try {	//check video time spent value
					if ((parseFloat(timeSpent) == parseInt(timeSpent)) && !isNaN(timeSpent)) {
						if (_w.live_interval && _w.live_interval > 0) {
							var timeLimit = _w.live_interval;	//time limit in sec
						} else {
							var timeLimit = 60;	//time limit in sec
						}
						if (timeSpent > timeLimit) {
							timeSpent = timeLimit;
						} else if (timeSpent < 0) {
							timeSpent = 0;
						}
					} else {
						timeSpent = 0;
					}
				} catch(err) { timeSpent = 0; }
				this.set("video.duration_watched",timeSpent+"");	//event36
				this.set("video.id","live " + v.id);				//eVar42
				this.set("video.title","live: " + v.headline);		//prop29,eVar41
				this.set("business.cnn.page.section[1]","live video " + v.id );	//channel,eVar27
				this.set("business.cnn.video.video_player","live player");		//prop1,eVar1
				this.set("business.cnn.video.start_type","live");	//prop70,eVar70
				this.set("action","link");
				this.set("link",{name: "video-progress: "+ v.headline, type: "o"});
				this.send();
			},
			"video-common": function(data,map) {
				if (_w.video_data) { //live video only
					var v=_w.video_data.video||{};
				} else {
					var v=data.video||{};
				}
				this.set("video.title","/video/" +v.id);
				this.set("video.id","/video/" +v.id);
				if (window.location.href.indexOf("ireport.cnn.com") > -1 || window.location.href.indexOf("ireportqa.cnn.com") > -1) {
					var title = this.plugin.gIreportgetMetaContents("title");
					if (title) {this.set("video.title","/video/" +v.id + " [" + title + "]");}
				}

				if (jsmdIsAd && (jsmdAdVidID == v.id)) {
					this.set("business.cnn.video.ad_duration",jsmdAdRange);
				} else {
					jsmdIsAd=false;
					this.set("business.cnn.video.ad_duration","no ad present");
				}

				var player = this.plugin.gJObj(cnn_metadata,"business.cnn.video.video_player");
				var pageAtribution = this.plugin.gJObj(cnn_metadata,"business.cnn.video.video_hpt");
				var collection = this.plugin.gJObj(cnn_metadata,"business.cnn.video.video_collection");

				if (player) {
					this.set("business.cnn.video.video_player",player);	//prop1,eVar1
				} else {
					this.set("business.cnn.video.video_player","vod player");	//prop1,eVar1
				}
				var videoId = this.get("video.id");
				if (videoId != null && videoId.indexOf("cvplive")!=-1) {
					this.set("business.cnn.video.video_player","live player");	//prop1,eVar1
					this.set("video.title","live: " + v.headline);	//prop29,eVar41
					this.set("video.id","live " + v.id);			//eVar42
				}

				this.set("business.cnn.page.HPlocation", pageAtribution);
				this.set("business.cnn.video.video_collection", collection);
				this.set("business.cnn.video.start_type","vod");
				this.set("business.cnn.video.video_section",v.category);
				this.set("business.cnn.video.video_length",v.trt);
				var d = (v.dateCreated && v.dateCreated.text ? v.dateCreated.text : "");
				var p = (d != "" ? d.split("/") : "");
				if (p != "" && p[0].length != 4) {
					d = "20"+p[2]+"/"+p[0]+"/"+p[1];
				}
				this.set("business.cnn.page.publish_date",d);
				var days = _jsmd.plugin.gCNNDaysSinceLastPublish(d);
				this.set("business.cnn.page.days_since_publish",days+"");
				this.set("page.content_type","adbp:video start");
				this.set("page.events",null);
				if (v.metas && v.metas.branding && v.metas.branding != "") {
					this.push("page.events","video.partner_start");
					this.set("business.cnn.page.branding_content_partner",v.metas.branding);
				}
				if (v.subcategory && v.subcategory && v.subcategory != "") {
					this.push("page.events","video.ad_start");
					this.set("business.cnn.page.branding_ad",v.subcategory);
				}
				if (v.source && v.iscmsIIimport && v.source && v.iscmsIIimport) {
					this.set("business.cnn.video.source", v.source);
					if (v.iscmsIIimport == "true") {
						this.push("page.events","video.sync");
						this.set("business.cnn.video.air_syndication", "secondary");
					} else {
						this.set("business.cnn.video.air_syndication", "primary");
					}
				}
			},
			"vid-button": function(data,map) {
				var v = data.value||{};
				this.set("action","link");
				this.set("link",{name: "vid-button: "+ v, type: "o"});
				if (v.indexOf("car") > -1) {
					this.set("business.cnn.page.HPlocation",v)
				} else if (v.indexOf("vec") > -1) {
					this.set("business.cnn.page.lateral_navigation",v);
				}
				this.send();
			},
			"interaction-video": function(data, map) {
				this.set("business.cnn.video.video_interaction", data);
				this.push("page.events","video.interaction");
				this.set("action","link");
				this.set("link",{name: "video-interaction: "+ data, type: "o"});
				this.send();
			},
			"social-click": function(data,map) {
				var co = data.clickObj||{};
				this.set("action","link");
				this.set("link",{name: "social-click: " + co.socialType, type: "o"});
				this.set("business.cnn.page.socialType",co.socialType);
				this.set("page.events", null);
				this.push("page.events","social.interaction");
				this.send();
			},
			"election-click": function(data,map) {	//page view call
				var page_name = this.get("page.name");
				if (data.pagename) {
					page_name = page_name + " " + data.pagename;
					this.set("page.name",page_name);	//pageName,eVar26
				}
				this.set("business.cnn.page.section[0]",data.section1);	//channel,eVar27
				this.set("business.cnn.page.section[1]",data.section2);	//prop28,eVar28
				this.set("business.cnn.page.section[2]",data.section3);	//prop62,eVar62
				this.set("business.cnn.page.section[3]",data.state);	//prop74,eVar74
				this.set("business.cnn.page.section[4]",data.racetype);	//prop75,eVar75
				this.push("page.events","content.interactive");	//event9
				this.send();
			},
			"game-interaction": function(data,map) {
				var gameValue = data.value;
				this.set("action","link");
				this.set("link",{name: "game-interaction: " + gameValue, type: "o"});
				this.set("business.cnn.game.status",gameValue);
				this.push("page.events","game.interaction");
				this.send();
			},
			/*TVE Dynamic Actions*/
			"tve-live_video-start": function(data, map) {
				var MSO = jsmd.tveMSO;
				this.set("tve.page.name", data.id);
				jsmd.TVE.pageName = this.get("tve.page.name");
				this.set("tve.video_title", data.title);//prop12
				jsmd.TVE.videoTitle = this.get("tve.video_title");

				var brand = this.get("tve.brand");
				var dtitle = data.headline+"";
				var drsid = jsmd.tveRSID+"";
				if (dtitle.indexOf("hln")!=-1 || drsid.indexOf("hln")!=-1) {
					this.set("tve.brand", "hln");
				}

				jsmd.TVE.brand = this.get("tve.brand");
				var distribName = MSO;
				if (MSO == "Unauthorized") {
						distribName = "unspecified mvpd";
						jsmd.TVE.authState = "not authenticated";
				}
				this.set("tve.host_location", distribName+":"+jsmd.TVE.brand);//prop2,eVar2
				jsmd.TVE.host = this.get("tve.host_location");
				this.set("tve.content_id", data.contentId);//prop5,eVar5
				jsmd.TVE.vidID = this.get("tve.content_id");
				this.set("tve.publication_date", data.lastAirDate);//prop6,eVar6
				jsmd.TVE.lastAirDate = this.get("tve.publication_date");
				this.set("tve.days_since_publication", data.dayssince);//prop7,eVar7
				jsmd.TVE.dayssince = this.get("tve.days_since_publication");
				this.set("tve.mode", "live");//prop8,eVar8
				jsmd.TVE.mode = "live";
				this.set("tve.franchise", data.franchise);//prop9,eVar9
				jsmd.TVE.videoFranchise = this.get("tve.franchise");
				jsmd.TVE.playerLocation = jsmd.get("tve.player_location");
				this.set("tve.video.live.stream", data.id);//prop14,eVar14
				jsmd.TVE.liveStreamName = jsmd.get("tve.video.live.stream");
				this.set("tve.video.authentication", jsmd.TVE.authState);//prop16,eVar16
				this.set("tve.user_id", jsmd.TVE.userID);// prop19,eVar19
				this.set("tve.products", (";"+data.title));
				try {
					var s_data = {
						account:jsmd.tveRSID,
						events:"event13,event27",
						prop1:jsmd.TVE.brand,
						eVar1:jsmd.TVE.brand,
						prop2:jsmd.TVE.host,
						eVar2:jsmd.TVE.host,
						prop4:jsmd.TVE.channel,
						eVar4:jsmd.TVE.channel,
						prop5:jsmd.TVE.vidID,
						eVar5:jsmd.TVE.vidID,
						prop6:jsmd.TVE.lastAirDate,
						eVar6:jsmd.TVE.lastAirDate,
						prop7:jsmd.TVE.dayssince,
						eVar7:jsmd.TVE.dayssince,
						prop8:jsmd.TVE.mode,
						eVar8:jsmd.TVE.mode,
						prop9:jsmd.TVE.videoFranchise,
						eVar9:jsmd.TVE.videoFranchise,
						prop10:jsmd.TVE.fullEpisode,
						eVar10:jsmd.TVE.fullEpisode,
						prop11:jsmd.TVE.playerLocation,
						eVar11:jsmd.TVE.playerLocation,
						prop14:jsmd.TVE.liveStreamName,
						eVar14:jsmd.TVE.liveStreamName,
						prop16:jsmd.TVE.authState,
						eVar16:jsmd.TVE.authState,
						prop19:jsmd.TVE.userID,
						eVar19:jsmd.TVE.userID,
						linkTrackVars:"events,products,pageName,prop1,eVar1,prop2,eVar2,prop4,eVar4,prop5,eVar5,prop6,eVar6,prop7,eVar7,prop8,eVar8,prop9,eVar9,prop10,eVar10,prop11,eVar11,prop13,eVar13,prop14,eVar14,prop16,eVar16,prop19,eVar19,prop20,eVar20,prop35,prop46,eVar46,prop47,eVar47"
					};
					this.set("business.vendor.sitecatalyst", s_data);
				}catch(e) {}
				this.send();
				sendComscoreVideoMetrixBeacon(data.id,1);	//content-related comscore call
				sendNielsenVideoCensusBeacon(this.get("m:nielsen"),"start",data.id,data.id);
			},
			"tve-live_video-progress": function(data, map) {
				this.set("tve.products", (";"+data.title+";;;event16=60"));
				this.set("action","link");
				this.set("link",{name: "video progress", type: "o"});
				try {
					var s_data = {
						account:jsmd.tveRSID,
						events:"event16,event20",
						eVar1:jsmd.TVE.brand,
						eVar2:jsmd.TVE.host,
						eVar4:jsmd.TVE.channel,
						eVar5:jsmd.TVE.vidID,
						eVar6:jsmd.TVE.lastAirDate,
						eVar7:jsmd.TVE.dayssince,
						eVar8:jsmd.TVE.mode,
						eVar9:jsmd.TVE.videoFranchise,
						eVar10:jsmd.TVE.fullEpisode,
						eVar11:jsmd.TVE.playerLocation,
						eVar14:jsmd.TVE.liveStreamName,
						eVar16:jsmd.TVE.authState,
						eVar19:jsmd.TVE.userID,
						linkTrackVars:"events,products,pageName,eVar1,eVar2,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar13,eVar14,eVar16,eVar19,eVar20,prop35,eVar35,prop46,eVar46,prop47,eVar47"
					};
					this.set("business.vendor.sitecatalyst", s_data);
				}catch(e) {}
				this.send();
			},
			"tve-live_video-complete": function(data, map) {
			},
			"mso_picker-open": function() {
				var s_data = {pageName:"TVE MVPD Picker"};
				this.set("business.vendor.sitecatalyst", s_data);
				this.send();
			},
			"tve_video-pause": function(data, map) {
			},
			"tve-cnn_video-start": "alias:tve-live_video-start",
			"tve-cnn_video-complete": "alias:tve-live_video-complete",
			"tve-cnn_video-progress": "alias:tve-live_video-progress",
			"tve-model-open":function(data, map) {
				if (data.sitecatalyst) { this.set("business.vendor.sitecatalyst",data.sitecatalyst); }
				this.send();
			}
		}

	}
};

var _jsmd = function() {
	var _w=window;
	/**
		Version identifier of the JSMD Module - use YYYYMMDD[letter] to identify specific iteration.
	*/
	var prvVersion=_jsmd_default.version||"ADBP-VANILLA";
	var prvRelease=_jsmd_default.release||"ERR",ver=prvVersion+":"+prvRelease;
	if(_jsmd_default.dictionary!=null) {_jsmd_default.dictionary.init["code.version"]=ver;}
	var prvDefaultMetadataDictionaryTemplate=_jsmd_default.dictionary|| {
		init: {
			"business.name":					"turner",					//prop30,eVar30
			"business.lob":						"general",		//hier1
			"business.brand":					"turner",					//hier1
			"page.clean_url":					"raw:gADBPURL|",		//prop26
			"page.domain":						"raw:gADBPURL|domain",	//server,eVar29
			"page.name":						"raw:gADBPPageName|",	//pageName,eVar26
			"page.section[0]":					"raw:gADBPURL|path,1",
			"page.section[1]":					"raw:gADBPURL|path,2",
			"time.hour":						"raw:gADBPTimePart|h",	//prop40,eVar40
			"time.dow":							"gADBPTimePart|d",		//prop40,eVar40
			"time.weekpart":					"gADBPTimePart|w",		//prop40,eVar40
			"page.full_url":					_w.location.href,
			"page.template_type":				"adbp:error",
			"code.version":						prvVersion+":"+prvRelease	//prop35 - do not alter
		}
	};
	var prvDefaultVendorMapTemplate=_jsmd_default.map || {
		"turner": {
			vendors: [
				{
					name:			"Adobe SiteCatalyst H-code",
					account:		"adbp",
					settings:		"adbp",
					variablemap:	"adbp",
					eventmap:		"adbp"
				}
			],
			adbp: {
				account: function() {
					return "turnererrors";
				},
				settings: {
					"trackInlineStats":			true,
					"linkLeaveQueryString":		false
				},
				variablemap: {
					"m:page.name":						["pageName","eVar26"],
					"m:page.section[0]":				["channel","eVar27"],
					"m:page.domain":					["server","eVar29"],
					"m:page.clean_url":					["prop26"],
					"m:search.internal.number_results":	["prop27"],
					"m:page.section[1]":				["prop28","eVar28"],
					"m:video.title":					["prop29","eVar41"],
					"m:business.name":					["prop30","eVar30"],
					"m:page.franchise":					["prop31","eVar31"],
					"m:page.template_type":				["prop32","eVar32"],
					"m:page.content_type":				["prop33","eVar33"],
					"m:user.authenticated":				["prop34","eVar34"],
					"m:user.segment":					["prop36","eVar36"],
					"m:time":							["prop40","eVar40"],
					"m:video.id":						["eVar42"],
					"m:promo.internal.id":				["eVar43"],
					"m:promo.internal.implied":			["eVar48"],				//Campaign Stacking (SEO Driven)
					"m:promo.external.id":				["campaign"],			//Marketing/External Campaigns
					"m:code.version":					["prop35"],
					"m:business.lob|m:business.brand|m:business.friendly_name|m:page.domain|m:page.section[0]|m:page.section[1]":	["hier1"],
					"delimiter":						"|"
				},
				eventmap: {
					"m:page.name":				["event26"],
					"page.view":				["event26"],
					"search.internal.keyword":	["event27"],
					"registration.complete":	["event28"],
					"product.view":				["prodView"],
					"product.multiview":		["prodView"],
					"cart.add":					["scAdd"],
					"cart.new":					["scOpen"],
					"checkout.start":			["scCheckout"],
					"checkout.name_address":	["event13"],
					"checkout.validate":		["event14"],
					"purchase.complete":		["purchase"],
					"checkout.validate":		["event14"],
					"promo.internal.id":		["event31"],
					"video.start":				["event32"],
					"video.complete":			["event33"],
					"video.autostart":			["event34"],
					"ad.start.preroll":			["event35"],
					"user.login":				["event37"],
					"blog.read":				["event38"],
					"article.read":				["event39"]
				}
			}
		}
	};
	var prvDefaultVendorSpecificTemplate;	// Leave null to use the default version

	/**
		Metadata Utilities Container (public Plugins & Data transformation routines)

		This object contains all metadata collection and transformation plugins in use by the centralization framework.  This module variable is publically accessible and can be accessed direclty / modified by using the folloiwng syntax:

		<pre>
			<objectname or "this">.plugin.<pluginFunctionName>(<plugin parameters>);
		</pre>

		Plugins can also be define in the top-level namespace of the metadata dictionary template on a per-instance basis.  This is done automatically if the template contains the "plugin" variable / member.

		By convention, all


		Some of the current plugins defined by default include:
		<ul>
		<li><strong>gCookie: </strong> </li>
		<li><strong>gADBPTimePart: </strong> </li>
		<li><strong>gDOM: </strong> </li>
		<li><strong>gMeta: </strong> </li>
		<li><strong>gQuery: </strong> </li>
		<li><strong>tCase: </strong> </li>
		<li><strong>tSub: </strong> </li>
		<li><strong>tTrim: </strong> </li>
		<li><strong>tXlate: </strong> </li>
		</ul>

	*/
	var pubDefaultMetadataUtilities=_jsmd_default.plugins;
	/**
		The default metadata dictionary template used to instantiate the metadata dictionay.  This object will be used as the default template for any metadata dictionary values if no other defaults are found.

		This object contains an "init" container, which holds all default dictionary initialization values.  The values include:
		<ul>
		<li><strong>Individual dictionary key / value pairs</strong> that will be created during the initialization process. </li>
		<li><strong>"preinit" and "postinit"</strong> functions, which allow for metadata customization and run before & after the initialization process, respecitvely.</li>
		</ul>
		Dictionary Key/Value pairs use the following syntax:
		<pre>
		init: {
			"page.name":			window.location.pathname,
			"time.hour":			"gTimePart|h",
			"test.gCookie":			"gCookie|testcookie",
			"test.gDOM":			"gDOM|document.getElementsByTagName('html')[0].lang;",
			"test.gMeta":			"gMeta|matt",
			"test.gQuery":			"gQuery|testqs",
			"test.page.section[1]":	_w.location.protocol,
		}
		</pre>

		Note that:
		<ul>
		<li><strong>Left-handed values</strong> represent metadata dictionary keys, and corresponding dictionary containers are dynamically created
		<li><strong>Right-handed values</strong> can be any combination form of plugins or JavaScript literal values.
		</ul>

		Function values for pre-init & post-init take the following form:
		<pre>
		init: {
			postinit: function() {
				this.set("page.name","prefix:"+this.get("page.name")); // Clean up & modify metadata once it's been collected
			},
			preinit: function() {
				_w.someglobal="xyz"; // Format & clean up data prior to metadata instantiation
			}
		}
		</pre>

		Other default containers will be used if defined, in this order:
		<ul>
		<li><b>Specific "init" Parameters:</b> if an object is provided to the "init" function during instantiation, that object will be used as a metadata dictionary template.</li>
		<li><b>Global variable _jsmdDefaultDictionary:</b> If defined and if it contains a valid "init" member, this Global variable will be used.</li>
		<li><b>prvDefaultMetadataDictionaryTemplate:</b> The object falls back to execute the default metadata dictionary object if no other objects are defined.</li>
		</ul>
	*/
	/**
		The default vendor mapping template object, used by the metadata dictionary object as part of the vendor/beacon instantiation process.  This object defines all the necessary relationships between vendor-neutral metadata and vendor-specific beacons or tags.

		Each template can contain one or more uniquely named lables that contain individual map configurations.  For example,

		<pre>
		var prvDefaultVendorMapTemplate={
			"config 1": { // map configuration object definitions },
			"config 2": { // map configuration object definitions }
		}
		</pre>
		Each vendor configuration block in the mapping file will be executed sequentially during the "map" stage of execution--which is to say that they will be evaluated, vendor-specific objects will be instantiated, and the objects will be configured using the settings / variable / event mappings. The inner map configuration object definitions consist of two objects: an array of "vendors" that are associated with the configuration, and one or more configuration "objects" the give detailed mapping & integration details.

		<pre>
		var prvDefaultVendorMapTemplate={
			"config 1": {
				vendors: [
					{ name: "Adobe H22 Code",	// Label used to fetch the vendor-specific code library
					account: "basic",			// Configuration block that will be used for account assignment
					settings: ["basic"],		// One of multiple blocks that will be executed to configure the vendor object
					variablemap: ["basic"],		// One or more blocks that define vendor-specific variables mappings.
					eventmap: ["basic"],		// One or more blocks that define the vendor-specific event mappings & definitions.
					prevendor: function(){},	// Function that's executed PRIOR to instantiating the vendor mapping section
					postvendor: function(){}	// Function that's executed POST vendor-mapping instantiation
					}
				],
				basic: {
					account: function()	{ // Returns account settings for vendor tag },
					settings:			{ // Vendor-specific settings },
					variablemap:		{ // Vendor-specific variable settings added to the vendor tag },
					eventmap:			{ // Vendor-specific event mapping added to the vendor tag} ,
					premap: function()	{ // Function executed just prior to executing account function mapping },
					postmap: function()	{ // Function executed just after the post maping process completes }
				}
			}
		}
		</pre>
		Steps of Execution:
		<ul>
		<li>All vendor objects in the "vendors" array are processed:</li>
		<ul>
		<li>The prevendor function is executed, if it's defined</li>
		<li>The premap function is executed in the block associated with the account logic, if it's defined</li>
		<li>The account code is executed to provide any account-specific information to the vendor object. </li>
		<li>The settings, variablemap, and eventmap containers are processed and loaded into the vendor object</li>
		<li>The postmap function is executed from the block associated with the account logic, if it's defined</li>
		<li>The postvendor function is executed, if it's defined</li>
		</ul>
		</ul>
	*/
	prvDefaultVendorSpecificTemplate=_jsmd_default.vendor||{
		"Nielsen Hybrid Light Code": {
			delimiter: ":",
			initialize: function(accountf,vendorAction) {
				var a=accountf,o,va=this.get("action"),vc=this.config.vendor;
				if(typeof(accountf)=="function") {a=accountf.call(this)||"IGNORE";}
				vc.action.push([NielsenHybridTag,"push_nielsen",[a]]);
				return o;

			},
			destroy: function(vendorObject) {
			}
		  },
		"Adobe SiteCatalyst H-code": {
			delimiter: ":",
			initialize: function(accountf,vendorAction) {
	 			var a=accountf,o,va=this.get("action"),vc=this.config.vendor;
				if(typeof(accountf)=="function") {a=accountf.call(this)||"IGNORE";}
				o=s_gi(a);
				delete o.pageName;
				if(va==="link") {
					var lnk=this.get("link");
					var t=lnk.type,n=lnk.name;
					t=(t==="download"?"d":(t==="exit"?"e":"o"));
					n=(!n?"defaultlink:"+t+":"+_w.location.pathname:n);
					vc.action.push([o,"tl",[true,t,n]]);
				} else {
					events="event26"; // Default ADBP page view standard event
					vc.action.push([o,"t",[]]);
				}
				o.doPlugins=function() {

				};
				/* if(this.get("page.type")=="err") {// 404 ERROR LOGIC - disabled per ADBP standards
					o.pageName = "";
					o.pageType="errorPage";
				} */
				o.products=null;
				return o;
			},
			destroy: function(vendorObject) {
				var unsetList=vendorObject._jsmd.unset_list;
				for(var i=unsetList.length-1;i>=0;i--) { vendorObject[unsetList[i]]="";} // Necessary to remove all previously defined values at the end of the call
				vendorObject.events="";
				vendorObject.products="";
			},
			setEvent: function(obj,key,value) {
				if(!value||!key) return;
				var e=(obj.events&&obj.events.length>0?obj.events.split(","):[]),etest=e.join(","); // Use a null event list if not already defined
				var k=(typeof(key)=="object"?key:[key]);
				for(var i=k.length-1;i>=0;i--) {
					if(etest.indexOf(k[i])==-1) {e.push(k[i]); etest+=","+k[i];
						var v1=parseFloat(value);
						if(v1!=null&&typeof(v1)=="number"&&v1>0) {
							obj.products=";;;;"+k[i]+"="+value;
						}
					}
				}
				obj.events=e.join(",");
			},
			setProducts: function(obj,productmd) {
				var MAXPRODUCTS=10;
				if(!productmd||(!productmd.list)) return;
				var lst=productmd.list,dim=productmd.dimensions,p=[],tmp,tl,missprod="Missing Product",i;
				if(obj.products!=null) {
					p=obj.products.split(",");
				}
				m=obj["client:merchandising_map"],re=/[\;\\,\|]+/g,rchar="-";
				for(var i=0;i<lst.length&&i<MAXPRODUCTS;i++) {
					tl=lst[i];
					tmp=[(!tl.category?"":tl.category.replace(re,rchar)),(!tl.id?missprod:tl.id.replace(re,rchar))];
					if(tl.quantity!=null&&tl.total_price!=null) {
						tmp[2]=tl.quantity;
						tmp[3]=tl.total_price;
					}
					if(dim!=null&&m!=null) {
						tmp2=[];
						for(var j=m.length-1;j>=0;j--) {
							var subkey=m[j][0],subval=m[j][1];
							for(var k=dim.length-1;j>=0;j--) {
								var lookup=dim[k][subkey];
								if(lookup!=null) {
									tmp2[k]=subval + "=" + lookup.replace(re,rchar);
								}
							}
						}
						tmp[5]=tmp2.join("|");
					}
					p.push(tmp.join(";"));
				}
				for(i=p.length-1;i>=0;i--) {
					if(p[i].length<7) {
						p.splice(i,1);
					}
				}
				obj.products=p.join(",");
			},
			setVariable: function(obj,key,value,unsetList) {
				if(!value||value.length==0) { return;}
				function inLookupDynamicShorthand(key) {
					var shorthand=key.split("eVar").join("v").split("prop").join("c").split("channel").join("ch");
					if(shorthand==="pageName") return "pageName";
					return (shorthand!==key?shorthand:null);
				}
				if(typeof(key)=="string") {obj[key]=value;}
				else {
					var l=key.length,i,k,shorthand=inLookupDynamicShorthand(key[0]);
					for(i=0;i<l;i++) {
						k=key[i];
						if(value!=null) {
							if(i>0&&shorthand!=null) {obj[k]="D="+shorthand;}
							else {obj[k]=value; if("pageName".indexOf(k)==-1){unsetList.push(k);}}
						}
					}
				}
			}
		}
	};
	function CAnalyticsObject(initObj,mapObj,vendorObj) {
		var me=this;
		me.version=prvVersion;
		me.mdata={};
		me.config={};
		me.config.init=initObj.init||prvDefaultMetadataDictionaryTemplate.init;
		me.config.map=mapObj||prvDefaultVendorMapTemplate;
		me.config.vendor=vendorObj||prvDefaultVendorSpecificTemplate;
		me.plugin=initObj.plugin||pubDefaultMetadataUtilities;
		me.init();
	}
	CAnalyticsObject.prototype.init=function(){
		var i=this.config.init,j,p=this.plugin;
		if(p) {
			if(p.tAll) {
				j=p.tAll.split("|");p.tF=[];var k,t,l=j.length;
				for(k=0;k<l;k++) {t=j[k];if(p[t]){p.tF.push(p[t]);}}
			}
		}
		if(i!=null) {
			if(typeof(i.preinit)=="function") i.preinit.call(this);
			if(i!=null) {
				for(j in i) { this.set(j,i[j]); }
			}
			if(typeof(i.postinit)=="function") i.postinit.call(this);
		}
	 };
	CAnalyticsObject.prototype.get=function(n){
		var rval=[],prefix=n.split(":")[0],bname=null,t=n, reUnsafe,i,tarray=(n.indexOf("|")!=-1?n.split("|"):[n]);//,re=/[^\w\.\[\]\{\}\:\-\(\)]+/g;
		for(i=0;i<tarray.length;i++) {
			n=tarray[i];
			try {
				switch(prefix) {
					case "js": t=n.replace("js:",""); break;
					case "mb": t=n.replace("mb:","this.mdata.business."+this.mdata.business["name"]+"."); break;
					default: t="this.mdata."+n.replace(prefix+":",""); break; // Primary for JS literals
				}
				rval.push(eval((!reUnsafe?t:t.replace(reUnsafe,""))));
			} catch(err) {}
		}
		return (rval.length>0?(rval.length==1?rval[0]:rval):null);
	};
	CAnalyticsObject.prototype.getnn=function(n){var a=this.get(n); return (!a?"":a);};
	CAnalyticsObject.prototype.set=function(n,v) { return (n==="preinit"||n==="postinit"?null:prvSetCommonFunction.call(this,n,v,"set")); };
	CAnalyticsObject.prototype.push=function(n,v) { return (n==="preinit"||n==="postinit"?null:prvSetCommonFunction.call(this,n,v,"push"));};
	CAnalyticsObject.prototype.load=function(v) {if(_jsmd_default.dynamic!=null&&typeof(_jsmd_default.dynamic.load)=="function"){
													_jsmd_default.dynamic.load.call(this,v);}
												else {this.mdata=v;} };
	CAnalyticsObject.prototype.trackMetrics=function(action,data,map) {
		var defaultDynamicNS=(!_jsmd_default.dynamic?{}:_jsmd_default.dynamic.actions);
			var act=defaultDynamicNS[action];
			var t=action.split("-"),c=(t.length>0?t[0]:null),common=defaultDynamicNS[c+"-common"];
			if(typeof(act)=="string"&&act.indexOf("alias:")==0) {act=defaultDynamicNS[act.split("alias:")[1]];}
			this.config.map.isDynamic=action;
			try {
				if(typeof(common)=="function") {
					common.call(this,data,map);
				}
				act.call(this,data,map);
			} catch(e) {}
			this.config.map.isDynamic=false;
	};
	CAnalyticsObject.prototype.map=function(mapObj) {
		if(mapObj) {mapObj.dirty=1; this.config.map=mapObj;}
		var me=this,v1,v2,b1,m=this.config.map; // Used for inner-function references to the object
		if(m.dirty!=0) {
			this.config.vendor.action=[];
			for(v1 in m) {
				v2=m[v1];
				var va = (v2.vendors)?new arrayExtender(v2.vendors):null;
				if(va&&typeof(va.forEach)=="function") {
					va.forEach(inDoVendorInitialize);
				}
			}
			m.dirty=0;
		};
		function inDoVendorInitialize(map) {
			var vendorLogic=me.config.vendor,n=map.name;
			if(!vendorLogic[n]){return;}
			var vendorInstantiate=vendorLogic[n].initialize,pre=map.prevendor,post=map.postvendor,acctKeys=map.account,emapKeys=map.eventmap,
				cmapKeys=map.settings,vmapKeys=map.variablemap,delimiter=v2.delimiter,dynamicFunctionCall=me.config.map.isDynamic;
			if(dynamicFunctionCall!=null && dynamicFunctionCall && map.dynamic_actions!=null) {
				var z,y,al=map.dynamic_actions,al2;
				for(z in al) {
					if(dynamicFunctionCall.indexOf(z)!=-1) {
						al2=al[z];
						cmapKeys=al2.settings||cmapKeys;
						vmapKeys=al2.variablemap||vmapKeys;
						emapKeys=al2.eventmap||emapKeys;
						acctKeys=al2.account||acctKeys;
						pre=al2.prevendor||pre;
						post=al2.postvendor||post;
						if(al2.ignore!=null) {return;}
					}
				}
			}
			if(!acctKeys&&!v2[acctKeys]) return; // Avoid null account error
			var accts=v2[acctKeys].account,premap=v2[acctKeys].premap,postmap=v2[acctKeys].postmap;
			if(typeof(pre)=="function") {pre.call(me,map);} // Do pre-Vendor ETL & Logic if defined.
			if(typeof(vendorInstantiate)=="function" && typeof(accts)=="function") {
				vObj=vendorInstantiate.call(me,accts);
				me.v=vObj;
				var i,t,mapBlock;
				if(premap&&premap.call) { premap.call(me);}
				if(cmapKeys!=null) {
				for(i=0;i<cmapKeys.length;i++) {mapBlock=v2[cmapKeys[i]]; if(mapBlock&&mapBlock.settings){inDoMap.call(me,"settings",mapBlock.settings);}}
				}
				if(vmapKeys!=null) {
				for(i=0;i<vmapKeys.length;i++) {mapBlock=v2[vmapKeys[i]]; if(mapBlock&&mapBlock.variablemap){inDoMap.call(me,"variables",mapBlock.variablemap);}}
				}
				if(emapKeys!=null) {
				for(i=0;i<emapKeys.length;i++) {mapBlock=v2[emapKeys[i]]; if(mapBlock&&mapBlock.eventmap){inDoMap.call(me,"events",mapBlock.eventmap);}}
				}
				if(typeof(vendorLogic[n].setProducts)=="function") {vendorLogic[n].setProducts.call(me,vObj,me.mdata.product);}
				if(postmap&&postmap.call) { postmap.call(me);} // Do post-map ETL & Logic if defined
			}
			if(post&&post.call) { post.call(me,map);} // Do postvendor if defined
			delete me.v;
			function inDoMap(mapType,mapObj) {
				var me=this,i,vl=vendorLogic[n], // Shortcut to vendor logic array
					setv=vl.setVariable,  // reference to the vendor-specific setVariable function, if it exists
					sete=vl.setEvent,		// reference to the vendor-specific setEvent function, if it exists
					setc=vl.setConfig,		// Reference to the vendor-specific setConfig function, if it exists
					v=vObj,								// Shortcut to the vendor Object itsets
					inclusion=null,exclusion=null,					// Used during dynamic function calls to filter / exclude mappings
					doFilteredSettings=false,								// No filtering on settings by default
					delim=mapObj.delimiter||delimiter||vl.delimiter;	// Default delimiter - we use either the mapObject-defined delimiter, or the previously defined delimiter, or the vendor-specific delimiter, whichever is defined first
				if(dynamicFunctionCall!=null&&typeof(dynamicFunctionCall)=="string") {
					var tl1=mapBlock["filters"],tl2;
					if((tl2=(tl1!=null&&tl1[dynamicFunctionCall]!=null?tl1[dynamicFunctionCall]:null))!=null) {
											inclusion=tl2["include"];
											exclusion=tl2["exclude"];
											doFilteredSettings=tl2["do-settings"];
					}
				}
				if(!v._jsmd) {
					v._jsmd={unset_list:[]};  // Setup an array to hold all variables that have been set.  This is used to "clear" variables once the object is destroyed
					if(vl.destroy!=null) {v._jsmd.destroy=vl.destroy;} // Shortcut to vendor object destructor, if defined
				}
				var set=function(f,lookupType){									// Inner setter function that calls the vendor-specific set functions
					var i,m=mapObj,res,dof=(typeof(lookupType)=="function"),skip,matchi,matche,i2;			// m is the map Object defined in the earlier scope.  It will be iterated through entirely.  dof is the do-function check flag, to determine if we should call the function or just set the value.
					var doFilterSettingsCheck=(f!==setc||(f===setc&&doFilteredSettings==true))&&(inclusion!=null||exclusion!=null);
					for(i in m){
						skip=false;
						if(doFilterSettingsCheck){
							matche=false; matchi=false;
							if(typeof(inclusion)=="object") {
								for(i2=inclusion.length;i2>=0;i2--) {matchi=matchi||(i.indexOf(inclusion[i2])!=-1?true:false);}
							} else {
								matchi=(inclusion!=null&&i.indexOf(inclusion)!=-1?true:false);
							}
							if(typeof(exclusion)=="object") {
								for(i2=exclusion.length;i2>=0;i2--) {matche=matche||(i.indexOf(exclusion[i2])!=-1?true:false);}
							} else {
								matche=(exclusion!=null&&i.indexOf(exclusion)!=-1?true:false);
							}
							skip=(matchi==false)||(matche==true);
						}
						if(!skip&&(res=(dof?lookupType(i):i))!=null&&typeof(m[i])!="function"){	// Lookup the actual metadata value that we iterate through (if it's an actual metadata value - if it's an actual value, just use it without the lookup)
							f.call(me,v,m[i],res,v._jsmd.unset_list);}								// Once we have the metadata value (or literal value), call the vendor-specific logic to set the value at a vendor level
					}
				};
				sete=(!sete?setv:sete); setc=(!setc?function(vo,k,v){return setv(vo,v,k);}:setc);delim=(!delim?":":delim);  // Default setter logic.  Basically used in the event that we don't have vendor-specific setters defined
				if(mapType==="settings" && typeof(setc)=="function") {			// Do actions for the "settings" map block
					set(setc,true);												// Iterate through each setting & set it in teh vendor-specific object
				}
				if(mapType==="variables" && typeof(setv)=="function") {			// Do actions for the "variables" map block
					set(setv,inLookupValue);									// Iterate through each variable definition and set it in the vendor-specific logic
				}
				if(mapType==="events" && typeof(sete)=="function") {			// Do actions for the "events" map block.
					set(sete,inLookupEventValue);								// Iterate thorugh each variable definition and set it using the vendor-specific logic
				};
				function inLookupEventValue(v) {
					var e=new arrayExtender(me.mdata.page.events),getChk=me.get(v),rval=null;
					if((e!=null&&e.contains(v))) {rval=v;}
					if(getChk!=null) {rval=getChk;}
					return rval;												 // Return the actual event value if it's defined.
				}
				function inLookupValue(v) {
					var rval=v,i,t;												// Setup values - rval is the return value, everthing else is temporary or iterator variabes
					rval=me.get(v);												// Get the value being looked up from the metadata getter function
					if(rval!=null&&typeof(rval)=="object") {					// See if it's an object
						if(!rval.join) {										// If it's an object, see if it supports join
							t=[];for (i in rval) {t.push(rval[i]);}				// If not, then proxy our own join function
							rval=t;
						}
						rval=rval.join(delim);									// Use join with whatever the default delimiter is to serialze the value
					}
					return rval;												// Return the looked-up metadata dictionary value
				};
			}
		};
	};
	CAnalyticsObject.prototype.send=function(mapObj) {
		this.map(mapObj);
		var action=this.config.vendor.action,l=action.length,args,f,vo;
		while(l--){
			vo=action[l][0];f=action[l][1];args=action[l][2];
			if(vo && vo[f].apply) {
				try {
					vo[f].apply(vo,args); // Send the vendor-specific analytics beacon or function
					if(vo._jsmd.destroy!=null) {vo._jsmd.destroy(vo); vo._jsmd=null;} // If a destructor function exists, do it and clear the setter list
				} catch(err){}
			}
		}
	};

	function prvSetCommonFunction(n,v,type) {
		var me=this,israw=(typeof(v)=="string"&&v.indexOf("raw:")==0?true:false);
		if(n.indexOf("raw:")==0) {n=n.substr(4); israw=true;}
		me.config.map.dirty=1;
		function inDefaultTransforms(v) {
			var plug=me.plugin,defF=new arrayExtender(plug.tF),rval=v;
			try{
				if(typeof(defF)=="object"){rval=defF.dosequential(plug,rval);}
				if(typeof(defF)=="function"){rval=defF.call(plug,rval);}
			}catch(e){}
			return rval;
		}
		function inTranslatePluginValues(v) {
			var rval=null,plug=me.plugin,pA=v.split("|"),t=pA[0].split("raw:"),israw=(t.length>1?true:false),f;
			pA[0]=(!israw?pA[0]:t[1]);
			if(pA[1]&&pA[1].indexOf(",")!=-1) {t=pA.pop(); pA=pA.concat(t.split(","));}
			try {
				f=pA.splice(0,1)[0];
				if(typeof(plug[f])=="function") {
					plug.md=me;
					rval=plug[f].apply(plug,pA);
				}
			} catch(err) {}
			return rval;
		}
		n=(n.indexOf("m:")==0||n.indexOf("v:")==0?n.substr(2):n);
		if(n.indexOf("mb:")==0) {n="business."+this.get("business.name")+"."+n.substr(2);}
		var narray=n.split("."),nlast,i,vfinal,last=me.mdata,t1,z,are=/([^\[]+)\[(\d+)\]/;
		if(typeof(v)=="object") { vfinal=v;}
		if(typeof(v)=="function") { vfinal=v.call(me);}
		if(typeof(v)=="string") { vfinal=(v!=null&&v.indexOf!=null&&("gt".indexOf(v.substr(0,1))!=-1||v.indexOf("raw:")==0)&&v.indexOf("|")!=-1?inTranslatePluginValues(v):v) ;}
		vfinal=(!israw?inDefaultTransforms(vfinal):vfinal);
		type=(!type?"set":type);
		nlast=narray[narray.length-1];
		last=me.mdata; z=narray.length-1;
		for(i=0;i<z;i++) {
			t1=narray[i];a=are.exec(t1);
			if(a) {
				var a1=a[1],a2=a[2];
				if(!last[a1]) {last[a1]=[];}
				t1=a2; last=last[a1];
			}
			if(!last[t1]) {last[t1]={};}
			last=last[t1];
		}
		a=are.exec(nlast);
		if(!a) {
			if(type==="set") last[nlast]=vfinal;
			else {
				if(!(last[nlast]!=null&&typeof(last[nlast].push)=="function")) {last[nlast]=[];}
				last[nlast].push(vfinal);
			}
		} else {
			if(!last[a[1]]) last[a[1]]=[];
			last[a[1]][a[2]]=vfinal;
			return vfinal;
		}
		return last[nlast];
	};


	/* Modify Array objects to allow for iterative execution of values */
	arrayExtender.prototype = new Array();

	function arrayExtender(a){
		try{
			this.push.apply(this, a);
			return this;
		}catch(e){
			var err = e;
			return a;
		}
	}

	arrayExtender.prototype.forEach = (function(){
		var forEachFunction = function(f,tObj){
			var l=this.length,i;
			if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
				if(l == 0){
					try{
						l = 0;
						for(var p in this){
							var pName = p+"";
							if(!isNaN(parseInt(pName))){
								l+=1;
							}
						}
					}catch(e){}
				}
			}
			else if((navigator.appVersion.indexOf("MSIE 8.")!=-1))
			{
				try {
					var compatMode = _jsmd.plugin.gIreportgetMetaCompatible("IE=EmulateIE7");
					if((compatMode && compatMode.indexOf("EmulateIE7")!=-1)){
						if(l == 0){
							try{
								l = 0;
								for(var p in this){
									var pName = p+"";
									if(!isNaN(parseInt(pName))){
										l+=1;
									}
								}
							}catch(e){}
						}
					}
				} catch(e) {}
			}

			if(typeof f=="function"){
				for(i=0;i<l;i++){
					if(i in this){
						f.call(tObj,this[i],i,this);
					}
				}
			}
		};

	 	if((navigator.appVersion.indexOf("MSIE 7.")==-1)){
	 		return Array.prototype.forEach||forEachFunction;
		}else { return forEachFunction; }
	 })();

	arrayExtender.prototype.contains = Array.prototype.contains||function(obj){
		var i=this.length;
		if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
			if(i == 0 || !i){
				try{
					i = 0;
					for(var p in this){
						var pName = p+"";
						i+=1;
					}
				}catch(e){}
			}
		}
		while(i--){
			if(this[i]===obj){return true;}
		}
		return false;
	};

	arrayExtender.prototype.dosequential=function(o,val) {
		var rval=val,l=this.length;
		if((navigator.appVersion.indexOf("MSIE 7.")!=-1)){
			if(l == 0 || !l){
				try{
					l = 0;
					for(var p in this){
						var pName = p+"";
						l+=1;
					}
				}catch(e){}
			}
		}
		for (i=0;i<l;i++) {if(typeof(this[i])=="function"){rval=this[i].call(o,rval);}}
		return rval;
	};

	/**
	 *@function .jsmdBind
	 *Description: Binds the scope of any function call to the scope of the calling class, object or function. Once you use the .jsmdBind tag the scope can not be changed; if scope needs to change when function is called use .call() or .apply()
		Example:
			firstObject = {
				name: "First Object"
			}

			secondObject = {
				name: "Second Object",

			innerCall: function(value) {
				console.log(value + ", is in scope of" + this.name);
			}.jsmdBind(outerObject) // - bound to "outerObject" scope
			}

			innerObject.innerCall("This call");

			output:

			note: the output this.name is "First Object" not "Second Object".
	 *@param scope = the object that you want to keep in scope of.
	 */
	Function.prototype.jsmdBind = function(scope) {
	  var _function = this;

	  return function() {
	    return _function.apply(scope, arguments);
	  }
	}

	/* Last object available */
	var prvLastObject=null;
	function prvReturnLastObject(){return prvLastObject;}
	/* Public Module Functions */
	function publicInitialize(initObject, mapObject,vendorObject) {
		var io=_w._jsmdDefaultMetadataDictionaryTemplate||prvDefaultMetadataDictionaryTemplate,
			mo=_w._jsmdDefaultVendorMapTemplate||prvDefaultVendorMapTemplate,
			vo=_w._jsmdDefaultVendorSpecificTemplate||prvDefaultVendorSpecificTemplate;
		io=(!initObject?io:initObject);
		mo=(!mapObject?mo:mapObject);
		vo=(!vendorObject?vo:vendorObject);
		prvLastObject=new CAnalyticsObject(io,mo,vo);
		return prvLastObject;
	}

	/**
		@namespace Provides JavaScript object serialization support if not already defined.
	*/
	_w.JSON=window.JSON||null;
	if(!_w.JSON){_w.JSON={}}
	(function(){"use strict";function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify')}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse')}}}());

	function doImageBeaconGeneral(url,parameters) {
		for(p in parameters) {
			url = url.split("${"+p+"}").join(escape(parameters[p]));
		}
		url=url.split("${random}").join(_jsmd.getRandom());
		var isSSL=(window.location.protocol.toLowerCase().indexOf('https')!=-1);
		try {
			var beaconImage = new Image();
			beaconImage.src=(isSSL?url.split("http:").join("https:"):url);
		} catch (e){}
	}
	function _doOrAddLoad(f) {
		function _addLoadEvent(func) {
			if (window.addEventListener) // W3C standard
			{
			  window.addEventListener('load', func, false);
			}
			else if (window.attachEvent) // MS Browsers
			{
			  window.attachEvent('onload', func);
			}
			else {
				if(typeof(window.onload)=="function") {
				var old = window.onload;
				   window.onload = function()
				   {
				       old();
				       func();
				   };
				} else {
					window.onload=func;
				}
			}
		}
		if(document && document.getElementById
		             && document.getElementsByTagName
		             && document.body
		             && document.head) {
			try {f();} catch(e){}
		} else {
			_addLoadEvent(f);
		}
	}
	return {
		init:publicInitialize,
		JSMD:CAnalyticsObject,
		plugin:pubDefaultMetadataUtilities,
		last:prvReturnLastObject,
		getRandom:function(){return Math.floor(Math.random()*9999999999999999);},
		doImageBeacon:doImageBeaconGeneral,
		addOnLoad:_doOrAddLoad
	};
}();
function trackMetrics(action,data,mapObj,loaderFunction) {
	var realaction=action,realdata=data,realmap=mapObj,realload=loaderFunction;
	if(typeof(action)=="object") {
		if(action.type!=null) {realaction=action.type;}
		if(action.action!=null) {realaction=action.action;}
		if(action.data!=null) {realdata=action.data;}
		if(action.map!=null) {realmap=action.map;}
		if(action.load!=null) {realmap=action.load;}
	}
	if(typeof(realdata)=="object") {
		if(realdata.data!=null) {realdata=realdata.data;}
		if(realdata.map!=null) {realmap=realdata.map;}
		if(realdata.load!=null) {realload=realdata.load;}
	}
	if(typeof(realmap)=="object") {
		if(realmap.map!=null) {realmap=realmap.map;}
		if(realmap.load!=null) {realload=realmap.load;}
	}
	var defaultDynamicNS=_jsmd_default.dynamic;
	if(defaultDynamicNS!=null && typeof(defaultDynamicNS.load)=="function") {realload=defaultDynamicNS.load;}
	if(typeof(realload)=="function") {realload.call(this,realdata);}
	var tmpObj=_jsmd.init();
	tmpObj.trackMetrics(realaction,realdata,realmap);
};

/* CUSTOM LOGIC / EVENTS / FUNCTIONS */

/* declare global variable to track video time spent */
if (!video_start_time) var video_start_time = 0;
if (!video_pause) var video_pause = [0,0];	//["flag","play time"]
if (!setinterval_id) var setinterval_id;	//setInterval_id ID
if (!video_data) var video_data = "";		//flag for video start

function sendVideoProgress() {
	try {
		trackMetrics({
			type: "video-progress",
			data: _w.video_data
		});
	} catch(e){}
}

/* Initialization flag */
var jsmdIsInit=true;
var jsmdIsAd=false;
var jsmdAdVidID="";
var jsmdAdRange="";
/* game interaction function */
function sendGameInteraction(event,info){
	try {
		trackMetrics({
			type: event,
			data: {
				value: info
			}
		});
	} catch(e){}
}
/* video button function */
function sendVideoClick(info, event){
	try {
		trackMetrics({
			type: event,
			data: {
				value: info
			}
		});
	} catch(e){}
}
/* video callback function */
function sendVideoEvent(data, event, playerid){
	try {
		var currVidObj = _w.JSON.parse(data);
		currVidObj.playerid = playerid;
		trackMetrics({
			type: event,
			data: {
				video : currVidObj
			}
		});
	} catch(e){}
}
function sendVideo2Event(data, event, playerid){
	try {
		var currVidObj = data;
		currVidObj.playerid = playerid;
		trackMetrics({
			type: event,
			data: {
				video : currVidObj
			}
		});
	} catch(e){}
}
function sendAudioEvent(data, event){
	try {
		var currAudioObj = _w.JSON.parse(data);
		trackMetrics("audio-start",currAudioObj.headline, "adbp-audio");
	} catch(e){}
}
function sendNewsPulse(data){
	try {
		trackMetrics({
			type: "dynamic-newsPulseOmniCall",
			data: {
				newspulse: {
					query: data
				}
			}
		});
	} catch(e){}
}
function sendHTML5Event(data, event){
	if (data.contentType =="audio") {
		trackMetrics("audio-start",data.headline, "adbp-audio");
	} else {
		data.metas= {branding:"ireport"};
		try {
			trackMetrics({
				type: event,
				data: {
					video : data
				}
			});
		} catch(e){}
	}
}
function sendOpenStoryPerspective(data){
	try {
		trackMetrics({
			type: "ireport-openstory",
			data: {
				openstory : data
			}
		});
	} catch(e){}
}
function sendComscoreVideoMetrixBeacon(videoId,contentFlag,c4overrride) {
	_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}", {
			c1:'1', 		// Video metrix tag identifier
			c2:'3005117', // Turner Specific Tag
			c3:getSiteSpecificSettings(7), 	// Report-suite numeric identifier for comparisons to Omniture
			c4:(c4overrride?c4overrride:getSiteSpecificSettings(8)),   		// CNN Specific Tag
			c5:(contentFlag==1?'020000':'010000')
		}
	);
}
function sendNielsenVideoCensusBeacon(config,state,videoId,duration) {
	var url="http://secure-${sfcode}.imrworldwide.com/cgi-bin/m?ci=${clientid}&c6=${prod},${vcid}&cc=1&tl=${state}-${videoId}&rnd=${random}",
		nVC=(!config?null:config["video-census"]);
	if(duration == "live"){url="http://secure-${sfcode}.imrworldwide.com/cgi-bin/m?ci=${clientid}&c6=${prod},${vcid}&cc=1&tl=${state}-${videoId}&rnd=${random}&cg=live"}
	if(!nVC) {return;}
	switch(state) {
		case "start":
			nVC.state="dav0";
			nVC.videoId=videoId;
			_jsmd.doImageBeacon(url,nVC);
			break;
		case "complete":
			nVC.state="dav2";
			nVC.videoId=videoId;
			_jsmd.doImageBeacon(url,nVC);
			break;
	}
}

function getSiteSpecificSettings(type, section){
	/*reportsuite - 0, friendlyname - 1, visitor namespace - 2, tracking server - 3,  secure tracking server - 4, nielsen client id - 5, nielsen vcid - 6, comscore c3 - 7, comscore c4 - 8 */
	var hostName = window.location.hostname;
	var setting;
	var sites={
		"ireportdev":	["cnnireport-adbp-dev", "cnn ireport","cnnireport","metrics.cnn.com","smetrics.cnn.com","us-702210","c01","00001","3002212"],
		"ireport":		["cnnireport-adbp", "cnn ireport","cnnireport","metrics.cnn.com","smetrics.cnn.com","us-702210","c01","00001","3002212"],
		"cnnintl":		["cnn-adbp-intl", "cnn international","cnn", "metrics.cnn.com", "smetrics.cnn.com","us-100120","b01","00002","8587278"],
		"cnnintldev":	["cnn-adbp-intl-dev", "cnn international","cnn", "metrics.cnn.com", "smetrics.cnn.com","us-100120","b01","00002","8587278"],
		"cnndev":		["cnn-adbp-domestic-dev", "cnn domestic","cnn", "metrics.cnn.com", "smetrics.cnn.com","us-100120","b01","00001","8587204"],
		"cnn":			["cnn-adbp-domestic", "cnn domestic","cnn", "metrics.cnn.com", "smetrics.cnn.com","us-100120","b01","00001","8587204"]
	}
	/* comscore video section c4 */
	var c4={
		val1:["cnn homepage","8587211","8587278"],
		val2:["crime","8587220"],
		val3:["us","8587228"],
		val4:["world","8587235"],
		val5:["entertainment","8587242"],
		val6:["politics","8587248"],
		val7:["health","8587254"],
		val8:["tech","8587261"],
		val9:["living","8587266"],
		val10:["opinion","8587272"]
	}

	if (section && section != ""){
		var x=0;
		for (x in c4) {
			if (c4[x][0] == section) {
				setting = c4[x][1];
				if (section == "cnn homepage") {
					if (hostName.indexOf("edition.cnn.com")!=-1) {
						setting = c4[x][2];
					} else if (hostName.indexOf("jcmsdev8.cnn.com")!=-1 || hostName.indexOf("jcmsref.cnn.com")!=-1||hostName.indexOf("cnnpreview.cnn.com")!=-1 || hostName.indexOf("ref.cnn.com")!=-1 || hostName.indexOf("preview.cnn.com")!=-1) {
						var port = window.location.port;
						if (port.indexOf("94")!=-1|| hostName.indexOf("edition")!=-1) {
							setting = c4[x][2];
						}
					}
				}
				break;
			}
		}
	} else {
		if (hostName.indexOf("ireportqa.cnn.com")!=-1) {
			setting = sites.ireportdev[type];
		} else if (hostName.indexOf("jcmsdev8.cnn.com")!=-1 || hostName.indexOf("jcmsref.cnn.com")!=-1 || hostName.indexOf("cnnpreview.cnn.com")!=-1 || hostName.indexOf("ref.cnn.com")!=-1 || hostName.indexOf("preview.cnn.com")!=-1 || hostName.indexOf("dev.cnn.com")!=-1 || hostName.indexOf("stage.cnngo.com")!=-1 || hostName.indexOf("travel.cnngo.com")!=-1) {
			var port = window.location.port;
			if (port.indexOf("94")!=-1 || hostName.indexOf("edition")!=-1 || hostName.indexOf("cnnespanol")!=-1 || hostName.indexOf("stage.cnngo.com")!=-1 || hostName.indexOf("travel.cnngo.com")!=-1) {
				setting = sites.cnnintldev[type];
			} else {
				setting = sites.cnndev[type];
			}
		} else if (hostName.indexOf("qai.cnn.com")!=-1) {
			setting = sites.cnndev[type];
		} else if (hostName.indexOf("cnn.staging.perfectmarket.com")!=-1||hostName.indexOf("cnn.staging2.perfectmarket.com")!=-1) {
			setting = sites.cnndev[type];
		} else if (hostName.indexOf("ireport.cnn.com")!=-1) {
			setting = sites.ireport[type];
		} else if (hostName.indexOf("edition.cnn.com")!=-1||hostName.indexOf("cnnespanol.cnn.com")!=-1||hostName.indexOf("backstory.blogs.cnn.com")!=-1||hostName.indexOf("inthefield.blogs.cnn.com")!=-1||hostName.indexOf("securityfiles.blogs.cnn.com")!=-1||hostName.indexOf("thecnnfreedomproject.blogs.cnn.com")!=-1||hostName.indexOf("ukelection.blogs.cnn.com")!=-1||hostName.indexOf("amanpour.blogs.cnn.com")!=-1||hostName.indexOf("screeningroom.blogs.cnn.com")!=-1||hostName.indexOf("internationaldesk.blogs.cnn.com")!=-1||hostName.indexOf("newsstream.blogs.cnn.com")!=-1||hostName.indexOf("prism.blogs.cnn.com")!=-1||hostName.indexOf("thebrief.blogs.cnn.com")!=-1||hostName.indexOf("insidethemiddleeast.blogs.cnn.com")!=-1||hostName.indexOf("connecttheworld.blogs.cnn.com")!=-1||hostName.indexOf("business.blogs.cnn.com")!=-1||hostName.indexOf("questmeansbusiness.blogs.cnn.com")!=-1||hostName.indexOf("goalmouth.blogs.cnn.com")!=-1||hostName.indexOf("olympics.blogs.cnn.com")!=-1||hostName.indexOf("worldsport.blogs.cnn.com")!=-1||hostName.indexOf("bodareal.blogs.cnn.com")!=-1||hostName.indexOf("travel.cnn.com")!=-1) {
			setting = sites.cnnintl[type];
		} else if (hostName.indexOf("cnn.com")!=-1) {
			setting = sites.cnn[type];
		}
	}
	return setting;
}

/* TVE */
function TVE_VideoEvent(_data, _event){
	var isJSON = false;
	var vidObj;
	var dataObj = {};
	try {
		vidObj = _w.JSON.parse(_data);
		isJSON = true;
	} catch(e) {
		isJSON = false;
	}
	if (!isJSON) {
		vidObj = _data
	}
	try{
	if(vidObj.headline){dataObj.title = vidObj.headline;}
	if(vidObj.id){dataObj.id = vidObj.id;}
	if(vidObj.trt){dataObj.trt = vidObj.trt;}
	if(vidObj.clickbackUrl){dataObj.url = vidObj.clickbackUrl;}
	if(vidObj.grossLength){dataObj.grossLength = vidObj.grossLength;}
	if(vidObj.franchise){dataObj.franchise = vidObj.franchise;}
	if(vidObj.tveMode){dataObj.tveMode = vidObj.tveMode;}
	if(vidObj.contentId){dataObj.contentId = vidObj.contentId;}
	if(vidObj.airdate){dataObj.airdate = vidObj.airdate;}
	if(vidObj.dayssince){dataObj.dayssince = vidObj.dayssince;}
	if(vidObj.ad){dataObj.ad = vidObj.ad;}
	if(vidObj.seasonNumber){dataObj.seasonNumber = vidObj.seasonNumber;}
	if(vidObj.episodeNumber){dataObj.episodeNumber = vidObj.episodeNumber;}
	if(vidObj.lastAirDate){dataObj.lastAirDate = vidObj.lastAirDate;}
	if(vidObj.sPageName){dataObj.sPageName = vidObj.sPageName;}
	if(vidObj.omnitureVideoName){dataObj.omnitureVideoName = vidObj.omnitureVideoName;}
	if(vidObj.omnitureFranchise){dataObj.omnitureFranchise = vidObj.omnitureFranchise;}
	if(vidObj.franchiseId){dataObj.franchiseId = vidObj.franchiseId;}
	if(vidObj.isLive){dataObj.isLive = vidObj.isLive;}
	}catch(e){}
	/*
	id: vidObj.id,
	trt: vidObj.trt,
	url: vidObj.clickbackUrl,
	grossLength: vidObj.grossLength,
	franchise: vidObj.franchise,
	tveMode: vidObj.tveMode,
	contentId: vidObj.contentId,
	airdate: vidObj.airdate,
	dayssince: vidObj.dayssince,
	ad: vidObj.ad
	*/
	try{
		var action = vidObj.tveMode;
		if(_event === "video-complete"){
		}else if(_event === "video-progress"){
			action = "tve-cnn_video-progress";
		}
		else if (_event === "video-pause"){
		}
		else if ( _event === "video-start" ){
			action = "tve-cnn_video-start";
		}
		trackMetrics({type: action, data:dataObj});
	}catch(e){}
};

_jsmd.JSMD.prototype.tveMSO = "Unauthorized";

_jsmd.JSMD.prototype.tveRSIDList = {
	'Unauthorized': "tvenotauthcnnlive",
    'verizon': {
        global:			"tveverizonglobal",
        tve_network:	"tveverizoncnnlive",
        hln_network:	"tveverizonhln"
    },
    'comcast': {
        global:			"tvecomcastglobal",
        tve_network:	"tvecomcastcnnlive",
        hln_network:	"tvecomcasthln"
    },
    'adobe': {
        global:			"tveadobeglobaldev",
        tve_network:	"tveadobebranddev",
        hln_network:	"tveadobebranddev"
    },
    'dish': {
        global:			"tvedishglobal",
        tve_network:	"tvedishcnnlive",
        hln_network:	"tvedishhln"
    },
    'twc': {
        global:			"tvetwcglobal",
        tve_network:	"tvetwccnnlive",
        hln_network:	"tvetwchln"
    },
    'att': {
        global:			"tveattglobal",
        tve_network:	"tveattcnnlive",
        hln_network:	"tveatthln"
    },
    'charter': {
        global:			"tvecharterglobal",
        tve_network:	"tvechartercnnlive",
        hln_network:	"tvecharterhln"
    },
    'cox': {
        global:			"tvecoxglobal",
        tve_network:	"tvecoxcnnlive",
        hln_network:	"tvecoxhln"
    },
    'dtv': {
        global:			"tvedirecttvglobal",
        tve_network:	"tvedirecttvcnnlive",
        hln_network:	"tvedirecttvhln"
    },
    'google': "cnngoogletvcnnlive",
    'suddenlink': {
        global:			"tvesuddenlinkglobal",
        tve_network:	"tvesuddenlinkcnnlive",
        hln_network:	"tvesuddenlinkhln"
    },
    'cablevision': {
    	global: 		"tvecablevisionglobal",
    	tve_network:	"tvecablevisioncnnlive",
        hln_network:	"tvecablevisionhln"
    }
};

_jsmd.JSMD.prototype.tveRSID = (window.location.host === "www.cnn.com"||window.location.host === "us.cnn.com" )?"tveglobal,tvecnnlive,tvenotauth":"tveglobaldev,tvecnnlivedev,tvenotauthdev";

_jsmd.JSMD.prototype.sTVE_MSO = function(_MSO){
	var MSO = _MSO;
	MSO = MSO.toLowerCase();
	this.tveMSO = MSO;
};

_jsmd.JSMD.prototype.sTVE_RSID = function(_category){
	var globalRSID = "tveglobal";
	var brandRSID = "tvecnnlive";
	var networkRSID = "tve" + (this.tveMSO) + "cnnlive";
	if(_category == "hln"){
		var brandRSID = "tvehln";
		var networkRSID = "tve" + (this.tveMSO) + "hln";
	}
	if(this.tveMSO == "dtv"){
		networkRSID = networkRSID.replace("dtv","directtv");
	}
	var devStng = (window.location.host === "www.cnn.com"||window.location.host === "us.cnn.com" )?"":"dev";
	if (this.tveMSO != "Unauthorized"){
		this.tveRSID =  globalRSID+devStng+","+brandRSID+devStng+","+networkRSID+devStng;
	}
}

/*TVE Objects*/
_jsmd.JSMD.prototype.TVE = {
	video_progress: "0",
	userID: "Unspecified UserId",
	isAdPlayTimeSet: true,
	prevTotalPlayTime: 0,
	videoFranchise: "",
	videoTitle: "",
	lastPlayHeadTime: 0,
	nonC3C4adNum:0,
	allAdIntervlNum:0,
	isAdStart:false,
	adDuration:0,
	totalAdDurations:0,
	event22cal: 0,
	prevAdEvent22:0,
	adIntervalsCount:0,
	progressMarker:0,
	pageName:"",
	brand:"",
	host:"",
	channel:"",
	vidID:"",
	lastAirDate:"",
	dayssince:"",
	mode:"",
	videoFranchise:"",
	fullEpisode:"",
	playerLocation:"",
	liveStreamName: "",
	authState :"authenticated"
};

function trackAuthenticationStart(_trackingData) {
	try{
		var MSO = _trackingData[0];
		MSO = MSO.toLowerCase();
		jsmd.sTVE_MSO(MSO);
	}catch(e){}
}

function trackAuthenticationComplete(_trackingData) {
	try{
		var MSO = _trackingData[1];
		MSO = MSO.toLowerCase();
		jsmd.sTVE_MSO(MSO);
		var userID = _trackingData[2];
		jsmd.TVE.userID = userID;
	}catch(e){}
}

function trackAlreadyLoggedInPage(_trackingData) {
	try{
		var MSO = _trackingData[1];
		MSO = MSO.toLowerCase();
		jsmd.sTVE_MSO(MSO);
		var userID = _trackingData[2];
		jsmd.TVE.userID = userID;
	}catch(e){}
}

function trackNotLoggedInPage() {
}

var cnnTVEOmniTimeParting = new function(){
	this.weekDays=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	this.initDate= new Date();
	this.getDate=function(){
		var funcTime=(new Date()).getTime();
		var localTime=this.initDate.getTime();
		return new Date(cnnCurrTime.getTime()+(funcTime-localTime));
	};
	this.getDayPart=function(){return this.weekDays[this.getDate().getDay()];};
	this.getWeekPart=function(){return (this.getDayPart()==="Sat"||this.getDayPart()==="Sun")?"Weekend":"Weekday";};
	this.getMinute=function(){
		var cnnOmniMint = parseInt(this.getDate().getMinutes()/15)*15;
		return (cnnOmniMint===0)?'00':cnnOmniMint;
	};
	this.getHour=function(){
		var hour=this.getDate().getHours();
		return (hour<10)?'0' + hour:hour;
	};
	this.getTime=function(){return this.getHour() + ":" + this.getMinute();};
	this.getTimeParting=function(){return this.getTime() + "|" + this.getDayPart() + "|" + this.getWeekPart();};
};

/* TRANSPORT / RAW FILES ONLY BELOW THIS LINE */
function trackComscoreVideoMetrixBeacon(config,videoId,contentFlag) {
	var configVals =(!config?null:config["video-metrix"]);
	if(!configVals) {return;}
	_jsmd.doImageBeacon("http://b.scorecardresearch.com/p?c1=${c1}&c2=${c2}&c3=${c3}&c4=${c4}&c5=${c5}&rn=${random}", {
			c1:configVals.c1,	// Video metrix tag identifier
			c2:configVals.c2, 	// Turner Specific Tag
			c3:configVals.c3, 	// Report-suite numeric identifier for comparisons to Omniture
			c4:configVals.c4,	// NCAA Specific Tag
			c5:(contentFlag==1?'020000':'010000')
		}
	);
}
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24.1';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+"0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+"dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+"v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+"lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+"!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+"){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+"if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+"e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+"'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+"indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+"s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+"eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+"f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+"){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+"&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+"':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INP"
+"UT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick"
+";if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='IN"
+"PUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o."
+"s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q="
+"'&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=funct"
+"ion(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=fun"
+"ction(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object"
+".prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}re"
+"turn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick"
+":\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){i"
+"f(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s."
+"visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%1000"
+"0>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring"
+"(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)"
+"m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s"
+"=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl"
+")s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_"
+"i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l"
+"[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+"
+"\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);e"
+"lse s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i]"
+";if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&"
+"&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o."
+"e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}i"
+"f((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\""
+"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)"
+"/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o."
+"defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o"
+".n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;f"
+"or(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va"
+"_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!"
+"s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){va"
+"r s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk="
+"1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1"
+"900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_l"
+"l();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.s"
+"etUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){"
+"}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.in"
+"nerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.of"
+"fsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('"
+"s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if("
+"p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;"
+"s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s."
+"_1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.pa"
+"rentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if"
+"(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'"
+"?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');"
+"x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){i"
+"f(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq"
+"(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code"
+"};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightInc"
+"rementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<"
+"t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype"
+"[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].a"
+"pply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.b"
+"ody;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.ind"
+"exOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf("
+"'Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));els"
+"e s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.s"
+"a(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pa"
+"geURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s."
+"vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightInc"
+"rementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<="
+"3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage"
+",plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitor"
+"SamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,li"
+"nkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;"
+"if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
function trackNielsenVideoCensusBeacon(config,state,videoId,videoTitle,duration) {
	var url="http://secure-${sfcode}.imrworldwide.com/cgi-bin/m?ci=${clientid}&c6=${prod},${vcid}&cc=1&tl=${state}-${videoId}&rnd=${random}&cg=${videoTitle}",
		nVC=(!config?null:config["video-census"]);
	if(!nVC) {return;}
	switch(state) {
		case "start":
			nVC.state="dav0";
			break;
		case "complete":
			nVC.state="dav2";
			break;
	}
	nVC.videoId=videoId;
	nVC.videoTitle=videoTitle;
	_jsmd.doImageBeacon(url,nVC);
}
/*  Nielsen Online SiteCensus V6.0 */

var NielsenHybridTag=function(){
	function doNielsen(a) {
	    var d = new Image(1, 1);
	    d.onerror = d.onload = function () {
	      d.onerror = d.onload = null;
	    };
	    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=", escape(a), "&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
  }
  return { push_nielsen:doNielsen };
}();

/* END Nielsen Online SiteCensus V6.0 */
