# Gulp template
1. npm i
2. gulp - for start gulp
3. gulp build - production

### To deploy app
1. npm run deploy
2. open url https://{login GitHub}.github.io/{repository name}/

### For fix styles with Stylelint
.stylelintrc - Stylelint rules</br>
.stylelintignore - Stylelint ignore

1. npm run stylelint - for see errors
2. npm run stylelint:fix - for fix errors

for auto fix in VsCode, added this line to settings.json:<br>
"editor.codeActionsOnSave": {"source.fixAll.stylelint": true}<br>

for see errors in file:
1. VsCode: install stylelint in the app store
2. IDE from JetBrains: Settings > Stylelint (in search) > tick enable

### For fix another code with Prettier
.prettierrc.json - Prettier rules

for fix in VsCode:
1. install prettier in the app store
2. right-click on the document
3. Format Document With
4. Configure Default Formatter...
5. Choose Prettier - Code formatter

for auto fix in VsCode, added this line to settings.json:<br>
"editor.formatOnSave": true,

for fix in IDE from JetBrains:
1. Settings > Plugins > Marketplace > search prettier and install
2. Search in settings prettier and tick this points:<br>
On code reformat and On save
3. Ctrl + Alt + Shift + P for format document
