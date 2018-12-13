from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException

import datetime
import json

#1st import: Allows you to launch/initialise a browser.
#2nd import: Allows you to search for things using specific parameters.
#3rd import: Allows you to wait for a page to load.
#4th import: Specify what you are looking for on a specific page in order to determine that the webpage has loaded.
#5th import: Handling a timeout situation.



acrossdownXpath = '//*[@id="root"]/div/div[1]/div[4]/div/main/div[2]/div/article/section[2]/div[2]'

# Specifying incognito mode as you launch your browser[OPTIONAL]
option = webdriver.ChromeOptions()
option.add_argument("incognito")
#option.add_argument("headless")
#option.add_argument("--ignore-certificate-errors-spki-list")
#option.add_argument("--ignore-ssl-errors")
#option.add_argument('--disable-browser-side-navigation')
# Create new Instance of Chrome in incognito mode
browser = webdriver.Chrome(executable_path='./chromedriver.exe', options=option)
# Go to desired website
browser.get("https://www.nytimes.com/crosswords/game/mini")

# Wait 20 seconds for page to load
timeout = 5



print("\nPage Loaded\n")
print("\n\n***************************")
print("***************************")
print("Crawling begin at: ", datetime.datetime.now(), " from https://www.nytimes.com/crosswords/game/mini", )
print("***************************")
print("***************************")


##
# Crawling Begings
##

############
# Reveal Click operation and grid retrival
#
reveal = '//*[@id="root"]/div/div/div[4]/div/main/div[2]/div/div/ul/div[1]/li[2]'
puzzle = '//*[@id="root"]/div/div/div[4]/div/main/div[2]/div/div/ul/div[1]/li[2]/ul/li[3]'
revealPuzzleButtonXpath = '//*[@id="root"]/div/div[2]/div[2]/article/div[2]/button[2]'


# using find_elements
print("\nModal's OK Button clicked :\n")
go = browser.find_element_by_css_selector('#root > div > div > div.app-mainContainer--3CJGG > div > main > div.layout > div > div.Veil-veil--1z4yB.Veil-stretch--2GHPc > div.ModalBody-body--3PkKz > article > div.buttons-modalButtonContainer--35RTh > button > div')
go.click()
print('\nReveal Button clicked :\n')
go = browser.find_elements_by_xpath(reveal)[0]
go.click()
print('\n Puzzle Button clicked :\n')
go = browser.find_elements_by_xpath(puzzle)[0]
go.click()
print('\n Reveal Button clicked :\n')
go = browser.find_elements_by_xpath(revealPuzzleButtonXpath)[0]
go.click()




############
# Grid 
#
print('\n######\n')
print("Crawling started for Clues using -XPATH : #xwd-board > g:nth-child(3) > g")
print('\nData extracted :\n\n')
grid = []
i=1
while i<=25:
    css = '#xwd-board > g:nth-child(3) > g:nth-child('+str(i)+')'
    #XPATH=('//*[@id="xwd-board"]/g[1]/g['+str(i) +']')
    #grid_elements = browser.find_element_by_xpath(XPATH)
    grid_elements = browser.find_element_by_css_selector(css)
    grid.append(grid_elements.get_attribute("innerHTML"))
    print(grid[i-1],'\n')
    i = i + 1
print("\nCrawling ended.")
############
# Grid Parsing
#
pairArray = []
BlockedClassStr = 'Cell-block--1oNaD'
NormalClassStr = 'Cell-cell--1p4gH'
for i in range(25) :
    pair = [1,1]
    if ( grid[i].find(BlockedClassStr) == -1):
        firstIndex=grid[i].find('</text>')
        pair[0]=grid[i][firstIndex-1]
        lastIndex=grid[i].find('</text>',firstIndex+8)
        if(lastIndex==-1):
            pair[1]=pair[0]
            pair[0]=None
        else :
            pair[1]=grid[i][lastIndex-1]
    else :   
        pair[1]=-1
        pair[0]=-1
    pairArray.append(pair)
print(pairArray)

############
# Clues
#
print('\n######\n')
print("Crawling started for Clues using -XPATH : //SPAN[@class='Clue-text--3lZl7']/self::SPAN ")
CluesXPATH = "//SPAN[@class='Clue-text--3lZl7']/self::SPAN"
clue_elements = browser.find_elements_by_xpath(CluesXPATH)
clues = [x.text for x in clue_elements]
print('\nData extracted :\n')
print(clues,'\n')
print("Crawling ended.")
############
# Clue Numbers
#
print('\n######\n')
print("Crawling started for Clue Numbers using -XPATH : //SPAN[@class='Clue-label--2IdMY']/self::SPAN")
NumbersXPATH = "//SPAN[@class='Clue-label--2IdMY']/self::SPAN"
clueNumbers_elements = browser.find_elements_by_xpath(NumbersXPATH)
clueNumbers = [x.text for x in clueNumbers_elements]
print('\nData extracted :\n')
print(clueNumbers,'\n')
print("Crawling ended.")
############
#Titles
#
print('\n######\n')
print("Crawling started for Clue Titles using -XPATH : //H3[@class='ClueList-title--1-3oW']/self::H3")
titlesXPATH = "//H3[@class='ClueList-title--1-3oW']/self::H3"
titles_elements = browser.find_elements_by_xpath(titlesXPATH)
titles = [x.text for x in titles_elements]
print('\nData extracted :\n')
print(titles,'\n')
print("Crawling ended.")
############
# Date 
#
print('\n######\n')     
print("Crawling started for Date using -XPATH : //DIV[@class=PuzzleDetails-date--1HNzj']/self::DIV ")
dateXPATH = "//DIV[@class='PuzzleDetails-date--1HNzj']/self::DIV"
date_element = browser.find_elements_by_xpath(dateXPATH)
date = [x.text for x in date_element]
print('\nData extracted :\n')
print(date,'\n')
print("Crawling ended.")
############
# Author
#
print('\n######\n')
print("Crawling started for Puzzle Details using -XPATH : //DIV[@class='PuzzleDetails-byline--16J5w']/self::DIV")
detailXPATH = "//DIV[@class='PuzzleDetails-byline--16J5w']/self::DIV"
detail_element = browser.find_elements_by_xpath(detailXPATH)
details = [x.text for x in detail_element]
print('\nData extracted :\n')
print(details,'\n')
print("Crawling ended.")
# print Title in terminal

data = {}

data['grid'] = pairArray
data['clues'] = clues
data['clueNumbers'] = clueNumbers
data['titles'] = titles
data['date'] = date
data['details'] = details

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)


print (json.dumps(data))

writeToJSONFile('data',datetime.datetime.today().strftime('%d-%m-%Y'),data)

browser.quit()