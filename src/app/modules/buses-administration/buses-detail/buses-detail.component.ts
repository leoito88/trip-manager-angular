import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Bus } from "../../../models/bus";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ColectivosDTO , BusService } from 'src/app/services/bus.service';
import { ModeloService } from "../../../services/modelo.service";
import { Model } from "../../../models/model";


@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-detail.component.html',
  styleUrls: ['./buses-detail.component.css']
})
export class BusesDetailComponent implements OnInit{

  selectedBus: Bus | null = null;
  patenteControl = new FormControl('', [Validators.required]);
  cantasientosControl = new FormControl('', [Validators.required]);
  colectivoControl = new FormControl('', [Validators.required]);

  busForm: FormGroup = this.fb.group({
    patente: ['', Validators.required],
    cantidadAsientos: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    modeloId: [0, Validators.required],
  })
  
  busList: Bus[] = [];
  modelList: Model[] = [];

  constructor(private busService: BusService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private _location: Location,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private modeloService: ModeloService,) {
}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get("id")
    console.log("El id que estoy editando es: " + id);
    if (id) {
      // @ts-ignore
      this.findBus(Number(id));
    }
  });

//
  this.busService.findAll().subscribe(res => {
    this.busList = res.body.map(json => {
      const bus = new Bus(json.id, json.patente, json.cantidadAsientos, json.modeloId);
      this.findModelosColectivos(bus);
      return bus;
    });
  },
  error => {
    console.log(error);
    this.matSnackBar.open(error, "cerrar")
  })

  this.findModelos()
}
//


findBus(id: number) {
  this.busService.findOne(id).subscribe(res => {
    if (res) {
      this.selectedBus = new Bus(res.id, res.patente, res.cantidadAsientos, res.modeloId);

      this.busForm.patchValue({
        patente: this.selectedBus.patente,
        cantidadAsientos: this.selectedBus.cantidadAsientos,
        modeloId: this.selectedBus.modeloId,
        colectivo: this.selectedBus.modelo,
      })
    }
  }, error => {
    console.log(error);
    this.matSnackBar.open(error, "Cerrar");
    this.router.navigate(['buses', 'list']);
  })
}


guardarCambios() {

  const body: ColectivosDTO = {
    id: null,
    patente: this.busForm.get('patente').value,
    cantidadAsientos: this.busForm.get('cantidadAsientos').value,
    modeloId: this.busForm.get('modeloId').value,
  }

  if (this.selectedBus && this.selectedBus.id) {
    // LLamar al metodo actualizar
    console.log("Actualizando un Colectivo");

    body.id = this.selectedBus.id;

    this.busService.actualizarBus(body).subscribe(res => {
      this.matSnackBar.open("Se guardaron los cambios del Colectivo", "Cerrar", {
        duration: 3000
      });
      this.router.navigate(['buses', 'list']);
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }
  else {
    this.busService.crearBus(body).subscribe(res => {
      this.matSnackBar.open("Se creo el Colectivo correctamente", "Cerrar", {
        duration: 3000
      });
      this.router.navigate(['buses', 'list']);
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }
}

volverAtras() {
  this.router.navigate(['buses','list'])
}

//
findModelosColectivos(colectivo: Bus) {
  this.modeloService.findOne(colectivo.modeloId).subscribe(res => {
    colectivo.modelo = new Model(res.id, res.nombre, res.marca);
  })
}
//

findModelos(){
  this.modeloService.findAll().subscribe(res => {
    this.modelList = res.body.map(json => new Model(json.id, json.nombre, json.marca));
  })
}

}
