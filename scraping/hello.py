from selenium import webdriver
driver = webdriver.Chrome('/Users/seungeunlee/Desktop/Fintech2021/scraping/chromedriver')
driver.implicitly_wait(3)
driver.get(
    'https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=100&oid=005&aid=0001333549')