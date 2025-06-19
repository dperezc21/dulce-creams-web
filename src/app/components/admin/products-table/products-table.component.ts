import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Product} from '../../../interfaces/product';

@Component({
  selector: 'app-products-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './products-table.component.html',
  standalone: true,
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() products!: Product[];
  readonly displayedColumns: string[] = ['name', 'description', 'image', 'price'];

  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["products"]?.currentValue?.length) {
      this.dataSource = new MatTableDataSource(changes["products"]["currentValue"]);
    }
  }

}
