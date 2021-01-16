class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

class Shop {
	constructor(items = []) {
		this.items = items;
	}

	updateQuality() {
		this.items.forEach(item => {
			if (item.name === 'Sulfuras, Hand of Ragnaros') return;

			if (item.name === 'Aged Brie') {
				this.increaseQualityUpTo50(item);
				if (item.sellIn === 0) {
					this.increaseQualityUpTo50(item);
				}
			} else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
				this.increaseQualityUpTo50(item);
				if (item.sellIn < 11) this.increaseQualityUpTo50(item);
				if (item.sellIn < 6) this.increaseQualityUpTo50(item);
				if (item.sellIn === 0) item.quality = 0;
			} else {
				this.decreaseQualityDownTo0(item);
				if (item.sellIn === 0) {
					this.decreaseQualityDownTo0(item);
				}
			}

			item.sellIn = item.sellIn - 1;
		});

		return this.items;
	}

	decreaseQualityDownTo0(item, amount = 1) {
		item.quality = Math.max(item.quality - amount, 0);
	}

	increaseQualityUpTo50(item, amount = 1) {
		item.quality = Math.min(item.quality + amount, 50);
	}
}

module.exports = {
	Item,
	Shop,
}
