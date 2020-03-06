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
 import genCode from './genCode';
  import tableInfo from './tableToJson';

 async function optimize(store, session, objType, appEnv, scenario){
   debugger;
   let caslStatements = genCode(objType, appEnv, scenario);
   debugger;
   console.log('caslStatements', caslStatements)
   debugger;
   let payload = {
       action: 'sccasl.runCasl',
       data: {code: caslStatements}
   }
   let r = await store.runAction(session, payload);
   console.log(tableInfo(r.items('results', 'A', 'Fetch')));
   debugger;
   return r;
 }

 export default optimize;
