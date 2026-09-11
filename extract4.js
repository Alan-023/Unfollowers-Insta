const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const scriptBlockMatch = content.match(/<script>([\s\S]*?)<\/script>/);
if (scriptBlockMatch) {
    let jsCode = scriptBlockMatch[1];
    jsCode = jsCode.replace('const instagramScript', 'instagramScript');
    jsCode = jsCode.replace('const scriptLabel', 'scriptLabel');
    jsCode = jsCode.replace('const bookmarkletLink', 'bookmarkletLink');
    
    const sandbox = {
        document: {
            getElementById: () => ({})
        },
        instagramScript: ""
    };
    const vm = require('vm');
    vm.createContext(sandbox);
    vm.runInContext(jsCode, sandbox);
    
    fs.writeFileSync('Instagram_Unfollowers.js', sandbox.instagramScript, 'utf8');
    console.log("Success! Extracted to Instagram_Unfollowers.js with length " + sandbox.instagramScript.length);
}
