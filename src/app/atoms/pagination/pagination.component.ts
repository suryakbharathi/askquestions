import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit, OnChanges {
    @Input() items: Array<any>;
    @Output() changePage = new EventEmitter();
    @Input() initialPage ;
    @Input() pageSize;
    @Input() maxPages;

    pager: any = {};
    ngOnInit() {
        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.initialPage = 1;
            this.setPage(this.items, this.initialPage);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // reset page if items array has changed
        if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
            this.items = changes.items.currentValue;
            this.setPage(changes.items.currentValue,this.initialPage);
        }
        else if (changes.initialPage && changes.initialPage.currentValue !== changes.initialPage.previousValue){
            this.initialPage = changes.initialPage.currentValue
            this.setPage(this.items , changes.initialPage.currentValue);
        }
    }
    pageevent(page) {
        this.changePage.emit(page);
    }
    private setPage(items,page: number) {
        // get new pager object for specified page
        this.pager = this.paginate(items.length, page, this.pageSize, this.maxPages);

        // get new page of items from items array
        // var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

        // call change page function in parent component
        // this.changePage.emit(page);

    }
    paginate(
        totalItems: number,
        currentPage: number = 1,
        pageSize: number = 10,
        maxPages: number = 10
    ) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}