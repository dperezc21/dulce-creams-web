import {AfterViewInit, Component, Input, OnChanges, OnInit, output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Product} from '../../../interfaces/product';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-products-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule,
    MatPaginatorModule, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './products-table.component.html',
  standalone: true,
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnChanges {
  editProduct = output<Product>();
  deleteProduct = output<Product>();
  @Input() products!: Product[];
  readonly displayedColumns: string[] = ['name', 'description', 'image', 'price', 'menu'];

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
    if(changes["products"]?.currentValue) {
      this.dataSource = new MatTableDataSource(changes["products"]["currentValue"]);
    }
  }

}
