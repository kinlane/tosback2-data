/*
 * =============================================================================
 *
 *   PRICE MINISTER APPLICATION
 *   Copyright (c) 2000 Babelstore.
 *   All Rights Reserved.
 *
 *   $Source$
 *   $Revision$
 *   $Date$
 *   $Author$
 *
 * =============================================================================
 */


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                        PM.Util
------------------------------------------------------------------------------*/
/**
 * Remplace, si n�cessaire, la valeur de l'objet pass� en param�tre par une valeur avec uniquement des chiffres
 *
 * @param obj : Objet de type input text contenant la valeur � v�rifier
 */
PM.Util.cleanInt = function(obj) {
  var reg = new RegExp('[^0-9]', 'g');
  var temp = obj.value.replace(reg, '');
  if(temp != obj.value) {
    obj.value = temp;
  }
}

/**
 * Copie le contenu d'un �l�ment dans le presse-papier.
 * Sous les autres navigateurs que IE, effectue une simple selection de l'element.
 *
 * @param {Object} elt l'�l�ment � copier le contenu.
 */
PM.Util.copyToClipBoard = function(elt) {
  var sel_code = $(elt);
  if (sel_code.createTextRange && ie) {
    var sel_text = sel_code.createTextRange();
    if (sel_text) {
      sel_text.execCommand("Copy");
    }
  }
  try {
    sel_code.focus();
    sel_code.select();
  }
  catch(e) {}
}

/**
 * Emp�che la fonction "Coller" sur l'�l�ment (un input ou un textarea par exemple)
 * Utilise le s�lecteur et le .bind de JQuery
 *
 * @param {Object} domElt l'�l�ment DOM sur lequel appliquer la fonction
 */
PM.Util.preventPaste = function(domElt) {
  $j(document).ready(function () {
        domElt.bind('paste', function (e) {PM.Util.preventDefault(e);});
        })
}

/**
*  Cette fonction calcule la position d'un �l�ment
*  node : le noeud dont on souhaite la position
*  return : un couple (x,y)
*
*/
PM.Util.calculateElementPosition = function(node) {
  var x = node.offsetLeft;
  var y = node.offsetTop;

  offsetparent_x = 0;
  offsetparent_y = 0;
  
  parentoff = node.offsetParent;
  parentn = node.parentNode;
  while (parentn.tagName != "BODY") {
    offsetparent_x += parentoff.offsetLeft;
    offsetparent_y += parentoff.offsetTop;
    while (parentn != parentoff){
      parentn = parentn.parentNode;
    }
    parentoff = parentn.offsetParent;
  }
  return [x + offsetparent_x, y + offsetparent_y];
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Util.Price
------------------------------------------------------------------------------*/

/**
 * @namespace Outils pour la gestion des prix (check, conversion) <code>(Doc � revoir)</code>.
 */
PM.Util.Price = { }

/**
 * Checks if the price is correctly formatted
 *
 * @param amount : Price value
 * @returns true if it's correctly formatted else false
 */
PM.Util.Price.isCorrectlyFormatted = function(amount) {
  if(amount == null)
    return false;
  var reg = new RegExp('^(' + PM.Constants.Price.nationalPattern + ')$', 'g');
  if(amount.match(reg))
    return true;
  reg = new RegExp('^(' + PM.Constants.Price.pmPattern + ')$', 'g');
  return amount.match(reg);
}

/**
 * Function used to rewrite an amount (remove thousandsSeparator and replace digitsSeparator by a point)
 *
 * @param amount  : Price value
 * @return amount if the pattern doesn't match else the amount reformatted
 */
PM.Util.Price.rewriteAmount = function(amount) {
  if(amount == null)
    return amount;

  // National rewrite
  var reg = new RegExp('^(' + PM.Constants.Price.nationalPattern + ')$', 'g');
  if(amount.match(reg)) {
    reg    = new RegExp('[' + PM.Constants.Price.thousandsSeparator + ']', 'g');
    amount = amount.replace(reg, '');
    if(PM.Constants.Price.digitsSeparator != '.') {
      reg    = new RegExp('[' + PM.Constants.Price.digitsSeparator + ']', 'g');
      amount = amount.replace(reg, '.');
    }
  }

  // Price rewrite
  reg = new RegExp('^(' + PM.Constants.Price.pmPattern + ')$', 'g');
  if(amount.match(reg)) {
    if(PM.Constants.Price.digitsSeparator != '.') {
      reg    = new RegExp('[' + PM.Constants.Price.digitsSeparator + ']', 'g');
      amount = amount.replace(reg, '.');
    }
  }

  return amount;
}

/**
 * Checks if the price is correct
 * Otherwise, trims it
 *
 * @param val Price value to check/trim
 *
 * @return the cleaning price
 * 
 * @deprecated utiliser PM.Util.Price.clean
 */
PM.Util.Price.check = function(val) {
  var reg = new RegExp('[^0-9' + PM.Constants.Price.digitsSeparator + PM.Constants.Price.thousandsSeparator + '.]', 'g');
  var temp = val.replace(reg, '');
  var doublon = [",", " ", "."];

  for(var i=0; i < doublon.length; i++){
    reg = new RegExp("["+doublon[i]+doublon[i]+"]+", 'g');
    temp = temp.replace(reg, doublon[i]);
  }

  return temp;
}

/**
 * Remplace, si n�cessaire, la valeur de l'objet (le prix) pass� en param�tre par une valeur avec uniquement des chiffres 
 * et le formatage associ� au prix (, . " ")
 *
 * @param obj : Objet de type input text contenant la valeur � v�rifier
 *
 */
PM.Util.Price.clean = function(obj) {
  var reg = new RegExp('[^0-9' + PM.Constants.Price.digitsSeparator + PM.Constants.Price.thousandsSeparator + '.]', 'g');
  var temp = obj.value.replace(reg, '');
  var doublon = [",", " ", "."];
  
  for(var i=0; i < doublon.length; i++){
    reg = new RegExp("["+doublon[i]+doublon[i]+"]+", 'g');
    temp = temp.replace(reg, doublon[i]);
  }
  //On change la valeur de l'objet input text par la valeur chang�e si la nouvelle valeur(apr�s le trim) est diff�rente de l'ancienne
  if(temp != obj.value) {
    obj.value = temp;
  }
  
  //Supprime les 0 en trop devant le prix.
  //Remplace tous les 0 du d�but par un 0. Ex: 002 est transform� en 02 - 0000.5 est transform� en 0.5 - 0000 est transform� en 0
  obj.value = obj.value.replace(/^[0]+/g,"0");
  //Si le nombre commence par un z�ro suivi d'un chiffre, supprime le 0. Ex: 02 est transform� en 0.
  obj.value = obj.value.replace(/(^[0])([1-9])/g,"$2");
  //Si le prix commence par un s�parateur de d�cimales, met un 0 devant. Ex: , est transform� en 0,
  if (obj.value.charAt(0) == PM.Constants.Price.digitsSeparator || obj.value.charAt(0) == PM.Constants.Price.thousandsSeparator || obj.value.charAt(0) == '.') {
    obj.value = "0" + obj.value;
  }
}

/**
 * Formats price with 2 decimals
 *
 * @param pricein Input price
 * @return Output price, empty string if input price is not valid
 */
PM.Util.Price.format = function(pricein) {
  if (pricein == null || PM.Util.trim(pricein) == '')
    return '';

  var priceout = Math.round(Number(pricein.replace(/,/, '.'))*100) / 100;
  if (isNaN(priceout))
    return '';
  else
    return priceout;
}


/**
 * Euro-Franc converter
 * > Should be working for all currency - to refactor
 * @deprecated
 *
 * @param price    Input price
 * @param currency Currency to convert in
 *
 * @return Output price
 */
PM.Util.Price.convert = function(price, currency) {
  PM.Statistics.deprecatedFunctions("PM.Util.Price.convert");
  if (price == null || PM.Util.trim(price) == '')
    return '';

  var rate;
  if (currency == 250)
    rate = 100 / 6.55957;
  else if (currency == 978)
    rate = 100 * 6.55957;
  else
    rate = 100;

  var priceout = Math.round(Number(price.replace(/,/, '.')) * rate) / 100;
  if (isNaN(priceout))
    return "";
  else {
    if (price.match(/,/) == null)
      return priceout;
    else
      return Number(priceout).toString().replace(/\./, ',');
  }
}

/**
 * Calcule un prix "promo" � partir d'un prix de r�f�rence et d'un pourcentage de r�duction.
 * @param referencePrice est le prix de r�f�rence.
 * @param discountPercent est le pourcentage de r�duction.
 * @return le prix "promo".
 */
PM.Util.Price.computeSaleCampaignPrice = function(referencePrice, discountPercent) {
  if (referencePrice == null || discountPercent == null) {
    return "";
  }
  
  // G�re la virgule.
  var newPrice = referencePrice.replace(',', '.');
  // Calcule le prix "promo" � partir du prix de r�f�rence et du pourcentage de r�duction.
  newPrice = newPrice * ((100 - discountPercent) / 100);
  // Ne conserve que 3 d�cimales (N�cessaire pour les probl�mes des multiplications qui ne donnent pas de r�sultat exact).
  newPrice = parseInt(newPrice * 1000) / 1000;
  // Arrondit � deux chiffres apr�s la virgule.
  newPrice = Math.ceil(newPrice * 100)/100;
  
  return newPrice;
}

/**
 * Calcule un pourcentage de r�duction � partir d'un prix de r�f�rence et d'un prix "promo".
 * @param referencePrice est le prix de r�f�rence.
 * @param saleCampaignPrice est le prix "promo".
 * @return le pourcentage de r�duction.
 */
PM.Util.Price.computeDiscountPercent = function(referencePrice, saleCampaignPrice) {
  if (referencePrice == "" || saleCampaignPrice == "" || referencePrice == null || saleCampaignPrice == null) {
    return "";
  }
  
  var discountPercent = 100 - Math.ceil(100 * saleCampaignPrice / referencePrice);
  return discountPercent > 0 ? discountPercent : 0;
}

/**
 * Remplace si n�cessaire la valeur de l'objet pass� en param�tre de telle sorte que la valeur corresponde � un prix correctement format� pour les soldes.
 * Le prix cible doit �tre sous la forme "562.89" avec au maximum 2 chiffres apr�s le s�parateur.
 * N'utilise pas les m�thodes g�n�riques de validation des prix car celles-ci permettent la saisie de plusieurs s�parateurs et de plus de 2 chiffres apr�s le s�parateur.
 * M�thode � g�n�raliser par la suite?
 * @param obj est l'objet dont la valeur doit �tre nettoy�e.
 */
PM.Util.Price.cleanSaleCampaignPrice = function(obj) {
  if (obj == null || obj.value == null) {
    return;
  }

  // Remplace les virgules par un point.
  var value = obj.value.replace(',', '.');
  
  // Ne conserve que les chiffres et le point.
  value = value.replace(new RegExp('[^0-9.]', 'g'), '');
  
  // Si il y a un point, on ne conserve que deux chiffres apr�s le point.
  if (value.indexOf('.') != -1) {
    var numberParts = value.split('.');

    // Valeur enti�re.
    value = value.indexOf('.') == 0
          ? '0'
          : numberParts[0];

    // Concat�ne le point.
    value += '.';

    // Concat�ne la partie d�cimale en ne conservant que deux chiffres.
    if (numberParts.length > 1) {
      value += numberParts[1].substring(0, 2);
    }
  }
  
  obj.value = value;
}

/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

/**
 * <font style="color: red">Fonction d�pr�ci�e</font>
 * @see PM.Util.Price.check
 * @deprecated <font style="color: red">Cette fonction ne doit plus �tre utilis�e !</font>
 */
function checkPrice(val) {
  PM.Statistics.deprecatedFunctions("checkPrice");
  return PM.Util.Price.check(val);
}

/**
 * <font style="color: red">Fonction d�pr�ci�e</font>
 * @see PM.Util.Price.convert
 * @deprecated <font style="color: red">Cette fonction ne doit plus �tre utilis�e !</font>
 */
function computePrice(pricein, currencyin) {
  PM.Statistics.deprecatedFunctions("computePrice");
  return PM.Util.Price.convert(pricein, currencyin);
}

/* END : Kept for backward compatibility */

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                              PM.Util.Dimension
------------------------------------------------------------------------------*/

/**
 * @namespace Outils pour la gestion des dimentions (check) <code>(Doc � revoir)</code>.
 */
PM.Util.Dimension = {}

/**
 * Checks if the dimension is correct
 * Otherwise, trims it
 *
 * @param val Dimension value to check/trim
 *
 * @return the cleaning dimension
 */
PM.Util.Dimension.check = function(val) {
  var reg = new RegExp('[^0-9' + PM.Constants.Price.digitsSeparator + PM.Constants.Price.thousandsSeparator + '.]', 'g');
  var temp = val.replace(reg, '');
  var doublon = [",","."];

  for(var i=0; i < doublon.length; i++){
    reg = new RegExp("["+doublon[i]+doublon[i]+"]+", 'g');
    temp = temp.replace(reg, doublon[i]);
  }

  return temp.replace(/ /g,'') ;
}

/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

function checkDimension(val) {
  PM.Statistics.deprecatedFunctions("checkDimension");
  return PM.Util.Dimension.check(val);
}

/* END : Kept for backward compatibility */

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Util.IntValue
------------------------------------------------------------------------------*/

/**
 * @namespace Outils pour la gestion d'une valeur de type int.
 */
PM.Util.IntValue = { }

/**
 * V�rifie que la valeur ne contient que des nombres
 */
PM.Util.IntValue.check = function(val) {
  var reg = new RegExp('[^0-9]', 'g');
  var temp = val.replace(reg, '');
  
  if (temp==0)
    return '';
  return temp;
}

function checkIntValue(val) {
  return PM.Util.IntValue.check(val);
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                   PM.Text
------------------------------------------------------------------------------*/
/**
 * @namespace Outils li�s au texte.
 */
PM.Text = {}

/**
 * Permet de tronquer un contenu compris entre deux balises
 *
 * @param {String}      content   Contenu � tronquer
 * @param {int}         maxLength Longueur maximale
 * @param {JSON Object} options   Options facultatives
 * <ul>
 *   <li><code><b>addPoints</b> (true)</code> : Ajoute des points de suspension au texte tronqu�.</li>
 * </ul>
 *
 * @return Texte tronqu�
 */
PM.Text.truncate = function(content, maxLength, options) {
  if (content.length > maxLength) {
    // tronquage au nombre de caract�res requis + 1 caract�res (pour g�rer un �ventuel espace)
    content = content.substring(0, maxLength+1);

    // on supprime tous les caract�res apr�s le dernier espace, s'il y en a au moins un
    var lastSpaceIndex = content.lastIndexOf(' ');
    if (lastSpaceIndex > 0){
      content = content.substring(0, lastSpaceIndex);
    }
    else {
      content = content.substring(0, maxLength);
    }

    // on supprime tous les caract�res bizarres (virgule, tirets...) qui peuvent terminer la cha�ne
    content = content.replace(/[\s,"':(.-]+$/, "");

    // ajout des points de suspension
    content += PM.Util.getOption(options, "addPoints", true)? "..." : "";
  }
  return content;
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                   PM.Paginate
------------------------------------------------------------------------------*/

/**
 * Cr�e et affiche un objet de type <code>PM.Paginate</code>.
 *
 * @class G�n�ration et affichage d'une pagination en pied de bloc <br /> <br /> <img src="http://docs.pm.dev:8080/jsdoc/images/paginate.jpg">
 * @constructor
 *
 * @param {String} globalContainer    Identifiant du conteneur du footer
 * @param {String} pageUrl            Url de rafraichissement des donn�es
 * @param {int}    total              Nombre total d'�l�ments
 * @param {int}    step               Nombre d'�l�ments � afficher par page
 * @param {Object} labels             Ensemble des labels
 * <ul>
 * <li><code><b>next</b></code> label du lien "suivant"</li>
 * <li><code><b>previous</b></code> label du lien "pr�c�dent"</li>
 * <li><code><b>pageNumberPrefix</b></code> label qui pr�fixe le num�ro de page</li>
 * </ul>
 * @param {JSON Object} options Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * <ul>
 * <li><code><b>callBackFct</b></code> Fonction callBack appel�e apr�s l'affichage des r�sultats</li>
 * <li><code><b>beforePageLoadFct</b></code> Fonction appel�e avant le rechargement de la pagination. Cette fonction est bloquante et, si elle est d�finie, doit appeler PM.Paginate.prototype.load elle-m�me.</li>
 * </ul>
 */
PM.Paginate = function(globalContainer, pageUrl, total, step, labels, options) {

  this.currentFirstElement = 0;

  // Variables
  this.globalContainer = $(globalContainer);
  this.containerToRefresh = ".listing";
  this.pageUrl = pageUrl;
  this.total = total;
  this.step = step;
  this.labels = labels;

  // On r�cup�re les options
  if (!options) options = {};
  this.callBackFct  =  !options.callBackFct ? null : options.callBackFct;
  this.beforePageLoadFct   =  !options.beforePageLoadFct  ? null : options.beforePageLoadFct ;

  /**
   * Page courante
   * @type Number
   */
  this.currentPage = 1; // page courante
  /**
   * Nombre total de pages
   * @type Number
   */
  this.totalPages = 1; // nombre total de pages

  // Initialisation de la pagination

  this.pageNumberElt = PM.Dom.createElement("li", {className: "nbpage"});
  this.linkPrev = PM.Dom.createElement("li", {className: "prev prev_off"});
  this.linkNext = PM.Dom.createElement("li", {className: "next next_off"});

  var paginationUl = PM.Dom.createElement("ul", {className: "pagi"});
  paginationUl.appendChild(this.linkPrev);
  paginationUl.appendChild(this.pageNumberElt);
  paginationUl.appendChild(this.linkNext);

  var footerContainer = $j("div.b_foot", this.globalContainer)[0];
  footerContainer.appendChild(paginationUl);

  this.updateLinks();
}

/**
 * Met � jour la pagination
 * <ul>
 * <li>Ajoute/supprime les liens</li>
 * <li>Met � jour le num�ro de page</li>
 * </ul>
 *
 * @ignore
 */
PM.Paginate.prototype.updateLinks = function() {

  // Calcul du nombre de pages total et en cours
  if (this.total > 0) {
      this.currentPage = 1+Math.ceil(this.currentFirstElement / this.step);
      this.totalPages = Math.ceil(this.total / this.step);
  }

  // Blocage de la nav si la page en cours est sup�rieure au nombre de page totale
  if(this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages;
  }

  // mise � jour du nombre de page
  this.pageNumberElt.innerHTML = this.labels.pageNumberPrefix + " " + this.currentPage + "/" + this.totalPages;


  // lien "pr�c�dents"
  this.linkPrev.className = (this.currentPage > 1)? "prev prev_on": "prev prev_off";
  var prevElt = PM.Dom.createElement("span", {content: this.labels.previous});
  if (this.currentPage > 1) {
    // ajout du lien "pr�c�dents" si la page en cours n'est pas la premi�re page
    prevElt = PM.Dom.createLink("#" + this.globalContainer.id, prevElt);
    PM.Event.add(prevElt, "click", this.prevPage.bindObj(this));
  }
  if (this.linkPrev.firstChild != null) {
    this.linkPrev.replaceChild(prevElt, this.linkPrev.firstChild);
  } else {
    this.linkPrev.appendChild(prevElt);
  }

  // lien "suivants"
  this.linkNext.className = (this.currentPage < this.totalPages)? "next next_on": "next next_off";
  var nextElt = PM.Dom.createElement("span", {content: this.labels.next});
  if (this.currentPage < this.totalPages) {
    // ajout du lien "suivants" si la page n'est pas la derni�re page � afficher
    nextElt = PM.Dom.createLink("#" + this.globalContainer.id, nextElt);
    PM.Event.add(nextElt, "click", this.nextPage.bindObj(this));
  }
  if (this.linkNext.firstChild != null) {
    this.linkNext.replaceChild(nextElt, this.linkNext.firstChild);
  } else {
    this.linkNext.appendChild(nextElt);
  }

}
/**
 * Affiche la page pr�c�dente
 *
 * @ignore
 */
PM.Paginate.prototype.prevPage = function(e) {
  PM.Util.preventDefault(e);
  this.load(-this.step);
}

/**
 * Affiche la page suivante
 *
 * @ignore
 */
PM.Paginate.prototype.nextPage = function(e) {
  PM.Util.preventDefault(e);
  this.load(this.step);
}

/**
 * Lance un appel Ajax pour r�cup�rer une page
 *
 * @param {int} offset  D�calage par rapport � l'affichage courant
 * @param {boolean} force  Force l'appel au callback ou non
 *
 * @ignore
 */
PM.Paginate.prototype.load = function(offset, force) {
  if(!force && this.beforePageLoadFct != null) {
    this.beforePageLoadFct.apply(null, [this, offset]);
  } else {
    if (typeof(offset) != "number") offset = 0;

    this.currentFirstElement += offset;
    var params = "start=" + this.currentFirstElement + "&max=" + this.step;
    PM.Ajax.request(this.pageUrl, this.displayResult.bindObj(this), {method: PM.Ajax.POST, urlParams: params});
  }
}

/**
 * Affiche les r�sultats retourn�s par la requ�te Ajax.<br/>
 * Cette m�thode est appel�e automatiquement apr�s la r�ponse Ajax.
 *
 * @param {Objet} options  Tableau d'options retourn� par la requ�te Ajax
 *
 * @ignore
 */
PM.Paginate.prototype.displayResult = function(options) {
  PM.UI.scrollTo(this.globalContainer);
  var responseText = options.responseText;
  $j(this.containerToRefresh,this.globalContainer)[0].innerHTML = responseText;
  PM.Util.evalScript(responseText);
  this.updateLinks();
  if (this.callBackFct != null) this.callBackFct.apply(null);
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.Forms
------------------------------------------------------------------------------*/
/**
 * @namespace Outils pour les formulaires <code>(Doc � revoir)</code>.
 */
PM.Forms = {
  submitted: new Array()
}

/**
 * Avoid many submissions by the same user
 */
PM.Forms.checkSubmitted = function(formName, milliSeconds) {
  if(!milliSeconds) milliSeconds = 5000;

  // already submitted
  if (PM.Forms.submitted[formName] != "undefined"
  &&  PM.Forms.submitted[formName] == true) {
    // if user hits stop to correct something, allow new submission after 5 s
    window.setTimeout("PM.Forms.submitted['" + formName + "'] = false", milliSeconds);
    return false;
  }
  // first submission
  PM.Forms.submitted[formName] = true;
  return true;
}

/**
 * Valid form in javascript and avoid multiple submission
 * @param jquery selector (submit button)
 */
PM.Forms.oneSubmission = function(submitElement) {
  PM.Event.add($j(submitElement), "click", function(e) {
    $j(submitElement).attr('disabled', 'disabled');
    var form = $j(submitElement).parents('form:first');
    form.submit();
 }, false);  
}

/**
 * Return the element checked of a radio
 */
PM.Forms.getElementChecked = function(radioElement) {
    for(i=0;i<=radioElement.length-1;i++) {
      if(radioElement[i].checked)
        return radioElement[i];
    }
}

PM.Forms.updateOptionSelectedIndexFromValue = function(optionListId, optionValue) {
  $(optionListId).selectedIndex = PM.Util.getOptionIndexFromValue($(optionListId), optionValue);
}

/**
 * Check a radio button or checkbox given as parameter
 */
PM.Forms.checkInput = function(inputId) {
  $(inputId).checked = "checked";
  PM.History.registerEvent("PM.Forms.checkInput", inputId);
}

/**
 * Check a radio button from a value
 */
PM.Forms.checkRadio = function(radioElement, value) {
  for(i=0;i<=radioElement.length-1;i++) {
    if(radioElement[i].value == value) {
      PM.Forms.checkInput(radioElement[i]);
      break;
    }
  }
}

/**
 * Check if empty value selected in drop-dow"change
 *
 * @param elt Element to check
 */
PM.Forms.checkSelected = function(elt) {
  if (elt.options[elt.selectedIndex].value == '-1')
    elt.selectedIndex = 0;
}

/**
 * Permet de checker ou d�-checker plusieurs checkbox.
 * @param checkboxElements - Les checkbox � checker/d�-checker.
 * @param mustChecked - Bool�en permettant d'indiquer si il faut checker ou d�-checker les checkbox.
 */
PM.Forms.checkAllCheckbox = function(checkboxElements, mustChecked) {
  var checkedValue = mustChecked ? "checked" : "";
  for(i = 0; i < checkboxElements.length; i++) {
    checkboxElements[i].checked = checkedValue;
  }
}

/**
 * Select input value if same as searched keyword
 *
 * @param sthis    Input element
 * @param sKeyword Searched keyword
 */
PM.Forms.selectValue = function(sthis, sKeyword){
  if (sthis.value == sKeyword) {sthis.select();}
}

/**
 * Clear input if value is same as searched keyword
 *
 * @param sthis     Input element
 * @param enterText Text input should be like
 */
PM.Forms.clearValue = function(sthis, enterText) {
  if (sthis.value == enterText) {sthis.value = '';}
}


PM.Forms.MaxLength = function(input, maxLength, indicator, indicatorMessage) {
  this.input = $(input);
  this.maxLength = maxLength;
  this.indicator = $(indicator);
  this.iMessage = indicatorMessage;

  this.check();
  PM.Event.add(this.input, "keyup", this.check.bindObj(this));
}

PM.Forms.MaxLength.prototype.check = function() {
  var iLength = this.input.value.length;

  // calcul du nombre de caract�res restants
  var iLengthRemaining = this.maxLength;
  if (iLength>this.maxLength) {
    this.input.value = this.input.value.substring(0,this.maxLength);
    iLengthRemaining = 0;
  }
  else {
    iLengthRemaining = this.maxLength - iLength;
  }

  var message = PM.Util.variableReplace(this.iMessage, "nb", iLengthRemaining);
  // pour g�rer les cas diff�rents fran�ais/espagnol/anglais/etc...
  // TODO utiliser plural
  /*
  if (iLengthRemaining != 1) {
    message = PM.Util.variableReplace(message, "s0", "s");
  } else {
    message = PM.Util.variableReplace(message, "s0", "");
  }
  if (iLengthRemaining > 1) {
    message = PM.Util.variableReplace(message, "s01", "s");
  } else {
    message = PM.Util.variableReplace(message, "s01", "");
  }
  */

  this.indicator.innerHTML = message;
}

/**
 * Add option in a select element
 *
 * @param SelectList  select element
 * @param OptionName  Name of the option to add
 * @param OptionValue Value of the option to add
 */
PM.Forms.addOption = function(SelectList, OptionName, OptionValue) {
  if (SelectList.length == 0){
    newOption = new Option(OptionName, OptionValue, false, true);
  } else {
    newOption = new Option(OptionName, OptionValue, false, false);
  }
  SelectList.options[SelectList.length] = newOption;
}

/**
 * Clear all options in a select element
 *
 * @param elt Select element to clear options
 * @param start indice to start the deletion (ex: 1 = from element 1)
 */
PM.Forms.clearOptions = function(elt, start){
  if (!start) start = 0;
  var counter = start;
  var InitialLength = elt.length;
  while (counter != (InitialLength)) {
    elt.options[start]=null;
    counter++;
  }
}

PM.Forms.ajaxPostEncode = function(str) {
  var encodedStr = str.replace(new RegExp(String.fromCharCode(8364), 'g'),"&euro;");
  encodedStr = encodeURIComponent(encodedStr);

  return encodedStr;
}


/**
 * @namespace Permet de g�n�rer un titre � partir de la combinaison de plusieurs champs <code>(Doc � revoir)</code>.
 * Form 4G function
 */
PM.Forms.Title = {
  input: null,
  triggers: new Array()
}

/**
 * PM.Forms.Title.init
 * arguments must be :
 * - id of the title div
 * - id of the elements ("triggers") who change the title
 */
PM.Forms.Title.init = function() {
  if (arguments.length > 1) {
    var inputs = $(arguments[0]).getElementsByTagName("input");
    PM.Forms.Title.input = inputs[0];

    var triggers = null;
    for (var i = 1; i < arguments.length; i++) {
      triggers = $(arguments[i]).getElementsByTagName("input");

      if (triggers.length > 0) {
        PM.Forms.Title.triggers.push(triggers[0]);
        PM.Event.add(triggers[0], "blur", PM.Forms.Title.update);
        PM.Event.add(triggers[0], "keyup", PM.Forms.Title.update);
      } else {
        triggers = $(arguments[i]).getElementsByTagName("select");
        if (triggers.length > 0) {
          PM.Forms.Title.triggers.push(triggers[0]);
          PM.Event.add(triggers[0], "change", PM.Forms.Title.update);
        }
      }
    }

  }
}

/**
 * PM.Forms.Title.update
 * Update form title with triggers values
 */
PM.Forms.Title.update = function() {
  var new_title = "";
  var triggers = PM.Forms.Title.triggers;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].type == "text") {
      if (triggers[i].value != "") {
        new_title += triggers[i].value + " ";
      }
    } else {
      if (triggers[i].selectedIndex != 0) {
        new_title += triggers[i].options[triggers[i].selectedIndex].text + " ";
      }
    }
  }
  // updates title value;
  PM.Forms.Title.input.value = new_title;
}


/**
 * @namespace Affichage des dif�ferntes �tapes d'un formulaire <code>(Doc � revoir)</code>.
 * Form 4G function
 */
PM.Forms.Steps = {
  divs: new Array(),
  optionalSteps: new Array(),
  currentStep: 0
}

PM.Forms.Steps.init = function(form_id) {
  var divs = $(form_id).getElementsByTagName("div");

  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className.match("frm_fldset") && !divs[i].className.match("fld_optional")) {
      PM.Forms.Steps.divs.push(divs[i]);
    } else if (divs[i].className.match("frm_fldset") && divs[i].className.match("fld_optional")) {
      var par = divs[i].getElementsByTagName("p");
      for (var j = 0; j < par.length; j++) {
        if (par[j].className.match("frm_lgnd")) {
          PM.Forms.Steps.optionalSteps.push(divs[i]);
          PM.Event.add(par[j], "click", PM.Forms.Steps.toggleOptional.bindObj(par[j]));
        }
      }
    }
  }
  // init next and previous step links
  PM.Event.add($('form_step_next'), "click", PM.Forms.Steps.next);
}

PM.Forms.Steps.next = function() {
  PM.Forms.Steps.change(1, true);
}

PM.Forms.Steps.previous = function() {
  PM.Forms.Steps.change(-1, true);
}

PM.Forms.Steps.change = function(step, hasEffects) {

  step = parseInt(step);

  var newStep = PM.Forms.Steps.currentStep + step;

  if (newStep >= 0 && newStep < PM.Forms.Steps.divs.length) {
    if (newStep < PM.Forms.Steps.currentStep) {
      if (newStep == PM.Forms.Steps.divs.length - 2) { // before to last step
        $('form_step_next').style.display = "inline";
        $('browseButton').style.display = "none";
        // disable optional steps
        for (var i = 0; i < PM.Forms.Steps.optionalSteps.length; i++) {
          PM.Forms.Steps.optionalSteps[i].style.display = "none";
        }
      }
      if (hasEffects) {
        PM.UI.Effect.slideUp(PM.Forms.Steps.divs[PM.Forms.Steps.currentStep], { duration: 500 });
      } else {
        PM.Forms.Steps.divs[PM.Forms.Steps.currentStep].style.display = "none";
      }

    } else {
      if (newStep == PM.Forms.Steps.divs.length - 1) { // last step
        $('form_step_next').style.display = "none";
        $('browseButton').style.display = "block";
        // enable optional steps
        for (var i = 0; i < PM.Forms.Steps.optionalSteps.length; i++) {
          PM.Forms.Steps.optionalSteps[i].style.display = "block";
        }
      }
      if (hasEffects) {
      // Ajout du focus sur l'�tape qui va �tre d�roul�e en utilsant PM.Forms.firstElement4Focus(id_etape)
        //new Effect.SlideDown(PM.Forms.Steps.divs[newStep], { duration: 0.5 , afterFinish: function(effect){ var element = PM.Forms.firstElement4Focus(effect.element); if(element != null) element.focus(); }});
        PM.UI.Effect.slideDown(PM.Forms.Steps.divs[newStep], { duration: 500 });
      } else {
        PM.Forms.Steps.divs[newStep].style.display = "block";
      }
    }

    PM.Forms.Steps.currentStep = newStep;
  }

  PM.History.registerEvent("PM.Forms.Steps.change", step, false);

}

PM.Forms.Steps.fold = function() {
  while (PM.Forms.Steps.currentStep > 0) {
    PM.Forms.Steps.change(-1, false);
  }
}

PM.Forms.Steps.toggleOptional = function(stepId) {
  var display_type = "";
  var obj = (typeof(stepId) == "string")? $(stepId): this;
  if (obj.className.match("expanded")) {
    obj.className = obj.className.replace(new RegExp('expanded', 'g'), "");
    display_type = "none";
    PM.History.removeEvent("PM.Forms.Steps.toggleOptional", obj.id);
  } else {
    obj.className += " expanded";
    display_type = "block";
    PM.History.registerEvent("PM.Forms.Steps.toggleOptional", obj.id);
  }

  var divs = PM.Dom.parent(obj).getElementsByTagName("div");

  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className.match("fld_full")) {
      divs[i].style.display = display_type;
    }
  }
}


