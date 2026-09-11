import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We know the script starts with (()=>{"use strict";
start_idx = content.find('(()=>{"use strict";')
if start_idx != -1:
    # We want to find the end of the script string. The script is inside a JS string const instagramScript = "...";
    # So we can just find the closing "; right after the end of the code.
    # The code should end with })();
    end_idx = content.rfind('})();', start_idx)
    if end_idx != -1:
        script = content[start_idx:end_idx + 5] # Include })();
        # Because it was inside a JS string, it might have escaped quotes like \"
        # We need to replace \" with " and \\ with \
        script = script.replace('\\"', '"').replace('\\\\', '\\')
        with open('Instagram_Unfollowers.js', 'w', encoding='utf-8') as out:
            out.write(script)
        print("Success! Saved as Instagram_Unfollowers.js")
    else:
        print("Could not find the end of the script.")
else:
    print("Could not find start.")
