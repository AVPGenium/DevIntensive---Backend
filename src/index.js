import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    'Hello': 'Hello',
  })
});

app.get('/task2A', (req, res) => {
    const sum = (+req.query.a || 0) + (+req.query.b || 0);
    res.send(sum.toString());
});

app.get('/task2B', (req, res) => {
    const fullname = req.query.fullname;
    if(fullname.split(" ").length > 3 || fullname.split(" ").length < 1 || fullname ==''){
      res.send('Invalid fullname');
    }
    var shortName = "";
    var re=/^(?:[в-яёa-z]*[а-яёa-z][в-яёa-z]*$|[в-яёa-z]*\d[в-яёa-z][в-яёa-z]*$)/i
    // /(?:[а-яА-ЯЁёa-zA-Z])/i;
    shortName += fullname.split(" ")[fullname.split(" ").length-1];
    if (!re.test(shortName)) {
       res.send('Invalid fullname');
    }
    if(fullname.split(" ").length > 1){
      if (!re.test((fullname.split(" ")[0])[0])) {
         res.send('Invalid fullname');
      }
      shortName += ' ';
      shortName += ((fullname.split(" ")[0])[0] + '.');
    }
    if(fullname.split(" ").length > 2){
      if (!re.test((fullname.split(" ")[1])[0])) {
         res.send('Invalid fullname');
      }
      shortName += ' ';
      shortName += ((fullname.split(" ")[1])[0] + '.');
    }
    res.send(shortName.toString());
});

app.get('/task2C', (req, res) => {
  const username = canonize(req.query.username);
  res.send(username.toString());
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