/**
 * Gestion des valeurs "Autre" dans les formulaires 4G
 */
PM.Forms.showAndHideOtherField = function(controlName) {
  var otherControlName = controlName + 'Other_ctner';
  var otherInputName = controlName + 'Other';

  if ($(otherControlName)) {
    if ($(controlName).value == 'other_value_select_value') {
      PM.UI.show(otherControlName);
      $(otherInputName).disabled=false;
      PM.History.registerEvent("PM.Forms.showAndHideOtherField", controlName);
    } else {
      $(otherInputName).disabled=true;
      PM.UI.hide(otherControlName);
      PM.History.removeEvent("PM.Forms.showAndHideOtherField", controlName);
    }

    PM.Forms.placeFormInputElements();
  }
}


/**
 * Hack IE6
 * Permet de d�placer correctement les champs du formulaire de mise en vente dans le cas o� un champ est "d�pli�"
 * (ex : DIA, champ "Autre")
 */
PM.Forms.placeFormInputElements = function() {
    // for ie : we do a trick on all input elements to "place" them
    if (ie) {
      var elts = $('mev_all_form').getElementsByTagName("input");

      for (i = 0; i < elts.length; i++) {
        current_state = elts[i].style.visibility;
        elts[i].style.visibility = (current_state == "hidden") ? "visible" : "hidden";
        elts[i].style.visibility = current_state;
      }
    }
}


/**
 * @namespace Gestion du focus sur un champ de formulaire <code>(Doc � revoir)</code>.
 */
PM.Forms.Focus = {}

PM.Forms.Focus.init = function(area_id) {
  // cibling form area
  var area = $(area_id);

  // looking for inputs and selects
  var inputs = PM.Util.collectionToArray(area.getElementsByTagName("input"));
  inputs = inputs.concat(PM.Util.collectionToArray(area.getElementsByTagName("select")));
  inputs = inputs.concat(PM.Util.collectionToArray(area.getElementsByTagName("textarea")));

  for (i = 0; i < inputs.length; i++) {
    PM.Event.add(inputs[i], "focus", PM.Forms.Focus.on);
    PM.Event.add(inputs[i], "blur", PM.Forms.Focus.off);
  }
}

PM.Forms.Focus.on = function(evt) {
  var elt = PM.Util.getElementFromEvent(evt);

  var pElt = PM.Dom.parent(elt);
  while (pElt.tagName != "P" && pElt.tagName != "DIV") {
    pElt = PM.Dom.parent(pElt);
  }
  if (!pElt.className.match("pm_focus")) {
    pElt.className += " pm_focus";
  }

}

PM.Forms.Focus.off = function(evt) {
  var elt = PM.Util.getElementFromEvent(evt);

  var pElt = PM.Dom.parent(elt);
  while (pElt.tagName != "P" && pElt.tagName != "DIV") {
    pElt = PM.Dom.parent(pElt);
  }
  if (pElt.className.match("pm_focus")) {
    pElt.className = pElt.className.replace(new RegExp('pm_focus', 'g'), "");
  }

}


/**
 * textInput object with default text handler (Submit4G)
 */
PM.Forms.textInput = function(eltId, autoClearValue) {
  this.textElt = $(eltId);
  this.defaultText = this.textElt.value;

  this.clearValue = function() {
    if(this.defaultText == this.textElt.value) {
      this.textElt.value = "";
      this.textElt.style.color = "#000000";
    }

    return true;
  }

  if (autoClearValue && autoClearValue == true) {
    PM.Event.add(this.textElt, "focus", this.clearValue.bindObj(this));
  }

  // filling actionsBeforeSubmit array
  PM.Forms.registerAction(this.textElt.form, this.clearValue.bindObj(this));

}

/**
 * Register action to do before submit
 */
PM.Forms.registerAction = function(formElt, action) {
  formElt = $(formElt);

  // filling actionsBeforeSubmit array
  if (!formElt.actionsBeforeSubmit) {
    formElt.actionsBeforeSubmit = new Array();
  }
  formElt.actionsBeforeSubmit[formElt.actionsBeforeSubmit.length] = action;
}


/**
 * Pre submit form check
 */
PM.Forms.preSubmitCheck = function(formElt) {
  formElt = $(formElt);

  if (!formElt.actionsBeforeSubmit) return true;
  var result = true;
  for (i = 0; i < formElt.actionsBeforeSubmit.length && result; i++) {
    result = formElt.actionsBeforeSubmit[i].call() && result;
  }
  return result;
}


/**
 * @namespace Permet la r�organisation JavaScript d'�l�ments d'un formulaire <code>(Doc � revoir)</code>.
 */
PM.Forms.Ordering = {
  state: null,
  config: null,
  history:null
}

PM.Forms.Ordering.init = function(array_config, default_state) {
  PM.Forms.Ordering.init(array_config, null, default_state);
}


PM.Forms.Ordering.init = function(array_config, array_history, default_state) {
  PM.Forms.Ordering.state = default_state;
  PM.Forms.Ordering.config = array_config; //Map de liste (tableau) de divs
  PM.Forms.Ordering.history = array_history; //Map de liste (tableau) de states
}

