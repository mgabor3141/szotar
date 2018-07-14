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
	return "<div>" +
		"<b>" + key.substr(0, phrase.length) + "</b>" + key.substr(phrase.length) + "<br/>" +
		values.join("; ") + "</div>"
}

function search(event) {
	if (event.value.length == 0) {
		document.getElementById("searchresults").innerHTML = "";
		return;
	}

	results = []

	keys = Object.keys(lang)
	for (i = 0; i < keys.length; ++i) {
		if (results.length >= 100) break;
		if (removeAccents(keys[i]).toLowerCase().startsWith(removeAccents(event.value).toLowerCase()))
			results.push(keys[i]);
	}

	html = ""
	for (i = 0; i < results.length; ++i) {
		html += resultItem(event.value, results[i], lang[results[i]]) + "\n";
	}
	document.getElementById("searchresults").innerHTML = html;
}