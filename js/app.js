'use strict'

const hornArr = [];

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON' })
  .then(hornInf => {
    hornInf.forEach(horn => {
      new Horn(horn).render();
    })
  })
  .then(() => Horn.dropDown());