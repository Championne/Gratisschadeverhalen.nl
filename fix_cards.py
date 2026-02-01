import re

file_path = '/root/clawd-work/localcontent_ai/app/dashboard/content/page.tsx'
with open(file_path, 'r') as f:
    content = f.read()

changes = 0

# Fix 2: Remove old floating platform badge
old_badge = '''                  {/* Platform Badge */}
                  <div className={`absolute -top-3 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm ${info.bgColor} ${info.color} border border-white`}>
                    {info.icon}
                    <span>{info.name}</span>
                  </div>'''
if old_badge in content:
    content = content.replace(old_badge, '')
    changes += 1
    print('Removed floating platform badge')

# Fix 3: Replace copy button overlay with footer bar containing badge + copy
old_copy = '''                  {/* Copy button overlay */}
                  <button
                    onClick={() => handleCopy(fullContent, platform)}
                    className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 shadow-lg ${
                      copied === platform 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {copied === platform ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>'''

new_footer = '''                  {/* Footer bar with platform badge and copy */}
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-200">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${info.bgColor} ${info.color}`}>
                      {info.icon}
                      <span>{info.name}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(fullContent, platform)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                        copied === platform 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {copied === platform ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>'''

if old_copy in content:
    content = content.replace(old_copy, new_footer)
    changes += 1
    print('Added footer bar with platform badge and copy button')

# Fix 4: Update card wrapper to not be relative/group (footer handles it now)
old_wrapper = '<div key={platform} className="relative group">'
new_wrapper = '<div key={platform} className="rounded-xl border border-gray-200 overflow-hidden bg-white">'
if old_wrapper in content:
    content = content.replace(old_wrapper, new_wrapper)
    changes += 1
    print('Updated card wrapper styling')

with open(file_path, 'w') as f:
    f.write(content)
    
print(f'Total changes: {changes}')
