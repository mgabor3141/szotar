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
	var e = document.createElement("div");
	e.appendChild(document.createElement("b").appendChild(document.createTextNode(key.substr(0, phrase.length))))
	e.appendChild(document.createTextNode(key.substr(phrase.length)))
	e.appendChild(document.createElement("br"))
	e.appendChild(document.createTextNode(values.join("; ")))
    return e
}

keys = Object.keys(lang)

function search(event) {
	if (event.value.length == 0) {
		document.getElementById("searchresults").innerHTML = "";
		return;
	}

	results = []

	strippedphrase = removeAccents(event.value).toLowerCase()

	for (i = 0; i < keys.length; ++i) {
		if (results.length >= 100) break;
		if (removeAccents(keys[i].substr(0, strippedphrase.length)).toLowerCase() == strippedphrase)
			results.push(keys[i]);
	}

	document.getElementById("searchresults").innerHTML = ""
	var c = document.createDocumentFragment();

	for (i = 0; i < results.length; ++i) {
		c.appendChild(resultItem(event.value, results[i], lang[results[i]]));
	}
	document.getElementById("searchresults").appendChild(c);
}