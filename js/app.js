'use strict'
const hornArray = [];

$.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(hornInfo => {
    hornInfo.forEach(horn => {
      new Horn(horn).render();
    })
  })
  .then(() => Horn.dropDown());

function Horn(object) {
  this.imgUrl = object.image_url
  this.title = object.title
  this.description = object.description
  this.keyword = object.keyword
  this.horns = object.horns
  hornArray.push(this)
}

Horn.prototype.render = function () {
  const template = $('#photo-template').html();
  const $newSection = $(`<section id="${this.keyword}">${template}</section>`);
  $newSection.find('h2').text(this.title)
  $newSection.find('p').text(` ${this.description}. Number of horns ${this.horns}`);
  $newSection.find('img').attr('src', this.imgUrl);
  $newSection.find('img').attr('title', this.title)

  $('main').append($newSection);
}

Horn.dropDown = () => {
  let tempArray = [];
  hornArray.forEach(value => {
    if (!tempArray.includes(value.keyword)) {
      tempArray.push(value.keyword);
    }
  })
  tempArray.forEach(value => {
    const $newOptionTag = $(`<option value="${value}">${value}</option>`);
    $('select').append($newOptionTag);
  })
}

$('select').on('change', handler);

function handler(event) {
  $('section').hide();
  hornArray.forEach((object) => {
  if(event.target.value === object.keyword) {
$(`section[id = ${object.keyword}]`).show();
  }
});
}