PM.Forms.Ordering.change = function(state) {
  if (state != PM.Forms.Ordering.state) {
 
    // fold steps 
    PM.Forms.Steps.fold();
    
    // On supprime les anciens ordering history et les steps
    var history = eval("PM.Forms.Ordering.history."+PM.Forms.Ordering.state);
    if (history) {
      for (var i = 0; i < history.length; i++) {
        PM.History.removeEvent("PM.Forms.Ordering.change", history[i]);
      }
    }
    
    if(PM.History.historyList != null) {
      PM.History.removeEvent("PM.Forms.Steps.change",1, false);
      PM.History.removeEvent("PM.Forms.Steps.change",1, false);
      PM.History.removeEvent("PM.Forms.Steps.change",-1, false);
      PM.History.removeEvent("PM.Forms.Steps.change",-1, false);
    }

    PM.Forms.Ordering.state = state;
    //Passe sur tout les config et les ex�cute
    var conf = eval("PM.Forms.Ordering.config."+state);
    if (conf) {
      for (var i = 0; i < conf.length; i++) {
        var elt = $(conf[i][0]);
        if (conf[i][1] != null) {
          var beforeElt = $(conf[i][1]);
          PM.Dom.parent(elt).removeChild(elt);
          PM.Dom.parent(beforeElt).insertBefore(elt, beforeElt);
        }
        if (conf[i][2] != null) {
          if (conf[i][2] == true) {
            elt.style.display = "block";
          } else {
            elt.style.display = "none";
          }
        }
        if (conf[i][3]) {
          var eltLabels = elt.getElementsByTagName("label");
          var eltSpans = eltLabels[0].getElementsByTagName("span");
          eltSpans[0].innerHTML = conf[i][3];
        }
      }
    }

    //r�cup�re les history states du state demand�
    //si non null : boucler sur les state de la liste de history state et enregistrer "PM.Forms.Ordering.change"+state dans PM.History
    var history = eval("PM.Forms.Ordering.history."+state);
    if (history) {
      for (var i = 0; i < history.length; i++) {
        PM.History.registerEvent("PM.Forms.Ordering.change", history[i]);
      }
    }
    else { //Si on appelle PM.Forms.Ordering.init = function(array_config, default_state) et donc le array_history n'existe pas
      PM.History.registerEvent("PM.Forms.Ordering.change", state);
    }
  }
}


/**
 * @namespace Gestion Ajax et mise � jour des champs DIA <code>(Doc � revoir)</code>.
 */
PM.Forms.DIA = {};

PM.Forms.DIA.submit = function(evt) {
  var elt = PM.Util.getElementFromEvent(evt);

  var elts = PM.Util.collectionToArray(elt.form.getElementsByTagName("select"));
  // we fill parameters to send to the service
  var params = "";
  for (i = 0; i < elts.length; i++) {
    params += "&" + elts[i].name + "=" + elts[i].value;
  }

  PM.Ajax.request(this.url + params, PM.Forms.DIA.update, {method: PM.Ajax.GET, dependencyUrl: this.url});
}

PM.Forms.DIA.update = function(options) {
  eval("var res = " + options.XmlHttpObject.responseText);
  if (res) {
    for (var i = 0; i < res.length; i++) {
      // we get select element
      var elt = $(res[i].name);
      var eltCtner = $(res[i].name + "_ctner");
      if (elt) {
        // we delete all elements from the select before anything
        PM.Forms.clearOptions(elt, 1);
        elt.selectedIndex = 0;
        PM.Forms.showAndHideOtherField(res[i].name)

        // A select can have 3 types of behavior :
        //   - visible only if options > 0 (value for 'behavior' attribute : 10 ==> Default value)
        //   - always visible (value for 'behavior' attribute : 20)
        //   - hidden if 1 or 0 option (value for 'behavior' attribute : 30). In this case, the unique value is automatically selected

        // add the new elements into the select element
        var selectOptions = res[i].options;
        if (selectOptions && selectOptions.length > 0) { // if there is any option to display
          for (j = 0; j < selectOptions.length; j++) {
            PM.Forms.addOption(elt, selectOptions[j].value, selectOptions[j].key);

            // selected option
            if (res[i].selected && (res[i].selected == selectOptions[j].key))
              elt.selectedIndex = j + 1;
          }
          elt.disabled = false;
          // Show the container div or hide it
          if (elt.behavior == "30" && selectOptions.length == 1)
            eltCtner.style.display = "none";
          else
            eltCtner.style.display = "block";
        } else {
          elt.disabled = true;
          // Hide the container div if necessary
          if (elt.behavior != "20")
            eltCtner.style.display = "none";
        }
      }
    }

    PM.Forms.placeFormInputElements();
  }
}


/**
* @namespace G�re les boutons radio dans les formulaires.
*/
PM.Forms.Radio = {};

/**
 * D�selectionne tous les choix d'un bouton radio.
 *
 * @param inputName Name des inputs de choix du bouton radio.
 */
PM.Forms.Radio.unselect = function(inputName) {
  var options = document.getElementsByName(inputName);
  for (var i = 0; i < options.length; ++i) {
    options[i].checked = false;
  }
};

/**
* R�cup�re la valeur du choix s�lectionn� d'un bouton radio.
*
* @param inputName Name des inputs de choix du bouton radio.
*/
PM.Forms.Radio.getValue = function(inputName) {
  var value = null;
  var options = document.getElementsByName(inputName);
  for (var i = 0; i < options.length; ++i) {
    if (options[i].checked) {
      value = options[i].value;
      break;
    }
  }
  return value;
};

/**
* D�finit le choix s�lectionn� d'un bouton radio.
*
* @param inputName Name des inputs de choix du bouton radio.
*/
PM.Forms.Radio.setValue = function(inputName, value) {
  var options = document.getElementsByName(inputName);
  for (var i = 0; i < options.length; ++i) {
    if (options[i].value == value) {
      options[i].checked = true;
      break;
    }
  }
};

/**
* @namespace G�re les objets "select" dans les formulaires.
*/
PM.Forms.Select = {};

/**
* R�cup�re la valeur s�lectionn�e dans le select
*
* @param input identifiant ou objet dom de la dropdown select
*/
PM.Forms.Select.getValue = function(input) {
  var input = $(input);
  if (!input) return null;
  return input.value;
}

/**
 * D�finit s�lectionn�e dans la dropdown
 *
 * @param input identifiant ou objet dom de la dropdown select
 * @param value valeur � donner
 */
PM.Forms.Select.setValue = function(input, value) {
  var input = $(input);
  if (!input) return null;
  for(var i = 0; i < input.length; i++) {
    if(input[i].value == value)
      input.selectedIndex = i;
  }
}

/**
 * @namespace Transforme des boutons radio en s�lecteur d'�tat et g�re son fonctionnement <code>(Doc � revoir)</code>.
 */
PM.Forms.StateSelector = {
  titleDefault: null,

  selectedState: {},
  selectedSpan: {},

  selectorName: "state",

  // temporary displayed span (on mouseover)
  displayedSpan: null,

  values: new Array(),

  timer: -1,
  delay: 100,

  disabledState: -2 // useful to disable last state
};

/**
 * Initialisation des s�lecteurs (�tat ou �toiles).
 * Transforme les boutons radio en li avec m�canique JS de rollover.
 *
 * @param ctner_id Identifiant du conteneur
 * @param idSuffix Identifiant du suffixe (si plusieurs contr�les �tat/�toiles dans la page
 */
PM.Forms.StateSelector.init = function(ctner_id, idSuffix) {
  var suffix = idSuffix;
  var arrayOffset = suffix; // index o� il faut aller chercher les �l�ments dans le tableau (�tat s�lectionn�, span s�lectionn�)
  if(!suffix) {
    suffix = '';
    arrayOffset = 1230;
  }
  PM.Forms.StateSelector.selectedState[arrayOffset] = -1;

  // cibling form area
  var ctner = $(ctner_id);
  var state_divs = new Array();
  var assist_divs = new Array(); // assistance divs

  // looking for divs 'fld_full'
  var divs = ctner.getElementsByTagName("div");

  var parentCtnr = PM.Dom.parent(ctner);
  var ulElt = document.createElement('ul');
  PM.Forms.StateSelector.titleDefault = document.getElementById("fld_states_edito");

  var firstState = 0;
  var lastElementClass = ""; // special class when last element is disabled

  var count = 0;
  var lastEl = null;
  
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className.match("fld_full")) {
      // we get the "p" element
      var ps = divs[i].getElementsByTagName("p");

      for (var j = 0; j < ps.length; j++) {
        if (ps[j].className.match("fld_rdio")) {
          var spans = ps[j].getElementsByTagName("span");
          var state_label = (spans[0])?spans[0].innerHTML: "";

          inputs = ps[j].getElementsByTagName("input");

          PM.Forms.StateSelector.selectorName = inputs[0].name;

          if (count == 0) { // if starts with first element
            if (!inputs[0].id.match("_0")) {
              count++;
              firstState = 1;
            }
          }
          if (inputs[0].disabled) {
            lastElementClass = " fld_no_new";
            PM.Forms.StateSelector.disabledState = count;
          }
          PM.Forms.StateSelector.values[count] = inputs[0].value;

          is_displayed = true;
          if(inputs[0].checked) {
            PM.Forms.StateSelector.selectedState[arrayOffset] = count;
          } else {
            is_displayed = false;
          }
        }
      }

      // get the assistance div if any
      var assDivs = divs[i].getElementsByTagName("div");
      var hasAssist = false;
      for (var j = 0; j < assDivs.length; j++) {
        if (assDivs[j].className.match("assistance_ctner")) {
          assist_divs.push(assDivs[j]);
          hasAssist = true;
        }
      }

      var liElt = document.createElement('li');
      var liContent = "";
      liElt.className += " " + PM.Forms.StateSelector.selectorName + count;
      lastEl = liElt;
        
      // span
      var spanElt = document.createElement('span');
      spanElt.id = ctner_id + "_state_" + count;
      if (!is_displayed) spanElt.style.display = "none";
      spanElt.innerHTML = state_label;
      liElt.appendChild(spanElt);

      if (PM.Forms.StateSelector.selectedState[arrayOffset] == count) PM.Forms.StateSelector.selectedSpan[arrayOffset] = spanElt;

      PM.Event.add(liElt, "mouseover", PM.Forms.StateSelector.rollOver.bindObj([spanElt, count, ctner], arrayOffset));
      PM.Event.add(liElt, "mouseout", PM.Forms.StateSelector.rollOutWithTimer.bindObj(ctner, suffix, arrayOffset));
      if (hasAssist) {
        PM.Event.add(liElt, "mouseover", PM.Assistance.showOnOver.bindObj(assist_divs[assist_divs.length-1]));
        PM.Event.add(liElt, "mouseout", PM.Assistance.hideWithTimer.bindObj(assist_divs[assist_divs.length-1]));
        if (PM.Forms.StateSelector.disabledState != count)
          PM.Event.add(liElt, "click", PM.Assistance.showOnFocus.bindObj(assist_divs[assist_divs.length-1]));
      }
      PM.Event.add(liElt, "click", PM.Forms.StateSelector.select.bindObj([spanElt, count], suffix, arrayOffset));

      ulElt.appendChild(liElt);

      // appending div to divs array for later deletion
      state_divs.push(divs[i]);

      count++;
    }
  }

  // Display title default if no other title is displayed
  if(PM.Forms.StateSelector.titleDefault && PM.Forms.StateSelector.selectedSpan[arrayOffset]) PM.Forms.StateSelector.titleDefault.style.display = "none";

  //if (PM.Forms.StateSelector.selectedState[arrayOffset] > -1) PM.Forms.StateSelector.selectedState[arrayOffset] += firstState;

  ulElt.className = "fld_states" + lastElementClass;
  ctner.appendChild(ulElt);
  ctner.className = (PM.Forms.StateSelector.selectedState[arrayOffset] > -1)?"fld_states_ctner fld_state_"+PM.Forms.StateSelector.selectedState[arrayOffset]:"fld_states_ctner";

  // Add an additional class to the last list element
  if (lastEl != null) {
    lastEl.className += " last_element";
  }
    
  // hidden input field
  var hiddenElt = document.createElement('input');
  hiddenElt.type = "hidden";
  hiddenElt.name = PM.Forms.StateSelector.selectorName + suffix;
  hiddenElt.id = PM.Forms.StateSelector.selectorName + suffix;
  if (PM.Forms.StateSelector.selectedState[arrayOffset] == -1) {
    hiddenElt.value = "";
  } else {
    hiddenElt.value = PM.Forms.StateSelector.values[PM.Forms.StateSelector.selectedState[arrayOffset]];
  }
  ctner.appendChild(hiddenElt);

  // we delete the old divs
  for (var i = 0; i < state_divs.length; i++) {
    ctner.removeChild(state_divs[i]);
  }

  for (var i = 0; i < assist_divs.length; i++) {

    parentCtnr.appendChild(assist_divs[i]);
  }

  parentCtnr.className = parentCtnr.className + " fld_state_ctrl fld_" + firstState + "_" + (count-1) + "_states";

}

/**
 * Initialisation de la note s�lectionn�e (�toiles).
 *
 * @param ctner_id Identifiant du conteneur
 * @param state    Note choisie par l'utilisateur
 */
PM.Forms.StateSelector.initState = function(ctner_id, state) {
  var ctner = $(ctner_id);
  ctner.className = "fld_states_ctner fld_state_" + state;
  
  var ctner_child = $("fld_radio_ctner_state_" + state);
  ctner_child.style.display = "block";
  
  suffix = '';
  arrayOffset = 1230;

  //Permets de selectionner par defaut la note que l'on souhaite
  PM.Forms.StateSelector.select.call([ctner_child, state], suffix, arrayOffset);
}

PM.Forms.StateSelector.rollOver = function(arrayOffset) {
  var argum = this;

  if(PM.Forms.StateSelector.displayedSpan) {
    PM.Forms.StateSelector.displayedSpan.style.display = "none";
    PM.Forms.StateSelector.displayedSpan = null;
    clearTimeout(PM.Forms.StateSelector.timer);
    PM.Forms.StateSelector.timer = -1;
  }

  if(PM.Forms.StateSelector.selectedSpan[arrayOffset]) PM.Forms.StateSelector.selectedSpan[arrayOffset].style.display = "none";
  argum[2].className = "fld_states_ctner fld_state_"+argum[1];
  if (argum[0] != null) argum[0].style.display = "block";
  if(PM.Forms.StateSelector.titleDefault) PM.Forms.StateSelector.titleDefault.style.display = "none";

  PM.Forms.StateSelector.displayedSpan = argum[0];
}

PM.Forms.StateSelector.rollOut = function(arrayOffset) {
  if(PM.Forms.StateSelector.displayedSpan) {
    PM.Forms.StateSelector.displayedSpan.style.display = "none";
    PM.Forms.StateSelector.displayedSpan = null;
  }
  if(PM.Forms.StateSelector.selectedSpan[arrayOffset]) PM.Forms.StateSelector.selectedSpan[arrayOffset].style.display = "block";
  else if(PM.Forms.StateSelector.titleDefault) PM.Forms.StateSelector.titleDefault.style.display = "block";

  this.className = (PM.Forms.StateSelector.selectedState[arrayOffset] > -1)?"fld_states_ctner fld_state_"+PM.Forms.StateSelector.selectedState[arrayOffset]:"fld_states_ctner";
}

PM.Forms.StateSelector.rollOutWithTimer = function(offset, arrayOffset) {
  PM.Forms.StateSelector.timer = setTimeout(PM.Forms.StateSelector.rollOut.bindObj(this, arrayOffset),PM.Forms.StateSelector.delay);
}

PM.Forms.StateSelector.select = function(idSuffix, arrayOffset) {
  var argum = this;
  var suffix = idSuffix || '';
  if (!arrayOffset) arrayOffset = idSuffix;

  if (PM.Forms.StateSelector.disabledState != argum[1]) {
    PM.Forms.StateSelector.selectedSpan[arrayOffset] = argum[0];
    PM.Forms.StateSelector.selectedState[arrayOffset] = argum[1];

    if(PM.Forms.StateSelector.titleDefault) PM.Forms.StateSelector.titleDefault.style.display = "none";

    // updating hidden field
    var hiddenElt = $(PM.Forms.StateSelector.selectorName + suffix);
    if (PM.Forms.StateSelector.selectedState[arrayOffset] == -1) {
      hiddenElt.value = "";
    } else {
      hiddenElt.value = PM.Forms.StateSelector.values[PM.Forms.StateSelector.selectedState[arrayOffset]];
    }
  }
}

/**
 * Cette fonction permet de retourner le permier �l�ment visible dans Area, et sur lequel on peut faire un focus
 * @param area: l'�l�ment o� la recherche est faite
 */

PM.Forms.firstElement4Focus = function(area) {

    area = $(area);
    // R�cup�ration de toutes les divs
    var divBlk = area.getElementsByTagName("div");

    for (i = 0; i < divBlk.length; i++) {
    if(divBlk[i].style.display!="none" ){
      //R�cup�ration de tous les �l�ments de la div visible
      var elts = $(divBlk[i]).descendants();

        // Le premier �l�ment de type "select","textarea","input"  et visible est retourn�
        for (j = 0; j < elts.length; j++) {
          if(elts[j].match('select')||elts[j].match('textarea')||((elts[j].match('input'))&& (elts[j].type != 'hidden'))){
            if((elts[j].style.display!="none") && (!elts[j].disabled))
              return elts[j];
          }
        }
    }
    }

    // Aucun �l�ment sur lequel on peut faire un focus n'a �t� trouv�
    return null;

}


/**
 * @namespace Outil de v�rification des champs de formulaire <code>(Doc � revoir)</code>.
 */
