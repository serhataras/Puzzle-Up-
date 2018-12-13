@ECHO OFF

title New York Times Crossword Crawler!	

chdir /d D:\Github\Puzzle-Up\crawler\
echo "%date:~-7,2%-%date:~-10,2%-%date:~-4,4%.json" 
chdir ..
.\crawler\Scripts\activate  
python crawler.py

echo Crawling Completed!

git config --global user.name "Serhat Aras"
git config --global user.email "srharas@gmail.com"
git config --global color.ui true
git add --all
git commit -m "Crawled Crossword Data of "%date:~-10,2%-%date:~-7,2%-%date:~-4,4%.json ."
git status 
git push -u origin master
echo Push Complete!

echo <<<<<<<<GoodBye>>>>>>>>