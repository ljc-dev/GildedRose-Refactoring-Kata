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
				this.incrementQualityUpTo50(item);
				if (item.sellIn === 0) {
					this.incrementQualityUpTo50(item);
				}
			} else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
				this.incrementQualityUpTo50(item);
				if (item.sellIn < 11) this.incrementQualityUpTo50(item);
				if (item.sellIn < 6) this.incrementQualityUpTo50(item);
				if (item.sellIn === 0) item.quality = 0;
			} else {
				this.decrementQualityDownTo0(item);
				if (item.sellIn === 0) {
					this.decrementQualityDownTo0(item);
				}
			}

			item.sellIn = item.sellIn - 1;
		});

		return this.items;
	}

	decrementQualityDownTo0(item) {
		if (item.quality > 0) {
			item.quality = item.quality - 1;
		}
	}

	incrementQualityUpTo50(item) {
		if (item.quality < 50) {
			item.quality = item.quality + 1;
		}
	}
}

module.exports = {
	Item,
	Shop,
}
