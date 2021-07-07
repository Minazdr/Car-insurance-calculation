// variables
const form = document.querySelector('#request-quote')


// eventListeners

eventListeners()

function eventListeners() {

          document.addEventListener('DOMContentLoaded', function () {
                    html.displayYears()

          })

          form.addEventListener('submit', function (e) {
                    e.preventDefault

                    const make = document.getElementById('make').value
                    const year = document.getElementById('year').value
                    const level = document.querySelector('input[name = "level"]:checked').value

                    if (make === '' || year === '' || level === '') {
                              html.displayError("همه مقادیر را وارد کنید")

                    } else {
                              let resultDiv = document.querySelector('#result div')
                              if (resultDiv !== null) {
                                        resultDiv.remove()
                              }
                              const insurance = new INSURANCE(make, year, level)
                              const price = insurance.calculatePrice(insurance)
                              html.showResult(price, insurance)
                    }
          })
}


// objects

let INSURANCE = function (make, year, level) {
          this.make = make
          this.year = year
          this.level = level
}



// calculating the price
INSURANCE.prototype.calculatePrice = function (info) {
          let price;
          let base = 2000000

          // get make value
          const make = info.make

          /*
          make:1 ==> pride
          male:2 ==> optima
          make:3 ==> porches
      
          */

          switch (make) {
                    case '1':
                              price = base * 1.15;
                              break;

                    case '2':
                              price = base * 1.30;
                              break;

                    case '3':
                              price = base * 1.80;
                              break;
          }

          // get the year 
          const year = info.year;
          const difference = this.getYearDifference(year)

          // 3% cheaper for each year
          price = price + (((difference * 3) / 100) * price)


          // get the level
          const level = info.level
          if (level === 'basic') {
                    price = price * 1.30

          } else {
                    price = price * 1.50
          }

          return price


}

//
INSURANCE.prototype.getYearDifference = function (year) {
          let
                    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
                    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
                    fixNumbers = function (str) {
                              if (typeof str === 'string') {
                                        for (var i = 0; i < 10; i++) {
                                                  str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                                        }
                              }
                              return str;
                    };


          // get max year
          const now = new Date().toLocaleDateString('fa-IR');
          let nowYear = now.slice(0, 4);
          let max = fixNumbers(nowYear);

          year = year - max;
          return year;
}


// function HTMlUI() { }
let HTMlUI = function () { }

const html = new HTMlUI;

HTMlUI.prototype.displayYears = function () {
          let
                    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
                    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
                    fixNumbers = function (str) {
                              if (typeof str === 'string') {
                                        for (var i = 0; i < 10; i++) {
                                                  str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                                        }
                              }
                              return str;
                    };


          // get max year
          const now = new Date().toLocaleDateString('fa-IR');
          let nowYear = now.slice(0, 4),
                    max = fixNumbers(nowYear);

          // min year
          let min = max - 20

          // access to the select tag
          const selectYear = document.querySelector('#year')

          for (let i = max; i >= min; i--) {
                    const option = document.createElement('option')

                    option.value = i;
                    option.innerHTML = i;

                    selectYear.appendChild(option)
          }
}


// display error on the form
HTMlUI.prototype.displayError = function (err) {

          const div = document.createElement('div')

          div.classList = "error";
          div.innerHTML = err

          // insert error on the form
          form.insertBefore(div, document.querySelector('.form-group'))

          // remove error after 3second
          setTimeout(() => {
                    document.querySelector('.error').remove()

          }, 3000);
}


// display factor to the form
HTMlUI.prototype.showResult = function (price, info) {
          const result = document.querySelector('#result');

          const div = document.createElement('div');

          let make = info.make;

          switch (make) {
                    case '1':
                              make = 'پراید';
                              break;

                    case '2':
                              make = 'دنا';
                              break;

                    case '3':
                              make = 'پورشه';
                              break;
          }

          let level = info.level;

          switch (level) {
                    case 'basic':
                              level = 'ساده';
                              break;

                    case 'complete':
                              level = 'کامل';
                              break;
          }

          let year = info.year;


          div.innerHTML = `
    <p class="header">خلاصه فاکتور</p>
    <p>برند ماشین: ${make}</p>
    <p>کاربری ماشین: </p>
    <p>سال ساخت: ${year}</p>
    <p>نوع بیمه: ${level}</p>
    <p class="total">قیمت نهایی :${price} </p>
    `


          // show spinner
          const spinner = document.querySelector('#loading img')
          spinner.style.display = 'block'

          setTimeout(() => {
                    spinner.style.display = 'none'
                    result.appendChild(div)

          }, 3000);
}


