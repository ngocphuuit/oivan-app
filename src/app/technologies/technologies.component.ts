import { Component, OnInit } from '@angular/core';
import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

    techs: Technology[] = [];

    constructor(private techService: TechnologyService) { }

    ngOnInit(): void {
        this.getTechs();
    }

    getTechs(): void {
        this.techService.getTechs().subscribe(techs => {
            if (techs.status == "ok") {
                this.techs = techs.data;
            }
        });
    }

    delete(tech: any): void {
        this.techs = this.techs.filter(t => t !== tech);
        this.techService.deleteTech(tech.id).subscribe();
    }
}