PM.Forms.Check = {
  Type: {
    EMPTY: 0,
    DIFFERS: 1,
    MAXLENGTH: 2,
    MINLENGTH: 3,
    NO_SELECTION: 4,
    REGEXP: 5,
    FILE_EXTENSION: 6 //tableau d'extensions autoris�es en minuscules
  },

  RegExp: {
    URL: new RegExp("^(https?://)?"
    + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //user@
    + "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP- 199.194.52.184
    + "|" // allows either IP or domain
    + "([0-9a-z_!~*'()-]+\\.)*" // tertiary domain(s)- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // second level domain
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // port number- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$", 'i'),
    EMAIL: new RegExp("^[a-z0-9|_|+|-]+([\.]{1}[a-z0-9|_|+|-]+)*@[a-z0-9|_|+|-]+([\.]{1}[a-z0-9|_|+|-]+)+$", 'i')
  }
}

/**
 * Un objet PM.Forms.Check.XitiParam correspond � un indicateur de page avec le nombre de fois qu'il est appel�
 * 
 * @param xitiName       Le nom de l'indicateur de page xiti (f1, f2, ...)
 * @param xitiValue      La valeur de l'indicateur de page
 * @param numberOfCall   Le nombre de fois qu'il est appel�.
 */
PM.Forms.Check.XitiParam = function(xitiName, xitiValue) {
  this.xitiName = xitiName;
  this.xitiValue = xitiValue;
  this.numberOfCall = 1;
}

PM.Forms.Check.XitiParam.prototype.addCall = function() {
  this.numberOfCall++;
}

/**
 * D�finit dans les champs du formulaire les contraintes associ�es (maxlength)
 * @param {Objet}�  checks   Checks du formulaire
 * @param {String}� idSuffix Suffixe des identifiants de formulaire
 */
PM.Forms.Check.setConstraints = function(checks, idSuffix) {
  var suffix = idSuffix;
  if(!suffix)
    suffix = '';

  for (key in checks.fields) {
    var check = checks.fields[key];
    key += suffix;

    for (i = 0; i < check.length; ++i) {
      switch (check[i].type) {
        case PM.Forms.Check.Type.MAXLENGTH:
          var input = $(key);
            switch (input.tagName.toLowerCase()) {
              case 'input':
                input.setAttribute('maxLength', check[i].value); // attention � la casse pour cet attribut sous IE
                break;
              case 'textarea':
                PM.Event.add(input, "keyup", PM.Util.checkMaxInput.bindObj(null, input, check[i].value));
                PM.Event.add(input, "keydown", PM.Util.checkMaxInput.bindObj(null, input, check[i].value));
                break;
              default:
                // rien
            }
          break;
        default:
          // rien
      }
    }
  }
}

/**
 * Outil de contr�le de formulaire
 */
PM.Forms.Check.perform = function() {
  var checks = this.checks.fields;
  var suffix = this.idSuffix;
  if(!suffix)
    suffix = '';

  var errorLines = new Array();
  var globalError = false;
  var xitiErrors = {};
  
  for (key in checks) { // boucle sur les champs � tester
    var hasNotifyError = false;
    var check = checks[key];

    // si le param�tre suffixes est d�fini, alors on effectue une boucle sur tous les suffixes
    var suffixes = this.suffixes;
    // TODO c'est un peu moche de se baser sur le premier check. Remonter le suffixable si possible
    if (typeof (this.suffixes) == "undefined" || typeof(check[0].suffixable) == "undefined" || check[0].suffixable == false) {
      suffixes = [suffix];
    }

    for (var n = 0 ; n < suffixes.length ; n++) { // on parcourt tous les suffixes
      var hasError = false;
      keyTmp = key + suffixes[n];
      for (i = 0; i < check.length && !hasError; i++) { // erreurs sur un champ sp�cifique
        var errorStr = check[i].error;

        // remplacement des mots sp�cifiques de la chaine de caract�re
        if (this.replaceStr) {
          for (kw in this.replaceStr) { // boucle sur les mots � remplacer
            errorStr = PM.Util.variableReplace(errorStr, kw, this.replaceStr[kw]);
          }
        }

        switch(check[i].type) {

          case PM.Forms.Check.Type.DIFFERS:
            if ($(keyTmp).value.match(new RegExp(check[i].value, 'g'))) {
              var tmpError = PM.Forms.Check.showError(keyTmp, errorStr);
              if(hasError == false) {
                if(! hasNotifyError) {
                  errorLines[errorLines.length] = tmpError;
                  hasNotifyError = true;
                }
                hasError = true;
              }
            }
            break;
          case PM.Forms.Check.Type.MAXLENGTH:
            if ($(keyTmp).value.length > check[i].value) {
              var tmpError = PM.Forms.Check.showError(keyTmp, PM.Util.variableReplace(PM.Util.variableReplace(errorStr, "toomany", $(keyTmp).value.length - check[i].value), "max", check[i].value));
              if(hasError == false) {
                if(! hasNotifyError) {
                  errorLines[errorLines.length] = tmpError;
                  hasNotifyError = true;
                }
                hasError = true;
              }
            }
            break;
          case PM.Forms.Check.Type.MINLENGTH:
            if ($(keyTmp).value.length < check[i].value) {
              var tmpError = PM.Forms.Check.showError(keyTmp, PM.Util.variableReplace(PM.Util.variableReplace(errorStr, "missing", check[i].value - $(keyTmp).value.length), "min", check[i].value));
              if(hasError == false) {
                if(! hasNotifyError) {
                  errorLines[errorLines.length] = tmpError;
                  hasNotifyError = true;
                }
                hasError = true;
              }
            }
            break;
          case PM.Forms.Check.Type.NO_SELECTION:
            var tab = document.getElementsByName(keyTmp);
            var hasCheck = (tab.length == 0);
            for (var j = 0; j < tab.length; ++j) {
              hasCheck = hasCheck || tab[j].checked;
            }
            if(!hasCheck) {
              var tmpError = PM.Forms.Check.showError(keyTmp, errorStr);
              if(hasError == false) {
                if(! hasNotifyError) {
                  errorLines[errorLines.length] = tmpError;
                  hasNotifyError = true;
                }
                hasError = true;
              }
            }
            break;
          case PM.Forms.Check.Type.REGEXP:
              var regExp = check[i].value;
              if ($(keyTmp).value != "" && ! regExp.test($(keyTmp).value)) {
                var tmpError = PM.Forms.Check.showError(keyTmp, errorStr);
                if(hasError == false) {
                  if(! hasNotifyError) {
                    errorLines[errorLines.length] = tmpError;
                    hasNotifyError = true;
                  }
                  hasError = true;
                }
              }
              break;
          case PM.Forms.Check.Type.FILE_EXTENSION:
              var ext = $(keyTmp).value;
              if (ext.indexOf('.') == -1) {
                  ext = "";
              } else {
                  ext = ext.substr(ext.lastIndexOf('.') + 1, ext.length);
              }
              if (check[i].value.contains(ext.toLowerCase()) === false) {
                var tmpError = PM.Forms.Check.showError(keyTmp, errorStr);
                if (hasError == false) {
                  if (! hasNotifyError) {
                    errorLines[errorLines.length] = tmpError;
                    hasNotifyError = true;
                  }
                  hasError = true;
                }
              }
              break;
          case PM.Forms.Check.Type.EMPTY:
          default:
            if ($(keyTmp).value == "" || $(keyTmp).value == check[i].value) {
              var tmpError = PM.Forms.Check.showError(keyTmp, errorStr);
              if(hasError == false) {
                if(! hasNotifyError) {
                  errorLines[errorLines.length] = tmpError;
                  hasNotifyError = true;
                }
                hasError = true;
              }
            }
            break;
        }
        if (this.xiti && hasError) { 
          // Ajout ou incr�mentation de nombre d'appels de l'indicateur de page et ajout de celui-ci � xitiErrors
          var xitiParamIndex = check[i].xitiName + '_' + check[i].xitiValue;
          var xitiParam = PM.Util.getOption(xitiErrors, xitiParamIndex, null);
          if(xitiParam == null) {
            xitiParam = new PM.Forms.Check.XitiParam(check[i].xitiName, check[i].xitiValue);
          }
          else {
            xitiParam.addCall();
          }
          PM.Util.setOption(xitiErrors, xitiParamIndex, xitiParam, true);
        }
      }

      if (!hasError) {
        PM.Forms.Check.hideError(keyTmp);
      } else {
        globalError = true;
      }
    }

  }

  if (globalError) {
    var errorNotice = PM.Forms.Check.computeGlobalMessage(this.checks.globalErrorMessage, errorLines);
    PM.Notice.show(this.noticeCtner, PM.Notice.Type.ERROR, errorNotice);

    // Ajout des indicateurs de page � la variable globale xiti 
    for(keyXiti in xitiErrors) {
      var tmpXiti = xitiErrors[keyXiti];
      this.xiti.append(tmpXiti.xitiName, PM.Util.variableReplace(tmpXiti.xitiValue, "nbError", tmpXiti.numberOfCall));
    }
    return false;
  } else {
    PM.Notice.hide(this.noticeCtner);
  }

  return true;
}

PM.Forms.Check.hideError = function(fieldId) {
  var errorElt = $(fieldId + "_error")
  if(errorElt) {
    errorElt.style.display = "none";
    var ctner = PM.Dom.parent(errorElt);
    if (ctner.className.match("pm_error")) {
      ctner.className = ctner.className.replace(/ ?pm_error/, "");
    }
  }
}

PM.Forms.Check.showError = function(fieldId, error) {
  var line = null;
  if (error) {
    line = error;

    var errorElt = $(fieldId + "_error");
    if (errorElt) {
      var ctner = PM.Dom.parent(errorElt);
      if (!ctner.className.match("pm_error"))
        ctner.className += " " + "pm_error";
      errorElt.innerHTML = error;
      errorElt.style.display = "";
    }
  }

  return line;
}

PM.Forms.Check.computeGlobalMessage = function(headline, lines) {
  var hasHeadline = typeof(headline) != "undefined";
  var globalMessage = hasHeadline ? headline : "";
  var hasLinesNotNull = false;
  
  if(lines.length > 0) {
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] != null) {
        hasLinesNotNull = true;
      }
    }
    if (hasLinesNotNull) {
      if (hasHeadline || lines.length > 1) globalMessage += "<ul>";
      for (var i = 0; i < lines.length; i++) {
        if (lines[i] != null) {
          if (!hasHeadline && lines.length == 1) {
            globalMessage += lines[i]; // si pas d'en-t�te et une seule erreur, on ne met pas de <ul><li>
          } else {
            globalMessage += "<li>" + lines[i] + "</li>";
          }
        }
      }
      if (hasHeadline || lines.length > 1) globalMessage += "</ul>";
    }
  }
  return globalMessage;
}

/**
 * @namespace TODO Faire la doc
 */
PM.Forms.Ref = {};


PM.Forms.Ref.callBackVente = function(options) {
  eval("var res = " + options.responseText);
  var majOldDiv = $('major_error');
  var simOldDiv = $('simple_error');
  var parent = $('error_ctner');

  if(res.message){
    if(simOldDiv != null){
      parent.removeChild(simOldDiv);
    }
    if(majOldDiv != null){
      parent.removeChild(majOldDiv);
    }
    var error = PM.Dom.createElement('div',{className : 'error notification', id : 'major_error'});
    parent.appendChild(error);
    $('major_error').innerHTML = res.message ;
  }
  else {
    if(majOldDiv != null){
      parent.removeChild(majOldDiv);
    }
  }

}

PM.Forms.Ref.callAjaxService = function(controlName, manufacturerControlName, prdTypeCode){
  var ref = $(controlName).value ;
  var fabricant = $(manufacturerControlName).options[$(manufacturerControlName).selectedIndex].value;
  var params = "action=searchbymanid&man_id=" + ref + "&man_key=" + fabricant + "&prd_type_code=" + prdTypeCode ;
  if(ref != "" && fabricant != ""){
    PM.Ajax.request('submit?',PM.Forms.Ref.callBackVente,{method: PM.Ajax.POST, urlParams : params});
  }
}

PM.Forms.Ref.registerReferenceControl = function(controlName, manufacturerControlName){
  refControls.push({controlName : controlName, manufacturerControlName : manufacturerControlName })
}



/**
 * Autorise l'ajout d'une nouvelle ligne dans un conteneur via un bouton ou le focus sur la derni�re ligne
 *
 * @class Objet qui permet de cr�er de nouvelles lignes dans un formulaire
 * @constructor
 *
 * @param template {id|DOM Element} Template de ligne HTML avec {{id}} qui sera remplac� par le num�ro de ligne
 * @param ctner {id|DOM Element}    Conteneur de lignes o� ajouter les nouvelles
 * @param button {JSON Object}      Objet JSON d�crivant le bouton d'ajout de ligne
 * <ul>
 * <li><code><b>html</b></code> : contenu HTML du bouton.</li>
 * <li><code><b>refElt</b></code> : �l�ment de r�f�rence par rapport auquel placer le bouton</li>
 * <li><code><b>after</b></code> (false) : si le bouton doit �tre plac� avant l'�l�ment de r�f�rence (false) ou apr�s (true)</li>
 * </ul>
 * @param options {JSON Object}     Options facultatives
 * <ul>
 * <li><code><b>maxLines</b> (illimit�)</code> : Nombre de lignes maximum.</li>
 * <li><code><b>autoAddOnLastLineFocus</b> (false)</code> : Quand d�fini � true, active l'ajout automatique d'une nouvelle ligne lorsque le focus est mis sur la derni�re ligne.</li>
 * <li><code><b>afterFinish</b></code> (null) : Fonction de callback � appeler apr�s l'ajout d'une ligne</li>
 * </ul>
 */
PM.Forms.LinesMaker = function(template, ctner, button, options) {
  this.template = $(template).innerHTML; // template
  this.ctner = $(ctner); // conteneur de lignes
  this.nbLines = 0; // nombre de lignes

  this.maxLines = PM.Util.getOption(options, "maxLines", false); // nombre de lignes maxi. Par d�faut, false = d�sactiv�
  this.autoAddOnLastLineFocus = PM.Util.getOption(options, "autoAddOnLastLineFocus", false); // ajout automatique d'une ligne au focus sur la derni�re ligne
  this.afterFinish = PM.Util.getOption(options, "afterFinish", null);

  // comptage du nombre de lignes d�j� pr�sentes dans le conteneur
  var ctnerChilds = this.ctner.childNodes;
  for (i = 0; i < ctnerChilds.length; i++) {
    if (ctnerChilds[i].nodeType == 1) { // seuls les noeuds de type 1 contiennent du html
      ctnerChilds[i].lineNb = this.nbLines;
      this.nbLines++;
    }
  }

  // cr�ation et affichage du bouton
  if (this.canAddLine()) {
    var clickId = "add_line_btn";
    this.button = PM.Dom.createElement("div", {id: "add_line"});
    if(!button.html.match(clickId)) {
      // Si la zone cliquable n'est pas d�termin�, c'est la ligne enti�re qui devient cliquable.
      clickId = "add_line";
    }
    this.button.innerHTML = button.html;
    PM.Dom.parent($(button.refElt)).insertBefore(this.button, button.after? PM.Dom.nextObject($(button.refElt)) : $(button.refElt));
    PM.Event.add($(clickId), "click", this.addLine.bindObj(this), true);
  }

  this.manageAutoLineEvents(); // ajout des �v�nements d'auto-ajout de ligne

}

/**
 * V�rifie que l'on peut encore ajouter une ou plusieurs lignes
 */
PM.Forms.LinesMaker.prototype.canAddLine = function() {
  return (!this.maxLines || this.nbLines < this.maxLines);
}

/**
 * Ajoute une nouvelle ligne au conteneur
 */
PM.Forms.LinesMaker.prototype.addLine = function() {
  if (this.canAddLine()) {
    var newLine = this.template;
    // tambouille pour pouvoir ajouter la nouvelle ligne en DOM et non via innerHTML
    // car l'ajout via innerHTML fait perdre le focus
    var tmpDiv = PM.Dom.createElement("div");
    tmpDiv.innerHTML = PM.Util.variableReplace(newLine, "id", this.nbLines);

    newLine = tmpDiv.firstChild;
    while (newLine.nodeType != 1 && typeof(newLine) != "undefined") {
      newLine = PM.Dom.nextObject(newLine);
    }

    this.ctner.appendChild(newLine);
    this.nbLines++;

    // on teste si le nombre de lignes max n'est pas atteint, sinon on d�sactive l'ajout d'une nouvelle ligne
    if (!this.canAddLine() && typeof(this.button) != "undefined") {
      this.button.style.display = "none";
    }

    this.manageAutoLineEvents();
    // appel de la fonction de callback si elle existe
    if (this.afterFinish) this.afterFinish.apply(null, [newLine]);

  }
}

/**
 * Ajoute automatiquement une nouvelle ligne si l'�l�ment pass� en param�tre est la derni�re ligne
 * @ignore
 *
 * @param line  Ligne concern�e
 */
PM.Forms.LinesMaker.prototype.autoAddIfLastLine = function(line) {
  if (line.lineNb == this.nbLines - 1) {
    this.addLine();
  }
}

/**
 * Ajoute les �v�nements qu'il faut sur les champs input pour g�rer l'ajout automatique d'une nouvelle ligne au focus sur la derni�re
 * @ignore
 *
 * @param line  Ligne sur laquelle ajouter les �v�nements
 */
PM.Forms.LinesMaker.prototype.manageAutoLineEvents = function() {
  if (this.autoAddOnLastLineFocus) { // si l'auto-ajout de ligne au focus sur la derni�re ligne est activ�
    var lastLine = this.ctner.childNodes[this.ctner.childNodes.length - 1];
    while (lastLine.nodeType != 1 && typeof (lastLine) != "undefined") {
      lastLine = PM.Dom.previousObject(lastLine);
    }

    lastLine.lineNb = this.nbLines - 1;

    var inputs = $j("input", lastLine);
    for (j = 0; j < inputs.length; j++) {
      PM.Event.add(inputs[j], "focus", this.autoAddIfLastLine.bindObj(this, lastLine));
    }
  }
}

/**
 * Cr�e un nouvel objet input ayant comme valeur par d�faut son label
 *
 * @class Objet permettant de remplir automatiquement un champ texte � partir de son label.
 * @constructor
 *
 * @param elt �l�ment � remplir
 */
PM.Forms.AutoFill = function(elt,ieHackChclemup) {
  this.elt = $(elt);
  PM.Forms.AutoFill.allInputs[PM.Forms.AutoFill.allInputs.length] = this;

  // on r�cup�re le label li�.
  // Attention, chaque input doit �tre dans un conteneur.
  // Il ne faut pas 2 inputs dans un m�me conteneur, sinon seul le premier label sera utilis� (attention le label doit �tre dans un span"
  var labels = PM.Dom.parent(elt).getElementsByTagName("label");
  if (labels.length > 0) { // s'il y a un label, on agit, sinon on sort
    this.defaultValue = labels[0].childNodes[0].innerHTML;
  } else return;

  if (this.elt.value == "" || this.elt.value == this.defaultValue) { // si le champ est vide ou vaut la valeur par d�faut
    PM.Dom.Class.remove(this.elt, "pm_value"); // couleur grise
    this.elt.value = this.defaultValue;
  }
  else {
    PM.Dom.Class.add(this.elt, "pm_value"); // couleur noir
  }

  // ajout des �v�nements au focus, etc...
  PM.Event.add(this.elt, "focus", this.clearValue.bindObj(this, ieHackChclemup));
  PM.Event.add(this.elt, "blur", this.refillValue.bindObj(this));
}

PM.Forms.AutoFill.allInputs = new Array();

/**
 * Efface la valeur du champ
 * 
 * @param forceFocus Force le focus sur le champ (r�sout un bug ie)
 * 
 * @ignore
 */
PM.Forms.AutoFill.prototype.clearValue = function(forceFocus) {
  if (this.elt.value == this.defaultValue) {
    this.elt.value = "";
    PM.Dom.Class.add(this.elt, "pm_value"); // couleur noir
    
    if (ie && typeof(forceFocus) != "undefined" && forceFocus) { // corrige un bug ie en for�ant le curseur dans le champ
      var textRange = this.elt.createTextRange();
      textRange.select();
    }
  }
}

/**
 * Efface les valeurs par defaut des champs
 * @ignore
 */
PM.Forms.AutoFill.clearAll = function() {
  for (var i = 0; i < PM.Forms.AutoFill.allInputs.length; i++) {
    PM.Forms.AutoFill.allInputs[i].clearValue();
  }
}

/**
 * Reremplit le champ avec la valeur par d�faut s'il est vide
 * @ignore
 */
PM.Forms.AutoFill.prototype.refillValue = function() {
  if (this.elt.value == "" || this.elt.value == this.defaultValue) {
    PM.Dom.Class.remove(this.elt, "pm_value"); // couleur grise
    this.elt.value = this.defaultValue;
  }
}

/**
 * Reremplit les champs avec la valeur par d�faut s'il est vide
 * @ignore
 */
