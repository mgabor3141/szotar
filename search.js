function removeAccents(str) {
	var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
	var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
	str = str.split('');
	var strLen = str.length;
	var i, x;
	for (i = 0; i < strLen; i++) {
		if ((x = accents.indexOf(str[i])) != -1) {
			str[i] = accentsOut[x];
		}
	}
	return str.join('');
}

function resultItem(phrase, key, values) {
	var div = document.createElement("div");
	var b = document.createElement("b");

	var matchlength = phrase.length + key.substr(0, phrase.length + 1).split('"').length - 1

	b.appendChild(document.createTextNode(key.substr(0, matchlength)))
	div.appendChild(b)
	div.appendChild(document.createTextNode(key.substr(matchlength)))
	div.appendChild(document.createElement("br"))
	div.appendChild(document.createTextNode(values.join("; ")))
    return div
}

function search(input) {
	document.getElementById("searchresults").innerHTML = "";

	if (input.value.length == 0)
		return;

	var document_fragment = document.createDocumentFragment();

	var resultsindex = index[input.value[0]]

	var strippedphrase = removeAccents(input.value).toLowerCase().replace('"', '')

	var results_start = -1
	for (i = resultsindex; i < lang.length; ++i) {
		if (lang[i][0].substr(0, strippedphrase.length) == strippedphrase) {
			if (results_start < 0) {
				results_start = i;
			} else if (i - results_start > 200) {
				break;
			}

			document_fragment.appendChild(resultItem(input.value, lang[i][1], lang[i][2]));
		} else if (results_start >= 0) {
			break;
		}
	}

	document.getElementById("searchresults").appendChild(document_fragment);
}

document.getElementById('search').addEventListener('keyup',function(e){
    if (e.which == 13) {
    	this.blur();
    	return;
    } else {
    	search(this)
    }
});