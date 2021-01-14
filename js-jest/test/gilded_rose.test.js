const {Shop, Item} = require("../src/gilded_rose");

describe(`Gilded Rose`, function() {
  describe(`regular item`, () => {
    it(`should degrade by 1 in sellIn and quality`, () => {
      const gildedRose = new Shop([new Item("Elixir of the Mongoose", 10, 5)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(4);
    });

    it(`should degrade in quality twice as fast once the sellBy has passed`, () => {
      const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 5)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(3);
    });

    it(`should never degrade below quality 0`, () => {
      const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 0)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(0);
    });
  });

  describe(`Aged Brie`, () => {
    it(`should increase in quality`, () => {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 0)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(1);
    });

    it(`should increase in quality twice as fast once the sellBy date has passed`, () => {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 5)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(7);
    });

    it(`should never have a quality above 50`, () => {
      const gildedRose = new Shop([
          new Item("Aged Brie", 5, 50),
          new Item("Aged Brie", 0, 49),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(50);
      expect(items[1].sellIn).toBe(-1);
      expect(items[1].quality).toBe(50);
    });
  });

  describe(`Sulfuras, Hand of Ragnaros`, () => {
    it(`should never degrade in either sellIn date or quality`, () => {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 5, 80),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(5);
      expect(items[0].quality).toBe(80);
      expect(items[1].sellIn).toBe(0);
      expect(items[1].quality).toBe(80);
    });
  });

  describe(`Backstage passes`, () => {
    it(`should increase in quality by 1 if the sellIn date is more than 10 days away`, () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(10);
      expect(item.quality).toBe(11);
    });

    it(`should increase in quality by 2 if the sellIn date is 10 days or less away`, () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(12);
    });

    it(`should increase in quality by 3 if the sellIn date is 5 days or less away`, () => {
      const gildedRose = new Shop([
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
          new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(13);
      expect(items[1].sellIn).toBe(0);
      expect(items[1].quality).toBe(13);
    });

    it(`should drop to quality 0 after the concert`, () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    it(`should never degrade below quality 0`, () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    it(`should never have a quality above 50`, () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(50);
      expect(items[1].sellIn).toBe(4);
      expect(items[1].quality).toBe(50);
    });
  });
});
