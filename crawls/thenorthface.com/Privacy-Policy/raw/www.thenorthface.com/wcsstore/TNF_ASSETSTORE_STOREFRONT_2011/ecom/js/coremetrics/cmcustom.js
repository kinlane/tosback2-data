var cm_exAttr=new Array();var cmCheckCMEMFlag=true;var cmSendOSLinkClickTag=true;var cmAutoCopyAttributesToExtraFields=false;if(typeof (cmSetupOther)=="function"){cmSetupOther({cm_TrackImpressions:""})}function cmCreatePageviewTag(F,C,E,A,G,D,B){cmMakeTag(["tid","1","pi",F,"cg",C,"se",E,"sr",A,"pc","Y","pv11",G,"cmAttributes",D,"cmExtraFields",B])}function cmCreateDefaultPageviewTag(A){cmCreatePageviewTag(cmGetDefaultPageID(),A)}function cmCreateProductviewTag(D,I,A,J,G,C,F,H,E,B){if(H){if(H!="0"){J=H}}if((C==null)||C==""){C="Y"}if((D==null)||(D=="")||(C=="N")){D=cG7.cM0[cm_ClientID]}cmMakeTag(["tid","5","pi",D,"pr",I,"pm",A,"cg",J,"pc",C,"pv11",G,"cm_vc",B?B:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",E])}function cmCreateShopAction5Tag(K,A,C,J,L,H,F,D,G,B,I){J=J.toString().replace(cmPricePattern,"");K=K.toString().replace(cmSpacePattern,"");if(G){if(G!="0"){L=G}}var E=""+(B?B+"|||":"")+(I?"extra"+I:"");cmAddShop(["pr",K,"pm",A,"qt",C,"bp",J,"cg",L,"cmAttributes",B,"cmExtraFields",I,"ha1",cm_hex_sha1(E),"at","5","tid","4","pc","N","sx11",H,"cc",F])}function cmCreateShopAction9Tag(P,B,F,O,A,D,H,Q,L,I,J,N,E,K,C,M){O=O.toString().replace(cmPricePattern,"");H=H.toString().replace(cmPricePattern,"");P=P.toString().replace(cmSpacePattern,"");if(K){if(K!="0"){Q=K}}var G=""+(C?C+"|||":"")+(M?"extra"+M:"");cmAddShop(["pr",P,"pm",B,"qt",F,"bp",O,"cg",Q,"cd",A,"cmAttributes",C,"cmExtraFields",M,"ha1",cm_hex_sha1(G),"on",D,"tr",H,"at","9","tid","4","pc","N","sx11",L,"cc",I,"sx13",J,"sx14",N]);cmCalcSKUString()}function cmCreateOrderTag(E,H,D,A,C,I,G,M,J,K,F,L,B,N){if(((L==null)||(L==""))&&K){L="No Code"}D=D.toString().replace(cmPricePattern,"");H=H.toString().replace(cmPricePattern,"");cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",E,"tr",H,"sg",D,"cd",A,"ct",C,"sa",I,"zp",G,"or11",M,"cc",J,"or13",K,"or14",F,"or15",L,"cmAttributes",B,"cmExtraFields",N])}function cmCreateRegistrationTag(D,L,R,N,Q,P,K,A,J,G,H,C,M,S,I,F,O,E){if(E){var B=new Array();B=E.split("-_-")}cmMakeTag(["tid","2","cd",D,"em",L,"ct",R,"sa",N,"zp",Q,"nl",P,"sd",K,"cy",J,"ag",G,"gd",H,"ml",O,"cm_exAttr",B])};