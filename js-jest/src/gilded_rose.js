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
			item.quality = this.getNextQuality(item)
			item.sellIn = item.sellIn - 1;
		});

		return this.items;
	}

	getNextQuality(item) {
		switch (item.name) {
			case 'Sulfuras, Hand of Ragnaros':
				return item.quality;
			case 'Aged Brie':
				return this.getQualityIncreasedUpTo50(item, this.isExpired(item) ? 2 : 1);
			case 'Backstage passes to a TAFKAL80ETC concert':
				if (item.sellIn === 0) return 0
				return this.getQualityIncreasedUpTo50(item, this.getBackstagePassesQualityIncrease(item.sellIn));
			default:
				return this.getQualityDecreasedDownTo0(item, this.isExpired(item) ? 2 : 1);
		}
	}

	isExpired(item) {
		return item.sellIn <= 0;
	}

	getBackstagePassesQualityIncrease(sellIn) {
		let qualityIncrease = 1;
		if (sellIn < 11) qualityIncrease = 2;
		if (sellIn < 6) qualityIncrease = 3;
		return qualityIncrease;
	}

	getQualityDecreasedDownTo0(item, amount = 1) {
		return Math.max(item.quality - amount, 0);
	}

	getQualityIncreasedUpTo50(item, amount = 1) {
		return Math.min(item.quality + amount, 50);
	}
}

module.exports = {
	Item,
	Shop,
}
