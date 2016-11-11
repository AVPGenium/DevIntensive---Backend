import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());

 function clean(arr, deleteValue){
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i] == deleteValue)
        {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
};

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
    var fullname = req.query.fullname;
    var parts = fullname.split(" ");
    parts = clean(parts, null);
    parts = clean(parts, "");
    parts = clean(parts, undefined);
    console.log('Parts:', parts);
    if(parts.length > 3 || parts.length < 1 || fullname ==''){
      res.send('Invalid fullname');
    }
    var shortName = "";
    shortName += parts[parts.length-1];
    var re = new RegExp('([0-9_/])', 'i');
    if(re.test(shortName)){
      res.send('Invalid fullname');
    }
    shortName = (shortName[0].toUpperCase() + shortName.slice(1).toLowerCase())
    if(parts.length > 1){
      if (re.test(parts[0])) {
         res.send('Invalid fullname');
      }
      shortName += ' ';
      shortName += ((parts[0])[0].toUpperCase() + '.');
    }
    if(fullname.split(" ").length > 2){
      if (re.test(parts[1])) {
         res.send('Invalid fullname');
      }
      shortName += ' ';
      shortName += ((parts[1])[0].toUpperCase() + '.');
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
