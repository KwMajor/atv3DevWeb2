const express = require('express');

const mysql = require('mysql2');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Conexão com MySQL

const db = mysql.createConnection({

host: 'localhost',

user: 'root',

password: 'MatheusRamos1!',

database: 'crud'

});

db.connect(err => {

if (err) throw err;

console.log('Conectado ao MySQL!');

});

// CREATE

app.post('/projetos', (req, res) => {

const { nome, descricao, link } = req.body;

const sql = 'INSERT INTO projetos (nome, descricao) VALUES (?, ?)';

db.query(sql, [nome, descricao, link], (err, result) => {

if (err) return res.status(500).send(err);

res.send({ id: result.insertId, nome, descricao });

});

});

// READ todos

app.get('/projetos', (req, res) => {

db.query('SELECT * FROM projetos', (err, results) => {

if (err) return res.status(500).send(err);

res.send(results);

});

});

// READ por ID

app.get('/projetos/:id', (req, res) => {

db.query('SELECT * FROM projetos WHERE id = ?', [req.params.id], (err, result) => {

if (err) return res.status(500).send(err);

if (result.length === 0) return res.status(404).send({ mensagem: 'Projeto não encontrado' });

res.send(result[0]);

});

});


// UPDATE

app.put('/projetos/:id', (req, res) => {

const { nome, descricao, link } = req.body;

const sql = 'UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?';

db.query(sql, [nome, descricao, link, req.params.id], (err) => {

if (err) return res.status(500).send(err);

res.send({ mensagem: 'Projeto atualizado com sucesso' });

});

});


// DELETE

app.delete('/projetos/:id', (req, res) => {

db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], (err) => {

if (err) return res.status(500).send(err);

res.send({ mensagem: 'Projeto excluído com sucesso' });

});

});

app.post('/about_index', (req, res) => {
  const { texto, link1, link2 } = req.body;
  const sql = 'INSERT INTO about_index (texto, link1, link2) VALUES (?, ?, ?)';
  db.query(sql, [texto, link1, link2], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, texto, link1, link2 });
  });
});

app.get('/about_index', (req, res) => {
    db.query('select * from about_index', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.get('/about_index/:id', (req, res) => {
    db.query('select * from about_index where id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ mensagem: 'Conteúdo não encontrado'});
        res.send(result[0]);
    });
});

app.put('/about_index/:id', (req, res) => {
    const { texto, link1, link2 } = req.body;
    const sql = 'update about_index set texto = ?, link1 = ?, link2 = ? where id = ?';
    db.query(sql, [texto, link1, link2, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ mensagem: 'Conteúdo atualizado com sucesso' });
    });
});

app.delete('/about_index/:id', (req, res) => {
    db.query('delete from about_index where id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ mensagem: 'Conteúdo excluído com sucesso'});
    });
});

app.post('/formacao', (req, res) => {
    const {instituicao, curso, anoDeConclusao} = req.body;
    const sql = 'insert into formacao (instituicao, curso, anoDeConclusao) values (?, ?, ?)';
    db.query(sql, [instituicao, curso, anoDeConclusao], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({id: result.insertId, instituicao, curso, anoDeConclusao});
    });
});

app.get('/formacao', (req, res) => {
    db.query('select * from formacao', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.get('/formacao/:id', (req, res) => {
    db.query('select * from formacao where id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ mensagem: 'Certificado não encontrado'});
        res.send(result[0]);
    });
});

app.put('/formacao/:id', (req, res) => {
    const {instituicao, curso, anoDeConclusao} = req.body;
    const sql = 'update formacao set instituicao = ?, curso = ?, anoDeConclusao = ? where id = ?';
    db.query(sql, [instituicao, curso, anoDeConclusao, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ mensagem: 'Formção atualizada com sucesso' });
    });
});

app.delete('/formacao/:id', (req, res) => {
    db.query('delete from formacao where id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ mensagem: 'Formação excluída com sucesso' });
    });
});



// Iniciar servidor

app.listen(3000, () => {

console.log('Servidor rodando em http://localhost:3000');

});
