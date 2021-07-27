/* eslint-disable no-unused-vars */
import css from './style.css';
import html from './index.html';
import ItemRepository from './ItemRepository.js';
import ItemSorter from './ItemSorter.js';

let currentEditItem = null;
const form = document.querySelector('#itemForm'); // select the form
const itemInput = document.querySelector('#itemInput'); // select the input box from the form
const itemList = document.querySelector('.item-list');
const inform = document.querySelector('.inform');
const clearButton = document.querySelector('#clear-list');
const submitButton = document.querySelector('#submitButton');

const itemRepository = new ItemRepository();
const itemSorter = new ItemSorter(itemList, itemRepository);

const renderItems = () => {
  itemList.innerHTML = '';

  itemRepository.getItems().forEach((todoItem) => {
    const completed = todoItem.completed ? 'completed' : '';
    itemList.insertAdjacentHTML(
      'beforeend',
      `<div class="item"  id="${todoItem.id}" draggable="true">
      <div class="item-icons">
          <i class="far fa-check-square complete-item item-icon"></i>
          <i class="far fa-edit edit-item item-icon"></i>
          <i class="far fa-times-circle delete-item item-icon"></i>
        </div>
        <h5 class="item-name text-capitalize ${completed}">${todoItem.text}</h5>   
        <i class="fas fa-ellipsis-v"></i>     
      </div>`,
    );
    const element = document.getElementById(todoItem.id);
    element.addEventListener('dragstart', (e) => itemSorter.itemDragStart(e));
    element.addEventListener('dragover', (e) => itemSorter.itemDragOver(e));
    element.addEventListener('dragend', (e) => itemSorter.itemDragEnd(e));
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const itemText = itemInput.value;

  if (!itemText || !itemText.trim()) {
    inform.innerHTML = 'Enter a valid to do';
    inform.classList.add('showItem', 'alert-danger');
    setTimeout(() => {
      inform.classList.remove('showItem');
    }, 3000);
    return;
  }

  if (currentEditItem) {
    itemRepository.updateItem(currentEditItem.id, itemText);
    currentEditItem = null;
    submitButton.innerText = 'Add';
    renderItems();
  } else {
    itemRepository.addItem(itemText);
    renderItems();
  }

  itemInput.value = '';
});

clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  itemRepository.removeCompletedItems();
  renderItems();
});

itemList.addEventListener('click', (e) => {
  e.preventDefault();

  const targetClasses = e.target.classList;
  const getItemId = () => e.target.closest('div.item').id;

  if (targetClasses.contains('complete-item')) {
    itemRepository.completeItem(getItemId());
    renderItems();
  } else if (targetClasses.contains('edit-item')) {
    currentEditItem = itemRepository.getItem(getItemId());
    itemInput.value = currentEditItem.text;
    submitButton.innerText = 'Edit';
    renderItems();
  } else if (targetClasses.contains('delete-item')) {
    itemRepository.removeItem(getItemId());
    renderItems();
  }
});

renderItems();