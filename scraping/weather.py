from selenium import webdriver
driver = webdriver.Chrome('/Users/seungeunlee/Desktop/Fintech2021/scraping/chromedriver')
driver.get('http://www.weather.go.kr/weather/forecast/timeseries.jsp')

date = driver.find_element_by_xpath('//*[@id="dfs-panel"]/div[4]/table/tbody/tr[1]/th[2]')
print(date.text+"날씨를 알려드립니다.")
for i in range (1,9):
    time = driver.find_element_by_xpath('//*[@id="dfs-panel"]/div[4]/table/tbody/tr[2]/td['+str(i)+']/p')
    temp = driver.find_element_by_xpath('//*[@id="dfs-panel"]/div[4]/table/tbody/tr[7]/td['+str(i)+']/p')
    print(time.text+'시의 기온(℃) : '+temp.text)



