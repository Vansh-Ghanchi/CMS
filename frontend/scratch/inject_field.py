import sys
import re

path = r"c:\Users\VANSH\OneDrive\Desktop\homework\homework\frontend\src\pages\admin\FacultyManagement.jsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Use regex to be flexible with whitespace
pattern = r'(</select>\s+<ChevronDown[^>]+/>\s+</div>\s+</div>)'
replacement = r'\1\n\n               <div className="space-y-2">\n                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>\n                  <div className="relative">\n                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />\n                     <input \n                       type="text" \n                       name="fullName"\n                       value={resetForm.fullName}\n                       onChange={handleResetChange}\n                       readOnly\n                       placeholder="Select faculty to autofill"\n                       className="w-full h-14 bg-slate-50 border-none rounded-2xl border border-slate-100 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none opacity-80" \n                     />\n                  </div>\n               </div>'

new_content = re.sub(pattern, replacement, content)

if new_content != content:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Done")
else:
    print("Pattern not found")
