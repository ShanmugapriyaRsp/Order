import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OtherService } from 'src/app/Services/other.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  isCollapsed = true;
  isCollapse = true;
  filter:any;
  from:any;
  to:any;
  searchData:any;
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private other:OtherService) { }

  ngOnInit(): void {
  }

  filterSearch(e : Event) {
    this.searchData = (e.target as HTMLInputElement).value;
    
    this.newItemEvent.emit(this.searchData);
    console.log(this.searchData)
  }
  filterByPrice(){
     console.log(this.from,this.to)
     this.other.filterbyprice(this.from,this.to).subscribe({
       next:(result:any)=>{
          console.log(result.value);
          this.other.getFilterByPriceList(result.value);
       },
       error: (err:any)=>{
          let error=err.error;
          this.other.openSnackBar(error.message)        
       }
     })
  }
  clearFilters(){
    this.from='';
    this.to='';
  }
  
}
