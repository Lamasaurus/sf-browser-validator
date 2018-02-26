const sfvalidator = new (require('sfvalidator'))();

class BrowserValidator{
	constructor(container_id){
		this.container_id = container_id
	}

	validate_url(url){
		sfvalidator.validate_url(url).then(result => { this.construct_output(result, url) });
	}

	construct_output(report, url){
		var table = "<table> <tr> <th colspan='2'> " + url + " </th> <tr>";

		this.add_row_to_table(table,"Attribute", "Message");

		for(var key in report){
			if(key != "headers")
				table = this.add_value_to_table(report, key, table);
			else
				table = this.add_headers(report, table);
		}


		table += " </table>";
		document.getElementById(this.container_id).innerHTML = table
	}

	add_row_to_table(table, at, mes){
		table += "<tr> <td> " + at + " </td> <td> " + mes + " </td </tr>";
		return table;
	}

	add_headers(report, table){
		var count = 0;
		for(var header in report.headers){
			if(report.headers[header].passed)
				count++;
		}

		var title = "Headers";
		if(count == 0)
			title = "Headers";
		else if(count < Object.keys(report.headers).length)
			title = "Headers";

		return table
	}

	add_value_to_table(report, key, table){
		switch (report[key].score){
			case 1:
				table = this.add_row_to_table(table, key + ' ✓', this.get_message(report[key].message));
				break;
			case 0:
				table = this.add_row_to_table(table, key + ' ○', this.get_message(report[key].message));
				break;
			case -1:
				table = this.add_row_to_table(table, key + ' ✗', this.get_message(report[key].message));
				break;
		}

		return table;
	}

	get_message(m){
		var string = '';
		if(m instanceof Set){
			for (var val of m){
				if(typeof val == "string")
					string += val + ", "
				else
					string += val.hydra + " : " + val.link + ", ";
			}

		}else{
			string = m;
		}

		return string;
	}

}

module.exports = BrowserValidator