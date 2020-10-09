import {Component, Input} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {TableColumn} from '@swimlane/ngx-datatable/lib/types/table-column.type';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> {

  @Input() columns: TableColumn[];
  @Input() actions: TableAction<T>[];
  @Input() rows: T[] = [];
  @Input() reorderable = true;

  loadingIndicator = true;
  ColumnMode = ColumnMode;
  messages = {
    emptyMessage: 'No hay información para mostrar',
    totalMessage: 'total',
    selectedMessage: 'seleccionado'
  };

  edit(row): void {
    console.log(row);
  }
}

export class TableAction<T> {
  constructor(public tableColumn: TableColumn, public icon: IconDefinition, public action: (t: T) => void) {
  }
}
