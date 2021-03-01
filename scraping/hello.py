from selenium import webdriver
driver = webdriver.Chrome('/Users/seungeunlee/Desktop/Fintech2021/scraping/chromedriver')
driver.implicitly_wait(3)
driver.get(
    'https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=105&oid=138&aid=0002099390')
title = driver.find_element_by_id('articleTitle')
body = driver.find_element_by_id('articleBodyContents')
print(title.text)
print(body.text)