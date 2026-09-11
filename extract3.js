const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find the line that starts with const instagramScript
const start = content.indexOf('const instagramScript = ');
if (start !== -1) {
    // We want to slice from here until the end of the declaration.
    // We know it's a huge string. Let's find the closing ";
    // The easiest way is to extract just the string literal and JSON.parse it.
    // Or we can just evaluate the whole block after mocking document.getElementById
    const scriptBlockMatch = content.match(/<script>([\s\S]*?)<\/script>/);
    if (scriptBlockMatch) {
        let jsCode = scriptBlockMatch[1];
        // mock document
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
        console.log("Success! Extracted to Instagram_Unfollowers.js");
    }
}
