(async function() {
	try {
		var element = document.getElementById('connexcs_rates')
		if (!element) throw new Error('Can\'t find element with id connexcs_rates')
		if (!element.getAttribute('domain')) {
			element.innerHTML = '<b>Domain attribute is missing from rates component</b>'
			return
		}
		let res = await fetch('https://' + element.getAttribute('domain') + '/api/portal/card')
		let rows = await res.json();
			let html = rows.map(item => {
				let re = /^([^\$]+) (\$[\d\.]+(?: - \$[\d\.]+)?) \((.*)\)$/;
				let match = re.exec(item.name);
				let type = '';
				if (!match) return;
				if (item.name.indexOf('CC') > -1){
					type = 'CC';
					match[1] = match[1].replace(' CC', '');
				} else if (item.name.indexOf('Non CLI') > -1) {
					type = 'Non CLI';
					match[1] = match[1].replace(' Non CLI', '');
				} else {
					type = 'CLI';				
					match[1] = match[1].replace(' CLI', '');
				}
				
				return '<tr><td>' + match[1] + '</td><td>' + type + '</td><td>' + match[2] + '</td><td>' + match[3] + '</td></tr>';
			})
		element.innerHTML = '<table>' + html + '</table>';
	} catch (e) {
		console.error(e);
	}
})();
