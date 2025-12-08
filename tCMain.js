const quote = require('./lib/quote')
const express = require('express')
//const expressHandlebars = require('express-handlebars')
const { engine } = require('express-handlebars') // ← измените эту строку
const app = express()



// Настройка механизма представлений Handlebars.
//app.engine('handlebars', expressHandlebars({
//defaultLayout: 'main',
//}))
//app.set('view engine', 'handlebars')



app.engine('handlebars', engine({  // ← используйте engine
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT||3000

app.get('/', (req, res) => {

res.render('home', { quote: quote.getQuote() } )
})

/*app.get('/', (req, res) => {
    console.log('=== НАЧАЛО ОБРАБОТКИ / ===');
    console.log('Массив quotes существует?', typeof quotes !== 'undefined');
    console.log('Длина массива quotes:', quotes ? quotes.length : 'массив не определен');
    
    if (!quotes || quotes.length === 0) {
        console.error('ОШИБКА: Массив quotes пуст или не определен!');
        return res.render('home', { quote: "Цитаты временно недоступны" });
    }
    
    const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
    console.log('Выбрана цитата:', randomQuote);
    
    // Явно передаем объект с цитатой
    const context = {
        quote: randomQuote,
        testVar: 'Тестовая переменная'
    };
    console.log('Передаем в шаблон:', context);
    
    res.render('home', context);
    console.log('=== КОНЕЦ ОБРАБОТКИ / ===');
});*/

app.get('/about', (req, res) => res.render('about')) 



//app.use(express.static('public')) // ← Вот это важно!
app.use(express.static(__dirname + '/public'))

//Пользовательская страница 404
app.use((req, res)=>{
  res.status(404)
  res.send('404')
  })

//Пользовательская страница 500
app.use((err, req, res, next)=>{
  console.error(err.message)
  res.status(500)
  res.send('500')
})

app.listen(port, () => console.log(
`Express запущен на }; ` +
`нажмите Ctrl+C для завершения.` ))