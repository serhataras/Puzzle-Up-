@ECHO OFF
title New York Times Crossword Crawler!	
chdir /d D:\GitHub Projects\PuzzleUp\crawler\crawler\data
SET dateext = _%date:~-4,4%%date:~-7,2%%date:~-10,2%
scrapy crawl scrapper -o test.json 
ren  "test.json" "_%date:~-4,4%%date:~-7,2%%date:~-10,2%.json"
echo Crawling Completed!

git config --global user.name "Serhat Aras"
git config --global user.email "srharas@gmail.com"
git config --global color.ui true
git add --all
git commit -m "Crawled data of _%date:~-4,4%%date:~-7,2%%date:~-10,2%.json"
git status 
git push -u origin master
pause