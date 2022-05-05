/**
    The task is to implement the Shop protocol (you can do that in this file directly).
    - No database or any other storage is required, just store data in memory
    - No any smart search, use String method contains (case sensitive/insensitive - does not matter)
    –   Performance optimizations are optional
    */
    var productsLocalStorage = new Array();
    var ShopImpl = (function () {
      function ShopImpl() {}

      /**
        Adds a new product object to the Shop.
        - Parameter product: product to add to the Shop
        - Returns: false if the product with same id already exists in the Shop, true – otherwise.
      */
      ShopImpl.prototype.addNewProduct = function (product) {
        // TODO: your implementation goes here
        var prod = {id: product.id, name: product.name, producer: product.producer};
        if (productsLocalStorage.length > 0) {
          for (key in productsLocalStorage) {
            if (product.id == productsLocalStorage[key].id) {
              return false;
            } else {
              productsLocalStorage.push(prod);
              return true;
            }
          }          
        } else {
          productsLocalStorage.push(prod);
          console.log(productsLocalStorage);
          return true;
        }
      };

      /**
        Deletes the product with the specified id from the Shop.
        - Returns: true if the product with same id existed in the Shop, false – otherwise.
      */
      ShopImpl.prototype.deleteProduct = function (itemID) {
        // TODO: your implementation goes here
        if (productsLocalStorage.length > 0) {
          for (key in productsLocalStorage) {
            if (itemID == productsLocalStorage[key].id) {
              var arr = productsLocalStorage;
              arr = arr.filter(function(item) {
                  return item.id !== itemID;
              })
              productsLocalStorage = [...arr];
              console.log(productsLocalStorage);
              return true;
            }
          }
          return false;        
        } else {
          return false;
        }
        return false;
      };

      /**
        - Returns: 10 product names containing the specified string. If there are several products with the same name, producer's name is appended to product's name.
      */
      ShopImpl.prototype.listProductsByName = function (searchString) {
        // TODO: your implementation goes here
        let arrName = new Array();
        let arrFull = new Array();
        let result = new Array();
        if (productsLocalStorage.length > 0) {
          for (key in productsLocalStorage) {
            if (productsLocalStorage[key].name.includes(searchString)) {
              if (arrName.length < 10) {                
                arrName.push(productsLocalStorage[key].name);
                arrFull.push(productsLocalStorage[key]);
              }
            }
          }
          const dupFreeArr = [...new Set(arrName)];
          let duplicates = [...arrName];
          dupFreeArr.forEach((item) => {
            const i = duplicates.indexOf(item)
            duplicates = duplicates
              .slice(0, i)
              .concat(duplicates.slice(i + 1, duplicates.length))
          })
          for (let i=0; i<arrName.length; i++) {
            for (let j=0; j<duplicates.length; j++) {
              if (arrName[i] == duplicates[j]) {
                result.push(arrFull[i].producer + " - " + arrName[i]);

              } else {
                result.push(arrName[i]);
              }
            }
          }
        }
        console.log(result);
        return result;
      };

      /**
        - Returns: 10 product names whose producer contains the specified string, ordered by producers.
      */
      ShopImpl.prototype.listProductsByProducer = function (searchString) {
        // TODO: your implementation goes here
        let arrName = new Array();
        let arrProducer = new Array();
        let arrID = new Array();
        let arrFull = new Array();
        let result = new Array();
        if (productsLocalStorage.length > 0) {
          for (key in productsLocalStorage) {
            if (productsLocalStorage[key].producer.includes(searchString)) {
              if (arrFull.length < 10) {
                arrFull.push(productsLocalStorage[key]);
              }
            }
          }
          function compare(a, b) {
            const producerA = a.producer.toUpperCase();
            const producerB = b.producer.toUpperCase();
            let comparison = 0;
            if (producerA > producerB) {
              comparison = 1;
            } else if (producerA < producerB) {
              comparison = -1;
            }
            return comparison;
          }
          arrFull.sort(compare);
        }
        for (key in arrFull) {
          arrName.push(arrFull[key].name);
        }
        console.log(arrName);
        return arrName;
      };

      return ShopImpl;
    }());

    function test(shop) {
        assert(!shop.deleteProduct("1"));
        assert(shop.addNewProduct({ id: "1", name: "1", producer: "Lex" }));
        assert(!shop.addNewProduct({ id: "1", name: "any name because we check id only", producer: "any producer" }));
        assert(shop.deleteProduct("1"));
        assert(shop.addNewProduct({ id: "3", name: "Some Product3", producer: "Some Producer2" }));
        assert(shop.addNewProduct({ id: "4", name: "Some Product1", producer: "Some Producer3" }));
        assert(shop.addNewProduct({ id: "2", name: "Some Product2", producer: "Some Producer2" }));
        assert(shop.addNewProduct({ id: "1", name: "Some Product1", producer: "Some Producer1" }));
        assert(shop.addNewProduct({ id: "5", name: "Other Product5", producer: "Other Producer4" }));
        assert(shop.addNewProduct({ id: "6", name: "Other Product6", producer: "Other Producer4" }));
        assert(shop.addNewProduct({ id: "7", name: "Other Product7", producer: "Other Producer4" }));
        assert(shop.addNewProduct({ id: "8", name: "Other Product8", producer: "Other Producer4" }));
        assert(shop.addNewProduct({ id: "9", name: "Other Product9", producer: "Other Producer4" }));
        assert(shop.addNewProduct({ id: "10", name: "Other Product10", producer: "Other Producer4" }));
        assert(shop.addNewProduct({ id: "11", name: "Other Product11", producer: "Other Producer4" }));
        var byNames = shop.listProductsByName("Product");
        assert(byNames.length == 10);
        byNames = shop.listProductsByName("Some Product");
        assert(byNames.length == 4);
        assert(byNames.indexOf("Some Producer3 - Some Product1") >= 0);
        assert(byNames.indexOf("Some Product2") >= 0);
        assert(byNames.indexOf("Some Product3") >= 0);
        assert(byNames.indexOf("Some Product1") < 0);
        assert(byNames.indexOf("Some Producer1 - Some Product1") >= 0);
        var byProducer = shop.listProductsByProducer("Producer");
        assert(byProducer.length == 10);
        byProducer = shop.listProductsByProducer("Some Producer");
        assert(byProducer.length == 4);
        assert(byProducer[0] == "Some Product1");
        assert(byProducer[1] == "Some Product2" || byProducer[1] == "Some Product3");
        assert(byProducer[2] == "Some Product2" || byProducer[2] == "Some Product3");
        assert(byProducer[3] == "Some Product1");
    }

    function assert(condition) {
      if (!condition) {
        throw new Error("Assertion failed");
      }
    }

    test(new ShopImpl());