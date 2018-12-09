const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const Odoo = require('odoo-xmlrpc')

app.listen(port, () => console.log(`Listening on port ${port}`))

const odoo = new Odoo({
  url: `http://localhost:8069`,
  db: `proj10_react`,
  username: `admin`,
  password: `****`
})

app.get('/event_lists', (req, res) => {
  odoo.connect(function(err) {
    if (err) {
      return console.log(err)
    }
    console.log('Connected to Odoo server.')
    let inParams = []
    let domain = [
      ['active', '=', true]
    ]

    inParams.push(domain)
    let params = []
    params.push(inParams)
    params.push({ fields: ['name','date_begin','date_end'], limit: 5 })
    odoo.execute_kw('event.event', 'search_read', params, function(err, value) {
      if (err) {
        return console.log(err)
      }
      res.send({
        events: value
      })
    })
  })
})