PM.Forms.AutoFill.refillAll = function() {
  for (var i = 0; i < PM.Forms.AutoFill.allInputs.length; i++) {
    PM.Forms.AutoFill.allInputs[i].refillValue();
  }
}

/**
 * Initialise les �l�ments AutoFill
 *
 * @param ctner      Conteneur avec des inputs
 * @param fillClass  Nom de la classe � prendre en compte pour
 */
PM.Forms.AutoFill.init = function(ctner, fillClass,ieHackChclemup) {
  var fields = $j("input." + fillClass, $(ctner));
  if(ieHackChclemup == null)ieHackChclemup =  true;
     
  for (var i = 0; i < fields.length; i++) {
    new PM.Forms.AutoFill(fields[i],ieHackChclemup);
  }
}

/**
 * Efface les valeurs des champs
 *
 * @param ctner      Conteneur avec des inputs
 * @param fillClass  Nom de la classe � prendre en compte pour
 */
PM.Forms.AutoFill.clearAllDefaultValue = function(ctner, fillClass) {
  var fields = $j("input." + fillClass, $(ctner));

  for (var i = 0; i < fields.length; i++) {
  eltToClear = $(fields[i]);

    var labels = PM.Dom.parent(elt).getElementsByTagName("label");
    if (labels.length > 0) { // s'il y a un label, on agit, sinon on sort
      this.defaultValue = labels[0].innerHTML;
      if (eltToClear.value == this.defaultValue) {
        eltToClear.value = "";
        PM.Dom.Class.add(this.elt, "pm_value"); // couleur noir
      }
    }
  }
}

/**
 * Permet de g�rer un champ texte avec autoFill et un focus par d�faut.
 * @param elt est l'id du champ texte.
 */
PM.Forms.autoFillWithFocus = function(elt) {
  var autoFillWithFocus = this;
  this.autofillSearch = null;
  var textBox = $j("#" + elt);
  var firstFocus = true;  // Indique si c'est le premier focus sur le champ.
  var msg = textBox.val();

  // Si le navigateur n'est pas ie, met le curseur au d�but du champ au premier focus.
  PM.Event.add(textBox, "focus", function() {
    if (! ie && firstFocus) {
      $(elt).setSelectionRange(0,0);
    }
  });
  
  // Ajout du focus au champ.
  PM.Event.add(window, "load", function() {
    textBox.focus();
  });
  
  // Couleur grise.
  textBox.css({color: "#999999"});

  // Assigne au champ l'action AutoFill d�finit par d�faut et d�lie les handlers.
  var afterFirstFocus = function() {
    textBox.css("color", "");                           
    textBox.unbind("keyup", keyUpHandler);
    textBox.unbind ("blur", blurHandler);
    textBox.unbind ("click", clickHandler);
    autoFillWithFocus.autofillSearch = new PM.Forms.AutoFill(elt);
    firstFocus = false;
  }
  
  // L'utilisateur commence � �crire dans le champ.
  var keyUpHandler = function() {
    // Efface le message par d�faut du champ (ou la recherche de l'utilisateur apr�s un refresh sur firefox).
    lastCharPos = textBox.val().length - msg.length;
    this.value = textBox.val().substring(0, lastCharPos);
    afterFirstFocus.call(null);
  };
  textBox.bind ("keyup", keyUpHandler);
  
  // L'utilisateur commence par un blur, pas besoin des handlers.
  var blurHandler = function() {
    afterFirstFocus.call(null);
  }
  textBox.bind ("blur", blurHandler);
  
  // L'utilisateur commence par un click, pas besoin des handlers.
  var clickHandler = function() {
    afterFirstFocus.call(null);
    autoFillWithFocus.autofillSearch.clearValue();
  }
  textBox.bind ("click", clickHandler);
}

/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

/**
 * <font style="color: red">Fonction d�pr�ci�e</font>
 * @see PM.Forms.clearOptions
 * @deprecated <font style="color: red">Cette fonction ne doit plus �tre utilis�e !</font>
 */
function clearOptions(ThisOne) {
  PM.Statistics.deprecatedFunctions("clearOptions");
  return PM.Forms.clearOptions(ThisOne);
}

/* END : Kept for backward compatibility */


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                       PM.Tree
------------------------------------------------------------------------------*/
/**
 * @namespace Affichage en forme d'arbre (utilis� par FAQ - contact) <code>(Doc � revoir)</code>.
 */
PM.Tree = {
  sections: Array(),
  highlightColors: ["#f4f4ff","#f4f4ff"]
}

/**
 * Collapse/Expand tree section
 *
 * @param id  id of the div to collapse/expand
 *
 * @base PM.Tree
 */
PM.Tree.swapSection = function(id) {
  if(!PM.Tree.sections[id]) {
    PM.Tree.sections[id] = true;
    if($(id+'_content').style.display == 'none') {
      PM.UI.Effect.slideDown(id+'_content', {duration: 300, callback: function() { PM.Tree.sections[id] = false; }} );
      $(id+'_link').className = "minus";
    } else {
      PM.UI.Effect.slideUp(id+'_content', {duration: 300, callback: function() { PM.Tree.sections[id] = false; }} );
      $(id+'_link').className = "plus";
    }
  }
  return false;
}

/**
 * (Un)highlight tree element and its parents
 *
 * @param elt    Element to highlight
 * @param depth  tree depth
 * @param state  true = highlight, false = unhighlight
 */
PM.Tree.highlightPath = function(elt, depth, state) {
  state? elt.style.backgroundColor = PM.Tree.highlightColors[1]: elt.style.background = "none";
  var eltParent = elt.parentNode;
  while(eltParent.tagName == "DL" || eltParent.tagName == "DD" || eltParent.tagName == "DT") {
    if(eltParent.tagName == "DT") {
      state? eltParent.style.backgroundColor = PM.Tree.highlightColors[0]: eltParent.style.background = "none";
    }
    if(eltParent.tagName == "DD")
      eltParent = eltParent.previousSibling;
    else
      eltParent = eltParent.parentNode;
  }
}

PM.Tree.parse = function(node, level) {
  if (node) {
    if(node.tagName == "DT") {
      PM.Event.add(node, 'mouseover', function() { PM.Tree.highlightPath(node, level, true) });
      PM.Event.add(node, 'mouseout', function() { PM.Tree.highlightPath(node, level, false) });
    }
    PM.Tree.parse(node.nextSibling, level);
    PM.Tree.parse(node.firstChild, level+0.5);
  }
}

PM.Tree.init = function(dl_id) {
  var helptree = $('helptree');
  PM.Tree.parse(helptree.firstChild, 0);
}



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                  PM.ExpandTree
------------------------------------------------------------------------------*/
/**
 * @namespace Affichage en mode arbre g�n�rique (contrairement � PM.Tree). Utilis� sur Q&A
 */
PM.ExpandTree = {}
/**
 * Cr�e un objet de type <code>PM.ExpandTree.Element</code>.
 * Objet utilis� pour l'ouverture et la fermeture d'un �l�ment
 *
 * @ignore
 *
 * @param {DOM Object} treeElt El�ment englobant le contenu � d�plier
 * @param {DOM Object} sensitiveElt El�ment qui doit r�agir
 * @param {DOM Object} targetElt El�ment � ouvrir ou fermer
 * @param {JSON Object} options Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * Voir {@link PM.ExpandTree.init} pour les options
 */
PM.ExpandTree.Element = function(treeElt, sensitiveElt, targetElt, options) {
  this.options = options;
  //On r�cup�re les options
  if (!this.options) this.options = {};

  this.targetElt = targetElt;

  //Permet de savoir si l'arbre est en train de s'ouvrir ou non pour emp�cher une fermeture/ouverture pr�matur�e
  this.isSwapping = false;

  this.elt = $j(sensitiveElt, treeElt)[0];
  if (typeof(this.options.handleClick) == "undefined" || this.options.handleClick) { // il est possible de g�rer les clics soi-m�me (et non de mani�re automatique)
    PM.Event.add(this.elt, "click", this.swap.bindObjWithEvent(this, this.elt));
  }

  this.preventDefaultSelectors  =  !this.options.preventDefaultSelectors ? null : this.options.preventDefaultSelectors;
  this.insensibleSelectors    =   !this.options.insensibleSelectors ? null : this.options.insensibleSelectors;
  //Options utiles pour la modification du contenu HTML dans l'�l�ment innerHTMLSelector
  this.innerHTMLSelector       =   !this.options.innerHTMLSelector ? null : this.options.innerHTMLSelector;
  this.newInnerHTML         =   !this.options.newInnerHTML ? null : this.options.newInnerHTML;
  //Options utiles pour le rollover sous ie6
  this.rollOverIE6Selectors     =   !this.options.rollOverIE6Selectors ? null : this.options.rollOverIE6Selectors;
  //Fonction de callback
  this.callBackFct         =   !this.options.callBackFct ? null : this.options.callBackFct;

  //On applique les prevent default
  if(this.preventDefaultSelectors != null) {
    for(var i=0; i<this.preventDefaultSelectors.length; i++) {
      preventDefaultElement = $j(this.preventDefaultSelectors[i], treeElt)[0];
      PM.Event.add(preventDefaultElement, "click", function(e) { PM.Util.preventDefault(e); });
    }
  }
  this.insensibleElements = new Array();
  this.indiceInsensibleElements = 0;

  if(this.insensibleSelectors != null) {
    //On remplit le tableau avec les �l�ments qui ne doivent pas r�agir
    for(var i=0; i<this.insensibleSelectors.length; i++) {
      this.insensibleElementsTab = $j(this.insensibleSelectors[i], treeElt);
      //On applique le prevent default sur l'ensemble des �l�ments insensibles
      for(var j=0; j<this.insensibleElementsTab.length; j++) {
        this.insensibleElements[this.indiceInsensibleElements] = this.insensibleElementsTab[j];
        this.indiceInsensibleElements ++;
      }
    }
  }

  //On r�cup�re le contenu HTML initial pour pouvoir le restaurer
  if(this.innerHTMLSelector != null) {
    this.innerHTMLToChange = $j(this.innerHTMLSelector,this.elt)[0];
    this.initContent = this.innerHTMLToChange.innerHTML;
  }

    //Si c'est IE6 on ajoute le rollover
    if(ie6 && this.rollOverIE6Selectors != null) {
      for(var i=0; i<this.rollOverIE6Selectors.length; i++) {
        targetToModify = $j(this.rollOverIE6Selectors[i], treeElt)[0];
        PM.Event.add(targetToModify, "mouseover", this.rollOver.bindObj(this, targetToModify));
           PM.Event.add(targetToModify, "mouseout", this.rollOut.bindObj(this, targetToModify));
      }
    }
}

/**
 * Ouvre/Ferme une section de l'arbre
 * @ignore
 *
 * @param {DOM Object} evt Ev�nement du click
 * @param {DOM Object} elt El�ment r�actif au trigger
 */
PM.ExpandTree.Element.prototype.swap = function(evt, elt) {
   //Permet de d�sactiver le swap dans le cas o� on clique sur un �l�ment insensible
   activeSwap = true;

   //On regarde si on a cliqu� sur un �l�ment insensible
   for(var i=0; i<this.insensibleElements.length && activeSwap; i++){
     if(PM.Dom.withinElement(PM.Util.getElementFromEvent(evt), this.insensibleElements[i]))
        activeSwap = false;
   }
   if(activeSwap && !this.isSwapping) {
     this.isSwapping = true;

     targetToExpand = $j(this.targetElt, PM.Dom.parent(elt))[0];

     // Fonction ex�cut�e � la fin de l'effet de repliage
     var /** @ignore **/afterFinishCollapse = function() {
       //Fermeture de l'arbre
       PM.Dom.Class.replace(PM.Dom.parent(elt), "expanded", "collapsed");
       //Modification du contenu innerHTML de la classe contentClassName
       if(this.initContent != null && this.innerHTMLSelector != null){
         this.innerHTMLToChange.innerHTML  = this.initContent;
       }
       this.isSwapping = false;
       PM.Event.eventReached(PM.Event.Type.REDRAW);
       //CallBack
       if(this.callBackFct != null)  this.callBackFct(false);
     }

     // Fonction ex�cut�e � la fin de l'effet expansion
     var /** @ignore **/afterFinishExpand = function() {
       this.isSwapping = false;
       PM.Event.eventReached(PM.Event.Type.REDRAW);
       //CallBack
       if(this.callBackFct != null)  this.callBackFct(true);
     }

     if(targetToExpand.style.display == 'none'){
       //Modification du contenu innerHTML de la classe contentClassName
       if(this.newInnerHTML != null && this.innerHTMLSelector != null){
         this.innerHTMLToChange.innerHTML  = this.newInnerHTML;
       }
       PM.Dom.Class.replace(PM.Dom.parent(elt), "collapsed", "expanded");
       //D�pliage avec un effet
       PM.UI.Effect.slideDown(targetToExpand, {duration: 500, callback: afterFinishExpand.bindObj(this), afterEachStep: PM.Event.eventReached.bindObj(null, PM.Event.Type.REDRAW) } );
     }
     else {
       //Repliage avec un effet
       PM.UI.Effect.slideUp(targetToExpand, {duration: 500, callback: afterFinishCollapse.bindObj(this), afterEachStep: PM.Event.eventReached.bindObj(null, PM.Event.Type.REDRAW) } );
     }
   }
}

/**
 * Applique le mouseover sur les �l�ments r�actifs (Pour IE6)
 *
 * @param {DOM Object} elt El�ment r�actif
 *
 * @ignore
 */
PM.ExpandTree.Element.prototype.rollOver = function(elt) {
  PM.Dom.Class.add(elt, "pm_hover");
}

/**
 * Applique le mouseout sur les �l�ments r�actifs (Pour IE6)
 *
 * @param {DOM Object} elt El�ment r�actif
 *
 * @ignore
 */
PM.ExpandTree.Element.prototype.rollOut = function(elt) {
  PM.Dom.Class.remove(elt, "pm_hover");
}

/**
 * Initialise les �l�ments de l'arbre
 *
 * @param {DOM Object} containingDiv Div englobant
 * @param {DOM Object} containingElt El�ment englobant le contenu � d�plier
 * @param {DOM Object} sensitiveElt El�ment qui doit r�agir
 * @param {DOM Object} targetElt El�ment � ouvrir ou fermer
 * @param {JSON Object} options Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * <ul>
 * <li><code><b>innerHTMLSelector</b> (undefined)</code> : El�ment contenant le contenu HTML � modifier.</li>
 * <li><code><b>newInnerHTML</b> (undefined )</code> : Nouveau contenu pour le remplacement.</li>
 * <li><code><b>preventDefaultSelectors</b> (undefined)</code> : Tableau d'�l�ments auxquels doivent s'appliquer le prevent Default  .</li>
 * <li><code><b>insensibleSelectors</b> (undefined )</code> : Tableau d'�l�ments devant �tre insensible � l'ouverture/fermeture de l'arbre.</li>
 * <li><code><b>rollOverIE6Selectors</b> (undefined)</code> : Tableau d'�l�ments devant �tre surcharg�s pour le rollOver sous IE6.</li>
 * <li><code><b>callBackFct</b> (undefined)</code> : Fonction de callback.</li>
 * <li><code><b>handleClick</b> (true)</code> : Pour g�rer soi-m�me les clics, mettre � false.</li>
 * </ul>
 *
 * @return les �l�ments PM.ExpandTree.Element cr��s
 */
PM.ExpandTree.init = function(containingDiv, containingElt, sensitiveElt, targetElt, options) {
  var treeEltTab = $j(containingElt, $(containingDiv));
  var elements = new Array();

  for (var i=0; i<treeEltTab.length; i++){
    elements[elements.length] = new PM.ExpandTree.Element(treeEltTab[i], sensitiveElt, targetElt, options);
  }

  return elements;
}



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.FilterMenu
------------------------------------------------------------------------------*/

/**
 * @namespace Affichage/masquage de boites contextuelles (page Vendre) <code>(Doc � revoir)</code>.
 */
PM.FilterMenu = {
  nbMenus: 10, // number of filter menus
  activeMenu: -1, // active menu
  linkClass: 'collapse' // class of the html element responsible for closing menu
}

/**
 * Opens a contextual menu
 *
 * @param id ID of the contextual menu
 */
PM.FilterMenu.open = function(id) {
  var link = $('filterlink' + id);
  if (link) {
    link.className = 'referer_link';
    link.href = 'javascript:PM.FilterMenu.close(' + id + ')';
  }

  if(PM.FilterMenu.activeMenu != -1) {
    PM.FilterMenu.close(PM.FilterMenu.activeMenu);
  }

  var menu = $('filtermenu' + id);
  menu.style.display = 'block';
  if(ie6 && $('filtermenu_iframe')) {
    var pos = PM.Util.absolutePosition(menu);
    var iframe_elt = $('filtermenu_iframe');
    iframe_elt.style.width = (menu.offsetWidth+4)+"px";
    iframe_elt.style.height = menu.offsetHeight+"px";
    iframe_elt.style.left = (pos[0]-4)+"px";
    iframe_elt.style.top = pos[1]+"px";
    iframe_elt.style.display = "block";
  }

  PM.FilterMenu.activeMenu = id;
}


/**
 * Closes a contextual menu
 *
 * @param id ID of the contextual menu
 *
 * @base PM.FilterMenu
 */
PM.FilterMenu.close = function(id) {
  var link = $('filterlink' + id);
  if (link) {
    link.className = PM.FilterMenu.linkClass;
    link.href = 'javascript:PM.FilterMenu.open(' + id + ')';
  }
  var menu = $('filtermenu' + id);
  if (menu) {
    menu.style.display = 'none';
    if(ie6 && $('filtermenu_iframe'))
      $('filtermenu_iframe').style.display = 'none';
  }
  PM.FilterMenu.activeMenu = -1;
}


/**
 * Checks if a contextual menu is clicked, close it if not
 * Different cases IE/Firefox/Safari/Opera
 *
 * @param e Mouse Event
 *
 * @base PM.FilterMenu
 */
PM.FilterMenu.testClicked = function(e) {
  if (PM.FilterMenu.activeMenu != -1) {
    if (document.all) { // IE case
      var t = window.event.srcElement;
      while (t.parentElement != null) {
        if (t.id == "filtermenu" + PM.FilterMenu.activeMenu || t.id == "filterlink" + PM.FilterMenu.activeMenu || t.className == "filter_title") { // if popup clicked
          return;
        } else if(t.className == "filter_shadowtitle")  {
          t = "stop";
        } else {
          t = t.parentElement;
        }
      }
      // no popup clicked
      PM.FilterMenu.close(PM.FilterMenu.activeMenu);
      return;
    } else if (e) { // Netscape, Opera, Safari case
      t = e.target;
      while (t.parentNode != null) {
        if (t.id == "filtermenu" + PM.FilterMenu.activeMenu || t.id == "filterlink" + PM.FilterMenu.activeMenu || t.className == "filter_title") { // if popup clicked
          return;
        } else if(t.className == "filter_shadowtitle")  {
          t = "stop";
        } else {
          t = t.parentNode;
        }
      }
      // no popup clicked
      PM.FilterMenu.close(PM.FilterMenu.activeMenu);
      return;
    }
  }
}

/* START : Kept for backward compatibility */
/* DEPRECATED - YOU SHOULD NOT USE ANY OF THESE FUNCTIONS ANY MORE */

