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
