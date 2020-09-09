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

Horn.prototype.render = function() {
  const template = $('#photo-template').html();
  const $newSection = $(`<section id="${this.keyword}">${template}</section>`);

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(`${this.description}. How many horns ${this.horns}`);
  
  $newSection.find('img').attr('src', this.imgUrl);
  $newSection.find('img').attr('title', this.title);

  $('main').append($newSection);
}