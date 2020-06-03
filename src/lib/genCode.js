/*
------------------------------------------------------------------------------------
Copyright © 2020, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
---------------------------------------------------------------------------------------
*/
import optCode from './optCode';

function genCode(objType, appEnv, scenario) {
	let pgm = optCode(objType, appEnv, scenario);
	let caslStatements = `
	action table.dropTable / name='${appEnv.OUTPUTMASTERTABLENAME}' caslib='${appEnv.WORKLIBNAME}' quiet=TRUE;
	action table.dropTable / name='${appEnv.OUTPUTSITETABLENAME}' caslib='${appEnv.WORKLIBNAME}' quiet=TRUE;
	action table.dropTable / name='${appEnv.OUTPUTCOSTTABLENAME}' caslib='${appEnv.WORKLIBNAME}' quiet=TRUE;

	/*Calling OptCode */
	loadactionset 'optimization';
	action optimization.runOptmodel /
	code= "${pgm}" printlevel=0;
	run;
	print 'save output table for use with VA reports';

	/* Save and Load data */
	action table.save /
	caslib  = '${appEnv.WORKLIBNAME}'
	name    = '${appEnv.OUTPUTSITETABLENAME}'
	replace = TRUE
	table= {
		caslib = '${appEnv.WORKLIBNAME}'
		name   = '${appEnv.OUTPUTSITETABLENAME}'
	};

	action table.loadTable/
	caslib= '${appEnv.WORKLIBNAME}' path= '${appEnv.OUTPUTSITETABLENAME}.sashdat'
	casout= {caslib='${appEnv.WORKLIBNAME}' name='${appEnv.OUTPUTSITETABLENAME}' replace=TRUE};

	action table.save /
	caslib  = '${appEnv.WORKLIBNAME}'
	name    = '${appEnv.OUTPUTCOSTTABLENAME}'
	replace = TRUE
	table= {
		caslib = '${appEnv.WORKLIBNAME}'
		name   = '${appEnv.OUTPUTCOSTTABLENAME}'
	};

	action table.loadTable/
	caslib= '${appEnv.WORKLIBNAME}' path= '${appEnv.OUTPUTCOSTTABLENAME}.sashdat'
	casout= {caslib='${appEnv.WORKLIBNAME}' name='${appEnv.OUTPUTCOSTTABLENAME}' replace=TRUE};

	/*New Code here*/

	datastep.runCode / single = 'yes'
	code = "
	data ${appEnv.WORKLIBNAME}.${appEnv.OUTPUTMASTERTABLENAME};
	merge ${appEnv.WORKLIBNAME}.${appEnv.OUTPUTCOSTTABLENAME} ${appEnv.WORKLIBNAME}.${appEnv.OUTPUTSITETABLENAME};
	by site;
	run;
	";
	run;

	action table.save /
	caslib  = '${appEnv.WORKLIBNAME}'
	name    = '${appEnv.OUTPUTMASTERTABLENAME}'
	replace = TRUE
	table= {
		caslib = '${appEnv.WORKLIBNAME}'
		name   = '${appEnv.OUTPUTMASTERTABLENAME}'
	};

	action table.loadTable/
	caslib= '${appEnv.WORKLIBNAME}' path= '${appEnv.OUTPUTMASTERTABLENAME}.sashdat'
	casout= {caslib='${appEnv.WORKLIBNAME}' name='${appEnv.OUTPUTMASTERTABLENAME}' replace=TRUE};

	datastep.runCode / single = 'yes'
	code = "
	data ${appEnv.WORKLIBNAME}.${appEnv.OUTPUTMASTERTABLENAME};
	set ${appEnv.WORKLIBNAME}.${appEnv.OUTPUTMASTERTABLENAME} (rename = (product=product_ch site=site_ch soln_type=soln_type_ch));
	soln_type = put(soln_type_ch, $25.);
	product = put(product_ch, $12.);
	site = put(site_ch, $12.);
	drop product_ch site_ch soln_type_ch;
	run;
	";
	run;

/* Post Processing Ends*/

	datastep.runCode / single = 'yes'
	code = "
	data ${appEnv.WORKLIBNAME}.${appEnv.COMPARISONTABLE}_1;
	set  ${appEnv.WORKLIBNAME}.${appEnv.COMPARISONTABLE}_1
			${appEnv.WORKLIBNAME}.${appEnv.OUTPUTMASTERTABLENAME} ;
		run;
	";
	run;


	action table.save /
	caslib  = '${appEnv.WORKLIBNAME}'
	name    = '${appEnv.COMPARISONTABLE}_1'
	replace = TRUE
	table= {
		caslib = '${appEnv.WORKLIBNAME}'
		name   = '${appEnv.COMPARISONTABLE}_1'
	};


	action table.loadTable/
	caslib= '${appEnv.WORKLIBNAME}' path= '${appEnv.COMPARISONTABLE}_1.sashdat'
	casout= {caslib='${appEnv.WORKLIBNAME}' name='${appEnv.COMPARISONTABLE}_1' replace=TRUE };

	action table.dropTable/
	caslib='${appEnv.WORKLIBNAME}' name='${appEnv.COMPARISONTABLE}' quiet=TRUE;


	datastep.runCode / single = 'yes'
		code = "
		data ${appEnv.WORKLIBNAME}.${appEnv.COMPARISONTABLE};
		set  ${appEnv.WORKLIBNAME}.${appEnv.COMPARISONTABLE}_1
		 	;
		run;
		";
		run;

  table.promote /
  name="${appEnv.COMPARISONTABLE}"
  ;  

	action table.fetch r=result / to= 1000
	table= {caslib = '${appEnv.WORKLIBNAME}' name = '${appEnv.COMPARISONTABLE}'};
	run;



	r = {A= result};
	send_response( r) ;
	run;

	`
	return caslStatements;
}
export default genCode;
