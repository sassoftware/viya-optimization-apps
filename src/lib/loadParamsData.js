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

async function loadParamsData(appEnv, session, store){
  let caslStatements = `

  /*Fetching the Parameters Table*/
  action table.fetch r=ra /to= 1000
  table= {caslib= '${appEnv.WORKLIBNAME}'  name= '${appEnv.OPTABLENAME}'};
  run;

  action fedsql.execdirect /
  query="create table ${appEnv.WORKLIBNAME}.viable_facilities {options replace=true} as
  select a.facility_name, a.Product_Name
  from ${appEnv.INPUTLIBNAME}.${appEnv.COSTTABLENAME} as a
  where a.viable_flg = 1
  ";
  run;

  /*Finally fetching the Facilities Parameters Table*/
  action table.fetch r=rb /to= 1000
  table= {caslib= '${appEnv.WORKLIBNAME}'  name= 'viable_facilities'};
  run;

  r = {A= ra, B=rb};
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
  let paramTable = [];
  paramTable.push(tableInfo(r.items('results', 'A', 'Fetch')))
  paramTable.push(tableInfo( r.items('results', 'B', 'Fetch')))
  return paramTable;
}

export default loadParamsData;
