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
let env = {
  OUTPUTREPORTNAME     : `${process.env.OUTPUTREPORTNAME}`,
  INPUTREPORTNAME      : `${process.env.INPUTREPORTNAME}`,
  WORKLIBNAME          : `${process.env.WORKLIBNAME}`,
  IFRAME               : `${process.env.IFRAME}`,
  INPUTLIBNAME         : `${process.env.INPUTLIBNAME}`,
  COSTTABLENAME        : `${process.env.COSTTABLENAME}`,
  SITETABLENAME        : `${process.env.SITETABLENAME}`,
  OPTABLENAME          : `${process.env.OPTABLENAME}`,
  INPUTMASTERTABLENAME : `${process.env.INPUTMASTERTABLENAME}`,
  OUTPUTMASTERTABLENAME: `${process.env.OUTPUTMASTERTABLENAME}`,
  CURRENTSOLUTION      : `${process.env.CURRENTSOLUTION}`,
  OUTPUTSITETABLENAME  : `${process.env.OUTPUTSITETABLENAME}`,
  OUTPUTCOSTTABLENAME  : `${process.env.OUTPUTCOSTTABLENAME}`,
  COMPARISONTABLE      : `${process.env.COMPARISONTABLE}`,
  REPORTGEN            : `${process.env.REPORTGEN}`,
  host                 : `${process.env.VIYA_SERVER}`,
  serverMode           : `app`
};

console.log(env);
return env;
