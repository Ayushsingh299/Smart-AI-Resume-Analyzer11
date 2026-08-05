import os
import glob
import re

for file in glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # Replace headers: { 'Authorization': `Bearer ${token}` } with credentials: 'include'
    new_content = re.sub(r"headers:\s*\{\s*\'Authorization\':\s*`Bearer \$\{token\}`\s*\}", "credentials: 'include'", new_content)
    
    new_content = re.sub(r"headers:\s*\{\s*\'Authorization\':\s*`Bearer \$\{localStorage\.getItem\(\'token\'\)\}`\s*\}", "credentials: 'include'", new_content)
    
    new_content = re.sub(r"headers:\s*\{\s*\"Authorization\":\s*`Bearer \$\{token\}`\s*\}", "credentials: 'include'", new_content)
    
    new_content = re.sub(r"headers:\s*\{\s*\'Authorization\':\s*`Bearer \$\{data\.access_token\}`\s*\}", "credentials: 'include'", new_content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file}')
