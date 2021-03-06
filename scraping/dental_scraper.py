# -*- coding: utf-8 -*-
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 가격 표시에서 ","를 제거해주는 함수
def rePlaceData(value):
    numbers = re.findall("\d+", value)
    result = ""
    for i in numbers:
        decodedNumber = i
        result += decodedNumber
    return result


# AIA 스크래핑 함수
def getAIAData(name, birth, gender):
    driver = webdriver.Chrome('/Users/seungeunlee/Desktop/Fintech2021/scraping/chromedriver')

    # 간단하게 구조체라고 생각.
    scrapingResult = {
        'company': "AIA",
        'price': 0,
        'contents': []
    }

    driver.implicitly_wait(3)
    driver.get(
        'https://www.aia.co.kr/ko/our-products/medical-protection/non-par-denteal-health-plan.html#')
    driver.implicitly_wait(3)

    # name.decode('utf-8').encode('euc-kr')
    # 생년월일
    textBox = driver.find_element_by_xpath('//*[@id="aia644363719"]')
    textBox.send_keys("19"+birth)

    # 성별
    if gender == 0:
        femaleBtn = driver.find_element_by_xpath(
            '//*[@id="calculator-container-form"]/div[1]/div[2]/div/div[1]/div/div[3]/div[1]/div[1]')
        # '//*[@id="calculator-container-form"]/div[1]/div[2]/div/div[1]/div/div[3]/div[1]/div[1]

        femaleBtn.click()
    else:
        maleBtn = driver.find_element_by_xpath(
            '//*[@id="calculator-container-form"]/div[1]/div[2]/div/div[1]/div/div[3]/div[1]/div[2]')
        maleBtn.click()
    resultBtn = driver.find_element_by_xpath('//*[@id="btn806817556"]')
    resultBtn.click()
    driver.implicitly_wait(3)

    htmlResult = driver.find_element_by_xpath(
        '//*[@id="premium-by-timespan-value"]').text
    resultValue = rePlaceData(htmlResult)
    print(resultValue)
    scrapingResult['price'] = resultValue
    tableBody = driver.find_element_by_xpath(
        '//*[@id="collapse-large-724022276"]/div[1]/div/table').find_element_by_tag_name('tbody')
    driver.find_element_by_xpath(
        '//*[@id="the_fine_print"]/div[2]/div[1]/div[2]/div/a[2]').click()
    rows = tableBody.find_elements_by_tag_name("tr")
    contentsList = []
    for index, value in enumerate(rows):
        if index != 0:
            print(value.find_elements_by_tag_name('td')[0].text)
            contentsList.append(value.find_elements_by_tag_name('td')[
                                0].text)
    scrapingResult['contents'] = contentsList
    return scrapingResult

# 라이나 생명 스크래핑 함수
def getLinaData(name, birth, gender):
    driver = webdriver.Chrome('/Users/seungeunlee/Desktop/Fintech2021/scraping/chromedriver')
    scrapingResult = {
        'company': "라이나",
        'price': 0,
        'contents': []
    }
    driver.get('https://direct.lina.co.kr/product/ess/dtc01/easy')
    textBox = driver.find_element_by_xpath('//*[@id="birthday"]')
    textBox.send_keys(birth)
    #femaleBtn = driver.find_element_by_xpath('//*[@id="main_btn_female"]')
    femaleBtn = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="main_btn_female"]')))
    print(gender)
    
    if gender == 0:
        #femaleBtn = driver.find_element_by_xpath('//*[@id="main_btn_female"]')
        #femaleBtn = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="main_btn_female"]')))
        femaleBtn.click()
        resultBtn = driver.find_element_by_xpath('//*[@id="btn_direct_dental_cal"]')
        resultBtn.click()
        
    else:
        maleBtn = driver.find_element_by_xpath('//*[@id="main_btn_male"]')
        maleBtn.click()
        resultBtn = driver.find_element_by_xpath('//*[@id="btn_direct_dental_cal"]')
        resultBtn.click()
        

    
    #resultBtn = driver.find_element_by_xpath('//*[@id="btn_direct_dental_cal"]')
    
    #resultBtn.click()
    driver.implicitly_wait(6)

    htmlResult = driver.find_element_by_id('mo_amount_span').text
    resultValue = rePlaceData(htmlResult)
    scrapingResult['price'] = resultValue
    driver.implicitly_wait(2)
    detailBtn = driver.find_element_by_xpath('//*[@id="openLayerplanPonA2"]')
    detailBtn.click()
    driver.implicitly_wait(2)

    tableBody = driver.find_element_by_xpath(
        '//*[@id="planPonA2"]/div/div[2]/div/div/table[1]').find_element_by_tag_name('tbody')
    rows = tableBody.find_elements_by_tag_name("tr")
    contentsList = []
    for index, value in enumerate(rows):
        if index != 0:
            print(value.find_elements_by_tag_name('th')[0].text)
            contentsList.append(value.find_elements_by_tag_name('th')[
                                0].text)
    scrapingResult['contents'] = contentsList
    return scrapingResult


#getAIAData('유관우', '890119', 0)
#getLinaData('유관우', '890119', 0)