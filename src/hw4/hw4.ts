import fs from 'fs';
import path from 'path';
import { Transform } from 'stream';
import { EventEmitter } from 'events';

const hw4 = () => {
  const transformStream= () => {
    const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');
    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output.txt'), 'utf-8');
    const transformStream = new Transform({
      transform (chunk, encoding, callback) {
        const transformedChunck = chunk.toString().toUpperCase();
        this.push(transformedChunck);
        callback();
      }
    });

    transformStream.on('end', () => {
      console.log('successfully transformed');
    });
    readStream.pipe(transformStream).pipe(writeStream);
  };

  transformStream();

  const ADD_ITEM_EVENT = 'ADD_ITEM';
  const DELETE_ITEM_EVENT = 'DELETE_ITEM';
  const ADD_ORDER = 'ADD_ORDER';
  const SALE_ITEM = 'SALE_ITEM';

  class CartEmitter extends EventEmitter {
    constructor () {
      super();
    }

    onItemAdd(item) {
      this.emit(ADD_ITEM_EVENT, item);
    }

    onItemDeleted(item) {
      this.emit(DELETE_ITEM_EVENT, item);
    }

    onPlaceOrder(item) {
      this.emit(ADD_ORDER, item);
    }

    onCheckout(item) {
      this.emit(SALE_ITEM, item);
    }
  }

  const cartEmitter = new CartEmitter();

  cartEmitter.on(ADD_ITEM_EVENT, (item) => {
    console.log('Product was added!', item);
  });

  cartEmitter.on(DELETE_ITEM_EVENT, (item) => {
    console.log('Product was deleted!', item);
  });

  cartEmitter.on(ADD_ORDER, (item) => {
    console.log('Order was successfully proceeded', item);
  });

  cartEmitter.on(SALE_ITEM, (item) => {
    console.log('Item was saled!', item);
  });

  cartEmitter.onItemAdd({price: 10, addToCart: true, deleted: true, saled: false});
  cartEmitter.onItemDeleted({price: 10, addToCart: true, deleted: true, saled: false});
  cartEmitter.onPlaceOrder({price: 10, addToCart: true, deleted: true, saled: false});
  cartEmitter.onCheckout({price: 10, addToCart: true, deleted: true, saled: false});

};

export default hw4;