/**
 * <font style="color: red">Fonction d�pr�ci�e</font>
 * @see PM.FilterMenu.open
 * @deprecated <font style="color: red">Cette fonction ne doit plus �tre utilis�e !</font>
 */
function openFilterMenu(id) {
  PM.Statistics.deprecatedFunctions("openFilterMenu");
  PM.FilterMenu.open(id);
}

/**
 * <font style="color: red">Fonction d�pr�ci�e</font>
 * @see PM.FilterMenu.close
 * @deprecated <font style="color: red">Cette fonction ne doit plus �tre utilis�e !</font>
 */
function closeFilterMenu(id) {
  PM.Statistics.deprecatedFunctions("closeFilterMenu");
  PM.FilterMenu.close(id);
}

/**
 * <font style="color: red">Fonction d�pr�ci�e</font>
 * @see PM.FilterMenu.testClicked
 * @deprecated <font style="color: red">Cette fonction ne doit plus �tre utilis�e !</font>
 */
function isClicked(e) {
  PM.Statistics.deprecatedFunctions("isClicked");
  PM.FilterMenu.testClicked(e);
}

/* END : Kept for backward compatibility */


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                   PM.DropDown
------------------------------------------------------------------------------*/

/**
 * @namespace Affichage et gestion des menus DropDown (inventaire, boutique)<code>(Doc � revoir)</code>.
 */
PM.DropDown = {
  timer: -1,
  element: null,
  closing_delay: 100
}

PM.DropDown.show = function(elt) {
    clearTimeout(PM.DropDown.timer);
    PM.DropDown.timer = -1;

    if(PM.DropDown.element && PM.DropDown.element != elt) {
      PM.DropDown.hide();
    }
    PM.Dom.parent(elt).style.zIndex = '120';
    elt.style.display = 'block';
    PM.DropDown.element = elt;
    PM.DropDown.elementId = elt.id;
}

PM.DropDown.hide = function() {
  PM.DropDown.element.style.display = 'none';
  PM.Dom.parent(PM.DropDown.element).style.zIndex = '';
}

PM.DropDown.hideWithTimer = function(evt) {
  PM.DropDown.timer = setTimeout("PM.DropDown.hide()",PM.DropDown.closing_delay);
}



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                  PM.SwitchTab
------------------------------------------------------------------------------*/
/**
 * @namespace Permet la navigation entre onglets (pr�f�rer PM.Tabs) <code>(Doc � revoir)</code>.
 */
PM.SwitchTab = {
  nbTabs: 3,
  tabClassName: 'tab'
}

/**
 * Open a Tab
 *
 * @param id ID of the tab to open
 *
 * @base PM.SwitchTab
 */
PM.SwitchTab.open = function(id) {
  var link = $('tablelink' + id);
  if (link) {
    link.parentNode.className = PM.SwitchTab.tabClassName + '_' + id + '_on';
  }
  for (i = 0; i < PM.SwitchTab.nbTabs; ++i) {
    var table = $('table' + i);

    if (table) {
      if (i == id) {
        table.style.display = 'block';
      } else {
        PM.SwitchTab.close(i);
      }
    }
  }
}

/**
 * Close a Tab (hide it)
 *
 * @param id of the tab to close
 */
