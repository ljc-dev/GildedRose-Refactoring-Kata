const {Shop, Item} = require("../src/gilded_rose");

describe(`Gilded Rose`, () => {
	describe(`regular item`, () => {
		it(`should degrade by 1 in sellIn and quality`, () => {
			verifyItemAfterUpdate(
				new Item("Elixir of the Mongoose", 10, 5),
				new Item("Elixir of the Mongoose", 9, 4),
			);
		});

		it(`should degrade in quality twice as fast once the sellBy has passed`, () => {
			verifyItemAfterUpdate(
				new Item("Elixir of the Mongoose", 0, 5),
				new Item("Elixir of the Mongoose", -1, 3),
			);
		});

		it(`should never degrade below quality 0`, () => {
			verifyItemAfterUpdate(
				new Item("Elixir of the Mongoose", 5, 0),
				new Item("Elixir of the Mongoose", 4, 0),
			);
		});
	});

	describe(`Aged Brie`, () => {
		it(`should increase in quality`, () => {
			verifyItemAfterUpdate(
				new Item("Aged Brie", 5, 0),
				new Item("Aged Brie", 4, 1),
			);
		});

		it(`should increase in quality twice as fast once the sellBy date has passed`, () => {
			verifyItemAfterUpdate(
				new Item("Aged Brie", 0, 5),
				new Item("Aged Brie", -1, 7),
			);
		});

		it(`should never have a quality above 50`, () => {
			verifyItemAfterUpdate(
				new Item("Aged Brie", 5, 50),
				new Item("Aged Brie", 4, 50),
			);
			verifyItemAfterUpdate(
				new Item("Aged Brie", 0, 49),
				new Item("Aged Brie", -1, 50),
			);
		});

		describe(`Sulfuras, Hand of Ragnaros`, () => {
			it(`should never degrade in either sellIn date or quality`, () => {
				verifyItemAfterUpdate(
					new Item("Sulfuras, Hand of Ragnaros", 5, 80),
					new Item("Sulfuras, Hand of Ragnaros", 5, 80),
				);
				verifyItemAfterUpdate(
					new Item("Sulfuras, Hand of Ragnaros", 0, 80),
					new Item("Sulfuras, Hand of Ragnaros", 0, 80),
				);
			});
		});

		describe(`Backstage passes`, () => {
			it(`should increase in quality by 1 if the sellIn date is more than 10 days away`, () => {
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
					new Item("Backstage passes to a TAFKAL80ETC concert", 10, 11),
				);
			});

			it(`should increase in quality by 2 if the sellIn date is 10 days or less away`, () => {
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
					new Item("Backstage passes to a TAFKAL80ETC concert", 9, 12),
				);
			});

			it(`should increase in quality by 3 if the sellIn date is 5 days or less away`, () => {
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
					new Item("Backstage passes to a TAFKAL80ETC concert", 4, 13),
				);
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
					new Item("Backstage passes to a TAFKAL80ETC concert", 0, 13),
				);
			});

			it(`should drop to quality 0 after the concert`, () => {
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
					new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
				);
			});

			it(`should never degrade below quality 0`, () => {
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
					new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
				);
			});

			it(`should never have a quality above 50`, () => {
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50),
					new Item("Backstage passes to a TAFKAL80ETC concert", 14, 50),
				);
				verifyItemAfterUpdate(
					new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
					new Item("Backstage passes to a TAFKAL80ETC concert", 4, 50),
				);
			});
		});

		describe(`Conjured items`, () => {
			it(`should degrade by 1 in sellIn and 2 in quality`, () => {
				verifyItemAfterUpdate(
					new Item("Conjured Mana Cake", 10, 5),
					new Item("Conjured Mana Cake", 9, 3),
				);
			});

			it(`should degrade in quality twice as fast once the sellBy has passed`, () => {
				verifyItemAfterUpdate(
					new Item("Conjured Mana Cake", 0, 5),
					new Item("Conjured Mana Cake", -1, 1),
				);
			});

			it(`should never degrade below quality 0`, () => {
				verifyItemAfterUpdate(
					new Item("Conjured Mana Cake", 5, 0),
					new Item("Conjured Mana Cake", 4, 0),
				);
			});
		});
	});
});

function verifyItemAfterUpdate(itemBeforeUpdate, expectedUpdatedItem) {
	const gildedRose = new Shop([itemBeforeUpdate]);
	const updatedItem = gildedRose.updateQuality()[0];
	expect(updatedItem).toEqual(expectedUpdatedItem);
}
