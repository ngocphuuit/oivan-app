import { Component, OnInit } from '@angular/core';
import { Developer } from '../developer';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})

export class DevelopersComponent implements OnInit {

	devs: Developer[] = [];

    constructor(private devService: DeveloperService) { }

    ngOnInit(): void {
    	this.getDevs();
    }

    getDevs(): void {
        this.devService.getDevs().subscribe(devs => {
            if (devs.status == "ok") {
                this.devs = devs.data;
            }
        });
    }

    delete(dev: any): void {
        this.devs = this.devs.filter(d => d !== dev);
        this.devService.deleteDev(dev.id).subscribe();
    }

}
