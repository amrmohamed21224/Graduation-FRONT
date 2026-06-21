import os
import re

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 1. Remove chatboot CSS block
            content = re.sub(r'<!--\s*chatboot\s*-->\s*<link[^>]*>.*?</style>\s*', '', content, flags=re.DOTALL)
            
            # 2. Remove chatboot UI block
            content = re.sub(r'<!--\s*chatboot\s*-->\s*<div[^>]*pobap-chat.*?<!--end\s*chatboot\s*-->\s*', '', content, flags=re.DOTALL)
            
            # 3. Remove chatboot JS block
            content = re.sub(r'<!--\s*chatboot\s*-->\s*(?:<script>.*?</script>\s*)+?(?=</body>)', '', content, flags=re.DOTALL)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Cleaned {filepath}")
