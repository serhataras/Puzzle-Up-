# -*- coding: utf-8 -*-

import scrapy

from crawler.items import crosswordItem, crosswordHolder, crosswordGridItem

class testSpider(scrapy.Spider):
    name = "crawler"
    allowed_domains = ["www.nytimes.com"]
    start_urls = ["https://www.nytimes.com/crosswords/game/mini"]        
        
    def parse(self, response):
        crossword = crosswordHolder()
        crossword['date'] = response.css('div.PuzzleDetails-date--1HNzj ::text').extract()
        crossword['author'] = response.css('div.PuzzleDetails-byline--16J5w > span::text').extract()
        
        #Across
        temp_crosswordItem_list=list()
        temp_crosswordItem_list.append(response.css('div.ClueList-wrapper--3m-kd:nth-child(1) > h3:nth-child(1)::text').extract())
       
        crossword_left = response.css('#root > div > div > div.app-mainContainer--3CJGG > div > main > div.layout > div > article > section.Layout-clueLists--10_Xl > div:nth-child(1)')                             
        for item in crossword_left:
            crossword_Item = crosswordItem()
            crossword_Item['number'] = item.css('.Clue-label--2IdMY::text').extract()
            crossword_Item['clue'] = item.css('.Clue-text--3lZl7::text').extract()
            temp_crosswordItem_list.append(crossword_Item)
        crossword['left'] = temp_crosswordItem_list 

        #Down
        crossword_right = response.css('#root > div > div > div.app-mainContainer--3CJGG > div > main > div.layout > div > article > section.Layout-clueLists--10_Xl > div:nth-child(2)')    
        temp_crosswordItem_list=list()
        temp_crosswordItem_list.append(response.css('div.ClueList-wrapper--3m-kd:nth-child(2) > h3:nth-child(1)::text').extract())
        for item in crossword_right:
            crossword_Item = crosswordItem()
            crossword_Item['number'] = item.css('.Clue-label--2IdMY::text').extract()
            crossword_Item['clue'] = item.css('.Clue-text--3lZl7::text').extract()
            temp_crosswordItem_list.append(crossword_Item)           
        crossword['right'] = temp_crosswordItem_list 

        #Grid
        temp_crosswordGrid_list=list()
        crossword_Grid = response.css('#xwd-board > g:nth-child(3)')
        for grid in crossword_Grid:
            crossword_grid = crosswordGridItem()
            crossword_grid['gridType'] = grid.xpath(' //*[@id="xwd-board"]/g[1]/g').extract()              
            temp_crosswordGrid_list.append(crossword_grid)

        crossword['Grid'] = temp_crosswordGrid_list     
        return crossword   
                