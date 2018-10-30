@ECHO OFF
title New York Times Crossword Crawler!	
chdir /d ************************************
SET dateext = _%date:~-4,4%%date:~-7,2%%date:~-10,2%
IF EXIST "%date:~-4,4%%date:~-7,2%%date:~-10,2%.json" (
   	echo "Already crawled the data from NY Times for %date:~-10,2%-%date:~-7,2%-%date:~-4,4%, no need to scrape again!"
) ELSE (
	scrapy crawl scrapper -o test.json 
   	 ren  "test.json" "%date:~-4,4%%date:~-7,2%%date:~-10,2%.json"
)
echo Crawling Completed!
git config --global user.name "Serhat Aras"
git config --global user.email "*************"
git config --global color.ui true
git add --all
git commit -m "Crawled data of %date:~-4,4%%date:~-7,2%%date:~-10,2%.json"
git status 
git push -u origin master
echo Push Complete!
echo <<<<<<<<GoodBye>>>>>>>>