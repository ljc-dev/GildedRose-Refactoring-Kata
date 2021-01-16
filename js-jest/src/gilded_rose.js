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
		this.items = this.items.map(item => {
			return {
				...item,
				sellIn: this.getNextSellIn(item),
				quality: this.getNextQuality(item),
			};
		});

		return this.items;
	}

	getNextSellIn(item) {
		switch (item.name) {
			case 'Sulfuras, Hand of Ragnaros':
				return item.sellIn;
			default:
				return item.sellIn - 1;
		}
	}

	getNextQuality(item) {
		switch (item.name) {
			case 'Sulfuras, Hand of Ragnaros':
				return item.quality;
			case 'Aged Brie':
				return this.qualityIncreasedUpTo50(item, this.isExpired(item) ? 2 : 1);
			case 'Backstage passes to a TAFKAL80ETC concert':
				if (this.isExpired(item)) {
					return 0
				} else if (item.sellIn > 10) {
					return this.qualityIncreasedUpTo50(item, 1);
				} else if (item.sellIn > 5) {
					return this.qualityIncreasedUpTo50(item, 2);
				} else {
					return this.qualityIncreasedUpTo50(item, 3);
				}
			case 'Conjured Mana Cake':
				return this.qualityDecreasedDownTo0(item, this.isExpired(item) ? 4 : 2);
			default:
				return this.qualityDecreasedDownTo0(item, this.isExpired(item) ? 2 : 1);
		}
	}

	isExpired(item) {
		return item.sellIn <= 0;
	}

	qualityDecreasedDownTo0(item, amount = 1) {
		return Math.max(item.quality - amount, 0);
	}

	qualityIncreasedUpTo50(item, amount = 1) {
		return Math.min(item.quality + amount, 50);
	}
}

module.exports = {
	Item,
	Shop,
}
