import json
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const instagramScript = "(.*?)";\s*scriptLabel', content, re.DOTALL)
if match:
    script_str = match.group(1)
    # The string is Javascript encoded in double quotes. 
    # Let's decode it by loading it as JSON string
    script_content = json.loads('"' + script_str + '"')
    with open('unfollowers_script.js', 'w', encoding='utf-8') as f:
        f.write(script_content)
    print("Successfully written to unfollowers_script.js")
else:
    print("Could not extract the script. Checking for other patterns.")
    # Maybe it ends differently
    match = re.search(r'const instagramScript = "(.*?)";', content, re.DOTALL)
    if match:
        script_str = match.group(1)
        script_content = json.loads('"' + script_str + '"')
        with open('unfollowers_script.js', 'w', encoding='utf-8') as f:
            f.write(script_content)
        print("Successfully written to unfollowers_script.js")
    else:
        print("Still failed to extract.")
