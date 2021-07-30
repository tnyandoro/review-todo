import ItemRepository from './ItemRepository.js';
// import renderItems from './index.js';
import 'jest-localstorage-mock';

// const dom = new JSDOM('', {
//   url: 'https://example.org/',
//   referrer: 'https://example.com/',
//   contentType: 'text/html',
//   includeNodeLocations: true,
//   storageQuota: 10000000,
// });

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe('ItemRepository', () => {
  it('should start with zero items', () => {
    // arrange
    const itemRepository = new ItemRepository();

    // assert
    expect(itemRepository.todoItems.length).toBe(0);
  });
});

test('Check addTodo able add todo to todoList', () => {
  const renderItems = new RenderItems();

  document.body.innerHTML =  `<div class="item"  id="${todoItem.id}" draggable="true">
      <div class="item-icons">
          <i class="far fa-check-square complete-item item-icon"></i>
          <i class="far fa-edit edit-item item-icon"></i>
          <i class="far fa-times-circle delete-item item-icon"></i>
        </div>
        <h5 class="item-name text-capitalize ${completed}">${todoItem.text}</h5>   
        <i class="fas fa-ellipsis-v"></i>     
      </div>`,
});

describe('ItemRepository.addItem', () => {
  it('should return a string ID', () => {
    // arrange
    const itemRepository = new ItemRepository();

    // act
    const id1 = itemRepository.addItem('Hello');

    // assert
    expect(id1).toBeTruthy();
    expect(typeof id1).toBe('string');
    expect(id1).toBe(id1.trim());

    // act (again)
    const id2 = itemRepository.addItem('You');

    // assert (again)
    expect(id2).toBeTruthy();
    expect(typeof id2).toBe('string');
    expect(id2).toBe(id2.trim());

    expect(id2).not.toBe(id1); // make sure different ID is generated
  });

  it('should add a todo item', () => {
    // arrange
    const itemRepository = new ItemRepository();

    // act
    itemRepository.addItem('Hello');

    // assert
    expect(itemRepository.todoItems.length).toBe(1);
    expect(typeof itemRepository.todoItems[0]).toBe('object');
    expect(itemRepository.todoItems[0].completed).toBe(false);
    expect(itemRepository.todoItems[0].text).toBe('Hello');

    // act (again)
    itemRepository.addItem('You');

    // assert (again)
    expect(itemRepository.todoItems.length).toBe(2);
    expect(typeof itemRepository.todoItems[1]).toBe('object');
    expect(itemRepository.todoItems[1].completed).toBe(false);
    expect(itemRepository.todoItems[1].text).toBe('You');
  });
});

describe('ItemRepository.removeCompletedItems', () => {
  it('should remove complete items', () => {
    // arrange
    const itemRepository = new ItemRepository();
    itemRepository.todoItems = [
      { id: 'i1', completed: true },
      { id: 'i2', completed: false },
      { id: 'i3', completed: true },
      { id: 'i4', completed: false },
    ];

    // act
    itemRepository.removeCompletedItems();

    // assert
    expect(itemRepository.todoItems.length).toBe(2);
    expect(itemRepository.todoItems[0].id).toBe('i2');
    expect(itemRepository.todoItems[1].id).toBe('i4');
  });
});

describe('ItemRepository.removeItem', () => {
  it('should remove item', () => {
    // arrange
    const itemRepository = new ItemRepository();
    itemRepository.todoItems = [
      { id: 'i1', completed: true },
      { id: 'i2', completed: false },
      { id: 'i3', completed: true },
      { id: 'i4', completed: false },
    ];

    // act
    itemRepository.removeItem('i1');

    // assert
    expect(itemRepository.todoItems.length).toBe(3);
    expect(itemRepository.todoItems[0].id).toBe('i2');
    expect(itemRepository.todoItems[1].id).toBe('i3');
    expect(itemRepository.todoItems[2].id).toBe('i4');
  });
});