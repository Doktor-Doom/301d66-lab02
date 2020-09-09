'use strict'

const hornArr = [];

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON' })
  .then(hornInf => {
    hornInf.forEach(horn => {
      new Horn(horn).render();
    })
  })
  .then(() => Horn.dropDown());

class Horn {
  constructor(object) {
    this.imgUrl = object.image_url;
    this.title = object.title;
    this.description = object.description;
    this.keyword = object.keyword;
    this.horns = object.horns;
    hornArr.push(this);
  }
}

