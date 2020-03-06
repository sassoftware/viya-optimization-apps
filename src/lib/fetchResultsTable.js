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
import tableInfo from '../lib/tableToJson';

async function fetchResultsTable(appEnv, session, store) {
  debugger;
  let caslStatements = `

		action table.fetch r=result / to= 1000
			table= {caslib = '${appEnv.WORKLIBNAME}' name = '${appEnv.OUTPUTCOSTTABLENAME}'};
		run;

		f = findTable(result);
		print f;

		/*
		Seems we need this drop table for VA to refresh the  report

		action table.dropTable/
		 caslib='${appEnv.WORKLIBNAME}' name='${appEnv.COMPARISONTABLE}' quiet=TRUE;*/

     r = {A= result};
     send_response( r) ;

		run;
	`
  console.log( caslStatements);
  let payload = {
      action: 'sccasl.runCasl',
      data: {code: caslStatements}
  }
  debugger;
  let r = await store.runAction(session, payload);
  return(tableInfo(r.items('results', 'A', 'Fetch')))
}



export default fetchResultsTable;
