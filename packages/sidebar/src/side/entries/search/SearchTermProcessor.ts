import mx from "@mxgraph-app/mx";
const { mxDictionary } = mx;

export class SearchTermProcessor {
  taglist: any;
  results: any;

  index: number = 0;

  dict: any = new mxDictionary();
  tmpDict: any = new mxDictionary();

  page: number = 0;
  count: number = 10;
  max: number = 20;
  terms: any;
  success: any;

  constructor(terms, { success }) {
    this.terms = terms;
    this.success = success;
  }

  reset() {
    this.results = [];
    this.index = 0;
    this.tmpDict = new mxDictionary();
    this.dict = new mxDictionary();
  }

  process(term) {
    const { processEntry } = this;
    if (term.length === 0) return;
    const entry = this.taglist[term];
    const tmpDict = new mxDictionary();
    processEntry(entry);
    this.dict = tmpDict;
    this.index++;
    return true;
  }

  processEntry(entry) {
    const { processSearchResults } = this;
    if (!entry) {
      this.results = [];
      return;
    }
    return processSearchResults(entry);
  }

  processSearchResults(entry) {
    const searchResults = entry.entries;
    this.results = [];
    const {
      index,
      dict,
      tmpDict,
      results,
      page,
      count,
      max,
      terms,
      success,
    } = this;

    return searchResults.find((searchResult, i) => {
      // NOTE Array does not contain duplicates
      if ((index == 0) == (dict.get(searchResult) == null)) {
        tmpDict.put(searchResult, searchResult);
        results.push(searchResult);

        if (i == terms.length - 1 && results.length == max) {
          success(results.slice(page * count, max), max, true, terms);
          return true;
        }
      }
      return false;
    });
  }
}