PM.SwitchTab.close = function(id) {
  var link = $('tablelink' + id);
  if (link) {
    link.parentNode.className = PM.SwitchTab.tabClassName + '_' + id + '_off';
    link.href = 'javascript:PM.SwitchTab.open(' + id + ')';
  }
  var table = $('table' + id);
  if (table) {
    table.style.display = 'none';
  }
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.Media
------------------------------------------------------------------------------*/
/**
 * @namespace Fonctions utilis�es par le widget media <code>(Doc � revoir - � d�placer dans JS appropri�)</code>.
 */
PM.Media = {
  // constants
  PHOTO: 0,
  VIDEO: 1,
  PHOTO_NAME: 'photo',
  VIDEO_NAME: 'video',

  closing_delay: 200,     // time (ms) before hiding the links when mouse leaves
  linkTimer: new Array(), // array of timers
  isOn: new Array(),      // array of appearing link divs
  isFading: new Array(),  // array of fading link divs
  effect1: new Array()
}

/*
 * Function to switch between Photo and Video tabs
 *
 * @param widgetId id of the widget to switch the tabs
 * @param tabType  Either PM.Media.PHOTO or PM.Media.VIDEO
 *
 * @base PM.Media
 */
PM.Media.switchTab = function(widgetId, tabType) {
  var div_to_show = div_to_hide = div_bottom_id = "media_"+widgetId+"_";
  div_bottom_id += "bottom";
  var div_bottom_class = "media_";

  // switch to get names of the elements to show/hide
  switch(tabType) {
    case PM.Media.PHOTO:
      div_to_show += PM.Media.PHOTO_NAME;
      div_to_hide += PM.Media.VIDEO_NAME;
      div_bottom_class += PM.Media.PHOTO_NAME + "_bottom";
      break;
    case PM.Media.VIDEO:
      div_to_show += PM.Media.VIDEO_NAME;
      div_to_hide += PM.Media.PHOTO_NAME;
      div_bottom_class += PM.Media.VIDEO_NAME + "_bottom";
      break;
  }

  // now doing the work & changing the tabs class
  $(div_to_show).style.display = "block";
  $(div_to_hide).style.display = "none";
  $(div_bottom_id).className = div_bottom_class;
}

/**
 * Show media widget links using Script.aculo.us effects
 *
 * @param elt Widget to show the links for
 *
 * @base PM.Media
 */
PM.Media.showLinks = function(elt) {
  eltId = elt.id + "_links";
  if($(eltId) != null) {
    clearTimeout(PM.Media.linkTimer[eltId]); // deleting timeout for hiding links
    PM.Media.linkTimer[eltId] = -1;

    if(PM.Media.isOn[eltId] == false || PM.Media.isOn[eltId] == null) { // only start effects if there're not already active
      if(PM.Media.isFading[eltId] != null && PM.Media.isFading[eltId] == true) { // cancel fading affects if any
        PM.UI.Effect.stop(eltId);
      }
      PM.Media.isOn[eltId] = true;
      PM.UI.Effect.fadeIn(eltId, {duration: 300, opacity: 0.85});
      PM.UI.Effect.move(eltId, { duration: 300, left: "0px"});
    }
  }
}

/**
 * Hide media widget links
 *
 * @param eltId links div id
 *
 * @base PM.Media
 */
PM.Media.hideLinks = function(eltId) {
  if($(eltId) != null) {
    PM.Media.isOn[eltId] = false;
    PM.Media.isFading[eltId] = true;
    PM.UI.Effect.move(eltId, { duration: 500, left: "80px"});
    PM.UI.Effect.fadeOut(eltId, {duration: 500, callback: function() { PM.Media.isFading[eltId] = false; }});
  }
}

/**
 * Create timer to hide links after a while
 *
 * @param elt Widget element
 *
 * @base PM.Media
 */
PM.Media.hideLinksWithTimer = function(elt) {
  eltId = elt.id + "_links";
  PM.Media.linkTimer[eltId] = setTimeout("PM.Media.hideLinks('"+elt.id + "_links')",PM.Media.closing_delay);
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.Panel
------------------------------------------------------------------------------*/

/**
 * @namespace Permet d'afficher des objets "panel" (ex : Toolbox vendeur) <code>(Doc � revoir)</code>.
 * Only one panel active at a time.
 */
PM.Panel = {
  panels: new Array(),
  activePanel: -1 // active panel
}


/**
 * Init panels within a defined area
 *
 * @param area_id        Context area as an element id
 * @param panel_elt      Element to activate defined by "eltTag.className"
 * @param activation_elt Element the onclick event is applied to. Defined by "eltTag.className"
 * @param className      Class to add to the panel element
 * @param options        Optional parameters.\n ex: - callback : callback function called when processed
 */
PM.Panel.init = function(area_id, panel_elt, activation_elt, options) {
  var area = $(area_id);

  if( area != null ) { // if area exists within the document
    // we search for panel elements within the area
    var panel_attr = panel_elt.split(".");

    var elts = area.getElementsByTagName(panel_attr[0]);

    // filling panels array with panels DOM elements
    for (i = 0; i < elts.length; i++) {
      if(elts[i].className == panel_attr[1]) {
        var panLength = PM.Panel.panels.length;
        PM.Panel.panels[panLength] = new Array();
        elts[i].id = "panel_elt_"+panLength;
        PM.Panel.panels[panLength][0] = elts[i];
        PM.Panel.panels[panLength][1] = options.callback;

        // seeking activation element within panel element
        var activation_attr = activation_elt.split(".");

        var in_elts = elts[i].getElementsByTagName(activation_attr[0]);
        for (j = 0; j < in_elts.length; j++) {
          if(in_elts[j].className == activation_attr[1]) {

            // we add onClick event on activation element
            in_elts[j].id = "panel_activate_"+panLength;
            PM.Event.add(in_elts[j], "click", PM.Panel.toggle);
          }
        }

      }
    }

    PM.Event.add(document, "click", PM.Panel.testClick);

  }
}

/**
 * Add or remove class to the panel
 */
PM.Panel.toggle = function(evt) {
  var target = "";
  var panel_id = "";
  if (typeof(evt) == "string") {
    target = evt;
    panel_id = target.replace(new RegExp('panel_elt_', 'g'), "");
  } else {
    target = evt["target"] ? evt["target"] : evt["srcElement"];
    target = target.id;
    panel_id = target.replace(new RegExp('panel_activate_', 'g'), "");
  }

  // target panel
  var panel = PM.Panel.panels[panel_id];

  if(panel[0].className.match("expanded")) {
  PM.Dom.Class.replace(panel[0], "expanded", "collapsed");
    panel[1].apply(null, [panel[0], false]);
    PM.Panel.activePanel = -1;
  } else {
    // close other panel if opened
    if (PM.Panel.activePanel != -1) PM.Panel.toggle(PM.Panel.activePanel);
    PM.Dom.Class.replace(panel[0], "collapsed", "expanded");
    panel[1].apply(null, [panel[0], true]);
    PM.Panel.activePanel = panel[0].id;
  }

}

/**
 * If a Panel is open, we check on click if it's clicked, if not we close it
 * Different cases IE/Firefox/Safari/Opera
 *
 * @param e Mouse Event
 *
 * @base PM.Panel
 */
PM.Panel.testClick = function(e) {
  if (PM.Panel.activePanel != -1) {
    if (document.all) { // IE case
      var t = window.event.srcElement;
      while (t.parentElement != null) {
        if (t.id == PM.Panel.activePanel) { // if panel clicked
          return;
        } else {
          t = t.parentElement;
        }
      }
      // no panel clicked
      PM.Panel.toggle(PM.Panel.activePanel);
      return;
    } else if (e) { // Netscape, Opera, Safari case
      t = e.target;
      while (t.parentNode != null) {
        if (t.id == PM.Panel.activePanel) { // if panel clicked
          return;
        } else {
          t = t.parentNode;
        }
      }
      // no panel clicked
      PM.Panel.toggle(PM.Panel.activePanel);
      return;
    }
  }
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                      PM.Steps
------------------------------------------------------------------------------*/

/**
 * @namespace Gestion des �tapes (utilis� sur les assistants Widget) <code>(Doc � revoir)</code>.
 */
PM.Steps = {
  activeStep: -1, // active step
  nbSteps: 0,
  callback: null
}


/**
 * Init steps within a defined area
 *
 * @param area_id        Context area as an element id
 * @param step_elt       Link to activate within an element defined by "eltTag.className"
 * @param options        options.callback : callback function called when step is changed
 *
 * @base PM.Steps
 */
PM.Steps.init = function(area_id, step_elt, options) {
  var area = $(area_id);

  if( area != null ) { // if area exists within the document
    // we search for steps elements within the area
    var step_attr = step_elt.split(".");

    var elts = area.getElementsByTagName(step_attr[0]);

    var titlesArray = new Array();
    var maxWidth = 0; // title max width

    // store callback function
    if (options.callback) PM.Steps.callback = options.callback;

    // filling steps array with steps DOM elements
    for (i = 0; i < elts.length; i++) {
      if(elts[i].className == step_attr[1]) {
        //var stepLength = PM.Steps.steps.length;
        //PM.Steps.steps[stepLength] = new Array();

        // looking for a link within this step
        var elt_links = elts[i].getElementsByTagName("a");

        for (j = 0; j < elt_links.length; j++) { // there should only be one link, but just in case...
          // linking this to an event
          PM.Steps.nbSteps++;
          var elt_id = elt_links[j].href.split("#");
          elt_links[j].href = "javascript: return false;"; // desactivate anchor
          if (i == 0) PM.Steps.activeStep = elt_id[1]; // first step is the one active when initializing
          elt_links[j].id = "anchor_"+elt_id[1];
          PM.Event.add(elt_links[j], "click", PM.Steps.changeStep);

           // fetching span inside to find stepnumber and stepname
           var elt_spans = elt_links[j].getElementsByTagName("span");
           for (k = 0; k < elt_spans.length; k++) {
             if (elt_spans[k].className == "stepnumber") {
               if (i == 0) elt_spans[k].className = "stepnumber selected";
                 else elt_spans[k].className = "stepnumber inactive";

               elt_spans[k].id = "stepnumber_" + elt_id[1];
             } else if (elt_spans[k].className == "stepname") {

               elt_spans[k].id = "stepname_" + elt_id[1];
               // fill in titles array
               titlesArray[titlesArray.length] = elt_spans[k];
               if (elt_spans[k].offsetWidth > maxWidth) maxWidth = elt_spans[k].offsetWidth;

             }
           }

        }

      }
    }

    maxWidth = maxWidth + 3;
    $('ws_wave').style.left = maxWidth + "px";
    for (z = 0; z < titlesArray.length; z++) {
      titlesArray[z].style.width = maxWidth + "px";
    }

  }
}

/**
 * Toggle step
 *
 * @base PM.Steps
 */
PM.Steps.changeStep = function(stepid) {
  var elt = "";
  var element_id = "";

  if (typeof(stepid) == "string") {
    elt = $("anchor_"+stepid);
    element_id = elt.id.split("anchor_");
  } else {
    PM.Util.preventDefault(stepid); // emp�che de suivre le lien
    if (document.all) { // IE case
      elt = window.event.srcElement;
    } else {
      elt = stepid.target;
    }
    element_id = elt.id.split("stepnumber_");
  }

  element_id = element_id[1];

  if ($("stepnumber_"+element_id).className.split(" inactive").length <= 1) { // only if element is active

    if(element_id != PM.Steps.activeStep) {
      $(PM.Steps.activeStep).style.display = "none";
      $("stepnumber_"+PM.Steps.activeStep).className = "stepnumber";
      $("stepname_"+PM.Steps.activeStep).style.visibility = "hidden";
      $(element_id).style.display = "block";
      $("stepnumber_"+element_id).className = "stepnumber selected";
      $("stepname_"+element_id).style.visibility = "visible";
    }

    PM.Steps.activeStep = element_id;

    // hit xiti
    var specXtpage = null;
    var stepNumber = parseInt(PM.Steps.activeStep.replace(new RegExp('^[^0-9]*'), ''));
    if (stepNumber != 1) {
      specXtpage = window.xtpage + "::Etape" + stepNumber;
    }
    PM.Statistics.Tracking.writeTag(specXtpage);

    // call callback function if exists
    if (PM.Steps.callback) PM.Steps.callback.apply(null, [element_id]);
  }
}


/**
 * Activate step and go to this step
 *
 * @base PM.Steps
 */
PM.Steps.activateAndGoToStep = function(stepid) {
  $("stepnumber_"+stepid).className = "stepnumber";

  PM.Steps.changeStep(stepid);
}

/**
 * Disable next steps
 *
 * @base PM.Steps
 */
PM.Steps.disableNextSteps = function(stepid) {
  var prefix = "content";

  for (var i = (stepid+1); i <= PM.Steps.nbSteps; i++) {
    $("stepnumber_" + prefix + i).className = "stepnumber inactive";
  }
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                 PM.Assistance
------------------------------------------------------------------------------*/
/**
 * @namespace Affichage et gestion de l'aide contextuelle des formulaires (style 4G). <code>(doc � revoir)</code>.
 */
PM.Assistance = {
  active: null, // active element (on focus)
  elt: null, // element to hide (on mouseover)
  open_time: 0, // time in millisecond when the assistance was opened
  timer: -1,

  closing_delay: 500,
  focus_closing_delay: 250
}


PM.Assistance.init = function(area_id) {
  this.activeAssistance = null;

  // cibling form area
  var area = $(area_id);

  // looking for assistance div
  var assistBlk = area.getElementsByTagName("div");

  for (i = 0; i < assistBlk.length; i++) {
    // assistance divs have both 'assistance' and 'notification' class
    if (assistBlk[i].className.match("assistance_ctner") != null) {
      // get previous object
      var applyObj = PM.Dom.previousObject(assistBlk[i]);
      var applyObjCl = applyObj.className;

      // behavior on focus or/and mouseOver
      var elts = PM.Util.collectionToArray(applyObj.getElementsByTagName("select"));
      elts = elts.concat(PM.Util.collectionToArray(applyObj.getElementsByTagName("textarea")));
      elts = elts.concat(PM.Util.collectionToArray(applyObj.getElementsByTagName("input")));
      for (j = 0; j < elts.length; j++) {
        PM.Event.add(elts[j], "focus", PM.Assistance.showOnFocus.bindObj(assistBlk[i]));
        if (elts[j].type == "radio" || elts[j].type == "checkbox") {
          PM.Event.add(elts[j], "mouseover", PM.Assistance.showOnOver.bindObj(assistBlk[i]));
          PM.Event.add(elts[j], "mouseout", PM.Assistance.hideWithTimer.bindObj(assistBlk[i]));
        }
      }
      if (applyObjCl.match("fld_rdio") || applyObjCl.match("fld_chckbox")) {
        PM.Event.add(applyObj, "mouseover", PM.Assistance.showOnOver.bindObj(assistBlk[i]));
        PM.Event.add(applyObj, "mouseout", PM.Assistance.hideWithTimer.bindObj(assistBlk[i]));
        PM.Event.add(assistBlk[i], "mouseover", PM.Assistance.showOnOver.bindObj(assistBlk[i]));
        PM.Event.add(assistBlk[i], "mouseout", PM.Assistance.hideWithTimer.bindObj(assistBlk[i]));
      }
    }
  }

  // init onclick event to hide assistance notification when the user clicks outside
  PM.Event.add(document, "click", PM.Assistance.testClick);
}

PM.Assistance.showOnFocus = function(evt) {
  clearTimeout(PM.Assistance.timer);
  PM.Assistance.timer = -1;
  if (PM.Assistance.elt != null) {
    PM.Assistance.elt.style.display = "none";
    PM.Assistance.elt = null;
  }

  if (this != PM.Assistance.active) {
    if (PM.Assistance.active != null) {
      PM.Assistance.active.style.display = "none";
    }
    PM.Assistance.active = this;
    this.style.display = "block";
  }
}

PM.Assistance.showOnOver = function(evt, test) {
  clearTimeout(PM.Assistance.timer);
  PM.Assistance.timer = -1;
  if (PM.Assistance.elt != null) {
    PM.Assistance.elt.style.display = "none";
    PM.Assistance.elt = null;
  }

  // hiding current active assistance
  if (PM.Assistance.active != null) {
    PM.Assistance.active.style.display = "none";
  }

  this.style.display = "block";
}

PM.Assistance.hide = function() {
  if (PM.Assistance.elt != null) {
    PM.Assistance.elt.style.display = "none";
    PM.Assistance.elt = null;
  }

  // showing previous active assistance
  if (PM.Assistance.active != null) {
    PM.Assistance.active.style.display = "block";
  }
}

PM.Assistance.hideWithTimer = function(evt) {
  PM.Assistance.elt = this;

  PM.Assistance.timer = setTimeout("PM.Assistance.hide()",PM.Assistance.closing_delay);
}

PM.Assistance.hideOnBlur = function(evt) {
  // hiding active assistance
  if (PM.Assistance.active != null) {
    PM.Assistance.active.style.display = "none";
    PM.Assistance.active = null;
  }
}

PM.Assistance.hideOnBlurWithTimer = function(evt) {
  PM.Assistance.timer = setTimeout("PM.Assistance.hideOnBlur()",PM.Assistance.focus_closing_delay);
}

PM.Assistance.testClick = function(evt) {
  var t = PM.Util.getElementFromEvent(evt);

  while (PM.Dom.parent(t) != null) {
    if (PM.Assistance.active != null && t == PM.Dom.parent(PM.Assistance.active)) { // if assistance clicked
      return;
    } else {
      t = PM.Dom.parent(t);
    }
  }

  if (PM.Assistance.active != null) {
    PM.Assistance.active.style.display = "none";
    PM.Assistance.active = null;
  }
  return;
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                    PM.History
------------------------------------------------------------------------------*/
/**
 * @namespace Enregistre et restitue une suite d'�v�nements (d�but d'historisation) <code>(Doc � revoir)</code>.
 */
PM.History = {
  historyList: null
}

PM.History.init = function(formName, hiddenFieldId) {
  PM.Forms.registerAction($(formName), function() {
    var history_ipt = $(hiddenFieldId);
    if (history_ipt) {
      history_ipt.value = PM.History.historyList;
    }

    return true;
  });
}

/**
 * Permet d'ajouter un �v�nement � l'historique des �v�nements
 */
PM.History.registerEvent = function(functionName, args) {
  var sHistory = "";
  if (PM.History.historyList != null && PM.History.historyList != "") {
    sHistory = PM.History.historyList + ";";
  }
  for (var i = 0; i < arguments.length; i++) {
    if (i > 0) sHistory += ",";
    sHistory += arguments[i];
  }
  PM.History.historyList = sHistory;
}

/**
 * Permet de supprimer un �v�nement de l'historique des �v�nements
 */
PM.History.removeEvent = function(functionName, args) {
  var eventToRemove = "";
  for (var i = 0; i < arguments.length; i++) {
    if (i > 0) eventToRemove += ",";
    eventToRemove += arguments[i];
  }
  var eventToRemovePos = PM.History.historyList.indexOf(eventToRemove);
  if (eventToRemovePos >= 0) { //si l'�v�nement qu'on veut supprimer est pr�sent dans l'historique
    //on supprime l'�v�nement dans la cha�ne, ainsi que le ";" qui le pr�c�de
    PM.History.historyList = PM.History.historyList.substring(0, eventToRemovePos - 1)
                 + PM.History.historyList.substring(eventToRemovePos + eventToRemove.length);

    //si l'�v�nement � supprimer �tait le premier, on a un ";" en d�but de cha�ne qu'il faut supprimer
    if (PM.History.historyList.indexOf(";") == 0) {
      PM.History.historyList = PM.History.historyList.substring(1, PM.History.historyList.length);
    }
  }
}

/**
 * Permet de rejouer les �v�nements enregistr�s dans l'historique des �v�nements
 */
PM.History.replayEvents = function(hiddenFieldId) {
  var jsEvents = $(hiddenFieldId).value.split(';');
  for (var i = 0; i < jsEvents.length; i++) {
    var oneEvent = jsEvents[i].split(',');

    var execFunc = "var res = " + oneEvent[0] + "(";
    for (var j = 1; j < oneEvent.length; j++) {
      if (j > 1) execFunc += ",";
      var quotes = "'";
      if (oneEvent[j] == "true" || oneEvent[j] == "false") quotes = "";
      execFunc += quotes + oneEvent[j] + quotes;
    }
    execFunc += ")";

    eval(execFunc);
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                    PM.Tabs
------------------------------------------------------------------------------*/
/**
 * @namespace Syst�me d'onglets
 */
PM.Tabs = {
  curContent: null,
  defaultContent: null
}

/**
 * Initialise le syst�me d'onglets.
 * @param {String} ctnerId: l'id du bloc (div) englobant la table des mati�res et les contenus qui peut-�tre 'null'.
 * @param {String} parentClass: l'id du bloc (div) parent qui contient chaque contenu.
 * @param {JSON Object} options Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * <ul>
 * <li><code><b>tabIsFirstChild</b> Si le syst�me d'onglet souhaite identifier les contenus par l'id de leur premier fils (ex: avec LPS)</code> : 'false'</li>
 * <li><code><b>prefix</b> Le pr�fixe que l'id des liens de la table des mati�res auront.</code> : 'a'</li>
 * <li><code><b>event</b> L'�v�nement JS � utiliser sur l'onglet pour faire appara�tre le contenu associ�.</code> : 'mouseover'</li>
 * </ul>
 */
PM.Tabs.init = function(ctnrId, parentClass, options) {
  if (!options) options = {};

  // Ev�nement par d�faut pour changer d'onglet
  var tabsEvent = 'mouseover';
  // Si on est dans la Landing page de mise en vente, l'�v�nement par d�faut est 'click'.
  if(options['event']) {
    tabsEvent = options['event'];
  }
  
  // Pr�fixe par d�fault.
  // Permet de r�cup�rer les ids des liens des onglets
  var prefix = 'a';
  if(options['prefix']) { //Si on ne veut pas utiliser le prefix par default 'a', on passe le nouveau dans les options
    prefix = options['prefix'];
  }

  // On r�cup�re le bloc qui contient les contenus de chaque onglet
  var parent = $j("." + parentClass);
  
  // D�termine le bloc � afficher par d�faut
  PM.Tabs.defaultContent = (options.defaultContent) ? options.defaultContent : parent.children()[0].id;

  // It�re sur tous les blocs  
  for (var i = 0; i < parent.children().size(); i++) {
    var content = parent.children()[i];
    var contentId = content.id;
    
    // Ignore le bloc si il n'a pas d'id
    if(! contentId)
      continue;
    
    if (PM.Tabs.defaultContent == contentId) {
      PM.Tabs.curContent = contentId;
      PM.UI.show(contentId);
    }
    else {
      PM.UI.hide(contentId);
    }
    
    // R�cup�re l'onglet
    // Dans le cas de la LPS, l'onglet est le 1er �l�ment contenu dans content
    var tab = (options['tabIsFirstChild']) 
      ? $(prefix + $j(content).children()[0].id)
      : $(prefix + contentId);
        
    // Ajoute les �v�nements � l'onglet
    if (tab) {
      PM.Event.add(tab, tabsEvent, function(){
        PM.Tabs.show(this.contentId, ctnrId);
      }.bindObj({contentId: contentId}));
      
      PM.Event.add(tab, 'click', function(evt){
        PM.Util.preventDefault(evt);
      });
    }
  }
  
  if(tabsEvent == 'mouseover') { 
    PM.Event.add($(ctnrId), 'mouseleave', function(evt){
      var ctnr = $(this.ctnrId);
      ctnr.className = 'ctnr_' + PM.Tabs.defaultContent;
      PM.Tabs.show(PM.Tabs.defaultContent, ctnr);
    }.bindObj({ctnrId: ctnrId}));
  }
}

/**
 * @ignore
 */
PM.Tabs.show = function(contentId, ctnrId) {
   if(PM.Tabs.curContent) PM.UI.hide(PM.Tabs.curContent);
   PM.UI.show(contentId);
   PM.Tabs.curContent = contentId;
   if(null != $(ctnrId))
     $(ctnrId).className = 'ctnr_' + contentId;
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                     PM.Toggle
------------------------------------------------------------------------------*/

/**
 * Cr�e un objet de type <code>PM.Toggle</code>.
 *
 * @class Objet utilis� pour l'ouverture et la fermeture d'un �l�ment par ajout d'une classe CSS.
 * @constructor
 *
 * @param {DOM Object} triggerElt El�ment d�clencheur
 * @param {JSON Object} options Les options s'ajoutent sous la forme suivante : <code>{option_name: "options_value", options2_name: "options2_value",...}</code>
 * <ul>
 * <li><code><b>targetElt</b> (triggerElt)</code> : El�ment � ouvrir ou fermer.</li>
 * <li><code><b>classOn</b> ("highlight")</code> : Classe CSS pour l'ouverture de l'�l�ment cible</li>
 * <li><code><b>classOff</b> ("")</code> : Classe CSS pour la fermeture de l'�l�ment cible</li>
 * <li><code><b>closingElts</b> ([])</code> : Tableau contenant les �l�ments pour lesquels un clic ferme la cible.</li>
 * <li><code><b>preventDefault</b> (false)</code> : <code>true</code> si on veut ne pas suivre le lien des �l�ment d�clencheur et fermant</li>
 * <li><code><b>closingOnClickOutside</b> (true)</code> : Permet de d�terminer s'il faut fermer l'�l�ment si on clique en dehors de celui-ci 
 * </ul>
 */
PM.Toggle = function(triggerElt, options) {

  // El�ment d�clencheur
  this.triggerElt = $(triggerElt);

  // Options
  this.targetElt = PM.Util.getOption(options, 'targetElt', this.triggerElt);
  this.classOn = PM.Util.getOption(options, 'classOn', 'highlight');
  this.classOff = PM.Util.getOption(options, 'classOff', '');
  this.preventDefault = PM.Util.getOption(options, 'preventDefault', false);
  this.closingElts = PM.Util.getOption(options, 'closingElts', []);

  // Fonction pour l'�v�nement clic sur le document
  this.closingOnClickOutside = PM.Util.getOption(options, 'closingOnClickOutside', true);
  if(this.closingOnClickOutside == true) {
    this.currentClickFction = this.clickOutside.bindObj(this);
  }

  // Ev�nement clic sur l'�l�ment d�clencheur
  PM.Event.add(this.triggerElt, 'click', this.clickOnTrigger.bindObj(this), this.preventDefault);
   
  // Ev�nement clic sur les �l�ment fermant la cible
  for (var i = 0 ; i < this.closingElts.length ; i++) {
    PM.Event.add(this.closingElts[i], 'click', this.clickOnClosing.bindObj(this), this.preventDefault);
  }
  
  //IE6: ajoute une iframe pour que le bloc cible passe au dessus des formulaires (select)
  if (ie6) {
    this.targetFrameDiv = PM.Dom.createElement("div");
    this.targetFrameId = this.targetElt.id + '_iframe';
    this.targetFrameDiv.innerHTML = '<iframe id="' + this.targetFrameId + '" src="javascript:false;" style="width:0; position: absolute; top:0px; left:0px; filter:alpha(opacity=0); z-index: -1; height: 0;"></iframe>';
    this.targetElt.appendChild(this.targetFrameDiv);
  }
}

/**
 * Ouvre ou ferme l'�l�ment cible selon les classes CSS pr�sentes
 * Cette m�thode est appel�e lors d'un clic sur l'�l�ment d�clencheur
 */
PM.Toggle.prototype.clickOnTrigger = function(){
  if (PM.Dom.Class.has(this.targetElt, this.classOn))
    this.close();
  else
    this.open();
}

/**
 * Ferme l'�l�ment cible s'il est ouvert
 * Cette m�thode est appel�e lors d'un clic sur l'un des �l�ments fermant
 */
PM.Toggle.prototype.clickOnClosing = function(){
  if (PM.Dom.Class.has(this.targetElt, this.classOn))
    this.close();
}

/**
 * Ouvre l'�l�ment cible et ajoute un listener pour l'�v�nement clic sur le document
 */
PM.Toggle.prototype.open = function(){
  PM.Debug.log("[Toggle] ouverture de l'�l�ment " + this.targetElt.id, PM.Debug.Type.INFO);

  // Ouverture de l'�l�ment cible par ajout de la classe CSS d'ouverture
  PM.Dom.Class.replace(this.targetElt, this.classOff, this.classOn);
  
  //IE6: Mise � jour et affichage de l'iframe
  if (ie6) {
    this.updateiFramePosition();
    this.targetFrame.style.display = 'block';
  }

  if(typeof(this.currentClickFction) != "undefined") {
    // Ajout de l'�venement sur le document pour la fermeture
    PM.Event.add(document, 'click', this.currentClickFction);
  }
}

/**
 * Ferme l'�l�ment cible et supprime le listener pour le clic sur le document
 */
PM.Toggle.prototype.close = function(){
  PM.Debug.log("[Toggle] fermeture de l'�l�ment " + this.targetElt.id, PM.Debug.Type.INFO);

  // Fermeture par remplacement de la classe d'ouverture par la classe de fermeture.
  PM.Dom.Class.replace(this.targetElt, this.classOn, this.classOff);
  
  //IE6: Masquage de l'iframe
  if (ie6) {
    this.targetFrame.style.display = 'none';
  }

  if(typeof(this.currentClickFction) != "undefined") {
    // Suppressions de l'�v�nement sur le document.
    PM.Event.remove(document, 'click', this.currentClickFction);
  }
}

/**
 * Ferme l'�l�ment cible si le clic a eu lieu en dehors de cet �l�ment
 * Cette m�thode est appel�e lors d'un clic sur le document et que l'�l�ment cible est ouvert
 */
PM.Toggle.prototype.clickOutside = function(event){
  var elt = PM.Util.getElementFromEvent(event);
  if (!PM.Dom.withinElement(elt, this.targetElt)){
    PM.Debug.log("[Toggle] Clic en dehors de la cible", PM.Debug.Type.INFO);
    this.close();
  }
}

/**
 * Met � jour la position et les dimensions de l'iframe pour ie6
 */
PM.Toggle.prototype.updateiFramePosition = function() {
    this.targetFrame = $(this.targetFrameId);
    this.targetFrame.style.top = 0 + 'px';
    this.targetFrame.style.left = 0 + 'px';
    this.targetFrame.style.width = this.targetElt.offsetWidth + 'px';
    this.targetFrame.style.height = this.targetElt.offsetHeight + 'px';
  }

/**
 * Ajout de la m�thode contains aux tableaux
 */
Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}



/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                  PM.ABTesting
------------------------------------------------------------------------------*/
/**
 * Cr�e un nouvel oubjet d'A/B Testing.
 *
 * @class Objet A/B Testing.
 * @constructor
 *
 * @param testName {String} Nom du test (utilis� pour le cookie et pour forcer une version)
 * @param config   {JSON}   Configuration des tests (m�me format que les confs Java)
 */
PM.ABTesting = function(testName, config) {
  this.testName = testName;
  this.config = config;
  this.tests = config.configuration;
  
  this.cookieName = PM.ABTesting.COOKIE_PREFIX + testName;
}

PM.ABTesting.COOKIE_PREFIX = "ab_";
PM.ABTesting.CODE_VERSION = "cv";
PM.ABTesting.XITI_TAG = "xt";

/**
 * Retourne la version du test choisie.<br/>
 * La version peut �tre enregistr�e dans le cookie, forc�e dans l'url ou tir�e au hasard.<br/>
 * La m�thode s'occupe �galement de l'enregistrement du cookie
 */
PM.ABTesting.prototype.getCodeVersion = function() {
  // R�cup�ration du cookie s'il existe
  var abCookie = PM.Cookie.get(this.cookieName);
  
  // Si le cookie n'existe pas, on le cr�e
  if (abCookie == null) {
    PM.Cookie.set(this.cookieName, "", PM.Util.getOption(this.config, "maxAge", 30));
  }
  
  // on v�rifie s'il y a un for�age de version dans l'url
  var forceVersion = PM.Util.getInterrogationUrlParam("abversion");
  if (typeof(forceVersion) != "undefined") {
    // on v�rifie que le for�age de version contient bien le nom de l'abtest
    var regexND = new RegExp("^" + this.testName + "\.(.*)");
    var resultsND = regexND.exec(forceVersion);
    if (resultsND != null) { // �a veut dire qu'on veut forcer une version
      PM.Debug.log("Version forc�e : ", resultsND[1]);
      PM.Cookie.setParam(this.cookieName, PM.ABTesting.CODE_VERSION, resultsND[1]);
      PM.Cookie.setParam(this.cookieName, PM.ABTesting.XITI_TAG, this.getXitiTag(resultsND[1]));
    }
  }
  
  // V�rification du cookie  
  if (!this.isCookieValid()) { // si le cookie n'est pas valide, on effectue un tirage
    var codeVersion = this.doChoice();
    
    PM.Cookie.setParam(this.cookieName, PM.ABTesting.CODE_VERSION, codeVersion);
    PM.Cookie.setParam(this.cookieName, PM.ABTesting.XITI_TAG, this.getXitiTag(codeVersion));
  }
  
  return PM.Cookie.getParam(this.cookieName, PM.ABTesting.CODE_VERSION);
}

/**
 * Effectue le choix de version
 * @ignore
 */
PM.ABTesting.prototype.doChoice = function() {
  // addition de tous les poids des versions
  var totalWeight = 0;
  for (var i = 0; i < this.tests.length; i++) {
    totalWeight += parseInt(PM.Util.getOption(this.tests[i], "weight", 1));
  }
  
  // choix al�atoire de l'index de la version � renvoyer (entre 0 et totalWeight);
  var randomNum = Math.floor(Math.random()*totalWeight);
  
  // nouveau parcours des tests pour trouver le bon
  var cumulWeight = 0;
  for (var i = 0; i < this.tests.length; i++) {
    cumulWeight += parseInt(PM.Util.getOption(this.tests[i], "weight", 1));
    if (cumulWeight > randomNum) return this.tests[i].version;
  }
}

/**
 * V�rifie si le cookie existant est valide pour le test
 * @ignore
 */
PM.ABTesting.prototype.isCookieValid = function() {
  var isValid = false;

  var xitiTag = PM.Cookie.getParam(this.cookieName, PM.ABTesting.XITI_TAG);

  if (xitiTag != null) {
    // on parcourt tous les tests
    for (var i = 0; i < this.tests.length; i++) {
      if (this.tests[i].xitiTag == xitiTag) {
        isValid = (this.tests[i].version == PM.Cookie.getParam(this.cookieName, PM.ABTesting.CODE_VERSION));
        
        break;
      }
    }
  }
  
  return isValid;
}

/**
 * R�cup�re le tag XiTi � partir de la version pass�e en param�tre
 * 
 * @param {Integer} Version
 */
PM.ABTesting.prototype.getXitiTag = function(codeVersion) {
  var xitiTag = null;
  
  // Parcours la liste pour r�cup�rer le xitiTag en fonction du codeVersion en param�tre
  for (var i = 0; i < this.tests.length; i++) {
    if (this.tests[i].version == codeVersion) {
      xitiTag = this.tests[i].xitiTag;
    }
  }
  
  return xitiTag;
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                          PM.Util.LineAdder
------------------------------------------------------------------------------*/


/**
 * Constructeur pour l'ajout de lignes en utilisant une requ�te ajax
 * 
 * @param lineAdderLinkId L'id du lien qui d�clenche l'ajout des lignes
 * @param url_request La requ�te Ajax qui ram�ne les lignes � rajouter sous forme de r�ponse JSON
 * @param json_lines_name Dans la r�ponse json cette option correspond � l'objet qui contient les lignes
 * @param line_adder_wait_id L'id du loder � afficher lors de la requ�te Ajax
 * @param line_adder_element L'�l�ment HTML qui l'on doit compl�ter avec les lignes
 * @param line_adder_method La m�thode sp�cifique � appeler pour ajouter une ligne
 * @param last_line_id L'identifiant de la derni�re ligne ajout�e avant l'instanciation du LineAdder
 * @param get_line_id_method La m�thode sp�cifique � appeler pour r�cup�rer l'identifiant de la ligne � ajouter
 * @param options Un objet json contenant des couples cl�-valeur
 * 
 * Options disponibles :
 * <ul>
 *   <li>line_adder_wait_id : id de l'�l�ment � afficher tant que le lineAdder n'a pas ajout� toutes les jsonLines</li>
 *   <li>line_adder_callback_method : m�thode callback js � appeler d�s que le lineAdder aura ajout� toutes les jsonLines</li>
 *   <li>line_adder_init_call : est-ce qu'on initialise le tableau � l'INIT</li>
 * </ul>
 * 
 * <b>ATTENTION</b> Il est obligatoire d'impl�menter une m�thode d'ajout de ligne
 * poss�dant ces param�tres: 
 * <ul>
 * <li>jsonLine: les donn�es d'une seule ligne</li>
 * <li>lineAdderElt: l'�l�ment auquel on veut accrocher la ligne</li>
 * <li>noLine: Le no de la ligne en cours de traitement</li>
 * </ul>
 */
PM.Util.LineAdder = function(lineAdderLinkId, urlRequest, jsonLinesName, lineAdderElement, lineAdderNoResult, lineAdderNoMoreResult, lineAdderMethod, lastLineId, getLineIdMethod, options) {
  
  // Param�tres obligatoires
  this.lineAdderLinkId       = lineAdderLinkId;
  this.urlRequest            = urlRequest;
  this.jsonLinesName         = jsonLinesName;
  this.lineAdderElement      = lineAdderElement;
  this.lineAdderNoResult     = lineAdderNoResult;
  this.lineAdderNoMoreResult = lineAdderNoMoreResult;
  this.lineAdderMethod       = lineAdderMethod;
  this.lastLineId            = lastLineId;
  this.getLineIdMethod       = getLineIdMethod;

  // Param�tres optionnels
  this.lineAdderWaitId   = PM.Util.getOption(options, "line_adder_wait_id", null);
  this.lineAdderCallbackMethod  = PM.Util.getOption(options, "line_adder_callback_method", null);
  this.lineAdderInitCall  = PM.Util.getOption(options, "line_adder_init_call", false);

  // Champs internes � la classe
  this.isLineAdding = false; // Flag qui indique si une requ�te est en cours
  this.nbLineAdderCall = 0; // Nombre d'appel de la m�thode d'ajout de ligne
  this.hasMoreResults = true; // Est-que apr�s la requ�te, on n'a encore plus de r�sultats
  this.nbResults = 0; // Nb de r�sultats ramen�s par la ou les requ�tes
  
  if(!this.lineAdderMethod) {
      PM.Debug.log("La m�thode d'ajout de ligne n'est pas d�finie", PM.Debug.Type.DEBUG);
      return;
  }
  
  if(!this.getLineIdMethod) {
      PM.Debug.log("La m�thode indiquant l'id de la ligne ajout�e n'est pas d�finie", PM.Debug.Type.DEBUG);
      return;
  }
  var ajaxPaginationHistory = new PM.AjaxPaginationHistory(this.requestLines.bindObj(this), "my_sales_page_number");
  
  // Ajout de l'�v�nement au clic sur le lien qui va provoquer la requ�te ajax
  PM.Event.add(this.lineAdderLinkId, "click", ajaxPaginationHistory.append.bindObj(ajaxPaginationHistory, null), true);
  
  if(this.lineAdderInitCall) {
    PM.Event.add(this.lineAdderLinkId, PM.Event.Type.INIT, this.requestLines.bindObj(this, ajaxPaginationHistory.initAjaxResults.bindObj(ajaxPaginationHistory)), true);
  }
  else{
    PM.Event.add(document, PM.Event.Type.INIT, ajaxPaginationHistory.initAjaxResults.bindObj(ajaxPaginationHistory));
  }
  
}

PM.Util.LineAdder.ReturnCode = {
  /**
   * @constant
   */
  OK: 0,
  NOK: 1
}

/**
 * Permet de faire une requ�te AJAX pour r�cup�rer les donn�es � ajouter dans des lignes
 * <p>
 * N'�x�cute pas la requ�te s'il y en a une en cours
 *
 */
PM.Util.LineAdder.prototype.requestLines = function(callbackMethod) {

  if(!this.isLineAdding) {
  // D�but de la requ�te
  this.isLineAdding = true;
    if(this.urlRequest != null && this.lineAdderElement != null) {
      // Effectue la requ�te Ajax pour r�cup�rer les donn�es
      PM.Ajax.request(this.urlRequest, 
        this.computeAjaxResponse.bindObj(this, callbackMethod), 
        { urlParams : 'last_line_id=' + (this.lastLineId == null ? '' : this.lastLineId), 
          isAsynchronous: true, 
          evalScripts: true,
          method: PM.Ajax.GET,
          errorCallback : this.computeAjaxError.bindObj(this),
          waitId: this.lineAdderWaitId
        }
      );
    }
    else {
      PM.Debug.log("Les lignes ne peuvent �tre ajout�es", PM.Debug.Type.DEBUG);
    }
  }
  else {
    PM.Debug.log("Une requ�te est en cours...", PM.Debug.Type.DEBUG);
  }
}

/**
 * R�cup�re les donn�es en les transformant en JSON et appelle la m�thode d'ajout des lignes avec ces donn�es
 *
 * @param {JSON object} options   Les options renvoy�es par la requ�te ajax
 *
 */
PM.Util.LineAdder.prototype.computeAjaxResponse = function(callbackMethod, options) {
    
  // fin de la requ�te
  this.isLineAdding = false;
  
    // Transforme la r�ponse Ajax en JSON
    eval("var jsonLines = " + options.XmlHttpObject.responseText);

    // Nombre de r�sultats
    var nbLines = jsonLines.values.nb_lines;
    this.nbResults += nbLines;

    // Si la r�ponse retourne un code OK, on ajoute les lignes avec les donn�es r�cup�r�es
    if (jsonLines.code == PM.Util.LineAdder.ReturnCode.OK) {
      this.addLines(jsonLines);
      if (this.lineAdderCallbackMethod) {
        this.lineAdderCallbackMethod.call(null, {"nb_line_adder_call" : this.nbLineAdderCall, 
                                                 "has_more_results" : this.hasMoreResults,
                                                 "nb_results" : this.nbResults});
      }
      
      //Apr�s avoir ajout� toutes les lignes, on r�cup�re l'id de la derni�re ligne ajout�e
      if(nbLines > 0) {
        this.lastLineId = this.getLineIdMethod.call(null, jsonLines.values.lines[nbLines - 1]);
      }
      if (callbackMethod){
        callbackMethod.call(null);
      }
    }
    else {
      PM.Debug.log("Les donn�es n'ont pas pu �tre r�cup�r�es (" + jsonLines.message + ")", PM.Debug.Type.DEBUG);
      if (jsonLines.values.loginURL) {
        PM.Ajax.authenticate({ loginURL : jsonLines.values.loginURL});
      }
    }
}

/**
 * M�thode appell�e en cas d'erreur de la requ�te Ajax
 * @param {JSON object} options Les options renvoy�es par la requ�te ajax
 *
 */
PM.Util.LineAdder.prototype.computeAjaxError = function(options) {
  
  // fin de la requ�te
  this.isLineAdding = false;
  PM.Debug.log("Probl�me avec la requ�te Ajax", PM.Debug.Type.DEBUG);
}

/**
 * Permet de rajouter des lignes � un �l�ment HTML.
 *
 * @param {JSON object} jsonLines   Donn�es � ajouter aux lignes
 *
 */
PM.Util.LineAdder.prototype.addLines = function(jsonLines) {
    
  this.nbLineAdderCall++;
  
  // Test du nombre de lignes retourn�
  if(! jsonLines.values.has_more) {
    
    this.hasMoreResults = false;
    
    // Supprime le lien
    var linkElt = $(this.lineAdderLinkId);
    if(linkElt) {
      linkElt.parentNode.removeChild(linkElt);
    }
    
    if(this.nbResults == 0) {
      // Affiche le bloc du no_result
      PM.UI.show($(this.lineAdderNoResult));
    }
    else {
      // Affiche le bloc du no_more_result
      PM.UI.show($(this.lineAdderNoMoreResult));
    }

    if(ie6) {
      PM.UI.hide($(this.lineAdderWaitId));
    }
  }
  
  // El�ment auquel il faut rattacher les lignes
  var lineAdderElt = $(this.lineAdderElement);
  
  if(lineAdderElt) {
    // Parcourt les lignes � ajouter
    var nbLines = jsonLines.values.nb_lines;
    for(var i=0; i<nbLines; i++) {
      // Appel de la m�thode qui a du �tre d�finie par l'utilisateur de ce framework
      this.lineAdderMethod.call(null, jsonLines.values.lines[i], lineAdderElt, i);
    }
  }
  else {
    PM.Debug.log("L'�l�ment auxquel il faut raccrocher les lignes n'existe pas: " + this.lineAdderElement, PM.Debug.Type.DEBUG);
  }
}


PM.SwapAccountBlock = function (button, target, neighboor, start, end, status, cookieName, valueNameCookie, callback) {
          this.start     =  start;
          this.end       =  end;
          this.button    = $(button);
          this.target    = $(target);
          this.neighboor = $(neighboor);
          this.cookieName =  cookieName;
          this.valueNameCookie =  valueNameCookie;
          this.callback = callback;
          this.isAlreadySwapping = false;
          
          if(status!=null) {
            this.hidden    = status;
          }else {
            this.hidden    = false;
          }
          
         PM.Event.add(this.button, "click", this.mutexOnSlide.bindObj(this));
}

PM.SwapAccountBlock.prototype.mutexOnSlide = function(e) {
  if (!this.isAlreadySwapping) {
    this.isAlreadySwapping = true;
    PM.Util.preventDefault(e);
    this.slideElement();
    this.callback.call(null, {"is_hidden" : this.hidden});
  }
}

PM.SwapAccountBlock.prototype.slideElement = function() {
  
  if(this.hidden) {
          PM.UI.Effect.slide(this.neighboor, {marginLeft : this.start }, {callback : function() {this.isAlreadySwapping = false;}.bindObj(this)});
          PM.UI.Effect.slide(this.target, {marginLeft : this.end });
          this.hidden = false;
          PM.Cookie.setParam(this.cookieName, this.valueNameCookie, this.hidden);
          PM.Dom.Class.remove($('main'),'navIsHidden');
          this.button.style.marginRight = "0px";
  } 
   else {
          
          PM.UI.Effect.slide(this.target,{marginLeft : "-" + this.start }, {callback : function(){
                                                                                  PM.Dom.Class.add($('main'),'navIsHidden');
                                                                                  PM.UI.Effect.slide(this.button, {marginRight : "-15px"},{duration:200});
                                                                                  this.isAlreadySwapping = false;
                                                                                      }.bindObj(this)} );
          
          PM.UI.Effect.slide(this.neighboor,{marginLeft : this.end } );
          this.hidden = true;
          PM.Cookie.setParam(this.cookieName, this.valueNameCookie, this.hidden);
          
  }
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                              PM.BarcodeReader
------------------------------------------------------------------------------*/

PM.BarcodeReader = {}

/**
 * Ajoute l'�v�nement permettant d'ouvrir le pop-up "webcam code-barres".
 * @param link est le lien sur lequel on place l'�v�nement.
 * @param url est l'URL du pop-up.
 */
PM.BarcodeReader.addPopupEvent = function(link, url) {
  PM.Event.add(link, "click", PM.PopUp.open.bindObj(null, url, PM.PopUp.Type.PICTURE, 640, 730, 'Lecteur de code-barres'), true);
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                              PM.ProductListing
------------------------------------------------------------------------------*/

PM.ProductListing = {}

/**
 * Charge les produits � partir d'une requ�te Ajax.
 * 
 * @param url est l'url de la ProductListingAjaxAction.
 * @param keyword est le mot-cl� recherch�.
 * @param page est le num�ro de page � afficher. 1 repr�sente la premi�re page.
 * @param page navigationSoftAlias repr�sente l'univers de navigation affich�. Doit �tre null si aucun univers est affich� (cas du pop-up).
 * @param productListingId est l'id du container dans lequel il faut afficher les produits.
 * @param loaderId est l'id du loader � afficher ou masquer.
 * @param afterShowProductsFunction (optionel) est une fonction qui est appel�e � la fin de la requ�te Ajax.
 */
PM.ProductListing.search = function(url, keyword, page, navigationSoftAlias, productListingId, loaderId, afterShowProductsFunction) {
  // Si il existait d�j� un bloc "afficher les produits suivants", on le masque.
  if ($("block_more_page_" + (page - 1))) {
    PM.UI.hide("block_more_page_" + (page - 1));
  }
  
  // On affiche le loader.  
  PM.UI.show(loaderId);

  // Construit les param�tres de la requ�te.
  var params = "kw=" + keyword + "&p=" + page;
  
  if (navigationSoftAlias) {
    params += "&nav=" + navigationSoftAlias;
  }
    
  // On envoie la requ�te Ajax.
  PM.Ajax.request(url, function(options) {
    // Traitement � effectuer au retour de la requ�te Ajax :
    // On cache le loader.
    PM.UI.hide(loaderId);
        
    // On s'assure que la zone o� on affiche les produits est affich�e.
    PM.UI.show(productListingId);
    
    // On affiche le r�sultat.
    var responseText = options.responseText;
    $(productListingId).innerHTML += responseText;
    PM.Util.evalScript(responseText);

    // On d�place les r�sultats alternatifs apr�s la liste des produits.
    if ($j("#alternative_results")) {
      $j("#alternative_results").appendTo("#product_listing");
    }
    
    // On rajoute un lien permettant de voir la page suivante.
    if ($('block_more_page_' + page)) {
      PM.Event.add($('block_more_page_' + page), 
                   "click", 
                   PM.ProductListing.search.bindObj(null, url, keyword, page + 1, navigationSoftAlias, productListingId, loaderId, afterShowProductsFunction), true);
    }

    if(afterShowProductsFunction) afterShowProductsFunction.apply(null);
  }, {urlParams: params, waitId: loaderId});
}


/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                                   PM.ZoomImage
------------------------------------------------------------------------------*/

PM.ZoomImage = {}

/**
 * Permet d'afficher une image dans un container et de mettre en place un m�canisme de zoom sur l'image.
 * Pour les images plus grandes que le container, on les affiche par d�faut en ajust�. 
 * Pour les images plus petites que le container, on les affiche par d�faut avec leurs dimensions d'origine.
 * @param containerId est l'id du container dans lequel il faut afficher l'image.
 * @param urlImage est l'url de l'image � charger.
 * @param zoomInBtnId est l'id du bouton permettant de zoomer sur l'image.
 * @param zoomOutBtnId est l'id du bouton permettant de d�zoomer.
 * @param fitBtnId est l'id du bouton permettant d'afficher l'image en "ajust�".
 * @param originalBtnId est l'id du bouton permettant d'afficher l'image avec ses dimensions d'origine.
 * @param mouseWheelFunction est la fonction qui ajoutera les tags autopromo lors de l'utilisation de la roulette de la souris pour zoomer.
 */
PM.ZoomImage.init = function(containerId, urlImage, zoomInBtnId, zoomOutBtnId, fitBtnId, originalBtnId, mouseWheelFunction) {
  var container = $j("#" + containerId);
  
  var iviewer = {};
  container.iviewer({
    src: urlImage, 
    ui_disabled: true,
    initCallback: function () {
      iviewer = this;
      $j("#" + zoomInBtnId).click(function() { iviewer.zoom_by(1); }); 
      $j("#" + zoomOutBtnId).click(function() { iviewer.zoom_by(-1); }); 
      $j("#" + originalBtnId).click(function() { iviewer.set_zoom(100); });
      $j("#" + fitBtnId).click(function() { 
          iviewer.fit();
          iviewer.center();
      });
     },
     onFinishLoad: function() {
       // Si l'image est plus petite que le container, on l'affiche avec ses dimensions d'origine.
       if (iviewer.img_object.orig_width < container.width() && iviewer.img_object.orig_height < container.height()) {
           iviewer.set_zoom(100);
       }
     }
  });
  
  iviewer.img_object.object.mousewheel(function(ev,delta) {
    if (mouseWheelFunction != null) mouseWheelFunction.apply(null);
  });
  
  // Permet de zoomer et d�zoomer sur l'image m�me quand le curseur de la souris n'est pas sur l'image mais dans son container.
  container.mousewheel(function(ev,delta) {
    var zoom = delta > 0 ? 1 : -1;
    iviewer.zoom_by(zoom);
    if (mouseWheelFunction != null) mouseWheelFunction.apply(null);
    return false;
  });
}

/*----------------------------------------------------------------------------
------------------------------------------------------------------------------
                                                        PM.SubmitAutocompleter
------------------------------------------------------------------------------*/

PM.SubmitAutocompleter = {}

/**
 * Initialise l'autocomplete de la mise en vente.
 * @param autocompleteField est le champ sur lequel il faut placer l'autocomplete.
 * @param hiddenField est le champ dans lequel il faut enregistr� les valeur d'attributs.
 * @param url est l'url pour la recherche Ajax.
 * @param delay est le d�lai avant de lancer la requ�te Ajax.
 * @minChars est le nombre de caract�re � partir duquel on doit proposer l'autocomplete.
 * @separatorLabel est le label du s�parateur entre la liste de propositions "suggest" et la liste de propositions "did you mean".
 */
PM.SubmitAutocompleter.init = function(autocompleteField, hiddenField, url, delay, minChars, separatorLabel) {
  var completionOptions = {
    parse: $j.Autocompleter.parseFunctions.submitCompletionParse,
    formatItem: $j.Autocompleter.formatItemFunctions.submitCompletionFormatItem,
    doAutoFill: $j.Autocompleter.doAutoFillFunctions.submitDoAutoFill,
    formatLi: $j.Autocompleter.formatLiFunctions.submitFormatLi,
    matchSubset: false,
    cleanSearch: true,
    autoFill: true,
    includeInputInLoop: false,
    delay: delay,
    minChars: minChars,
    max: 15,
    scroll: true,
    width: 202,
    verticalGap: -1,
    scrollHeight: 220,
    heightToAddForIE: 20,
    addMaxHeightToList: false,
    separatorLabel: separatorLabel,
    resultsClass: "auto_complete_content",
    hasPressedKey: true,
    highlight: function(value, term) { return value; },
    // Cas o� l'utilisateur a entr� une valeur.
    onChange: function(value) {
      $(hiddenField).value = value;
    },
    // Cas o� l'utilisateur a s�lectionn� une valeur.
    afterSelect: function(selected) {
      $(hiddenField).value = selected.data.key;
    }
  };
  
  $j(autocompleteField).autocomplete(url, completionOptions);
}
