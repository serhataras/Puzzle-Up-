# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item, Field
 
class CrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class crosswordItem(scrapy.Item):
    number = Field()
    clue = Field()
 
class crosswordGridItem(scrapy.Item):
    gridType = Field()


class crosswordHolder(scrapy.Item):
    # define the fields for your item here like:
    date = Field()
    author = Field()
    left = Field()
    right = Field()
    Grid = Field()
