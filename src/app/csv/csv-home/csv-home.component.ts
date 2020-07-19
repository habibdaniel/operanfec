import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-csv-home',
  templateUrl: './csv-home.component.html',
  styleUrls: ['./csv-home.component.css']
})
export class CsvHomeComponent implements OnInit {

  delimiters = [
    { value: ',', name: ',', selected: false },
    { value: ';', name: ';', selected: true },
    { value: '/', name: '/', selected: false },
    { value: ' ', name: 'Espace * 1', selected: false },
    { value: '  ', name: 'Espace * 2', selected: false },
    { value: '   ', name: 'Espace * 3', selected: false },
  ];
  customDelimiter = false;
  IsWait: boolean = false
  fileName = 'ExcelSheet.xlsx';

  private gridApi;
  private gridColumnApi;

  headersRow: string[] = [];
  csvRecords: any[] = [];
  acceptedFiles = ['csv', 'xls', 'xlsx', 'txt'];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    editable: true,
    width: 100
  };
  columnDefs: any[] = [];
  rowData: any[] = [];

  @ViewChild('fileImportInput') fileImportInput: any;
  @ViewChild('fileDelimiter') fileDelimiter: any;
  customDelimiterValue: any
  @ViewChild('agGrid') agGrid: AgGridAngular;

  constructor() { }

  ngOnInit(): void {
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    /* this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe(data => {
        this.rowData = data;
      }); */
  }

  onQuickFilterChanged(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
  }

  onBtnExportDataAsCsv(value) {
    this.gridApi.exportDataAsCsv(this.getExportParams(value));
  }

  onBtnExportDataAsExcel(value) {
    this.gridApi.exportDataAsExcel(this.getExportParams(value));
  }

  getExportParams(value) {
    let params: {};
    if (value) {
      params = {
        allColumns: true,
        // columnKeys: ['country', 'bronze'],
        onlySelected: false,
      };
    } else {
      params = {
        allColumns: false,
        onlySelected: true,
      };
    }
    return params;
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onPageSizeChanged() {
    const value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  exportexcel(): void {
    console.log('data', this.agGrid.api.getSelectedNodes());

    /* table id is passed over here */
    const element = document.getElementById('excel-table'); // use agrid table instead
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


  // EXPORTING
  fileChangeListener($event: any): void {
    this.fileReset(false);
    const files = this.fileImportInput.nativeElement.files;

    this.IsWait = true
    // Replace with Observable
    setTimeout(() => {
      if (files.length > 0 && this.isCSVFile(files[0])) {

        const input = this.fileImportInput.target;
        const reader = new FileReader();
        reader.readAsText(files[0]);

        reader.onload = () => {
          const csvData = reader.result;
          const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

          this.headersRow = this.getHeaderArray(csvRecordsArray);
          // console.log('HEADER', this.headersRow);
          this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headersRow.length);
          // console.log('DATA_REFINED', this.csvRecords);

          const data = {};
          this.headersRow.forEach((item, index) => {
            if (index === 0) {
              const row = { headerName: item, field: item.toLowerCase(), headerCheckboxSelection: true, checkboxSelection: true };
              this.columnDefs = [...this.columnDefs, row];
            } else {
              const row = { headerName: item, field: item.toLowerCase() };
              this.columnDefs = [...this.columnDefs, row];
            }

            data[item.toLowerCase()] = '';
          });

          this.csvRecords.forEach((item) => {
            const row = {};
            Object.keys(data).forEach((value, index) => {
              row[value] = item[index];
            });

            this.rowData = [...this.rowData, row];
          });

        };

        reader.onerror = () => {
          alert('Unable to read ' + input.files[0]);
        };

        this.IsWait = false

      } else {
        console.log(`Please import valid ${this.acceptedFiles} file.`);
        this.fileReset(true);
        this.IsWait = false
      }
    }, 5000);
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const data = (csvRecordsArray[i] as string).split(!this.customDelimiter ? this.fileDelimiter.nativeElement.value : this.customDelimiterValue);

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length === headerLength) {
        const stringResult = JSON.stringify(data);
        const JSONResult = JSON.parse(stringResult);
        dataArr.push(JSONResult);
      }
    }
    // console.log('DATA', dataArr);
    return dataArr;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    for (const extension of this.acceptedFiles) {
      if (file.name.endsWith(extension)) { return true; }
    }
    return false;

    // return file.name.endsWith('.csv');
  }

  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(!this.customDelimiter ? this.fileDelimiter.nativeElement.value : this.customDelimiterValue);
    const headerArray = [];
    for (let _i = 0; _i < headers.length; _i++) {
      headerArray.push(headers[_i]);
    }
    return headerArray;
  }

  fileReset(all: boolean) {
    if (all) {
      this.fileImportInput.nativeElement.value = '';
      this.fileDelimiter.nativeElement.value = ';';
    }
    this.headersRow = [];
    this.csvRecords = [];
    this.columnDefs = [];
    this.rowData = [];
  }

}
