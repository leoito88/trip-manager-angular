import { Component, OnInit } from '@angular/core';
import { BusService } from "../../../services/bus.service";
import { Bus } from 'src/app/models/bus';
import { ModeloService } from "../../../services/modelo.service";
import { Model } from "../../../models/model";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css']
  })
  
  export class BusesListComponent implements OnInit{

  busList: Bus[] = [];
  displayedColumns = ['id','patente','cantidadAsientos','modelo','acciones'];
  dataSource = [
    new Bus(1, 'BMO-016', 43 , 2)
  ];

  constructor(private busService: BusService,
              private modeloService: ModeloService,
              private matSnackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.loadBus();
    this.busService.findAll().subscribe(res => {
      this.dataSource = res.body.map(json => {
        const bus = new Bus(json.id, json.patente, json.cantidadAsientos, json.modeloId);
        this.findModeloColectivo(bus);
        return bus;
      });
    },
    error => {
      console.log(error);
      this.matSnackBar.open(error, "cerrar")
    });
  }

  loadBus() {
    this.busService.findAll().subscribe(res => {
      this.dataSource = res.body.map(res => {
        const bus = new Bus(res.id, res.patente, res.cantidadAsientos, res.modeloId);
      return bus;
      });
    })
  }

  seleccionarBus(element:Bus) {
    this.router.navigate(['buses','detail', element.id])
  }

  crearBus() {
    this.router.navigate(['buses','create'])
  }

  borrarBus(bus: Bus) {
    this.busService.borrar(bus.id).subscribe(res => {
      this.matSnackBar.open("Se borro correctamente el Colectivo", "Cerrar", {
        duration: 3000
      });
      this.loadBus();
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }

  findModeloColectivo(cole: Bus) {
    this.modeloService.findOne(cole.modeloId).subscribe(res => {
      cole.modelo = new Model(res.id, res.nombre, res.marca);
    })
  }

}
