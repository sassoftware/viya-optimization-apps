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
 async function loadInputVAReport(store, reportName, services, host) {
    debugger;

    let reportUri = await updateInputReport(store, reportName, services);

    let options = "&appSwitcherDisabled=true&reportViewOnly=true&printEnabled=true&sharedEnabled=true&informationEnabled=true&commentEnabled=true&reportViewOnly=true";

    let href = `${host}/SASVisualAnalytics/?reportUri=${reportUri}${options}`;
    console.log(href);
    return reportUri;
}

async function updateInputReport(store, reportName, services) {
    let {reports } = services;

    debugger;

    let reportsList = await getReport( store, reports, reportName);
    if ( reportsList === null ) {
        throw {Error: `${reportName} not found`}
    }

    let reportUri = reportsList.itemsCmd(reportsList.itemsList(0), 'self', 'link', 'uri');
    return reportUri;
}

async function getReport( store, reports, name ) {
    let payload = {
        qs: {
            filter: `eq(name,'${name}')`
        }
    }
    let reportsList = await store.apiCall(reports.links('reports'), payload);
    return (reportsList.itemsList().size === 0 ) ? null : reportsList;
}

export default loadInputVAReport;
