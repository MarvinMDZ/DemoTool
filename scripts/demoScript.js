/*
* Author: Javier Egido Alonso
* Email: javier.egido.alonso@gmail.com
* Based on an original idea by Kode02: code02@gmail.com http://demo.sizmek.com/Europe/tools/
*/


(function ( window, document, undefined ) {

    var placementId, adWidth, adHeight, position, toggleForm,formContainer;

    function init(){
        toggleForm = getById('toggleForm');
        formContainer = getById('formContainer');
        toggleForm.addEventListener('click',toggleFormState);
        if (window.location.search != '') {
            formContainer.style.width = '20px';
            formContainer.style.height = '20px';

            placementId = getUrlParameters('placementId','',true);
            adWidth = getUrlParameters('width','',true);
            adHeight = getUrlParameters('height','',true);
            position = getUrlParameters('position','',true);
            cssCode = getUrlParameters('cssCode','',true);
            if (cssCode === false) {
                cssCode = '';
            }
            toggleForm.innerHTML = '+';
            
            writeTag(placementId, adWidth, adHeight, position,cssCode);
            if (cssCode != '') {
                insertStyle(decode(cssCode));
            }
            getById('placementId').value = placementId;
            getById('width').value = adWidth;
            getById('height').value = adHeight;
            var auxPos = document.querySelectorAll('input[name="position"]')[position-1];
            auxPos.checked = true;
            getById('cssCode').value = cssCode;


        }else{
            toggleForm.innerHTML = '-';
            getById('Submit').addEventListener('click',function(){           
                placementId = getById('placementId');
                adWidth = getById('width');
                adHeight = getById('height');
                position = document.querySelector('input[name="position"]:checked');
                cssCode = decode(getById('cssCode'));
                writeTag(placementId.value, adWidth.value, adHeight.value, position.value,cssCode.value);
            });
        }
    }

    function getUrlParameters(parameter, staticURL, decode){
       var currLocation = (staticURL.length)? staticURL : window.location.search,
           parArr = currLocation.split("?")[1].split("&"),
           returnBool = true;
       
       for(var i = 0; i < parArr.length; i++){
            parr = parArr[i].split("=");
            if(parr[0] == parameter){
                returnBool = true;
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            }else{
                returnBool = false;            
            }
       }
      
       if(!returnBool) return false;  
    }

    function hideAllPlacements(){
        var placements = document.querySelectorAll('div[id^="placement"]');
        for (var i = placements.length - 1; i >= 0; i--) {
            placements[i].innerHTML = ' ';
            placements[i].style.display = 'none';
            placements[i].style.background = '#FFF';
        }
    }

    function writeTag(placementIdPar, adWidthPar, adHeightPar, positionPar,cssPar)
    {
        var ebRand = String(Math.random());
        ebRand = ebRand.substr(ebRand.indexOf(".") + 1);
        var divId = "ebDiv" + ebRand;
        var myDiv = document.createElement("div");
        myDiv.id = divId;

        hideAllPlacements();

        var currPlace = getById('placement0'+positionPar);
        currPlace.appendChild(myDiv);
        currPlace.style.display = 'block';

        var ebNewTag = window.ebNewTag = {};
        var ebPtcl;

        secureSite = false;

        if(secureSite){
            ebPtcl = "https://";
        }else{
            ebPtcl = "http://";
        }

        ebNewTag.containerId = divId;

        ebNewTag.partialRequest = ebPtcl + "bs.serving-sys.com/BurstingPipe/adServer.bs?cn=rsb&c=28&pli="+placementIdPar+"&PluID=0&w="+adWidthPar+"&h="+adHeightPar+"&ord="+ebRand+"&ucm=true";
        ebNewTag.ebPtcl = ebPtcl;
        ebNewTag.sms = (ebNewTag.ebPtcl == "https://") ? "secure-" + "ds.serving-sys.com/BurstingScript/" : "ds.serving-sys.com/BurstingScript/";
        ebNewTag.placementId = placementIdPar;
        ebNewTag.width = adWidthPar;
        ebNewTag.height = adHeightPar;
        ebNewTag.asyncMode = true;
        ebNewTag.ffs = [];
        var ebPreServingScript = ebNewTag.ebPtcl + ebNewTag.sms + "ebPreServing.js";
        
        var myScript = document.createElement("script");
        myScript.type = 'text/javascript';
        myScript.src = ebPreServingScript;
        myDiv.appendChild(myScript);

        var stateObj = { preview: "Generated" };
        var newUrl = "index.html?placementId="+placementIdPar+"&width="+adWidthPar+"&height="+adHeightPar+"&position="+positionPar+"&cssCode="+encode(cssCode);
        window.history.pushState(stateObj, "Sizmek Placement Preview", newUrl);

    }

    function insertStyle(str){
        var styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        if(styleElement.styleSheet) {
            styleElement.styleSheet.cssText = str;
        }
        else {
            styleElement.appendChild(document.createTextNode(str));
        }
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    function toggleFormState(){
        switch(toggleForm.innerHTML){
            case '+':
                toggleForm.innerHTML = '-';
                formContainer.style.width = '450px';
                formContainer.style.height = '320px';
                break;
            case '-':
                toggleForm.innerHTML = '+';
                formContainer.style.width = '20px';
                formContainer.style.height = '20px';
                break;
        }
    }

    function encode(str) {
        return encodeURIComponent(str).replace(/'/g,"%27").replace(/"/g,"%22");  
    }
    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g,  " "));
    }

    window.addEventListener("load", init);

    function getById(id){
        return document.getElementById(id);
    }

})(window,document,undefined);