import { NewsFeed } from './types';

class Store {
	private feeds: NewsFeed[];
	private _currentPage: number;

	constructor() {
		this.feeds = [];
		this._currentPage = 1
	}

	get currentPage() {
		return this._currentPage;
	}

	set currentPage(page: number) {
		this._currentPage = page;
	}

}