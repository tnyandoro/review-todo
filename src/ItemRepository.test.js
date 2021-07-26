// import todoItems from './ItemRepository.js';

// const ItemRepository from './ItemRepository.js';

// describe('todoItems', () => {
//   const todoItems = todoItems();
//   it('should create a todoItems item and return an ID', () => {
//     const id = this.todoItems.create('My first todoItems');
//     expect(id).to.be.a('integer');
//   });

//   it("should create a todoItems item with text 'My second todoItems'", () => {
//     const id = todoItems.create('My second todoItems');
//     const text = todoItems.read(id);
//     expect(text).to.equal('My second todoItems');
//   });
//   it('should return an array with two todoItems items', () => {
//     const items = todoItems.readAll();
//     // you can also test for exact strings
//     expect(items.length).to.equal(2);
//   });
//   it('should delete first item', () => {
//     let items = todoItems.readAll();
//     const { id } = items[0];
//     todoItems.delete(id);
//     items = todoItems.readAll();
//     expect(items.length).to.equal(1);
//   });
// });
