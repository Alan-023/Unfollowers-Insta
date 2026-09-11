const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const match = content.match(/const instagramScript = "([^]+?)";/);
if (match) {
    let scriptContent = match[1];
    // The string in HTML is escaped (e.g. \" for quotes), so we need to parse it back to a normal string
    // A quick way is to evaluate it as a JSON string
    scriptContent = JSON.parse('"' + scriptContent + '"');
    fs.writeFileSync('unfollowers_script.js', scriptContent, 'utf8');
    console.log('Script extracted successfully!');
} else {
    console.log('Script not found in index.html');
}
