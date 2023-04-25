import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/models';
import { PedidosService } from 'src/services/orders/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  pedidos!:Order[]

  constructor(private pedidoService:PedidosService){

  }

  ngOnInit(): void {
    this.pedidoService.getOrders().subscribe((res) => {
      this.pedidos = res.payload as Order[];
    });
  }

}
