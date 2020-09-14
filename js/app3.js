'use strict';
const uniqueKeywordArray = [];
const hornedBeastArray = [];
$.ajax('data/page-2.json', {method: 'GET', dataType: 'JSON'})
  .then(animals => {
    animals.forEach(hornedBeast => {
      new HornedAnimal(hornedBeast);
    })
    hornedBeastArray.forEach(beast => {
      $('main').append(beast.render());
    })
    generateUniqueKeywords();
    generateDropdown();
  })
function HornedAnimal(object){
  this.image = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  hornedBeastArray.push(this);
}

HornedAnimal.prototype.render = function() {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}
function generateUniqueKeywords(){
  hornedBeastArray.forEach(beast => {
    if(!uniqueKeywordArray.includes(beast.keyword)){
      uniqueKeywordArray.push(beast.keyword);
    }
  })
}
function generateDropdown(){
  uniqueKeywordArray.forEach(keyword => {
    const $newDropdownItem = $('<option></option>');
    $newDropdownItem.attr('value', keyword);
    $newDropdownItem.text(keyword);
    $('select').append($newDropdownItem);
  })
}
function handleChange(){
  $('div').hide();
  $(`div[class=${this.value}]`).show();
}
$('select').on('change', handleChange);

function handleSort(){
  let selected_value = $('input:checked').val();
  if (selected_value === 'title') {
    hornedBeastArray.sort((a, b) => {
      a = a.title.toLowerCase();
      b = b.title.toLowerCase();
      if(a > b) {
        return 1;
      } else if (a < b){
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    hornedBeastArray.sort((a, b) => {
      a = a.horns;
      b = b.horns;
      return a - b
    });
  }
  $('main').empty();
  hornedBeastArray.forEach(beast => {
    $('main').append(beast.render());
  });
}
$('select').on('change', handleChange);
$('input').on('click', handleSort);