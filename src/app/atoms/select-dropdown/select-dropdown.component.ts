import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QuestionService } from '../../services/question.service';
@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit, OnChanges {

  @Input() type: any;
  @Input() optionArray;
  @Input() defaultSelected: any = [];
  @Input() formName: any;
  @Input() search: any;
  @Input() placeHolder: any = 'Select';
  @Input() value: any;
  @Output() dropDownEmit = new EventEmitter();
  @Input() disabled = false;
  filter_active: boolean = false;
  selectedLabel: any;
  selectedItems: any = [];
  options_copy: any;
  all_selected: any = false;
  @Input() type2: any;
  @Input() dropDownClass: any;
  @Input() overLayClass: any;
  @Input() styles: any;
  selectedArray: any = [];
  searchData: any = '';

  constructor(public dash_serv: QuestionService) {
    this.selectedItems = [];
    this.dash_serv.sidebarVisibilityChange.subscribe(value => {
      this.filter_active = value
    });
  }

  ngOnInit() {
    if (this.formName === 'limit' || this.formName === 'lb_type') {
      const sl = [];
      sl.push(true);
      this.selectedArray = undefined;
      this.selectedArray = [...sl];
      this.selectedItems.push(this.optionArray[0].value);
      this.selectedLabel = this.optionArray[0].label;
    }
    if (this.defaultSelected && this.defaultSelected.length) {
      this.selectedArray = undefined;
      this.selectedItems = undefined;
      this.selectedArray = [];
      this.selectedItems = [];
      this.selectedItems = [...this.defaultSelected];
    }
  }

  ngOnChanges(changes: any) {
    if (!this.defaultSelected || this.defaultSelected.length === 0) {
      this.selectedArray = undefined;
      this.selectedArray = [];
      this.all_selected = false;
      this.selectedItems = undefined;
      this.selectedItems = [];
    }
    if (this.defaultSelected && this.defaultSelected.length) {
      this.selectedItems = undefined;
      this.selectedItems = [];
      this.selectedItems = [...this.defaultSelected];
    }
  }
  mySelectBoxOpen() {
    if (this.selectedItems && this.optionArray && this.selectedItems.length === this.optionArray.length) {
      this.all_selected = true;
    }
    if (this.optionArray && this.optionArray.length) {
      if (this.filter_active === false) {
        this.dash_serv.toggleVisibility();
        this.filter_active = !this.filter_active;
      } else {
        this.filter_active = false;
      }
      this.selectedArray = [];
      this.optionArray.forEach(element => {
        if (this.selectedItems.includes(element.value)) {
          this.selectedArray.push(true);
        } else {
          this.selectedArray.push(false);
        }
      });
    } else {
      this.filter_active = false;
    }
  }

  selectOption(selectedItem, id) {
    const emitPayload: any = {
      formName: this.formName
    };

    const sl = [...this.selectedArray];


    if (this.type === 'multi') {
      if (this.selectedItems.length) {
        if (selectedItem !== 'all') {
          const index: any = this.selectedItems.indexOf(selectedItem.value);
          if (index >= 0) {
            sl[id] = false;
            this.selectedItems.splice(index, 1);
          } else {
            sl[id] = true;
            this.selectedItems.push(selectedItem.value);
          }
          if (this.selectedItems.length === this.optionArray.length) {
            this.all_selected = true;
          } else {
            this.all_selected = false;
          }
        } else {
          if (this.selectedItems.length === this.optionArray.length) {
            this.optionArray.forEach((each, i) => {
              sl[i] = false;
            });
            this.selectedItems = [];
            this.all_selected = false;
          } else {
            this.all_selected = true;
            this.selectedItems = [];
            this.optionArray.forEach((each, i) => {
              sl[i] = true;
              this.selectedItems.push(each.value);
            });
          }
        }
      } else {
        if (selectedItem !== 'all') {
          this.selectedLabel = selectedItem.label;
          sl[id] = true;
          this.selectedItems.push(selectedItem.value);
        } else {
          this.all_selected = true;
          this.optionArray.forEach((each, i) => {
            sl[i] = true;
            this.selectedItems.push(each.value);
          });
        }
      }
    } else {
      this.optionArray.forEach((each, i) => {
        sl[i] = false;
      });
      if (this.selectedItems.length && this.selectedItems[0] === selectedItem.value) {
        sl[id] = false;
        this.selectedItems = [];
      } else {
        sl[id] = true;
        this.selectedLabel = selectedItem.label;
        this.selectedItems[0] = selectedItem.value;
      }
      this.filter_active = false;
    }
    if (this.selectedItems.length > 0 && this.optionArray.length &&
      (this.selectedItems.length === this.optionArray.length)) {
      this.all_selected = true;
    }
    this.selectedArray = undefined;
    this.selectedArray = [...sl];
    emitPayload.value = this.selectedItems;
    this.dropDownEmit.emit(emitPayload);
  }

  searchApplied(searchTerm) {
    this.selectedArray = undefined;
    this.selectedArray = [];
    let temp;
    temp = [];
    if (this.options_copy && this.options_copy.length > 0) {
      // Do nothing
    } else {
      this.options_copy = undefined;
      this.options_copy = [...this.optionArray];
    }

    this.searchData = searchTerm;
    if (searchTerm && searchTerm.length) {
      searchTerm = searchTerm.toLowerCase();
      this.options_copy.forEach((each) => {
        if (each.label.toLowerCase().includes(searchTerm)) {
          temp.push(each);
          if (this.selectedItems.indexOf(each.value) >= 0) {
            this.selectedArray.push(true);
          } else {
            this.selectedArray.push(false);
          }
        }
      });
    } else {
      this.options_copy.forEach((each) => {
        temp.push(each);
        if (this.selectedItems.indexOf(each.value) >= 0) {
          this.selectedArray.push(true);
        } else {
          this.selectedArray.push(false);
        }
      });
    }

    this.optionArray = undefined;
    this.optionArray = [...temp];
    if (this.selectedItems.length > 0 && this.optionArray.length &&
      (this.selectedItems.length === this.optionArray.length)) {
      this.all_selected = true;
    } else {
      this.all_selected = false;
    }
  }

  findLabel(value) {
    let label;
    this.optionArray.forEach((element: any) => {
      if (element.value === value) {
        label = element.label;
        return false;
      }
    });
  }

  selectPlaceHolder() {
    if (this.optionArray && this.optionArray.length) {
      const v = this.optionArray.find(element => {
        return element.value === this.selectedItems[0];
      });
      return v ? v.label : this.placeHolder;
    } else {
      return this.placeHolder;
    }
  }
}
