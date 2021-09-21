import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  	projects: Project[] = [];

    constructor(private proService: ProjectService, private messageService: MessageService) { }

    ngOnInit(): void {
    	this.getPros();
    }

    getPros(): void {
        this.proService.getPros().subscribe(pros => {
            if (pros.status == "ok") {
                this.projects = pros.data;
                this.messageService.add("get project successful");
            }
        });
    }

    delete(pro: any): void {
        this.projects = this.projects.filter(d => d !== pro);
        this.proService.deletePro(pro.id).subscribe();
    }

}
